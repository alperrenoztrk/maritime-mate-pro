import { Radar } from "lucide-react";
import {
  ProfessionalCalculator,
  type ProfessionalGroup,
} from "@/components/calculations/ProfessionalCalculator";
import { solveProfessionalCpa } from "@/lib/professionalCpa";

const GROUPS: ProfessionalGroup[] = [
  {
    title: "Own Ship",
    description: "Use course and speed over ground, not heading and speed through water.",
    fields: [
      { key: "ownCourse", label: "Course over ground", unit: "°T", min: 0, max: 360, placeholder: "090" },
      { key: "ownSpeed", label: "Speed over ground", unit: "kn", min: 0, placeholder: "12.0" },
    ],
  },
  {
    title: "Target Ship",
    description: "True target bearing and current range at the same observation time.",
    fields: [
      { key: "bearing", label: "Observed true bearing", unit: "°T", min: 0, max: 360, placeholder: "045",
        help: "True bearing measured clockwise from north — NOT relative bearing from the bow." },
      { key: "range", label: "Observed range", unit: "NM", min: 0, placeholder: "6.0" },
      { key: "targetCourse", label: "Target course over ground", unit: "°T", min: 0, max: 360, placeholder: "270" },
      { key: "targetSpeed", label: "Target speed over ground", unit: "kn", min: 0, placeholder: "10.0" },
    ],
  },
];

export default function ProfessionalCpaCalculatorPage() {
  return (
    <ProfessionalCalculator
      title="CPA / TCPA Calculator"
      icon={Radar}
      description="True-motion relative vector worksheet. Enter simultaneous own-ship and target data to estimate closest approach at unchanged courses and speeds."
      groups={GROUPS}
      formula="R = d × [sin(Brg), cos(Brg)]; Vrel = Vtarget − Vown; tCPA = max(0, −(R·Vrel)/|Vrel|²); CPA = |R + Vrel × tCPA|"
      solve={solveProfessionalCpa}
      resultTitle="Relative Motion Results"
      limitations="Training and cross-checking only. Assumes steady ground vectors, one simultaneous bearing/range observation and negligible earth curvature over the plotted distance. A negative historic TCPA is displayed as zero. Use radar/ARPA, visual lookout and COLREG Rule 7 to assess collision risk; no automatic 'safe CPA' threshold applies."
    />
  );
}
