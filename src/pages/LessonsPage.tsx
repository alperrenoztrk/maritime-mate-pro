import type { CSSProperties } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { calculationCategories, sectionIconMap } from "@/data/calculationCenterConfig";
import { hasCourseTopic } from "@/data/courseContent";
import { ChevronDown, ChevronRight, GraduationCap, Ship, Wrench } from "lucide-react";
import { SEO } from "@/components/SEO";

const LESSONS_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "Mariner's Book — Denizcilik Dersleri",
  description:
    "Güverte ve makine dâhil interaktif denizcilik ders başlıkları; stabilite, yük, meteoroloji, seyir ve daha fazlası.",
  provider: {
    "@type": "Organization",
    name: "Mariner's Book",
    url: "https://nauticalleap.com/",
  },
};

export default function LessonsPage() {
  const highRefreshRateStyles: CSSProperties = {
    ["--frame-rate" as string]: "120",
    ["--animation-duration" as string]: "8.33ms",
    ["--transition-duration" as string]: "16.67ms",
  };
  const [expandedGroup, setExpandedGroup] = useState<"deck" | "machine" | null>(null);

  const deckCategories = calculationCategories.filter(
    (category) => !category.group || category.group === "deck"
  ).filter((category) => !(category.id as string).startsWith("machine-"));

  const machineCategories = calculationCategories.filter(
    (category) => category.group === "machine" || (category.id as string).startsWith("machine-")
  );

  const groups = [
    {
      id: "deck" as const,
      title: "Güverte",
      subtitle: "Gemi makineleri dışındaki tüm ders başlıkları",
      icon: Ship,
      accent: "from-blue-500 via-indigo-500 to-blue-600",
      categories: deckCategories,
    },
    {
      id: "machine" as const,
      title: "Makine",
      subtitle: "Gemi makineleri ve makina sistemleri",
      icon: Wrench,
      accent: "from-slate-600 via-zinc-600 to-slate-800",
      categories: machineCategories,
    },
  ];

  return (
    <div
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 px-4 pb-24 py-8 dark:from-[hsl(220,50%,6%)] dark:via-[hsl(220,50%,8%)] dark:to-[hsl(220,50%,10%)]"
      style={highRefreshRateStyles}
    >
      <SEO
        title="Mariner's Book — Denizcilik Dersleri"
        description="Güverte ve makine grupları için interaktif denizcilik ders başlıkları: stabilite, yük, meteoroloji, seyir, güvenlik ve daha fazlası."
        path="/lessons"
        jsonLd={LESSONS_JSONLD}
      />
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/4 h-48 w-48 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute top-10 right-10 h-56 w-56 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-sky-400/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-6">
        <header className="space-y-3 text-center">
          <h1 className="text-2xl font-bold text-foreground">Dersler</h1>
        </header>

        <div className="flex flex-col gap-6">
          {groups.map((group) => {
            const GroupIcon = group.icon;
            const isExpanded = expandedGroup === group.id;
            return (
              <section key={group.id} className="space-y-4">
                <button
                  type="button"
                  onClick={() => setExpandedGroup(isExpanded ? null : group.id)}
                  className="flex w-full items-center justify-between rounded-2xl border border-border/60 bg-card/80 px-4 py-4 text-left shadow-sm transition hover:border-primary/30 hover:bg-card"
                >
                  <span className="flex items-center gap-3">
                    <span
                      className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${group.accent} text-white shadow-lg`}
                    >
                      <GroupIcon className="h-5 w-5" />
                    </span>
                    <span className="flex flex-col">
                      <span className="text-lg font-bold text-foreground">{group.title}</span>
                    </span>
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 text-muted-foreground transition-transform ${isExpanded ? "rotate-180" : ""}`}
                  />
                </button>

                {isExpanded && (
                  <div className="flex flex-col gap-6">
                    {group.categories.map((category) => {
                      const CategoryIcon = category.icon;
                      // Extract slug for machine topics
                      const isMachineTopic = (category.id as string).startsWith("machine-");
                      const machineSlug = isMachineTopic ? (category.id as string).replace("machine-", "") : null;
                      // Birleşik tek-kaynak registry anahtarı (makine = slug, güverte = id)
                      const topicKey = isMachineTopic ? machineSlug : (category.id as string);

                      return (
                        <div key={category.id} className="space-y-3">
                          <div className="flex items-center gap-3">
                            <div
                              className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${category.accent} text-white shadow-lg`}
                            >
                              <CategoryIcon className="h-5 w-5" />
                            </div>
                            <div>
                              <h2 className="text-lg font-bold text-foreground">{category.title}</h2>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-6">
                            {/* Konu Anlatımı Butonu */}
                            <Link
                              to={isMachineTopic ? `/machine/${machineSlug}/topics` : `/lessons/${category.id}/topics`}
                              className="group flex flex-col items-center gap-2 rounded-xl border border-border/40 bg-card/80 p-3 backdrop-blur transition-all hover:border-primary/30 hover:bg-card hover:shadow-md"
                            >
                              <div
                                className={`flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br ${category.accent} text-white transition-transform group-hover:scale-110`}
                              >
                                <GraduationCap className="h-4 w-4" />
                              </div>
                              <span className="text-center text-xs font-medium text-foreground">Konu Anlatımı</span>
                              <ChevronRight className="h-3 w-3 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                            </Link>

                            {category.sections.map((section) => {
                              const SectionIcon = sectionIconMap[section.id];
                              // Konu tek kaynak registry'de ise Formüller/Hesaplamalar
                              // birleşik sayfalara yönlendirilir (tek tasarım + bağlı içerik).
                              const useUnified =
                                hasCourseTopic(topicKey ?? undefined) &&
                                (section.id === "formulas" ||
                                  section.id === "calculations" ||
                                  section.id === "rules" ||
                                  section.id === "quiz");
                              const sectionHref = useUnified
                                ? `/lessons/${topicKey}/${section.id}`
                                : section.href || "#";
                              return (
                                <Link
                                  key={`${category.id}-${section.id}`}
                                  to={sectionHref}
                                  className="group flex flex-col items-center gap-2 rounded-xl border border-border/40 bg-card/80 p-3 backdrop-blur transition-all hover:border-primary/30 hover:bg-card hover:shadow-md"
                                >
                                  <div
                                    className={`flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br ${category.accent} text-white transition-transform group-hover:scale-110`}
                                  >
                                    <SectionIcon className="h-4 w-4" />
                                  </div>
                                  <span className="text-center text-xs font-medium text-foreground">{section.label}</span>
                                  <ChevronRight className="h-3 w-3 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </section>
            );
          })}
        </div>


      </div>
    </div>
  );
}
