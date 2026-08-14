export type AppTabId = "home" | "learn" | "tools" | "library" | "search";

export const APP_TAB_ROOTS: Record<AppTabId, string> = {
  home: "/",
  learn: "/lessons",
  tools: "/calculations",
  library: "/library",
  search: "/search",
};

const LEARN_ROUTES = [
  /^\/lessons(?:\/|$)/,
  /^\/exercises(?:\/|$)/,
  /^\/exam-preparation(?:\/|$)/,
  /^\/machine\/[^/]+\/topics(?:\/|$)/,
];

const TOOL_ROUTES = [
  /^\/calculations(?:\/|$)/,
  /^\/(?:stability|cargo|meteorology|navigation|economics|safety|seamanship|environment)(?:\/|$)/,
  /^\/(?:ballast|tank|engine|structural|special-ships|emissions|converter|hydrodynamics|machine-calculations)$/,
  /^\/machine\/(?:calculations|formulas|rules|assistant|quiz)$/,
  /^\/machine\/[^/]+\/(?:calculations|formulas|rules|assistant|quiz)(?:\/|$)/,
  /^\/solas(?:\/|$)/,
];

const LIBRARY_ROUTES = [
  /^\/library$/,
  /^\/(?:crew|bridge|ship-systems|ship-tasks|ship-operations|glossary|regulations|passage-plan)(?:\/|$)/,
  /^\/communication(?:\/|$)/,
];

export const appTabForPath = (pathname: string): AppTabId => {
  if (/^\/search(?:\/|$)/.test(pathname)) return "search";
  if (LEARN_ROUTES.some((pattern) => pattern.test(pathname))) return "learn";
  if (TOOL_ROUTES.some((pattern) => pattern.test(pathname))) return "tools";
  if (LIBRARY_ROUTES.some((pattern) => pattern.test(pathname))) return "library";
  return "home";
};

export const isAppTabRoot = (pathname: string) =>
  Object.values(APP_TAB_ROOTS).includes(pathname);

export const hasHierarchicalBack = (pathname: string) => !isAppTabRoot(pathname);

export const isTabSwitch = (from: string | undefined, to: string) =>
  Boolean(from && from !== to && appTabForPath(from) !== appTabForPath(to));
