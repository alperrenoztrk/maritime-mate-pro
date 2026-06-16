// Framework-agnostic DOM translation helpers used by the glossary-aware
// translator in LanguageContext. These are pure/deterministic and unit-tested
// (see scripts/pageTranslator.test) — the React-specific lifecycle, network
// caching and MutationObserver wiring live in the context itself.

export const SOURCE_LANGUAGE = 'tr';

// Tags whose text content must never be translated.
const NO_TRANSLATE_TAGS = new Set(['SCRIPT', 'STYLE', 'NOSCRIPT']);
// Tags whose text is technical and should be left as-is.
const TEXT_SKIP_TAGS = new Set(['TEXTAREA', 'CODE', 'PRE', 'KBD', 'SAMP']);

// Attributes carrying user-visible text that we also translate. `ds` is the
// dataset key used to remember the original (source) value of the attribute.
export const TRANSLATABLE_ATTRS: Array<{ attr: string; ds: string }> = [
  { attr: 'placeholder', ds: 'mtOrigPlaceholder' },
  { attr: 'title', ds: 'mtOrigTitle' },
  { attr: 'aria-label', ds: 'mtOrigAriaLabel' },
];
export const ATTR_SELECTOR = TRANSLATABLE_ATTRS.map(({ attr }) => `[${attr}]`).join(',');

export const hasLetters = (value: string): boolean => /\p{L}/u.test(value);

const elementClassName = (el: Element): string =>
  typeof el.className === 'string'
    ? el.className
    : ((el.className as unknown as { baseVal?: string })?.baseVal ?? '');

// Whether an element (or any ancestor) opts out of translation.
export const isNoTranslateZone = (start: Element | null): boolean => {
  let el: Element | null = start;
  while (el) {
    if (NO_TRANSLATE_TAGS.has(el.tagName)) return true;
    if (el.getAttribute('translate') === 'no') return true;
    if (el.hasAttribute('data-no-translate')) return true;
    const cn = elementClassName(el);
    if (cn.includes('notranslate') || cn.includes('skiptranslate')) return true;
    if ((el as HTMLElement).isContentEditable) return true;
    el = el.parentElement;
  }
  return false;
};

export const shouldSkipTextNode = (node: Text): boolean => {
  const parent = node.parentElement;
  if (!parent) return true;
  let el: Element | null = parent;
  while (el) {
    if (TEXT_SKIP_TAGS.has(el.tagName)) return true;
    el = el.parentElement;
  }
  return isNoTranslateZone(parent);
};

// Runs an async task over items with a bounded number of concurrent workers.
export const runWithConcurrency = async <T,>(
  items: T[],
  limit: number,
  task: (item: T) => Promise<void>
): Promise<void> => {
  let cursor = 0;
  const worker = async () => {
    while (cursor < items.length) {
      const index = cursor++;
      await task(items[index]);
    }
  };
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
};

// A single translatable unit: a source string plus how to write the result back.
export interface TranslationUnit {
  source: string;
  apply: (translated: string) => void;
}

const getOriginalText = (node: Text, originals: WeakMap<Text, string>): string => {
  const stored = originals.get(node);
  if (stored !== undefined) return stored;
  const value = node.nodeValue ?? '';
  originals.set(node, value);
  return value;
};

const pushTextUnit = (node: Text, originals: WeakMap<Text, string>, units: TranslationUnit[]) => {
  if (shouldSkipTextNode(node)) return;
  const raw = getOriginalText(node, originals);
  const core = raw.trim();
  if (!core || !hasLetters(core)) return;
  // Preserve the node's original leading/trailing whitespace so inline layout
  // (spacing between adjacent elements) is not collapsed.
  const lead = raw.slice(0, raw.length - raw.trimStart().length);
  const trail = raw.slice(raw.trimEnd().length);
  units.push({
    source: core,
    apply: (translated) => {
      if (node.isConnected) node.nodeValue = `${lead}${translated}${trail}`;
    },
  });
};

const pushAttributeUnits = (el: HTMLElement, units: TranslationUnit[]) => {
  if (isNoTranslateZone(el)) return;
  for (const { attr, ds } of TRANSLATABLE_ATTRS) {
    if (!el.hasAttribute(attr)) continue;
    let source = el.dataset[ds];
    if (source === undefined) {
      source = el.getAttribute(attr) ?? '';
      el.dataset[ds] = source;
    }
    const core = source.trim();
    if (!core || !hasLetters(core)) continue;
    units.push({
      source: core,
      apply: (translated) => {
        if (el.isConnected) el.setAttribute(attr, translated);
      },
    });
  }
};

/**
 * Collects all translatable units (text nodes + selected attributes) under a
 * root node. Original source text is captured into `originals` on first sight
 * so later passes (e.g. after a language switch) translate from the source
 * rather than from a previous translation.
 */
export const collectTranslationUnits = (
  root: Node,
  originals: WeakMap<Text, string>
): TranslationUnit[] => {
  const units: TranslationUnit[] = [];

  if (root.nodeType === Node.TEXT_NODE) {
    pushTextUnit(root as Text, originals, units);
    return units;
  }
  if (root.nodeType !== Node.ELEMENT_NODE) return units;

  const ownerDocument = root.ownerDocument ?? document;
  const walker = ownerDocument.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let current = walker.nextNode();
  while (current) {
    pushTextUnit(current as Text, originals, units);
    current = walker.nextNode();
  }

  const rootEl = root as HTMLElement;
  if (rootEl.matches?.(ATTR_SELECTOR)) pushAttributeUnits(rootEl, units);
  rootEl.querySelectorAll?.(ATTR_SELECTOR).forEach((el) =>
    pushAttributeUnits(el as HTMLElement, units)
  );

  return units;
};
