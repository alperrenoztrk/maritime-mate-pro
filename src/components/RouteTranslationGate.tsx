import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ShipWheel } from "lucide-react";
import { useLanguage } from "@/contexts/useLanguage";
import {
  createRouteTranslationToken,
  isRouteTranslationReady,
  ROUTE_TRANSLATION_GATE_HARD_LIMIT_MS,
  ROUTE_TRANSLATION_MAX_WAIT_MS,
} from "@/utils/routeTranslation";
import { MOTION_SECONDS, useReducedMotion } from "@/hooks/useAppMotion";

export const RouteTranslationGate = () => {
  const reducedMotion = useReducedMotion();
  const location = useLocation();
  const { currentLanguage, readyRouteTranslation } = useLanguage();
  const [releasedToken, setReleasedToken] = useState<string | null>(null);
  // Absolute release: once the gate has been continuously visible for the hard
  // limit it stays down until translation settles, even if the route token
  // keeps changing. Without this, rapid navigation restarts the per-token
  // timer over and over and the opaque blocker can sit on top of a perfectly
  // healthy app — which reads to the user as a completely frozen screen.
  const [hardReleased, setHardReleased] = useState(false);
  const [gateOpenedAt, setGateOpenedAt] = useState<number | null>(null);
  const warnedRef = useRef(false);
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
  const showGate = translating && !hardReleased && releasedToken !== routeToken;

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

  useEffect(() => {
    if (!translating) {
      setGateOpenedAt(null);
      setHardReleased(false);
      warnedRef.current = false;
      return;
    }
    if (gateOpenedAt === null) setGateOpenedAt(Date.now());
  }, [gateOpenedAt, translating]);

  useEffect(() => {
    if (gateOpenedAt === null || hardReleased) return;
    const remaining = Math.max(
      0,
      ROUTE_TRANSLATION_GATE_HARD_LIMIT_MS - (Date.now() - gateOpenedAt),
    );
    const timer = window.setTimeout(() => {
      if (!warnedRef.current) {
        warnedRef.current = true;
        console.warn(
          `[RouteTranslationGate] Hard-released after ${ROUTE_TRANSLATION_GATE_HARD_LIMIT_MS}ms at ${location.pathname}`,
        );
      }
      setHardReleased(true);
    }, remaining);
    return () => window.clearTimeout(timer);
  }, [gateOpenedAt, hardReleased, location.pathname]);

  return (
    <AnimatePresence>
      {showGate && (
        <motion.div
          // HARD RULE: this is a *visual* cover, never an input blocker.
          //
          //  - `pointer-events: none` — it used to animate to `auto`, which made
          //    every route change mount a full-screen tap sink for as long as the
          //    translation pass ran. Taps on the tab bar simply vanished, which
          //    is indistinguishable from a frozen app.
          //  - `z-30` — below the nav bar (z-50), the tab bar (z-45) and the edge
          //    swipe strip (z-40), so the persistent navigation chrome stays
          //    visible and usable while a route settles. Only the route content
          //    underneath is covered, which is all this gate was ever for.
          className="pointer-events-none fixed inset-0 z-30 flex items-center justify-center bg-background"
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
