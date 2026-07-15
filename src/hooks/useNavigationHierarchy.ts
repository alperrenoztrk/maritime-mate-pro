import { useEffect, useCallback, useRef, useState, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { App as CapacitorApp } from '@capacitor/app';
import { Capacitor } from '@capacitor/core';
import { isBookContentPath } from '@/lib/bookRoutes';

type NavigationRule = {
  pattern: RegExp;
  parent: (match: RegExpMatchArray) => string;
};

const navigationRules: NavigationRule[] = [
  // ── Kitap (İçindekiler) ────────────────────────────────────
  { pattern: /^\/book$/, parent: () => '/' },

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
    pattern: /^\/lessons\/([^/]+)\/(formulas|calculations|rules|quiz)$/,
    parent: (match) => `/lessons/${match[1]}/topics`,
  },
  {
    pattern: /^\/lessons$/,
    parent: () => '/book',
  },

  // ── Exercises (Alıştırmalar) ───────────────────────────────
  {
    pattern: /^\/exercises\/([^/]+)\/topics\/([^/]+)\/learn$/,
    parent: (match) => `/exercises/${match[1]}/topics/${match[2]}`,
  },
  {
    pattern: /^\/exercises\/([^/]+)\/topics\/([^/]+)$/,
    parent: (match) => `/exercises/${match[1]}/topics`,
  },
  { pattern: /^\/exercises\/([^/]+)\/topics$/, parent: () => '/exercises' },
  { pattern: /^\/exercises\/([^/]+)\/scenarios$/, parent: () => '/exercises' },
  { pattern: /^\/exercises$/, parent: () => '/book' },

  // ── Crew & Bridge ──────────────────────────────────────────
  {
    pattern: /^\/crew\/([^/]+)\/task\/([^/]+)$/,
    parent: (match) => `/crew/${match[1]}`,
  },
  { pattern: /^\/crew\/([^/]+)$/, parent: () => '/crew' },
  { pattern: /^\/crew$/, parent: () => '/book' },
  { pattern: /^\/bridge\/([^/]+)$/, parent: () => '/bridge' },
  { pattern: /^\/bridge$/, parent: () => '/book' },

  // ── Ship Systems ───────────────────────────────────────────
  {
    pattern: /^\/ship-systems\/([^/]+)\/([^/]+)$/,
    parent: (match) => `/ship-systems/${match[1]}`,
  },
  { pattern: /^\/ship-systems\/([^/]+)$/, parent: () => '/ship-systems' },
  { pattern: /^\/ship-systems$/, parent: () => '/book' },

  // ── Ship Tasks ─────────────────────────────────────────────
  { pattern: /^\/ship-tasks\/([^/]+)$/, parent: () => '/ship-tasks' },
  { pattern: /^\/ship-tasks$/, parent: () => '/book' },

  // ── Ship Operations ────────────────────────────────────────
  {
    pattern: /^\/ship-operations\/([^/]+)\/([^/]+)\/([^/]+)$/,
    parent: (match) => `/ship-operations/${match[1]}`,
  },
  { pattern: /^\/ship-operations\/([^/]+)$/, parent: () => '/ship-operations' },
  { pattern: /^\/ship-operations$/, parent: () => '/book' },

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
  { pattern: /^\/machinery$/, parent: () => '/book' },

  // ── Calculations hub ───────────────────────────────────────
  // /calculations/<cat>/<sec> → /calculations
  {
    pattern: /^\/calculations\/([^/]+)\/([^/]+)$/,
    parent: () => '/calculations',
  },
  { pattern: /^\/calculations$/, parent: () => '/book' },

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
    pattern: /^\/stability\/(assistant|rules|gz-imo|grain|gm|weight-shift|free-surface|gz|analysis|stable-tales|formulas|calculations|practical|quiz|shearing-bending|grain-calculation|gz-curve|wind-weather|imo-criteria)$/,
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
  { pattern: /^\/regulations$/, parent: () => '/book' },

  // ── Economics / Communication ──────────────────────────────
  { pattern: /^\/economics\/(assistant|quiz)$/, parent: () => '/economics' },
  { pattern: /^\/communication\/assistant$/, parent: () => '/calculations' },

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
  { pattern: /^\/passage-plan$/, parent: () => '/calculations' },
  { pattern: /^\/glossary$/, parent: () => '/book' },
  { pattern: /^\/exam-preparation$/, parent: () => '/book' },
  { pattern: /^\/formulas$/, parent: () => '/book' },
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

  // A newly added educational leaf must never fall out of the open book just
  // because its more specific parent rule has not been added yet.
  let result = isBookContentPath(pathname) ? '/book' : '/';
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

  pathnameRef.current = location.pathname;
  searchRef.current = location.search;
  navigateRef.current = navigate;

  // Re-entrancy / debounce guard. Rapid double-taps of the hardware back
  // button used to race: the 2nd press could fire before react-router
  // finished committing the 1st navigate, reading a stale path. A short
  // cooldown (~250 ms) collapses bursts into a single climb-one-level.
  const lastBackAtRef = useRef(0);
  const BACK_COOLDOWN_MS = 250;

  const handleBack = useCallback((event?: { preventDefault?: () => void }) => {
    // Defensive: tell Capacitor we own this event. No-op in Cap 7 where
    // listener presence already suppresses default, but harmless.
    try { event?.preventDefault?.(); } catch { /* ignore */ }

    const now = Date.now();
    if (now - lastBackAtRef.current < BACK_COOLDOWN_MS) {
      // Swallow rapid repeat press — prevents the race that used to look
      // like "app exits after two presses".
      return;
    }
    lastBackAtRef.current = now;

    const path =
      typeof window !== 'undefined'
        ? window.location.pathname
        : pathnameRef.current;
    // HARD RULE: the back button MUST NEVER exit the app, no matter how many
    // times it is pressed. On the home route we deliberately do nothing.
    if (path === '/') {
      return;
    }
    const parent = findParentPath(path);
    if (!parent || parent === path) {
      navigateRef.current('/', { replace: true });
      return;
    }
    navigateRef.current(parent, { replace: true });
  }, []);

  const closeExitDialog = useCallback(() => {
    setShowExitDialog(false);
  }, []);

  const confirmExit = useCallback(() => {
    setShowExitDialog(false);
  }, []);

  // Capacitor hardware back button — registered ONCE for the app's lifetime.
  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return;
    let listener: { remove: () => void } | undefined;
    let cancelled = false;
    CapacitorApp.addListener('backButton', (event) => {
      handleBack(event as { preventDefault?: () => void });
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
      handleBack();
      try {
        window.history.pushState(
          { ...(window.history.state ?? {}), [SENTINEL_KEY]: true },
          '',
          window.location.pathname + window.location.search,
        );
      } catch {
        /* pushState can throw in rare iframe contexts; ignore. */
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [handleBack]);

  // Sentinel push — runs on every pathname change so back is intercepted
  // from the very first render. Now ALSO active on native: if Android's
  // WebView ever falls through to its default goBack() (plugin race during
  // cold start), the sentinel entry is consumed instead of the app being
  // minimized.
  useEffect(() => {
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

  return useMemo(
    () => ({ showExitDialog, closeExitDialog, confirmExit }),
    [showExitDialog, closeExitDialog, confirmExit],
  );
};


