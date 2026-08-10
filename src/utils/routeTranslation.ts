/**
 * Stable identity for a rendered route in a specific application language.
 *
 * `location.key` changes even when React Router navigates to the same pathname,
 * while pathname/search/hash make the token deterministic in environments that
 * use the default key (initial render, tests and static previews).
 */
export const createRouteTranslationToken = (
  language: string,
  locationKey: string,
  pathname: string,
  search = '',
  hash = '',
): string => JSON.stringify([language, locationKey, pathname, search, hash]);

export const isRouteTranslationReady = (
  language: string,
  routeToken: string,
  readyRoute: string | null,
): boolean => language === 'tr' || readyRoute === routeToken;
