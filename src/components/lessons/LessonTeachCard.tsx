import ReactMarkdown from "react-markdown";
import type { TopicSection } from "@/data/navigationTopicContents";
import { stripMarkdown, stripDollarSigns } from "@/utils/cleanText";
import { resolveLessonImage } from "@/utils/lessonImageFallbacks";

/**
 * Tek bir ders bölümünün (TopicSection) anlatım kartı.
 *
 * `LessonTopicDetailPage`'in bölüm render mantığı buraya ayrıştırıldı; hem beta
 * detay sayfası hem de Duolingo `GuidedLessonSession` "teach" adımı bunu kullanır.
 * Anlatım içeriği mevcut veri kaynağından gelir; burada YENİDEN yazılmaz.
 */
export function LessonTeachCard({
  section,
  categoryId,
  topicTitle,
}: {
  section: TopicSection;
  categoryId: string;
  topicTitle: string;
}) {
  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold text-foreground">{section.title}</h2>

      {section.image && (
        <div className="mx-auto max-w-md overflow-hidden rounded-xl border border-border/40">
          <img
            src={resolveLessonImage(categoryId, section.image, section.title, topicTitle, section.imageAlt)}
            alt={section.imageAlt || section.title}
            className="h-48 w-full bg-muted/30 object-contain"
            loading="lazy"
          />
        </div>
      )}

      <ReactMarkdown
        components={{
          p: ({ children }) => (
            <p className="text-sm leading-relaxed text-foreground/80">{children}</p>
          ),
          img: ({ src, alt }) => (
            <div className="mx-auto max-w-md overflow-hidden rounded-xl border border-border/40">
              <img
                src={resolveLessonImage(categoryId, src, section.title, topicTitle, alt)}
                alt={alt || section.title}
                className="h-48 w-full bg-muted/30 object-contain"
                loading="lazy"
              />
            </div>
          ),
        }}
      >
        {stripDollarSigns(section.content)}
      </ReactMarkdown>

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
          <p className="mt-2 text-xs text-muted-foreground">{section.formula.description}</p>
        </div>
      )}
    </section>
  );
}
