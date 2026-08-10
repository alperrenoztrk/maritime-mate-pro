import { useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ShipWheel } from "lucide-react";
import { useLanguage } from "@/contexts/useLanguage";
import {
  createRouteTranslationToken,
  isRouteTranslationReady,
} from "@/utils/routeTranslation";
import { MOTION_SECONDS, useReducedMotion } from "@/hooks/useAppMotion";

export const RouteTranslationGate = () => {
  const reducedMotion = useReducedMotion();
  const location = useLocation();
  const { currentLanguage, readyRouteTranslation } = useLanguage();
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

  return (
    <AnimatePresence>
      {translating && (
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
