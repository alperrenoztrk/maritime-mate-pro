import { useSearchParams } from "react-router-dom";
import { getBetaCategories } from "@/data/betaLessons";
import { BookOpenText, Ship, Wrench } from "lucide-react";
import { SEO } from "@/components/SEO";
import { LibraryBookCard, LibraryEntryCard, LibraryPageShell } from "@/components/library/LibraryInterface";

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
    <LibraryPageShell
      title={
        activeView === "deck"
          ? "Güverte Kitaplığı"
          : activeView === "machine"
            ? "Makine Kitaplığı"
            : "Dersler"
      }
      icon={activeView === "deck" ? Ship : activeView === "machine" ? Wrench : BookOpenText}
      onBack={activeView ? closeView : undefined}
      backLabel="Dersler ana ekranına dön"
    >
      <SEO
        title="Mariner's Book — Denizcilik Dersleri"
        description="Güverte ve makine kitaplıklarında yapılandırılmış denizcilik dersleri."
        path="/lessons"
        jsonLd={LESSONS_JSONLD}
      />

      {!activeView ? (
        <section className="mx-auto grid w-full max-w-3xl gap-3 sm:grid-cols-2">
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
      ) : (
        <section className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {libraryCategories.map((category) => {
            const isMachineTopic = category.key.startsWith("machine-");
            const machineSlug = isMachineTopic ? category.key.replace("machine-", "") : null;
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
      )}
    </LibraryPageShell>
  );
}
