import { Anchor, ClipboardList, TableProperties } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { LongitudinalReference } from "@/lib/calc/stability";
import { FieldGrid, FormulaLine, NumberField, ResultTable, ToolNotice, ToolPage, ToolSection, type ResultRow } from "@/components/tools/ToolKit";
import { EditableTable } from "@/components/tools/EditableTable";
import { fmt, signed } from "@/components/tools/format";
import { computeLoading, emptyLoading, useStabilityForm, type LoadingForm } from "@/components/stability/stabilityForms";
import { StabilityDisclaimer } from "@/components/stability/StabilityDisclaimer";

const REFERENCES: Array<{ value: LongitudinalReference; label: string }> = [
  { value: "from-aft-perpendicular", label: "From the aft perpendicular (+ fwd)" },
  { value: "midships-forward-positive", label: "From amidships, + forward" },
  { value: "midships-aft-positive", label: "From amidships, + aft" },
];

export default function StabilityGMPage() {
  const [form, setForm] = useStabilityForm("loading", emptyLoading);
  const { result, errors } = computeLoading(form);
  const set = (key: keyof LoadingForm) => (value: string) => setForm((prev) => ({ ...prev, [key]: value }));

  const rows: ResultRow[] = result
    ? [
        { label: "Displacement (Δ)", value: `${fmt(result.displacement, 1)} t` },
        { label: "KG (solid)", value: `${fmt(result.kg, 3)} m` },
        { label: "GM solid = KM − KG", value: `${fmt(result.gmSolid, 3)} m` },
        { label: "Free surface correction ΣFSM / Δ", value: `${fmt(result.fsc, 3)} m` },
        { label: "KG fluid", value: `${fmt(result.kgFluid, 3)} m` },
        { label: "GM fluid", value: `${fmt(result.gmFluid, 3)} m`, emphasis: true },
        { label: "TCG (+ starboard)", value: `${signed(result.tcg, 3)} m` },
        {
          label: "List",
          value: Number.isFinite(result.list) ? `${fmt(Math.abs(result.list), 2)}° ${result.list > 0 ? "to starboard" : result.list < 0 ? "to port" : ""}` : "— (GM ≤ 0)",
        },
        ...(result.trim
          ? [
              { label: "Trim (+ by the stern)", value: `${signed(result.trim.trim, 3)} m` },
              { label: "Draft forward / aft", value: `${fmt(result.trim.forward, 3)} / ${fmt(result.trim.aft, 3)} m`, emphasis: true },
            ]
          : []),
      ]
    : [];

  return (
    <ToolPage title="Loading Condition and GM" icon={ClipboardList}>
      <StabilityDisclaimer />
      <ToolSection
        title="Weights"
        icon={TableProperties}
        description="One row per item from the loading plan and tank sounding. FSM: free surface moment of slack tanks from the tank tables. Saved on this device and used by the other stability tools."
      >
        <EditableTable
          caption="Loading table"
          columns={[
            { key: "name", label: "Item", text: true },
            { key: "weight", label: "Weight", unit: "t" },
            { key: "vcg", label: "VCG", unit: "m" },
            { key: "lcg", label: "LCG", unit: "m" },
            { key: "tcg", label: "TCG", unit: "m" },
            { key: "fsm", label: "FSM", unit: "t·m" },
          ]}
          rows={form.items}
          onChange={(items) => setForm((prev) => ({ ...prev, items }))}
          newRow={() => ({ name: "", weight: "", vcg: "", lcg: "", tcg: "0", fsm: "0" })}
          addLabel="Add item"
        />
        <ToolNotice>TCG positive to starboard. Leave the weight empty to ignore a row.</ToolNotice>
      </ToolSection>

      <ToolSection title="Hydrostatics at this displacement" icon={Anchor} description="From the hydrostatic table entered with the displacement above.">
        <FormulaLine>GM fluid = KM − KG − ΣFSM / Δ ;  Trim = Δ (LCB − LCG) / (100 · MCTC)</FormulaLine>
        <FieldGrid>
          <NumberField id="ld-km" label="KM" unit="m" value={form.km} onChange={set("km")} placeholder="10.85" />
          <NumberField id="ld-draft" label="Draft (even keel)" unit="m" value={form.tableDraft} onChange={set("tableDraft")} placeholder="9.20" help="Optional, for trim and drafts." />
          <NumberField id="ld-lbp" label="LBP" unit="m" value={form.lbp} onChange={set("lbp")} placeholder="180" />
          <NumberField id="ld-mctc" label="MCTC" unit="t·m/cm" value={form.mctc} onChange={set("mctc")} placeholder="420" />
          <NumberField id="ld-lcb" label="LCB" unit="m" value={form.lcb} onChange={set("lcb")} placeholder="92.10" />
          <NumberField id="ld-lcf" label="LCF" unit="m" value={form.lcf} onChange={set("lcf")} placeholder="88.40" />
          <div className="space-y-1">
            <Label className="text-xs">Longitudinal positions (LCG, LCB, LCF)</Label>
            <Select value={form.reference} onValueChange={(value) => setForm((prev) => ({ ...prev, reference: value as LongitudinalReference }))}>
              <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
              <SelectContent>
                {REFERENCES.map((r) => <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </FieldGrid>
      </ToolSection>

      {errors.length > 0 && form.items.some((row) => row.weight) && (
        <ToolNotice tone="warning">{errors.map((e) => <p key={e}>{e}</p>)}</ToolNotice>
      )}
      {result && (
        <>
          <ResultTable title="Condition" rows={rows} copyText={rows.map((r) => `${r.label}: ${r.value}`).join("\n")} />
          {result.gmFluid < 0.15 && (
            <ToolNotice tone="warning">GM fluid is below the IS Code minimum initial GM of 0.15 m (Part A 2.2.4).</ToolNotice>
          )}
        </>
      )}
    </ToolPage>
  );
}
