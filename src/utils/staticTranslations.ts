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
// Whether a loaded pack covers the WHOLE app (the build-time generator sets the
// reserved `__complete: true` flag only when it translated the full extracted
// corpus with high coverage). UI-only / partial packs lack the flag, so they
// are treated as incomplete and the runtime falls back to the live harvest +
// machine-translation path that translates the rest of the app.
const dictionaryComplete: Record<string, boolean> = {};

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
        dictionaryComplete[languageCode] = false;
        return {};
      }
      const raw = (await response.json()) as Record<string, unknown>;
      const dict: StaticDictionary = {};
      for (const [key, value] of Object.entries(raw)) {
        if (key.startsWith(META_PREFIX)) continue;
        if (typeof value === 'string') dict[key] = value;
      }
      loadedDictionaries[languageCode] = dict;
      dictionaryComplete[languageCode] = raw.__complete === true;
      return dict;
    } catch {
      // Network/parse failure: degrade gracefully to the live translator.
      loadedDictionaries[languageCode] = {};
      dictionaryComplete[languageCode] = false;
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
 * True only when the loaded pack covers the WHOLE app — i.e. it was generated
 * from the full extracted corpus and carries the `__complete: true` flag. In
 * that case the runtime can translate everything offline from the pack, with no
 * harvest and no live machine translation.
 *
 * A partial / UI-only pack (the default shipped today) lacks the flag and
 * therefore returns false, so the caller falls back to the live harvest +
 * machine-translation path that translates the rest of the app. This prevents a
 * tiny UI-only pack from being mistaken for a full translation and leaving most
 * of the app stuck in the source language. The caller must `loadStaticDictionary`
 * first (it resolves instantly from the precache, even offline).
 */
export const isDictionaryComplete = (languageCode: string): boolean => {
  if (!languageCode || languageCode === 'tr') return true; // source language
  return dictionaryComplete[languageCode] === true;
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
    if (!keepSet.has(code)) {
      delete loadedDictionaries[code];
      delete dictionaryComplete[code];
    }
  }
};
