import { useEffect, useState, useCallback } from "react";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

export interface GalleryPhoto {
  /** Image source (imported asset URL or absolute path). */
  src: string;
  /** Short title shown under the image (1 line, bold). */
  title: string;
  /** Educational caption describing what the photo shows and why it matters. */
  caption: string;
  /**
   * Long descriptive alt text for screen readers (WCAG 1.1.1).
   * If omitted, falls back to "{title}. {caption}".
   */
  alt?: string;
  /** Optional source/credit line (e.g. "Kaynak: Wikimedia Commons / NOAA"). */
  credit?: string;
}

interface PhotoGalleryProps {
  photos: GalleryPhoto[];
  /** Used as fallback context for any photo that lacks an explicit alt text. */
  topicTitle?: string;
}

/**
 * Accessible educational photo gallery.
 *
 * - Each image uses semantic <figure>/<figcaption>.
 * - Alt text is descriptive (not just the caption) for screen readers.
 * - Click/Enter opens a lightbox; Escape closes; ←/→ navigate.
 * - Lightbox has role="dialog" with aria-modal and labelled by the caption.
 */
export function PhotoGallery({ photos, topicTitle }: PhotoGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const close = useCallback(() => setActiveIndex(null), []);
  const next = useCallback(
    () => setActiveIndex((i) => (i === null ? null : (i + 1) % photos.length)),
    [photos.length]
  );
  const prev = useCallback(
    () => setActiveIndex((i) => (i === null ? null : (i - 1 + photos.length) % photos.length)),
    [photos.length]
  );

  useEffect(() => {
    if (activeIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handler);
    // Lock body scroll while lightbox open
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = prevOverflow;
    };
  }, [activeIndex, close, next, prev]);

  if (!photos || photos.length === 0) return null;

  const buildAlt = (p: GalleryPhoto) =>
    p.alt ?? `${topicTitle ? `${topicTitle} — ` : ""}${p.title}. ${p.caption}`;

  const active = activeIndex !== null ? photos[activeIndex] : null;

  return (
    <>
      <section
        aria-label={topicTitle ? `${topicTitle} — photo gallery` : "photo gallery"}
        className="grid gap-3 sm:grid-cols-2"
      >
        {photos.map((p, i) => (
          <figure
            key={`${p.src}-${i}`}
            className="group overflow-hidden rounded-xl border border-border/40 bg-muted/20"
          >
            <button
              type="button"
              onClick={() => setActiveIndex(i)}
              className="relative block w-full overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label={`Enlarge: ${p.title}`}
            >
              <img
                src={p.src}
                alt={buildAlt(p)}
                loading="lazy"
                width={1024}
                height={576}
                className="h-48 w-full object-cover transition-transform duration-sheet group-hover:scale-105"
              />
              <span
                className="pointer-events-none absolute right-2 top-2 inline-flex items-center gap-1 rounded-full bg-background/80 px-2 py-1 text-micro font-medium text-foreground opacity-0 transition-opacity group-hover:opacity-100"
                aria-hidden="true"
              >
                <ZoomIn className="h-3 w-3" /> enlarge
              </span>
            </button>
            <figcaption className="space-y-1 border-t border-border/30 bg-muted/30 px-3 py-2">
              <p className="text-xs font-semibold leading-tight text-foreground">
                {p.title}
              </p>
              <p className="text-micro leading-snug text-muted-foreground">
                {p.caption}
              </p>
              {p.credit && (
                <p className="text-micro italic text-muted-foreground/70">{p.credit}</p>
              )}
            </figcaption>
          </figure>
        ))}
      </section>

      {/* Lightbox */}
      {active && activeIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.title}
          className="fixed inset-0 z-[100] flex flex-col bg-background/95"
          onClick={close}
        >
          <div className="flex items-center justify-between border-b border-border/40 px-4 py-3">
            <p className="text-sm font-semibold text-foreground">
              {active.title}
              <span className="ml-2 text-xs font-normal text-muted-foreground">
                {activeIndex + 1} / {photos.length}
              </span>
            </p>
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div
            className="relative flex flex-1 items-center justify-center overflow-hidden p-4"
            onClick={(e) => e.stopPropagation()}
          >
            {photos.length > 1 && (
              <button
                type="button"
                onClick={prev}
                aria-label="previous photo"
                className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-background/70 p-2 text-foreground shadow hover:bg-background focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
            )}
            <img
              src={active.src}
              alt={buildAlt(active)}
              className="max-h-[75vh] max-w-full rounded-lg object-contain"
            />
            {photos.length > 1 && (
              <button
                type="button"
                onClick={next}
                aria-label="Next photo"
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-background/70 p-2 text-foreground shadow hover:bg-background focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            )}
          </div>

          <div
            className="space-y-1 border-t border-border/40 bg-muted/30 px-4 py-3"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-sm leading-snug text-foreground">{active.caption}</p>
            {active.credit && (
              <p className="text-xs italic text-muted-foreground">{active.credit}</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
