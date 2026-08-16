import { MobileLayout } from "@/components/MobileLayout";
import { StabilityCalculations } from "@/components/calculations/StabilityCalculations";
import { InteractiveStabilityTools } from "@/components/stability/InteractiveStabilityTools";
import { CalculationGridScreen } from "@/components/ui/calculation-grid";
import { Calculator } from "lucide-react";

export default function StabilityCalculationsPage() {
  return (
    <MobileLayout>
      <CalculationGridScreen
        eyebrow="Stabilite"
        title="Stability Calculations"
      >
        <div className="space-y-8">
          <StabilityCalculations />
          <section className="rounded-2xl border border-border/50 bg-card/80 p-5">
            <div className="mb-3 flex items-center gap-2">
              <Calculator className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold text-foreground">İnteraktif Stabilite Hesaplamaları</h2>
            </div>
            <div className="mt-4">
              <InteractiveStabilityTools />
            </div>
          </section>
        </div>
      </CalculationGridScreen>
    </MobileLayout>
  );
}
