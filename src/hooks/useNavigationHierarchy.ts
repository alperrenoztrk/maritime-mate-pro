import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { App as CapacitorApp } from '@capacitor/app';

type NavigationRule = {
  pattern: RegExp;
  parent: (match: RegExpMatchArray) => string;
};

const navigationRules: NavigationRule[] = [
  {
    pattern: /^\/lessons\/([^/]+)\/topics\/([^/]+)$/,
    parent: (match) => `/lessons/${match[1]}/topics`,
  },
  {
    pattern: /^\/lessons\/([^/]+)\/topics$/,
    parent: () => '/lessons',
  },
  {
    pattern: /^\/crew\/([^/]+)$/,
    parent: () => '/crew',
  },
  {
    pattern: /^\/bridge\/([^/]+)$/,
    parent: () => '/bridge',
  },
  {
    pattern: /^\/calculations\/([^/]+)\/([^/]+)$/,
    parent: (match) => `/hub/${match[1]}`,
  },
  {
    pattern: /^\/hub\/([^/]+)$/,
    parent: () => '/calculations',
  },
  {
    pattern: /^\/navigation\/calc\/([^/]+)$/,
    parent: () => '/navigation',
  },
  {
    pattern: /^\/navigation\/tide-tutorial$/,
    parent: () => '/navigation',
  },
  {
    pattern: /^\/navigation\/(formulas|rules|assistant|quiz|meteorology)$/,
    parent: () => '/hub/navigation',
  },
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
    pattern: /^\/cargo\/calculations\/(draft-survey|preloading|intermediate|postdischarge|comparative|ballast|density|bunker)$/,
    parent: () => '/cargo/calculations',
  },
  {
    pattern: /^\/cargo\/calculations$/,
    parent: () => '/hub/cargo',
  },
  {
    pattern: /^\/cargo\/(rules|assistant|quiz|formulas)$/,
    parent: () => '/hub/cargo',
  },
  {
    pattern: /^\/meteorology\/(formulas|rules|assistant|quiz|topics)$/,
    parent: () => '/hub/meteorology',
  },
  {
    pattern: /^\/seamanship\/calculations\/([^/]+)$/,
    parent: () => '/seamanship/calculations',
  },
  {
    pattern: /^\/seamanship\/(calculations|formulas|rules|assistant|quiz|knots)$/,
    parent: () => '/seamanship-menu',
  },
  {
    pattern: /^\/safety\/(formulas|rules|assistant|quiz)$/,
    parent: () => '/safety-menu',
  },
  {
    pattern: /^\/machine\/(calculations|formulas|rules|assistant|quiz)$/,
    parent: () => '/hub/machine',
  },
  {
    pattern: /^\/environment\/(calculations|formulas|rules|assistant|quiz)$/,
    parent: () => '/hub/environment',
  },
  {
    pattern: /^\/solas\/(regulations|certificates|ship-requirements|safety-equipment)$/,
    parent: () => '/solas',
  },
  {
    pattern: /^\/regulations\/([^/]+)$/,
    parent: () => '/regulations',
  },
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
    pattern: /^\/weather-forecast$/,
    parent: () => '/weather-menu',
  },
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
    pattern: /^\/stability$/,
    parent: () => '/',
  },
  {
    pattern: /^\/solas$/,
    parent: () => '/',
  },
  {
    pattern: /^\/navigation$/,
    parent: () => '/hub/navigation',
  },
  {
    pattern: /^\/hydrodynamics$/,
    parent: () => '/calculations',
  },
  {
    pattern: /^\/passage-plan$/,
    parent: () => '/',
  },
];

const findParentPath = (pathname: string) => {
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

  useEffect(() => {
    const navigateToParent = () => {
      const parentPath = findParentPath(location.pathname);
      if (location.pathname === '/' && parentPath === '/') {
        navigate('/', { replace: true });
        return;
      }
      navigate(parentPath, { replace: true });
    };

    // Handle mobile back button (Capacitor)
    let backButtonListener: { remove: () => void } | undefined;
    CapacitorApp.addListener('backButton', ({ canGoBack }) => {
      if (!canGoBack && location.pathname === '/') {
        navigate('/', { replace: true });
        return;
      }
      navigateToParent();
    }).then(listener => {
      backButtonListener = listener;
    });

    return () => {
      backButtonListener?.remove();
    };
  }, [location.pathname, navigate]);
};
