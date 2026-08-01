import { FlaskConical, Ship, Wrench } from "lucide-react";
import { getBetaCategories } from "@/data/betaLessons";
import {
  LibraryBookCard,
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
          <div
            key={category.key}
            className="relative aspect-[3/4] min-h-60 overflow-hidden rounded-l-md rounded-r-3xl border border-white/10 bg-muted/50 opacity-60 shadow"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${category.accent} opacity-50`} />
            <div className="absolute inset-y-0 left-0 w-4 border-r border-white/10 bg-black/20" />
            <div className="relative flex h-full flex-col p-5 pl-7 text-white">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15">
                <category.icon className="h-5 w-5" />
              </span>
              <div className="mt-auto pb-2">
                <h2 className="text-base font-bold leading-snug">{category.title}</h2>
                <span className="mt-2 inline-block rounded-full bg-black/25 px-2 py-0.5 text-[10px] font-semibold">
                  Yakında
                </span>
              </div>
            </div>
          </div>
        ),
      )}
    </div>
  );

  return (
    <LibraryPageShell title="Alıştırmalar" icon={FlaskConical}>
      <section className="space-y-4">
        <LibrarySectionHeading badge={deck.length}>
          <span className="inline-flex items-center gap-2">
            <Ship className="h-5 w-5 text-primary" /> Güverte
          </span>
        </LibrarySectionHeading>
        {renderLibrary(deck)}
      </section>

      <section className="space-y-4">
        <LibrarySectionHeading badge={machine.length}>
          <span className="inline-flex items-center gap-2">
            <Wrench className="h-5 w-5 text-primary" /> Makine
          </span>
        </LibrarySectionHeading>
        {renderLibrary(machine)}
      </section>
    </LibraryPageShell>
  );
}
