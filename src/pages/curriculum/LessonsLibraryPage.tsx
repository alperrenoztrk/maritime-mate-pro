import { Link, useSearchParams } from "react-router-dom";
import { getBetaCategories } from "@/data/betaLessons";
import { BookOpenText, GraduationCap, Ship, Wrench } from "lucide-react";
import { SEO } from "@/components/SEO";
import { useEntitlement } from "@/contexts/useEntitlement";
import { PRO_GATING_ENABLED, isFreeLibraryKey } from "@/config/proGating";
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
  name: "Mariner's Book — Maritime Lessons",
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
  const { hasProAccess, loading: entitlementLoading } = useEntitlement();
  const showLocks = PRO_GATING_ENABLED && !entitlementLoading && !hasProAccess;

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
        title="Mariner's Book — Maritime Lessons"
        description="Structured maritime lessons in the deck and engine libraries."
        path="/lessons"
        jsonLd={LESSONS_JSONLD}
      />

      {!activeView ? (
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
          <Link to="/lessons/map" className="rounded-2xl border border-primary/25 bg-primary/5 p-5">
            <span className="block text-lg font-semibold text-primary">Maritime learning map</span>
            <span className="mt-2 block text-sm leading-relaxed text-muted-foreground">New to maritime learning? See how subjects branch out, choose a reading sequence and connect lessons to shipboard practice.</span>
          </Link>
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
                locked={showLocks && !isFreeLibraryKey(category.key)}
              />
            );
          })}
        </section>
      )}
    </LibraryPageShell>
  );
}
