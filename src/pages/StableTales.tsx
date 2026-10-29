import { Anchor, Ruler, Wrench } from "lucide-react";
import {
  dockingGmLoss,
  dockingGmLossByKg,
  dockingUpthrust,
  gmFromInclining,
  heelFromPendulum,
  maxTrimForDocking,
} from "@/lib/calc/stability";
import { stability } from "@/data/courseContent/stability";
import { CalculatorCard } from "@/components/courseContent/CalculatorCard";
import { FieldGrid, FormulaLine, NumberField, ResultTable, ToolNotice, ToolPage, ToolSection, type ResultRow } from "@/components/tools/ToolKit";
import { fmt, parseNumber } from "@/components/tools/format";
import { StabilityDisclaimer } from "@/components/stability/StabilityDisclaimer";
import { savedLoadingResult, useStabilityForm } from "@/components/stability/stabilityForms";

/** Stability toolbox: pendulum / inclining test, dry-docking, rolling period. */
export default function StableTalesPage() {
  return (
    <ToolPage title="Stability Toolbox" icon={Wrench}>
      <StabilityDisclaimer />
      <PendulumSection />
      <DockingSection />
      {["roll-period", "gm-from-roll"].map((id) => {
        const entry = stability.entries.find((e) => e.id === id);
        return entry ? <CalculatorCard key={id} entry={entry} /> : null;
      })}
    </ToolPage>
  );
}

function PendulumSection() {
  const [f, setF] = useStabilityForm("pendulum", { deflection: "", length: "", weight: "", shift: "", displacement: "" });
  const set = (k: keyof typeof f) => (v: string) => setF((p) => ({ ...p, [k]: v }));
  const d = parseNumber(f.deflection);
  const l = parseNumber(f.length);
  const w = parseNumber(f.weight);
  const s = parseNumber(f.shift);
  const disp = parseNumber(f.displacement);
  const rows: ResultRow[] = [];
  if (d > 0 && l > 0) {
    rows.push({ label: "Heel", value: `${fmt(heelFromPendulum(d, l), 2)}°`, emphasis: true });
    if (w > 0 && s > 0 && disp > 0) rows.push({ label: "GM from the inclining", value: `${fmt(gmFromInclining(w, s, disp, d, l), 3)} m`, emphasis: true });
  }
  return (
    <ToolSection title="Pendulum and inclining test" icon={Ruler} description="Heel from a plumb line; with a known weight moved across, GM follows (inclining experiment).">
      <FormulaLine>tan θ = deflection / length · GM = w · d / (Δ · tan θ)</FormulaLine>
      <FieldGrid>
        <NumberField id="pd-def" label="Horizontal deflection" unit="m" value={f.deflection} onChange={set("deflection")} placeholder="0.150" />
        <NumberField id="pd-len" label="Pendulum length" unit="m" value={f.length} onChange={set("length")} placeholder="6.00" />
        <NumberField id="pd-w" label="Inclining weight (optional)" unit="t" value={f.weight} onChange={set("weight")} placeholder="10" />
        <NumberField id="pd-s" label="Transverse shift of the weight" unit="m" value={f.shift} onChange={set("shift")} placeholder="12" />
        <NumberField id="pd-disp" label="Displacement incl. the weight" unit="t" value={f.displacement} onChange={set("displacement")} placeholder="5000" />
      </FieldGrid>
      {rows.length > 0 && <ResultTable title="Pendulum" rows={rows} />}
      <ToolNotice>An official inclining experiment follows the IS Code Part B Annex 1 procedure (several shifts, plotted).</ToolNotice>
    </ToolSection>
  );
}

function DockingSection() {
  const loading = savedLoadingResult();
  const [f, setF] = useStabilityForm("docking", {
    displacement: loading ? loading.displacement.toFixed(1) : "",
    km: loading ? loading.km.toFixed(3) : "",
    kg: loading ? loading.kgFluid.toFixed(3) : "",
    mctc: "",
    trim: "",
    distance: "",
    minGm: "0.15",
  });
  const set = (k: keyof typeof f) => (v: string) => setF((p) => ({ ...p, [k]: v }));
  const disp = parseNumber(f.displacement);
  const km = parseNumber(f.km);
  const kg = parseNumber(f.kg);
  const mctc = parseNumber(f.mctc);
  const trim = parseNumber(f.trim);
  const l = parseNumber(f.distance);
  const minGm = parseNumber(f.minGm) || 0;
  const rows: ResultRow[] = [];
  if (disp > 0 && km > 0 && Number.isFinite(kg) && mctc > 0 && l > 0) {
    const gm = km - kg;
    if (Number.isFinite(trim) && trim > 0) {
      const p = dockingUpthrust(mctc, trim, l);
      const lossKm = dockingGmLoss(p, km, disp);
      rows.push(
        { label: "Upthrust at the critical instant (P)", value: `${fmt(p, 1)} t` },
        { label: "Virtual loss of GM (P·KM/Δ)", value: `${fmt(lossKm, 3)} m` },
        { label: "Virtual loss of GM (P·KG/(Δ−P))", value: `${fmt(dockingGmLossByKg(p, kg, disp), 3)} m` },
        { label: "Effective GM at the critical instant", value: `${fmt(gm - lossKm, 3)} m`, emphasis: true },
      );
    }
    const max = maxTrimForDocking(disp, gm, km, mctc, l, minGm);
    rows.push({ label: `Largest trim keeping GM ≥ ${fmt(minGm, 2)} m`, value: max.trimCm > 0 ? `${fmt(max.trimCm, 0)} cm by the stern` : "None — improve GM first", emphasis: true });
  }
  return (
    <ToolSection
      title="Dry-docking"
      icon={Anchor}
      description="With trim by the stern the stern touches the blocks first; the upthrust P is largest just before she settles fore and aft."
    >
      <FormulaLine>P = MCTC · t / l · loss of GM = P · KM / Δ</FormulaLine>
      <FieldGrid>
        <NumberField id="dk-disp" label="Displacement" unit="t" value={f.displacement} onChange={set("displacement")} placeholder="28350" />
        <NumberField id="dk-km" label="KM" unit="m" value={f.km} onChange={set("km")} placeholder="11.00" />
        <NumberField id="dk-kg" label="KG fluid" unit="m" value={f.kg} onChange={set("kg")} placeholder="8.34" />
        <NumberField id="dk-mctc" label="MCTC" unit="t·m/cm" value={f.mctc} onChange={set("mctc")} placeholder="420" />
        <NumberField id="dk-trim" label="Trim by the stern on entering" unit="cm" value={f.trim} onChange={set("trim")} placeholder="80" />
        <NumberField id="dk-l" label="LCF to the after point of contact (l)" unit="m" value={f.distance} onChange={set("distance")} placeholder="85" />
        <NumberField id="dk-min" label="Minimum GM to keep" unit="m" value={f.minGm} onChange={set("minGm")} placeholder="0.15" help="Use the dock's or the Class's requirement if given." />
      </FieldGrid>
      {rows.length > 0 ? <ResultTable title="Docking" rows={rows} /> : <ToolNotice>Enter the displacement, KM, KG, MCTC and l.</ToolNotice>}
    </ToolSection>
  );
}
