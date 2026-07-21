import ReactMarkdown from "react-markdown";
import type { BetaSection } from "@/data/betaLessons";
import { stripMarkdown, stripDollarSigns } from "@/utils/cleanText";
import { normalizeLessonMarkdownImages, resolveLessonImage } from "@/utils/lessonImageFallbacks";

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
}: {
  section: BetaSection;
  categoryId: string;
  topicTitle: string;
}) {
  const sectionImage = resolveLessonImage(
    categoryId,
    section.image,
    section.title,
    topicTitle,
    section.imageAlt,
  );
  const content = section.content
    ? normalizeLessonMarkdownImages(
        section.content,
        categoryId,
        section.title,
        topicTitle,
        sectionImage ? [sectionImage] : [],
      )
    : section.content;

  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold text-foreground">{section.title}</h2>

      {sectionImage && (
        <div className="mx-auto max-w-md overflow-hidden rounded-xl border border-border/40">
          <img
            src={sectionImage}
            alt={section.imageAlt || section.title}
            className="h-48 w-full bg-muted/30 object-contain"
            loading="lazy"
          />
        </div>
      )}

      {content && (
        <ReactMarkdown
          components={{
            p: ({ children }) => (
              <p className="text-sm leading-relaxed text-foreground/80">{children}</p>
            ),
            img: ({ src, alt }) =>
              src ? (
                <div className="mx-auto max-w-md overflow-hidden rounded-xl border border-border/40">
                  <img
                    src={src}
                    alt={alt || section.title}
                    className="h-48 w-full bg-muted/30 object-contain"
                    loading="lazy"
                  />
                </div>
              ) : null,
          }}
        >
          {stripDollarSigns(content)}
        </ReactMarkdown>
      )}

      {section.bulletPoints && section.bulletPoints.length > 0 && (
        <ul className="space-y-2 pl-1">
          {section.bulletPoints.map((point, pointIndex) => (
            <li
              key={`${section.title}-point-${pointIndex}`}
              className="flex items-start gap-3 text-sm text-foreground/80"
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
                  <th key={i} className="px-3 py-2 font-semibold text-foreground">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {section.table.rows.map((row, ri) => (
                <tr key={ri} className="border-t border-border/40">
                  {row.map((cell, ci) => (
                    <td key={ci} className="px-3 py-2 text-foreground/80">{cell}</td>
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
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-sky-700 dark:text-sky-300">
              Çözümlü Örnek
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
                Sonuç: {section.example.result}
              </p>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
