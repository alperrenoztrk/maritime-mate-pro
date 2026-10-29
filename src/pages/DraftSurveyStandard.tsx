import { BookOpenCheck } from "lucide-react";
import {
  FormulaLine,
  ToolNotice,
  ToolPage,
  ToolSection,
} from "@/components/tools/ToolKit";

interface Step {
  title: string;
  formula: string;
  explanation: string;
}

/** Order and formulas of the UNECE draught survey procedure (ECE/ENERGY/19, 1992). */
const STEPS: Step[] = [
  {
    title: "1. Mean of port and starboard readings",
    formula: "F obs = (F P + F S)/2 · M obs = (M P + M S)/2 · A obs = (A P + A S)/2",
    explanation: "Reading both sides removes the effect of a small list.",
  },
  {
    title: "2. Length between marks",
    formula: "LBM = LBP − d F − d A",
    explanation: "d F: forward marks aft of the FP; d A: aft marks forward of the AP (negative if outside the perpendiculars).",
  },
  {
    title: "3. Corrections to the perpendiculars and amidships",
    formula: "F = F obs − t obs × d F / LBM · A = A obs + t obs × d A / LBM · M = M obs − t obs × d M / LBM",
    explanation: "t obs = A obs − F obs (+ by the stern); d M: midship marks aft of amidships.",
  },
  {
    title: "4. Trim and deflection",
    formula: "T = A − F · Hog/Sag = M − (F + A)/2",
    explanation: "Positive deflection is sagging, negative is hogging.",
  },
  {
    title: "5. Mean of means (quarter mean)",
    formula: "MMM = (F + A + 6M) / 8",
    explanation: "Allows for hull deflection. Subtract the keel correction if the tables are on moulded draft.",
  },
  {
    title: "6. Hydrostatic particulars",
    formula: "Δ, TPC, LCF at MMM (linear interpolation)",
    explanation: "Enter the ship's approved hydrostatic tables, usually based on 1.025 t/m³.",
  },
  {
    title: "7. First trim correction",
    formula: "FTC = T × LCF × TPC × 100 / LBP   (t)",
    explanation: "T in m (+ by the stern), LCF in m from amidships (+ aft). Positive when trim and LCF are on the same side.",
  },
  {
    title: "8. Second trim correction (Nemoto)",
    formula: "STC = 50 × T² × (MCTC₊₅₀ − MCTC₋₅₀) / LBP   (t)",
    explanation: "MCTC at MMM + 0.50 m and − 0.50 m. Always added.",
  },
  {
    title: "9. Density correction",
    formula: "Δ dock = (Δ + FTC + STC) × ρ dock / ρ table",
    explanation: "ρ dock: average density of samples taken at the marks.",
  },
  {
    title: "10. Net displacement",
    formula: "Net Δ = Δ dock − (ballast + fresh water + fuel + diesel + lube oil + bilges + other)",
    explanation: "Deductibles are sounded at the time of each survey.",
  },
  {
    title: "11. Cargo and constant",
    formula: "Cargo = |Net Δ final − Net Δ initial| · Constant = Net Δ light − Lightship",
    explanation: "The constant from the initial (light) survey is used for intake planning.",
  },
];

export default function DraftSurveyStandard() {
  return (
    <ToolPage title="Draft Survey Procedure" icon={BookOpenCheck}>
      <ToolNotice>
        Source: UNECE Code of Uniform Standards and Procedures for the Performance of Draught Surveys of Coal Cargoes
        (ECE/ENERGY/19, 1992). The same sequence is used in practice for other dry bulk cargoes.
      </ToolNotice>
      {STEPS.map((step) => (
        <ToolSection key={step.title} title={step.title}>
          <FormulaLine>{step.formula}</FormulaLine>
          <p className="text-xs text-muted-foreground">{step.explanation}</p>
        </ToolSection>
      ))}
    </ToolPage>
  );
}
