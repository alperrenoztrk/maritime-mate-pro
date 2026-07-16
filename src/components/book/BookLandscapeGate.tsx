import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";

type BookLandscapePhase = "portrait" | "settling" | "ready";

interface BookLandscapeGateProps {
  children: ReactNode;
  /** Keeps the rotation notice compact when the book opens inside the home page. */
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

const getScreenOrientation = () => {
  if (typeof window === "undefined") return undefined;
  return window.screen.orientation as LockableScreenOrientation | undefined;
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

/** Best-effort native/PWA lock; the visible gate remains authoritative when unsupported. */
export function requestBookLandscape() {
  const orientation = getScreenOrientation();
  if (!orientation?.lock) return;
  const requestGeneration = ++orientationRequestGeneration;

  try {
    void orientation.lock("landscape").then(
      () => {
        if (requestGeneration !== orientationRequestGeneration && activeBookSurfaces === 0) {
          try {
            orientation.unlock();
          } catch {
            // A cancelled request may finish after its launcher has disappeared.
          }
        }
      },
      () => {
        // iOS Safari and non-fullscreen browsers can reject orientation locking.
        // The portrait gate below still prevents the book from opening vertically.
      },
    );
  } catch {
    // Some embedded browsers expose lock() but throw synchronously.
  }
}

/** Releases a gesture-time request when the lazy book module fails to open. */
export function cancelBookLandscapeRequest() {
  if (typeof window === "undefined" || activeBookSurfaces > 0) return;
  orientationRequestGeneration += 1;
  try {
    getScreenOrientation()?.unlock?.();
  } catch {
    // Optional browser capability.
  }
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
    // A short grace period avoids unlocking during that hand-off.
    delayedUnlock = window.setTimeout(() => {
      delayedUnlock = null;
      if (activeBookSurfaces > 0) return;
      document.body.classList.remove("book-landscape-active");
      orientationRequestGeneration += 1;
      try {
        getScreenOrientation()?.unlock?.();
      } catch {
        // Unlock support is optional; leaving the book must never crash navigation.
      }
    }, 240);
  };
}

function initialPhase(): BookLandscapePhase {
  if (!isBookLandscape()) return "portrait";
  if (typeof document !== "undefined" && document.fonts?.status === "loading") return "settling";
  return "ready";
}

/**
 * Keeps the book mounted so quiz/calculator state survives rotation, but hides
 * the paper until a stable landscape viewport and font metrics are available.
 */
export function BookLandscapeGate({ children, embedded = false }: BookLandscapeGateProps) {
  const [phase, setPhase] = useState<BookLandscapePhase>(initialPhase);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const release = acquireBookLandscape();
    const orientation = getScreenOrientation();
    const media = window.matchMedia("(orientation: landscape)");
    const visualViewport = window.visualViewport;
    let landscape = isBookLandscape();
    let generation = 0;
    let minimumDelay: number | null = null;
    let fontFallback: number | null = null;
    let firstFrame: number | null = null;
    let secondFrame: number | null = null;

    const clearPendingSettle = () => {
      generation += 1;
      if (minimumDelay !== null) window.clearTimeout(minimumDelay);
      if (fontFallback !== null) window.clearTimeout(fontFallback);
      if (firstFrame !== null) window.cancelAnimationFrame(firstFrame);
      if (secondFrame !== null) window.cancelAnimationFrame(secondFrame);
      minimumDelay = null;
      fontFallback = null;
      firstFrame = null;
      secondFrame = null;
    };

    const settleLandscape = () => {
      clearPendingSettle();
      const settleGeneration = generation;
      setPhase("settling");

      const minimumRotationDelay = new Promise<void>((resolve) => {
        minimumDelay = window.setTimeout(resolve, 160);
      });
      const fontsReady = new Promise<void>((resolve) => {
        let resolved = false;
        const finish = () => {
          if (resolved) return;
          resolved = true;
          resolve();
        };
        if (document.fonts) void document.fonts.ready.then(finish, finish);
        else finish();
        fontFallback = window.setTimeout(finish, 900);
      });

      void Promise.all([minimumRotationDelay, fontsReady]).then(() => {
        if (settleGeneration !== generation || !isBookLandscape()) return;
        // First frame exposes the hidden paper to layout/ResizeObserver; the
        // second frame paints only after both leaf pagers have recalculated.
        firstFrame = window.requestAnimationFrame(() => {
          secondFrame = window.requestAnimationFrame(() => {
            if (settleGeneration !== generation || !isBookLandscape()) return;
            setPhase("ready");
            window.dispatchEvent(new Event("booklandscapeready"));
          });
        });
      });
    };

    const updateOrientation = () => {
      const nextLandscape = isBookLandscape();
      if (nextLandscape === landscape) return;
      landscape = nextLandscape;
      if (!nextLandscape) {
        clearPendingSettle();
        setPhase("portrait");
        return;
      }
      settleLandscape();
    };

    if (landscape && document.fonts?.status === "loading") settleLandscape();
    else setPhase(landscape ? "ready" : "portrait");

    orientation?.addEventListener("change", updateOrientation);
    media.addEventListener?.("change", updateOrientation);
    window.addEventListener("orientationchange", updateOrientation, { passive: true });
    window.addEventListener("resize", updateOrientation, { passive: true });
    visualViewport?.addEventListener("resize", updateOrientation, { passive: true });

    return () => {
      clearPendingSettle();
      orientation?.removeEventListener("change", updateOrientation);
      media.removeEventListener?.("change", updateOrientation);
      window.removeEventListener("orientationchange", updateOrientation);
      window.removeEventListener("resize", updateOrientation);
      visualViewport?.removeEventListener("resize", updateOrientation);
      release();
    };
  }, []);

  const ready = phase === "ready";

  useLayoutEffect(() => {
    const content = contentRef.current;
    if (!content) return;
    if (ready) content.removeAttribute("inert");
    else content.setAttribute("inert", "");
  }, [ready]);

  return (
    <div
      className={`book-landscape-shell ${embedded ? "book-landscape-shell--embedded" : ""}`}
      data-book-landscape-phase={phase}
    >
      <div ref={contentRef} className="book-landscape-content" aria-hidden={!ready || undefined}>
        {children}
      </div>

      {!ready && (
        <div className="book-landscape-notice" role="status" aria-live="polite">
          <span className="book-landscape-device" aria-hidden="true">
            <span className="book-landscape-device-screen" />
          </span>
          <strong>
            {phase === "portrait" ? "Kitap yatay görünümde açılır" : "Yatay kitap hazırlanıyor"}
          </strong>
          <p>
            {phase === "portrait"
              ? "Devam etmek için cihazınızı yatay çevirin."
              : "Sayfalar taşmadan yerleştiriliyor."}
          </p>
        </div>
      )}

      <style>{`
        body.book-landscape-active{ overflow-x:hidden; overscroll-behavior:none; }
        .book-landscape-shell{
          position:relative; width:100%; min-width:0; max-width:100%; overflow-x:clip;
          overflow-anchor:none; -webkit-text-size-adjust:100%; text-size-adjust:100%;
        }
        .book-landscape-content{ width:100%; min-width:0; max-width:100%; overflow-x:clip; overflow-anchor:none; }
        [data-book-landscape-phase="portrait"]>.book-landscape-content{ display:none; }
        [data-book-landscape-phase="settling"]>.book-landscape-content{ visibility:hidden; pointer-events:none; }
        .book-landscape-notice{
          display:flex; min-height:100svh; width:100%; flex-direction:column; align-items:center; justify-content:center;
          gap:8px; padding:max(2rem,env(safe-area-inset-top)) 24px max(2rem,env(safe-area-inset-bottom));
          overflow:hidden; text-align:center; color:#f7e6b1;
          background:radial-gradient(circle at 50% 32%,rgba(64,151,190,.22),transparent 35%),linear-gradient(180deg,#07182d,#061523);
        }
        .book-landscape-shell--embedded .book-landscape-notice{
          min-height:clamp(230px,48svh,360px); border:1px solid rgba(207,164,65,.36); border-radius:12px;
          background:radial-gradient(circle at 50% 30%,rgba(64,151,190,.2),transparent 42%),rgba(6,21,35,.86);
          box-shadow:inset 0 0 24px rgba(0,0,0,.34);
        }
        .book-landscape-notice strong{ max-width:28rem; font:700 clamp(.9rem,3.6vw,1.15rem)/1.3 Georgia,'Times New Roman',serif; letter-spacing:.04em; }
        .book-landscape-notice p{ max-width:28rem; margin:0; overflow-wrap:anywhere; color:rgba(255,255,255,.76); font-size:clamp(.72rem,3vw,.9rem); }
        .book-landscape-device{
          position:relative; display:block; width:31px; height:52px; margin-bottom:7px; border:2px solid #d9b85d; border-radius:7px;
          transform:rotate(0deg); transform-origin:center; animation:book-device-landscape 1.7s ease-in-out infinite;
          box-shadow:0 0 14px rgba(217,184,93,.18);
        }
        .book-landscape-device::after{ content:""; position:absolute; left:50%; bottom:3px; width:3px; height:3px; border-radius:50%; background:#d9b85d; transform:translateX(-50%); }
        .book-landscape-device-screen{ position:absolute; inset:5px 3px 9px; border:1px solid rgba(217,184,93,.48); border-radius:2px; background:linear-gradient(145deg,rgba(75,167,207,.24),rgba(255,255,255,.03)); }
        @keyframes book-device-landscape{ 0%,24%{transform:rotate(0deg)} 58%,100%{transform:rotate(90deg)} }
        @media(prefers-reduced-motion:reduce){ .book-landscape-device{ animation:none; transform:rotate(90deg); } }
        @media print{
          .book-landscape-content{ display:block!important; visibility:visible!important; }
          .book-landscape-notice{ display:none!important; }
        }
      `}</style>
    </div>
  );
}
