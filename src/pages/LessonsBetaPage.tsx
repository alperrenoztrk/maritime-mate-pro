import { Link } from "react-router-dom";
import { calculationCategories } from "@/data/calculationCenterConfig";
import { getLessonFlowsByTopic } from "@/data/lessonFlow";
import { hasScenarios } from "@/data/scenarios";
import { ChevronRight, FlaskConical, GraduationCap, Sparkles } from "lucide-react";

/**
 * "Dersler Beta" giriş sayfası.
 *
 * Orijinal `LessonsPage`'in beta muadili: aynı kategori verisini kullanır ama
 * beta route'larına yönlendirir ve yeni deneyimi (Duolingo akışı, senaryolar,
 * AI eğitmen) tanıtır. Pilot: yalnızca Seyir aktiftir.
 */
export default function LessonsBetaPage() {
  const deckCategories = calculationCategories.filter(
    (category) =>
      (!category.group || category.group === "deck") &&
      !(category.id as string).startsWith("machine-"),
  );

  const isEnabled = (categoryId: string) =>
    getLessonFlowsByTopic(categoryId).length > 0 || hasScenarios(categoryId);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-violet-50 via-indigo-50 to-blue-50 px-4 pb-24 pt-8 dark:from-[hsl(265,45%,7%)] dark:via-[hsl(245,45%,8%)] dark:to-[hsl(220,50%,10%)]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/4 h-48 w-48 rounded-full bg-violet-500/10 blur-3xl" />
        <div className="absolute top-10 right-10 h-56 w-56 rounded-full bg-indigo-500/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-3xl flex-col gap-6">
        <header className="space-y-3 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-card/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-violet-600 backdrop-blur dark:text-violet-300">
            <FlaskConical className="h-3.5 w-3.5" /> Beta
          </div>
          <h1 className="text-2xl font-bold text-foreground">Dersler Beta</h1>
          <p className="mx-auto max-w-xl text-sm text-muted-foreground">
            Önce anlat, sonra karışık sor (Duolingo tarzı) · gerçek vardiya senaryoları ·
            sana özel AI eğitmen. Okuldan daha iyi öğrenmen için.
          </p>
        </header>

        <div className="flex flex-col gap-3">
          {deckCategories.map((category) => {
            const CategoryIcon = category.icon;
            const enabled = isEnabled(category.id);
            const flowCount = getLessonFlowsByTopic(category.id).length;

            const inner = (
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${category.accent} text-white shadow-lg`}
                >
                  <CategoryIcon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-foreground">{category.title}</span>
                    {enabled ? (
                      <span className="rounded-full bg-violet-500/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-violet-600 dark:text-violet-300">
                        Hazır
                      </span>
                    ) : (
                      <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                        Yakında
                      </span>
                    )}
                  </div>
                  {enabled && (
                    <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Sparkles className="h-3 w-3" /> {flowCount} rehberli ders · senaryolar · AI eğitmen
                    </span>
                  )}
                </div>
                {enabled && <ChevronRight className="h-5 w-5 text-muted-foreground" />}
              </div>
            );

            return enabled ? (
              <Link
                key={category.id}
                to={`/lessons-beta/${category.id}/topics`}
                className="rounded-2xl border border-border/60 bg-card/80 p-4 shadow-sm backdrop-blur transition hover:border-violet-400/40 hover:bg-card"
              >
                {inner}
              </Link>
            ) : (
              <div
                key={category.id}
                className="cursor-not-allowed rounded-2xl border border-border/40 bg-card/50 p-4 opacity-70"
              >
                {inner}
              </div>
            );
          })}
        </div>

        <div className="flex justify-center pt-2">
          <Link
            to="/lessons"
            className="inline-flex items-center gap-2 rounded-full bg-card/60 px-4 py-2 text-xs text-muted-foreground backdrop-blur transition-colors hover:bg-card hover:text-foreground"
          >
            <GraduationCap className="h-4 w-4" /> Klasik Derslere Dön
          </Link>
        </div>
      </div>
    </div>
  );
}
