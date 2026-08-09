import { useSearchParams } from "react-router-dom";
import { getBetaCategories } from "@/data/betaLessons";
import { ArrowLeft, Ship, Wrench } from "lucide-react";
import { SEO } from "@/components/SEO";
import { LibraryBookCard, LibraryEntryCard } from "@/components/library/LibraryInterface";

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
              {entryCards.map((entry) => (
                <LibraryEntryCard
                  key={entry.id}
                  title={entry.title}
                  icon={entry.icon}
                  accent={entry.accent}
                  onClick={() => openView(entry.id)}
                />
              ))}
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
                const isMachineTopic = category.key.startsWith("machine-");
                const machineSlug = isMachineTopic
                  ? category.key.replace("machine-", "")
                  : null;
                const href = isMachineTopic
                  ? `/machine/${machineSlug}/topics`
                  : `/lessons/${category.key}/topics`;

                return (
                  <LibraryBookCard
                    key={category.key}
                    to={href}
                    title={category.title}
                    accent={category.accent}
                  />
                );
              })}
            </section>
          </>
        )}
      </div>
    </div>
  );
}
