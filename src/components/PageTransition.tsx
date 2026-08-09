import { motion } from "framer-motion";
import { ReactNode, useLayoutEffect } from "react";
import { scrollToTop } from "@/lib/scrollToTop";
import { getNavigationDirection } from "@/lib/navigationDirection";
import { prefersReducedMotion } from "@/hooks/useAppMotion";

interface PageTransitionProps {
  children: ReactNode;
}

/**
 * iOS-style push/pop for route changes.
 *
 * The offsets are percentages so the slide scales with the viewport; the app
 * shell in App.tsx is `overflow-x-hidden`, so nothing can leak a horizontal
 * scrollbar. The outgoing page travels a shorter distance than the incoming
 * one — that parallax is what makes a push read as "the new screen covers
 * the old one" rather than a pair of sliding panels.
 *
 * Direction is NOT a prop. See src/lib/navigationDirection.ts: with
 * AnimatePresence in `mode="wait"` the exiting page cannot receive fresh
 * props, so these variants are declared as functions and read the recorded
 * direction when framer-motion evaluates them — which happens after the
 * navigation, for both the exit and the following enter.
 */
const ENTER_OFFSET = 18; // % of width the incoming page travels
const EXIT_OFFSET = 7; // % the outgoing page drifts (parallax)

export const PageTransition = ({ children }: PageTransitionProps) => {
  // <ScrollToTop> already resets the offset the moment the route changes, but
  // AnimatePresence runs in "wait" mode: the incoming page only mounts once
  // the outgoing one has finished animating out. Resetting again here — before
  // the browser paints this page for the first time — guarantees it is drawn
  // from the top no matter what happened during that gap.
  useLayoutEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) return;
    scrollToTop();
  }, []);

  const variants = {
    initial: () => {
      if (prefersReducedMotion()) return { opacity: 0, x: 0 };
      const forward = getNavigationDirection() === "forward";
      return { opacity: 0, x: forward ? `${ENTER_OFFSET}%` : `-${ENTER_OFFSET}%` };
    },
    animate: { opacity: 1, x: 0 },
    exit: () => {
      if (prefersReducedMotion()) return { opacity: 0, x: 0 };
      const forward = getNavigationDirection() === "forward";
      return { opacity: 0, x: forward ? `-${EXIT_OFFSET}%` : `${EXIT_OFFSET}%` };
    },
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants}
      transition={
        prefersReducedMotion()
          ? { duration: 0.01 }
          : // Matches --motion-page / --ease-out-ios from tokens.css. Expressed
            // numerically because framer-motion cannot read CSS custom
            // properties for tween timing.
            { duration: 0.3, ease: [0.32, 0.72, 0, 1] }
      }
      className="w-full"
    >
      {children}
    </motion.div>
  );
};
