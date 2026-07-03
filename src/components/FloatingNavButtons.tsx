import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { findParentPath } from "@/hooks/useNavigationHierarchy";

/**
 * Global, scroll-aware navigation controls (Back).
 *
 * Design goals (see PR "header-button-overlap"):
 *  - Must NOT cover the page's main title. Instead of sitting permanently in
 *    the top-left corner, the bar reveals/hides itself based on scroll:
 *      · At the very top of a page it is fully shown (and shows the "Geri"
 *        label) so the user always has a way back when they land.
 *      · Scrolling DOWN slides + fades it up out of the way, exposing the
 *        title and the content underneath.
 *      · Scrolling UP slides it smoothly back in.
 *  - "Dynamic / animated" feel: framer-motion drives the slide+fade, and the
 *    label collapses to an icon-only pill once the user moves away from the
 *    top, so the control keeps shrinking out of the content's way.
 *
 * Rendered once, globally, in App.tsx — no per-page wiring required.
 */
export function FloatingNavButtons() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // Whether the bar is visible (revealed) and whether we're near the top.
  const [visible, setVisible] = useState(true);
  const [atTop, setAtTop] = useState(true);
  const lastScrollY = useRef(0);

  // Reset to the fully-revealed state whenever the route changes so a freshly
  // opened page always offers the back control.
  useEffect(() => {
    setVisible(true);
    setAtTop(true);
    lastScrollY.current = 0;
  }, [pathname]);

  useEffect(() => {
    // Scroll can happen on the window or on an inner scroll container; listen
    // on window which catches the common case for these pages.
    const THRESHOLD = 6; // ignore tiny jitter
    const TOP_ZONE = 24; // px from top considered "at top"

    const handleScroll = () => {
      const y = window.scrollY || document.documentElement.scrollTop || 0;
      const delta = y - lastScrollY.current;

      setAtTop(y <= TOP_ZONE);

      if (y <= TOP_ZONE) {
        setVisible(true);
      } else if (delta > THRESHOLD) {
        // Scrolling down → hide.
        setVisible(false);
      } else if (delta < -THRESHOLD) {
        // Scrolling up → reveal.
        setVisible(true);
      }

      lastScrollY.current = y;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  if (pathname === "/") return null;

  const parent = findParentPath(pathname);

  return (
    <div
      className="pointer-events-none fixed left-3 z-50 flex items-center gap-1.5"
      style={{ top: "max(0.75rem, env(safe-area-inset-top))" }}
    >
      <AnimatePresence>
        {visible && (
          <motion.div
            key="floating-nav"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ type: "spring", stiffness: 420, damping: 32, mass: 0.6 }}
            className="pointer-events-auto flex items-center gap-1.5"
          >
            <button
              onClick={() => navigate(parent, { replace: true })}
              aria-label="Geri"
              className="flex items-center gap-1 rounded-full border border-white/20 bg-white/10 px-2.5 py-1.5 text-xs font-medium text-slate-100 shadow-lg backdrop-blur-xl transition-all hover:border-primary/40 hover:bg-white/20 hover:text-white active:scale-95"
            >
              <ChevronLeft className="h-3.5 w-3.5 shrink-0" />
              {/* Label only when at the top; collapses to an icon while scrolled. */}
              <AnimatePresence initial={false}>
                {atTop && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.18 }}
                    className="overflow-hidden whitespace-nowrap"
                  >
                    Geri
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
