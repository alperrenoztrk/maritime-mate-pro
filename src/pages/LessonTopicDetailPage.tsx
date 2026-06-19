import { AlertTriangle, CheckCircle2, Lightbulb, Sigma } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { useParams } from "react-router-dom";
import { stripMarkdown, stripDollarSigns } from "@/utils/cleanText";
import { getTopicContentsByCategory } from "@/data/topicContents";
import type { TopicDetailContent } from "@/data/navigationTopicContents";
import FluidMechanicsTopicsPage from "@/pages/FluidMechanicsTopicsPage";
import { useTopicContentOverrides } from "@/hooks/useTopicContentOverrides";
import { buildSectionKey, type ContentCategory } from "@/services/topicContentOverrides";
import { resolveLessonImage } from "@/utils/lessonImageFallbacks";
import { getLessonTopicEnhancement, type LessonTopicEnhancement } from "@/data/lessonTopicEnhancements";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-muted-foreground">Konu bulunamadı</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-10 border-b border-border/40 bg-card/90 px-4 py-3 backdrop-blur sm:px-6 sm:py-4">
        <h1 className="text-base font-bold text-foreground sm:text-lg">{content.title}</h1>
      </div>

      <div className="mx-auto flex max-w-4xl flex-col gap-8 p-4 sm:p-6">
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
          <p className="text-sm leading-relaxed text-foreground/90">{stripMarkdown(content.introduction)}</p>
        </div>

        {content.sections.map((section, index) => {
          const categoryKey = (categoryId ?? "navigation") as ContentCategory;
          const overrideKey = buildSectionKey(categoryKey, decodedTitle || content.title, section.title);
          const override = overrides[overrideKey];
          const resolvedContent = override?.content || section.content;

          return (
            <section key={`${section.title}-${index}`} className="space-y-4">
              <h2 className="text-lg font-semibold text-foreground">{section.title}</h2>

              {section.image && (
                <div className="mx-auto max-w-md overflow-hidden rounded-xl border border-border/40">
                  <img
                    src={resolveLessonImage(categoryId, section.image, section.title, content.title, section.imageAlt)}
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
                  img: ({ src, alt }) => (
                    <div className="mx-auto max-w-md overflow-hidden rounded-xl border border-border/40">
                      <img
                        src={resolveLessonImage(categoryId, src, section.title, content.title, alt)}
                        alt={alt || section.title}
                        className="h-48 w-full object-contain bg-muted/30"
                        loading="lazy"
                      />
                    </div>
                  ),
                }}
              >
                {stripDollarSigns(resolvedContent)}
              </ReactMarkdown>

              {section.bulletPoints && section.bulletPoints.length > 0 && (
                <ul className="space-y-2 pl-1">
                  {section.bulletPoints.map((point, pointIndex) => (
                    <li key={`${section.title}-point-${pointIndex}`} className="flex items-start gap-3 text-sm text-foreground/80">
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

        {enhancement && <EnhancementBlock data={enhancement} />}

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
    </div>
  );
}

/* ───── Detaylı Anlatım Bloğu (personel modülüyle aynı dil) ───── */
function EnhancementBlock({ data }: { data: LessonTopicEnhancement }) {
  return (
    <div className="space-y-6">
      {/* Bölüm başlığı */}
      <div className="flex items-center gap-2 border-t border-border/40 pt-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow">
          <Sigma className="h-4 w-4" />
        </div>
        <div>
          <h2 className="text-base font-bold text-foreground">Detaylı Anlatım & Çözümlü Örnekler</h2>
          <p className="text-xs text-muted-foreground">
            Konunun adım-adım hesaplama yöntemi ve sayısal örnekler
          </p>
        </div>
      </div>

      {/* Derin anlatım */}
      {data.deepDive && (
        <div className="rounded-2xl border border-border/50 bg-card/80 p-5 shadow-md backdrop-blur">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-muted-foreground">
            Kavramsal Çerçeve
          </p>
          <p className="mt-2 text-sm leading-relaxed text-foreground/90">{data.deepDive}</p>
        </div>
      )}

      {/* Çekirdek formül */}
      {data.coreFormula && (
        <div className="rounded-xl border-2 border-primary/30 bg-primary/5 p-4 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Çekirdek Bağıntı</p>
          <p className="mt-2 font-mono text-sm font-semibold text-foreground">
            {data.coreFormula.text}
          </p>
          {data.coreFormula.description && (
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              {data.coreFormula.description}
            </p>
          )}
        </div>
      )}

      {/* Adımlar */}
      {data.steps && data.steps.length > 0 && (
        <div className="rounded-2xl border border-border/50 bg-card/80 p-4 shadow-md backdrop-blur">
          <div className="mb-3 flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow">
              <CheckCircle2 className="h-4 w-4" />
            </div>
            <h3 className="text-sm font-bold text-foreground">Hesaplama Adımları</h3>
          </div>
          <Accordion type="single" collapsible className="space-y-2">
            {data.steps.map((step, i) => (
              <AccordionItem
                key={i}
                value={`step-${i}`}
                className="rounded-xl border border-border/40 bg-background/80 px-4 data-[state=open]:bg-emerald-500/5"
              >
                <AccordionTrigger className="text-left text-sm font-semibold hover:no-underline">
                  <span className="flex items-center gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                      {i + 1}
                    </span>
                    <span className="text-foreground">{step.title}</span>
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="pl-10 text-sm leading-relaxed text-foreground/85">
                    {step.description}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      )}

      {/* Çözülmüş örnekler */}
      {data.workedExamples && data.workedExamples.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-sky-500 to-blue-600 text-white shadow">
              <Sigma className="h-4 w-4" />
            </div>
            <h3 className="text-sm font-bold text-foreground">
              Çözümlü Örnekler ({data.workedExamples.length})
            </h3>
          </div>

          {data.workedExamples.map((ex, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-2xl border border-sky-500/30 bg-sky-500/5 shadow-md"
            >
              <div className="bg-sky-500/10 px-4 py-3">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-sky-700 dark:text-sky-300">
                  Örnek {i + 1}
                </p>
                <p className="mt-1 text-sm font-semibold leading-relaxed text-foreground">
                  {ex.scenario}
                </p>
              </div>

              <div className="grid gap-4 p-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)]">
                {/* Verilenler */}
                <div className="rounded-lg border border-border/40 bg-background/60 p-3">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    Verilenler
                  </p>
                  <ul className="mt-2 space-y-1.5">
                    {ex.given.map((g, j) => (
                      <li key={j} className="text-xs text-foreground/85">
                        <span className="font-semibold text-foreground">{g.label}:</span>{" "}
                        <span className="font-mono">{g.value}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Çözüm adımları */}
                <div className="rounded-lg border border-border/40 bg-background/60 p-3">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    Çözüm
                  </p>
                  <ol className="mt-2 space-y-2">
                    {ex.solution.map((s, j) => (
                      <li key={j} className="text-xs leading-relaxed">
                        <p className="font-semibold text-foreground">
                          {j + 1}. {s.step}
                        </p>
                        {s.expression && (
                          <p className="ml-4 font-mono text-foreground/80">= {s.expression}</p>
                        )}
                        {s.result && (
                          <p className="ml-4 font-mono font-semibold text-emerald-700 dark:text-emerald-400">
                            → {s.result}
                          </p>
                        )}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

              <div className="border-t border-sky-500/20 bg-emerald-500/10 px-4 py-3">
                <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
                  Sonuç
                </p>
                <p className="mt-1 text-sm font-bold text-foreground">{ex.answer}</p>
                {ex.note && (
                  <p className="mt-1 text-xs italic text-muted-foreground">Not: {ex.note}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Yaygın hatalar */}
      {data.commonMistakes && data.commonMistakes.length > 0 && (
        <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-5 shadow-md">
          <div className="mb-3 flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500/20 text-amber-600 dark:text-amber-400">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-bold text-foreground">Yaygın Hatalar</h3>
          </div>
          <ul className="space-y-2">
            {data.commonMistakes.map((m, i) => (
              <li key={i} className="flex gap-3 text-sm">
                <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-500/20 text-xs font-bold text-amber-700 dark:text-amber-400">
                  ✗
                </span>
                <span className="leading-relaxed text-foreground/90">{m}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Kritik notlar */}
      {data.criticalNotes && data.criticalNotes.length > 0 && (
        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-5 shadow-md">
          <div className="mb-3 flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-bold text-foreground">Kritik Pratik Uyarılar</h3>
          </div>
          <ul className="space-y-2">
            {data.criticalNotes.map((n, i) => (
              <li key={i} className="flex gap-3 text-sm">
                <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-xs font-bold text-emerald-700 dark:text-emerald-400">
                  !
                </span>
                <span className="leading-relaxed text-foreground/90">{n}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
