import { useState } from "react";
import { useParams } from "react-router-dom";
import { getTopicContentsByCategory } from "@/data/topicContents";
import type { TopicDetailContent } from "@/data/navigationTopicContents";
import FluidMechanicsTopicsPage from "@/pages/FluidMechanicsTopicsPage";
import { buildLessonDeck } from "@/data/lessonSlides";
import { LessonSlidePlayer } from "@/components/lessons/LessonSlidePlayer";
import { LessonTextView } from "@/components/lessons/LessonTextView";
import { LessonModeToggle, type LessonViewMode } from "@/components/lessons/LessonModeToggle";

/**
 * Konu anlatımı — varsayılan olarak slayt/seslendirme ("video") akışı.
 *
 * Slaytlar `buildLessonDeck` ile mevcut ders içeriğinden üretilir; içerik
 * yeniden yazılmaz. Eski uzun metin görünümü "Metin olarak oku" ile korunur.
 */
export default function LessonTopicDetailPage() {
  const { categoryId, topicTitle } = useParams<{ categoryId: string; topicTitle: string }>();
  const decodedTitle = topicTitle ? decodeURIComponent(topicTitle) : "";
  const [mode, setMode] = useState<LessonViewMode>("slides");

  if (categoryId === "machine" && decodedTitle === "Akışkanlar Mekaniği") {
    return <FluidMechanicsTopicsPage />;
  }

  const fallbackContent: TopicDetailContent = {
    title: decodedTitle || "Konu Detayı",
    introduction: decodedTitle
      ? `${decodedTitle} konusuna ilişkin temel kavramlar, formüller ve uygulama örnekleri.`
      : "Konu detayı.",
    sections: [],
  };
  const categoryContents = getTopicContentsByCategory(categoryId);
  const content = categoryContents[decodedTitle] ?? fallbackContent;
  const deck = buildLessonDeck(categoryId, decodedTitle);

  if (!categoryId || !decodedTitle) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-muted-foreground">Konu bulunamadı</p>
      </div>
    );
  }

  const canShowSlides = !!deck && deck.slides.length > 0;
  const showSlides = canShowSlides && mode === "slides";

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-10 border-b border-border/40 bg-card/90 px-4 py-3 backdrop-blur sm:px-6 sm:py-4">
        <h1 className="text-base font-bold text-foreground sm:text-lg">{content.title}</h1>
      </div>

      <div className="mx-auto flex max-w-4xl flex-col gap-6 p-4 sm:p-6">
        {canShowSlides && <LessonModeToggle mode={mode} onChange={setMode} />}

        {showSlides ? (
          <LessonSlidePlayer deck={deck!} categoryId={categoryId} topicTitle={decodedTitle} />
        ) : (
          <LessonTextView content={content} categoryId={categoryId} topicTitle={decodedTitle} />
        )}
      </div>
    </div>
  );
}
