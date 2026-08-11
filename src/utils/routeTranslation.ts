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

export const ROUTE_TRANSLATION_PENDING_SELECTOR = '[data-mt-route-pending]';

/**
 * The route boundary itself is owned by PageTransition's full-subtree pass.
 * Descendants are intentionally NOT treated as owned: async content can mount
 * after that pass has taken its snapshot, and the global MutationObserver must
 * translate those later additions instead of dropping them.
 */
export const isRouteTranslationBoundary = (
  element: Pick<Element, 'matches'> | null,
): boolean => !!element?.matches(ROUTE_TRANSLATION_PENDING_SELECTOR);

/**
 * Readiness is tracked as a SET of tokens, never as a single "last ready" one.
 *
 * A route transition keeps two `PageTransition` subtrees mounted at once (the
 * outgoing screen animates out while the incoming screen animates in), and each
 * one renders under its own `<Routes location>` — so they hold DIFFERENT
 * tokens. With a single shared token only one of them could ever be ready: the
 * loser re-ran its translation layout effect, marked itself ready, and thereby
 * un-readied the winner, which re-ran and un-readied it back. That ping-pong
 * re-rendered both subtrees thousands of times per navigation and locked up the
 * main thread. Independent per-token readiness makes both settle.
 */
export const isRouteTranslationReady = (
  language: string,
  routeToken: string,
  readyRoutes: ReadonlySet<string> | null,
): boolean => language === 'tr' || !!readyRoutes?.has(routeToken);

/**
 * How many route tokens stay marked ready. Only the screens currently mounted
 * matter (outgoing + incoming, plus a little slack for rapid navigation), and
 * every navigation mints a fresh `location.key`, so old tokens are dead weight.
 */
export const READY_ROUTE_TOKEN_LIMIT = 8;

/**
 * Adds a token to the ready set, bounded and copy-on-write.
 *
 * Returns the SAME set instance when the token is already present, so callers
 * can skip a pointless state update (and the re-render it would cause).
 */
export const withReadyRouteToken = (
  readyRoutes: ReadonlySet<string>,
  routeToken: string,
  limit = READY_ROUTE_TOKEN_LIMIT,
): ReadonlySet<string> => {
  if (readyRoutes.has(routeToken)) return readyRoutes;
  const next = new Set(readyRoutes);
  next.add(routeToken);
  // Sets preserve insertion order — drop the oldest tokens first.
  while (next.size > limit) {
    const oldest = next.values().next().value as string | undefined;
    if (oldest === undefined) break;
    next.delete(oldest);
  }
  return next;
};

/**
 * A route may wait briefly for its local dictionary/live fallback, but it must
 * never turn a slow or unavailable translation service into a frozen app.
 * This budget also covers a lazy route chunk that never finishes mounting.
 */
export const ROUTE_TRANSLATION_MAX_WAIT_MS = 2_500;

/**
 * Absolute ceiling for the full-screen translation gate and for the
 * "hide until translated" state of a route subtree. Whatever happens upstream,
 * the user must get an interactive screen back within this budget — showing
 * source-language copy for a moment is always better than a frozen app.
 */
export const ROUTE_TRANSLATION_GATE_HARD_LIMIT_MS = 3_000;


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
