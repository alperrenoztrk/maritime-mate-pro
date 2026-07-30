import type { CSSProperties } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { calculationCategories, sectionIconMap } from "@/data/calculationCenterConfig";
import { getBetaCategories } from "@/data/betaLessons";
import {
  competencyTracks,
  getCurriculumTopicById,
  type CurriculumTopicRef,
} from "@/data/curriculumHierarchy";
import { hasCourseTopic } from "@/data/courseContent";
import {
  ChevronDown,
  ChevronRight,
  GraduationCap,
  Layers3,
  Route,
  Ship,
  Wrench,
} from "lucide-react";
import { SEO } from "@/components/SEO";

const LESSONS_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "Mariner's Book — Denizcilik Dersleri",
  description:
    "Güverte ve makine için ders, modül, konu ve mesleki yeterlilik parkurlarıyla hazırlanmış operasyonel denizcilik eğitimi.",
  provider: {
    "@type": "Organization",
    name: "Mariner's Book",
    url: "https://nauticalleap.com/",
  },
};

const topicHref = (topic: CurriculumTopicRef) => {
  if (topic.sourceCategory.startsWith("machine-")) {
    const slug = topic.sourceCategory.replace("machine-", "");
    return `/machine/${slug}/topics/${encodeURIComponent(topic.id)}`;
  }
  return `/lessons/${topic.sourceCategory}/topics/${encodeURIComponent(topic.id)}`;
};

export default function LessonsPage() {
  const highRefreshRateStyles: CSSProperties = {
    ["--frame-rate" as string]: "120",
    ["--animation-duration" as string]: "8.33ms",
    ["--transition-duration" as string]: "16.67ms",
  };
  const [expandedGroup, setExpandedGroup] = useState<"deck" | "machine" | null>("deck");
  const [expandedTrack, setExpandedTrack] = useState<string | null>(null);
  const betaCategories = getBetaCategories();

  const groups = [
    {
      id: "deck" as const,
      title: "Güverte",
      icon: Ship,
      accent: "from-blue-500 via-indigo-500 to-blue-600",
      categories: betaCategories.filter((category) => category.group === "deck"),
    },
    {
      id: "machine" as const,
      title: "Makine",
      icon: Wrench,
      accent: "from-slate-600 via-zinc-600 to-slate-800",
      categories: betaCategories.filter((category) => category.group === "machine"),
    },
  ];

  return (
    <div
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 px-4 py-8 pb-24 dark:from-[hsl(220,50%,6%)] dark:via-[hsl(220,50%,8%)] dark:to-[hsl(220,50%,10%)]"
      style={highRefreshRateStyles}
    >
      <SEO
        title="Mariner's Book — Denizcilik Dersleri"
        description="Güverte ve makine için yapılandırılmış denizcilik müfredatı: dersler, modüller, mesleki yeterlilik parkurları, hesaplamalar ve alıştırmalar."
        path="/lessons"
        jsonLd={LESSONS_JSONLD}
      />

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/4 h-48 w-48 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute right-10 top-10 h-56 w-56 rounded-full bg-indigo-500/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-7">
        <header className="text-center">
          <h1 className="text-2xl font-bold text-foreground">Dersler</h1>
        </header>

        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <Route className="h-5 w-5 text-primary" />
            <h2 className="font-semibold text-foreground">Mesleki Yeterlilik Parkurları</h2>
          </div>

          <div className="grid gap-3 lg:grid-cols-2">
            {competencyTracks.map((track, trackIndex) => {
              const expanded = expandedTrack === track.id;
              const topics = track.topicIds
                .map((id) => getCurriculumTopicById(id))
                .filter((topic): topic is CurriculumTopicRef => Boolean(topic));
              return (
                <article
                  key={track.id}
                  className="overflow-hidden rounded-2xl border border-primary/20 bg-card/80 shadow-sm backdrop-blur"
                >
                  <button
                    type="button"
                    onClick={() => setExpandedTrack(expanded ? null : track.id)}
                    className="flex w-full items-center gap-3 p-4 text-left transition hover:bg-primary/5"
                    aria-expanded={expanded}
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-indigo-600 text-sm font-bold text-white">
                      {trackIndex + 1}
                    </span>
                    <span className="min-w-0 flex-1 font-semibold leading-snug text-foreground">
                      {track.title}
                    </span>
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                      {topics.length} konu
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${expanded ? "rotate-180" : ""}`}
                    />
                  </button>

                  {expanded && (
                    <div className="grid gap-2 border-t border-border/40 bg-background/35 p-3 sm:grid-cols-2">
                      {topics.map((topic) => (
                        <Link
                          key={topic.id}
                          to={topicHref(topic)}
                          className="group flex items-center gap-2 rounded-xl border border-border/40 bg-card/70 px-3 py-2.5 text-sm transition hover:border-primary/40 hover:bg-card"
                        >
                          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                          <span className="min-w-0 flex-1 leading-snug text-foreground/90">
                            {topic.title}
                          </span>
                          <ChevronRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                        </Link>
                      ))}
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </section>

        <div className="flex flex-col gap-6">
          {groups.map((group) => {
            const GroupIcon = group.icon;
            const isExpanded = expandedGroup === group.id;
            const groupTopicCount = group.categories.reduce(
              (total, category) => total + category.topicCount,
              0,
            );
            return (
              <section key={group.id} className="space-y-4">
                <button
                  type="button"
                  onClick={() => setExpandedGroup(isExpanded ? null : group.id)}
                  className="flex w-full items-center justify-between rounded-2xl border border-border/60 bg-card/80 px-4 py-4 text-left shadow-sm transition hover:border-primary/30 hover:bg-card"
                  aria-expanded={isExpanded}
                >
                  <span className="flex items-center gap-3">
                    <span
                      className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${group.accent} text-white shadow-lg`}
                    >
                      <GroupIcon className="h-5 w-5" />
                    </span>
                    <span className="text-lg font-bold text-foreground">{group.title}</span>
                  </span>
                  <span className="flex items-center gap-3">
                    <span className="hidden rounded-full bg-muted px-2.5 py-1 text-[10px] font-semibold text-muted-foreground sm:inline-flex">
                      {group.categories.length} ders · {groupTopicCount} konu
                    </span>
                    <ChevronDown
                      className={`h-5 w-5 text-muted-foreground transition-transform ${isExpanded ? "rotate-180" : ""}`}
                    />
                  </span>
                </button>

                {isExpanded && (
                  <div className="grid gap-5 lg:grid-cols-2">
                    {group.categories.map((category) => {
                      const config = calculationCategories.find((item) => item.id === category.key);
                      if (!config) return null;
                      const CategoryIcon = category.icon;
                      const isMachineTopic = category.key.startsWith("machine-");
                      const machineSlug = isMachineTopic
                        ? category.key.replace("machine-", "")
                        : null;
                      const topicKey = isMachineTopic ? machineSlug : category.key;
                      const curriculumHref = isMachineTopic
                        ? `/machine/${machineSlug}/topics`
                        : `/lessons/${category.key}/topics`;

                      return (
                        <article
                          key={category.key}
                          className="rounded-2xl border border-border/50 bg-card/75 p-4 shadow-sm backdrop-blur"
                        >
                          <div className="flex items-start gap-3">
                            <div
                              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${category.accent} text-white shadow-lg`}
                            >
                              <CategoryIcon className="h-5 w-5" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <h2 className="font-bold leading-snug text-foreground">{category.title}</h2>
                              <div className="mt-2 flex flex-wrap gap-1.5">
                                <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                                  <Layers3 className="h-3 w-3" /> {category.moduleCount} modül
                                </span>
                                <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">
                                  {category.topicCount} konu
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-6">
                            <Link
                              to={curriculumHref}
                              className="group col-span-3 flex items-center justify-center gap-2 rounded-xl border border-primary/25 bg-primary/5 p-3 transition hover:border-primary/45 hover:bg-primary/10 sm:col-span-2"
                            >
                              <GraduationCap className="h-4 w-4 text-primary" />
                              <span className="text-xs font-semibold text-foreground">Müfredat</span>
                              <ChevronRight className="h-3.5 w-3.5 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                            </Link>

                            {config.sections.map((section) => {
                              const SectionIcon = sectionIconMap[section.id];
                              const useUnified =
                                hasCourseTopic(topicKey ?? undefined) &&
                                ["formulas", "calculations", "rules", "quiz"].includes(section.id);
                              const sectionHref = useUnified
                                ? `/lessons/${topicKey}/${section.id}`
                                : section.href;
                              const disabled = !sectionHref;
                              return disabled ? (
                                <div
                                  key={`${category.key}-${section.id}`}
                                  className="flex flex-col items-center justify-center gap-1.5 rounded-xl border border-border/30 bg-muted/30 p-2.5 opacity-60"
                                >
                                  <SectionIcon className="h-4 w-4 text-muted-foreground" />
                                  <span className="text-center text-[10px] text-muted-foreground">
                                    {section.label}
                                  </span>
                                </div>
                              ) : (
                                <Link
                                  key={`${category.key}-${section.id}`}
                                  to={sectionHref}
                                  className="group flex flex-col items-center justify-center gap-1.5 rounded-xl border border-border/40 bg-background/45 p-2.5 transition hover:border-primary/35 hover:bg-background"
                                >
                                  <SectionIcon className="h-4 w-4 text-primary" />
                                  <span className="text-center text-[10px] font-medium text-foreground">
                                    {section.label}
                                  </span>
                                </Link>
                              );
                            })}
                          </div>
                        </article>
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
