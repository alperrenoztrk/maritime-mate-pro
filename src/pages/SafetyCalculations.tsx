import { MobileLayout } from "@/components/MobileLayout";
import { CalculationGridScreen } from "@/components/ui/calculation-grid";
import { SafetyCalculations } from "@/components/calculations/SafetyCalculations";

const SafetyCalculationsPage = () => {
  return (
    <MobileLayout>
      <CalculationGridScreen
        eyebrow="Security"
        title="Security Calculations"
      >
        <SafetyCalculations />
      </CalculationGridScreen>
    </MobileLayout>
  );
};

export default SafetyCalculationsPage;
