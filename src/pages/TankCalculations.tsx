import { Droplets } from "lucide-react";
import {
  ProfessionalCalculator, type ProfessionalGroup,
} from "@/components/calculations/ProfessionalCalculator";
import { estimateRectangularTank } from "@/lib/toolCalculations";

const GROUPS: ProfessionalGroup[] = [{
  title: "Tank Measurements",
  description: "Simplified vertical prismatic tank with a constant horizontal area.",
  fields: [
    { key: "area", label: "Horizontal cross-sectional area", unit: "m²", min: 0.000001, placeholder: "50" },
    { key: "height", label: "Liquid height from tank bottom", unit: "m", min: 0, placeholder: "2.5" },
    { key: "density", label: "Liquid density", unit: "kg/m³", min: 0.000001, defaultValue: "1025" },
  ],
}];

export default function TankCalculationsPage() {
  return <ProfessionalCalculator title="Rectangular Tank Estimate" icon={Droplets}
    description="Calculate training estimates for volume, liquid mass and vertical mass moment about the tank bottom."
    groups={GROUPS} resultTitle="Tank Quantity Results"
    formula="V = A × h; m = V × ρ / 1000; vertical moment (t·m) = m × h/2"
    solve={({ area, height, density }) => {
      const r = estimateRectangularTank(area, height, density);
      return {
        results: [
          { label: "Volume", value: `${r.volumeM3.toFixed(3)} m³`, primary: true },
          { label: "Liquid mass", value: `${r.massTonnes.toFixed(3)} t`, primary: true },
          { label: "Vertical mass moment", value: `${r.verticalMomentTonneMetres.toFixed(3)} t·m` },
        ],
        steps: [
          `Volume = ${area} × ${height} = ${r.volumeM3.toFixed(3)} m³.`,
          `Liquid mass = ${r.volumeM3.toFixed(3)} × ${density} / 1000 = ${r.massTonnes.toFixed(3)} t.`,
          `Mass moment about bottom = ${r.massTonnes.toFixed(3)} × ${height} / 2 = ${r.verticalMomentTonneMetres.toFixed(3)} t·m.`,
        ],
      };
    }}
    limitations="This is not a sounding table, free-surface correction, or a vessel stability result. Use approved tank calibration and sounding/ullage tables for an actual tank." />;
}
export { TankCalculationsPage as TankCalculations };
