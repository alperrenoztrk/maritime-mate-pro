import { Capacitor } from "@capacitor/core";
import { ScreenOrientation as NativeScreenOrientation } from "@capacitor/screen-orientation";
import { useEffect, useState, type CSSProperties, type ReactNode } from "react";

export type BookLandscapeMode = "natural" | "rotated";

interface BookLandscapeGateProps {
  children: ReactNode;
  /** Keeps the direct landscape layout scoped to the home-page book launcher. */
  embedded?: boolean;
  /** Closes the book from the rotated overlay; defaults to history.back(). */
  onExit?: () => void;
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
  isLandscapeSize(width, height) ? "natural" : "rotated";

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

interface BookLandscapeFrame {
  mode: BookLandscapeMode;
  /** Book-local frame size in px; in rotated mode the physical axes are swapped. */
  frameWidth: number;
  frameHeight: number;
}

function currentBookLandscapeFrame(): BookLandscapeFrame {
  if (typeof window === "undefined") return { mode: "natural", frameWidth: 0, frameHeight: 0 };
  if (isBookLandscape()) {
    return { mode: "natural", frameWidth: window.innerWidth, frameHeight: window.innerHeight };
  }
  return { mode: "rotated", frameWidth: window.innerHeight, frameHeight: window.innerWidth };
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
export function BookLandscapeGate({ children, embedded = false, onExit }: BookLandscapeGateProps) {
  const [frame, setFrame] = useState<BookLandscapeFrame>(currentBookLandscapeFrame);
  const { mode, frameWidth, frameHeight } = frame;

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
      const next = currentBookLandscapeFrame();
      setFrame((current) =>
        current.mode === next.mode &&
        current.frameWidth === next.frameWidth &&
        current.frameHeight === next.frameHeight
          ? current
          : next,
      );

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

  useEffect(() => {
    if (mode !== "rotated") return;
    document.body.classList.add("book-rotated-active");
    return () => document.body.classList.remove("book-rotated-active");
  }, [mode]);

  return (
    <div
      className={`book-landscape-shell ${embedded ? "book-landscape-shell--embedded" : ""}`}
      data-book-landscape-mode={mode}
      data-book-landscape-phase="ready"
      style={mode === "rotated"
        ? ({
            "--book-frame-w": `${frameWidth}px`,
            "--book-frame-h": `${frameHeight}px`,
          } as CSSProperties)
        : undefined}
    >
      <div className="book-landscape-content">
        {children}
        {mode === "rotated" && (
          <button
            type="button"
            className="book-landscape-exit"
            aria-label="Kitaptan çık"
            onClick={onExit ?? (() => window.history.back())}
          >
            ✕
          </button>
        )}
      </div>

      <style>{`
        body.book-landscape-active{ overflow-x:hidden; overscroll-behavior:none; }
        body.book-rotated-active{ overflow:hidden; }
        .book-landscape-shell{
          position:relative; width:100%; min-width:0; max-width:100%; overflow-x:clip;
          overflow-anchor:none; -webkit-text-size-adjust:100%; text-size-adjust:100%;
        }
        .book-landscape-content{
          width:100%; min-width:0; max-width:100%; overflow-x:clip; overflow-anchor:none;
        }
        [data-book-landscape-mode="rotated"]{
          position:fixed; inset:0; z-index:130; overflow:hidden;
          background:linear-gradient(180deg,#06152a 0%,#0a2949 54%,#051421 100%);
        }
        [data-book-landscape-mode="rotated"]>.book-landscape-content{
          position:absolute; top:0; left:0;
          /* The base max-width:100% would clamp the frame back to the portrait
             viewport width — the rotated frame is deliberately wider. */
          width:var(--book-frame-w); max-width:none; height:var(--book-frame-h);
          transform:rotate(90deg) translateY(-100%); transform-origin:top left;
          overflow:hidden;
        }
        /* Book left edge = physical screen top (notch); right edge = physical bottom. */
        [data-book-landscape-mode="rotated"] :where(.bk-scene,.bs-stage){
          min-height:100%; height:100%;
          padding:.5rem max(.75rem,env(safe-area-inset-bottom)) .5rem max(.75rem,env(safe-area-inset-top));
        }
        [data-book-landscape-mode="rotated"] :where(.bk-stage,.bs-pager){ touch-action:none; }
        [data-book-landscape-mode="rotated"] .bk-cover-board{
          width:min(96%,780px); height:min(calc(var(--book-frame-h) - 64px),540px);
          min-height:0; padding:clamp(5px,.85vw,11px);
        }
        [data-book-landscape-mode="rotated"] .bs-cover-board{ width:min(96%,820px); }
        [data-book-landscape-mode="rotated"] .bs-spread{
          height:min(calc(var(--book-frame-h) - 72px),560px);
        }
        [data-book-landscape-mode="rotated"] .bk-scene--embedded{
          width:100%; min-height:100%; padding:.5rem; overflow:hidden;
        }
        [data-book-landscape-mode="rotated"] .bk-scene--embedded .bk-stage{
          height:calc(var(--book-frame-h) - 48px);
        }
        .book-landscape-exit{
          position:absolute; z-index:50; top:max(8px,env(safe-area-inset-right)); right:10px;
          width:34px; height:34px; border-radius:50%;
          border:1px solid rgba(242,217,138,.55); background:rgba(5,17,30,.72);
          color:rgba(242,217,138,.9); font:700 15px/1 Georgia,serif; cursor:pointer;
        }
        @media print{
          .book-landscape-content{ display:block!important; visibility:visible!important; }
        }
      `}</style>
    </div>
  );
}
