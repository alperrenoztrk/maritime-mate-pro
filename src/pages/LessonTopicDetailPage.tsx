import { Lightbulb } from "lucide-react";
import { useParams } from "react-router-dom";
import { stripMarkdown } from "@/utils/cleanText";
import { getBetaCategories, getBetaTopic, type BetaTopic } from "@/data/betaLessons";
import FluidMechanicsTopicsPage from "@/pages/FluidMechanicsTopicsPage";
import { useTopicContentOverrides } from "@/hooks/useTopicContentOverrides";
import { buildSectionKey, type ContentCategory } from "@/services/topicContentOverrides";
import {
  collectLessonMarkdownImages,
  lessonImageIdentity,
  resolveLessonImage,
} from "@/utils/lessonImageFallbacks";
import { getLessonTopicEnhancement } from "@/data/lessonTopicEnhancements";
import { LessonEnhancementBlock } from "@/components/lessons/LessonEnhancementBlock";
import { LessonTeachCard } from "@/components/lessons/LessonTeachCard";
import { MobileLayout } from "@/components/MobileLayout";
import { PageHeader } from "@/components/layout/PageHeader";


export default function LessonTopicDetailPage() {
  const { categoryId, topicTitle } = useParams<{
    categoryId: string;
    topicTitle: string;
  }>();
  const decodedTitleOrId = topicTitle ? decodeURIComponent(topicTitle) : "";
  const overrides = useTopicContentOverrides();

  if (categoryId === "machine" && decodedTitleOrId === "Fluid Mechanics") {
    return <FluidMechanicsTopicsPage />;
  }

  const fallbackContent: BetaTopic = {
    title: decodedTitleOrId || "Topic Detail",
    sourceTitle: decodedTitleOrId,
    introduction: decodedTitleOrId
      ? `${decodedTitleOrId} key concepts, formulas and worked examples.`
      : "Topic detail.",
    sections: [],
  };
  const content = getBetaTopic(categoryId, decodedTitleOrId) ?? fallbackContent;
  const sourceTopicTitle = content.sourceTitle ?? content.title;
  const enhancement = getLessonTopicEnhancement(categoryId, sourceTopicTitle);
  const category = getBetaCategories().find((item) => item.key === categoryId);
  const CategoryIcon = category?.icon;

  if (!categoryId || !decodedTitleOrId) {
    return (
      <MobileLayout>
        <div className="flex min-h-[60svh] items-center justify-center">
          <p className="text-muted-foreground">Topic not found</p>
        </div>
      </MobileLayout>
    );
  }

  const categoryKey = categoryId as ContentCategory;

  // Aynı görselin konu boyunca tekrar tekrar basılmasını engelle: görsel
  // yalnız ilk göründüğü bölümde gösterilir. Bu, hem bölüm görselini hem de
  // metin içindeki markdown görsellerini kapsar — bazı konularda (ör. Mercator
  // projeksiyonu) aynı diyagram her bölümde yeniden çözümlenip basılıyordu.
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
    const duplicate = Boolean(resolved && seenImages.has(lessonImageIdentity(resolved)));
    // Bu bölüm çizilmeden ÖNCE kullanılmış olanların anlık kopyası.
    const alreadyUsedImages = [...seenImages];
    if (resolved) seenImages.add(lessonImageIdentity(resolved));

    const body = override?.content ?? section.content;
    if (body) {
      for (const src of collectLessonMarkdownImages(
        body,
        categoryId,
        sourceSectionTitle,
        sourceTopicTitle,
      )) {
        seenImages.add(lessonImageIdentity(src));
      }
    }

    return {
      section: override?.content ? { ...section, content: override.content } : section,
      hideImage: duplicate,
      alreadyUsedImages,
    };
  });

  return (
    <MobileLayout>
      <div className="mx-auto flex max-w-4xl flex-col gap-5 pb-24">
        <PageHeader title={content.title} icon={CategoryIcon} />

        {content.introduction && (
          <div className="surface-1 rounded-xl border border-primary/20 p-5">
            <p className="text-base leading-relaxed text-foreground/90">
              {stripMarkdown(content.introduction)}
            </p>
          </div>
        )}

        {sections.map(({ section, hideImage, alreadyUsedImages }, index) => (
          <div
            key={section.id ?? `${section.sourceTitle ?? section.title}-${index}`}
            className="surface-2 rounded-2xl border p-5 shadow-elev-1"
          >
            <LessonTeachCard
              section={section}
              categoryId={categoryId}
              topicTitle={sourceTopicTitle}
              hideImage={hideImage}
              alreadyUsedImages={alreadyUsedImages}
            />
          </div>
        ))}

        {enhancement && <LessonEnhancementBlock data={enhancement} />}

        {content.keyPoints && content.keyPoints.length > 0 && (
          <section className="surface-2 rounded-2xl border p-5 shadow-elev-1">
            <div className="mb-4 flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-amber-500" />
              <h2 className="font-semibold text-foreground">Önemli Noktalar</h2>
            </div>
            <ul className="space-y-2">
              {content.keyPoints.map((point, index) => (
                <li
                  key={`key-point-${index}`}
                  className="flex items-start gap-3 text-base text-foreground/80"
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
    </MobileLayout>
  );
}
