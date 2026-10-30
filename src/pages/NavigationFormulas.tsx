import { Sigma } from "lucide-react";
import { navigation } from "@/data/courseContent/navigation";
import { FormulaList } from "@/components/courseContent/FormulaList";
import { ToolNotice, ToolPage } from "@/components/tools/ToolKit";

/** Navigation formulas from the single course source; each links to its calculator. */
export default function NavigationFormulasPage() {
  return (
    <ToolPage title="Navigation Formulas" icon={Sigma}>
      <ToolNotice>
        The same formulas drive the calculators in Learn → Navigation. For the full tools (great circle waypoints, fixes,
        tides, sights) open Navigation Calculations.
      </ToolNotice>
      <FormulaList entries={navigation.entries} calcHrefFor={(entry) => `/navigation/formulas/${entry.id}`} />
    </ToolPage>
  );
}
