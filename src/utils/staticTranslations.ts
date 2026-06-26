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

const baseUrl = (import.meta as unknown as { env?: { BASE_URL?: string } }).env?.BASE_URL ?? '/';

const dictionaryUrl = (languageCode: string): string =>
  `${baseUrl.replace(/\/$/, '')}/locales/${languageCode}.json`;

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
    try {
      const response = await fetch(dictionaryUrl(languageCode), { cache: 'force-cache' });
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
      loadedDictionaries[languageCode] = dict;
      return dict;
    } catch {
      // Network/parse failure: degrade gracefully to the live translator.
      loadedDictionaries[languageCode] = {};
      return {};
    } finally {
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
  return dict[normalizedSource] ?? null;
};

/**
 * True when a non-empty static dictionary is already loaded in memory for the
 * language. Because every shipped language now ships a COMPLETE pack (see
 * scripts/i18n + the PWA precache of public/locales/*.json), a loaded, non-empty
 * dictionary means the runtime can translate the whole app offline from it — no
 * harvest, no live machine translation. The caller must `loadStaticDictionary`
 * first (it resolves instantly from the precache, even offline).
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
