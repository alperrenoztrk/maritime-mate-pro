import { ReactNode, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { scrollToTop } from "@/lib/scrollToTop";
import { useLanguage } from "@/contexts/useLanguage";
import {
  createRouteTranslationToken,
  isRouteTranslationReady,
  ROUTE_TRANSLATION_GATE_HARD_LIMIT_MS,
} from "@/utils/routeTranslation";
import { SOURCE_LANGUAGE } from "@/utils/pageTranslator";
import { isAppPageImmersive } from "@/lib/appChrome";


interface PageTransitionProps {
  children: ReactNode;
}

/**
 * Route content boundary.
 *
 * App.tsx owns the keyed iOS push/pop frame so AnimatePresence can animate
 * both screens simultaneously. This inner boundary owns scroll reset and the
 * no-source-language-flash translation gate. Keeping those responsibilities
 * separate also gives EdgeSwipeBack a transform-free surface to move directly
 * under the user's finger.
 */
export const PageTransition = ({ children }: PageTransitionProps) => {
  const location = useLocation();
  const rootRef = useRef<HTMLDivElement>(null);
  const {
    currentLanguage,
    readyRouteTranslation,
    translateRouteRoot,
  } = useLanguage();
  const routeTranslationToken = useMemo(
    () => createRouteTranslationToken(
      currentLanguage,
      location.key,
      location.pathname,
      location.search,
      location.hash,
    ),
    [currentLanguage, location.hash, location.key, location.pathname, location.search],
  );
  const translationReady = isRouteTranslationReady(
    currentLanguage,
    routeTranslationToken,
    readyRouteTranslation,
  );
  // Safety valve: never keep a mounted route invisible forever. If the
  // translation pass stalls, reveal the source copy instead of leaving a blank
  // (and therefore unusable) screen behind the chrome.
  const [revealForced, setRevealForced] = useState(false);
  const visible = translationReady || revealForced;
  const shellMode = isAppPageImmersive(location.pathname) ? "immersive" : "standard";

  useEffect(() => {
    if (translationReady) {
      setRevealForced(false);
      return;
    }
    const timer = window.setTimeout(() => {
      console.warn(
        `[PageTransition] Revealing ${location.pathname} untranslated after ${ROUTE_TRANSLATION_GATE_HARD_LIMIT_MS}ms`,
      );
      setRevealForced(true);
    }, ROUTE_TRANSLATION_GATE_HARD_LIMIT_MS);
    return () => window.clearTimeout(timer);
  }, [location.pathname, routeTranslationToken, translationReady]);

  // <ScrollToTop> already resets the offset the moment the route changes, but
  // AnimatePresence runs in "wait" mode: the incoming page only mounts once
  // the outgoing one has finished animating out. Resetting again here — before
  // the browser paints this page for the first time — guarantees it is drawn
  // from the top no matter what happened during that gap.
  useLayoutEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) return;
    scrollToTop();
  }, []);

  // The route subtree is committed but kept invisible on its very first frame.
  // Translate that exact subtree, then reveal it and let the entrance animation
  // run. Because this is a layout effect, the dictionary's source-language copy
  // can never be painted between the lazy route mount and the translation pass.
  useLayoutEffect(() => {
    if (currentLanguage === SOURCE_LANGUAGE || translationReady || !rootRef.current) return;
    void translateRouteRoot(rootRef.current, routeTranslationToken).catch((error) => {
      console.error("Route translation failed:", error);
    });
  }, [currentLanguage, routeTranslationToken, translateRouteRoot, translationReady]);

  return (
    <div
      ref={rootRef}
      className={`page-transition-shell app-page-shell app-page-shell--${shellMode} w-full ${visible ? "" : "invisible"}`}
      data-page-path={location.pathname}
      data-page-shell={shellMode}
      data-mt-route-pending={translationReady ? undefined : ""}
      aria-busy={!visible}
    >

      {children}
    </div>
  );
};
