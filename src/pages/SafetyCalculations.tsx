import { MobileLayout } from "@/components/MobileLayout";
import { CalculationPage } from "@/components/ui/calculation-list";
import { SafetyCalculations } from "@/components/calculations/SafetyCalculations";

const SafetyCalculationsPage = () => {
  return (
    <MobileLayout>
      <CalculationPage
        title="Safety Calculations"
      >
        <SafetyCalculations />
      </CalculationPage>
    </MobileLayout>
  );
};

export default SafetyCalculationsPage;
