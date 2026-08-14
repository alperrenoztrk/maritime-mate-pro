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
  { title: "Personel ve Görevler", to: "/crew", icon: Users, accent: "accent-deep" },
  { title: "Köprüüstü Cihazları", to: "/bridge", icon: Compass, accent: "accent-ocean" },
  { title: "Ship Systems", to: "/ship-systems", icon: Ship, accent: "accent-amber" },
  { title: "Ship Missions", to: "/ship-tasks", icon: ClipboardCheck, accent: "accent-teal" },
  { title: "Gemi Operasyonları", to: "/ship-operations", icon: Anchor, accent: "accent-ocean" },
];

const quickReferences = [
  { title: "Denizcilik Sözlüğü", to: "/glossary", icon: BookA, accent: "accent-ocean" },
  { title: "Mevzuat", to: "/regulations", icon: ScrollText, accent: "accent-deep" },
  { title: "Geçiş Planı", to: "/passage-plan", icon: Compass, accent: "accent-ocean" },
  { title: "İşaret ve Haberleşme", to: "/communication/flags", icon: RadioTower, accent: "accent-amber" },
];

export default function LibraryHubPage() {
  return (
    <LibraryPageShell title="bookshelf" icon={BookA} maxWidth="max-w-4xl">
      <SEO
        title="Kitaplık — Mariner's Book"
        description="Operasyon, gemi sistemleri, personel ve denizcilik referanslarına tek yerden ulaşın."
        path="/library"
      />

      <section className="space-y-3" aria-labelledby="operational-library-heading">
        <LibrarySectionHeading>
          <span id="operational-library-heading">Operasyonel Kaynaklar</span>
        </LibrarySectionHeading>
        <InsetGroupedList columns={2}>
          {operationalReferences.map((item) => (
            <LibraryCompactCard key={item.to} {...item} />
          ))}
        </InsetGroupedList>
      </section>

      <section className="space-y-3" aria-labelledby="quick-reference-heading">
        <LibrarySectionHeading>
          <span id="quick-reference-heading">Hızlı Başvuru</span>
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
