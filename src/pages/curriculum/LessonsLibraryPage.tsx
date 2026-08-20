import { useSearchParams } from "react-router-dom";
import { getBetaCategories } from "@/data/betaLessons";
import { BookOpenText, ClipboardCheck, GraduationCap, Ship, Wrench } from "lucide-react";
import { SEO } from "@/components/SEO";
import { InsetGroupedList } from "@/components/ui/InsetGroupedList";
import {
  LibraryBookCard,
  LibraryCompactCard,
  LibraryEntryCard,
  LibraryPageShell,
  LibrarySectionHeading,
} from "@/components/library/LibraryInterface";

const LESSONS_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "Mariner's Book — Sailing Lessons",
  description:
    "Structured operational maritime training consisting of deck and machinery libraries.",
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
      title: "Deck Library",
      icon: Ship,
      accent: "accent-ocean",
      description: "Navigation, Stability, load, safety and Bridge lessons",
    },
    {
      id: "machine" as const,
      title: "Machine Library",
      icon: Wrench,
      accent: "accent-slate",
      description: "Mechanical, electrical, thermodynamics and maintenance courses",
    },
  ];

  const practiceEntries = [
    {
      title: "Exercises",
      to: "/exercises",
      icon: ClipboardCheck,
      accent: "accent-teal",
    },
    {
      title: "Exam Preparation",
      to: "/exam-preparation",
      icon: GraduationCap,
      accent: "accent-deep",
    },
  ];

  const libraryCategories = activeView
    ? betaCategories.filter((category) => category.group === activeView)
    : [];

  return (
    <LibraryPageShell
      title={
        activeView === "deck"
          ? "Deck Library"
          : activeView === "machine"
            ? "Machine Library"
            : "Dersler"
      }
      icon={activeView === "deck" ? Ship : activeView === "machine" ? Wrench : BookOpenText}
      onBack={activeView ? closeView : undefined}
      backLabel="Back to the lessons home screen"
    >
      <SEO
        title="Mariner's Book — Sailing Lessons"
        description="Structured maritime lessons in the deck and engine libraries."
        path="/lessons"
        jsonLd={LESSONS_JSONLD}
      />

      {!activeView ? (
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
          <section className="space-y-3">
            <LibrarySectionHeading>Bookcases</LibrarySectionHeading>
            <InsetGroupedList columns={2}>
              {entryCards.map((entry) => (
                <LibraryEntryCard
                  key={entry.id}
                  title={entry.title}
                  icon={entry.icon}
                  accent={entry.accent}
                  description={entry.description}
                  onClick={() => openView(entry.id)}
                />
              ))}
            </InsetGroupedList>
          </section>

          <section className="space-y-3">
            <LibrarySectionHeading>Practical</LibrarySectionHeading>
            <InsetGroupedList columns={2}>
              {practiceEntries.map((entry) => (
                <LibraryCompactCard key={entry.to} {...entry} />
              ))}
            </InsetGroupedList>
          </section>
        </div>
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
