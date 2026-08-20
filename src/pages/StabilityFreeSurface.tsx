import { Waves } from "lucide-react";
import { HydrostaticsStabilityCalculations } from "@/components/calculations/HydrostaticsStabilityCalculations";
import StabilityAssistantPopup from "@/components/StabilityAssistantPopup";
import { CalculationLayout } from "@/components/layout/CalculationLayout";
import yacht from "@/assets/maritime/yacht-clear-water.jpg";

export default function StabilityFreeSurfacePage(){
  return (
    <CalculationLayout
      title="Free Surface Effect"
      icon={Waves}
      hero={{
        title: "Stability",
        imageSrc: yacht,
        imageAlt: "Yacht in clear water",
      }}
      maxWidthClassName="max-w-6xl"
      below={
        <div className="mt-2">
          <StabilityAssistantPopup />
        </div>
      }
    >
      {/* Free surface calculation lives under stability section, in the extended block */}
      <HydrostaticsStabilityCalculations singleMode section="stability" />
    </CalculationLayout>
  );
}

