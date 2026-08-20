import { MobileLayout } from "@/components/MobileLayout";
import { CalculationGrid, CalculationGridScreen, type CalculationGridItem } from "@/components/ui/calculation-grid";
import { Button } from "@/components/ui/button";
import { Anchor, ClipboardList, Droplets, Fuel, Gauge, Package, Scale, Ship, Sigma } from "lucide-react";
import { Link } from "react-router-dom";

const cargoItems: CalculationGridItem[] = [
  { id: "draft", title: "Draft Survey Fast", icon: Scale, to: "/cargo/calculations/draft-survey" },
  { id: "preloading", title: "Preparation Before Loading", icon: ClipboardList, to: "/cargo/calculations/preloading" },
  { id: "intermediate", title: "Mid-Phase Tracking", icon: Gauge, to: "/cargo/calculations/intermediate" },
  { id: "postdischarge", title: "Post-Unloading Control", icon: Package, to: "/cargo/calculations/postdischarge" },
  { id: "comparative", title: "Draft Survey Comparison", icon: Ship, to: "/cargo/calculations/comparative" },
  { id: "ballast", title: "Ballast & Trim Balance", icon: Anchor, to: "/cargo/calculations/ballast" },
  { id: "density", title: "Density Correction", icon: Droplets, to: "/cargo/calculations/density" },
  { id: "bunker", title: "Bunker and Fuel Difference", icon: Fuel, to: "/cargo/calculations/bunker" },
];

export default function CargoCalculationsPage() {
  return (
    <MobileLayout>
      <CalculationGridScreen
        eyebrow="Cargo Handling and Stowage"
        title="Cargo Handling and Stowage"
      >
        <div className="space-y-6">
          <div className="flex justify-end">
            <Link to="/cargo/formulas">
              <Button variant="secondary" size="sm" className="gap-2">
                <Sigma className="h-4 w-4" />
                Formulas
              </Button>
            </Link>
          </div>

          <CalculationGrid items={cargoItems} className="sm:grid-cols-2" />

          <p className="text-center text-sm text-slate-300">
            Each calculation opens on a separate page
          </p>
        </div>
      </CalculationGridScreen>
    </MobileLayout>
  );
}
