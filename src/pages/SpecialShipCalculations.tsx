import { MobileLayout } from "@/components/MobileLayout";
import { CalculationGridScreen } from "@/components/ui/calculation-grid";
import { SpecialShipCalculations } from "@/components/calculations/SpecialShipCalculations";

const SpecialShipCalculationsPage = () => {
  return (
    <MobileLayout>
      <CalculationGridScreen
        eyebrow="Special Ships"
        title="Special Ship Calculations"
      >
        <SpecialShipCalculations />
      </CalculationGridScreen>
    </MobileLayout>
  );
};

export default SpecialShipCalculationsPage;
