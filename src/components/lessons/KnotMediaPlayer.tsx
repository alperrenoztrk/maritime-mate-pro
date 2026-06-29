import { useState, type KeyboardEvent } from "react";
import { RotateCcw, ChevronLeft, ChevronRight, ImageOff } from "lucide-react";
import { KNOT_TYING_BY_ID, type KnotTyingDef } from "@/data/knotTyingAnimations";

interface KnotMediaPlayerProps {
  knotId: string;
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

export default function KnotMediaPlayer({ knotId }: KnotMediaPlayerProps) {
  const def = KNOT_TYING_BY_ID[knotId];

  const isFrames = def?.media.kind === "frames";
  const frames = def && def.media.kind === "frames" ? def.media.frames : [];
  const frameCount = Math.max(frames.length, def?.steps.length ?? 1);

  // Fully manual stepping — the player never advances on its own.
  const [index, setIndex] = useState(0);
  const [failed, setFailed] = useState<Record<number, boolean>>({});

  if (!def) return null;

  const activeStep = def.steps[Math.min(index, def.steps.length - 1)];
  const frameSrc = frames[index];
  const showPlaceholder = !isFrames ? false : !frameSrc || failed[index];

  const goTo = (i: number) => {
    setIndex(Math.max(0, Math.min(frameCount - 1, i)));
  };

  const handleRestart = () => {
    setIndex(0);
  };

  // Step through frames with the keyboard arrows when the card is focused.
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (!isFrames || frameCount <= 1) return;
    if (e.key === "ArrowRight") {
      e.preventDefault();
      goTo(index + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      goTo(index - 1);
    }
  };

  const attribution = def.media.attribution;

  return (
    <div
      className="flex flex-col rounded-xl border border-border/50 bg-card/80 overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/60"
      data-no-translate
      tabIndex={isFrames && frameCount > 1 ? 0 : undefined}
      onKeyDown={handleKeyDown}
      role={isFrames && frameCount > 1 ? "group" : undefined}
      aria-label={isFrames && frameCount > 1 ? `${def.name} — adımlar arasında ok tuşlarıyla gezinin` : undefined}
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

      {/* Controls — manual stepping only; the player never auto-advances. */}
      {isFrames && frameCount > 1 && (
        <div className="flex flex-col gap-2 px-3 py-2 border-t border-border/40 bg-muted/20">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => goTo(index - 1)}
              className="inline-flex items-center gap-1 rounded-lg border border-border/60 px-2.5 py-1.5 text-xs font-medium text-foreground hover:bg-muted transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              disabled={index <= 0}
              aria-label="Önceki adım"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
              Önceki
            </button>
            <button
              type="button"
              onClick={() => goTo(index + 1)}
              className="inline-flex items-center gap-1 rounded-lg bg-amber-500 px-3 py-1.5 text-xs font-medium text-white hover:bg-amber-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-amber-500"
              disabled={index >= frameCount - 1}
              aria-label="Sonraki adım"
            >
              Sonraki
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={handleRestart}
              className="ml-auto inline-flex items-center gap-1.5 rounded-lg border border-border/60 px-2.5 py-1.5 text-xs font-medium text-foreground hover:bg-muted transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              disabled={index <= 0}
              aria-label="Baştan başlat"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Baştan
            </button>
          </div>

          {/* Scrubber */}
          <input
            type="range"
            min={0}
            max={Math.max(0, frameCount - 1)}
            step={1}
            value={index}
            onChange={(e) => goTo(parseInt(e.target.value, 10))}
            className="w-full accent-amber-500"
            aria-label="Adım çubuğu"
          />
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
