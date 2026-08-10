import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useBackNavigation } from "@/hooks/useBackNavigation";
import { findParentPath } from "@/hooks/useNavigationHierarchy";
import { isAppChromeHidden } from "@/lib/appChrome";

const COLLAPSE_AT = 44;

const KNOWN_TITLES: Array<[RegExp, string]> = [
  [/^\/$/, "Mariner's Book"],
  [/^\/lessons$/, "Öğren"],
  [/^\/exercises$/, "Alıştırmalar"],
  [/^\/calculations$/, "Araçlar"],
  [/^\/library$/, "Kitaplık"],
  [/^\/crew$/, "Personel"],
  [/^\/bridge$/, "Köprüüstü"],
  [/^\/ship-systems$/, "Gemi Sistemleri"],
  [/^\/ship-tasks$/, "Gemi Görevleri"],
  [/^\/ship-operations$/, "Operasyonlar"],
  [/^\/glossary$/, "Sözlük"],
  [/^\/regulations$/, "Mevzuat"],
  [/^\/settings$/, "Ayarlar"],
];

const knownTitle = (pathname: string) =>
  KNOWN_TITLES.find(([pattern]) => pattern.test(pathname))?.[1] ?? "";

const readRouteHeading = (pathname: string): string => {
  const routeRoot = Array.from(document.querySelectorAll<HTMLElement>("[data-page-path]"))
    .find((element) => element.dataset.pagePath === pathname);
  if (!routeRoot) return "";

  const heading = routeRoot.querySelector<HTMLElement>("[data-page-title], h1:not(.sr-only)");
  return heading?.textContent?.replace(/\s+/g, " ").trim().slice(0, 64) ?? "";
};

/**
 * Global iOS navigation chrome.
 *
 * Pages keep their existing large headings. Once that heading scrolls beneath
 * the status bar, this component reveals one shared material and mirrors the
 * heading as a compact inline title. That gives every route the same
 * large-title → inline-title behaviour without maintaining a second title
 * source across more than a hundred screens.
 */
export function AppNavBar() {
  const { pathname } = useLocation();
  const { goBack, canGoBack } = useBackNavigation();
  const [collapsed, setCollapsed] = useState(false);
  const [title, setTitle] = useState(() => knownTitle(pathname));
  const reduceMotion = useReducedMotion();
  const backLabel = useMemo(() => knownTitle(findParentPath(pathname)) || "Geri", [pathname]);

  useEffect(() => {
    setCollapsed(false);
    setTitle(knownTitle(pathname));
    let frame = 0;

    const refreshTitle = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const detected = readRouteHeading(pathname);
        if (detected) setTitle(detected);
      });
    };

    refreshTitle();
    const observer = new MutationObserver(refreshTitle);
    observer.observe(document.body, { childList: true, subtree: true, characterData: true });
    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frame);
    };
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY || document.documentElement.scrollTop || 0;
      setCollapsed(y > COLLAPSE_AT);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  if (!canGoBack || isAppChromeHidden(pathname)) return null;

  return (
    <header
      className="app-navbar pointer-events-none fixed right-0 top-0 z-50"
      data-mt-global-root
    >
      <motion.div
        aria-hidden
        className="surface-glass absolute inset-0 border-b"
        initial={false}
        animate={{ opacity: collapsed ? 1 : 0 }}
        transition={{ duration: reduceMotion ? 0.01 : 0.2, ease: [0.32, 0.72, 0, 1] }}
      />

      <div className="relative flex h-full items-center px-2.5 pt-[var(--safe-top)] sm:px-4">
        <button
          type="button"
          onClick={() => goBack()}
          aria-label="Geri"
          className="pointer-events-auto relative z-10 inline-flex h-11 max-w-[42%] items-center gap-0.5 rounded-xl px-1.5 text-sm font-medium text-primary transition-colors duration-control hover:bg-primary/10 active:bg-primary/15"
        >
          <ChevronLeft className="h-6 w-6 shrink-0" strokeWidth={2.25} />
          <span className="truncate">{backLabel}</span>
        </button>

        <motion.div
          aria-live="polite"
          className="pointer-events-none absolute inset-x-20 bottom-0 flex h-full items-center justify-center pt-[var(--safe-top)]"
          initial={false}
          animate={{ opacity: collapsed ? 1 : 0, y: reduceMotion ? 0 : collapsed ? 0 : 6 }}
          transition={{ duration: reduceMotion ? 0.01 : 0.2, ease: [0.32, 0.72, 0, 1] }}
        >
          <span className="max-w-full truncate text-center text-[0.9375rem] font-semibold tracking-[-0.01em] text-foreground">
            {title}
          </span>
        </motion.div>
      </div>
    </header>
  );
}

export default AppNavBar;
