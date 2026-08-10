import {
  Anchor,
  BookA,
  ClipboardCheck,
  Compass,
  RadioTower,
  ScrollText,
  Ship,
  Users,
  Wrench,
} from "lucide-react";
import { SEO } from "@/components/SEO";
import {
  LibraryCompactCard,
  LibraryPageShell,
  LibrarySectionHeading,
} from "@/components/library/LibraryInterface";

const operationalReferences = [
  { title: "Personel ve Görevler", to: "/crew", icon: Users, accent: "from-indigo-500 to-blue-600" },
  { title: "Köprüüstü Cihazları", to: "/bridge", icon: Compass, accent: "from-sky-500 to-cyan-600" },
  { title: "Gemi Sistemleri", to: "/ship-systems", icon: Ship, accent: "from-amber-500 to-orange-600" },
  { title: "Gemi Görevleri", to: "/ship-tasks", icon: ClipboardCheck, accent: "from-teal-500 to-emerald-600" },
  { title: "Gemi Operasyonları", to: "/ship-operations", icon: Anchor, accent: "from-rose-500 to-pink-600" },
  { title: "Makine Bölümü", to: "/machinery", icon: Wrench, accent: "from-slate-500 to-zinc-700" },
];

const quickReferences = [
  { title: "Denizcilik Sözlüğü", to: "/glossary", icon: BookA, accent: "from-cyan-500 to-blue-600" },
  { title: "Mevzuat", to: "/regulations", icon: ScrollText, accent: "from-violet-500 to-indigo-600" },
  { title: "Geçiş Planı", to: "/passage-plan", icon: Compass, accent: "from-blue-500 to-sky-600" },
  { title: "İşaret ve Haberleşme", to: "/communication/flags", icon: RadioTower, accent: "from-orange-500 to-red-600" },
];

export default function LibraryHubPage() {
  return (
    <LibraryPageShell title="Kitaplık" icon={BookA} maxWidth="max-w-4xl">
      <SEO
        title="Kitaplık — Mariner's Book"
        description="Operasyon, gemi sistemleri, personel ve denizcilik referanslarına tek yerden ulaşın."
        path="/library"
      />

      <section className="space-y-3" aria-labelledby="operational-library-heading">
        <LibrarySectionHeading>
          <span id="operational-library-heading">Operasyonel Kaynaklar</span>
        </LibrarySectionHeading>
        <div className="grid gap-2 sm:grid-cols-2">
          {operationalReferences.map((item) => (
            <LibraryCompactCard key={item.to} {...item} />
          ))}
        </div>
      </section>

      <section className="space-y-3" aria-labelledby="quick-reference-heading">
        <LibrarySectionHeading>
          <span id="quick-reference-heading">Hızlı Başvuru</span>
        </LibrarySectionHeading>
        <div className="grid gap-2 sm:grid-cols-2">
          {quickReferences.map((item) => (
            <LibraryCompactCard key={item.to} {...item} />
          ))}
        </div>
      </section>
    </LibraryPageShell>
  );
}
