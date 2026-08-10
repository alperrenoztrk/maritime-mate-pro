import { ReactNode, useLayoutEffect, useMemo, useRef } from "react";
import { useLocation } from "react-router-dom";
import { scrollToTop } from "@/lib/scrollToTop";
import { useLanguage } from "@/contexts/useLanguage";
import {
  createRouteTranslationToken,
  isRouteTranslationReady,
} from "@/utils/routeTranslation";

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
  // run. Because this is a layout effect, authored Turkish copy can never be
  // painted between the lazy route mount and the translation pass.
  useLayoutEffect(() => {
    if (currentLanguage === "tr" || translationReady || !rootRef.current) return;
    void translateRouteRoot(rootRef.current, routeTranslationToken).catch((error) => {
      console.error("Route translation failed:", error);
    });
  }, [currentLanguage, routeTranslationToken, translateRouteRoot, translationReady]);

  return (
    <div
      ref={rootRef}
      className={`page-transition-shell w-full ${translationReady ? "" : "invisible"}`}
      data-page-path={location.pathname}
      data-mt-route-pending={translationReady ? undefined : ""}
      aria-busy={!translationReady}
    >
      {children}
    </div>
  );
};
