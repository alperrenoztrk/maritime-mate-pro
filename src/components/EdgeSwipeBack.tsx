import { useEffect, useRef, useState } from "react";
import { ChevronLeft } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useBackNavigation } from "@/hooks/useBackNavigation";
import { hapticImpact } from "@/lib/haptics";
import { useLocation } from "react-router-dom";
import { isAppChromeHidden } from "@/lib/appChrome";
import { findParentPath } from "@/hooks/useNavigationHierarchy";
import { clearRoutePreviewHost, mountRoutePreview } from "@/lib/navigationPreview";
import { MOTION_SECONDS } from "@/hooks/useAppMotion";

const EDGE_WIDTH = 24;

export const EdgeSwipeBack = () => {
  const { goBack, canGoBack } = useBackNavigation();
  const { pathname } = useLocation();
  const enabled = canGoBack && !isAppChromeHidden(pathname);
  const [pull, setPull] = useState(0);
  const [active, setActive] = useState(false);
  const startX = useRef(0);
  const startY = useRef(0);
  const lastX = useRef(0);
  const lastMoveAt = useRef(0);
  const velocity = useRef(0);
  const pointerId = useRef<number | null>(null);
  const pullRef = useRef(0);
  const commitDistance = useRef(88);
  const activeSurface = useRef<HTMLElement | null>(null);
  const cleanupTimer = useRef<number | null>(null);
  const thresholdFeedbackSent = useRef(false);
  const previewHost = useRef<HTMLDivElement | null>(null);

  const clearSurface = () => {
    if (cleanupTimer.current !== null) {
      window.clearTimeout(cleanupTimer.current);
      cleanupTimer.current = null;
    }
    const surface = activeSurface.current;
    if (surface) {
      surface.classList.remove("edge-swipe-page", "edge-swipe-committing");
      surface.style.removeProperty("transform");
      surface.style.removeProperty("transition");
      surface.style.removeProperty("will-change");
      surface.style.removeProperty("border-radius");
      surface.style.removeProperty("box-shadow");
    }
    activeSurface.current = null;
    clearRoutePreviewHost(previewHost.current);
  };

  useEffect(() => {
    if (!enabled) {
      setActive(false);
      setPull(0);
      clearSurface();
    }
    return () => clearSurface();
  }, [enabled]);

  if (!enabled) return null;

  const moveSurface = (distance: number) => {
    const surface = activeSurface.current;
    if (!surface) return;
    const progress = Math.min(distance / commitDistance.current, 1);
    surface.style.transform = `translate3d(${distance}px, 0, 0)`;
    surface.style.borderRadius = `${progress * 14}px`;
    surface.style.boxShadow = `-${Math.round(8 + progress * 12)}px 0 ${Math.round(24 + progress * 20)}px rgba(2, 10, 20, ${0.18 + progress * 0.18})`;
    if (previewHost.current) {
      previewHost.current.style.transform = `translate3d(${-18 + progress * 18}px, 0, 0)`;
      previewHost.current.style.opacity = String(0.72 + progress * 0.28);
    }
  };

  const finish = (commit: boolean) => {
    const surface = activeSurface.current;
    pointerId.current = null;
    setActive(false);
    setPull(0);

    if (commit && surface) {
      surface.classList.add("edge-swipe-committing");
      // Leave the page at the finger's current position. The route's pop
      // frame continues from there while the destination slides underneath.
      goBack({ haptic: false });
      cleanupTimer.current = window.setTimeout(clearSurface, 440);
    } else if (surface) {
      surface.style.transition = "transform var(--motion-control) var(--ease-out-ios), border-radius var(--motion-control) var(--ease-out-ios), box-shadow var(--motion-control) var(--ease-out-ios)";
      moveSurface(0);
      cleanupTimer.current = window.setTimeout(clearSurface, 240);
    }

    pullRef.current = 0;
    velocity.current = 0;
  };

  return (
    <>
      <div
        ref={previewHost}
        aria-hidden
        className={`edge-swipe-preview fixed inset-0 z-0 overflow-hidden pointer-events-none ${
          active ? "edge-swipe-preview--active" : ""
        }`}
      />
      <div
        className="app-edge-swipe fixed top-0 z-40 h-full touch-pan-y"
        style={{ width: `calc(${EDGE_WIDTH}px + var(--safe-left))` }}
        aria-hidden
        onPointerDown={(event) => {
          if (event.pointerType === "mouse") return;
          const surfaces = document.querySelectorAll<HTMLElement>(".interactive-page-surface");
          const surface = surfaces[surfaces.length - 1];
          if (!surface) return;

          clearSurface();
          activeSurface.current = surface;
          surface.classList.add("edge-swipe-page");
          surface.style.willChange = "transform, border-radius";
          surface.style.transition = "none";
          pointerId.current = event.pointerId;
          startX.current = event.clientX;
          startY.current = event.clientY;
          lastX.current = event.clientX;
          lastMoveAt.current = event.timeStamp;
          velocity.current = 0;
          pullRef.current = 0;
          thresholdFeedbackSent.current = false;
          commitDistance.current = Math.min(140, Math.max(78, window.innerWidth * 0.28));
          mountRoutePreview(findParentPath(pathname), previewHost.current);
          setActive(true);

          try {
            event.currentTarget.setPointerCapture(event.pointerId);
          } catch {
            // Some WebViews release a pointer before capture is requested.
          }
        }}
        onPointerMove={(event) => {
          if (pointerId.current !== event.pointerId) return;
          const dx = event.clientX - startX.current;
          const dy = Math.abs(event.clientY - startY.current);
          if (dy > Math.abs(dx) && dy > 12) {
            finish(false);
            return;
          }

          const next = Math.max(0, Math.min(dx, window.innerWidth));
          const elapsed = Math.max(1, event.timeStamp - lastMoveAt.current);
          const instantaneousVelocity = (event.clientX - lastX.current) / elapsed;
          velocity.current = velocity.current * 0.65 + instantaneousVelocity * 0.35;
          lastX.current = event.clientX;
          lastMoveAt.current = event.timeStamp;
          if (next >= commitDistance.current && !thresholdFeedbackSent.current) {
            thresholdFeedbackSent.current = true;
            hapticImpact("light");
          } else if (next < commitDistance.current) {
            thresholdFeedbackSent.current = false;
          }
          pullRef.current = next;
          setPull(next);
          moveSurface(next);
        }}
        onPointerUp={(event) => {
          if (pointerId.current !== event.pointerId) return;
          const fastIntent = pullRef.current >= 28 && velocity.current >= 0.55;
          finish(pullRef.current >= commitDistance.current || fastIntent);
        }}
        onPointerCancel={() => finish(false)}
      />

      <AnimatePresence>
        {active && pull > 8 && (
          <motion.div
            key="edge-swipe-affordance"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: MOTION_SECONDS.press } }}
            className="surface-glass pointer-events-none fixed top-1/2 z-40 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border shadow-elev-2"
            style={{
              left: Math.max(4, Math.min(pull - 22, 66)),
              scale: 0.84 + Math.min(pull / commitDistance.current, 1) * 0.16,
            }}
          >
            <ChevronLeft
              className="h-6 w-6 text-foreground"
              style={{ opacity: 0.55 + Math.min(pull / commitDistance.current, 1) * 0.45 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default EdgeSwipeBack;
