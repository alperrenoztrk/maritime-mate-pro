import { MobileLayout } from "@/components/MobileLayout";
import { CalculationGridScreen } from "@/components/ui/calculation-grid";
import { StructuralCalculations } from "@/components/calculations/StructuralCalculations";

const StructuralCalculationsPage = () => {
  return (
    <MobileLayout>
      <CalculationGridScreen
        eyebrow="Structural"
        title="Yapısal Hesaplamalar"
      >
        <StructuralCalculations />
      </CalculationGridScreen>
    </MobileLayout>
  );
};

export default StructuralCalculationsPage;
