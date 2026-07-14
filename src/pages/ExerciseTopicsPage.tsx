import { Link, useParams } from "react-router-dom";
import { calculationCategories } from "@/data/calculationCenterConfig";
import { getBetaTopicTitles } from "@/data/betaLessons";
import { getLessonFlowsByTopic } from "@/data/lessonFlow";
import { getScenariosByTopic } from "@/data/scenarios";
import { BookOpen, ChevronRight, Play, Ship } from "lucide-react";

/**
 * One compact topic list. A topic appears once and exposes only the study
 * modes that are actually available for it.
 */
export default function ExerciseTopicsPage() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const category = calculationCategories.find((item) => item.id === categoryId);
  const readingTitles = getBetaTopicTitles(categoryId);
  const flows = getLessonFlowsByTopic(categoryId);
  const guidedTitles = new Set(flows.map((flow) => flow.topicTitle));
  const topicTitles = Array.from(
    new Set([...readingTitles, ...flows.map((flow) => flow.topicTitle)]),
  );
  const scenarios = getScenariosByTopic(categoryId);

  if (!category) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-muted-foreground">Kategori bulunamadı</p>
      </div>
    );
  }

  const CategoryIcon = category.icon;
  const detailLink = (title: string) =>
    `/exercises/${categoryId}/topics/${encodeURIComponent(title)}`;
  const learnLink = (title: string) =>
    `/exercises/${categoryId}/topics/${encodeURIComponent(title)}/learn`;

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-violet-50 via-indigo-50 to-blue-50 px-4 pb-16 pt-8 dark:from-[hsl(265,45%,7%)] dark:via-[hsl(245,45%,8%)] dark:to-[hsl(220,50%,10%)]">
      <div className="relative z-10 mx-auto flex max-w-3xl flex-col gap-4">
        <header className="flex items-center justify-center gap-3 py-1">
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${category.accent} text-white shadow-md`}
          >
            <CategoryIcon className="h-5 w-5" />
          </div>
          <h1 className="text-xl font-bold text-foreground">{category.title}</h1>
        </header>

        <section
          aria-labelledby="study-modes"
          className="rounded-2xl border border-border/50 bg-card/75 p-3 shadow-sm backdrop-blur"
        >
          <h2
            id="study-modes"
            className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground"
          >
            Çalışma biçimi
          </h2>
          <div className={`grid gap-2 ${scenarios.length > 0 ? "grid-cols-3" : "grid-cols-2"}`}>
            <div className="rounded-xl bg-violet-500/10 px-2.5 py-2">
              <span className="flex items-center gap-1.5 text-xs font-bold text-violet-700 dark:text-violet-300">
                <Play className="h-3.5 w-3.5" /> Öğren
              </span>
              <span className="mt-0.5 block text-[10px] leading-tight text-muted-foreground">
                Adım adım
              </span>
            </div>
            <div className="rounded-xl bg-primary/10 px-2.5 py-2">
              <span className="flex items-center gap-1.5 text-xs font-bold text-primary">
                <BookOpen className="h-3.5 w-3.5" /> Oku
              </span>
              <span className="mt-0.5 block text-[10px] leading-tight text-muted-foreground">
                Tam anlatım
              </span>
            </div>
            {scenarios.length > 0 && (
              <Link
                to={`/exercises/${categoryId}/scenarios`}
                className="group rounded-xl bg-rose-500/10 px-2.5 py-2 transition hover:bg-rose-500/15"
              >
                <span className="flex items-center gap-1.5 text-xs font-bold text-rose-700 dark:text-rose-300">
                  <Ship className="h-3.5 w-3.5" /> Senoryolar
                </span>
                <span className="mt-0.5 flex items-center gap-0.5 text-[10px] leading-tight text-muted-foreground">
                  Karar ver
                  <ChevronRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            )}
          </div>
        </section>

        {topicTitles.length > 0 ? (
          <section aria-labelledby="exercise-topics" className="space-y-2">
            <div className="flex items-center gap-2 px-1">
              <h2 id="exercise-topics" className="text-sm font-semibold text-foreground">
                Konular
              </h2>
              <span className="ml-auto text-xs text-muted-foreground">
                {topicTitles.length} başlık
              </span>
            </div>

            <div className="overflow-hidden rounded-2xl border border-border/50 bg-card/75 shadow-sm backdrop-blur">
              {topicTitles.map((title, index) => {
                const hasGuidedFlow = guidedTitles.has(title);
                return (
                  <article
                    key={title}
                    className={
                      "flex items-center gap-3 px-3 py-2.5 " +
                      (index > 0 ? "border-t border-border/40" : "")
                    }
                  >
                    <span className="min-w-0 flex-1 text-sm font-medium leading-snug text-foreground/90">
                      {title}
                    </span>
                    <div className="flex shrink-0 items-center gap-1.5">
                      {hasGuidedFlow && (
                        <Link
                          to={learnLink(title)}
                          aria-label={`${title}: adım adım öğren`}
                          className="inline-flex h-8 items-center gap-1 rounded-lg bg-violet-600 px-2.5 text-xs font-semibold text-white transition hover:bg-violet-500 active:scale-95"
                        >
                          <Play className="h-3.5 w-3.5" />
                          Öğren
                        </Link>
                      )}
                      <Link
                        to={detailLink(title)}
                        aria-label={`${title}: tam anlatımı oku`}
                        className="inline-flex h-8 items-center gap-1 rounded-lg border border-border/60 bg-background/55 px-2.5 text-xs font-semibold text-foreground transition hover:bg-muted active:scale-95"
                      >
                        <BookOpen className="h-3.5 w-3.5" />
                        Oku
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        ) : (
          <p className="rounded-xl border border-border/40 bg-card/60 p-5 text-center text-sm text-muted-foreground">
            Bu kategori için alıştırma içeriği yakında eklenecek.
          </p>
        )}
      </div>
    </div>
  );
}

