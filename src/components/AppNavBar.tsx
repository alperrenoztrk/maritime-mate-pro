import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useBackNavigation } from "@/hooks/useBackNavigation";

/**
 * The app's global top chrome: one back control and one scroll-edge material.
 * Mounted once in App.tsx, so it applies to all 160 routes without any page
 * having to opt in.
 *
 * Why this shape rather than a title bar
 * -------------------------------------
 * An iOS-style large-title bar needs to own the page title. In this codebase
 * 82 pages render their own <h1> in roughly eleven different idioms, so a
 * title-owning bar could only be adopted page by page — and a nav bar present
 * on some routes but not others is less coherent than none at all. (The repo
 * already has one component that took that route: layout/PageHeader, reachable
 * only through CalculationLayout, five pages.)
 *
 * So this bar owns the two things that can be made global today:
 *
 *  1. **Back.** A single affordance, shared with the edge-swipe gesture and
 *     the hardware button through useBackNavigation.
 *  2. **The scroll edge.** iOS separates content from the status bar with a
 *     material that appears only once content scrolls under it. With
 *     viewport-fit=cover now in effect, content really does reach the top of
 *     the screen, and without this it would collide with the clock. The scrim
 *     is transparent at rest, so a page's own header still reads as the top
 *     of the page.
 *
 * Migrating the 82 bespoke titles onto a large-title bar is Phase 2.
 */

const TOP_ZONE = 24; // px from top still considered "at the top"
const SCROLL_JITTER = 6; // px of movement to ignore

export function AppNavBar() {
  const { pathname } = useLocation();
  const { goBack, canGoBack } = useBackNavigation();

  const [visible, setVisible] = useState(true);
  const [atTop, setAtTop] = useState(true);
  const lastScrollY = useRef(0);

  // A freshly opened page always offers the back control.
  useEffect(() => {
    setVisible(true);
    setAtTop(true);
    lastScrollY.current = 0;
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY || document.documentElement.scrollTop || 0;
      const delta = y - lastScrollY.current;

      setAtTop(y <= TOP_ZONE);

      if (y <= TOP_ZONE) {
        setVisible(true);
      } else if (delta > SCROLL_JITTER) {
        setVisible(false); // scrolling down → get out of the content's way
      } else if (delta < -SCROLL_JITTER) {
        setVisible(true); // scrolling up → come back
      }

      lastScrollY.current = y;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  if (!canGoBack) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-50">
      {/* Scroll-edge material. Fades in only once the page has scrolled, so
          it never covers a page's own header while it is still at the top. */}
      <motion.div
        aria-hidden
        className="surface-glass absolute inset-x-0 top-0 border-b"
        style={{ height: "calc(var(--safe-top) + 2.75rem)" }}
        initial={false}
        animate={{ opacity: atTop ? 0 : 1 }}
        transition={{ duration: 0.2, ease: [0.32, 0.72, 0, 1] }}
      />

      <div
        className="relative flex items-center gap-1.5 px-3"
        style={{
          paddingTop: "max(0.75rem, var(--safe-top))",
          paddingLeft: "max(0.75rem, var(--safe-left))",
        }}
      >
        <AnimatePresence>
          {visible && (
            <motion.div
              key="app-nav-back"
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ type: "spring", stiffness: 420, damping: 32, mass: 0.6 }}
              className="pointer-events-auto flex items-center gap-1.5"
            >
              <button
                onClick={goBack}
                aria-label="Geri"
                // Floating chrome — one of the few places glass is correct.
                className="surface-glass flex items-center gap-1 rounded-full border px-2.5 py-1.5 text-caption font-medium text-slate-100 shadow-elev-2 transition-all duration-control ease-out-ios hover:border-primary/40 hover:text-white active:scale-95"
              >
                <ChevronLeft className="h-3.5 w-3.5 shrink-0" />
                {/* Label at the top only; collapses to an icon once scrolled. */}
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
    </div>
  );
}

export default AppNavBar;
