import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getBetaCategories, getBetaModules } from "@/data/betaLessons";
import { CourseSectionTabs } from "@/components/curriculum/CourseSectionTabs";
import { ArrowLeft, ChevronDown, ChevronRight } from "lucide-react";

const levelLabel = {
  foundation: "Temel",
  operational: "Operasyonel",
  advanced: "İleri",
} as const;

export default function MachineCurriculumCoursePage() {
  const { topicSlug } = useParams<{ topicSlug: string }>();
  const categoryKey = topicSlug ? `machine-${topicSlug}` : undefined;
  const category = getBetaCategories().find((item) => item.key === categoryKey);
  const modules = getBetaModules(categoryKey);
  const [expandedModule, setExpandedModule] = useState<string | null>(null);

  if (!topicSlug || !category) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-muted-foreground">Konu bulunamadı</p>
      </div>
    );
  }

  const TopicIcon = category.icon;

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 px-4 py-8 pb-24 dark:from-[hsl(220,50%,6%)] dark:via-[hsl(220,50%,8%)] dark:to-[hsl(220,50%,10%)]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/4 h-48 w-48 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute right-10 top-10 h-56 w-56 rounded-full bg-indigo-500/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col gap-5">
        <header className="space-y-4">
          <Link
            to="/lessons?library=machine"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Makine Kitaplığı
          </Link>

          <div className="flex items-center gap-3">
            <div
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${category.accent} text-white shadow-lg`}
            >
              <TopicIcon className="h-6 w-6" />
            </div>
            <h1 className="text-2xl font-bold leading-tight text-foreground">{category.title}</h1>
          </div>

          <CourseSectionTabs group="machine" courseKey={topicSlug} active="topics" />
        </header>

        <section className="space-y-2">
          {modules.map((module, moduleIndex) => {
            const expanded = expandedModule === module.id;
            return (
              <article
                key={module.id}
                className="overflow-hidden rounded-2xl border border-border/60 bg-card/80 shadow-sm backdrop-blur"
              >
                <button
                  type="button"
                  onClick={() => setExpandedModule(expanded ? null : module.id)}
                  className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition hover:bg-muted/40"
                  aria-expanded={expanded}
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-xs font-bold text-primary">
                    {moduleIndex + 1}
                  </span>
                  <span className="min-w-0 flex-1 font-semibold text-foreground">{module.title}</span>
                  <span className="text-xs font-medium text-muted-foreground">{module.topicCount}</span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${expanded ? "rotate-180" : ""}`}
                  />
                </button>

                {expanded && (
                  <div className="grid gap-1 border-t border-border/40 bg-background/30 p-2 sm:grid-cols-2">
                    {module.topics.map((topic, topicIndex) => (
                      <Link
                        key={topic.id}
                        to={`/machine/${topicSlug}/topics/${encodeURIComponent(topic.id)}`}
                        className="group flex items-center gap-3 rounded-xl px-3 py-3 transition hover:bg-card"
                      >
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-muted text-[11px] font-bold text-muted-foreground">
                          {topicIndex + 1}
                        </span>
                        <span className="min-w-0 flex-1 text-sm font-medium leading-snug text-foreground">
                          {topic.title}
                        </span>
                        <span className="hidden text-[10px] font-semibold uppercase tracking-wide text-muted-foreground sm:inline">
                          {levelLabel[topic.level]}
                        </span>
                        <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
                      </Link>
                    ))}
                  </div>
                )}
              </article>
            );
          })}
        </section>
      </div>
    </div>
  );
}
