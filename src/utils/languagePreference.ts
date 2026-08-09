export const SOURCE_LANGUAGE = 'tr';
export const DEFAULT_LANGUAGE = 'en';
export const LANGUAGE_STORAGE_KEY = 'preferredLanguage';

export const SUPPORTED_LANGUAGE_CODES = [
  'tr',
  'en',
  'es',
  'de',
  'fr',
  'it',
  'pt',
  'ru',
  'ja',
  'ko',
  'zh-CN',
  'ar',
  'hi',
  'nl',
  'sv',
  'no',
  'da',
  'fi',
  'pl',
  'cs',
  'hu',
  'ro',
  'el',
  'bg',
  'uk',
] as const;

const supportedLanguageCodes = new Set<string>(SUPPORTED_LANGUAGE_CODES);

export const isHarvestFrameLocation = (search: string): boolean =>
  /[?&]_mtHarvest=1\b/.test(search);

export const resolveLanguagePreference = (
  storedLanguage: string | null | undefined,
  search = '',
): string => {
  if (isHarvestFrameLocation(search)) return SOURCE_LANGUAGE;
  return storedLanguage && supportedLanguageCodes.has(storedLanguage)
    ? storedLanguage
    : DEFAULT_LANGUAGE;
};

export const readLanguagePreference = (
  storage?: Pick<Storage, 'getItem'>,
  search = typeof window !== 'undefined' ? window.location.search : '',
): string => {
  try {
    return resolveLanguagePreference(
      storage?.getItem(LANGUAGE_STORAGE_KEY) ?? null,
      search,
    );
  } catch {
    return resolveLanguagePreference(null, search);
  }
};
