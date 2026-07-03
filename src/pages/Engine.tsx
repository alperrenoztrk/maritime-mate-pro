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
      title="Makine Hesaplamaları"
      icon={Cog}
      hero={{
        title: "Makine Hesaplamaları",
        imageSrc: shipBridge,
        imageAlt: "Ship Bridge Control Panel",
      }}
      maxWidthClassName="max-w-6xl"
      rightRail={
        <FormulaCard
          sections={[
            {
              title: "Güç Formülleri",
              accent: "blue",
              lines: [
                { label: "Fren Gücü", formula: "BHP = IHP × ηmech" },
                { label: "Şaft Gücü", formula: "SHP = BHP × ηtrans" },
                { label: "Efektif Güç", formula: "EHP = SHP × ηprop" },
              ],
            },
            {
              title: "Yakıt Formülleri",
              accent: "green",
              lines: [
                { label: "SFOC Interpolasyon", formula: "SFOC = a × Load² + b × Load + c" },
                { label: "Yakıt Tüketimi", formula: "FC = Power × SFOC / 1000" },
                { label: "Günlük Tüketim", formula: "Daily = FC × 24" },
              ],
            },
            {
              title: "Isı Transfer Formülleri",
              accent: "orange",
              lines: [
                { label: "Isı Değişim Alanı", formula: "A = Q / (U × LMTD)" },
                { label: "LMTD", formula: "LMTD = (ΔT₁ - ΔT₂) / ln(ΔT₁/ΔT₂)" },
                { label: "Isı Yükü", formula: "Q = m × cp × ΔT" },
              ],
            },
            {
              title: "Emisyon Formülleri",
              accent: "red",
              lines: [
                { label: "NOx Emisyonu", formula: "NOx = EF × FC × CF" },
                { label: "SOx Emisyonu", formula: "SOx = FC × S% × 2" },
                { label: "CO₂ Emisyonu", formula: "CO₂ = FC × CF × 44/12" },
              ],
            },
            {
              title: "Verimlilik Formülleri",
              accent: "purple",
              lines: [
                { label: "Termal Verimlilik", formula: "ηth = P / (FC × LCV)" },
                { label: "Genel Verimlilik", formula: "ηtotal = ηth × ηmech × ηprop" },
                { label: "EEOI", formula: "EEOI = CO₂ / (Cargo × Distance)" },
              ],
            },
          ]}
          symbolsNote={
            <>
              <strong>Semboller:</strong>
              <br />
              P: güç, η: verimlilik, FC: yakıt tüketimi
              <br />
              Q: ısı, U: ısı transfer katsayısı, LMTD: log ort. sıc. farkı
              <br />
              EF: emisyon faktörü, CF: karbon faktörü
            </>
          }
        />
      }
      below={
        <>
          <DiagramViewer
            title="Makine Sistemi Akış Diyagramı"
            data={{
              mcrPower: 8500,
              currentLoad: 75,
              fuelType: "HFO",
              seawaterInletTemp: 32,
            }}
            diagramType="engine"
            className="shadow-lg border-0 bg-white/80 dark:bg-slate-900/50 backdrop-blur-sm"
          />

          <div className="text-center text-sm text-muted-foreground">
            Motor performansı, yakıt verimlilik analizi ve güç hesaplamaları
          </div>
        </>
      }
    >
      <CalculationCard>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-xl">
            <Cog className="h-6 w-6 text-sky-600 dark:text-sky-400" />
            Makine Hesaplama Modülü
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