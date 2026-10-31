import { useEffect, useLayoutEffect, useState, type ReactNode } from "react";
import { motion, useAnimationControls, type TargetAndTransition } from "framer-motion";
import { useReducedMotion } from "@/hooks/useAppMotion";
import guideAvatar from "@/assets/onboarding/guide-avatar.webp";

/**
 * The learning guide who asks the placement questions: the owner-provided
 * portrait (see src/assets/IMAGE_CREDITS.md) with a speech bubble whose tail
 * points at her mouth.
 *
 * Motion is event driven: an entrance, a short "speaking" sway for each new
 * question, a nod for an answer and a cheer at the end. Nothing loops
 * continuously, and reduced motion keeps everything still.
 *
 * Geometry: in guide-avatar.webp (529 x 1600, cropped to the figure) the mouth
 * sits at 13.2 % of the height. During the questions phones show the head and
 * shoulders (the top 520 px, mouth at 40.6 %); the greeting ("hero") and wider
 * screens show the whole figure at --guide-figure-h.
 */
export type GuideGesture = "speak" | "nod" | "cheer";

const GESTURES: Record<GuideGesture, TargetAndTransition> = {
  speak: { y: [0, -3, 0, -2, 0], rotate: [0, -0.8, 0.6, -0.3, 0], transition: { duration: 1.1, ease: "easeInOut" } },
  nod: { y: [0, 5, 0], rotate: [0, -1.2, 0], transition: { duration: 0.42, ease: "easeOut" } },
  cheer: { y: [0, -16, 0, -7, 0], scale: [1, 1.035, 1, 1.015, 1], transition: { duration: 0.95, ease: "easeOut" } },
};

/** How long the bubble shows "typing" dots before the words appear. */
const TYPING_MS = 420;

function GuideFigure({ gesture, full, className = "" }: { gesture: { name: GuideGesture; key: number }; full: boolean; className?: string }) {
  const reduced = useReducedMotion();
  const controls = useAnimationControls();
  useEffect(() => {
    if (!reduced) void controls.start(GESTURES[gesture.name]);
  }, [gesture.key, gesture.name, reduced, controls]);

  return (
    <motion.div
      className={`relative ${className}`}
      initial={reduced ? false : { opacity: 0, y: 28, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 240, damping: 24 }}
    >
      {/* A soft spotlight keeps the white uniform apart from light backgrounds. */}
      <span aria-hidden className={`pointer-events-none absolute -inset-x-4 top-0 rounded-full bg-primary/10 blur-2xl ${full ? "h-[34%]" : "h-[60%] sm:h-[34%]"}`} />
      <motion.div
        animate={controls}
        style={{ transformOrigin: "50% 100%" }}
        className={full
          ? "relative h-[var(--guide-figure-h)]"
          : "relative aspect-[529/520] w-[8.5rem] overflow-hidden [-webkit-mask-image:linear-gradient(to_bottom,#000_72%,transparent)] [mask-image:linear-gradient(to_bottom,#000_72%,transparent)] sm:aspect-auto sm:h-[var(--guide-figure-h)] sm:w-auto sm:overflow-visible sm:[-webkit-mask-image:none] sm:[mask-image:none]"}
      >
        <img src={guideAvatar} alt="" width={529} height={1600} decoding="async" draggable={false} className={full ? "block h-full w-auto select-none" : "block w-full select-none sm:h-full sm:w-auto"} />
      </motion.div>
      <span aria-hidden className={`pointer-events-none absolute inset-x-[18%] -bottom-1 h-3 rounded-[50%] bg-foreground/20 blur-md ${full ? "block" : "hidden sm:block"}`} />
    </motion.div>
  );
}

const TypingDots = () => (
  <span aria-hidden className="absolute left-5 top-6 flex gap-1.5 sm:left-7 sm:top-8">
    {[0, 1, 2].map((dot) => (
      <motion.span
        key={dot}
        className="h-2 w-2 rounded-full bg-muted-foreground"
        animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 0.6, repeat: Infinity, delay: dot * 0.12 }}
      />
    ))}
  </span>
);

function SpeechBubble({ speechKey, children, className = "" }: { speechKey: string; children: ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  const [typing, setTyping] = useState(!reduced);
  // Layout effect: the new words must be hidden before the first paint.
  useLayoutEffect(() => {
    if (reduced) { setTyping(false); return; }
    setTyping(true);
    const timer = window.setTimeout(() => setTyping(false), TYPING_MS);
    return () => window.clearTimeout(timer);
  }, [speechKey, reduced]);

  return (
    <motion.div
      className={`relative min-w-0 ${className}`}
      initial={reduced ? false : { opacity: 0, scale: 0.9, x: -12 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      transition={{ type: "spring", stiffness: 320, damping: 26, delay: 0.12 }}
      style={{ transformOrigin: "0% var(--guide-mouth-y)" }}
    >
      <div className="relative min-h-[calc(var(--guide-mouth-y)+2.5rem)] rounded-[1.75rem] border bg-card p-5 text-card-foreground shadow-elev-2 sm:p-7">
        <span aria-hidden className="absolute -left-[9px] top-[calc(var(--guide-mouth-y)-9px)] h-[18px] w-[18px] rotate-45 rounded-bl-[4px] border-b border-l bg-card" />
        {typing && <TypingDots />}
        {/* One text node per sentence: the runtime translator swaps whole
            nodes, so the words are revealed by a mask, never split. */}
        <div key={speechKey} className={typing ? "opacity-0" : "guide-speech-reveal"}>{children}</div>
      </div>
    </motion.div>
  );
}

const CONFETTI_COLORS = ["hsl(var(--primary))", "#d4a54a", "#38bdf8", "#f8fafc"];

function GuideConfetti() {
  const reduced = useReducedMotion();
  const [pieces] = useState(() => Array.from({ length: 22 }, (_, id) => ({
    id,
    x: (Math.random() - 0.5) * 340,
    rise: -(90 + Math.random() * 150),
    rotate: (Math.random() - 0.5) * 540,
    width: 6 + Math.random() * 4,
    delay: Math.random() * 0.12,
    color: CONFETTI_COLORS[id % CONFETTI_COLORS.length],
  })));
  if (reduced) return null;
  return (
    <div aria-hidden className="pointer-events-none absolute left-1/3 top-[18%] z-20">
      {pieces.map((piece) => (
        <motion.span
          key={piece.id}
          className="absolute block h-2.5 rounded-sm"
          style={{ width: piece.width, background: piece.color }}
          initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
          animate={{ x: piece.x, y: [0, piece.rise, piece.rise + 280], opacity: [1, 1, 0], rotate: piece.rotate }}
          transition={{ duration: 1.4, ease: "easeOut", delay: piece.delay }}
        />
      ))}
    </div>
  );
}

interface GuideStageProps {
  gesture: { name: GuideGesture; key: number };
  /** A new key makes the guide "say" the bubble again. */
  speechKey: string;
  /** Bubble content: the question heading and its hint. */
  children: ReactNode;
  /** Answers and actions: under the bubble, beside the figure on wide screens. */
  below?: ReactNode;
  celebrate?: boolean;
  /** The greeting: the whole figure on phones too. */
  hero?: boolean;
}

export function GuideStage({ gesture, speechKey, children, below, celebrate = false, hero = false }: GuideStageProps) {
  return (
    <div className={`relative grid grid-cols-[auto_minmax(0,1fr)] items-start gap-x-1 gap-y-6 sm:grid-rows-[auto_1fr] sm:gap-x-0 sm:[--guide-figure-h:clamp(22rem,60svh,37.5rem)] sm:[--guide-mouth-y:calc(var(--guide-figure-h)*0.132)] ${hero ? "[--guide-figure-h:clamp(18rem,54svh,30rem)] [--guide-mouth-y:calc(var(--guide-figure-h)*0.132)]" : "[--guide-mouth-y:3.4rem]"}`}>
      {/* Keyed: leaving the greeting, the figure steps back in as a portrait. */}
      <GuideFigure key={hero ? "hero" : "portrait"} full={hero} gesture={gesture} className="sm:row-span-2" />
      <SpeechBubble speechKey={speechKey} className="z-10 -ml-3 sm:-ml-6">{children}</SpeechBubble>
      {below && <div className="col-span-2 min-w-0 sm:col-span-1 sm:col-start-2 sm:pl-5">{below}</div>}
      {celebrate && <GuideConfetti />}
    </div>
  );
}
