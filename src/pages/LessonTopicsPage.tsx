import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { calculationCategories } from "@/data/calculationCenterConfig";
import { getBetaCategories, getBetaModules } from "@/data/betaLessons";
import {
  BookOpen,
  ChevronDown,
  ChevronRight,
  FileText,
  GraduationCap,
  Layers3,
} from "lucide-react";

const levelLabel = {
  foundation: "Temel",
  operational: "Operasyonel",
  advanced: "İleri",
} as const;

export default function LessonTopicsPage() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const category = getBetaCategories().find((item) => item.key === categoryId);
  const categoryConfig = calculationCategories.find((item) => item.id === categoryId);
  const modules = getBetaModules(categoryId);
  const [expandedModules, setExpandedModules] = useState<string[]>(() =>
    modules[0] ? [modules[0].id] : [],
  );

  const totalTopics = useMemo(
    () => modules.reduce((sum, module) => sum + module.topicCount, 0),
    [modules],
  );

  if (!category || !categoryConfig) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-muted-foreground">Kategori bulunamadı</p>
      </div>
    );
  }

  const CategoryIcon = category.icon;
  const toggleModule = (moduleId: string) => {
    setExpandedModules((current) =>
      current.includes(moduleId)
        ? current.filter((id) => id !== moduleId)
        : [...current, moduleId],
    );
  };

  const topicLink = (topicId: string) =>
    `/lessons/${categoryId}/topics/${encodeURIComponent(topicId)}`;

  const quickLinks = categoryConfig.sections.filter(
    (section) => section.href && section.status !== "upcoming",
  );

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 px-4 py-8 pb-24 dark:from-[hsl(220,50%,6%)] dark:via-[hsl(220,50%,8%)] dark:to-[hsl(220,50%,10%)]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/4 h-48 w-48 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute right-10 top-10 h-56 w-56 rounded-full bg-indigo-500/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col gap-6">
        <header className="space-y-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground backdrop-blur">
            <GraduationCap className="h-4 w-4" />
            Yapılandırılmış Müfredat
          </div>
          <div className="flex items-center justify-center gap-3">
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${category.accent} text-white shadow-lg`}
            >
              <CategoryIcon className="h-6 w-6" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">{category.title}</h1>
          </div>
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <span className="rounded-full border border-border/60 bg-card/60 px-3 py-1">
              {modules.length} modül
            </span>
            <span className="rounded-full border border-border/60 bg-card/60 px-3 py-1">
              {totalTopics} konu
            </span>
          </div>
        </header>

        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <Layers3 className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">Ders Modülleri</h2>
          </div>

          {modules.map((module, moduleIndex) => {
            const expanded = expandedModules.includes(module.id);
            return (
              <article
                key={module.id}
                className="overflow-hidden rounded-2xl border border-border/50 bg-card/80 shadow-sm backdrop-blur"
              >
                <button
                  type="button"
                  onClick={() => toggleModule(module.id)}
                  className="flex w-full items-center gap-3 p-4 text-left transition-colors hover:bg-muted/40"
                  aria-expanded={expanded}
                >
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${category.accent} text-sm font-bold text-white`}
                  >
                    {moduleIndex + 1}
                  </span>
                  <span className="min-w-0 flex-1 font-semibold text-foreground">{module.title}</span>
                  <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">
                    {module.topicCount} konu
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform ${expanded ? "rotate-180" : ""}`}
                  />
                </button>

                {expanded && (
                  <div className="border-t border-border/40 bg-background/35 p-4">
                    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                      {module.topics.map((topic, topicIndex) => (
                        <Link
                          key={topic.id}
                          to={topicLink(topic.id)}
                          className="group flex min-h-16 items-center gap-3 rounded-xl border border-border/40 bg-card/70 px-3 py-2.5 transition-all hover:border-primary/40 hover:bg-card hover:shadow-sm"
                        >
                          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-[11px] font-bold text-primary">
                            {topicIndex + 1}
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block text-sm font-medium leading-snug text-foreground">
                              {topic.title}
                            </span>
                            <span className="mt-1 inline-flex rounded-full bg-muted/80 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-muted-foreground">
                              {levelLabel[topic.level]}
                            </span>
                          </span>
                          <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </section>

        {quickLinks.length > 0 && (
          <section className="rounded-2xl border border-border/50 bg-card/80 p-5 backdrop-blur">
            <div className="mb-4 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold text-foreground">Ders Araçları</h2>
            </div>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {quickLinks.map((section) => (
                <Link
                  key={section.id}
                  to={section.href!}
                  className="group flex items-center justify-between rounded-xl border border-border/40 bg-background/50 px-4 py-3 transition hover:border-primary/40 hover:bg-background"
                >
                  <span className="flex min-w-0 items-center gap-2">
                    <FileText className="h-4 w-4 shrink-0 text-primary" />
                    <span className="text-sm font-medium text-foreground">{section.label}</span>
                  </span>
                  <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
