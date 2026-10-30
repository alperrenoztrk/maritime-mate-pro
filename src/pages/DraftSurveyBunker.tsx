import { Fuel } from "lucide-react";
import { ProfessionalCalculator, type ProfessionalGroup } from "@/components/calculations/ProfessionalCalculator";
import { estimateBunkerMass } from "@/lib/toolCalculations";

const GROUPS: ProfessionalGroup[] = [{
  title: "Fuel and Tank Data",
  description: "Use corrected net observed volume from vessel tank tables and a table-derived VCF.",
  fields: [
    { key: "volume", label: "Net observed fuel volume", unit: "m³", min: 0, placeholder: "125",
      help: "After approved tank calibration, trim/list and free-water corrections." },
    { key: "vcf", label: "Volume correction factor to 15 °C", min: 0.000001, placeholder: "0.991",
      help: "Use the applicable petroleum table; not a fixed generic temperature coefficient." },
    { key: "density", label: "Certified density at 15 °C", unit: "t/m³", min: 0.000001, placeholder: "0.950" },
  ],
}];

export default function DraftSurveyBunker() {
  return <ProfessionalCalculator title="Bunker Quantity Estimate" icon={Fuel}
    description="Estimate oil mass from tank volume and certified fuel properties, not from vessel draft change."
    groups={GROUPS} resultTitle="Bunker Quantity Results"
    formula="V(15 °C) = Net observed volume × VCF; Mass (t) = V(15 °C) × density at 15 °C"
    solve={({ volume, vcf, density }) => {
      const r = estimateBunkerMass(volume, vcf, density);
      return {
        results: [
          { label: "Estimated bunker mass", value: `${r.massTonnes.toFixed(3)} t`, primary: true },
          { label: "Standard volume at 15 °C", value: `${r.standardVolumeM3.toFixed(3)} m³` },
        ],
        steps: [
          `Standard volume = ${volume} × ${vcf} = ${r.standardVolumeM3.toFixed(3)} m³.`,
          `Mass = ${r.standardVolumeM3.toFixed(3)} × ${density} = ${r.massTonnes.toFixed(3)} t.`,
        ],
      };
    }}
    limitations="This calculator does not determine net observed tank volume or VCF. Approved sounding tables, free-water deductions, tank corrections, temperature measurements and applicable petroleum standards are required for bunker surveys." />;
}
