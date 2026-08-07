import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CourseSectionTabs } from "@/components/curriculum/CourseSectionTabs";
import { getBetaCategories, getBetaModules } from "@/data/betaLessons";
import { getExerciseQuestionDistribution } from "@/data/exerciseQuestionDistribution";
import { getLessonFlowsByTopic } from "@/data/lessonFlow";
import {
  BookOpen,
  ChevronDown,
  ListChecks,
  Play,
  Sparkles,
} from "lucide-react";

export default function ExerciseTopicsPage() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const category = getBetaCategories().find((item) => item.key === categoryId);
  const modules = getBetaModules(categoryId);
  const flows = getLessonFlowsByTopic(categoryId);
  const flowTitles = new Set(flows.map((flow) => flow.topicTitle));
  const questionDistribution = getExerciseQuestionDistribution(categoryId);
  const [expandedModules, setExpandedModules] = useState<string[]>([]);

  if (!category) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-muted-foreground">Kategori bulunamadı</p>
      </div>
    );
  }

  const CategoryIcon = category.icon;
  const courseKey =
    category.group === "machine" ? category.key.replace("machine-", "") : category.key;
  const detailLink = (topicId: string) =>
    `/exercises/${categoryId}/topics/${encodeURIComponent(topicId)}`;
  const learnLink = (sourceTitle: string) =>
    `/exercises/${categoryId}/topics/${encodeURIComponent(sourceTitle)}/learn`;

  const toggleModule = (moduleId: string) => {
    setExpandedModules((current) =>
      current.includes(moduleId)
        ? current.filter((id) => id !== moduleId)
        : [...current, moduleId],
    );
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-violet-50 via-indigo-50 to-blue-50 px-4 py-8 pb-24 dark:from-[hsl(265,45%,7%)] dark:via-[hsl(245,45%,8%)] dark:to-[hsl(220,50%,10%)]">
      <div className="relative z-10 mx-auto flex max-w-5xl flex-col gap-6">
        <header className="text-center">
          <div className="flex items-center justify-center gap-3">
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${category.accent} text-white shadow-lg`}
            >
              <CategoryIcon className="h-6 w-6" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">{category.title}</h1>
          </div>
        </header>

        <CourseSectionTabs group={category.group} courseKey={courseKey} active="quiz" />

        <section className="space-y-3">
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
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform ${expanded ? "rotate-180" : ""}`}
                  />
                </button>

                {expanded && (
                  <div className="grid gap-2 border-t border-border/40 bg-background/35 p-4 sm:grid-cols-2">
                    {module.topics.map((topic) => {
                      const hasGuidedFlow = flowTitles.has(topic.sourceTitle);
                      const questionCount =
                        questionDistribution.questionsByTopic.get(topic.id)?.length ?? 0;
                      const actionColumns = hasGuidedFlow && questionCount > 0 ? "grid-cols-3" : "grid-cols-2";

                      return (
                        <div
                          key={topic.id}
                          className="rounded-xl border border-border/40 bg-card/70 p-3"
                        >
                          <div className="flex items-start gap-2">
                            <BookOpen className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-medium leading-snug text-foreground">
                                {topic.title}
                              </p>
                              <div className="mt-1 flex flex-wrap gap-1.5">
                                {hasGuidedFlow && (
                                  <span className="inline-flex items-center gap-1 rounded-full bg-violet-500/15 px-2 py-0.5 text-[9px] font-bold uppercase text-violet-600 dark:text-violet-300">
                                    <Sparkles className="h-2.5 w-2.5" /> Rehberli
                                  </span>
                                )}
                                {questionCount > 0 && (
                                  <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[9px] font-bold text-primary">
                                    <ListChecks className="h-2.5 w-2.5" /> {questionCount} soru
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className={`mt-3 grid ${actionColumns} gap-2`}>
                            <Link
                              to={detailLink(topic.id)}
                              className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-border bg-background/60 px-2 py-2 text-xs font-medium text-foreground transition hover:bg-muted"
                            >
                              <BookOpen className="h-3.5 w-3.5" /> Oku
                            </Link>

                            {questionCount > 0 && (
                              <Link
                                to={`${detailLink(topic.id)}#konu-sorulari`}
                                className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-violet-500/30 bg-violet-500/10 px-2 py-2 text-xs font-semibold text-violet-700 transition hover:bg-violet-500/15 dark:text-violet-300"
                              >
                                <ListChecks className="h-3.5 w-3.5" /> Sorular
                              </Link>
                            )}

                            {hasGuidedFlow ? (
                              <Link
                                to={learnLink(topic.sourceTitle)}
                                className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-gradient-to-r from-violet-500 to-indigo-600 px-2 py-2 text-xs font-semibold text-white transition hover:opacity-90"
                              >
                                <Play className="h-3.5 w-3.5" /> Başla
                              </Link>
                            ) : questionCount === 0 ? (
                              <span className="inline-flex items-center justify-center rounded-lg bg-muted/60 px-2 py-2 text-[10px] text-muted-foreground">
                                Okuma modu
                              </span>
                            ) : null}
                          </div>
                        </div>
                      );
                    })}
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
