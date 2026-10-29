import {
  Activity,
  ArrowLeftRight,
  BarChart3,
  Box,
  ClipboardList,
  FileCheck2,
  LineChart,
  ShieldCheck,
  Sigma,
  Waves,
  Wheat,
  Wind,
  Wrench,
} from "lucide-react";
import { ProGate } from "@/components/pro/ProGate";
import { Ship3DVisualization } from "@/components/stability/Ship3DVisualization";
import { ToolPage, ToolSection } from "@/components/tools/ToolKit";
import { ToolLinkGroup } from "@/components/tools/ToolLinkGroup";

export default function StabilityCalculationsPage() {
  return (
    <ToolPage title="Stability Calculations" icon={Activity}>
      <ToolLinkGroup
        title="Condition"
        links={[
          { title: "Loading Condition and GM", icon: ClipboardList, to: "/stability/gm" },
          { title: "Weight Changes", icon: ArrowLeftRight, to: "/stability/weight-shift" },
          { title: "Free Surface Effect", icon: Waves, to: "/stability/free-surface" },
          { title: "Righting Lever (GZ)", icon: Activity, to: "/stability/gz" },
        ]}
      />
      <ToolLinkGroup
        title="Criteria"
        accent="accent-ocean"
        links={[
          { title: "GZ Curve", icon: LineChart, to: "/stability/gz-curve" },
          { title: "IS Code Check from KN", icon: ShieldCheck, to: "/stability/gz-imo" },
          { title: "IMO Stability Criteria", icon: ShieldCheck, to: "/stability/imo-criteria" },
          { title: "Weather Criterion", icon: Wind, to: "/stability/wind-weather" },
          { title: "Stability Condition Report", icon: FileCheck2, to: "/stability/analysis" },
        ]}
      />
      <ToolLinkGroup
        title="Grain"
        accent="accent-amber"
        links={[
          { title: "Grain Heeling Moment", icon: Wheat, to: "/stability/practical/ghm" },
          { title: "Permissible Grain Moment", icon: Wheat, to: "/stability/grain" },
          { title: "Grain Stability Criteria", icon: Wheat, to: "/stability/grain-calculation" },
        ]}
      />
      <ToolLinkGroup
        title="Practical and reference"
        accent="accent-slate"
        links={[
          { title: "Practical Stability", icon: Wrench, to: "/stability/practical" },
          { title: "Stability Toolbox", icon: Wrench, to: "/stability/stable-tales" },
          { title: "Shear Force and Bending Moment", icon: BarChart3, to: "/stability/shearing-bending" },
          { title: "Stability Formulas", icon: Sigma, to: "/stability/formulas" },
        ]}
      />
      <ToolSection title="3D ship model" icon={Box} description="Rotate the model to see how heel and trim change the waterline. For illustration only.">
        <ProGate feature="The 3D stability simulation">
          <Ship3DVisualization />
        </ProGate>
      </ToolSection>
    </ToolPage>
  );
}
