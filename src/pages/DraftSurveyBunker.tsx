import { Fuel, Plus, Scale, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { oilQuantity } from "@/lib/calc/petroleum";
import {
  FieldGrid,
  FormulaLine,
  NumberField,
  ResultTable,
  ToolNotice,
  ToolPage,
  ToolSection,
  type ResultRow,
} from "@/components/tools/ToolKit";
import { fmt, parseNumber, signed } from "@/components/tools/format";
import { useStoredForm } from "@/components/draftSurvey/draftSurveyForms";

interface BunkerTank {
  name: string;
  volume: string;
  temperature: string;
}

const DEFAULT_TANKS: BunkerTank[] = [
  { name: "No.1 FO tank P", volume: "", temperature: "" },
  { name: "No.1 FO tank S", volume: "", temperature: "" },
];

export default function DraftSurveyBunker() {
  const [state, setState] = useStoredForm("bunker", { density15: "", bdn: "", tanks: DEFAULT_TANKS });
  const [check, setCheck] = useStoredForm("bunker-check", { before: "", after: "", otherChanges: "0" });

  const rho15Gml = parseNumber(state.density15);
  const rho15 = rho15Gml * 1000; // kg/m³
  const densityOk = Number.isFinite(rho15) && rho15 >= 839 && rho15 <= 1075;

  const tankResults = state.tanks.map((tank) => {
    const volume = parseNumber(tank.volume);
    const temp = parseNumber(tank.temperature);
    if (!densityOk || !Number.isFinite(volume) || !Number.isFinite(temp)) return null;
    return oilQuantity(volume, rho15, temp);
  });
  const totalAir = tankResults.reduce((sum, q) => sum + (q?.tonnesInAir ?? 0), 0);
  const totalV15 = tankResults.reduce((sum, q) => sum + (q?.volume15 ?? 0), 0);
  const counted = tankResults.filter(Boolean).length;
  const bdn = parseNumber(state.bdn);

  const rows: ResultRow[] = [
    ...state.tanks.flatMap((tank, index) => {
      const q = tankResults[index];
      return q ? [{ label: tank.name || "Tank", value: `VCF ${q.vcf.toFixed(4)} · ${fmt(q.volume15, 3)} m³ · ${fmt(q.tonnesInAir, 3)} t`, hint: "Volume at 15 °C · weight in air" }] : [];
    }),
    { label: "Total at 15 °C", value: `${fmt(totalV15, 3)} m³` },
    { label: "Total weight in air", value: `${fmt(totalAir, 3)} t`, emphasis: true },
  ];
  if (Number.isFinite(bdn) && bdn > 0 && counted > 0) {
    rows.push({ label: "Difference against BDN", value: `${signed(totalAir - bdn, 3)} t (${signed(((totalAir - bdn) / bdn) * 100, 2)} %)` });
  }

  const updateTank = (index: number, patch: Partial<BunkerTank>) =>
    setState((prev) => ({ ...prev, tanks: prev.tanks.map((tank, i) => (i === index ? { ...tank, ...patch } : tank)) }));

  const before = parseNumber(check.before);
  const after = parseNumber(check.after);
  const other = parseNumber(check.otherChanges) || 0;

  return (
    <ToolPage title="Bunker Quantity" icon={Fuel}>
      <ToolNotice>
        Quantity received = (sum of tank quantities after bunkering) − (before). Volumes come from the sounding/ullage
        tables corrected for trim and list; the density at 15 °C is from the bunker delivery note (BDN) or the lab.
      </ToolNotice>

      <ToolSection title="Tank quantities" icon={Fuel} description="ASTM D1250 Table 54B (fuel oils) volume correction to 15 °C and weight in air.">
        <FormulaLine>V₁₅ = V obs × VCF · W = V₁₅ × (ρ₁₅ − 0.0011)</FormulaLine>
        <FieldGrid>
          <NumberField id="bk-density" label="Density at 15 °C" unit="g/ml" value={state.density15} onChange={(v) => setState((p) => ({ ...p, density15: v }))} placeholder="0.9850" error={state.density15 && !densityOk ? "Fuel oil range 0.839 – 1.075 g/ml" : undefined} />
          <NumberField id="bk-bdn" label="BDN quantity (optional)" unit="t" value={state.bdn} onChange={(v) => setState((p) => ({ ...p, bdn: v }))} placeholder="850" />
        </FieldGrid>
        <div className="space-y-2">
          <div className="grid grid-cols-[minmax(0,1fr)_6rem_5rem_2.5rem] gap-2 text-micro font-semibold text-muted-foreground">
            <span>Tank</span><span>Volume (m³)</span><span>Temp (°C)</span><span />
          </div>
          {state.tanks.map((tank, index) => (
            <div key={index} className="grid grid-cols-[minmax(0,1fr)_6rem_5rem_2.5rem] items-center gap-2">
              <Input aria-label="Tank name" className="h-9" value={tank.name} onChange={(e) => updateTank(index, { name: e.target.value })} />
              <Input aria-label={`${tank.name || "Tank"} observed volume`} className="h-9" type="number" inputMode="decimal" step="any" value={tank.volume} onChange={(e) => updateTank(index, { volume: e.target.value })} />
              <Input aria-label={`${tank.name || "Tank"} temperature`} className="h-9" type="number" inputMode="decimal" step="any" value={tank.temperature} onChange={(e) => updateTank(index, { temperature: e.target.value })} />
              <Button type="button" variant="ghost" size="icon" aria-label={`Remove ${tank.name || "tank"}`} onClick={() => setState((p) => ({ ...p, tanks: p.tanks.filter((_, i) => i !== index) }))}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button type="button" variant="outline" size="sm" className="gap-1.5" onClick={() => setState((p) => ({ ...p, tanks: [...p.tanks, { name: `Tank ${p.tanks.length + 1}`, volume: "", temperature: "" }] }))}>
            <Plus className="h-4 w-4" /> Add tank
          </Button>
        </div>
        {counted > 0 && <ResultTable title="Bunkers on board" rows={rows} copyText={rows.map((r) => `${r.label}: ${r.value}`).join("\n")} />}
      </ToolSection>

      <ToolSection title="Cross-check with drafts" icon={Scale} description="Displacements in dock water from draft surveys before and after bunkering.">
        <FormulaLine>Bunkers by drafts = (Δ after − Δ before) − other changes</FormulaLine>
        <FieldGrid columns={3}>
          <NumberField id="bkc-before" label="Δ before" unit="t" value={check.before} onChange={(v) => setCheck((p) => ({ ...p, before: v }))} placeholder="28400" />
          <NumberField id="bkc-after" label="Δ after" unit="t" value={check.after} onChange={(v) => setCheck((p) => ({ ...p, after: v }))} placeholder="29260" />
          <NumberField id="bkc-other" label="Other weight changes" unit="t" value={check.otherChanges} onChange={(v) => setCheck((p) => ({ ...p, otherChanges: v }))} placeholder="0" help="Ballast, fresh water, cargo moved in between (+ added)." />
        </FieldGrid>
        {Number.isFinite(before) && Number.isFinite(after) && (
          <ResultTable title="Bunkers by drafts" rows={[{ label: "Weight received by drafts", value: `${signed(after - before - other, 1)} t`, emphasis: true }]} />
        )}
        <ToolNotice>A draft check is much coarser than tank soundings; use it only to detect gross errors in the tank figures.</ToolNotice>
      </ToolSection>
    </ToolPage>
  );
}
