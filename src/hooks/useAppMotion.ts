import { useSyncExternalStore } from "react";

/**
 * Single source of truth for "should this app animate?".
 *
 * Before this hook, `prefers-reduced-motion` was honoured in exactly one
 * place — the splash screen delay in main.tsx. The drifting waves, the title
 * shine and every `infinite` keyframe kept running regardless. The CSS half
 * of the policy lives in src/styles/tokens.css; this is the JS half, for
 * motion driven by framer-motion where CSS cannot reach.
 */

const QUERY = "(prefers-reduced-motion: reduce)";

/** JS equivalents of the CSS --motion-* tokens (Framer uses seconds). */
export const MOTION_SECONDS = {
  press: 0.12,
  control: 0.2,
  page: 0.36,
  sheet: 0.38,
} as const;

export const MOTION_EASE_OUT: [number, number, number, number] = [0.32, 0.72, 0, 1];

const getMediaQuery = (): MediaQueryList | null => {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return null;
  }
  return window.matchMedia(QUERY);
};

const subscribe = (onChange: () => void) => {
  const mq = getMediaQuery();
  if (!mq) return () => {};
  // Safari < 14 only has the deprecated addListener/removeListener pair, and
  // this app ships to iOS through a WebView.
  if (typeof mq.addEventListener === "function") {
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }
  mq.addListener(onChange);
  return () => mq.removeListener(onChange);
};

const getSnapshot = () => getMediaQuery()?.matches ?? false;

/** Server render / prerender: assume motion is fine, CSS still guards it. */
const getServerSnapshot = () => false;

/**
 * `true` when the user has asked the system to reduce motion.
 * Non-reactive callers can use {@link prefersReducedMotion}.
 */
export const useReducedMotion = (): boolean =>
  useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

/** Imperative read, for code outside the React tree (variant functions etc). */
export const prefersReducedMotion = (): boolean => getSnapshot();
