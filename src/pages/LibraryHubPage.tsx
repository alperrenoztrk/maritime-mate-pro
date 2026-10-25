import { useMemo } from "react";
import { Link } from "react-router-dom";
import { BookA, Search } from "lucide-react";
import { SEO } from "@/components/SEO";
import { InsetGroupedList } from "@/components/ui/InsetGroupedList";
import {
  LibraryCompactCard,
  LibraryPageShell,
  LibrarySectionHeading,
} from "@/components/library/LibraryInterface";
import { StudyShortcuts } from "@/components/home/StudyShortcuts";
import { getLibrarySections } from "@/data/libraryResources";

export default function LibraryHubPage() {
  const sections = useMemo(() => getLibrarySections(), []);

  return (
    <LibraryPageShell title="Library" icon={BookA} maxWidth="max-w-4xl">
      <SEO
        title="Library — Mariner's Book"
        description="Deck and engine lessons, STCW study pathways, exercises, separate PSC and SIRE 2.0 preparation guides, knots and maritime references."
        path="/library"
      />

      <Link
        to="/search"
        className="surface-2 flex min-h-12 items-center gap-3 rounded-2xl border px-4 text-sm text-muted-foreground transition-colors duration-control hover:border-primary/20"
      >
        <Search className="h-4 w-4" />
        Search all resources
      </Link>

      <StudyShortcuts />

      {sections.map((section) => (
        <section key={section.id} className="space-y-3" aria-labelledby={`lib-${section.id}`}>
          <LibrarySectionHeading>
            <span id={`lib-${section.id}`}>{section.title}</span>
          </LibrarySectionHeading>
          <InsetGroupedList columns={2}>
            {section.items.map((item) => (
              <LibraryCompactCard key={item.to} {...item} />
            ))}
          </InsetGroupedList>
        </section>
      ))}
    </LibraryPageShell>
  );
}
