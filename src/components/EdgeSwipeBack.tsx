import { useEffect, useRef, useState } from "react";
import { ChevronLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useBackNavigation } from "@/hooks/useBackNavigation";
import { hapticImpact } from "@/lib/haptics";

/**
 * iOS-style interactive back gesture: drag in from the left edge to go back.
 *
 * The app had no swipe-back at all — on iOS that is one of the first things
 * a user tries, and its absence is a large part of why the app read as a web
 * page in a shell.
 *
 * Why an affordance rather than dragging the page itself: the outgoing page
 * is owned by framer-motion inside AnimatePresence (see PageTransition).
 * Fighting it for the same transform would mean two animation systems
 * writing one element. Instead the gesture shows a chevron that tracks the
 * finger and commits past a threshold, then hands off to the normal pop
 * transition — which already animates in the correct direction because
 * useBackNavigation climbs the hierarchy and navigationDirection records it
 * as a pop.
 */

const EDGE_WIDTH = 24; // px of screen edge that starts the gesture
const COMMIT_DISTANCE = 72; // px of travel that commits the back navigation
const MAX_PULL = 96; // px the affordance can travel

export const EdgeSwipeBack = () => {
  const { goBack, canGoBack } = useBackNavigation();
  const [pull, setPull] = useState(0);
  const [active, setActive] = useState(false);
  const startX = useRef(0);
  const startY = useRef(0);
  const pointerId = useRef<number | null>(null);
  const committed = useRef(false);
  // The commit decision must NOT read `pull` state: a fast flick can deliver
  // pointermove and pointerup in the same frame, before React has re-rendered,
  // and the gesture would silently do nothing. The ref is updated
  // synchronously; the state exists only to drive the affordance.
  const pullRef = useRef(0);

  // A route change while a drag is in flight must not leave the affordance
  // stuck on screen.
  useEffect(() => {
    if (!canGoBack) {
      setActive(false);
      setPull(0);
    }
  }, [canGoBack]);

  if (!canGoBack) return null;

  const end = (commit: boolean) => {
    if (commit && !committed.current) {
      committed.current = true;
      goBack();
    }
    setActive(false);
    setPull(0);
    pullRef.current = 0;
    pointerId.current = null;
  };

  return (
    <>
      <div
        // Invisible capture strip pinned to the left edge, below the modal
        // layer so dialogs keep their own gestures.
        className="fixed left-0 top-0 z-40 h-full touch-pan-y"
        style={{
          width: EDGE_WIDTH,
          // Never sit under the notch cutout in landscape.
          paddingLeft: "var(--safe-left)",
        }}
        onPointerDown={(e) => {
          if (e.pointerType === "mouse") return; // touch/pen only
          pointerId.current = e.pointerId;
          startX.current = e.clientX;
          startY.current = e.clientY;
          committed.current = false;
          pullRef.current = 0;
          setActive(true);
          try {
            e.currentTarget.setPointerCapture(e.pointerId);
          } catch {
            // Capture is an optimisation, not a requirement — some engines
            // reject it for pointers they no longer consider active.
          }
        }}
        onPointerMove={(e) => {
          if (pointerId.current !== e.pointerId) return;
          const dx = e.clientX - startX.current;
          const dy = Math.abs(e.clientY - startY.current);
          // Vertical intent wins — this must never hijack a scroll.
          if (dy > Math.abs(dx) && dy > 12) {
            end(false);
            return;
          }
          const next = Math.max(0, Math.min(dx, MAX_PULL));
          // One tick of feedback the moment the gesture becomes committing,
          // exactly like iOS.
          if (next >= COMMIT_DISTANCE && pullRef.current < COMMIT_DISTANCE) {
            hapticImpact("light");
          }
          pullRef.current = next;
          setPull(next);
        }}
        onPointerUp={(e) => {
          if (pointerId.current !== e.pointerId) return;
          end(pullRef.current >= COMMIT_DISTANCE);
        }}
        onPointerCancel={() => end(false)}
      />

      <AnimatePresence>
        {active && pull > 8 && (
          <motion.div
            key="edge-swipe-affordance"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            className="surface-glass pointer-events-none fixed top-1/2 z-40 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border shadow-elev-2"
            style={{
              left: Math.min(pull, MAX_PULL) - 24,
              // Firms up as the gesture approaches the commit threshold.
              scale: 0.8 + Math.min(pull / COMMIT_DISTANCE, 1) * 0.2,
            }}
          >
            <ChevronLeft
              className="h-6 w-6 text-white transition-opacity duration-control"
              style={{ opacity: 0.5 + Math.min(pull / COMMIT_DISTANCE, 1) * 0.5 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default EdgeSwipeBack;
