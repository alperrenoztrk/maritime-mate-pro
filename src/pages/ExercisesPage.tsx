import { FlaskConical, Ship, Wrench } from "lucide-react";
import { getBetaCategories } from "@/data/betaLessons";
import {
  LibraryBookCard,
  LibraryBookPlaceholder,
  LibraryPageShell,
  LibrarySectionHeading,
} from "@/components/library/LibraryInterface";

export default function ExercisesPage() {
  const categories = getBetaCategories();
  const deck = categories.filter((category) => category.group === "deck");
  const machine = categories.filter((category) => category.group === "machine");

  const renderLibrary = (items: typeof categories) => (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {items.map((category) =>
        category.enabled ? (
          <LibraryBookCard
            key={category.key}
            to={`/exercises/${category.key}/topics`}
            title={category.title}
            accent={category.accent}
          />
        ) : (
          <LibraryBookPlaceholder
            key={category.key}
            title={category.title}
            accent={category.accent}
            note="Soon"
          />
        ),
      )}
    </div>
  );

  return (
    <LibraryPageShell title="Exercises" icon={FlaskConical}>
      <section className="space-y-4">
        <LibrarySectionHeading badge={deck.length}>
          <span className="inline-flex items-center gap-2">
            <Ship className="h-5 w-5 text-primary" /> Deck
          </span>
        </LibrarySectionHeading>
        {renderLibrary(deck)}
      </section>

      <section className="space-y-4">
        <LibrarySectionHeading badge={machine.length}>
          <span className="inline-flex items-center gap-2">
            <Wrench className="h-5 w-5 text-primary" /> Engine
          </span>
        </LibrarySectionHeading>
        {renderLibrary(machine)}
      </section>
    </LibraryPageShell>
  );
}
