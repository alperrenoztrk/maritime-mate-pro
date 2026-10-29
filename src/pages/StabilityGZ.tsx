import { Activity } from "lucide-react";
import { stability } from "@/data/courseContent/stability";
import { CalculatorCard } from "@/components/courseContent/CalculatorCard";
import { ToolPage } from "@/components/tools/ToolKit";
import { StabilityDisclaimer } from "@/components/stability/StabilityDisclaimer";

/** Single-angle righting lever tools; the cards are the course calculators (same tested engine). */
const ENTRY_IDS = ["gz-kn", "gz-small", "wall-sided-gz", "righting-moment", "angle-of-loll"];

export default function StabilityGZPage() {
  const entries = ENTRY_IDS.map((id) => stability.entries.find((entry) => entry.id === id)).filter((e) => e !== undefined);
  return (
    <ToolPage title="Righting Lever (GZ)" icon={Activity}>
      <StabilityDisclaimer />
      {entries.map((entry) => (
        <div key={entry.id} id={entry.id} className="scroll-mt-24">
          <CalculatorCard entry={entry} />
        </div>
      ))}
    </ToolPage>
  );
}
