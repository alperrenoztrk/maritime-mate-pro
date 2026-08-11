import { findParentPath } from "@/hooks/useNavigationHierarchy";
import { isTabSwitch } from "@/lib/appNavigation";

/**
 * Push/pop direction for route transitions.
 *
 * Why a module singleton rather than a prop:
 *
 * `AnimatePresence` retains the outgoing keyed frame while the incoming frame
 * mounts. The outgoing component no longer receives route props — it renders
 * from the snapshot it had when navigation started. A direction prop would
 * therefore be one navigation stale on exit, and the two halves of the
 * simultaneous transition could disagree about which way the app is moving.
 *
 * Instead the direction is recorded here, synchronously, at the moment the
 * pathname changes. The keyed motion frame in App.tsx reads it through
 * *variant functions*, which framer-motion evaluates after navigation is
 * recorded for both the exit and the simultaneous enter.
 * One value, read twice, always current.
 *
 * The bonus is that no route declaration has to pass anything: all 160
 * `<PageTransition>` usages in App.tsx stay untouched.
 */
export type NavDirection = "forward" | "backward" | "tab";

let currentDirection: NavDirection = "forward";

/**
 * Paths visited on the way in, deepest last. This is *not* browser history:
 * useNavigationHierarchy pushes a sentinel entry per route to guarantee the
 * back button can never exit the app, which makes real history entries a poor
 * signal for direction. A plain visited-stack is unaffected by that.
 */
let visited: string[] = [];

const MAX_STACK = 32;

export const getNavigationDirection = (): NavDirection => currentDirection;

/**
 * Records `pathname` and returns whether arriving there reads as going
 * deeper (forward) or coming back up (backward).
 *
 * Two signals, in order:
 *  1. The path is already on the stack → the user moved back to somewhere
 *     they came from. Truncate to that point.
 *  2. The path is the hierarchical parent of where we were → backward even
 *     if it was never visited (deep link, then back).
 * Anything else is a push.
 */
export const recordNavigation = (pathname: string): NavDirection => {
  const previous = visited[visited.length - 1];

  if (previous === pathname) return currentDirection;

  // Switching tab-controller stacks is not a hierarchical push/pop. iOS
  // keeps the chrome still and crossfades the content instead of sliding a
  // sibling tab in from the right.
  if (isTabSwitch(previous, pathname)) {
    visited.push(pathname);
    if (visited.length > MAX_STACK) visited = visited.slice(-MAX_STACK);
    currentDirection = "tab";
    return currentDirection;
  }

  const seenAt = visited.lastIndexOf(pathname);
  if (seenAt !== -1) {
    visited = visited.slice(0, seenAt + 1);
    currentDirection = "backward";
    return currentDirection;
  }

  if (previous && findParentPath(previous) === pathname) {
    // Climbing one level via the hierarchy without ever having been here.
    visited = [pathname];
    currentDirection = "backward";
    return currentDirection;
  }

  visited.push(pathname);
  if (visited.length > MAX_STACK) visited = visited.slice(-MAX_STACK);
  currentDirection = "forward";
  return currentDirection;
};

/** Test seam — resets the stack between cases. */
export const resetNavigationDirection = () => {
  visited = [];
  currentDirection = "forward";
};
