import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { MobileLayout } from "@/components/MobileLayout";
import { shipTypes } from "@/data/shipOperationsData";

export default function ShipOperationsPage() {
  return (
    <MobileLayout>
      <div className="relative min-h-screen bg-background px-4 pb-24 pt-6">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 left-1/4 h-40 w-40 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute top-40 right-0 h-48 w-48 rounded-full bg-accent/5 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto flex max-w-lg flex-col gap-6">
          <header className="space-y-1">
            <h1 className="text-xl font-bold tracking-tight text-foreground">
              Gemi Operasyonları
            </h1>
          </header>

          <div className="flex flex-col gap-3">
            {shipTypes.map((ship) => (
              <Link
                key={ship.id}
                to={`/ship-operations/${ship.id}`}
                className="group flex items-center gap-4 rounded-2xl border border-border/30 bg-card/60 p-4 backdrop-blur-sm transition-all duration-200 hover:border-primary/30 hover:bg-card/80 active:scale-[0.98]"
              >
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-border/30">
                  <img
                    src={ship.image}
                    alt={`${ship.label} gemisi`}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                  <div
                    className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${ship.color} mix-blend-overlay`}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground leading-tight">
                    {ship.label}
                  </p>
                </div>
                <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground/40 transition-transform group-hover:translate-x-0.5" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </MobileLayout>
  );
}
