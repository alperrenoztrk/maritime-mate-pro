import { Lightbulb } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { stripMarkdown, stripDollarSigns } from "@/utils/cleanText";
import type { TopicDetailContent } from "@/data/navigationTopicContents";
import { useTopicContentOverrides } from "@/hooks/useTopicContentOverrides";
import { buildSectionKey, type ContentCategory } from "@/services/topicContentOverrides";
import { normalizeLessonMarkdownImages, resolveLessonImage } from "@/utils/lessonImageFallbacks";
import { getLessonTopicEnhancement } from "@/data/lessonTopicEnhancements";
import { LessonEnhancementBlock } from "@/components/lessons/LessonEnhancementBlock";

/**
 * Ders anlatımının klasik (uzun metin) görünümü.
 *
 * Slayt oynatıcısı varsayılan hâle geldiğinde bu görünüm kaybolmasın diye
 * `LessonTopicDetailPage` içinden buraya taşındı; kullanıcı "Metin olarak oku"
 * seçtiğinde aynen eskisi gibi render edilir (içerik override'ları, görsel
 * yedekleri ve "Detaylı Anlatım" bloğu dahil).
 */
export function LessonTextView({
  content,
  categoryId,
  topicTitle,
}: {
  content: TopicDetailContent;
  categoryId: string;
  topicTitle: string;
}) {
  const overrides = useTopicContentOverrides();
  const enhancement = getLessonTopicEnhancement(categoryId, topicTitle);

  return (
    <div className="flex flex-col gap-8">
      <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
        <p className="text-sm leading-relaxed text-foreground/90">
          {stripMarkdown(content.introduction)}
        </p>
      </div>

      {content.sections.map((section, index) => {
        const categoryKey = (categoryId ?? "navigation") as ContentCategory;
        const overrideKey = buildSectionKey(categoryKey, topicTitle || content.title, section.title);
        const override = overrides[overrideKey];
        const sectionImage = resolveLessonImage(
          categoryId,
          section.image,
          section.title,
          content.title,
          section.imageAlt,
        );
        const resolvedContent = normalizeLessonMarkdownImages(
          override?.content || section.content,
          categoryId,
          section.title,
          content.title,
          sectionImage ? [sectionImage] : [],
        );

        return (
          <section key={`${section.title}-${index}`} className="space-y-4">
            <h2 className="text-lg font-semibold text-foreground">{section.title}</h2>

            {sectionImage && (
              <div className="mx-auto max-w-md overflow-hidden rounded-xl border border-border/40">
                <img
                  src={sectionImage}
                  alt={section.imageAlt || section.title}
                  className="h-48 w-full object-contain bg-muted/30"
                  loading="lazy"
                />
              </div>
            )}

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
                        className="h-48 w-full object-contain bg-muted/30"
                        loading="lazy"
                      />
                    </div>
                  ) : null,
              }}
            >
              {stripDollarSigns(resolvedContent)}
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
      })}

      {enhancement && <LessonEnhancementBlock data={enhancement} />}

      {content.keyPoints && content.keyPoints.length > 0 && (
        <section className="rounded-xl border border-border/40 bg-card/60 p-5">
          <div className="mb-4 flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-amber-500" />
            <h2 className="font-semibold text-foreground">Önemli Noktalar</h2>
          </div>
          <ul className="space-y-2">
            {content.keyPoints.map((point, index) => (
              <li key={`key-point-${index}`} className="flex items-start gap-3 text-sm text-foreground/80">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">
                  {index + 1}
                </span>
                <span>{stripMarkdown(point)}</span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
