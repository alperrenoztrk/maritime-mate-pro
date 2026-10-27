import { MobileLayout } from "@/components/MobileLayout";
import { CalculationPage } from "@/components/ui/calculation-list";
import { StructuralCalculations } from "@/components/calculations/StructuralCalculations";

const StructuralCalculationsPage = () => {
  return (
    <MobileLayout>
      <CalculationPage
        title="Structural Calculations"
      >
        <StructuralCalculations />
      </CalculationPage>
    </MobileLayout>
  );
};

export default StructuralCalculationsPage;
