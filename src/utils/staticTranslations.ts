// Static (build-time) translation dictionaries.
// -----------------------------------------------------------------------------
// The bulk of the app's user-visible text is static Turkish content authored in
// src/data/*.ts. It is pre-translated at build time (scripts/i18n/*) with the
// maritime-aware AI + glossary and shipped as per-language JSON under
// public/locales/<lang>.json. At runtime we look these up first — an instant,
// network-free, offline-capable hit — and only fall back to the live translator
// for anything not covered (truly dynamic strings).
//
// Dictionaries are keyed by the SAME normalized source string the runtime uses
// (see normalizeSource in pageTranslator.ts), so lookups match exactly.

export type StaticDictionary = Record<string, string>;

// Reserved metadata key inside the JSON files (e.g. { "__version": "..." }).
const META_PREFIX = '__';

const loadedDictionaries: Record<string, StaticDictionary> = {};
const inFlightLoads: Record<string, Promise<StaticDictionary>> = {};
const DICTIONARY_FETCH_TIMEOUT_MS = 8_000;
// Query-versioning bypasses both the browser HTTP cache and an older service
// worker's StaleWhileRevalidate entry on the first load after a locale rebuild.
export const STATIC_DICTIONARY_CACHE_VERSION = 'v6';

const baseUrl = (import.meta as unknown as { env?: { BASE_URL?: string } }).env?.BASE_URL ?? '/';

const dictionaryUrl = (languageCode: string): string =>
  `${baseUrl.replace(/\/$/, '')}/locales/${languageCode}.json?v=${STATIC_DICTIONARY_CACHE_VERSION}`;

// Checked English for the long lesson paragraphs (`paragraphs` fields), shared
// by every language (scripts/i18n/build-paragraph-pack.mjs). It is kept out of
// the per-language packs so the same English is not shipped 24 times. A
// paragraph with no checked text in the reader's language shows this English
// instead of a live machine translation of the Turkish.
const sharedEnglishUrl = (): string =>
  `${baseUrl.replace(/\/$/, '')}/locales/shared/lesson-paragraphs.en.json?v=${STATIC_DICTIONARY_CACHE_VERSION}`;
const sharedLearningUrl = (): string =>
  `${baseUrl.replace(/\/$/, '')}/locales/shared/learning-guide.en.json?v=${STATIC_DICTIONARY_CACHE_VERSION}`;
let sharedEnglishLoad: Promise<StaticDictionary> | null = null;

let terminologyLoad: Promise<Record<string, StaticDictionary>> | null = null;
const loadTerminologyOverrides = (): Promise<Record<string, StaticDictionary>> => {
  if (!terminologyLoad) terminologyLoad = (async () => {
    const controller = new AbortController();
    const timeout = globalThis.setTimeout(() => controller.abort(), DICTIONARY_FETCH_TIMEOUT_MS);
    try {
      const response = await fetch(`${baseUrl.replace(/\/$/, '')}/locales/shared/terminology-overrides.json?v=${STATIC_DICTIONARY_CACHE_VERSION}`, { cache: 'force-cache', signal: controller.signal });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const raw: unknown = await response.json();
      const result: Record<string, StaticDictionary> = {};
      if (raw && typeof raw === 'object' && !Array.isArray(raw)) for (const [lang, entries] of Object.entries(raw)) {
        if (entries && typeof entries === 'object' && !Array.isArray(entries)) result[lang] = Object.fromEntries(Object.entries(entries).filter((entry): entry is [string, string] => typeof entry[1] === 'string'));
      }
      return result;
    } catch { terminologyLoad = null; return {}; }
    finally { globalThis.clearTimeout(timeout); }
  })();
  return terminologyLoad;
};

const loadSharedEnglish = (): Promise<StaticDictionary> => {
  if (!sharedEnglishLoad) {
    sharedEnglishLoad = (async (): Promise<StaticDictionary> => {
      const packs = await Promise.all([sharedEnglishUrl(), sharedLearningUrl()].map(async (url) => {
        try {
          const response = await fetch(url, { cache: 'force-cache' });
          if (!response.ok) throw new Error(`HTTP ${response.status}`);
          const raw = (await response.json()) as Record<string, unknown>;
          const shared: StaticDictionary = {};
          for (const [key, value] of Object.entries(raw)) {
            if (typeof value === 'string') shared[key] = value;
          }
          return shared;
        } catch {
          sharedEnglishLoad = null; // One missing pack must not discard the other.
          return {};
        }
      }));
      return Object.assign({}, ...packs);
    })();
  }
  return sharedEnglishLoad;
};

/**
 * Lazily fetches and caches the static dictionary for a language. Only the
 * requested language is downloaded; the PWA runtime cache keeps it for offline
 * use. Resolves to an empty dictionary when no file exists for the language
 * (the caller then relies on the live translator).
 */
export const loadStaticDictionary = async (languageCode: string): Promise<StaticDictionary> => {
  if (!languageCode || languageCode === 'tr') return {};
  const cached = loadedDictionaries[languageCode];
  if (cached) return cached;
  const inFlight = inFlightLoads[languageCode];
  if (inFlight) return inFlight;

  const request = (async (): Promise<StaticDictionary> => {
    const controller = typeof AbortController === 'undefined' ? null : new AbortController();
    const timeout = controller
      ? globalThis.setTimeout(() => controller.abort(), DICTIONARY_FETCH_TIMEOUT_MS)
      : null;
    try {
      const response = await fetch(dictionaryUrl(languageCode), {
        cache: 'force-cache',
        signal: controller?.signal,
      });
      if (!response.ok) {
        loadedDictionaries[languageCode] = {};
        return {};
      }
      const raw = (await response.json()) as Record<string, unknown>;
      const dict: StaticDictionary = {};
      for (const [key, value] of Object.entries(raw)) {
        if (key.startsWith(META_PREFIX)) continue;
        if (typeof value === 'string') dict[key] = value;
      }
      // Only next to a real pack: an empty dictionary must stay empty so the
      // runtime keeps using the live translator (see isDictionaryComplete).
      if (Object.keys(dict).length > 0) {
        const [shared, overrides] = await Promise.all([loadSharedEnglish(), loadTerminologyOverrides()]);
        for (const [key, value] of Object.entries(shared)) {
          if (!(key in dict)) dict[key] = value;
        }
        Object.assign(dict, overrides[languageCode] ?? {});
      }
      loadedDictionaries[languageCode] = dict;
      return dict;
    } catch {
      // Network/parse failure: degrade gracefully to the live translator.
      loadedDictionaries[languageCode] = {};
      return {};
    } finally {
      if (timeout !== null) globalThis.clearTimeout(timeout);
      delete inFlightLoads[languageCode];
    }
  })();

  inFlightLoads[languageCode] = request;
  return request;
};

/**
 * Synchronous lookup against an already-loaded dictionary. Returns `null` when
 * the language dictionary is not loaded yet or the key is absent.
 */
export const getStaticTranslation = (
  normalizedSource: string,
  languageCode: string
): string | null => {
  const dict = loadedDictionaries[languageCode];
  if (!dict) return null;
  const exact = dict[normalizedSource];
  if (exact !== undefined) return exact;
  // Kaynakta çok satırlı yazılmış metinler (ör. "GM < 0 → …\nGM = 0 – …")
  // sözlüğe tek boşlukla girer; DOM'daki metin düğümü ise satır sonlarını
  // korur. Bu yüzden çevirisi hazır olan metin ekranda Türkçe kalıyordu.
  if (!/\s\s|[\n\t]/.test(normalizedSource)) return null;
  return dict[normalizedSource.replace(/\s+/g, ' ')] ?? null;
};

/**
 * True when a non-empty static dictionary is already loaded in memory for the
 * language. Because every shipped language now ships a COMPLETE pack (see
 * scripts/i18n), a loaded, non-empty dictionary means the runtime can translate
 * the whole app offline from it — no harvest, no live machine translation. The
 * caller must `loadStaticDictionary` first. Only the default language's pack is
 * PWA-precached; other languages are fetched on first selection and then kept
 * offline by the translation-locales runtime cache (see vite.config.ts).
 */
export const isDictionaryComplete = (languageCode: string): boolean => {
  if (!languageCode || languageCode === 'tr') return true; // source language
  const dict = loadedDictionaries[languageCode];
  return !!dict && Object.keys(dict).length > 0;
};

/**
 * Frees loaded dictionaries other than the ones listed, to cap memory. The full
 * packs are large (the whole app translated), so keeping every visited language
 * resident would balloon the heap on long sessions / mobile webviews. The files
 * stay on disk in the PWA precache, so a later switch re-loads instantly.
 */
export const releaseDictionariesExcept = (keep: string[]): void => {
  const keepSet = new Set(keep);
  for (const code of Object.keys(loadedDictionaries)) {
    if (!keepSet.has(code)) delete loadedDictionaries[code];
  }
};
