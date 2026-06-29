import { useEffect, useMemo, useRef, useState } from "react";
import { Play, Pause, RotateCcw, ChevronLeft, ChevronRight, Gauge, ImageOff } from "lucide-react";
import { KNOT_TYING_BY_ID, type KnotTyingDef } from "@/data/knotTyingAnimations";

interface KnotMediaPlayerProps {
  knotId: string;
  /** Seconds each frame is held at 1x speed. */
  frameSeconds?: number;
}

const DIFFICULTY_BADGE: Record<KnotTyingDef["difficulty"], string> = {
  Kolay: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
  Orta: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
  Zor: "bg-rose-500/15 text-rose-600 dark:text-rose-400",
};

/** A clean, branded placeholder shown while real rope imagery is missing. */
function FramePlaceholder({ name, stepLabel }: { name: string; stepLabel: string }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-muted/60 to-muted/20 text-center">
      <svg viewBox="0 0 120 60" className="h-14 w-28 text-amber-500/70" fill="none" aria-hidden>
        {/* simple looped-rope motif */}
        <path
          d="M10 40 C 30 5, 50 5, 60 30 C 70 55, 90 55, 110 20"
          stroke="currentColor"
          strokeWidth={6}
          strokeLinecap="round"
        />
        <circle cx="60" cy="30" r="9" stroke="currentColor" strokeWidth={4} className="text-amber-500/40" />
      </svg>
      <div className="flex items-center gap-1.5 text-muted-foreground">
        <ImageOff className="h-3.5 w-3.5" />
        <span className="text-[11px] font-medium">Gerçek görsel eklenecek</span>
      </div>
      <span className="px-3 text-[10px] text-muted-foreground/70">
        {name} — {stepLabel}
      </span>
    </div>
  );
}

export default function KnotMediaPlayer({ knotId, frameSeconds = 1.6 }: KnotMediaPlayerProps) {
  const def = KNOT_TYING_BY_ID[knotId];

  const prefersReducedMotion = useMemo(() => {
    if (typeof window === "undefined" || !("matchMedia" in window)) return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const isFrames = def?.media.kind === "frames";
  const frames = def && def.media.kind === "frames" ? def.media.frames : [];
  const frameCount = Math.max(frames.length, def?.steps.length ?? 1);

  const [index, setIndex] = useState(prefersReducedMotion ? frameCount - 1 : 0);
  const [isPlaying, setIsPlaying] = useState(isFrames && !prefersReducedMotion);
  const [speed, setSpeed] = useState(1);
  const [failed, setFailed] = useState<Record<number, boolean>>({});

  const containerRef = useRef<HTMLDivElement | null>(null);
  const visibleRef = useRef(true);
  const timerRef = useRef<number | null>(null);

  // Pause the loop while scrolled off-screen.
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => (visibleRef.current = e.isIntersecting)),
      { threshold: 0.05 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Frame auto-advance loop.
  useEffect(() => {
    if (!isFrames || !isPlaying || frameCount <= 1) return;
    const stepMs = Math.max(250, (frameSeconds / speed) * 1000);
    const id = window.setInterval(() => {
      if (!visibleRef.current) return;
      setIndex((i) => (i + 1) % frameCount);
    }, stepMs);
    timerRef.current = id;
    return () => window.clearInterval(id);
  }, [isFrames, isPlaying, frameCount, speed, frameSeconds]);

  if (!def) return null;

  const activeStep = def.steps[Math.min(index, def.steps.length - 1)];
  const frameSrc = frames[index];
  const showPlaceholder = !isFrames ? false : !frameSrc || failed[index];

  const goTo = (i: number) => {
    setIsPlaying(false);
    setIndex(Math.max(0, Math.min(frameCount - 1, i)));
  };

  const handleRestart = () => {
    setIndex(0);
    if (isFrames) setIsPlaying(true);
  };

  const attribution = def.media.attribution;

  return (
    <div
      ref={containerRef}
      className="flex flex-col rounded-xl border border-border/50 bg-card/80 overflow-hidden"
      data-no-translate
    >
      {/* Title row */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 border-b border-border/40 bg-muted/30">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-sm font-semibold text-foreground truncate">{def.name}</span>
          <span className="text-[11px] text-muted-foreground truncate">{def.nameEn}</span>
        </div>
        <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${DIFFICULTY_BADGE[def.difficulty]}`}>
          {def.difficulty}
        </span>
      </div>

      {/* Media stage */}
      <div className="relative aspect-[16/10] w-full bg-card">
        {def.media.kind === "gif" ? (
          <img
            src={def.media.src}
            alt={`${def.name} bağının nasıl atıldığını gösteren animasyon`}
            className="h-full w-full object-contain"
            loading="lazy"
          />
        ) : showPlaceholder ? (
          <FramePlaceholder name={def.name} stepLabel={activeStep.title} />
        ) : (
          <img
            key={frameSrc}
            src={frameSrc}
            alt={`${def.name} — ${activeStep.title}`}
            className="h-full w-full object-contain"
            loading="lazy"
            onError={() => setFailed((f) => ({ ...f, [index]: true }))}
          />
        )}

        {/* Frame counter */}
        {isFrames && frameCount > 1 && (
          <span className="absolute top-2 right-2 rounded-full bg-background/70 px-2 py-0.5 text-[10px] font-medium text-foreground backdrop-blur-sm">
            {index + 1} / {frameCount}
          </span>
        )}
      </div>

      {/* Step caption */}
      <div className="px-3 py-2.5 border-t border-border/40">
        <div className="flex items-center gap-1.5 mb-1.5">
          {def.steps.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all ${
                i === Math.min(index, def.steps.length - 1)
                  ? "w-6 bg-amber-500"
                  : i < index
                    ? "w-3 bg-amber-500/50"
                    : "w-3 bg-muted-foreground/25"
              }`}
            />
          ))}
        </div>
        <p className="text-sm font-medium text-foreground">{activeStep.title}</p>
        <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{activeStep.description}</p>
      </div>

      {/* Controls — only meaningful for frame sequences */}
      {isFrames && (
        <div className="flex items-center gap-2 px-3 py-2 border-t border-border/40 bg-muted/20">
          <button
            type="button"
            onClick={() => setIsPlaying((p) => !p)}
            className="inline-flex items-center gap-1.5 rounded-lg bg-amber-500 px-3 py-1.5 text-xs font-medium text-white hover:bg-amber-600 transition-colors"
            aria-label={isPlaying ? "Duraklat" : "Oynat"}
          >
            {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
            {isPlaying ? "Duraklat" : "Oynat"}
          </button>
          <button
            type="button"
            onClick={() => goTo(index - 1)}
            className="inline-flex items-center justify-center rounded-lg border border-border/60 p-1.5 text-foreground hover:bg-muted transition-colors disabled:opacity-40"
            disabled={index <= 0}
            aria-label="Önceki adım"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={() => goTo(index + 1)}
            className="inline-flex items-center justify-center rounded-lg border border-border/60 p-1.5 text-foreground hover:bg-muted transition-colors disabled:opacity-40"
            disabled={index >= frameCount - 1}
            aria-label="Sonraki adım"
          >
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={handleRestart}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border/60 px-2.5 py-1.5 text-xs font-medium text-foreground hover:bg-muted transition-colors"
            aria-label="Baştan oynat"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>

          {/* Scrubber */}
          <input
            type="range"
            min={0}
            max={Math.max(0, frameCount - 1)}
            step={1}
            value={index}
            onChange={(e) => goTo(parseInt(e.target.value, 10))}
            className="flex-1 min-w-[50px] accent-amber-500"
            aria-label="Adım çubuğu"
          />

          <div className="flex items-center gap-1 text-muted-foreground" title="Hız">
            <Gauge className="h-3.5 w-3.5" />
            <select
              value={speed}
              onChange={(e) => setSpeed(parseFloat(e.target.value))}
              className="bg-transparent text-xs text-foreground outline-none"
              aria-label="Animasyon hızı"
            >
              <option value={0.5}>0.5x</option>
              <option value={1}>1x</option>
              <option value={1.5}>1.5x</option>
              <option value={2}>2x</option>
            </select>
          </div>
        </div>
      )}

      {/* Usage note */}
      <div className="px-3 py-2 border-t border-border/40">
        <p className="text-xs text-muted-foreground leading-relaxed">
          <span className="font-medium text-foreground">Kullanım: </span>
          {def.use}
          {def.strengthLoss && (
            <span className="ml-1 text-amber-600 dark:text-amber-400">({def.strengthLoss})</span>
          )}
        </p>
        {attribution && (
          <p className="mt-1 text-[10px] text-muted-foreground/70">Görsel: {attribution}</p>
        )}
      </div>
    </div>
  );
}
