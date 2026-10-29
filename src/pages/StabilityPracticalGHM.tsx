import { Wheat } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { FormulaLine, NumberField, ResultTable, ToolNotice, ToolPage, ToolSection } from "@/components/tools/ToolKit";
import { fmt } from "@/components/tools/format";
import { GRAIN_CONDITIONS, computeGrain, useGrainForm } from "@/components/stability/grainForms";
import type { TableRow } from "@/components/tools/EditableTable";

/** Grain heeling moment from the volumetric heeling moments of the grain loading manual. */
export default function StabilityPracticalGHMPage() {
  const [form, setForm] = useGrainForm();
  const result = computeGrain(form);
  const updateHold = (index: number, patch: Partial<TableRow>) =>
    setForm((prev) => ({ ...prev, holds: prev.holds.map((h, i) => (i === index ? { ...h, ...patch } : h)) }));

  return (
    <ToolPage title="Grain Heeling Moment" icon={Wheat}>
      <ToolNotice>
        Take each compartment's assumed volumetric heeling moment (m⁴) from the ship's approved grain loading manual
        for its actual condition. If the manual's figures already include the vertical shift, use × 1.00.
      </ToolNotice>
      <ToolSection title="Compartments" icon={Wheat} description="International Grain Code, Part B 1.3 and B 1.5.">
        <FormulaLine>GHM = Σ (Mv × factor) / SF</FormulaLine>
        <NumberField
          id="ghm-sf"
          label="Stowage factor (SF)"
          unit="m³/t"
          value={form.stowageFactor}
          onChange={(value) => setForm((prev) => ({ ...prev, stowageFactor: value }))}
          placeholder="1.30"
        />
        <div className="space-y-3">
          {form.holds.map((h, index) => (
            <div key={index} className="grid gap-2 rounded-lg border border-border/40 bg-background/65 p-2 sm:grid-cols-[minmax(0,1fr)_8rem_minmax(0,1.6fr)_2.5rem] sm:items-end">
              <div className="space-y-1">
                <Label className="text-micro">Compartment</Label>
                <Input className="h-9" value={h.name} onChange={(e) => updateHold(index, { name: e.target.value })} aria-label={`Compartment ${index + 1} name`} />
              </div>
              <div className="space-y-1">
                <Label className="text-micro">Mv (m⁴)</Label>
                <Input className="h-9" type="number" inputMode="decimal" step="any" value={h.moment} onChange={(e) => updateHold(index, { moment: e.target.value })} aria-label={`${h.name || "Compartment"} volumetric heeling moment`} />
              </div>
              <div className="space-y-1">
                <Label className="text-micro">Condition</Label>
                <Select value={h.factor} onValueChange={(value) => updateHold(index, { factor: value })}>
                  <SelectTrigger className="h-9" aria-label={`${h.name || "Compartment"} condition`}><SelectValue /></SelectTrigger>
                  <SelectContent>{GRAIN_CONDITIONS.map((c) => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <Button type="button" variant="ghost" size="icon" aria-label={`Remove ${h.name || "compartment"}`} onClick={() => setForm((prev) => ({ ...prev, holds: prev.holds.filter((_, i) => i !== index) }))}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button type="button" variant="outline" size="sm" className="gap-1.5" onClick={() => setForm((prev) => ({ ...prev, holds: [...prev.holds, { name: `Compartment ${prev.holds.length + 1}`, moment: "", factor: "1.00" }] }))}>
            <Plus className="h-4 w-4" /> Add compartment
          </Button>
        </div>
        {result ? (
          <ResultTable
            title="Grain heeling moment"
            rows={[
              { label: "Σ Mv × factor", value: `${fmt(result.volumetric, 1)} m⁴` },
              { label: "Grain heeling moment (GHM)", value: `${fmt(result.tonneMetres, 1)} t·m`, emphasis: true },
            ]}
          />
        ) : (
          <ToolNotice>Enter the stowage factor and at least one compartment moment.</ToolNotice>
        )}
        <ToolNotice>
          Compare the GHM with the maximum permissible heeling moment from the manual on the Permissible Grain
          Moment page, or check the full Grain Code criteria on the Grain Stability Criteria page.
        </ToolNotice>
      </ToolSection>
    </ToolPage>
  );
}
