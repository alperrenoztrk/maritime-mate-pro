import { Lightbulb } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { useParams } from "react-router-dom";
import { stripMarkdown, stripDollarSigns } from "@/utils/cleanText";
import { getBetaTopic, type BetaTopic } from "@/data/betaLessons";
import FluidMechanicsTopicsPage from "@/pages/FluidMechanicsTopicsPage";
import { useTopicContentOverrides } from "@/hooks/useTopicContentOverrides";
import { buildSectionKey, type ContentCategory } from "@/services/topicContentOverrides";
import { normalizeLessonMarkdownImages, resolveLessonImage } from "@/utils/lessonImageFallbacks";
import { getLessonTopicEnhancement } from "@/data/lessonTopicEnhancements";
import { LessonEnhancementBlock } from "@/components/lessons/LessonEnhancementBlock";

export default function LessonTopicDetailPage() {
  const { categoryId, topicTitle } = useParams<{
    categoryId: string;
    topicTitle: string;
  }>();
  const decodedTitleOrId = topicTitle ? decodeURIComponent(topicTitle) : "";
  const overrides = useTopicContentOverrides();

  if (categoryId === "machine" && decodedTitleOrId === "Akışkanlar Mekaniği") {
    return <FluidMechanicsTopicsPage />;
  }

  const fallbackContent: BetaTopic = {
    title: decodedTitleOrId || "Konu Detayı",
    sourceTitle: decodedTitleOrId,
    introduction: decodedTitleOrId
      ? `${decodedTitleOrId} konusuna ilişkin temel kavramlar, formüller ve uygulama örnekleri.`
      : "Konu detayı.",
    sections: [],
  };
  const content = getBetaTopic(categoryId, decodedTitleOrId) ?? fallbackContent;
  const sourceTopicTitle = content.sourceTitle ?? content.title;
  const enhancement = getLessonTopicEnhancement(categoryId, sourceTopicTitle);

  if (!categoryId || !decodedTitleOrId) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-muted-foreground">Konu bulunamadı</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-10 border-b border-border/40 bg-card/90 px-4 py-3 backdrop-blur sm:px-6 sm:py-4">
        <div className="mx-auto flex max-w-4xl items-center gap-3">
          <h1 className="min-w-0 flex-1 text-base font-bold text-foreground sm:text-lg">
            {content.title}
          </h1>
          {content.level && (
            <span className="shrink-0 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase text-primary">
              {content.level === "foundation"
                ? "Temel"
                : content.level === "operational"
                  ? "Operasyonel"
                  : "İleri"}
            </span>
          )}
        </div>
      </div>

      <div className="mx-auto flex max-w-4xl flex-col gap-8 p-4 sm:p-6">
        {content.introduction && (
          <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
            <p className="text-sm leading-relaxed text-foreground/90">
              {stripMarkdown(content.introduction)}
            </p>
          </div>
        )}

        {content.sections.map((section, index) => {
          const categoryKey = (categoryId ?? "navigation") as ContentCategory;
          const sourceSectionTitle = section.sourceTitle ?? section.title;
          const overrideKey = buildSectionKey(categoryKey, sourceTopicTitle, sourceSectionTitle);
          const override = overrides[overrideKey];
          const sectionImage = resolveLessonImage(
            categoryId,
            section.image,
            sourceSectionTitle,
            sourceTopicTitle,
            section.imageAlt,
          );
          const resolvedContent = normalizeLessonMarkdownImages(
            override?.content || section.content,
            categoryId,
            sourceSectionTitle,
            sourceTopicTitle,
            sectionImage ? [sectionImage] : [],
          );

          return (
            <section key={section.id ?? `${sourceSectionTitle}-${index}`} className="space-y-4">
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
                {stripDollarSigns(resolvedContent)}
              </ReactMarkdown>

              {section.bulletPoints && section.bulletPoints.length > 0 && (
                <ul className="space-y-2 pl-1">
                  {section.bulletPoints.map((point, pointIndex) => (
                    <li
                      key={`${sourceSectionTitle}-point-${pointIndex}`}
                      className="flex items-start gap-3 text-sm text-foreground/80"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
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
                    <p className="mt-2 text-xs text-muted-foreground">
                      {section.formula.description}
                    </p>
                  )}
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
                <li
                  key={`key-point-${index}`}
                  className="flex items-start gap-3 text-sm text-foreground/80"
                >
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
    </div>
  );
}
