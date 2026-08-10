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

/**
 * A route may wait briefly for its local dictionary/live fallback, but it must
 * never turn a slow or unavailable translation service into a frozen app.
 * This budget also covers a lazy route chunk that never finishes mounting.
 */
export const ROUTE_TRANSLATION_MAX_WAIT_MS = 2_500;

export type DeadlineResult<T> =
  | { status: 'completed'; value: T }
  | { status: 'failed'; error: unknown }
  | { status: 'timed-out' };

/**
 * Observes an async task without leaving an unhandled rejection behind when
 * the deadline wins. The original task is allowed to finish in the background
 * (its DOM appliers already guard against disconnected route roots).
 */
export const settleWithDeadline = <T>(
  task: Promise<T>,
  timeoutMs = ROUTE_TRANSLATION_MAX_WAIT_MS,
): Promise<DeadlineResult<T>> => new Promise((resolve) => {
  let settled = false;
  const finish = (result: DeadlineResult<T>) => {
    if (settled) return;
    settled = true;
    clearTimeout(timer);
    resolve(result);
  };
  const timer = setTimeout(() => finish({ status: 'timed-out' }), Math.max(0, timeoutMs));

  void task.then(
    (value) => finish({ status: 'completed', value }),
    (error) => finish({ status: 'failed', error }),
  );
});
