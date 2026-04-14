import { MobileLayout } from "@/components/MobileLayout";
import { StabilityCalculations } from "@/components/calculations/StabilityCalculations";
import { InteractiveStabilityTools } from "@/components/stability/InteractiveStabilityTools";
import { Stability3DSim } from "@/components/stability/Stability3DSim";
import { CalculationGridScreen } from "@/components/ui/calculation-grid";
import { Calculator, Ship } from "lucide-react";

export default function StabilityCalculationsPage() {
  return (
    <MobileLayout>
      <CalculationGridScreen
        eyebrow="Stabilite"
        title="Stabilite Hesaplamaları"
        subtitle="Gemi stabilitesiyle ilgili tüm hesaplara tek şablondan erişin"
      >
        <div className="space-y-8">
          <StabilityCalculations />
          <section className="rounded-2xl border border-border/50 bg-card/80 p-5 backdrop-blur">
            <div className="mb-3 flex items-center gap-2">
              <Calculator className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold text-foreground">İnteraktif Stabilite Hesaplamaları</h2>
            </div>
            <p className="text-sm text-muted-foreground">
              GM, KG, serbest yüzey ve yatma etkilerini sahada kullanılan hesaplamalarla deneyimleyin.
            </p>
            <div className="mt-4">
              <InteractiveStabilityTools />
            </div>
          </section>
          <section className="rounded-2xl border border-primary/20 bg-primary/5 p-5 backdrop-blur">
            <div className="mb-3 flex items-center gap-2">
              <Ship className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold text-foreground">3D Gemi Stabilite Simülasyonu</h2>
            </div>
            <p className="text-sm text-muted-foreground">
              GM ve KG değerlerini değiştirerek geminin meyil davranışını gerçek zamanlı izleyin.
            </p>
            <div className="mt-4">
              <Stability3DSim />
            </div>
          </section>
        </div>
      </CalculationGridScreen>
    </MobileLayout>
  );
}
