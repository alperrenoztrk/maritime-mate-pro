import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getBetaCategories, getBetaModules } from "@/data/betaLessons";
import { getTopicQuiz } from "@/data/courseContent/quiz";
import { getLessonFlowsByTopic } from "@/data/lessonFlow";
import { getScenariosByTopic } from "@/data/scenarios";
import {
  BookOpen,
  ChevronDown,
  ChevronRight,
  Layers3,
  ListChecks,
  Play,
  Ship,
  Sparkles,
} from "lucide-react";

const toCourseKey = (categoryId?: string) =>
  categoryId?.startsWith("machine-") ? categoryId.replace("machine-", "") : categoryId;

export default function ExerciseTopicsPage() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const category = getBetaCategories().find((item) => item.key === categoryId);
  const modules = getBetaModules(categoryId);
  const flows = getLessonFlowsByTopic(categoryId);
  const flowTitles = new Set(flows.map((flow) => flow.topicTitle));
  const scenarios = getScenariosByTopic(categoryId);
  const quizQuestions = getTopicQuiz(toCourseKey(categoryId));
  const [expandedModules, setExpandedModules] = useState<string[]>(() =>
    modules[0] ? [modules[0].id] : [],
  );

  if (!category) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-muted-foreground">Kategori bulunamadı</p>
      </div>
    );
  }

  const CategoryIcon = category.icon;
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

        {quizQuestions.length > 0 && (
          <Link
            to={`/exercises/${categoryId}/quiz`}
            className="group flex items-center gap-3 rounded-2xl border border-violet-500/30 bg-violet-500/5 p-4 shadow-sm transition hover:border-violet-500/50 hover:bg-violet-500/10"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 text-white shadow">
              <ListChecks className="h-5 w-5" />
            </div>
            <p className="flex-1 font-bold text-foreground">Quiz Soruları</p>
            <span className="rounded-full bg-violet-500/15 px-2.5 py-1 text-xs font-semibold text-violet-700 dark:text-violet-300">
              {quizQuestions.length} soru
            </span>
            <ChevronRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
          </Link>
        )}

        {scenarios.length > 0 && (
          <Link
            to={`/exercises/${categoryId}/scenarios`}
            className="group flex items-center gap-3 rounded-2xl border border-rose-500/30 bg-rose-500/5 p-4 shadow-sm transition hover:border-rose-500/50 hover:bg-rose-500/10"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-rose-500 to-orange-500 text-white shadow">
              <Ship className="h-5 w-5" />
            </div>
            <p className="flex-1 font-bold text-foreground">Vardiya ve Operasyon Senaryoları</p>
            <ChevronRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
          </Link>
        )}

        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <Layers3 className="h-5 w-5 text-violet-500" />
            <h2 className="text-lg font-semibold text-foreground">Modül Bazlı Alıştırmalar</h2>
            <span className="ml-auto text-xs text-muted-foreground">
              {category.moduleCount} modül · {category.topicCount} konu
            </span>
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
                    {module.topicCount}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform ${expanded ? "rotate-180" : ""}`}
                  />
                </button>

                {expanded && (
                  <div className="grid gap-2 border-t border-border/40 bg-background/35 p-4 sm:grid-cols-2">
                    {module.topics.map((topic) => {
                      const hasGuidedFlow = flowTitles.has(topic.sourceTitle);
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
                              {hasGuidedFlow && (
                                <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-violet-500/15 px-2 py-0.5 text-[9px] font-bold uppercase text-violet-600 dark:text-violet-300">
                                  <Sparkles className="h-2.5 w-2.5" /> Rehberli
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="mt-3 grid grid-cols-2 gap-2">
                            <Link
                              to={detailLink(topic.id)}
                              className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-border bg-background/60 px-3 py-2 text-xs font-medium text-foreground transition hover:bg-muted"
                            >
                              <BookOpen className="h-3.5 w-3.5" /> Oku
                            </Link>
                            {hasGuidedFlow ? (
                              <Link
                                to={learnLink(topic.sourceTitle)}
                                className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-gradient-to-r from-violet-500 to-indigo-600 px-3 py-2 text-xs font-semibold text-white transition hover:opacity-90"
                              >
                                <Play className="h-3.5 w-3.5" /> Başla
                              </Link>
                            ) : (
                              <span className="inline-flex items-center justify-center rounded-lg bg-muted/60 px-3 py-2 text-[10px] text-muted-foreground">
                                Okuma modu
                              </span>
                            )}
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
