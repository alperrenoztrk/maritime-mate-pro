const CHROMELESS_ROUTES = [
  /^\/auth(?:\/|$)/,
  /^\/reset-password$/,
  /^\/\.lovable\/oauth\/consent$/,
  /^\/notes(?:\/|$)/,
  /^\/exercises\/[^/]+\/topics\/[^/]+\/learn$/,
];

export const isAppChromeHidden = (pathname: string) =>
  CHROMELESS_ROUTES.some((pattern) => pattern.test(pathname));
