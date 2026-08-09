import { motion, useReducedMotion } from "framer-motion";
import { ReactNode, useLayoutEffect } from "react";
import { useNavigationType } from "react-router-dom";
import { scrollToTop } from "@/lib/scrollToTop";

interface PageTransitionProps {
  children: ReactNode;
  direction?: "left" | "right" | "none";
}

export const PageTransition = ({ children, direction = "none" }: PageTransitionProps) => {
  const navigationType = useNavigationType();
  const reduceMotion = useReducedMotion();
  // <ScrollToTop> already resets the offset the moment the route changes, but
  // AnimatePresence runs in "wait" mode: the incoming page only mounts once
  // the outgoing one has finished animating out. Resetting again here — before
  // the browser paints this page for the first time — guarantees it is drawn
  // from the top no matter what happened during that gap.
  useLayoutEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) return;
    scrollToTop();
  }, []);

  const inferredDirection = direction === "none"
    ? navigationType === "POP" ? "left" : "right"
    : direction;
  const enterX = inferredDirection === "left" ? -18 : 24;
  const exitX = inferredDirection === "left" ? 14 : -12;

  const variants = {
    initial: {
      opacity: reduceMotion ? 1 : 0,
      x: reduceMotion ? 0 : enterX,
      scale: reduceMotion ? 1 : 0.995,
    },
    animate: {
      opacity: 1,
      x: 0,
      scale: 1,
    },
    exit: {
      opacity: reduceMotion ? 1 : 0,
      x: reduceMotion ? 0 : exitX,
      scale: reduceMotion ? 1 : 0.998,
    },
  };

  return (
    <div className="route-swipe-surface min-h-[100svh] w-full">
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={variants}
        transition={{
          type: reduceMotion ? "tween" : "spring",
          duration: reduceMotion ? 0.001 : undefined,
          stiffness: 390,
          damping: 38,
          mass: 0.72,
        }}
        className="min-h-[100svh] w-full"
      >
        {children}
      </motion.div>
    </div>
  );
};
