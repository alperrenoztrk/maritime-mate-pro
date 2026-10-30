import { TopicLearningContext } from "@/components/curriculum/TopicLearningContext";
import { useState } from "react";
import { Lightbulb } from "lucide-react";
import { useParams } from "react-router-dom";
import { machineTopicBySlug } from "@/data/machineTopicData";
import { getBetaTopic } from "@/data/betaLessons";
import { ImageViewerModal } from "@/components/ui/ImageViewerModal";
import { getLessonTopicEnhancement } from "@/data/lessonTopicEnhancements";
import { LessonEnhancementBlock } from "@/components/lessons/LessonEnhancementBlock";
import { StructuredLessonText } from "@/components/lessons/StructuredLessonText";
import { LessonAITutor } from "@/components/lessons/LessonAITutor";
import { TopicGuidedLearningLink } from "@/components/lessons/TopicGuidedLearningLink";
import { buildLessonText } from "@/utils/lessonText";
import { MobileLayout } from "@/components/MobileLayout";
import { PagedReadingSurface, type ReadingPage } from "@/components/reader/PagedReadingSurface";
import { LessonImage } from "@/components/ui/LessonImage";

export default function MachineTopicDetailPage() {
  const [viewerImage, setViewerImage] = useState<string | null>(null);
  const [viewerAlt, setViewerAlt] = useState("");
  const { topicSlug, subTopicTitle } = useParams<{
    topicSlug: string;
    subTopicTitle: string;
  }>();
  const decodedTitleOrId = subTopicTitle ? decodeURIComponent(subTopicTitle) : "";
  const categoryKey = topicSlug ? `machine-${topicSlug}` : undefined;
  const topicConfig = topicSlug ? machineTopicBySlug[topicSlug] : null;
  const content = getBetaTopic(categoryKey, decodedTitleOrId);
  const enhancement = content
    ? getLessonTopicEnhancement("machine", content.sourceTitle ?? content.title)
    : undefined;

  if (!topicConfig || !content) {
    return (
      <MobileLayout>
      <div className="flex min-h-[60svh] items-center justify-center">
        <div className="space-y-3 text-center">
          <p className="text-muted-foreground">{decodedTitleOrId || "Topic detail"}</p>
        </div>
      </div>
      </MobileLayout>
    );
  }

  const TopicIcon = topicConfig.icon;
  const readingPages: ReadingPage[] = [
    {
      id: "overview",
      title: content.title,
      section: "Introduction",
      content: (
        <div className="space-y-5">
          <div className="flex items-center gap-2">
            <TopicIcon className="h-5 w-5 text-primary" />
            <span className="text-sm font-semibold">{topicConfig.title}</span>
            {content.level && <span className="ml-auto text-xs font-semibold uppercase text-muted-foreground">{content.level}</span>}
          </div>
          <TopicLearningContext categoryKey={categoryKey} topic={content} />
          {content.introduction && <p>{content.introduction}</p>}
          {categoryKey && <TopicGuidedLearningLink categoryKey={categoryKey} topic={content} />}
        </div>
      ),
    },
    ...content.sections.map((section, index) => ({
      id: section.id ?? `section-${index}`,
      title: section.title,
      section: `Engineering lesson · ${index + 1} / ${content.sections.length}`,
      content: (
        <section id={section.id} key={section.id ?? `${section.title}-${index}`} className="surface-2 space-y-4 rounded-2xl border p-5 shadow-elev-1">
            <h2 className="text-lg font-semibold text-foreground">{section.title}</h2>

            <StructuredLessonText text={section.content} />

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

            {section.example && (
              <div className="space-y-2 rounded-lg border border-blue-500/30 bg-blue-500/5 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-400">
                  Numerical Example
                </p>
                <p className="text-sm font-medium text-foreground/90">{section.example.problem}</p>
                {section.example.steps?.map((step, stepIndex) => (
                  <p
                    key={stepIndex}
                    className="border-l-2 border-blue-500/30 pl-2 text-sm text-foreground/80"
                  >
                    {step}
                  </p>
                ))}
                {(section.example.solution || section.example.result) && (
                  <p className="text-sm font-medium text-foreground/90">
                    {section.example.solution ?? section.example.result}
                  </p>
                )}
              </div>
            )}

            {section.table && (
              <div className="overflow-x-auto rounded-lg border border-border/40">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-muted/50">
                      {section.table.headers.map((header) => (
                        <th key={header} className="px-3 py-2 text-left font-semibold text-foreground">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {section.table.rows.map((row, rowIndex) => (
                      <tr key={rowIndex} className="border-t border-border/30">
                        {row.map((cell, cellIndex) => (
                          <td key={cellIndex} className="px-3 py-2 text-foreground/80">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {section.bulletPoints && section.bulletPoints.length > 0 && (
              <ul className="space-y-2 pl-1">
                {section.bulletPoints.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-sm text-foreground/80">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            )}

            {section.image && (
              <figure className="space-y-2">
                <div className="overflow-hidden rounded-xl border border-border/40 bg-muted/30">
                  <LessonImage
                    src={section.image}
                    alt={section.imageAlt ?? section.title}
                    className="mx-auto h-auto w-full max-w-2xl cursor-pointer object-contain p-2"
                    onClick={() => {
                      setViewerImage(section.image!);
                      setViewerAlt(section.imageAlt ?? section.title);
                    }}
                  />
                </div>
              </figure>
            )}
          </section>
      ),
    })),
  ];

  if (enhancement) {
    readingPages.push({
      id: "enhancements",
      title: "Practical applications",
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
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-primary"><Lightbulb className="h-5 w-5" /> Highlights</div>
          <ul className="list-disc space-y-3 pl-5">
            {content.keyPoints.map((point, index) => <li key={index}>{point}</li>)}
          </ul>
        </div>
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
    content: <TopicLearningContext categoryKey={categoryKey} topic={content} placement="after" />,
  });

  return (
    <MobileLayout>
      <PagedReadingSurface
        key={`${topicSlug}:${decodedTitleOrId}`}
        title={content.title}
        subtitle={topicConfig.title}
        pages={readingPages}
        storageKey={`mariners-book:machine-reader:${topicSlug}:${content.sourceTitle ?? content.title}`}
      />
      <ImageViewerModal
        src={viewerImage || ""}
        alt={viewerAlt}
        isOpen={Boolean(viewerImage)}
        onClose={() => setViewerImage(null)}
      />
    </MobileLayout>
  );
}
