import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { App as CapacitorApp } from "@capacitor/app";
import { Capacitor } from "@capacitor/core";
import { claimBackNavigation, findParentPath } from "@/lib/navigationHierarchy";

// Keep the historical export stable for any component that still imports the
// resolver from this hook module.
export { findParentPath } from "@/lib/navigationHierarchy";

const SENTINEL_KEY = "__hierarchy_back__";

/**
 * Handles browser and native back events through the same logical hierarchy
 * used by the visible global back control.
 */
export const useNavigationHierarchy = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showExitDialog, setShowExitDialog] = useState(false);

  // Long-lived system listeners always read the latest rendered route.
  const pathnameRef = useRef(location.pathname);
  const searchRef = useRef(location.search);
  const navigateRef = useRef(navigate);

  pathnameRef.current = location.pathname;
  searchRef.current = location.search;
  navigateRef.current = navigate;

  const handleBack = useCallback(
    (event?: { preventDefault?: () => void }): boolean => {
      try {
        event?.preventDefault?.();
      } catch {
        // Capacitor 7 suppresses the default action by listener presence.
      }

      // A popstate event changes window.location before listeners run. The
      // rendered-route ref still points at the page the user pressed Back on,
      // so resolving from it prevents an accidental second-level jump.
      const path = pathnameRef.current;
      if (path === "/") return false;

      // Shared with FloatingNavButtons and BackButton. If the same physical
      // action also produces a click/popstate/native event, only the first
      // source is allowed to navigate.
      if (!claimBackNavigation()) return false;

      const parent = findParentPath(path);
      navigateRef.current(parent && parent !== path ? parent : "/", {
        replace: true,
      });
      return true;
    },
    [],
  );

  const closeExitDialog = useCallback(() => {
    setShowExitDialog(false);
  }, []);

  const confirmExit = useCallback(() => {
    setShowExitDialog(false);
  }, []);

  // Capacitor hardware back button — one listener for the app lifetime.
  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return;

    let listener: { remove: () => void } | undefined;
    let cancelled = false;

    CapacitorApp.addListener("backButton", (event) => {
      handleBack(event as { preventDefault?: () => void });
    }).then((registeredListener) => {
      if (cancelled) {
        registeredListener.remove();
      } else {
        listener = registeredListener;
      }
    });

    return () => {
      cancelled = true;
      listener?.remove();
    };
  }, [handleBack]);

  // Browser/PWA back button. The sentinel consumes the browser history move;
  // this handler then performs exactly one logical parent transition.
  useEffect(() => {
    if (Capacitor.isNativePlatform()) return;

    const handlePopState = () => {
      const logicalPath = pathnameRef.current + searchRef.current;
      const handled = handleBack();

      try {
        window.history.pushState(
          { ...(window.history.state ?? {}), [SENTINEL_KEY]: true },
          "",
          handled
            ? window.location.pathname + window.location.search
            : logicalPath,
        );
      } catch {
        // Some iframe/security contexts reject pushState.
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [handleBack]);

  // Add one duplicate current-route entry so browser back can be intercepted
  // before it leaves the logical page. This also protects a native WebView
  // during the short cold-start window before Capacitor attaches its listener.
  useEffect(() => {
    if (typeof window === "undefined") return;

    const state = window.history.state as Record<string, unknown> | null;
    if (state?.[SENTINEL_KEY] === true) return;

    try {
      window.history.pushState(
        { ...(window.history.state ?? {}), [SENTINEL_KEY]: true },
        "",
        pathnameRef.current + searchRef.current,
      );
    } catch {
      // Some iframe/security contexts reject pushState.
    }
  }, [location.pathname]);

  return useMemo(
    () => ({ showExitDialog, closeExitDialog, confirmExit }),
    [showExitDialog, closeExitDialog, confirmExit],
  );
};

