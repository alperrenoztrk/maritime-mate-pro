import { Ship } from "lucide-react";
import { Stability3DSim } from "@/components/stability/Stability3DSim";

export default function BetaShipSimulator() {
  return (
    <div
      className="relative min-h-screen overflow-hidden bg-background px-4 pb-24 pt-[max(4rem,calc(env(safe-area-inset-top)+3.25rem))]"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/4 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute top-10 right-10 h-56 w-56 rounded-full bg-accent/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-3xl flex-col gap-6">
        <header className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-primary/15 p-3 text-primary">
              <Ship className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                Ship Simulator
              </h1>
            </div>
          </div>
        </header>

        <div className="rounded-2xl border border-border/60 bg-muted/30 p-4 text-xs text-muted-foreground">
          <strong className="font-semibold">Warning:</strong> Beta features are experimental. Use the simulation output for training purposes and verify it against official calculations before making real stability decisions.
        </div>

        <section className="rounded-2xl border border-border/60 bg-card/90 p-5">
          <Stability3DSim />
        </section>
      </div>
    </div>
  );
}
