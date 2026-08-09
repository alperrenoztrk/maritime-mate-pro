import { ChevronLeft } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { findParentPath } from "@/hooks/useNavigationHierarchy";
import { isArticleOpen } from "@/hooks/useArticleBackGuard";
import { hapticSelection } from "@/services/haptics";
import { requestLocalBack } from "@/lib/localBack";

const EDGE_WIDTH = 28;
const COMMIT_DISTANCE = 84;

/** Adds the familiar iOS left-edge back gesture to the WebView shell. */
export function SwipeBackGesture() {
  const { pathname, search } = useLocation();
  const navigate = useNavigate();
  const start = useRef<{ x: number; y: number; pointerId: number } | null>(null);
  const latestDistance = useRef(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (pathname === "/" || pathname.startsWith("/auth") || pathname === "/reset-password") return;

    const root = document.documentElement;
    const reset = () => {
      start.current = null;
      latestDistance.current = 0;
      setProgress(0);
      document.body.classList.remove("is-edge-swiping");
      root.style.removeProperty("--route-swipe-x");
    };

    const onPointerDown = (event: PointerEvent) => {
      const modalOpen = document.querySelector('[role="dialog"][data-state="open"]');
      if (event.pointerType === "mouse" || event.clientX > EDGE_WIDTH || isArticleOpen() || modalOpen) return;
      start.current = { x: event.clientX, y: event.clientY, pointerId: event.pointerId };
    };

    const onPointerMove = (event: PointerEvent) => {
      const origin = start.current;
      if (!origin || origin.pointerId !== event.pointerId) return;
      const dx = Math.max(0, event.clientX - origin.x);
      const dy = Math.abs(event.clientY - origin.y);
      if (dy > dx && dx < 12) {
        reset();
        return;
      }
      if (dx <= 4) return;

      event.preventDefault();
      latestDistance.current = dx;
      const nextProgress = Math.min(1, dx / COMMIT_DISTANCE);
      setProgress(nextProgress);
      document.body.classList.add("is-edge-swiping");
      root.style.setProperty("--route-swipe-x", `${Math.min(44, dx * 0.38)}px`);
    };

    const onPointerEnd = (event: PointerEvent) => {
      const origin = start.current;
      if (!origin || origin.pointerId !== event.pointerId) return;
      const shouldNavigate = latestDistance.current >= COMMIT_DISTANCE;
      reset();
      if (shouldNavigate) {
        hapticSelection();
        if (!requestLocalBack()) {
          navigate(search ? pathname : findParentPath(pathname), { replace: true });
        }
      }
    };

    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: false });
    window.addEventListener("pointerup", onPointerEnd, { passive: true });
    window.addEventListener("pointercancel", onPointerEnd, { passive: true });
    return () => {
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerEnd);
      window.removeEventListener("pointercancel", onPointerEnd);
      reset();
    };
  }, [navigate, pathname, search]);

  if (progress === 0) return null;

  return (
    <div
      aria-hidden
      className="ios-glass pointer-events-none fixed left-2 top-1/2 z-40 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full text-primary"
      style={{ opacity: 0.4 + progress * 0.6, transform: `translateY(-50%) scale(${0.86 + progress * 0.14})` }}
    >
      <ChevronLeft className="h-6 w-6" strokeWidth={2.5} />
    </div>
  );
}
