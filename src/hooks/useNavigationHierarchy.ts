import { useEffect, useCallback, useRef, useState } from 'react';
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

export const findParentPath = (pathname: string): string => {
  for (const rule of navigationRules) {
    const match = pathname.match(rule.pattern);
    if (match) {
      return rule.parent(match);
    }
  }
  return '/';
};

/**
 * Hook that handles browser/mobile back button navigation
 * according to logical menu hierarchy instead of browser history.
 *
 * Single source of truth for back-button behaviour across the app:
 *  - Web: hijacks `popstate` so the browser back button walks up the
 *    logical hierarchy (not arbitrary history).
 *  - Android (Capacitor): the same handler is wired to the hardware
 *    back button. NOTE: `useAndroidFeatures` must NOT register its
 *    own `backButton` listener — that would race with this one.
 *
 * Top-level pages (any path whose logical parent is `/`, including
 * `/` itself) trigger an exit-confirmation dialog instead of jumping
 * to the parent — so the user must explicitly confirm before the
 * app closes. This prevents the "two taps and we're out" bug.
 */
export const useNavigationHierarchy = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showExitDialog, setShowExitDialog] = useState(false);
  // Unused ref kept to avoid breaking existing callers if any
  const _lastBackPressAtRef = useRef(0);

  const isTopLevel = useCallback((path: string) => {
    if (path === '/') return true;
    return findParentPath(path) === '/';
  }, []);

  const navigateToParent = useCallback(() => {
    const parentPath = findParentPath(location.pathname);
    if (location.pathname === '/') {
      setShowExitDialog(true);
      return;
    }
    navigate(parentPath, { replace: true });
  }, [location.pathname, navigate]);

  const handleBack = useCallback(() => {
    if (isTopLevel(location.pathname)) {
      // Don't leave the app silently — ask first.
      setShowExitDialog(true);
      return;
    }
    navigate(findParentPath(location.pathname), { replace: true });
  }, [isTopLevel, location.pathname, navigate]);

  const closeExitDialog = useCallback(() => {
    setShowExitDialog(false);
  }, []);

  const confirmExit = useCallback(() => {
    setShowExitDialog(false);
    if (Capacitor.isNativePlatform()) {
      CapacitorApp.exitApp();
    }
  }, []);

  // Capacitor hardware back button — owned exclusively here.
  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return;
    let listener: { remove: () => void } | undefined;
    CapacitorApp.addListener('backButton', () => {
      handleBack();
    }).then((l) => {
      listener = l;
    });
    return () => {
      listener?.remove();
    };
  }, [handleBack]);

  // Web/PWA browser back button — intercept via a single sentinel
  // history entry per route. We push exactly ONE extra entry on mount
  // (and re-push after each pop), so the back button always fires
  // popstate here instead of leaving the app.
  useEffect(() => {
    if (Capacitor.isNativePlatform()) return;

    const sentinelKey = '__hierarchy_back__';

    // Only push a sentinel if the current entry isn't already one.
    if (window.history.state?.[sentinelKey] !== true) {
      window.history.pushState(
        { ...(window.history.state ?? {}), [sentinelKey]: true },
        '',
        location.pathname + location.search,
      );
    }

    const handlePopState = () => {
      // Re-arm the sentinel before navigating, so the next back press
      // is also captured (otherwise we'd fall off the stack).
      window.history.pushState(
        { [sentinelKey]: true },
        '',
        location.pathname + location.search,
      );
      handleBack();
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [location.pathname, location.search, handleBack]);

  return { showExitDialog, closeExitDialog, confirmExit };
};

