import { useParams, Link } from "react-router-dom";
import { calculationCategories } from "@/data/calculationCenterConfig";
import { getBetaTopicTitles } from "@/data/betaLessons";
import { getLessonFlowsByTopic } from "@/data/lessonFlow";
import { getScenariosByTopic } from "@/data/scenarios";
import { BookOpen, ChevronRight, GraduationCap, Play, Ship, Sparkles } from "lucide-react";

/**
 * "Alıştırmalar" — bir kategorinin (güverte veya makine) konu listesi.
 * Rehberli (Duolingo) dersleri, senaryoları ve tüm konu anlatımlarını sunar.
 * İçerik mevcut veri kaynağından (read-only, normalize) gelir.
 */
export default function ExerciseTopicsPage() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const category = calculationCategories.find((c) => c.id === categoryId);
  const readingTitles = getBetaTopicTitles(categoryId);
  const flows = getLessonFlowsByTopic(categoryId);
  const flowTitles = new Set(flows.map((f) => f.topicTitle));
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
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-violet-50 via-indigo-50 to-blue-50 px-4 py-8 dark:from-[hsl(265,45%,7%)] dark:via-[hsl(245,45%,8%)] dark:to-[hsl(220,50%,10%)]">
      <div className="relative z-10 mx-auto flex max-w-3xl flex-col gap-6">
        <header className="space-y-3 text-center">
          <div className="flex items-center justify-center gap-3">
            <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${category.accent} text-white shadow-lg`}>
              <CategoryIcon className="h-6 w-6" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">{category.title}</h1>
          </div>
          <p className="text-sm text-muted-foreground">
            Rehberli ders, gerçek senaryolar ve AI eğitmen · {readingTitles.length} konu
          </p>
        </header>

        {/* Senaryolar */}
        {scenarios.length > 0 && (
          <Link
            to={`/exercises/${categoryId}/scenarios`}
            className="group flex items-center gap-3 rounded-2xl border border-rose-500/30 bg-rose-500/5 p-4 shadow-sm transition hover:border-rose-500/50 hover:bg-rose-500/10"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-rose-500 to-orange-500 text-white shadow">
              <Ship className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-foreground">Vardiya Senaryoları</p>
              <p className="text-xs text-muted-foreground">
                {scenarios.length} interaktif vaka · "ne yaparsın?" kararları
              </p>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
          </Link>
        )}

        {/* Rehberli dersler (Duolingo akışı yazılmış konular) */}
        {flows.length > 0 && (
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-violet-500" />
              <h2 className="text-lg font-semibold text-foreground">Rehberli Dersler (Anlat → Karışık Sor)</h2>
            </div>
            {flows.map((flow) => (
              <div
                key={flow.topicTitle}
                className="rounded-2xl border border-violet-500/25 bg-card/80 p-4 shadow-sm backdrop-blur"
              >
                <p className="font-semibold text-foreground">{flow.topicTitle}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Önce anlat → sonra {flow.questions.length} karışık soru
                </p>
                <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                  <Link
                    to={learnLink(flow.topicTitle)}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow transition hover:opacity-90"
                  >
                    <Play className="h-4 w-4" /> Öğrenmeye Başla
                  </Link>
                  <Link
                    to={detailLink(flow.topicTitle)}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-border bg-background/60 px-4 py-2.5 text-sm font-medium text-foreground transition hover:bg-muted"
                  >
                    <BookOpen className="h-4 w-4" /> Oku
                  </Link>
                </div>
              </div>
            ))}
          </section>
        )}

        {/* Tüm konu anlatımları (read-only içerik) */}
        {readingTitles.length > 0 ? (
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold text-foreground">Tüm Konu Anlatımları</h2>
              <span className="ml-auto text-xs text-muted-foreground">{readingTitles.length} başlık</span>
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              {readingTitles.map((title) => (
                <Link
                  key={title}
                  to={detailLink(title)}
                  className="group flex items-center gap-2 rounded-lg border border-border/40 bg-card/70 px-3 py-2.5 text-left text-sm transition-all hover:border-violet-400/40 hover:bg-card"
                >
                  <span className="flex-1 text-foreground/90">{title}</span>
                  {flowTitles.has(title) && (
                    <span className="rounded-full bg-violet-500/15 px-1.5 py-0.5 text-[9px] font-bold uppercase text-violet-600 dark:text-violet-300">
                      Rehberli
                    </span>
                  )}
                  <ChevronRight className="h-3.5 w-3.5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                </Link>
              ))}
            </div>
          </section>
        ) : (
          <p className="rounded-xl border border-border/40 bg-card/60 p-5 text-center text-sm text-muted-foreground">
            Bu kategori için konu anlatımı içeriği yakında eklenecek. Şimdilik klasik Dersler
            bölümündeki formül, hesaplama, kural ve quizleri kullanabilirsiniz.
          </p>
        )}

        <div className="flex justify-center pt-2">
          <Link
            to="/exercises"
            className="inline-flex items-center gap-2 rounded-full bg-card/60 px-4 py-2 text-xs text-muted-foreground backdrop-blur transition-colors hover:bg-card hover:text-foreground"
          >
            <GraduationCap className="h-4 w-4" /> Tüm Alıştırmalar
          </Link>
        </div>
      </div>
    </div>
  );
}
