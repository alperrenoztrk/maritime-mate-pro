import { useEffect, useCallback, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { App as CapacitorApp } from '@capacitor/app';
import { Capacitor } from '@capacitor/core';
import { toast } from 'sonner';

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
    parent: () => '/solas',
  },
  {
    pattern: /^\/solas$/,
    parent: () => '/',
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

  // Menu pages
  {
    pattern: /^\/navigation-menu$/,
    parent: () => '/',
  },
  {
    pattern: /^\/seamanship-menu$/,
    parent: () => '/',
  },
  {
    pattern: /^\/safety-menu$/,
    parent: () => '/',
  },
  {
    pattern: /^\/weather-menu$/,
    parent: () => '/',
  },
  {
    pattern: /^\/economics-menu$/,
    parent: () => '/',
  },
  {
    pattern: /^\/tank-menu$/,
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
 * according to logical menu hierarchy instead of browser history
 */
export const useNavigationHierarchy = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const lastBackPressAtRef = useRef(0);
  const EXIT_CONFIRMATION_WINDOW_MS = 2000;

  const navigateToParent = useCallback(() => {
    const parentPath = findParentPath(location.pathname);
    if (location.pathname === '/' && parentPath === '/') {
      return;
    }
    navigate(parentPath, { replace: true });
  }, [location.pathname, navigate]);

  useEffect(() => {
    // Handle mobile back button (Capacitor)
    let backButtonListener: { remove: () => void } | undefined;
    if (Capacitor.isNativePlatform()) {
      CapacitorApp.addListener('backButton', ({ canGoBack }) => {
        if (!canGoBack && location.pathname === '/') {
          const now = Date.now();
          const shouldExit = now - lastBackPressAtRef.current < EXIT_CONFIRMATION_WINDOW_MS;

          if (shouldExit) {
            CapacitorApp.exitApp();
            return;
          }

          lastBackPressAtRef.current = now;
          toast.info('Çıkmak için geri tuşuna tekrar basın');
          return;
        }
        navigateToParent();
      }).then(listener => {
        backButtonListener = listener;
      });
    }

    // Handle browser back button (popstate)
    // Push an extra history entry so we can intercept the back press
    const handlePopState = (e: PopStateEvent) => {
      // Prevent default browser back and navigate to logical parent instead
      e.preventDefault();
      // Re-push state so the next back press is also intercepted
      window.history.pushState(null, '', location.pathname);
      navigateToParent();
    };

    // Push a state entry so popstate fires on back press
    window.history.pushState(null, '', location.pathname);
    window.addEventListener('popstate', handlePopState);

    return () => {
      backButtonListener?.remove();
      window.removeEventListener('popstate', handlePopState);
    };
  }, [location.pathname, navigateToParent]);
};
