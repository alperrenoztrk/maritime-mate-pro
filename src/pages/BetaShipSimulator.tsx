import { Ship } from "lucide-react";
import { Stability3DSim } from "@/components/stability/Stability3DSim";

export default function BetaShipSimulator() {
  return (
    <div
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 px-4 pb-24 pt-[max(4rem,calc(env(safe-area-inset-top)+3.25rem))] dark:from-[hsl(20,40%,6%)] dark:via-[hsl(20,40%,8%)] dark:to-[hsl(20,40%,10%)]"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/4 h-48 w-48 rounded-full bg-amber-500/10 blur-3xl" />
        <div className="absolute top-10 right-10 h-56 w-56 rounded-full bg-orange-500/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-3xl flex-col gap-6">
        <header className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 p-3 text-white shadow-md">
              <Ship className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                3D Gemi Stabilite Simülasyonu
              </h1>
            </div>
          </div>
        </header>

        <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4 text-xs text-amber-800 dark:text-amber-200">
          <strong className="font-semibold">Uyarı:</strong> Beta özellikler
          deneme aşamasındadır. Simülasyon çıktılarını eğitim amaçlı kullanın ve
          gerçek stabilite kararlarında resmi hesaplamalarla doğrulayın.
        </div>

        <section className="rounded-2xl border border-border/60 bg-card/90 p-5">
          <Stability3DSim />
        </section>
      </div>
    </div>
  );
}
