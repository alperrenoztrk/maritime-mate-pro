import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ShipWheel } from "lucide-react";
import { useLanguage } from "@/contexts/useLanguage";
import {
  createRouteTranslationToken,
  isRouteTranslationReady,
  ROUTE_TRANSLATION_MAX_WAIT_MS,
} from "@/utils/routeTranslation";
import { MOTION_SECONDS, useReducedMotion } from "@/hooks/useAppMotion";

export const RouteTranslationGate = () => {
  const reducedMotion = useReducedMotion();
  const location = useLocation();
  const { currentLanguage, readyRouteTranslation } = useLanguage();
  const [releasedToken, setReleasedToken] = useState<string | null>(null);
  const routeToken = createRouteTranslationToken(
    currentLanguage,
    location.key,
    location.pathname,
    location.search,
    location.hash,
  );
  const translating = !isRouteTranslationReady(
    currentLanguage,
    routeToken,
    readyRouteTranslation,
  );
  const showGate = translating && releasedToken !== routeToken;

  // Independent safety net: this component mounts before a lazy page does. If
  // a route chunk, auth boundary or translation request stalls, release the
  // exact route token after a short budget instead of leaving a full-screen
  // input blocker above the app forever. This only releases the visual gate;
  // PageTransition still owns translation readiness when the lazy page mounts.
  useEffect(() => {
    if (!translating) return;
    const timer = window.setTimeout(
      () => setReleasedToken(routeToken),
      ROUTE_TRANSLATION_MAX_WAIT_MS,
    );
    return () => window.clearTimeout(timer);
  }, [routeToken, translating]);

  return (
    <AnimatePresence>
      {showGate && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-background"
          data-no-translate
          translate="no"
          role="status"
          aria-label="Loading translated page"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: MOTION_SECONDS.press }}
        >
          <motion.div
            animate={reducedMotion ? undefined : { rotate: 360 }}
            transition={reducedMotion ? undefined : { repeat: Infinity, ease: "linear", duration: 2.5 }}
          >
            <ShipWheel className="h-12 w-12 text-primary" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
