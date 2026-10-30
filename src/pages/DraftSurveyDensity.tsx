import { Thermometer } from "lucide-react";
import { ProfessionalCalculator, type ProfessionalGroup } from "@/components/calculations/ProfessionalCalculator";
import { correctReferenceDisplacement } from "@/lib/toolCalculations";

const GROUPS: ProfessionalGroup[] = [{
  title: "Water and Hydrostatic Data",
  fields: [
    { key: "actual", label: "Observed water density", unit: "t/m³", min: 0.000001, placeholder: "1.010" },
    { key: "reference", label: "Hydrostatic reference density", unit: "t/m³", min: 0.000001, defaultValue: "1.025" },
    { key: "displacement", label: "Table displacement at reference density", unit: "t", min: 0, placeholder: "10000" },
  ],
}];

export default function DraftSurveyDensity() {
  return <ProfessionalCalculator title="Displacement Density Correction" icon={Thermometer}
    description="Correct hydrostatic-table displacement for measured water density, assuming the same immersed hull volume."
    groups={GROUPS} resultTitle="Density-corrected Displacement"
    formula="Displacement(actual) = Displacement(table) × ρ(actual) / ρ(reference)"
    solve={({ actual, reference, displacement }) => {
      const r = correctReferenceDisplacement(displacement, actual, reference);
      return {
        results: [
          { label: "Corrected displacement", value: `${r.correctedDisplacementTonnes.toFixed(3)} t`, primary: true },
          { label: "Correction to table displacement", value: `${r.correctionTonnes >= 0 ? "+" : ""}${r.correctionTonnes.toFixed(3)} t` },
        ],
        steps: [
          `Density ratio = ${actual} / ${reference} = ${(actual / reference).toFixed(6)}.`,
          `Actual displacement = ${displacement} × ${(actual / reference).toFixed(6)} = ${r.correctedDisplacementTonnes.toFixed(3)} t.`,
          `Correction = ${r.correctedDisplacementTonnes.toFixed(3)} − ${displacement} = ${r.correctionTonnes.toFixed(3)} t.`,
        ],
      };
    }}
    limitations="Not a freshwater allowance or draft correction. Draft mark positions, trim corrections and approved hydrostatic data must be handled separately." />;
}
