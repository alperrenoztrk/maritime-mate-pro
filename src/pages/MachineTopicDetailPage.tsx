import { useState } from "react";
import { Lightbulb } from "lucide-react";
import { useParams } from "react-router-dom";
import { machineTopicBySlug } from "@/data/machineTopicData";
import { getBetaTopic } from "@/data/betaLessons";
import { ImageViewerModal } from "@/components/ui/ImageViewerModal";
import { getLessonTopicEnhancement } from "@/data/lessonTopicEnhancements";
import { LessonEnhancementBlock } from "@/components/lessons/LessonEnhancementBlock";
import { StructuredLessonText } from "@/components/lessons/StructuredLessonText";

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
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="space-y-3 text-center">
          <p className="text-muted-foreground">{decodedTitleOrId || "Konu detayı"}</p>
        </div>
      </div>
    );
  }

  const TopicIcon = topicConfig.icon;

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-10 border-b border-border/40 bg-card/90 px-4 py-3 backdrop-blur sm:px-6 sm:py-4">
        <h1 className="line-clamp-1 text-sm font-bold text-foreground sm:text-base">
          {content.title}
        </h1>
      </div>

      <div className="mx-auto flex max-w-4xl flex-col gap-8 p-4 sm:p-6">
        <div className="flex items-center gap-2">
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br ${topicConfig.accent} text-white`}
          >
            <TopicIcon className="h-4 w-4" />
          </div>
          <span className="text-xs font-medium text-muted-foreground">{topicConfig.title}</span>
          {content.level && (
            <span className="ml-auto rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase text-primary">
              {content.level === "foundation"
                ? "Temel"
                : content.level === "operational"
                  ? "Operasyonel"
                  : "İleri"}
            </span>
          )}
        </div>

        {content.introduction && (
          <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
            <p className="text-sm leading-relaxed text-foreground/90">{content.introduction}</p>
          </div>
        )}

        {content.sections.map((section, index) => (
          <section key={section.id ?? `${section.title}-${index}`} className="space-y-4">
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
                  Sayısal Örnek
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
                  <img
                    src={section.image}
                    alt={section.imageAlt ?? section.title}
                    className="mx-auto h-auto w-full max-w-2xl cursor-pointer object-contain p-2"
                    loading="lazy"
                    onClick={() => {
                      setViewerImage(section.image!);
                      setViewerAlt(section.imageAlt ?? section.title);
                    }}
                  />
                </div>
              </figure>
            )}
          </section>
        ))}

        {enhancement && <LessonEnhancementBlock data={enhancement} />}

        {content.keyPoints && content.keyPoints.length > 0 && (
          <section className="rounded-xl border border-border/40 bg-card/60 p-5">
            <div className="mb-4 flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-amber-500" />
              <h2 className="font-semibold text-foreground">Önemli Noktalar</h2>
            </div>
            <ul className="space-y-2">
              {content.keyPoints.map((point, index) => (
                <li key={point} className="flex items-start gap-3 text-sm text-foreground/80">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">
                    {index + 1}
                  </span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>

      <ImageViewerModal
        src={viewerImage || ""}
        alt={viewerAlt}
        isOpen={Boolean(viewerImage)}
        onClose={() => setViewerImage(null)}
      />
    </div>
  );
}
