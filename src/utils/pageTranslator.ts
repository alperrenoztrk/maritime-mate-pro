// Framework-agnostic DOM translation helpers used by the glossary-aware
// translator in LanguageContext. These are pure/deterministic and unit-tested
// (see scripts/pageTranslator.test) — the React-specific lifecycle, network
// caching and MutationObserver wiring live in the context itself.

import { isTechnicalString } from './technicalText';

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
  { attr: 'alt', ds: 'mtOrigAlt' },
];
export const ATTR_SELECTOR = TRANSLATABLE_ATTRS.map(({ attr }) => `[${attr}]`).join(',');

// True when a string still contains Turkish-specific characters/words. UI copy
// is authored in English; content data under src/data is still Turkish.
const TURKISH_WORDS = /\b(ve|ile|için|bir|bu|olarak|gemi|hesap|sayfa|değer|göre|yok|var|kaydet|geri|ayarlar|kapat|aç)\b/i;
export const hasTurkishText = (value: string): boolean =>
  /[şğıçöüŞĞİÇÖÜ]/.test(value) || TURKISH_WORDS.test(value);

export const hasLetters = (value: string): boolean => /\p{L}/u.test(value);

// Canonical source-string normalization shared by the runtime translator and
// the build-time pre-translation pipeline (scripts/i18n/*). Both MUST use this
// so that pre-translated dictionary keys match runtime lookup keys exactly.
export const normalizeSource = (value: string): string => value.trim();

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

// ── Network batching ─────────────────────────────────────────────────────────
// The runtime translator sends source strings to a machine-translation endpoint
// that accepts one `q` per request. Issuing one request per string is the main
// cost of a language switch, so we pack many strings into a single request by
// joining them with a separator and splitting the response back apart.
//
// `\n` is used as the separator because the gtx endpoint emits one response
// segment per newline, so the joined order is preserved. Any source that itself
// contains the separator can't be reconstructed this way, so it is emitted as
// its own singleton batch and translated alone.
export const BATCH_SEPARATOR = '\n';

// Groups source strings into batches whose joined query stays within the given
// item-count and character limits, so each batch is one network round-trip.
export const buildTranslationBatches = (
  sources: string[],
  maxChars = 1200,
  maxItems = 48,
): string[][] => {
  const batches: string[][] = [];
  let current: string[] = [];
  let currentChars = 0;

  const flush = () => {
    if (current.length > 0) {
      batches.push(current);
      current = [];
      currentChars = 0;
    }
  };

  for (const source of sources) {
    // Sources containing the separator (or longer than a whole batch) cannot be
    // safely co-located with others — translate them on their own.
    if (source.includes(BATCH_SEPARATOR) || source.length >= maxChars) {
      flush();
      batches.push([source]);
      continue;
    }
    const projected =
      current.length === 0 ? source.length : currentChars + BATCH_SEPARATOR.length + source.length;
    if (current.length >= maxItems || (current.length > 0 && projected > maxChars)) {
      flush();
    }
    currentChars = current.length === 0 ? source.length : currentChars + BATCH_SEPARATOR.length + source.length;
    current.push(source);
  }
  flush();
  return batches;
};

// Splits a separator-joined translated response back into per-source strings.
// Returns null when the segment count doesn't line up with the batch, signalling
// the caller to fall back to translating each source individually.
export const splitBatchResult = (joined: string, expectedCount: number): string[] | null => {
  if (expectedCount <= 1) return [joined];
  const parts = joined.split(BATCH_SEPARATOR);
  if (parts.length !== expectedCount) return null;
  return parts;
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
  // Formulas are language independent — never send them to the translator.
  if (isTechnicalString(core)) return;
  // Preserve the node's original leading/trailing whitespace so inline layout
  // (spacing between adjacent elements) is not collapsed.
  const lead = raw.slice(0, raw.length - raw.trimStart().length);
  const trail = raw.slice(raw.trimEnd().length);
  units.push({
    source: core,
    apply: (translated) => {
      if (!node.isConnected) return;
      const next = `${lead}${translated}${trail}`;
      // HARD RULE: never assign a value the node already holds. Assigning to
      // `nodeValue` queues a characterData MutationRecord even when the string
      // is identical, so an idempotent re-translation pass used to wake every
      // MutationObserver in the app (see AppNavBar) once per text node. Those
      // observers re-render, which mutates the DOM, which schedules another
      // pass — a self-feeding loop that saturated the main thread for tens of
      // seconds. A settled page must produce zero writes.
      if (node.nodeValue === next) return;
      node.nodeValue = next;
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
    if (isTechnicalString(core)) continue;
    units.push({
      source: core,
      apply: (translated) => {
        if (!el.isConnected) return;
        // Same idempotency rule as text nodes: `setAttribute` queues a record
        // even when the value is unchanged.
        if (el.getAttribute(attr) === translated) return;
        el.setAttribute(attr, translated);
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
