import { Link } from "react-router-dom";
import { getBetaCategories, type BetaCategory } from "@/data/betaLessons";
import { ChevronRight, FlaskConical, GraduationCap, Ship, Wrench } from "lucide-react";

/**
 * "Alıştırmalar" giriş sayfası.
 *
 * Orijinal "Dersler"e dokunmadan, tüm güverte ve makine kategorilerini listeler.
 * İçeriği olan kategoriler açılabilir; konu anlatımı henüz olmayanlar "yakında".
 */
export default function ExercisesPage() {
  const categories = getBetaCategories();
  const deck = categories.filter((c) => c.group === "deck");
  const machine = categories.filter((c) => c.group === "machine");

  const renderCategory = (category: BetaCategory) => {
    const CategoryIcon = category.icon;

    const inner = (
      <div className="flex items-center gap-3">
        <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${category.accent} text-white shadow-lg`}>
          <CategoryIcon className="h-5 w-5" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-base font-bold text-foreground">{category.title}</span>
            {!category.enabled && (
              <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                Yakında
              </span>
            )}
          </div>
        </div>
        {category.enabled && <ChevronRight className="h-5 w-5 text-muted-foreground" />}
      </div>
    );

    return category.enabled ? (
      <Link
        key={category.key}
        to={`/exercises/${category.key}/topics`}
        className="rounded-2xl border border-border/60 bg-card/80 p-4 shadow-sm backdrop-blur transition hover:border-violet-400/40 hover:bg-card"
      >
        {inner}
      </Link>
    ) : (
      <div
        key={category.key}
        className="cursor-not-allowed rounded-2xl border border-border/40 bg-card/50 p-4 opacity-70"
      >
        {inner}
      </div>
    );
  };

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
          <h1 className="text-2xl font-bold text-foreground">Alıştırmalar</h1>
        </header>

        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <Ship className="h-5 w-5 text-blue-500" />
            <h2 className="text-lg font-semibold text-foreground">Güverte</h2>
          </div>
          <div className="flex flex-col gap-3">{deck.map(renderCategory)}</div>
        </section>

        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <Wrench className="h-5 w-5 text-slate-500" />
            <h2 className="text-lg font-semibold text-foreground">Makine</h2>
          </div>
          <div className="flex flex-col gap-3">{machine.map(renderCategory)}</div>
        </section>

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
