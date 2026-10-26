import { MobileLayout } from "@/components/MobileLayout";
import { StructuralCalculations } from "@/components/calculations/StructuralCalculations";
import { CalculationPage } from "@/components/ui/calculation-list";

export default function StabilityShearingBendingPage() {
  return (
    <MobileLayout>
      <CalculationPage
        title="Shear Force & Bending Moment"
      >
        <StructuralCalculations initialTab="diagrams" />
      </CalculationPage>
    </MobileLayout>
  );
}
