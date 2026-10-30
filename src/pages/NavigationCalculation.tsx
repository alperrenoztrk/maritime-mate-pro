import { Link, useParams } from "react-router-dom";
import { Calculator } from "lucide-react";
import { ToolNotice, ToolPage } from "@/components/tools/ToolKit";
import { findNavigationTool } from "@/components/navigationCalc/navigationTools";

/** One navigation calculator, /navigation/calc/:id. Each tool keeps its inputs on this device. */
export default function NavigationCalculationPage() {
  const { id } = useParams<{ id: string }>();
  const tool = findNavigationTool(id);
  if (!tool) {
    return (
      <ToolPage title="Navigation Calculations" icon={Calculator}>
        <ToolNotice tone="warning">
          This calculator does not exist.{" "}
          <Link to="/navigation" className="font-medium underline-offset-2 hover:underline">Open the list of navigation calculators</Link>.
        </ToolNotice>
      </ToolPage>
    );
  }
  const Tool = tool.component;
  return (
    <ToolPage title={tool.title} icon={tool.icon}>
      <Tool />
    </ToolPage>
  );
}
