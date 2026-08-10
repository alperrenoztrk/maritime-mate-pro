const MAX_PREVIEWS = 3;

type RoutePreview = {
  pathname: string;
  surface: HTMLElement;
};

const previews = new Map<string, RoutePreview>();

const makeInert = (root: HTMLElement) => {
  root.setAttribute("aria-hidden", "true");
  root.setAttribute("inert", "");
  root.querySelectorAll<HTMLElement>("[id]").forEach((element) => element.removeAttribute("id"));
  root
    .querySelectorAll<HTMLElement>("a, button, input, select, textarea, [tabindex]")
    .forEach((element) => element.setAttribute("tabindex", "-1"));
  root.querySelectorAll("script, iframe, video, audio").forEach((element) => element.remove());
};

/**
 * Keeps a small, inert DOM snapshot of recently visited route surfaces.
 *
 * A detached clone is intentionally used instead of a bitmap capture: it is
 * synchronous, does not pull html2canvas into the entry bundle, stays sharp at
 * every display scale and continues to use the active light/dark theme tokens.
 */
export const captureRoutePreview = (pathname: string, surface: HTMLElement | null) => {
  if (!surface || !pathname) return;

  const clone = surface.cloneNode(true) as HTMLElement;
  clone.classList.remove("edge-swipe-page", "edge-swipe-committing");
  clone.style.removeProperty("transform");
  clone.style.removeProperty("transition");
  clone.style.removeProperty("will-change");
  makeInert(clone);

  previews.delete(pathname);
  previews.set(pathname, { pathname, surface: clone });
  while (previews.size > MAX_PREVIEWS) {
    const oldest = previews.keys().next().value as string | undefined;
    if (!oldest) break;
    previews.delete(oldest);
  }
};

export const mountRoutePreview = (pathname: string, host: HTMLElement | null): boolean => {
  if (!host) return false;
  host.replaceChildren();

  const preview = previews.get(pathname);
  if (!preview) return false;

  const clone = preview.surface.cloneNode(true) as HTMLElement;
  makeInert(clone);
  host.appendChild(clone);
  return true;
};

export const clearRoutePreviewHost = (host: HTMLElement | null) => {
  host?.replaceChildren();
};
