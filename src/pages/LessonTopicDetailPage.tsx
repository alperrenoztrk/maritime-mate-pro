import { TopicLearningContext } from "@/components/curriculum/TopicLearningContext";
import { Lightbulb } from "lucide-react";
import { PagedReadingSurface, type ReadingPage } from "@/components/reader/PagedReadingSurface";
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
import { LessonAITutor } from "@/components/lessons/LessonAITutor";
import { TopicGuidedLearningLink } from "@/components/lessons/TopicGuidedLearningLink";
import { buildLessonText } from "@/utils/lessonText";
import { MobileLayout } from "@/components/MobileLayout";


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

  const readingPages: ReadingPage[] = [
    {
      id: "overview",
      title: content.title,
      section: "Introduction",
      content: (
        <div className="space-y-5">
          <TopicLearningContext categoryKey={categoryId} topic={content} />
          {content.introduction && (
            <p className="text-base leading-relaxed">{stripMarkdown(content.introduction)}</p>
          )}
          <TopicGuidedLearningLink categoryKey={categoryId} topic={content} />
        </div>
      ),
    },
    ...sections.map(({ section, hideImage, alreadyUsedImages }, index) => ({
      id: section.id ?? `section-${index}`,
      title: section.title,
      section: `Lesson · ${index + 1} / ${sections.length}`,
      content: (
        <LessonTeachCard
          section={section}
          categoryId={categoryId}
          topicTitle={sourceTopicTitle}
          hideImage={hideImage}
          alreadyUsedImages={alreadyUsedImages}
        />
      ),
    })),
  ];

  if (enhancement) {
    readingPages.push({
      id: "enhancements",
      title: "Practical learning & applications",
      section: "Learning",
      content: <LessonEnhancementBlock data={enhancement} />,
    });
  }
  if (content.keyPoints?.length) {
    readingPages.push({
      id: "highlights",
      title: "Key points",
      section: "Review",
      content: (
        <section className="space-y-3">
          <div className="flex items-center gap-2 text-primary">
            <Lightbulb className="h-5 w-5" /><span className="text-sm font-semibold">Highlights</span>
          </div>
          <ol className="list-inside list-decimal space-y-3">
            {content.keyPoints.map((point, index) => (
              <li key={index}>{stripMarkdown(point)}</li>
            ))}
          </ol>
        </section>
      ),
    });
  }
  if (content.sections.length > 0) {
    readingPages.push({
      id: "ai-tutor",
      title: "Ask about this lesson",
      section: "Practice",
      content: <LessonAITutor topicTitle={content.title} lessonText={buildLessonText(content)} />,
    });
  }
  readingPages.push({
    id: "next-step",
    title: "Continue learning",
    section: "Review",
    content: <TopicLearningContext categoryKey={categoryId} topic={content} placement="after" />,
  });

  return (
    <MobileLayout>
      <PagedReadingSurface
        key={`${categoryId}:${sourceTopicTitle}`}
        title={content.title}
        subtitle={category?.title ?? categoryId}
        pages={readingPages}
        storageKey={`mariners-book:lesson-page:${categoryId}:${sourceTopicTitle}`}
      />
    </MobileLayout>
  );
}
