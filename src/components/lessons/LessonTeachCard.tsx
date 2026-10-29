import ReactMarkdown from "react-markdown";
import { useState } from "react";
import type { BetaSection } from "@/data/betaLessons";
import { stripMarkdown, stripDollarSigns } from "@/utils/cleanText";
import { normalizeLessonMarkdownImages, resolveLessonImage } from "@/utils/lessonImageFallbacks";
import { LessonImage } from "@/components/ui/LessonImage";
import { ImageViewerModal } from "@/components/ui/ImageViewerModal";
import { LessonFigure } from "@/components/lessons/figures/LessonFigure";

/**
 * Tek bir normalize ders bölümünün (BetaSection) anlatım kartı.
 *
 * Hem güverte (nav/meteo/comm/stabilite) hem makine içeriğini render eder:
 * metin, görsel, madde listesi, formül, çözümlü örnek ve tablo. Beta detay
 * sayfası ve Duolingo `GuidedLessonSession` "teach" adımı bunu kullanır.
 */
export function LessonTeachCard({
  section,
  categoryId,
  topicTitle,
  hideImage = false,
  alreadyUsedImages,
}: {
  section: BetaSection;
  categoryId: string;
  topicTitle: string;
  /** Görsel aynı konuda daha önce gösterildiyse tekrar basılmaz. */
  hideImage?: boolean;
  /**
   * Konunun ÖNCEKİ bölümlerinde basılmış görseller. Metin içindeki markdown
   * görselleri bunlara karşı da elenir; aksi hâlde aynı diyagram bir konunun
   * her bölümünde yeniden görünür.
   */
  alreadyUsedImages?: readonly string[];
}) {
  const [zoomImage, setZoomImage] = useState<{ src: string; alt: string } | null>(null);
  const resolvedImage = resolveLessonImage(
    categoryId,
    section.image,
    section.sourceTitle ?? section.title,
    topicTitle,
    section.imageAlt,
  );
  const sectionImage = hideImage ? undefined : resolvedImage;
  const content = section.content
    ? normalizeLessonMarkdownImages(
        section.content,
        categoryId,
        section.sourceTitle ?? section.title,
        topicTitle,
        [...(alreadyUsedImages ?? []), ...(resolvedImage ? [resolvedImage] : [])],
      )
    : section.content;

  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold text-foreground">{section.title}</h2>

      {sectionImage && (
        <button
          type="button"
          onClick={() => setZoomImage({ src: sectionImage, alt: section.imageAlt || section.title })}
          aria-label="Enlarge technical illustration"
          className="mx-auto block w-full max-w-md cursor-zoom-in overflow-hidden rounded-xl border border-border/40"
        >
          <LessonImage
            src={sectionImage}
            alt={section.imageAlt || section.title}
            className="mx-auto h-auto max-h-[36rem] w-full bg-muted/30 object-contain"
          />
        </button>
      )}

      {content && (
        <ReactMarkdown
          components={{
            p: ({ children }) => (
              <p className="text-base leading-relaxed text-foreground/85">{children}</p>
            ),
            img: ({ src, alt }) =>
              src ? (
                <button
                  type="button"
                  onClick={() => setZoomImage({ src, alt: alt || section.title })}
                  aria-label="Enlarge lesson illustration"
                  className="mx-auto block w-full max-w-md cursor-zoom-in overflow-hidden rounded-xl border border-border/40"
                >
                  <LessonImage
                    src={src}
                    alt={alt || section.title}
                    className="mx-auto h-auto max-h-[36rem] w-full bg-muted/30 object-contain"
                  />
                </button>
              ) : null,
          }}
        >
          {stripDollarSigns(content)}
        </ReactMarkdown>
      )}

      {section.figure && <LessonFigure id={section.figure} />}

      {section.bulletPoints && section.bulletPoints.length > 0 && (
        <ul className="space-y-2 pl-1">
          {section.bulletPoints.map((point, pointIndex) => (
            <li
              key={`${section.title}-point-${pointIndex}`}
              className="flex items-start gap-3 text-base text-foreground/85"
            >
              <div className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              <span>{stripMarkdown(point)}</span>
            </li>
          ))}
        </ul>
      )}

      {section.formula && (
        <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
          <p className="font-mono text-sm font-medium text-amber-700 dark:text-amber-400">
            {section.formula.text}
          </p>
          {section.formula.description && (
            <p className="mt-2 text-xs text-muted-foreground">{section.formula.description}</p>
          )}
        </div>
      )}

      {section.table && section.table.headers.length > 0 && (
        <div className="overflow-x-auto rounded-lg border border-border/40">
          <table className="w-full text-left text-xs">
            <thead className="bg-muted/50">
              <tr>
                {section.table.headers.map((h, i) => (
                  <th key={i} className="break-normal px-3 py-2 font-semibold text-foreground">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {section.table.rows.map((row, ri) => (
                <tr key={ri} className="border-t border-border/40">
                  {row.map((cell, ci) => (
                    <td key={ci} className="break-normal px-3 py-2 text-foreground/80">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {section.example && (
        <div className="overflow-hidden rounded-xl border border-sky-500/30 bg-sky-500/5">
          <div className="bg-sky-500/10 px-4 py-2">
            <p className="text-micro font-bold uppercase tracking-[0.2em] text-sky-700 dark:text-sky-300">
              Worked Example
            </p>
          </div>
          <div className="space-y-2 p-4">
            <p className="text-sm font-medium text-foreground">{section.example.problem}</p>
            {section.example.steps && section.example.steps.length > 0 && (
              <ol className="space-y-1 pl-1">
                {section.example.steps.map((st, i) => (
                  <li key={i} className="text-xs leading-relaxed text-foreground/80">
                    {i + 1}. {st}
                  </li>
                ))}
              </ol>
            )}
            {section.example.solution && (
              <p className="text-xs leading-relaxed text-foreground/80">{section.example.solution}</p>
            )}
            {section.example.result && (
              <p className="rounded-md bg-emerald-500/10 px-3 py-2 text-sm font-semibold text-emerald-700 dark:text-emerald-300">
                Result: {section.example.result}
              </p>
            )}
          </div>
        </div>
      )}
      {section.references && section.references.length > 0 && (
        <aside aria-label="Further reading" className="space-y-2 border-t border-border/40 pt-4">
          <p className="text-sm font-semibold text-foreground">Further reading</p>
          <ul className="space-y-2">
            {section.references.map((reference) => (
              <li key={reference.url}>
                <a href={reference.url} target="_blank" rel="noopener noreferrer" className="text-sm text-primary underline underline-offset-4">
                  {reference.title}
                </a>
              </li>
            ))}
          </ul>
        </aside>
      )}
      <ImageViewerModal
        src={zoomImage?.src ?? ""}
        alt={zoomImage?.alt}
        isOpen={zoomImage !== null}
        onClose={() => setZoomImage(null)}
      />
    </section>
  );
}
