import { Sigma } from "lucide-react";
import { stability } from "@/data/courseContent/stability";
import { FormulaList } from "@/components/courseContent/FormulaList";
import { ToolNotice, ToolPage } from "@/components/tools/ToolKit";

/** Stability formulas from the single course source; each links to its calculator. */
export default function StabilityFormulasPage() {
  return (
    <ToolPage title="Stability Formulas" icon={Sigma}>
      <ToolNotice>
        The same formulas drive the calculators in Learn → Stability and the stability tools, so a formula and its
        calculation can never differ.
      </ToolNotice>
      <FormulaList entries={stability.entries} calcHrefFor={(entry) => `/stability/formulas/${entry.id}`} />
    </ToolPage>
  );
}
