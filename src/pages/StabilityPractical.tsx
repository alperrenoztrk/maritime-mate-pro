import { Container, Droplets, Wheat, Wrench } from "lucide-react";
import { ToolPage } from "@/components/tools/ToolKit";
import { ToolLinkGroup } from "@/components/tools/ToolLinkGroup";

export default function StabilityPracticalPage() {
  return (
    <ToolPage title="Practical Stability" icon={Wrench}>
      <ToolLinkGroup
        title="Everyday checks"
        links={[
          { title: "Tank Volume and Mass", icon: Container, to: "/stability/practical/tank" },
          { title: "FWA and Dock Water Allowance", icon: Droplets, to: "/stability/practical/fwa" },
          { title: "Grain Heeling Moment", icon: Wheat, to: "/stability/practical/ghm" },
        ]}
      />
    </ToolPage>
  );
}
