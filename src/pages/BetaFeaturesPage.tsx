import { FlaskConical } from "lucide-react";
import { LibraryBookCard, LibraryPageShell } from "@/components/library/LibraryInterface";

const FEATURES = [
  {
    to: "/beta/documents",
    title: "Belge ve Sertifika Takibi",
    accent: "from-amber-500 via-orange-600 to-rose-700",
  },
  {
    to: "/beta/work-hours",
    title: "Otomatik Çalışma Saati Tablosu",
    accent: "from-orange-500 via-amber-600 to-orange-800",
  },
  {
    to: "/beta/psc-checklist",
    title: "PSC Denetim Hazırlık Listesi",
    accent: "from-rose-500 via-orange-600 to-amber-700",
  },
  {
    to: "/beta/ship-simulator",
    title: "3D Gemi Stabilite Simülasyonu",
    accent: "from-violet-500 via-purple-600 to-indigo-800",
  },
];

export default function BetaFeaturesPage() {
  return (
    <LibraryPageShell title="Beta Özellikler" icon={FlaskConical} maxWidth="max-w-5xl">
      <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-amber-800 dark:text-amber-200">
        Beta araçları deneme aşamasındadır. Resmî denetim, sörvey veya PSC süreçlerinde kullanılmadan önce veriler manuel olarak doğrulanmalıdır.
      </div>

      <section className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {FEATURES.map((feature) => (
          <LibraryBookCard
            key={feature.to}
            to={feature.to}
            title={feature.title}
            accent={feature.accent}
          />
        ))}
      </section>
    </LibraryPageShell>
  );
}
