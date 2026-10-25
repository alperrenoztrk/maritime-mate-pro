import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { Bookmark, ChevronLeft } from "lucide-react";
import { isSaved, recordVisit, studyKindFor, toggleSaved } from "@/lib/studyActivity";
import { motion, useReducedMotion } from "framer-motion";
import { AppSymbol } from "@/components/ui/AppSymbol";
import { useBackNavigation } from "@/hooks/useBackNavigation";
import { findParentPath } from "@/hooks/useNavigationHierarchy";
import { isAppChromeHidden } from "@/lib/appChrome";
import { useLanguage } from "@/contexts/useLanguage";
import { getCoreUiTranslation } from "@/i18n/coreUiTranslations";

const COLLAPSE_AT = 44;

const KNOWN_TITLES: Array<[RegExp, string]> = [
  [/^\/$/, "Mariner's Book"],
  [/^\/lessons$/, "Learn"],
  [/^\/lessons\/map$/, "Learning map"],
  [/^\/exercises$/, "Exercises"],
  [/^\/calculations$/, "Tools"],
  [/^\/library$/, "Library"],
  [/^\/search$/, "Search"],
  [/^\/crew$/, "Personnel"],
  [/^\/bridge$/, "Bridge"],
  [/^\/ship-systems$/, "Ship Systems"],
  [/^\/ship-tasks$/, "Ship Missions"],
  [/^\/ship-operations$/, "Operations"],
  [/^\/glossary$/, "Dictionary"],
  [/^\/regulations$/, "Legislation"],
  [/^\/settings$/, "Settings"],
  [/^\/saved$/, "Saved"],
];

const knownTitle = (pathname: string) =>
  KNOWN_TITLES.find(([pattern]) => pattern.test(pathname))?.[1] ?? "";

const localizedKnownTitle = (pathname: string, languageCode: string) => {
  const source = knownTitle(pathname);
  if (!source || source === "Mariner's Book") return source;
  return getCoreUiTranslation(source, languageCode) ?? "";
};

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
  const { currentLanguage } = useLanguage();
  const [collapsed, setCollapsed] = useState(false);
  const [title, setTitle] = useState(() => localizedKnownTitle(pathname, currentLanguage));
  const reduceMotion = useReducedMotion();
  const studyKind = studyKindFor(pathname);
  const [saved, setSaved] = useState(() => isSaved(pathname));
  const localizedBack = useMemo(
    () => getCoreUiTranslation("Back", currentLanguage) ?? "Back",
    [currentLanguage],
  );
  const backLabel = useMemo(() => {
    const parentSource = knownTitle(findParentPath(pathname));
    if (parentSource === "Mariner's Book") return parentSource;
    return getCoreUiTranslation(parentSource, currentLanguage) ?? localizedBack;
  }, [currentLanguage, localizedBack, pathname]);

  useEffect(() => {
    setCollapsed(false);
    setTitle(localizedKnownTitle(pathname, currentLanguage));
    if (!canGoBack || isAppChromeHidden(pathname)) return;

    let frame = 0;
    let observed: HTMLElement | null = null;
    const observer = new MutationObserver(() => refreshTitle());

    const findRouteRoot = () =>
      Array.from(document.querySelectorAll<HTMLElement>("[data-page-path]")).find(
        (element) => element.dataset.pagePath === pathname,
      ) ?? null;

    // Watch the smallest subtree that can answer "what is this route's
    // heading?". Observing all of document.body with `characterData` woke this
    // observer once per text node the translation engine touched — hundreds of
    // wake-ups per navigation, each one a DOM read plus a React state update.
    // Until this route's frame mounts there is nothing to read, so we only
    // listen for it being added.
    const retarget = () => {
      const root = findRouteRoot();
      if (root === observed) return;
      observer.disconnect();
      observed = root;
      observer.observe(
        root ?? document.body,
        root
          ? { childList: true, subtree: true, characterData: true }
          : { childList: true, subtree: true },
      );
    };

    const refreshTitle = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        retarget();
        const detected = readRouteHeading(pathname);
        if (detected) setTitle(detected);
      });
    };

    retarget();
    refreshTitle();

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frame);
    };
  }, [canGoBack, currentLanguage, pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY || document.documentElement.scrollTop || 0;
      setCollapsed(y > COLLAPSE_AT);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  useEffect(() => {
    setSaved(isSaved(pathname));
  }, [pathname]);

  // Record study pages for "Continue" once the real page heading is known.
  useEffect(() => {
    if (!studyKind || !title) return;
    const timer = window.setTimeout(() => recordVisit({ path: pathname, title, kind: studyKind }), 600);
    return () => window.clearTimeout(timer);
  }, [pathname, studyKind, title]);

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
          aria-label={localizedBack}
          data-no-translate
          className="pointer-events-auto relative z-10 inline-flex h-11 max-w-[42%] items-center gap-0.5 rounded-xl px-1.5 text-sm font-medium text-primary transition-colors duration-control hover:bg-primary/10 active:bg-primary/15"
        >
          <AppSymbol
            name="chevron.left"
            fallback={ChevronLeft}
            className="h-6 w-6 shrink-0"
            pointSize={24}
          />
          <span className="truncate" lang={currentLanguage}>{backLabel}</span>
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

        {studyKind && (
          <button
            type="button"
            onClick={() => setSaved(toggleSaved({ path: pathname, title: title || "Untitled", kind: studyKind }))}
            aria-label={saved ? "Remove bookmark" : "Bookmark"}
            aria-pressed={saved}
            className="pointer-events-auto relative z-10 ml-auto inline-flex h-11 w-11 items-center justify-center rounded-xl text-primary transition-colors duration-control hover:bg-primary/10 active:bg-primary/15"
          >
            <Bookmark className="h-5 w-5" fill={saved ? "currentColor" : "none"} />
          </button>
        )}
      </div>
    </header>
  );
}

export default AppNavBar;
