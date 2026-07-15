import { useEffect, type ReactNode } from "react";
import { BookSheet } from "@/components/book/BookSheet";
import {
  getBookInteractionMode,
  getBookRoutePage,
  getBookVolumeForPath,
  getBookRouteTitle,
  isBookContentPath,
} from "@/lib/bookRoutes";

interface BookRouteFrameProps {
  pathname: string;
  children: ReactNode;
}

/**
 * Keeps the physical book mounted while React Router swaps the active leaf.
 * Formulas, calculators, quizzes and long-form details therefore turn into
 * another sheet of the same book instead of opening a detached app screen.
 */
export function BookRouteFrame({ pathname, children }: BookRouteFrameProps) {
  const active = isBookContentPath(pathname);
  const interactionMode = getBookInteractionMode(pathname);
  const volumeId = getBookVolumeForPath(pathname);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.classList.toggle("book-route-active", active);
    if (active) {
      document.body.dataset.bookMode = interactionMode;
      document.body.dataset.bookVolume = volumeId;
    }
    return () => {
      document.body.classList.remove("book-route-active");
      delete document.body.dataset.bookMode;
      delete document.body.dataset.bookVolume;
    };
  }, [active, interactionMode, volumeId]);

  useEffect(() => {
    if (!active || interactionMode !== "reading" || typeof document === "undefined") return;

    const revealReadingContent = () => {
      const root = document.querySelector<HTMLElement>("[data-book-route='true'] .bs-route-content");
      if (!root) return;

      root.querySelectorAll<HTMLDetailsElement>("details:not([open])").forEach((details) => {
        details.open = true;
      });
      root
        .querySelectorAll<HTMLButtonElement>("button[aria-expanded='false']:not([data-book-reading-expanded])")
        .forEach((trigger) => {
          trigger.dataset.bookReadingExpanded = "true";
          trigger.click();
        });
    };

    revealReadingContent();
    const observer = new MutationObserver(revealReadingContent);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [active, interactionMode, pathname]);

  if (!active) return <>{children}</>;

  return (
    <BookSheet
      title={getBookRouteTitle(pathname)}
      routeFrame
      pageKey={pathname}
      pageNumber={getBookRoutePage(pathname)}
      interactionMode={interactionMode}
      volumeId={volumeId}
    >
      {children}
    </BookSheet>
  );
}
