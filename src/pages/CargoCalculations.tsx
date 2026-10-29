import { BookOpenCheck, ClipboardList, Droplets, Fuel, Gauge, GitCompareArrows, Layers, PackageCheck, Scale } from "lucide-react";
import { InsetGroupedList } from "@/components/ui/InsetGroupedList";
import { LibraryCompactCard, LibrarySectionHeading } from "@/components/library/LibraryInterface";
import { ToolPage } from "@/components/tools/ToolKit";

const SURVEY_TOOLS = [
  { title: "Draft Survey", icon: Scale, to: "/cargo/calculations/draft-survey" },
  { title: "Initial (Light) Survey", icon: ClipboardList, to: "/cargo/calculations/preloading" },
  { title: "Intermediate Survey", icon: Gauge, to: "/cargo/calculations/intermediate" },
  { title: "Post-Discharge Survey", icon: PackageCheck, to: "/cargo/calculations/postdischarge" },
  { title: "Survey Comparison", icon: GitCompareArrows, to: "/cargo/calculations/comparative" },
];

const SUPPORT_TOOLS = [
  { title: "Ballast Quantity", icon: Droplets, to: "/cargo/calculations/ballast" },
  { title: "Density Correction", icon: Droplets, to: "/cargo/calculations/density" },
  { title: "Bunker Quantity", icon: Fuel, to: "/cargo/calculations/bunker" },
  { title: "Draft Survey Procedure", icon: BookOpenCheck, to: "/cargo/formulas" },
];

export default function CargoCalculationsPage() {
  return (
    <ToolPage title="Cargo Calculations" icon={Layers}>
      <section className="space-y-3">
        <LibrarySectionHeading badge={SURVEY_TOOLS.length}>Draft survey</LibrarySectionHeading>
        <InsetGroupedList columns={2}>
          {SURVEY_TOOLS.map((tool) => (
            <LibraryCompactCard key={tool.to} title={tool.title} icon={tool.icon} accent="accent-teal" to={tool.to} />
          ))}
        </InsetGroupedList>
      </section>
      <section className="space-y-3">
        <LibrarySectionHeading badge={SUPPORT_TOOLS.length}>Quantities and reference</LibrarySectionHeading>
        <InsetGroupedList columns={2}>
          {SUPPORT_TOOLS.map((tool) => (
            <LibraryCompactCard key={tool.to} title={tool.title} icon={tool.icon} accent="accent-ocean" to={tool.to} />
          ))}
        </InsetGroupedList>
      </section>
    </ToolPage>
  );
}
