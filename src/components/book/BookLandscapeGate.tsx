import { Capacitor } from "@capacitor/core";
import { ScreenOrientation as NativeScreenOrientation } from "@capacitor/screen-orientation";
import { useEffect, useState, type ReactNode } from "react";

export type BookLandscapeMode = "natural" | "fitted";

interface BookLandscapeGateProps {
  children: ReactNode;
  /** Keeps the direct landscape layout scoped to the home-page book launcher. */
  embedded?: boolean;
}

type LockableScreenOrientation = ScreenOrientation & {
  lock?: (orientation: "landscape") => Promise<void>;
};

let activeBookSurfaces = 0;
let delayedUnlock: number | null = null;
let orientationRequestGeneration = 0;

export const isLandscapeSize = (width: number, height: number) =>
  Number.isFinite(width) && Number.isFinite(height) && width > height;

export const resolveBookLandscapeMode = (width: number, height: number): BookLandscapeMode =>
  isLandscapeSize(width, height) ? "natural" : "fitted";

const getScreenOrientation = () => {
  if (typeof window === "undefined") return undefined;
  return window.screen.orientation as LockableScreenOrientation | undefined;
};

const usesNativeOrientation = () => {
  try {
    return Capacitor.isNativePlatform();
  } catch {
    return false;
  }
};

export function isBookLandscape() {
  if (typeof window === "undefined") return true;

  const type = getScreenOrientation()?.type;
  if (type?.startsWith("landscape")) return true;
  if (type?.startsWith("portrait")) return false;

  const legacyAngle = (window as Window & { orientation?: number }).orientation;
  if (typeof legacyAngle === "number") return Math.abs(legacyAngle) === 90;

  return isLandscapeSize(window.innerWidth, window.innerHeight);
}

function currentBookLandscapeMode(): BookLandscapeMode {
  if (typeof window === "undefined") return "natural";
  return isBookLandscape() ? "natural" : "fitted";
}

function unlockRequestedOrientation() {
  if (typeof window === "undefined") return;

  if (usesNativeOrientation()) {
    void NativeScreenOrientation.unlock().catch(() => {
      // Orientation support is optional; leaving the book must still succeed.
    });
    return;
  }

  try {
    getScreenOrientation()?.unlock?.();
  } catch {
    // Some browsers expose the API but reject calls outside fullscreen.
  }
}

/**
 * Rotates the native Capacitor view immediately. Web/PWA browsers receive the
 * same best-effort request, while the visible book never waits for that request.
 */
export function requestBookLandscape() {
  if (typeof window === "undefined") return;
  const requestGeneration = ++orientationRequestGeneration;

  if (usesNativeOrientation()) {
    void NativeScreenOrientation.lock({ orientation: "landscape" }).then(
      () => {
        if (requestGeneration !== orientationRequestGeneration && activeBookSurfaces === 0) {
          unlockRequestedOrientation();
        }
      },
      () => {
        // The fitted two-page layout below is the immediate browser fallback.
      },
    );
    return;
  }

  const orientation = getScreenOrientation();
  if (!orientation?.lock) return;

  try {
    void orientation.lock("landscape").then(
      () => {
        if (requestGeneration !== orientationRequestGeneration && activeBookSurfaces === 0) {
          unlockRequestedOrientation();
        }
      },
      () => {
        // iOS Safari and non-fullscreen browsers commonly reject this call.
        // The book is already visible in its fitted landscape layout.
      },
    );
  } catch {
    // The fallback stays visible even when lock() throws synchronously.
  }
}

/** Releases a gesture-time request when the lazy book module fails to open. */
export function cancelBookLandscapeRequest() {
  if (typeof window === "undefined" || activeBookSurfaces > 0) return;
  orientationRequestGeneration += 1;
  unlockRequestedOrientation();
}

function acquireBookLandscape() {
  if (typeof window === "undefined") return () => {};

  activeBookSurfaces += 1;
  if (delayedUnlock !== null) {
    window.clearTimeout(delayedUnlock);
    delayedUnlock = null;
  }
  document.body.classList.add("book-landscape-active");
  requestBookLandscape();

  return () => {
    activeBookSurfaces = Math.max(0, activeBookSurfaces - 1);
    if (activeBookSurfaces > 0) return;

    // Book-to-book route changes unmount one surface before mounting the next.
    delayedUnlock = window.setTimeout(() => {
      delayedUnlock = null;
      if (activeBookSurfaces > 0) return;
      document.body.classList.remove("book-landscape-active");
      orientationRequestGeneration += 1;
      unlockRequestedOrientation();
    }, 240);
  };
}

/**
 * Requests a real native landscape orientation, but renders immediately in all
 * environments. In browsers that cannot rotate the viewport, the same two-leaf
 * landscape book is fitted into the available portrait width without a gate.
 */
export function BookLandscapeGate({ children, embedded = false }: BookLandscapeGateProps) {
  const [mode, setMode] = useState<BookLandscapeMode>(currentBookLandscapeMode);

  useEffect(() => {
    const release = acquireBookLandscape();
    const orientation = getScreenOrientation();
    const media = window.matchMedia("(orientation: landscape)");
    const visualViewport = window.visualViewport;
    const fontSet = document.fonts;
    let firstFrame: number | null = null;
    let secondFrame: number | null = null;
    let generation = 0;
    let disposed = false;

    const cancelPendingNotification = () => {
      generation += 1;
      if (firstFrame !== null) window.cancelAnimationFrame(firstFrame);
      if (secondFrame !== null) window.cancelAnimationFrame(secondFrame);
      firstFrame = null;
      secondFrame = null;
    };

    const publishStableLayout = () => {
      cancelPendingNotification();
      const layoutGeneration = generation;
      setMode(currentBookLandscapeMode());

      // Page pagers measure against the already-visible layout. Two frames let
      // ResizeObserver and CSS columns settle before they re-slice the leaves.
      firstFrame = window.requestAnimationFrame(() => {
        secondFrame = window.requestAnimationFrame(() => {
          if (disposed || layoutGeneration !== generation) return;
          window.dispatchEvent(new Event("booklandscapeready"));
        });
      });
    };

    publishStableLayout();
    void fontSet?.ready.then(() => {
      if (!disposed) publishStableLayout();
    });

    orientation?.addEventListener("change", publishStableLayout);
    media.addEventListener?.("change", publishStableLayout);
    fontSet?.addEventListener("loadingdone", publishStableLayout);
    window.addEventListener("orientationchange", publishStableLayout, { passive: true });
    window.addEventListener("resize", publishStableLayout, { passive: true });
    visualViewport?.addEventListener("resize", publishStableLayout, { passive: true });

    return () => {
      disposed = true;
      cancelPendingNotification();
      orientation?.removeEventListener("change", publishStableLayout);
      media.removeEventListener?.("change", publishStableLayout);
      fontSet?.removeEventListener("loadingdone", publishStableLayout);
      window.removeEventListener("orientationchange", publishStableLayout);
      window.removeEventListener("resize", publishStableLayout);
      visualViewport?.removeEventListener("resize", publishStableLayout);
      release();
    };
  }, []);

  return (
    <div
      className={`book-landscape-shell ${embedded ? "book-landscape-shell--embedded" : ""}`}
      data-book-landscape-mode={mode}
      data-book-landscape-phase="ready"
    >
      <div className="book-landscape-content">{children}</div>

      <style>{`
        body.book-landscape-active{ overflow-x:hidden; overscroll-behavior:none; }
        .book-landscape-shell{
          position:relative; width:100%; min-width:0; max-width:100%; overflow-x:clip;
          overflow-anchor:none; -webkit-text-size-adjust:100%; text-size-adjust:100%;
        }
        .book-landscape-content{
          width:100%; min-width:0; max-width:100%; overflow-x:clip; overflow-anchor:none;
        }
        [data-book-landscape-mode="fitted"]>.book-landscape-content{
          display:block; visibility:visible; min-height:0; pointer-events:auto;
        }
        [data-book-landscape-mode="fitted"] :where(.bk-scene,.bs-stage){
          visibility:visible!important; pointer-events:auto!important;
        }
        @media print{
          .book-landscape-content{ display:block!important; visibility:visible!important; }
        }
      `}</style>
    </div>
  );
}
