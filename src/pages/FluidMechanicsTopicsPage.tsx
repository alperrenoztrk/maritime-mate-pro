import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  Anchor,
  BarChart3,
  BookOpen,
  ChevronRight,
  FileText,
  Gauge,
  Lightbulb,
  Ruler,
  Waves,
  X,
  Zap,
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { fluidMechanicsTopicContents } from "@/data/fluidMechanicsContent";
import type { FluidTopicContent } from "@/data/fluidMechanicsContent";
import { useArticleBackGuard } from "@/hooks/useArticleBackGuard";
import { StructuredLessonText } from "@/components/lessons/StructuredLessonText";

interface FluidSubTopic {
  id: string;
  title: string;
  hasContent: boolean;
}

interface FluidMainTopic {
  id: string;
  number: number;
  title: string;
  icon: React.ElementType;
  subtopics: FluidSubTopic[];
}

const fluidMechanicsTopics: FluidMainTopic[] = [
  {
    id: "basics",
    number: 1,
    title: "Akışkan Özellikleri ve Basınç",
    icon: Gauge,
    subtopics: [
      { id: "fluid-definition", title: "Akışkan tanımı ve sınıflandırma", hasContent: true },
      { id: "density-viscosity", title: "Yoğunluk, özgül ağırlık ve viskozite", hasContent: true },
      { id: "pressure-pascal", title: "Basınç ve Pascal prensibi", hasContent: true },
      { id: "hydrostatic-pressure", title: "Hidrostatik basınç dağılımı", hasContent: true },
    ],
  },
  {
    id: "continuity",
    number: 2,
    title: "Süreklilik ve Enerji Denklemleri",
    icon: Activity,
    subtopics: [
      { id: "continuity-equation", title: "Continuity equation (Q = A·V)", hasContent: true },
      { id: "bernoulli", title: "Bernoulli denklemi", hasContent: true },
      { id: "energy-losses", title: "Enerji çizgisi ve kayıp terimleri", hasContent: true },
    ],
  },
  {
    id: "flow-regimes",
    number: 3,
    title: "Akış Rejimleri ve Reynolds",
    icon: Waves,
    subtopics: [
      { id: "laminar-turbulent", title: "Laminer ve türbülanslı akış", hasContent: true },
      { id: "reynolds", title: "Reynolds sayısı ve kritik değerler", hasContent: true },
      { id: "velocity-profile", title: "Hız profilleri", hasContent: true },
    ],
  },
  {
    id: "pipe-flow",
    number: 4,
    title: "Boru Akışı ve Kayıplar",
    icon: Ruler,
    subtopics: [
      { id: "darcy-weisbach", title: "Darcy–Weisbach eşitliği", hasContent: true },
      { id: "friction-factor", title: "Sürtünme faktörü ve Moody diyagramı", hasContent: true },
      { id: "minor-losses", title: "Lokal kayıplar", hasContent: true },
    ],
  },
  {
    id: "pumps",
    number: 5,
    title: "Pompa ve Sistem Eğrileri",
    icon: Zap,
    subtopics: [
      { id: "pump-curves", title: "Pompa karakteristik eğrileri", hasContent: true },
      { id: "npsh-cavitation", title: "NPSH ve kavitasyon", hasContent: true },
      { id: "pump-power", title: "Pompa güç hesabı", hasContent: true },
    ],
  },
  {
    id: "flow-measurement",
    number: 6,
    title: "Debi Ölçümü ve Enstrümantasyon",
    icon: BarChart3,
    subtopics: [
      { id: "venturi-orifice", title: "Venturi ve orifis prensibi", hasContent: true },
      { id: "pitot", title: "Pitot tüpü ile hız ölçümü", hasContent: true },
      { id: "meter-selection", title: "Debi ölçer seçimi", hasContent: true },
    ],
  },
  {
    id: "marine-applications",
    number: 7,
    title: "Denizcilik Uygulamaları",
    icon: Anchor,
    subtopics: [
      { id: "ballast-bilge", title: "Balast ve sintine devreleri", hasContent: true },
      { id: "cooling-circuits", title: "Soğutma suyu devreleri", hasContent: true },
      { id: "fire-main", title: "Yangın hattı hidrolikleri", hasContent: true },
    ],
  },
];

const topicContents = fluidMechanicsTopicContents;

export default function FluidMechanicsTopicsPage() {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  const handleSubtopicClick = (subtopicId: string, hasContent: boolean) => {
    if (hasContent && topicContents[subtopicId]) {
      setSelectedTopic(subtopicId);
    }
  };

  const closeModal = () => {
    setSelectedTopic(null);
  };

  const currentContent = selectedTopic ? topicContents[selectedTopic] : null;

  // Back tuşu açık bir yazıyı asla kapatmaz: konu anlatımı ekrandayken
  // geri tuşu yutulur, yazı ancak kendi kapatma düğmesiyle kapanır.
  useArticleBackGuard(Boolean(currentContent));


  return (
    <div
      className="relative min-h-screen overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/4 h-48 w-48 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute top-10 right-10 h-56 w-56 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-sky-400/10 blur-3xl" />
      </div>

      <div className="relative z-10">
        <div className="relative z-40 border-b border-border bg-background/95">
          <div className="px-4 py-4">
            <div className="mx-auto flex max-w-4xl items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg">
                <Waves className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Akışkanlar Mekaniği</h1>
              </div>
            </div>
          </div>
        </div>

        <ScrollArea className="h-[calc(100vh-80px)]">
          <div className="mx-auto max-w-4xl space-y-4 p-4 pb-20">
            <Accordion type="single" collapsible className="space-y-2">
              {fluidMechanicsTopics.map((topic) => {
                return (
                  <AccordionItem
                    key={topic.id}
                    value={topic.id}
                    className="overflow-hidden rounded-xl border border-border/40 bg-card/80"
                  >
                    <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-muted/50">
                      <div className="flex items-center gap-3 text-left">
                        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 font-bold text-white">
                          {topic.number}
                        </span>
                        <span className="text-sm font-semibold text-foreground leading-tight">
                          {topic.title}
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4">
                      <div className="mt-2 space-y-1">
                        {topic.subtopics.map((subtopic) => (
                          <motion.button
                            key={subtopic.id}
                            onClick={() => handleSubtopicClick(subtopic.id, subtopic.hasContent)}
                            className={`flex w-full items-center gap-3 rounded-lg p-3 text-left transition-colors ${
                              subtopic.hasContent && topicContents[subtopic.id]
                                ? "cursor-pointer hover:bg-primary/5"
                                : "cursor-not-allowed opacity-50"
                            }`}
                            whileTap={subtopic.hasContent && topicContents[subtopic.id] ? { scale: 0.98 } : {}}
                          >
                            <span className="text-sm text-foreground">{subtopic.title}</span>
                            {subtopic.hasContent && topicContents[subtopic.id] && (
                              <ChevronRight className="ml-auto h-4 w-4 text-muted-foreground" />
                            )}
                          </motion.button>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>

            <section className="mt-6 rounded-2xl border border-border/40 bg-card/80 p-6">
              <div className="mb-4 flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-semibold text-foreground">Quick Access</h2>
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                {[
                  { title: "Machine Calculations", href: "/machine/calculations" },
                  { title: "Machine Formulas", href: "/machine/formulas" },
                ].map((resource) => (
                  <Link
                    key={resource.href}
                    to={resource.href}
                    className="group flex items-center justify-between rounded-lg border border-border/40 bg-background/50 px-4 py-3 transition-[background-color,color,border-color,box-shadow,opacity,transform,width] hover:border-primary/40 hover:bg-background"
                  >
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium text-foreground">{resource.title}</span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                  </Link>
                ))}
              </div>
            </section>

            <div className="flex justify-center pt-2">
              <Link
                to="/lessons"
                className="inline-flex items-center gap-2 rounded-full bg-card/60 px-4 py-2 text-xs text-muted-foreground transition-colors hover:bg-card hover:text-foreground"
              >
                <BookOpen className="h-4 w-4" />
                Tüm Derslere Dön
              </Link>
            </div>
          </div>
        </ScrollArea>
      </div>

      <AnimatePresence>
        {selectedTopic && currentContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background"
          >
            <div className="relative z-10 border-b border-border bg-background/95">
              <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3">
                <h2 className="truncate pr-4 text-lg font-bold text-foreground">
                  {currentContent.title}
                </h2>
                <button
                  onClick={closeModal}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-muted"
                >
                  <X className="h-5 w-5 text-foreground" />
                </button>
              </div>
            </div>

            <ScrollArea className="h-[calc(100vh-60px)]">
              <div className="mx-auto max-w-4xl space-y-6 p-4 pb-20">
                <div className="rounded-xl border-l-4 border-primary bg-primary/5 p-4">
                  <p className="font-medium leading-relaxed text-foreground">
                    {currentContent.introduction}
                  </p>
                </div>

                <StructuredLessonText text={currentContent.content} />

                {currentContent.bulletPoints && currentContent.bulletPoints.length > 0 && (
                  <div className="space-y-2 rounded-xl bg-muted/50 p-4">
                    <h3 className="mb-3 font-semibold text-foreground">Önemli Noktalar</h3>
                    {currentContent.bulletPoints.map((point, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-primary" />
                        <span className="text-sm text-foreground">{point}</span>
                      </div>
                    ))}
                  </div>
                )}

                {currentContent.formula && (
                  <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-amber-600" />
                      <h3 className="font-semibold text-amber-700 dark:text-amber-400">
                        {currentContent.formula.name}
                      </h3>
                    </div>
                    <div className="mt-2 font-mono text-sm text-amber-700 dark:text-amber-400">
                      {currentContent.formula.expression}
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">
                      {currentContent.formula.description}
                    </p>
                  </div>
                )}

                {currentContent.keyPoints && currentContent.keyPoints.length > 0 && (
                  <div className="rounded-xl border border-border/40 bg-card/60 p-4">
                    <h3 className="mb-3 font-semibold text-foreground">Notes</h3>
                    <div className="space-y-2">
                      {currentContent.keyPoints.map((point, index) => (
                        <div key={index} className="flex items-start gap-3 text-sm text-foreground/80">
                          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">
                            {index + 1}
                          </span>
                          <span>{point}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
