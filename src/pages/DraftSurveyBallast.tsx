import { Droplets, Plus, Scale, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

interface TankRow {
  name: string;
  volume: string;
}

const DEFAULT_TANKS: TankRow[] = [
  { name: "Fore peak", volume: "" },
  { name: "No.1 DB P", volume: "" },
  { name: "No.1 DB S", volume: "" },
  { name: "No.2 DB P", volume: "" },
  { name: "No.2 DB S", volume: "" },
  { name: "After peak", volume: "" },
];

export default function DraftSurveyBallast() {
  const [state, setState] = useStoredForm("ballast-tanks", { density: "1.025", tanks: DEFAULT_TANKS });
  const [check, setCheck] = useStoredForm("ballast-check", { before: "", after: "", otherChanges: "0" });

  const density = parseNumber(state.density);
  const densityOk = Number.isFinite(density) && density >= 0.99 && density <= 1.04;
  const tankTonnes = state.tanks.map((tank) => {
    const volume = parseNumber(tank.volume);
    return Number.isFinite(volume) && densityOk ? volume * density : Number.NaN;
  });
  const totalVolume = state.tanks.reduce((sum, tank) => sum + (parseNumber(tank.volume) || 0), 0);
  const totalTonnes = densityOk ? totalVolume * density : Number.NaN;

  const updateTank = (index: number, patch: Partial<TankRow>) =>
    setState((prev) => ({ ...prev, tanks: prev.tanks.map((tank, i) => (i === index ? { ...tank, ...patch } : tank)) }));

  const tankRows: ResultRow[] = [
    ...state.tanks
      .map((tank, index) => ({ tank, tonnes: tankTonnes[index] }))
      .filter(({ tonnes }) => Number.isFinite(tonnes))
      .map(({ tank, tonnes }) => ({ label: tank.name || "Tank", value: `${fmt(tonnes, 1)} t` })),
    { label: "Total ballast", value: `${fmt(totalVolume, 1)} m³ · ${fmt(totalTonnes, 1)} t`, emphasis: true },
  ];

  const before = parseNumber(check.before);
  const after = parseNumber(check.after);
  const other = parseNumber(check.otherChanges) || 0;
  const crossCheck: ResultRow[] | null =
    Number.isFinite(before) && Number.isFinite(after)
      ? [
          { label: "Displacement change", value: `${signed(after - before, 1)} t` },
          { label: "Less other weight changes", value: `${signed(-other, 1)} t` },
          { label: "Ballast change by drafts", value: `${signed(after - before - other, 1)} t`, emphasis: true },
        ]
      : null;

  return (
    <ToolPage title="Ballast Quantity" icon={Droplets}>
      <ToolNotice>
        Ballast is a deductible in every draft survey. Sound or ullage each tank, convert with the ship's calibrated
        tank tables (corrected for trim and list) and enter the volumes here.
      </ToolNotice>

      <ToolSection title="Ballast tanks" icon={Droplets} description="Volumes from the tank tables after trim/list correction.">
        <FormulaLine>W = V × ρ</FormulaLine>
        <NumberField
          id="ballast-density"
          label="Ballast water density"
          unit="t/m³"
          value={state.density}
          onChange={(value) => setState((prev) => ({ ...prev, density: value }))}
          placeholder="1.025"
          help="Sample the tanks: water taken in port may differ from sea water."
          error={state.density && !densityOk ? "Expected 0.990 – 1.040 t/m³" : undefined}
        />
        <div className="space-y-2">
          {state.tanks.map((tank, index) => (
            <div key={index} className="grid grid-cols-[minmax(0,1fr)_7rem_2.5rem] items-center gap-2">
              <Input aria-label="Tank name" className="h-9" value={tank.name} onChange={(e) => updateTank(index, { name: e.target.value })} />
              <Input
                aria-label={`${tank.name || "Tank"} volume in cubic metres`}
                className="h-9"
                type="number"
                inputMode="decimal"
                step="any"
                placeholder="m³"
                value={tank.volume}
                onChange={(e) => updateTank(index, { volume: e.target.value })}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label={`Remove ${tank.name || "tank"}`}
                onClick={() => setState((prev) => ({ ...prev, tanks: prev.tanks.filter((_, i) => i !== index) }))}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="gap-1.5"
            onClick={() => setState((prev) => ({ ...prev, tanks: [...prev.tanks, { name: `Tank ${prev.tanks.length + 1}`, volume: "" }] }))}
          >
            <Plus className="h-4 w-4" /> Add tank
          </Button>
        </div>
        <ResultTable title="Ballast on board" rows={tankRows} copyText={tankRows.map((row) => `${row.label}: ${row.value}`).join("\n")} />
      </ToolSection>

      <ToolSection
        title="Cross-check with drafts"
        icon={Scale}
        description="Displacements in dock water from two draft surveys taken before and after ballasting or deballasting."
      >
        <FormulaLine>Ballast change = (Δ after − Δ before) − other changes</FormulaLine>
        <FieldGrid columns={3}>
          <NumberField id="bc-before" label="Δ before" unit="t" value={check.before} onChange={(value) => setCheck((prev) => ({ ...prev, before: value }))} placeholder="14570" />
          <NumberField id="bc-after" label="Δ after" unit="t" value={check.after} onChange={(value) => setCheck((prev) => ({ ...prev, after: value }))} placeholder="18420" />
          <NumberField id="bc-other" label="Other weight changes" unit="t" value={check.otherChanges} onChange={(value) => setCheck((prev) => ({ ...prev, otherChanges: value }))} placeholder="0" help="Cargo, bunkers, fresh water moved in between (+ added)." />
        </FieldGrid>
        {crossCheck && <ResultTable title="Ballast by drafts" rows={crossCheck} />}
        <ToolNotice>Compare the result with the change in sounded ballast; a large difference points to a sounding, density or tank table error.</ToolNotice>
      </ToolSection>
    </ToolPage>
  );
}
