import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import { scrollToTop } from "@/lib/scrollToTop";

/**
 * App-wide scroll reset: every route change lands the reader at the top of the
 * new page instead of keeping the scroll offset of the page they came from.
 *
 * Rendered once inside <BrowserRouter> in App.tsx, so it covers every route —
 * including the handful that are not wrapped in <PageTransition> and the
 * /notes overlay that renders outside <Routes>.
 *
 * Only the pathname is watched. Query-string changes stay put on purpose:
 * pages like ShipSystemDetailPage use `?topic=` to open and scroll to a
 * specific section, and filters/tabs elsewhere should not yank the page.
 */
export const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useLayoutEffect(() => {
    // Stop the browser from putting us back where we were on a history pop.
    // The hierarchical back button navigates with `replace` (see
    // useNavigationHierarchy), so every transition in this app is a fresh
    // page and must start at the top.
    if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useLayoutEffect(() => {
    // A deep link that targets an in-page anchor keeps its anchor.
    if (hash) return;

    scrollToTop();

    // The swap is not instantaneous: AnimatePresence plays the outgoing
    // page's exit first and lazy route chunks mount later still, so re-assert
    // once the incoming page has actually been laid out.
    const raf = requestAnimationFrame(() => scrollToTop());
    return () => cancelAnimationFrame(raf);
  }, [pathname, hash]);

  return null;
};
