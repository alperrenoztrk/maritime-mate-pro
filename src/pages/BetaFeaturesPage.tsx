import { FlaskConical } from "lucide-react";
import { LibraryBookCard, LibraryPageShell } from "@/components/library/LibraryInterface";

const FEATURES = [
  {
    to: "/beta/documents",
    title: "Document and Certificate Tracking",
    accent: "from-amber-500 via-orange-600 to-rose-700",
  },
  {
    to: "/beta/psc-checklist",
    title: "PSC inspection Preparation List",
    accent: "from-rose-500 via-orange-600 to-amber-700",
  },
  {
    to: "/beta/ship-simulator",
    title: "3D Ship Stability Simulation",
    accent: "from-violet-500 via-purple-600 to-indigo-800",
  },
];

export default function BetaFeaturesPage() {
  return (
    <LibraryPageShell title="Beta Features" icon={FlaskConical} maxWidth="max-w-5xl">
      <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-amber-800 dark:text-amber-200">
        Beta tools are in the testing phase. Data must be verified manually before being used in official audit, survey or PSC processes.
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
