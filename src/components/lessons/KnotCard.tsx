import { useState } from "react";
import { ImageOff } from "lucide-react";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { KNOT_TYING_BY_ID, type KnotTyingDef } from "@/data/knotTyingAnimations";

interface KnotCardProps {
  knotId: string;
}

const DIFFICULTY_BADGE: Record<KnotTyingDef["difficulty"], string> = {
  Kolay: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
  Orta: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
  Zor: "bg-rose-500/15 text-rose-600 dark:text-rose-400",
};

/** A clean, branded placeholder shown when real rope imagery is missing. */
function FramePlaceholder({ name }: { name: string }) {
  return (
    <div className="flex aspect-[16/10] w-full flex-col items-center justify-center gap-2 rounded-lg border border-border/40 bg-gradient-to-br from-muted/60 to-muted/20 text-center">
      <svg viewBox="0 0 120 60" className="h-12 w-24 text-amber-500/70" fill="none" aria-hidden>
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
      <span className="px-3 text-[10px] text-muted-foreground/70">{name}</span>
    </div>
  );
}

/** A single knot frame photo with an error fallback to the placeholder. */
function FramePhoto({ src, alt, label, name }: { src: string; alt: string; label: string; name: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) return <FramePlaceholder name={name} />;
  return (
    <figure className="relative overflow-hidden rounded-lg border border-border/40 bg-card">
      <img
        src={src}
        alt={alt}
        className="aspect-[16/10] w-full object-contain"
        loading="lazy"
        onError={() => setFailed(true)}
      />
      <figcaption className="absolute left-1.5 top-1.5 rounded-full bg-background/70 px-2 py-0.5 text-[10px] font-medium text-foreground backdrop-blur-sm">
        {label}
      </figcaption>
    </figure>
  );
}

/**
 * One maritime knot rendered as a collapsible accordion item. The card is
 * fully static — no auto-play and no previous/next stepping. When opened it
 * shows the photo gallery (or a placeholder), the numbered steps and the
 * usage note. Must be rendered inside an <Accordion>.
 */
export default function KnotCard({ knotId }: KnotCardProps) {
  const def = KNOT_TYING_BY_ID[knotId];
  if (!def) return null;

  const photoFrames = def.media.kind === "frames" ? def.media.frames : [];
  const gifSrc = def.media.kind === "gif" ? def.media.src : null;
  const attribution = "attribution" in def.media ? def.media.attribution : undefined;

  return (
    <AccordionItem value={def.id} className="border-b border-border/40 last:border-b-0" data-no-translate>
      <AccordionTrigger className="px-3 py-3 hover:no-underline">
        <div className="flex flex-1 flex-wrap items-center gap-x-2 gap-y-1 pr-2 text-left">
          <span className="text-sm font-semibold text-foreground">{def.name}</span>
          <span className="text-[11px] text-muted-foreground">{def.nameEn}</span>
          <span
            className={`ml-auto text-[10px] font-medium px-2 py-0.5 rounded-full ${DIFFICULTY_BADGE[def.difficulty]}`}
          >
            {def.difficulty}
          </span>
        </div>
      </AccordionTrigger>

      <AccordionContent className="px-3">
        {/* Media */}
        {gifSrc ? (
          <img
            src={gifSrc}
            alt={`${def.name} bağının nasıl atıldığını gösteren animasyon`}
            className="aspect-[16/10] w-full rounded-lg border border-border/40 object-contain"
            loading="lazy"
          />
        ) : photoFrames.length > 1 ? (
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {photoFrames.map((src, i) => (
              <FramePhoto
                key={src}
                src={src}
                alt={`${def.name} — ${i + 1}. aşama`}
                label={`${i + 1} / ${photoFrames.length}`}
                name={def.name}
              />
            ))}
          </div>
        ) : photoFrames.length === 1 ? (
          <div className="mx-auto max-w-md">
            <FramePhoto src={photoFrames[0]} alt={def.name} label={def.name} name={def.name} />
          </div>
        ) : (
          <FramePlaceholder name={def.name} />
        )}

        {/* Steps */}
        <ol className="mt-3 space-y-2">
          {def.steps.map((step, i) => (
            <li key={i} className="flex gap-2.5">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-500/15 text-[11px] font-semibold text-amber-600 dark:text-amber-400">
                {i + 1}
              </span>
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground">{step.title.replace(/^\d+\s*·\s*/, "")}</p>
                <p className="text-xs leading-relaxed text-muted-foreground">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>

        {/* Usage note */}
        <div className="mt-3 rounded-lg border border-border/40 bg-muted/20 px-3 py-2">
          <p className="text-xs leading-relaxed text-muted-foreground">
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
      </AccordionContent>
    </AccordionItem>
  );
}
