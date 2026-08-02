import { motion } from "framer-motion";
import { ReactNode, useLayoutEffect } from "react";
import { scrollToTop } from "@/lib/scrollToTop";

interface PageTransitionProps {
  children: ReactNode;
  direction?: "left" | "right" | "none";
}

export const PageTransition = ({ children, direction = "none" }: PageTransitionProps) => {
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
    initial: {
      opacity: 0,
      x: direction === "left" ? -100 : direction === "right" ? 100 : 0,
    },
    animate: {
      opacity: 1,
      x: 0,
    },
    exit: {
      opacity: 0,
      x: direction === "left" ? 100 : direction === "right" ? -100 : 0,
    },
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
        mass: 0.8,
      }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
};
