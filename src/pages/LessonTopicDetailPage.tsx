import { ArrowLeft, Lightbulb } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { stripMarkdown } from "@/utils/cleanText";
import { getBetaCategories, getBetaTopic, type BetaTopic } from "@/data/betaLessons";
import FluidMechanicsTopicsPage from "@/pages/FluidMechanicsTopicsPage";
import { useTopicContentOverrides } from "@/hooks/useTopicContentOverrides";
import { buildSectionKey, type ContentCategory } from "@/services/topicContentOverrides";
import { resolveLessonImage } from "@/utils/lessonImageFallbacks";
import { getLessonTopicEnhancement } from "@/data/lessonTopicEnhancements";
import { LessonEnhancementBlock } from "@/components/lessons/LessonEnhancementBlock";
import { LessonTeachCard } from "@/components/lessons/LessonTeachCard";

const levelLabel = (level: BetaTopic["level"]) =>
  level === "foundation" ? "Temel" : level === "operational" ? "Operasyonel" : "İleri";

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
  const category = getBetaCategories().find((item) => item.key === categoryId);
  const CategoryIcon = category?.icon;

  if (!categoryId || !decodedTitleOrId) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-muted-foreground">Konu bulunamadı</p>
      </div>
    );
  }

  const categoryKey = categoryId as ContentCategory;

  // Aynı görselin konu boyunca tekrar tekrar basılmasını engelle: görsel
  // yalnız ilk göründüğü bölümde gösterilir.
  const seenImages = new Set<string>();
  const sections = content.sections.map((section) => {
    const sourceSectionTitle = section.sourceTitle ?? section.title;
    const override = overrides[buildSectionKey(categoryKey, sourceTopicTitle, sourceSectionTitle)];
    const resolved = resolveLessonImage(
      categoryId,
      section.image,
      sourceSectionTitle,
      sourceTopicTitle,
      section.imageAlt,
    );
    const duplicate = Boolean(resolved && seenImages.has(resolved));
    if (resolved) seenImages.add(resolved);

    return {
      section: override?.content ? { ...section, content: override.content } : section,
      hideImage: duplicate,
    };
  });

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 pb-24 dark:from-[hsl(220,50%,6%)] dark:via-[hsl(220,50%,8%)] dark:to-[hsl(220,50%,10%)]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/4 h-48 w-48 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute right-10 top-10 h-56 w-56 rounded-full bg-indigo-500/10 blur-3xl" />
      </div>

      <div className="sticky top-0 z-20 border-b border-border/40 bg-background/80 px-4 py-3 backdrop-blur sm:px-6">
        <div className="mx-auto flex max-w-4xl items-center gap-3">
          <h1 className="min-w-0 flex-1 text-base font-bold leading-tight text-foreground sm:text-lg">
            {content.title}
          </h1>
          {content.level && (
            <span className="shrink-0 rounded-full bg-primary/10 px-2 py-0.5 text-micro font-semibold uppercase text-primary">
              {levelLabel(content.level)}
            </span>
          )}
        </div>
      </div>

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col gap-5 p-4 sm:p-6">
        {/* Back is global (AppNavBar + edge swipe) — no per-page duplicate. */}


        {content.introduction && (
          <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
            <p className="text-sm leading-relaxed text-foreground/90">
              {stripMarkdown(content.introduction)}
            </p>
          </div>
        )}

        {sections.map(({ section, hideImage }, index) => (
          <div
            key={section.id ?? `${section.sourceTitle ?? section.title}-${index}`}
            className="rounded-2xl border border-border/40 bg-card/70 p-5 shadow-sm backdrop-blur-sm"
          >
            <LessonTeachCard
              section={section}
              categoryId={categoryId}
              topicTitle={sourceTopicTitle}
              hideImage={hideImage}
            />
          </div>
        ))}

        {enhancement && <LessonEnhancementBlock data={enhancement} />}

        {content.keyPoints && content.keyPoints.length > 0 && (
          <section className="rounded-2xl border border-border/40 bg-card/70 p-5 shadow-sm backdrop-blur-sm">
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
