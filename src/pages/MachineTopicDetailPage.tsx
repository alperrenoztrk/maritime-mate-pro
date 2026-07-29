import { useState } from "react";
import { Lightbulb } from "lucide-react";
import { useParams } from "react-router-dom";
import { machineTopicBySlug } from "@/data/machineTopicData";
import { getMachineSubTopicContent, MachineSubTopicContent } from "@/data/machineTopicDetailContent";
import { ImageViewerModal } from "@/components/ui/ImageViewerModal";
import { getLessonTopicEnhancement } from "@/data/lessonTopicEnhancements";
import { LessonEnhancementBlock } from "@/components/lessons/LessonEnhancementBlock";
import { buildLessonDeck } from "@/data/lessonSlides";
import { LessonSlidePlayer } from "@/components/lessons/LessonSlidePlayer";
import { LessonModeToggle, type LessonViewMode } from "@/components/lessons/LessonModeToggle";

/**
 * Makine konu detayı — varsayılan görünüm slayt/seslendirme ("video") akışı.
 *
 * Slaytlar `buildLessonDeck` ile `betaLessons` normalize katmanından üretilir
 * (kategori anahtarı `machine-${slug}`), böylece 16 makine konusu da güverte
 * dersleriyle aynı oynatıcıyı kullanır. Eski metin görünümü korunur.
 */
export default function MachineTopicDetailPage() {
  const [viewerImage, setViewerImage] = useState<string | null>(null);
  const [viewerAlt, setViewerAlt] = useState("");
  const [mode, setMode] = useState<LessonViewMode>("slides");
  const { topicSlug, subTopicTitle } = useParams<{ topicSlug: string; subTopicTitle: string }>();
  const decodedTitle = subTopicTitle ? decodeURIComponent(subTopicTitle) : "";
  const topicConfig = topicSlug ? machineTopicBySlug[topicSlug] : null;
  const content = topicSlug ? getMachineSubTopicContent(topicSlug, decodedTitle) : null;
  const enhancement = getLessonTopicEnhancement("machine", decodedTitle);
  const machineCategoryKey = topicSlug ? `machine-${topicSlug}` : undefined;
  const deck = buildLessonDeck(machineCategoryKey, decodedTitle);

  if (!topicConfig || !content) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center space-y-3">
          <p className="text-muted-foreground">{decodedTitle || "Konu detayı"}</p>
        </div>
      </div>
    );
  }

  const TopicIcon = topicConfig.icon;
  const canShowSlides = !!deck && deck.slides.length > 0;
  const showSlides = canShowSlides && mode === "slides";

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 border-b border-border/40 bg-card/90 px-4 py-3 backdrop-blur sm:px-6 sm:py-4">
        <h1 className="text-sm font-bold text-foreground sm:text-base line-clamp-1">
          {content.title}
        </h1>
      </div>

      <div className="mx-auto flex max-w-4xl flex-col gap-8 p-4 sm:p-6">
        {/* Topic badge */}
        <div className="flex items-center gap-2">
          <div className={`flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br ${topicConfig.accent} text-white`}>
            <TopicIcon className="h-4 w-4" />
          </div>
          <span className="text-xs font-medium text-muted-foreground">{topicConfig.title}</span>
        </div>

        {canShowSlides && <LessonModeToggle mode={mode} onChange={setMode} />}

        {showSlides && machineCategoryKey && (
          <LessonSlidePlayer
            deck={deck!}
            categoryId={machineCategoryKey}
            topicTitle={decodedTitle}
          />
        )}

        {/* Introduction — slayt modunda anlatım oynatıcıda olduğu için gizlenir */}
        {!showSlides && (
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
          <p className="text-sm leading-relaxed text-foreground/90">{content.introduction}</p>
        </div>
        )}

        {/* Sections */}
        {!showSlides && content.sections.map((section, index) => (
          <section key={index} className="space-y-4">
            <h2 className="text-lg font-semibold text-foreground">{section.heading}</h2>

            {section.paragraphs.map((para, pIndex) => (
              <p key={pIndex} className="text-sm leading-relaxed text-foreground/80">{para}</p>
            ))}

            {section.formula && (
              <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
                <p className="font-mono text-sm font-medium text-amber-700 dark:text-amber-400">
                  {section.formula.expression}
                </p>
                {section.formula.variables && (
                  <div className="mt-2 space-y-1">
                    {section.formula.variables.map((v, vi) => (
                      <p key={vi} className="text-xs text-muted-foreground">{v}</p>
                    ))}
                  </div>
                )}
              </div>
            )}

            {section.example && (
              <div className="rounded-lg border border-blue-500/30 bg-blue-500/5 p-4 space-y-2">
                <p className="text-xs font-semibold text-blue-700 dark:text-blue-400 uppercase tracking-wide">
                  Sayısal Örnek
                </p>
                <p className="text-sm font-medium text-foreground/90">{section.example.problem}</p>
                {section.example.steps.map((step, si) => (
                  <p key={si} className="text-sm text-foreground/80 pl-2 border-l-2 border-blue-500/30">{step}</p>
                ))}
                <p className="text-sm font-medium text-foreground/90">{section.example.result}</p>
              </div>
            )}

            {section.table && (
              <div className="overflow-x-auto rounded-lg border border-border/40">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-muted/50">
                      {section.table.headers.map((h, hi) => (
                        <th key={hi} className="px-3 py-2 text-left font-semibold text-foreground">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {section.table.rows.map((row, ri) => (
                      <tr key={ri} className="border-t border-border/30">
                        {row.map((cell, ci) => (
                          <td key={ci} className="px-3 py-2 text-foreground/80">{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {section.bulletPoints && section.bulletPoints.length > 0 && (
              <ul className="space-y-2 pl-1">
                {section.bulletPoints.map((point, pi) => (
                  <li key={pi} className="flex items-start gap-3 text-sm text-foreground/80">
                    <div className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            )}

            {section.diagram && (
              <figure className="space-y-2">
                <div className="overflow-hidden rounded-xl border border-border/40 bg-muted/30">
                  <img
                    src={section.diagram.src}
                    alt={section.diagram.alt}
                    className="mx-auto h-auto w-full max-w-2xl object-contain p-2"
                    loading="lazy"
                    onClick={() => {
                      setViewerImage(section.diagram!.src);
                      setViewerAlt(section.diagram!.alt);
                    }}
                    style={{ cursor: 'pointer' }}
                  />
                </div>
                {section.diagram.caption && (
                  <figcaption className="text-center text-xs text-muted-foreground italic">
                    {section.diagram.caption}
                  </figcaption>
                )}
              </figure>
            )}
          </section>
        ))}

        {!showSlides && enhancement && <LessonEnhancementBlock data={enhancement} />}

        {/* Key Points */}
        {!showSlides && content.keyPoints && content.keyPoints.length > 0 && (
          <section className="rounded-xl border border-border/40 bg-card/60 p-5">
            <div className="mb-4 flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-amber-500" />
              <h2 className="font-semibold text-foreground">Önemli Noktalar</h2>
            </div>
            <ul className="space-y-2">
              {content.keyPoints.map((point, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-foreground/80">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">
                    {i + 1}
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
        isOpen={!!viewerImage}
        onClose={() => setViewerImage(null)}
      />
    </div>
  );
}
