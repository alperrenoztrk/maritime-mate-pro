import type { CSSProperties } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getBetaCategories } from "@/data/betaLessons";
import { ArrowLeft, BookOpen, ChevronRight, Ship, Wrench } from "lucide-react";
import { SEO } from "@/components/SEO";

const LESSONS_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "Mariner's Book — Denizcilik Dersleri",
  description:
    "Güverte ve makine kitaplıklarından oluşan yapılandırılmış operasyonel denizcilik eğitimi.",
  provider: {
    "@type": "Organization",
    name: "Mariner's Book",
    url: "https://nauticalleap.com/",
  },
};

type LibraryView = "deck" | "machine";

export default function LessonsLibraryPage() {
  const highRefreshRateStyles: CSSProperties = {
    ["--frame-rate" as string]: "120",
    ["--animation-duration" as string]: "8.33ms",
    ["--transition-duration" as string]: "16.67ms",
  };
  const [searchParams, setSearchParams] = useSearchParams();
  const requestedView = searchParams.get("library");
  const activeView: LibraryView | null =
    requestedView === "deck" || requestedView === "machine" ? requestedView : null;
  const betaCategories = getBetaCategories();

  const openView = (view: LibraryView) => setSearchParams({ library: view });
  const closeView = () => setSearchParams({});

  const entryCards = [
    {
      id: "deck" as const,
      title: "Güverte Kitaplığı",
      icon: Ship,
      accent: "from-blue-500 via-indigo-500 to-blue-700",
    },
    {
      id: "machine" as const,
      title: "Makine Kitaplığı",
      icon: Wrench,
      accent: "from-slate-600 via-zinc-700 to-slate-900",
    },
  ];

  const libraryCategories = activeView
    ? betaCategories.filter((category) => category.group === activeView)
    : [];

  return (
    <div
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 px-4 py-8 pb-24 dark:from-[hsl(220,50%,6%)] dark:via-[hsl(220,50%,8%)] dark:to-[hsl(220,50%,10%)]"
      style={highRefreshRateStyles}
    >
      <SEO
        title="Mariner's Book — Denizcilik Dersleri"
        description="Güverte ve makine kitaplıklarında yapılandırılmış denizcilik dersleri."
        path="/lessons"
        jsonLd={LESSONS_JSONLD}
      />

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/4 h-48 w-48 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute right-10 top-10 h-56 w-56 rounded-full bg-indigo-500/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-7">
        {!activeView ? (
          <>
            <header className="text-center">
              <h1 className="text-2xl font-bold text-foreground">Dersler</h1>
            </header>

            <section className="mx-auto grid w-full max-w-3xl gap-4 sm:grid-cols-2">
              {entryCards.map((entry) => {
                const EntryIcon = entry.icon;
                return (
                  <button
                    key={entry.id}
                    type="button"
                    onClick={() => openView(entry.id)}
                    className="group relative min-h-44 overflow-hidden rounded-3xl border border-white/20 text-left shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${entry.accent}`} />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.22),transparent_45%)]" />
                    <div className="relative flex h-full min-h-44 flex-col justify-between p-5 text-white">
                      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
                        <EntryIcon className="h-6 w-6" />
                      </span>
                      <span className="flex items-end justify-between gap-3">
                        <span className="text-lg font-bold leading-tight">{entry.title}</span>
                        <ChevronRight className="h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </button>
                );
              })}
            </section>
          </>
        ) : (
          <>
            <header className="flex items-center gap-3">
              <button
                type="button"
                onClick={closeView}
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border/60 bg-card/80 text-muted-foreground transition hover:text-foreground"
                aria-label="Dersler ana ekranına dön"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <div className="flex items-center gap-3">
                {activeView === "deck" ? (
                  <Ship className="h-6 w-6 text-primary" />
                ) : (
                  <Wrench className="h-6 w-6 text-primary" />
                )}
                <h1 className="text-2xl font-bold text-foreground">
                  {activeView === "deck" ? "Güverte Kitaplığı" : "Makine Kitaplığı"}
                </h1>
              </div>
            </header>

            <section className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {libraryCategories.map((category) => {
                const CategoryIcon = category.icon;
                const isMachineTopic = category.key.startsWith("machine-");
                const machineSlug = isMachineTopic
                  ? category.key.replace("machine-", "")
                  : null;
                const href = isMachineTopic
                  ? `/machine/${machineSlug}/topics`
                  : `/lessons/${category.key}/topics`;

                return (
                  <Link
                    key={category.key}
                    to={href}
                    className="group relative aspect-[3/4] min-h-60 overflow-hidden rounded-l-md rounded-r-3xl border border-white/20 shadow-lg transition duration-300 hover:-translate-y-1 hover:rotate-[0.4deg] hover:shadow-2xl"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${category.accent}`} />
                    <div className="absolute inset-y-0 left-0 w-4 border-r border-white/15 bg-black/20 shadow-[4px_0_12px_rgba(0,0,0,0.18)]" />
                    <div className="absolute inset-y-3 right-0 w-1.5 rounded-l-full bg-white/35" />
                    <div className="absolute inset-x-5 bottom-1 h-1 rounded-full bg-white/30" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.28),transparent_42%)]" />

                    <div className="relative flex h-full flex-col p-5 pl-7 text-white">
                      <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
                        <CategoryIcon className="h-5 w-5" />
                      </span>
                      <div className="mt-auto flex items-end justify-between gap-3 pb-2">
                        <h2 className="text-base font-bold leading-snug sm:text-lg">{category.title}</h2>
                        <BookOpen className="h-5 w-5 shrink-0 opacity-80 transition-transform group-hover:scale-110" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </section>
          </>
        )}
      </div>
    </div>
  );
}
