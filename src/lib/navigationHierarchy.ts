type NavigationRule = {
  pattern: RegExp;
  parent: (match: RegExpMatchArray) => string;
};

/**
 * Logical route hierarchy used by every back-navigation source.
 *
 * Keep the most specific routes first. A missing deep route used to fall
 * through to "/" and made one press look like several pages had been skipped.
 */
const navigationRules: NavigationRule[] = [
  // Lessons
  {
    pattern: /^\/lessons\/([^/]+)\/topics\/([^/]+)$/,
    parent: (match) => `/lessons/${match[1]}/topics`,
  },
  {
    pattern: /^\/lessons\/([^/]+)\/(formulas|calculations|rules|quiz)$/,
    parent: () => "/lessons",
  },
  {
    pattern: /^\/lessons\/([^/]+)\/topics$/,
    parent: () => "/lessons",
  },
  { pattern: /^\/lessons$/, parent: () => "/" },

  // Exercises
  {
    pattern: /^\/exercises\/([^/]+)\/topics\/([^/]+)\/learn$/,
    parent: (match) => `/exercises/${match[1]}/topics`,
  },
  {
    pattern: /^\/exercises\/([^/]+)\/topics\/([^/]+)$/,
    parent: (match) => `/exercises/${match[1]}/topics`,
  },
  {
    pattern: /^\/exercises\/([^/]+)\/scenarios$/,
    parent: (match) => `/exercises/${match[1]}/topics`,
  },
  {
    pattern: /^\/exercises\/([^/]+)\/topics$/,
    parent: () => "/exercises",
  },
  { pattern: /^\/exercises$/, parent: () => "/" },

  // Crew and bridge
  {
    pattern: /^\/crew\/([^/]+)\/task\/([^/]+)$/,
    parent: (match) => `/crew/${match[1]}`,
  },
  { pattern: /^\/crew\/([^/]+)$/, parent: () => "/crew" },
  { pattern: /^\/crew$/, parent: () => "/" },
  { pattern: /^\/bridge\/([^/]+)$/, parent: () => "/bridge" },
  { pattern: /^\/bridge$/, parent: () => "/" },

  // Ship systems, tasks and operations
  {
    pattern: /^\/ship-systems\/([^/]+)\/([^/]+)$/,
    parent: (match) => `/ship-systems/${match[1]}`,
  },
  { pattern: /^\/ship-systems\/([^/]+)$/, parent: () => "/ship-systems" },
  { pattern: /^\/ship-systems$/, parent: () => "/" },
  { pattern: /^\/ship-tasks\/([^/]+)$/, parent: () => "/ship-tasks" },
  { pattern: /^\/ship-tasks$/, parent: () => "/" },
  {
    pattern: /^\/ship-operations\/([^/]+)\/([^/]+)\/([^/]+)$/,
    parent: (match) => `/ship-operations/${match[1]}`,
  },
  { pattern: /^\/ship-operations\/([^/]+)$/, parent: () => "/ship-operations" },
  { pattern: /^\/ship-operations$/, parent: () => "/" },

  // Machine lessons and legacy calculation pages
  {
    pattern: /^\/machine\/([^/]+)\/topics\/([^/]+)$/,
    parent: (match) => `/machine/${match[1]}/topics`,
  },
  {
    pattern: /^\/machine\/([^/]+)\/(topics|calculations|formulas|rules|assistant|quiz)$/,
    parent: () => "/lessons",
  },
  {
    pattern: /^\/machine\/(calculations|formulas|rules|assistant|quiz)$/,
    parent: () => "/calculations",
  },
  { pattern: /^\/machine-calculations$/, parent: () => "/calculations" },
  { pattern: /^\/machinery$/, parent: () => "/" },

  // Calculation hub and course families
  {
    pattern: /^\/calculations\/([^/]+)\/([^/]+)$/,
    parent: () => "/calculations",
  },
  { pattern: /^\/calculations$/, parent: () => "/" },
  { pattern: /^\/navigation\/calc\/([^/]+)$/, parent: () => "/navigation" },
  {
    pattern: /^\/navigation\/(tide-tutorial|colreg-presentation|meteorology|formulas|rules|assistant|quiz)$/,
    parent: () => "/navigation",
  },
  { pattern: /^\/navigation$/, parent: () => "/calculations" },
  {
    pattern: /^\/stability\/formulas\/([^/]+)$/,
    parent: () => "/stability/formulas",
  },
  {
    pattern: /^\/stability\/practical\/(tank|fwa|ghm)$/,
    parent: () => "/stability/practical",
  },
  {
    pattern: /^\/stability\/(assistant|rules|gz-imo|grain|gm|weight-shift|free-surface|gz|analysis|stable-tales|formulas|calculations|practical|quiz|shearing-bending|grain-calculation|gz-curve|wind-weather|imo-criteria)$/,
    parent: () => "/calculations",
  },
  { pattern: /^\/stability$/, parent: () => "/calculations" },
  {
    pattern: /^\/cargo\/calculations\/([^/]+)$/,
    parent: () => "/cargo/calculations",
  },
  { pattern: /^\/cargo\/calculations$/, parent: () => "/calculations" },
  {
    pattern: /^\/cargo\/(rules|assistant|quiz|formulas)$/,
    parent: () => "/calculations",
  },
  {
    pattern: /^\/meteorology\/(formulas|rules|assistant|quiz|topics)$/,
    parent: () => "/calculations",
  },
  { pattern: /^\/communication\/assistant$/, parent: () => "/calculations" },
  {
    pattern: /^\/seamanship\/calculations\/([^/]+)$/,
    parent: () => "/seamanship/calculations",
  },
  {
    pattern: /^\/seamanship\/(calculations|formulas|rules|assistant|quiz|knots)$/,
    parent: () => "/calculations",
  },
  { pattern: /^\/safety\/(formulas|rules|assistant|quiz)$/, parent: () => "/calculations" },
  { pattern: /^\/safety$/, parent: () => "/calculations" },
  {
    pattern: /^\/environment\/(calculations|formulas|rules|assistant|quiz)$/,
    parent: () => "/calculations",
  },
  { pattern: /^\/emissions$/, parent: () => "/calculations" },
  {
    pattern: /^\/solas\/(regulations|certificates|ship-requirements|safety-equipment)$/,
    parent: () => "/calculations",
  },
  {
    pattern: /^\/economics\/(assistant|quiz)$/,
    parent: () => "/economics",
  },
  { pattern: /^\/economics$/, parent: () => "/calculations" },
  {
    pattern: /^\/(ballast|tank|engine|hydrodynamics|structural|special-ships|converter)$/,
    parent: () => "/calculations",
  },

  // Other feature families
  { pattern: /^\/regulations\/([^/]+)$/, parent: () => "/regulations" },
  { pattern: /^\/beta\/([^/]+)$/, parent: () => "/beta" },
  { pattern: /^\/beta$/, parent: () => "/" },
  { pattern: /^\/auth\/callback$/, parent: () => "/auth" },
  { pattern: /^\/\.lovable\/oauth\/consent$/, parent: () => "/auth" },
  { pattern: /^\/widgets$/, parent: () => "/" },

  // Explicit coverage for every top-level route rendered by App.tsx.
  {
    pattern: /^\/(maritime-news|glossary|passage-plan|settings|formulas|regulations|clock|auth|weather-forecast|sunset-times|sunrise-times|location-selector|exam-preparation|empty-page|moon-phases)$/,
    parent: () => "/",
  },
];

type ParentResolution = {
  matched: boolean;
  parent: string;
};

const parentPathCache = new Map<string, ParentResolution>();
const PARENT_CACHE_MAX = 96;

const normalizePathname = (pathname: string): string => {
  const pathOnly = pathname.split(/[?#]/, 1)[0] || "/";
  return pathOnly === "/" ? "/" : pathOnly.replace(/\/+$/, "");
};

const resolveParentPath = (pathname: string): ParentResolution => {
  const normalized = normalizePathname(pathname);
  const cached = parentPathCache.get(normalized);
  if (cached) return cached;

  let resolution: ParentResolution = { matched: false, parent: "/" };
  for (const rule of navigationRules) {
    const match = normalized.match(rule.pattern);
    if (match) {
      resolution = { matched: true, parent: rule.parent(match) };
      break;
    }
  }

  if (parentPathCache.size >= PARENT_CACHE_MAX) {
    const firstKey = parentPathCache.keys().next().value;
    if (firstKey !== undefined) parentPathCache.delete(firstKey);
  }
  parentPathCache.set(normalized, resolution);
  return resolution;
};

export const findParentPath = (pathname: string): string =>
  resolveParentPath(pathname).parent;

export const hasExplicitParentPath = (pathname: string): boolean =>
  resolveParentPath(pathname).matched;

export const createBackNavigationGuard = (cooldownMs = 450) => {
  let lockedUntil = Number.NEGATIVE_INFINITY;

  return {
    claim(now = Date.now()): boolean {
      if (now < lockedUntil) return false;
      lockedUntil = now + cooldownMs;
      return true;
    },
  };
};

// Shared by the floating control, reusable BackButton and native/browser
// handlers. One physical action can therefore never be processed by two
// different navigation sources.
const sharedBackNavigationGuard = createBackNavigationGuard();

export const claimBackNavigation = (now?: number): boolean =>
  sharedBackNavigationGuard.claim(now);

