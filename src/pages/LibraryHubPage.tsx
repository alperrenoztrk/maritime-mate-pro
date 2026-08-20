import {
  Anchor,
  BookA,
  ClipboardCheck,
  Compass,
  RadioTower,
  ScrollText,
  Ship,
  Users,
} from "lucide-react";
import { SEO } from "@/components/SEO";
import { InsetGroupedList } from "@/components/ui/InsetGroupedList";
import {
  LibraryCompactCard,
  LibraryPageShell,
  LibrarySectionHeading,
} from "@/components/library/LibraryInterface";

const operationalReferences = [
  { title: "Personnel and Duties", to: "/crew", icon: Users, accent: "accent-deep" },
  { title: "Bridge Devices", to: "/bridge", icon: Compass, accent: "accent-ocean" },
  { title: "Ship Systems", to: "/ship-systems", icon: Ship, accent: "accent-amber" },
  { title: "Ship Missions", to: "/ship-tasks", icon: ClipboardCheck, accent: "accent-teal" },
  { title: "Ship Operations", to: "/ship-operations", icon: Anchor, accent: "accent-ocean" },
];

const quickReferences = [
  { title: "Maritime Dictionary", to: "/glossary", icon: BookA, accent: "accent-ocean" },
  { title: "Legislation", to: "/regulations", icon: ScrollText, accent: "accent-deep" },
  { title: "Transition Plan", to: "/passage-plan", icon: Compass, accent: "accent-ocean" },
  { title: "Signal and Communication", to: "/communication/flags", icon: RadioTower, accent: "accent-amber" },
];

export default function LibraryHubPage() {
  return (
    <LibraryPageShell title="bookshelf" icon={BookA} maxWidth="max-w-4xl">
      <SEO
        title="Bookcase — Mariner's Book"
        description="Reach operations, ship systems, crew and maritime references from a single place."
        path="/library"
      />

      <section className="space-y-3" aria-labelledby="operational-library-heading">
        <LibrarySectionHeading>
          <span id="operational-library-heading">Operational Resources</span>
        </LibrarySectionHeading>
        <InsetGroupedList columns={2}>
          {operationalReferences.map((item) => (
            <LibraryCompactCard key={item.to} {...item} />
          ))}
        </InsetGroupedList>
      </section>

      <section className="space-y-3" aria-labelledby="quick-reference-heading">
        <LibrarySectionHeading>
          <span id="quick-reference-heading">Quick Reference</span>
        </LibrarySectionHeading>
        <InsetGroupedList columns={2}>
          {quickReferences.map((item) => (
            <LibraryCompactCard key={item.to} {...item} />
          ))}
        </InsetGroupedList>
      </section>
    </LibraryPageShell>
  );
}
