const CHROMELESS_ROUTES = [
  /^\/auth(?:\/|$)/,
  /^\/reset-password$/,
  /^\/\.lovable\/oauth\/consent$/,
  /^\/notes(?:\/|$)/,
  /^\/exercises\/[^/]+\/topics\/[^/]+\/learn$/,
];

export const isAppChromeHidden = (pathname: string) =>
  CHROMELESS_ROUTES.some((pattern) => pattern.test(pathname));

// Documented visual exceptions to the single maritime content plane. These
// routes are simulations/visualizations whose background is part of the data,
// not decorative page chrome.
const IMMERSIVE_PAGE_ROUTES = [
  /^\/moon-phases$/,
  /^\/beta\/ship-simulator$/,
];

export const isAppPageImmersive = (pathname: string) =>
  isAppChromeHidden(pathname) || IMMERSIVE_PAGE_ROUTES.some((pattern) => pattern.test(pathname));
