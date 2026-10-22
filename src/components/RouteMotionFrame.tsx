import { ReactNode, useState } from "react";
import { motion, useIsPresent, usePresenceData } from "framer-motion";
import { MOTION_EASE_OUT, MOTION_SECONDS, useReducedMotion } from "@/hooks/useAppMotion";
import type { NavDirection } from "@/lib/navigationDirection";

interface RouteMotionFrameProps {
  children: ReactNode;
  pathname: string;
  direction: NavDirection;
  navbar: boolean;
}

const variants = {
  initial: ({ direction, reduced }: { direction: NavDirection; reduced: boolean }) => ({
    opacity: reduced || direction === "tab" ? 0 : 1,
    x: reduced || direction === "tab" ? 0 : direction === "forward" ? "100%" : "-28%",
  }),
  animate: { opacity: 1, x: 0 },
  exit: ({ direction, reduced }: { direction: NavDirection; reduced: boolean }) => ({
    opacity: reduced || direction === "tab" ? 0 : 1,
    x: reduced || direction === "tab" ? 0 : direction === "forward" ? "-28%" : "100%",
  }),
};

/** Layout and stacking are discrete; only transform and opacity are animated. */
export const RouteMotionFrame = ({ children, pathname, direction, navbar }: RouteMotionFrameProps) => {
  const present = useIsPresent();
  const presenceData = usePresenceData() as { direction: NavDirection; reduced: boolean } | undefined;
  const activeDirection = present ? direction : presenceData?.direction ?? direction;
  const reduced = useReducedMotion();
  const [moving, setMoving] = useState(true);

  return (
    <motion.div
      className="route-presence-frame min-h-[100svh] w-full"
      data-route-path={pathname}
      data-app-navbar={navbar}
      data-route-exiting={!present || undefined}
      data-route-moving={moving || !present || undefined}
      aria-hidden={!present || undefined}
      custom={{ direction, reduced }}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants}
      style={{ zIndex: activeDirection === "backward" ? (present ? 1 : 2) : (present ? 2 : 1) }}
      transition={{
        duration: reduced ? 0 : direction === "tab" ? MOTION_SECONDS.control : MOTION_SECONDS.page,
        ease: MOTION_EASE_OUT,
      }}
      onAnimationStart={() => setMoving(true)}
      onAnimationComplete={() => setMoving(false)}
    >
      {children}
    </motion.div>
  );
};