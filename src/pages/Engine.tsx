import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cog } from "lucide-react";
import { EngineCalculations } from "@/components/calculations/EngineCalculations";
import { DiagramViewer } from "@/components/ui/diagram-viewer";
import shipBridge from "@/assets/maritime/ship-bridge.jpg";
import { CalculationLayout } from "@/components/layout/CalculationLayout";
import { CalculationCard } from "@/components/ui/calculation-card";
import { FormulaCard } from "@/components/ui/formula-card";

const Engine = () => {
  return (
    <CalculationLayout
      title="Machine Calculations"
      icon={Cog}
      hero={{
        title: "Machine Calculations",
        imageSrc: shipBridge,
        imageAlt: "Ship Bridge Control Panel",
      }}
      maxWidthClassName="max-w-6xl"
      rightRail={
        <FormulaCard
          sections={[
            {
              title: "Power Formulas",
              accent: "blue",
              lines: [
                { label: "Braking Power", formula: "BHP = IHP × ηmech" },
                { label: "Shaft Power", formula: "SHP = BHP × ηtrans" },
                { label: "Effective Power", formula: "EHP = SHP × ηprop" },
              ],
            },
            {
              title: "Fuel Formulas",
              accent: "green",
              lines: [
                { label: "SFOC Interpolation", formula: "SFOC = a × Load² + b × Load + c" },
                { label: "Fuel Consumption", formula: "FC = Power × SFOC / 1000" },
                { label: "Daily Consumption", formula: "Daily = FC × 24" },
              ],
            },
            {
              title: "Heat Transfer Formulas",
              accent: "orange",
              lines: [
                { label: "Heat Exchange Area", formula: "A = Q / (U × LMTD)" },
                { label: "LMTD", formula: "LMTD = (ΔT₁ - ΔT₂) / ln(ΔT₁/ΔT₂)" },
                { label: "Heat Load", formula: "Q = m × cp × ΔT" },
              ],
            },
            {
              title: "Emission Formulas",
              accent: "red",
              lines: [
                { label: "NOx Emission", formula: "NOx = EF × FC × CF" },
                { label: "SOx Emission", formula: "SOx = FC × S% × 2" },
                { label: "CO₂ Emission", formula: "CO₂ = FC × CF × 44/12" },
              ],
            },
            {
              title: "Efficiency Formulas",
              accent: "purple",
              lines: [
                { label: "Thermal Efficiency", formula: "ηth = P / (FC × LCV)" },
                { label: "Overall Efficiency", formula: "ηtotal = ηth × ηmech × ηprop" },
                { label: "EEOI", formula: "EEOI = CO₂ / (Cargo × Distance)" },
              ],
            },
          ]}
          symbolsNote={
            <>
              <strong>Symbols:</strong>
              <br />
              P: power, η: efficiency, FC: fuel consumption
              <br />
              Q: heat, U: heat transfer coefficient, LMTD: log avg. temp. difference
              <br />
              EF: emission factor, CF: carbon factor
            </>
          }
        />
      }
      below={
        <>
          <DiagramViewer
            title="Machine System Flow Diagram"
            data={{
              mcrPower: 8500,
              currentLoad: 75,
              fuelType: "HFO",
              seawaterInletTemp: 32,
            }}
            diagramType="engine"
            className="shadow-lg border-0 bg-white/80 dark:bg-slate-900/50"
          />

          <div className="text-center text-sm text-muted-foreground">
            Engine performance, fuel efficiency analysis and power calculations
          </div>
        </>
      }
    >
      <CalculationCard>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-xl">
            <Cog className="h-6 w-6 text-sky-600 dark:text-sky-400" />
            Machine Calculation Module
          </CardTitle>
        </CardHeader>
        <CardContent>
          <EngineCalculations />
        </CardContent>
      </CalculationCard>
    </CalculationLayout>
  );
};

export default Engine;