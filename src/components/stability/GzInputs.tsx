import { Link } from "react-router-dom";
import { LineChart as CurveIcon, Scale } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { FieldGrid, NumberField, ToolNotice, ToolSection } from "@/components/tools/ToolKit";
import { EditableTable } from "@/components/tools/EditableTable";
import { fmt } from "@/components/tools/format";
import { savedLoadingResult } from "./stabilityForms";
import type { GzInputState, GzInputs } from "./useGzInputs";

export function GzInputsSection({ inputs }: { inputs: GzInputs }) {
  const { state, setState } = inputs;
  const loading = savedLoadingResult();
  const set = (key: keyof GzInputState) => (value: string) => setState((prev) => ({ ...prev, [key]: value }));
  return (
    <>
      <ToolSection title="Condition" icon={Scale} description="Displacement and centre of gravity of the condition being checked.">
        <div className="flex items-center justify-between gap-3 rounded-lg border border-border/40 bg-background/65 p-3">
          <Label htmlFor="gz-use-loading" className="text-xs">
            Use the saved loading condition
            <span className="block text-micro font-normal text-muted-foreground">
              {loading
                ? `Δ ${fmt(loading.displacement, 0)} t · KG fluid ${fmt(loading.kgFluid, 3)} m · GM fluid ${fmt(loading.gmFluid, 3)} m`
                : "None saved yet — "}
              {!loading && <Link to="/stability/gm" className="font-semibold text-primary underline">open Loading Condition</Link>}
            </span>
          </Label>
          <Switch id="gz-use-loading" checked={state.useLoading && Boolean(loading)} disabled={!loading} onCheckedChange={(checked) => setState((prev) => ({ ...prev, useLoading: checked }))} />
        </div>
        {!inputs.fromLoading && (
          <FieldGrid>
            <NumberField id="gz-disp" label="Displacement (Δ)" unit="t" value={state.displacement} onChange={set("displacement")} placeholder="28350" />
            <NumberField id="gz-kg" label="KG fluid" unit="m" value={state.kgFluid} onChange={set("kgFluid")} placeholder="8.34" help="KG corrected for free surface." />
            <NumberField id="gz-gm" label="GM fluid" unit="m" value={state.gmFluid} onChange={set("gmFluid")} placeholder="2.66" />
            <NumberField id="gz-tcg" label="TCG (+ starboard)" unit="m" value={state.tcg} onChange={set("tcg")} placeholder="0" />
          </FieldGrid>
        )}
      </ToolSection>

      <ToolSection title="Cross curves (KN)" icon={CurveIcon} description="KN read from the cross curves at this displacement, at each angle.">
        <EditableTable
          caption="KN table"
          columns={[{ key: "angle", label: "Heel", unit: "°" }, { key: "value", label: "KN", unit: "m" }]}
          rows={state.rows}
          onChange={(rows) => setState((prev) => ({ ...prev, rows }))}
          newRow={() => ({ angle: "", value: "" })}
          addLabel="Add angle"
        />
        <ToolNotice>GZ = KN − KG fluid × sin θ − TCG × cos θ. The curve between table angles is drawn with a shape-preserving cubic.</ToolNotice>
      </ToolSection>
    </>
  );
}
