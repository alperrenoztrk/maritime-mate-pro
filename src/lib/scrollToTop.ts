/**
 * Puts the viewport back at the very top of the document.
 *
 * Pages scroll the document itself (MobileLayout never creates its own scroll
 * container), but the Android / iOS WebViews disagree about which element
 * actually carries the offset — `html` on some, `body` on others, and
 * `index.css` sets `overflow-x: hidden` on both, which makes `body` a scroll
 * box of its own. So all three are reset instead of trusting `window.scrollTo`
 * alone.
 *
 * The default is an instant jump on purpose: a new page has to *start* at the
 * top, not animate its way there while the reader watches the previous
 * content slide past.
 */
export const scrollToTop = (behavior: ScrollBehavior = "auto") => {
  if (typeof window === "undefined") return;

  try {
    window.scrollTo({ top: 0, left: 0, behavior });
  } catch {
    // Very old WebViews only implement the two-argument form.
    window.scrollTo(0, 0);
  }

  // A smooth scroll is an animation — writing scrollTop would cancel it.
  if (behavior === "smooth") return;

  const root = document.documentElement;
  if (root && root.scrollTop !== 0) root.scrollTop = 0;
  if (document.body && document.body.scrollTop !== 0) document.body.scrollTop = 0;
};
