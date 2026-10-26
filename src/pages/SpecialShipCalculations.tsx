import { MobileLayout } from "@/components/MobileLayout";
import { CalculationPage } from "@/components/ui/calculation-list";
import { SpecialShipCalculations } from "@/components/calculations/SpecialShipCalculations";

const SpecialShipCalculationsPage = () => {
  return (
    <MobileLayout>
      <CalculationPage
        title="Special Ship Calculations"
      >
        <SpecialShipCalculations />
      </CalculationPage>
    </MobileLayout>
  );
};

export default SpecialShipCalculationsPage;
