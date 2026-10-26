import { MobileLayout } from "@/components/MobileLayout";
import { CalculationPage } from "@/components/ui/calculation-list";
import { BallastCalculations } from "@/components/calculations/BallastCalculations";

export default function Ballast() {
  return (
    <MobileLayout>
      <CalculationPage title="Ballast Calculations">
        <BallastCalculations />
      </CalculationPage>
    </MobileLayout>
  );
}
