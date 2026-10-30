import { Droplets } from "lucide-react";
import { ProfessionalCalculator, type ProfessionalGroup } from "@/components/calculations/ProfessionalCalculator";
import { estimateDisplacementChange } from "@/lib/toolCalculations";

const GROUPS: ProfessionalGroup[] = [
  { title: "Vessel Hydrostatic Data", fields: [
    { key: "tpc", label: "Tonnes per centimetre immersion", unit: "t/cm", min: 0.000001, placeholder: "20",
      help: "Use an appropriate TPC for the vessel's drafts and water density." },
  ] },
  { title: "Before Drafts", fields: [
    { key: "beforeForward", label: "Forward draft", unit: "m", min: 0, placeholder: "5.0" },
    { key: "beforeMidship", label: "Midship draft", unit: "m", min: 0, placeholder: "5.0" },
    { key: "beforeAft", label: "Aft draft", unit: "m", min: 0, placeholder: "5.0" },
  ] },
  { title: "After Drafts", fields: [
    { key: "afterForward", label: "Forward draft", unit: "m", min: 0, placeholder: "5.1" },
    { key: "afterMidship", label: "Midship draft", unit: "m", min: 0, placeholder: "5.1" },
    { key: "afterAft", label: "Aft draft", unit: "m", min: 0, placeholder: "5.1" },
  ] },
];

export default function DraftSurveyBallast() {
  return <ProfessionalCalculator title="Draft Change Estimate" icon={Droplets}
    description="Estimate an overall displacement change from draft observations. It must not be presented as the amount of ballast pumped."
    groups={GROUPS} resultTitle="Approximate Displacement Change"
    formula="Mean draft ≈ (Forward + 4 × Midship + Aft) / 6; ΔDisplacement ≈ ΔDraft (cm) × TPC"
    solve={({ tpc, beforeForward, beforeMidship, beforeAft, afterForward, afterMidship, afterAft }) => {
      const r = estimateDisplacementChange(
        { forward: beforeForward, midship: beforeMidship, aft: beforeAft },
        { forward: afterForward, midship: afterMidship, aft: afterAft },
        tpc,
      );
      return {
        results: [
          { label: "Estimated displacement difference", value: `${r.displacementChangeTonnes >= 0 ? "+" : ""}${r.displacementChangeTonnes.toFixed(2)} t`, primary: true },
          { label: "Before mean draft", value: `${r.beforeMeanM.toFixed(3)} m` },
          { label: "After mean draft", value: `${r.afterMeanM.toFixed(3)} m` },
          { label: "Change in mean draft", value: `${r.draftChangeM.toFixed(3)} m` },
        ],
        steps: [
          `Before mean = (${beforeForward} + 4 × ${beforeMidship} + ${beforeAft}) / 6 = ${r.beforeMeanM.toFixed(3)} m.`,
          `After mean = (${afterForward} + 4 × ${afterMidship} + ${afterAft}) / 6 = ${r.afterMeanM.toFixed(3)} m.`,
          `Change in displacement ≈ (${r.draftChangeM.toFixed(4)} × 100) × ${tpc} = ${r.displacementChangeTonnes.toFixed(2)} t.`,
        ],
        notices: ["Observed displacement changes may include cargo, bunkers, stores, freshwater and ballast. This is not an independent ballast measurement."],
      };
    }}
    limitations="Simplified mean draft and constant TPC. Apply approved vessel hydrostatic and trim, hog/sag, draft-mark and water-density corrections in a professional draft survey." />;
}
