const MAX_PREVIEWS = 3;
const PREVIEW_LINE_COUNT = 5;

type RoutePreview = {
  pathname: string;
  title: string;
};

const previews = new Map<string, RoutePreview>();

const fallbackTitle = (pathname: string) => {
  if (pathname === "/") return "Mariner's Book";
  const segments = pathname.split("/").filter(Boolean);
  const segment = segments[segments.length - 1] ?? "";
  try {
    return decodeURIComponent(segment).replace(/[-_]+/g, " ");
  } catch {
    return segment.replace(/[-_]+/g, " ");
  }
};

const readTitle = (pathname: string, surface: HTMLElement) => {
  const heading = surface.querySelector<HTMLElement>("[data-page-title], h1:not(.sr-only)");
  return heading?.textContent?.replace(/\s+/g, " ").trim().slice(0, 80) || fallbackTitle(pathname);
};

const createPreviewSurface = (preview: RoutePreview) => {
  const surface = document.createElement("div");
  surface.className = "edge-swipe-preview__surface";
  surface.setAttribute("aria-hidden", "true");
  surface.setAttribute("inert", "");
  surface.setAttribute("data-no-translate", "");
  surface.setAttribute("translate", "no");

  const title = document.createElement("div");
  title.className = "edge-swipe-preview__title";
  title.textContent = preview.title;
  surface.appendChild(title);

  const card = document.createElement("div");
  card.className = "edge-swipe-preview__card";
  for (let index = 0; index < PREVIEW_LINE_COUNT; index += 1) {
    const line = document.createElement("span");
    line.className = "edge-swipe-preview__line";
    line.style.width = `${86 - index * 8}%`;
    card.appendChild(line);
  }
  surface.appendChild(card);
  return surface;
};

/**
 * Keeps a tiny semantic description of recently visited route surfaces.
 *
 * Large lesson pages can contain thousands of nodes. Retaining deep DOM clones
 * for multiple routes exhausted mobile WebView memory after a few taps. A title
 * plus a fixed-size skeleton preserves the interactive-pop depth cue with a
 * constant memory/DOM budget.
 */
export const captureRoutePreview = (pathname: string, surface: HTMLElement | null) => {
  if (!surface || !pathname) return;

  previews.delete(pathname);
  previews.set(pathname, { pathname, title: readTitle(pathname, surface) });
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

  host.appendChild(createPreviewSurface(preview));
  return true;
};

export const clearRoutePreviewHost = (host: HTMLElement | null) => {
  host?.replaceChildren();
};
