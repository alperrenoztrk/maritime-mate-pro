import { MobileLayout } from "@/components/MobileLayout";
import { CalculationList, CalculationPage, type CalculationListItem } from "@/components/ui/calculation-list";
import { Button } from "@/components/ui/button";
import { Anchor, ClipboardList, Droplets, Fuel, Gauge, Package, Scale, Ship, Sigma } from "lucide-react";
import { Link } from "react-router-dom";

const cargoItems: CalculationListItem[] = [
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
      <CalculationPage
        title="Cargo Handling and Stowage"
        actions={
          <Button asChild variant="secondary" size="sm" className="gap-2">
              <Link to="/cargo/formulas">
                <Sigma className="h-4 w-4" />
                Formulas
              </Link>
          </Button>
        }
      >
        <div className="space-y-6">
          <CalculationList items={cargoItems} />
        </div>
      </CalculationPage>
    </MobileLayout>
  );
}
