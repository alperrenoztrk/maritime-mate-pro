import { useEffect, useCallback, useRef, useState, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { App as CapacitorApp } from '@capacitor/app';
import { Capacitor } from '@capacitor/core';

type NavigationRule = {
  pattern: RegExp;
  parent: (match: RegExpMatchArray) => string;
};

const navigationRules: NavigationRule[] = [
  // Lessons
  {
    pattern: /^\/lessons\/([^/]+)\/topics\/([^/]+)$/,
    parent: (match) => `/lessons/${match[1]}/topics`,
  },
  {
    pattern: /^\/lessons\/([^/]+)\/topics$/,
    parent: () => '/lessons',
  },
  {
    pattern: /^\/lessons$/,
    parent: () => '/',
  },

  // Crew & Bridge
  {
    pattern: /^\/crew\/([^/]+)$/,
    parent: () => '/crew',
  },
  {
    pattern: /^\/crew$/,
    parent: () => '/',
  },
  {
    pattern: /^\/bridge\/([^/]+)$/,
    parent: () => '/bridge',
  },
  {
    pattern: /^\/bridge$/,
    parent: () => '/',
  },

  // Ship Systems
  {
    pattern: /^\/ship-systems\/([^/]+)$/,
    parent: () => '/ship-systems',
  },
  {
    pattern: /^\/ship-systems$/,
    parent: () => '/',
  },

  // Ship Tasks
  {
    pattern: /^\/ship-tasks\/([^/]+)$/,
    parent: () => '/ship-tasks',
  },
  {
    pattern: /^\/ship-tasks$/,
    parent: () => '/',
  },

  // Ship Operations
  {
    pattern: /^\/ship-operations\/([^/]+)$/,
    parent: () => '/ship-operations',
  },
  {
    pattern: /^\/ship-operations$/,
    parent: () => '/',
  },

  // Machine topic sub-routes
  {
    pattern: /^\/machine\/([^/]+)\/topics\/([^/]+)$/,
    parent: (match) => `/machine/${match[1]}/topics`,
  },
  {
    pattern: /^\/machine\/([^/]+)\/(topics|calculations|formulas|rules|assistant|quiz)$/,
    parent: () => '/hub/machine',
  },

  // Machine hub-level
  {
    pattern: /^\/machine\/(calculations|formulas|rules|assistant|quiz)$/,
    parent: () => '/hub/machine',
  },
  {
    pattern: /^\/machine-calculations$/,
    parent: () => '/hub/machine',
  },

  // Calculations hub
  {
    pattern: /^\/calculations\/([^/]+)\/([^/]+)$/,
    parent: (match) => `/hub/${match[1]}`,
  },
  {
    pattern: /^\/hub\/([^/]+)$/,
    parent: () => '/calculations',
  },

  // Navigation
  {
    pattern: /^\/navigation\/calc\/([^/]+)$/,
    parent: () => '/navigation',
  },
  {
    pattern: /^\/navigation\/tide-tutorial$/,
    parent: () => '/navigation',
  },
  {
    pattern: /^\/navigation\/colreg-presentation$/,
    parent: () => '/navigation',
  },
  {
    pattern: /^\/navigation\/meteorology$/,
    parent: () => '/navigation',
  },
  {
    pattern: /^\/navigation\/(formulas|rules|assistant|quiz)$/,
    parent: () => '/hub/navigation',
  },
  {
    pattern: /^\/navigation$/,
    parent: () => '/hub/navigation',
  },

  // Stability
  {
    pattern: /^\/stability\/formulas\/([^/]+)$/,
    parent: () => '/stability/formulas',
  },
  {
    pattern: /^\/stability\/practical\/(tank|fwa|ghm)$/,
    parent: () => '/stability/practical',
  },
  {
    pattern: /^\/stability\/(assistant|rules|gz-imo|advanced|grain|gm|weight-shift|free-surface|gz|analysis|stable-tales|formulas|calculations|practical|quiz|shearing-bending|grain-calculation|gz-curve|wind-weather|imo-criteria)$/,
    parent: () => '/stability',
  },
  {
    pattern: /^\/stability$/,
    parent: () => '/',
  },

  // Cargo
  {
    pattern: /^\/cargo\/calculations\/(draft-survey|preloading|intermediate|postdischarge|comparative|ballast|density|bunker)$/,
    parent: () => '/hub/cargo',
  },
  {
    pattern: /^\/cargo\/calculations$/,
    parent: () => '/hub/cargo',
  },
  {
    pattern: /^\/cargo\/(rules|assistant|quiz|formulas)$/,
    parent: () => '/hub/cargo',
  },

  // Meteorology
  {
    pattern: /^\/meteorology\/(formulas|rules|assistant|quiz|topics)$/,
    parent: () => '/hub/meteorology',
  },

  // Seamanship
  {
    pattern: /^\/seamanship\/calculations\/([^/]+)$/,
    parent: () => '/seamanship/calculations',
  },
  {
    pattern: /^\/seamanship\/(calculations|formulas|rules|assistant|quiz|knots)$/,
    parent: () => '/seamanship-menu',
  },

  // Safety
  {
    pattern: /^\/safety\/(formulas|rules|assistant|quiz)$/,
    parent: () => '/safety-menu',
  },

  // Environment
  {
    pattern: /^\/environment\/(calculations|formulas|rules|assistant|quiz)$/,
    parent: () => '/hub/environment',
  },

  // SOLAS
  {
    pattern: /^\/solas\/(regulations|certificates|ship-requirements|safety-equipment)$/,
    parent: () => '/hub/solas',
  },

  // Regulations
  {
    pattern: /^\/regulations\/([^/]+)$/,
    parent: () => '/regulations',
  },
  {
    pattern: /^\/regulations$/,
    parent: () => '/',
  },

  // Calculation sub-pages
  {
    pattern: /^\/ballast$/,
    parent: () => '/calculations',
  },
  {
    pattern: /^\/tank$/,
    parent: () => '/calculations',
  },
  {
    pattern: /^\/safety$/,
    parent: () => '/calculations',
  },
  {
    pattern: /^\/engine$/,
    parent: () => '/calculations',
  },
  {
    pattern: /^\/structural$/,
    parent: () => '/calculations',
  },
  {
    pattern: /^\/special-ships$/,
    parent: () => '/calculations',
  },
  {
    pattern: /^\/emissions$/,
    parent: () => '/calculations',
  },
  {
    pattern: /^\/economics$/,
    parent: () => '/calculations',
  },
  {
    pattern: /^\/hydrodynamics$/,
    parent: () => '/calculations',
  },
  {
    pattern: /^\/converter$/,
    parent: () => '/calculations',
  },

  // Weather
  {
    pattern: /^\/weather-forecast$/,
    parent: () => '/weather-menu',
  },

  // Top-level pages → home
  {
    pattern: /^\/location-selector$/,
    parent: () => '/',
  },
  {
    pattern: /^\/sunrise-times$/,
    parent: () => '/',
  },
  {
    pattern: /^\/sunset-times$/,
    parent: () => '/',
  },
  {
    pattern: /^\/settings$/,
    parent: () => '/',
  },
  {
    pattern: /^\/maritime-news$/,
    parent: () => '/',
  },
  {
    pattern: /^\/widgets$/,
    parent: () => '/',
  },
  {
    pattern: /^\/calculations$/,
    parent: () => '/',
  },
  {
    pattern: /^\/passage-plan$/,
    parent: () => '/',
  },
  {
    pattern: /^\/machinery$/,
    parent: () => '/',
  },
  {
    pattern: /^\/glossary$/,
    parent: () => '/',
  },
  {
    pattern: /^\/exam-preparation$/,
    parent: () => '/',
  },
  {
    pattern: /^\/moon-phases$/,
    parent: () => '/',
  },
  {
    pattern: /^\/clock$/,
    parent: () => '/',
  },
  {
    pattern: /^\/formulas$/,
    parent: () => '/',
  },
];

/**
 * Memoised parent-path lookup. Most navigations revisit the same handful
 * of routes, so a tiny LRU-ish cache avoids re-running the regex chain
 * on every back press / route change.
 */
const parentPathCache = new Map<string, string>();
const PARENT_CACHE_MAX = 64;

export const findParentPath = (pathname: string): string => {
  const cached = parentPathCache.get(pathname);
  if (cached !== undefined) return cached;

  let result = '/';
  for (const rule of navigationRules) {
    const match = pathname.match(rule.pattern);
    if (match) {
      result = rule.parent(match);
      break;
    }
  }

  if (parentPathCache.size >= PARENT_CACHE_MAX) {
    // Drop oldest entry (Map preserves insertion order).
    const firstKey = parentPathCache.keys().next().value;
    if (firstKey !== undefined) parentPathCache.delete(firstKey);
  }
  parentPathCache.set(pathname, result);
  return result;
};

const SENTINEL_KEY = '__hierarchy_back__';

/**
 * Hook that handles browser/mobile back button navigation
 * according to logical menu hierarchy instead of browser history.
 *
 * Performance design:
 *  - System listeners (Capacitor `backButton` + window `popstate`) are
 *    registered exactly ONCE for the lifetime of the app. They read the
 *    current pathname through refs, so route changes never tear down /
 *    re-add native listeners — important on low-end Android.
 *  - The sentinel `pushState` only runs when the actual pathname changes
 *    (not on every render) and is deferred to a microtask so it never
 *    contends with the React commit phase that just produced this route.
 *  - The returned object is memoised so consumers don't re-render unless
 *    `showExitDialog` actually flips.
 *
 * Behaviour:
 *  - Web: hijacks `popstate` so the browser back button walks up the
 *    logical hierarchy (not arbitrary history).
 *  - Android (Capacitor): same handler is wired to the hardware back
 *    button. NOTE: `useAndroidFeatures` must NOT register its own
 *    `backButton` listener — that would race with this one.
 *  - Top-level pages → exit-confirmation dialog instead of leaving
 *    the app silently.
 */
export const useNavigationHierarchy = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showExitDialog, setShowExitDialog] = useState(false);

  // Refs let the long-lived listeners read the latest values
  // without being re-created on every navigation.
  const pathnameRef = useRef(location.pathname);
  const searchRef = useRef(location.search);
  const navigateRef = useRef(navigate);

  // Keep refs current. Plain assignment in render is the React-recommended
  // pattern for this case and is cheaper than a useEffect.
  pathnameRef.current = location.pathname;
  searchRef.current = location.search;
  navigateRef.current = navigate;

  const handleBack = useCallback(() => {
    const path = pathnameRef.current;
    const parent = findParentPath(path);
    if (path === '/' || parent === '/' && path === parent) {
      setShowExitDialog(true);
      return;
    }
    if (parent === path) {
      // Defensive: don't loop on a self-referencing rule.
      setShowExitDialog(true);
      return;
    }
    navigateRef.current(parent, { replace: true });
  }, []);

  const closeExitDialog = useCallback(() => {
    setShowExitDialog(false);
  }, []);

  const confirmExit = useCallback(() => {
    setShowExitDialog(false);
    if (Capacitor.isNativePlatform()) {
      CapacitorApp.exitApp();
    }
  }, []);

  // Capacitor hardware back button — registered ONCE for the app's
  // lifetime. Reads the latest pathname/navigate via refs.
  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return;
    let listener: { remove: () => void } | undefined;
    let cancelled = false;
    CapacitorApp.addListener('backButton', () => {
      handleBack();
    }).then((l) => {
      if (cancelled) {
        l.remove();
      } else {
        listener = l;
      }
    });
    return () => {
      cancelled = true;
      listener?.remove();
    };
  }, [handleBack]);

  // Web/PWA browser back button — register popstate ONCE.
  useEffect(() => {
    if (Capacitor.isNativePlatform()) return;

    const handlePopState = () => {
      // Re-arm the sentinel before navigating so the next back press is
      // also captured. Use the refs so we always reference the current
      // route, not the route at listener-registration time.
      try {
        window.history.pushState(
          { [SENTINEL_KEY]: true },
          '',
          pathnameRef.current + searchRef.current,
        );
      } catch {
        /* pushState can throw in rare iframe contexts; ignore. */
      }
      handleBack();
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [handleBack]);

  // Sentinel push — runs SYNCHRONOUSLY on every pathname change so the
  // back button is intercepted from the very first render. Deferring this
  // (microtask/raf) creates a race: if the user taps back before the
  // sentinel lands, popstate fires without our marker and the browser
  // walks off the app entirely (looks like the app "exits" unexpectedly).
  // The cost of one synchronous pushState per navigation is negligible.
  useEffect(() => {
    if (Capacitor.isNativePlatform()) return;
    if (typeof window === 'undefined') return;

    const state = window.history.state as Record<string, unknown> | null;
    if (state?.[SENTINEL_KEY] === true) return;

    try {
      window.history.pushState(
        { ...(window.history.state ?? {}), [SENTINEL_KEY]: true },
        '',
        pathnameRef.current + searchRef.current,
      );
    } catch {
      /* pushState can throw in rare iframe/security contexts; ignore. */
    }
  }, [location.pathname]);

  // Stable return reference: only changes when `showExitDialog` flips.
  // Prevents downstream re-renders on every navigation.
  return useMemo(
    () => ({ showExitDialog, closeExitDialog, confirmExit }),
    [showExitDialog, closeExitDialog, confirmExit],
  );
};


