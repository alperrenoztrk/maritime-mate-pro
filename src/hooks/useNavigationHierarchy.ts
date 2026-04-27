import { useEffect, useCallback, useRef, useState, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { App as CapacitorApp } from '@capacitor/app';
import { Capacitor } from '@capacitor/core';

type NavigationRule = {
  pattern: RegExp;
  parent: (match: RegExpMatchArray) => string;
};

const navigationRules: NavigationRule[] = [
  // ── Lessons ────────────────────────────────────────────────
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

  // ── Crew & Bridge ──────────────────────────────────────────
  { pattern: /^\/crew\/([^/]+)$/, parent: () => '/crew' },
  { pattern: /^\/crew$/, parent: () => '/' },
  { pattern: /^\/bridge\/([^/]+)$/, parent: () => '/bridge' },
  { pattern: /^\/bridge$/, parent: () => '/' },

  // ── Ship Systems ───────────────────────────────────────────
  { pattern: /^\/ship-systems\/([^/]+)$/, parent: () => '/ship-systems' },
  { pattern: /^\/ship-systems$/, parent: () => '/' },

  // ── Ship Tasks ─────────────────────────────────────────────
  { pattern: /^\/ship-tasks\/([^/]+)$/, parent: () => '/ship-tasks' },
  { pattern: /^\/ship-tasks$/, parent: () => '/' },

  // ── Ship Operations ────────────────────────────────────────
  { pattern: /^\/ship-operations\/([^/]+)$/, parent: () => '/ship-operations' },
  { pattern: /^\/ship-operations$/, parent: () => '/' },

  // ── Machine: topic detayları ───────────────────────────────
  // /machine/<topic>/topics/<sub> → /machine/<topic>/topics
  {
    pattern: /^\/machine\/([^/]+)\/topics\/([^/]+)$/,
    parent: (match) => `/machine/${match[1]}/topics`,
  },
  // /machine/<topic>/(topics|calculations|...) → /lessons (Dersler)
  // Çünkü makine konuları Dersler menüsünden açılıyor.
  {
    pattern: /^\/machine\/([^/]+)\/(topics|calculations|formulas|rules|assistant|quiz)$/,
    parent: () => '/lessons',
  },
  // Eski /machine/<section> sayfaları → Hesaplamalar
  {
    pattern: /^\/machine\/(calculations|formulas|rules|assistant|quiz)$/,
    parent: () => '/calculations',
  },
  { pattern: /^\/machine-calculations$/, parent: () => '/calculations' },
  { pattern: /^\/machinery$/, parent: () => '/' },

  // ── Calculations hub ───────────────────────────────────────
  // /calculations/<cat>/<sec> → /calculations
  {
    pattern: /^\/calculations\/([^/]+)\/([^/]+)$/,
    parent: () => '/calculations',
  },
  { pattern: /^\/calculations$/, parent: () => '/' },

  // ── Navigation (Seyir) ─────────────────────────────────────
  { pattern: /^\/navigation\/calc\/([^/]+)$/, parent: () => '/navigation' },
  { pattern: /^\/navigation\/tide-tutorial$/, parent: () => '/navigation' },
  { pattern: /^\/navigation\/colreg-presentation$/, parent: () => '/navigation' },
  { pattern: /^\/navigation\/meteorology$/, parent: () => '/navigation' },
  {
    pattern: /^\/navigation\/(formulas|rules|assistant|quiz)$/,
    parent: () => '/navigation',
  },
  { pattern: /^\/navigation$/, parent: () => '/calculations' },

  // ── Stability ──────────────────────────────────────────────
  {
    pattern: /^\/stability\/formulas\/([^/]+)$/,
    parent: () => '/stability/formulas',
  },
  {
    pattern: /^\/stability\/practical\/(tank|fwa|ghm)$/,
    parent: () => '/stability/practical',
  },
  // Tüm stability alt sayfaları → Hesaplamalar (üst menü)
  {
    pattern: /^\/stability\/(assistant|rules|gz-imo|advanced|grain|gm|weight-shift|free-surface|gz|analysis|stable-tales|formulas|calculations|practical|quiz|shearing-bending|grain-calculation|gz-curve|wind-weather|imo-criteria)$/,
    parent: () => '/calculations',
  },
  { pattern: /^\/stability$/, parent: () => '/calculations' },

  // ── Cargo ──────────────────────────────────────────────────
  {
    pattern: /^\/cargo\/calculations\/([^/]+)$/,
    parent: () => '/cargo/calculations',
  },
  { pattern: /^\/cargo\/calculations$/, parent: () => '/calculations' },
  {
    pattern: /^\/cargo\/(rules|assistant|quiz|formulas)$/,
    parent: () => '/calculations',
  },

  // ── Meteorology ────────────────────────────────────────────
  {
    pattern: /^\/meteorology\/(formulas|rules|assistant|quiz|topics)$/,
    parent: () => '/calculations',
  },

  // ── Seamanship ─────────────────────────────────────────────
  {
    pattern: /^\/seamanship\/calculations\/([^/]+)$/,
    parent: () => '/seamanship/calculations',
  },
  {
    pattern: /^\/seamanship\/(calculations|formulas|rules|assistant|quiz|knots)$/,
    parent: () => '/calculations',
  },

  // ── Safety ─────────────────────────────────────────────────
  { pattern: /^\/safety\/(formulas|rules|assistant|quiz)$/, parent: () => '/calculations' },
  { pattern: /^\/safety$/, parent: () => '/calculations' },

  // ── Environment / Emissions ────────────────────────────────
  {
    pattern: /^\/environment\/(calculations|formulas|rules|assistant|quiz)$/,
    parent: () => '/calculations',
  },
  { pattern: /^\/emissions$/, parent: () => '/calculations' },

  // ── SOLAS ──────────────────────────────────────────────────
  {
    pattern: /^\/solas\/(regulations|certificates|ship-requirements|safety-equipment)$/,
    parent: () => '/calculations',
  },

  // ── Regulations ────────────────────────────────────────────
  { pattern: /^\/regulations\/([^/]+)$/, parent: () => '/regulations' },
  { pattern: /^\/regulations$/, parent: () => '/' },

  // ── Diğer hesaplama sayfaları ──────────────────────────────
  { pattern: /^\/ballast$/, parent: () => '/calculations' },
  { pattern: /^\/tank$/, parent: () => '/calculations' },
  { pattern: /^\/engine$/, parent: () => '/calculations' },
  { pattern: /^\/structural$/, parent: () => '/calculations' },
  { pattern: /^\/special-ships$/, parent: () => '/calculations' },
  { pattern: /^\/economics$/, parent: () => '/calculations' },
  { pattern: /^\/hydrodynamics$/, parent: () => '/calculations' },
  { pattern: /^\/converter$/, parent: () => '/calculations' },

  // ── Beta ───────────────────────────────────────────────────
  { pattern: /^\/beta\/([^/]+)$/, parent: () => '/beta' },
  { pattern: /^\/beta$/, parent: () => '/' },

  // ── Weather / Konum ────────────────────────────────────────
  { pattern: /^\/weather-forecast$/, parent: () => '/' },
  { pattern: /^\/location-selector$/, parent: () => '/' },
  { pattern: /^\/sunrise-times$/, parent: () => '/' },
  { pattern: /^\/sunset-times$/, parent: () => '/' },
  { pattern: /^\/moon-phases$/, parent: () => '/' },
  { pattern: /^\/clock$/, parent: () => '/' },

  // ── Genel üst seviye ───────────────────────────────────────
  { pattern: /^\/settings$/, parent: () => '/' },
  { pattern: /^\/maritime-news$/, parent: () => '/' },
  { pattern: /^\/widgets$/, parent: () => '/' },
  { pattern: /^\/passage-plan$/, parent: () => '/' },
  { pattern: /^\/glossary$/, parent: () => '/' },
  { pattern: /^\/exam-preparation$/, parent: () => '/' },
  { pattern: /^\/formulas$/, parent: () => '/' },
  { pattern: /^\/empty-page$/, parent: () => '/' },
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
    // HARD RULE: back button MUST NEVER exit the app, no matter how many
    // times the user presses it. On the home route we deliberately do
    // nothing — staying put is the desired behaviour.
    if (path === '/') {
      return;
    }
    const parent = findParentPath(path);
    // Self-referencing rule or unmapped route → fall back to home, never exit.
    if (!parent || parent === path) {
      navigateRef.current('/', { replace: true });
      return;
    }
    navigateRef.current(parent, { replace: true });
  }, []);

  const closeExitDialog = useCallback(() => {
    setShowExitDialog(false);
  }, []);

  // Kept for backwards compatibility with consumers, but the back button
  // never triggers an exit dialog anymore — so this is effectively a no-op.
  const confirmExit = useCallback(() => {
    setShowExitDialog(false);
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


