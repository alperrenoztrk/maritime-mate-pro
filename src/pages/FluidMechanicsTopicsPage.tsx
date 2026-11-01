import { LegacyTopicBook } from "@/components/reader/LegacyTopicBook";
import { PageHeader } from "@/components/layout/PageHeader";
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
import { BodyPortal } from "@/components/layout/BodyPortal";
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
    title: "Fluid Properties and Pressure",
    icon: Gauge,
    subtopics: [
      { id: "fluid-definition", title: "Fluid definition and classification", hasContent: true },
      { id: "density-viscosity", title: "Density, specific gravity and viscosity", hasContent: true },
      { id: "pressure-pascal", title: "Pressure and Pascal's principle", hasContent: true },
      { id: "hydrostatic-pressure", title: "Hydrostatic pressure distribution", hasContent: true },
    ],
  },
  {
    id: "continuity",
    number: 2,
    title: "Continuity and Energy Equations",
    icon: Activity,
    subtopics: [
      { id: "continuity-equation", title: "Continuity equation (Q = A·V)", hasContent: true },
      { id: "bernoulli", title: "Bernoulli equation", hasContent: true },
      { id: "energy-losses", title: "Energy line and loss terms", hasContent: true },
    ],
  },
  {
    id: "flow-regimes",
    number: 3,
    title: "Flow Regimes and Reynolds",
    icon: Waves,
    subtopics: [
      { id: "laminar-turbulent", title: "Laminar and turbulent flow", hasContent: true },
      { id: "reynolds", title: "Reynolds number and critical values", hasContent: true },
      { id: "velocity-profile", title: "Speed profiles", hasContent: true },
    ],
  },
  {
    id: "pipe-flow",
    number: 4,
    title: "Pipe Flow and Losses",
    icon: Ruler,
    subtopics: [
      { id: "darcy-weisbach", title: "Darcy–Weisbach equation", hasContent: true },
      { id: "friction-factor", title: "Friction factor and Moody diagram", hasContent: true },
      { id: "minor-losses", title: "Local losses", hasContent: true },
    ],
  },
  {
    id: "pumps",
    number: 5,
    title: "Pump and System Curves",
    icon: Zap,
    subtopics: [
      { id: "pump-curves", title: "Pump characteristic curves", hasContent: true },
      { id: "npsh-cavitation", title: "NPSH and cavitation", hasContent: true },
      { id: "pump-power", title: "Pump power calculation", hasContent: true },
    ],
  },
  {
    id: "flow-measurement",
    number: 6,
    title: "Flow Measurement and Instrumentation",
    icon: BarChart3,
    subtopics: [
      { id: "venturi-orifice", title: "Venturi and orifice principle", hasContent: true },
      { id: "pitot", title: "Velocity measurement with Pitot tube", hasContent: true },
      { id: "meter-selection", title: "Flow meter selection", hasContent: true },
    ],
  },
  {
    id: "marine-applications",
    number: 7,
    title: "Marine Applications",
    icon: Anchor,
    subtopics: [
      { id: "ballast-bilge", title: "Ballast and bilge circuits", hasContent: true },
      { id: "cooling-circuits", title: "Cooling water circuits", hasContent: true },
      { id: "fire-main", title: "Fire line hydraulics", hasContent: true },
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

      <div className="relative z-10">
        <div className="mx-auto max-w-4xl px-4 py-3"><PageHeader title="Fluid Mechanics" /></div>

        <div data-reference-topics>
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
                  { title: "Engine Calculations", href: "/machine/calculations" },
                  { title: "Engine Formulas", href: "/machine/formulas" },
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
                Return to All Lessons
              </Link>
            </div>
          </div>
        </div>
      </div>

      <BodyPortal>
      <AnimatePresence>
        {selectedTopic && currentContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="app-content-overlay fixed inset-0 z-50 flex flex-col bg-background"
          >
            <div className="relative z-10 shrink-0 border-b border-border bg-background/95 pt-[var(--safe-top)]">
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

            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
      <LegacyTopicBook key={selectedTopic} topic={currentContent}
        storageKey={`mariners-book:reference:FluidMechanicsTopicsPage:${selectedTopic}`}
         />
    </div>
          </motion.div>
        )}
      </AnimatePresence>
      </BodyPortal>
    </div>
  );
}
