import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Waves } from "lucide-react";
import oceanWaves from "@/assets/maritime/ocean-waves.jpg";
import { HydrodynamicsCalculations } from "@/components/calculations/HydrodynamicsCalculations";
import { CalculationLayout } from "@/components/layout/CalculationLayout";
import { CalculationCard } from "@/components/ui/calculation-card";

const Hydrodynamics = () => {
  return (
    <CalculationLayout
      title="Hydrodynamic Calculations"
      icon={Waves}
      hero={{
        title: "Hydrodynamic Calculations",
        imageSrc: oceanWaves,
        imageAlt: "Ocean Waves",
      }}
      below={
        <div className="text-center text-sm text-muted-foreground">
          Water resistance, ship power requirements, wave analysis and more
        </div>
      }
    >
      <CalculationCard>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-xl">
            <Waves className="h-6 w-6 text-sky-600 dark:text-sky-400" />
            Hydrodynamic Calculation Module
          </CardTitle>
        </CardHeader>
        <CardContent>
          <HydrodynamicsCalculations />
        </CardContent>
      </CalculationCard>
    </CalculationLayout>
  );
};

export default Hydrodynamics;