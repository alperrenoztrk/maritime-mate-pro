import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLanguage } from "@/contexts/useLanguage";
import { SOURCE_LANGUAGE } from "@/utils/languagePreference";
import {
  beginTranslationGuard,
  finishTranslationGuard,
} from "@/utils/translationGuard";

const ROUTE_MOUNT_TIMEOUT_MS = 15_000;

const findRouteReadySignal = (pathname: string): HTMLElement | null => {
  const signals = document.querySelectorAll<HTMLElement>("[data-route-ready-path]");
  for (const signal of signals) {
    if (signal.dataset.routeReadyPath === pathname) return signal;
  }
  return null;
};

/**
 * Coordinates navigation with the translation engine. The guard is activated
 * in a layout effect (before paint), waits for the lazy route chunk to mount,
 * and is only released after LanguageContext confirms the DOM is paint-safe:
 * local translations are applied and any live-only units are hidden until
 * their background translation settles. Source text and paint never race.
 */
export const RouteTranslationGate = () => {
  const { pathname } = useLocation();
  const { currentLanguage, isLoading, translateRoute } = useLanguage();

  useLayoutEffect(() => {
    if (isLoading || currentLanguage === SOURCE_LANGUAGE) return;

    const token = beginTranslationGuard();
    const appRoot = document.getElementById("root");
    let disposed = false;
    let preparing = false;
    let observer: MutationObserver | null = null;

    const reveal = () => {
      if (disposed) return;
      finishTranslationGuard(token);
    };

    const prepare = async (routeRoot: Node) => {
      if (preparing || disposed) return;
      preparing = true;
      observer?.disconnect();
      window.clearTimeout(safetyTimer);

      try {
        await translateRoute(routeRoot);
      } finally {
        reveal();
      }
    };

    const tryMountedRoute = () => {
      const readySignal = findRouteReadySignal(pathname);
      if (readySignal) void prepare(appRoot ?? readySignal.parentNode ?? readySignal);
    };

    if (appRoot) {
      observer = new MutationObserver(tryMountedRoute);
      observer.observe(appRoot, { childList: true, subtree: true });
    }

    // Never strand the UI if a lazy import fails before the route-ready signal mounts.
    // The root remains protected during the whole timeout; the fallback pass
    // translates any error/auth screen that does exist before revealing it.
    const safetyTimer = window.setTimeout(() => {
      void prepare(appRoot ?? document.body);
    }, ROUTE_MOUNT_TIMEOUT_MS);

    // The route may already be committed by the time this sibling layout
    // effect runs. If it is still suspended, the observer catches the signal
    // when React replaces the fallback with the resolved route tree.
    tryMountedRoute();

    return () => {
      disposed = true;
      observer?.disconnect();
      window.clearTimeout(safetyTimer);
      finishTranslationGuard(token);
    };
  }, [currentLanguage, isLoading, pathname, translateRoute]);

  return null;
};
