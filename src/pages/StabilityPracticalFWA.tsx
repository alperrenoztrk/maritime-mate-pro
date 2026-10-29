import { Droplets } from "lucide-react";
import { FieldGrid, FormulaLine, NumberField, ResultTable, ToolNotice, ToolPage, ToolSection, type ResultRow } from "@/components/tools/ToolKit";
import { fmt, parseNumber } from "@/components/tools/format";
import { useStabilityForm } from "@/components/stability/stabilityForms";

/** Load line: FWA, DWA and the draft allowed in dock water. */
export default function StabilityPracticalFWAPage() {
  const [f, setF] = useStabilityForm("fwa", { displacement: "", tpc: "", fwa: "", density: "", loadLineDraft: "", present: "" });
  const set = (k: keyof typeof f) => (v: string) => setF((p) => ({ ...p, [k]: v }));
  const disp = parseNumber(f.displacement);
  const tpc = parseNumber(f.tpc);
  const fwaTyped = parseNumber(f.fwa);
  const fwaCm = Number.isFinite(fwaTyped) ? fwaTyped / 10 : disp > 0 && tpc > 0 ? disp / (40 * tpc) : Number.NaN; // FWA (mm) typed → cm
  const rho = parseNumber(f.density);
  const llDraft = parseNumber(f.loadLineDraft);
  const present = parseNumber(f.present);

  const rows: ResultRow[] = [];
  if (Number.isFinite(fwaCm)) rows.push({ label: "Fresh water allowance (FWA)", value: `${fmt(fwaCm * 10, 0)} mm` });
  let dwaCm = Number.NaN;
  if (Number.isFinite(fwaCm) && rho >= 1.0 && rho <= 1.025) {
    dwaCm = (fwaCm * (1.025 - rho)) / 0.025;
    rows.push({ label: "Dock water allowance (DWA)", value: `${fmt(dwaCm * 10, 0)} mm`, emphasis: true });
  }
  if (Number.isFinite(dwaCm) && llDraft > 0) {
    const allowed = llDraft + dwaCm / 100;
    rows.push({ label: "Maximum draft in this dock water", value: `${fmt(allowed, 3)} m`, emphasis: true });
    if (present > 0) {
      const remaining = (allowed - present) * 100;
      rows.push({ label: "Remaining to that draft", value: `${fmt(remaining, 1)} cm` });
      if (tpc > 0) rows.push({ label: "Cargo still to load (TPC in dock water)", value: `${fmt(remaining * tpc * (rho / 1.025), 0)} t` });
    }
  }

  return (
    <ToolPage title="FWA and Dock Water Allowance" icon={Droplets}>
      <ToolSection title="Load line allowances" icon={Droplets} description="International Convention on Load Lines, 1966: FWA is marked on the Load Line Certificate.">
        <FormulaLine>FWA (mm) = Δ / (4 · TPC) · DWA = FWA × (1.025 − ρ) / 0.025</FormulaLine>
        <FieldGrid>
          <NumberField id="fwa-fwa" label="FWA from the certificate" unit="mm" value={f.fwa} onChange={set("fwa")} placeholder="220" help="Empty: worked out from Δ and TPC below." />
          <NumberField id="fwa-disp" label="Displacement at summer draft" unit="t" value={f.displacement} onChange={set("displacement")} placeholder="35000" />
          <NumberField id="fwa-tpc" label="TPC in salt water at summer draft" unit="t/cm" value={f.tpc} onChange={set("tpc")} placeholder="40" />
          <NumberField id="fwa-rho" label="Dock water density" unit="t/m³" value={f.density} onChange={set("density")} placeholder="1.010" error={f.density && !(rho >= 1.0 && rho <= 1.025) ? "Expected 1.000 – 1.025 t/m³" : undefined} />
          <NumberField id="fwa-ll" label="Load line draft for the zone" unit="m" value={f.loadLineDraft} onChange={set("loadLineDraft")} placeholder="12.20" help="Summer, winter or tropical as applicable on departure." />
          <NumberField id="fwa-now" label="Present mean draft (optional)" unit="m" value={f.present} onChange={set("present")} placeholder="12.05" />
        </FieldGrid>
        {rows.length > 0 ? <ResultTable title="Allowances" rows={rows} /> : <ToolNotice>Enter the FWA, or Δ and TPC.</ToolNotice>}
        <ToolNotice>
          The ship may be loaded so that the load line is submerged by the DWA in dock water, provided she floats at
          the load line on reaching salt water and any draft limits on the passage are respected.
        </ToolNotice>
      </ToolSection>
    </ToolPage>
  );
}
