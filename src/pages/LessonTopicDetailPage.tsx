import ReactMarkdown from "react-markdown";
import { useParams } from "react-router-dom";
import { stripMarkdown, stripDollarSigns } from "@/utils/cleanText";
import { getTopicContentsByCategory } from "@/data/topicContents";
import type { TopicDetailContent } from "@/data/navigationTopicContents";
import FluidMechanicsTopicsPage from "@/pages/FluidMechanicsTopicsPage";
import { useTopicContentOverrides } from "@/hooks/useTopicContentOverrides";
import { buildSectionKey, type ContentCategory } from "@/services/topicContentOverrides";
import { resolveLessonImage } from "@/utils/lessonImageFallbacks";
import { getLessonTopicEnhancement } from "@/data/lessonTopicEnhancements";
import { LessonEnhancementBlock } from "@/components/lessons/LessonEnhancementBlock";
import { BookSheet } from "@/components/book/BookSheet";

export default function LessonTopicDetailPage() {
  const { categoryId, topicTitle } = useParams<{ categoryId: string; topicTitle: string }>();
  const decodedTitle = topicTitle ? decodeURIComponent(topicTitle) : "";
  const overrides = useTopicContentOverrides();
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
  const enhancement = getLessonTopicEnhancement(categoryId, decodedTitle);

  if (!categoryId || !decodedTitle) {
    return (
      <BookSheet title="DERSLER">
        <p className="bs-muted py-10 text-center text-sm italic">Konu bulunamadı</p>
      </BookSheet>
    );
  }

  return (
    <BookSheet title="DERSLER">
      <h1 className="bs-h2 text-center" style={{ borderBottom: "none" }}>{content.title}</h1>
      <div className="bs-fleuron" aria-hidden="true">❦</div>

      <div className="flex flex-col gap-5">
        <p className="bs-prose italic">{stripMarkdown(content.introduction)}</p>

        {content.sections.map((section, index) => {
          const categoryKey = (categoryId ?? "navigation") as ContentCategory;
          const overrideKey = buildSectionKey(categoryKey, decodedTitle || content.title, section.title);
          const override = overrides[overrideKey];
          const resolvedContent = override?.content || section.content;

          return (
            <section key={`${section.title}-${index}`} className="bs-prose">
              <h2 className="bs-h2">{section.title}</h2>

              {section.image && (
                <img
                  src={resolveLessonImage(categoryId, section.image, section.title, content.title, section.imageAlt)}
                  alt={section.imageAlt || section.title}
                  className="mx-auto h-48 w-auto max-w-full object-contain"
                  loading="lazy"
                />
              )}

              <ReactMarkdown
                components={{
                  img: ({ src, alt }) => (
                    <img
                      src={resolveLessonImage(categoryId, src, section.title, content.title, alt)}
                      alt={alt || section.title}
                      className="mx-auto h-48 w-auto max-w-full object-contain"
                      loading="lazy"
                    />
                  ),
                }}
              >
                {stripDollarSigns(resolvedContent)}
              </ReactMarkdown>

              {section.bulletPoints && section.bulletPoints.length > 0 && (
                <ul>
                  {section.bulletPoints.map((point, pointIndex) => (
                    <li key={`${section.title}-point-${pointIndex}`}>{stripMarkdown(point)}</li>
                  ))}
                </ul>
              )}

              {section.formula && (
                <div className="bs-formula">
                  <p className="font-semibold">{section.formula.text}</p>
                  <p className="bs-muted mt-1 text-xs">{section.formula.description}</p>
                </div>
              )}
            </section>
          );
        })}

        {enhancement && <LessonEnhancementBlock data={enhancement} />}

        {content.keyPoints && content.keyPoints.length > 0 && (
          <div className="bs-callout">
            <span className="bs-callout-label">Önemli Noktalar</span>
            <ol className="ml-4 list-decimal">
              {content.keyPoints.map((point, index) => (
                <li key={`key-point-${index}`} className="my-1">{stripMarkdown(point)}</li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </BookSheet>
  );
}

