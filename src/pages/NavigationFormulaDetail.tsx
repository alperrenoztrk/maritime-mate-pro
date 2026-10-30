import { Navigate, useParams } from "react-router-dom";
import { Sigma } from "lucide-react";
import { navigation } from "@/data/courseContent/navigation";
import { CalculatorCard } from "@/components/courseContent/CalculatorCard";
import { FormulaList } from "@/components/courseContent/FormulaList";
import { ToolPage } from "@/components/tools/ToolKit";

export default function NavigationFormulaDetailPage() {
  const { id = "" } = useParams();
  const entry = navigation.entries.find((e) => e.id === id);
  if (!entry) return <Navigate to="/navigation/formulas" replace />;
  return (
    <ToolPage title={entry.name} icon={Sigma}>
      <FormulaList entries={[entry]} />
      {entry.calculate && <CalculatorCard entry={entry} />}
    </ToolPage>
  );
}
