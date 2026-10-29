import { Container } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { tankCapacity, tankFsm, tankVolumeAtDepth, type TankShape } from "@/lib/calc/tank";
import { FieldGrid, FormulaLine, NumberField, ResultTable, ToolNotice, ToolPage, ToolSection, type ResultRow } from "@/components/tools/ToolKit";
import { fmt, parseNumber } from "@/components/tools/format";
import { useStabilityForm } from "@/components/stability/stabilityForms";

const SHAPES: Array<{ value: TankShape; label: string; formula: string }> = [
  { value: "rectangular", label: "Rectangular (box)", formula: "V = l · b · h · FSM = ρ l b³ / 12" },
  { value: "vertical-cylinder", label: "Vertical cylinder", formula: "V = π d² h / 4 · FSM = ρ π d⁴ / 64" },
  { value: "horizontal-cylinder", label: "Horizontal cylinder", formula: "V = l · [r² acos((r−h)/r) − (r−h)√(2rh − h²)]" },
];

export default function StabilityPracticalTankPage() {
  const [f, setF] = useStabilityForm("tank-geometry", { shape: "rectangular" as TankShape, length: "", breadth: "", height: "", diameter: "", depth: "", density: "1.025" });
  const set = (k: keyof typeof f) => (v: string) => setF((p) => ({ ...p, [k]: v }));
  const g = {
    shape: f.shape,
    length: parseNumber(f.length),
    breadth: parseNumber(f.breadth),
    height: parseNumber(f.height),
    diameter: parseNumber(f.diameter),
  };
  const depth = parseNumber(f.depth);
  const rho = parseNumber(f.density);
  const dims =
    f.shape === "rectangular" ? [g.length, g.breadth, g.height] : f.shape === "vertical-cylinder" ? [g.diameter, g.height] : [g.diameter, g.length];
  const ready = dims.every((x) => x > 0) && depth >= 0 && rho > 0;
  const shape = SHAPES.find((s) => s.value === f.shape)!;
  const maxDepth = f.shape === "horizontal-cylinder" ? g.diameter : g.height;

  let rows: ResultRow[] = [];
  if (ready) {
    const capacity = tankCapacity(g);
    const volume = tankVolumeAtDepth(g, depth);
    const slack = depth > 0 && depth < maxDepth;
    rows = [
      { label: "Capacity", value: `${fmt(capacity, 2)} m³` },
      { label: "Liquid volume", value: `${fmt(volume, 2)} m³ (${fmt((volume / capacity) * 100, 1)} %)` },
      { label: "Liquid weight", value: `${fmt(volume * rho, 2)} t`, emphasis: true },
      { label: "Free surface moment", value: slack ? `${fmt(tankFsm(g, depth, rho), 1)} t·m` : "0 (tank full or empty)" },
    ];
  }

  return (
    <ToolPage title="Tank Volume and Mass" icon={Container}>
      <ToolNotice>
        For tanks without calibration tables. Ship's tanks are measured with the approved sounding/ullage tables,
        corrected for trim and list. Ship upright and on even keel assumed.
      </ToolNotice>
      <ToolSection title="Tank" icon={Container}>
        <FormulaLine>{shape.formula}</FormulaLine>
        <div className="space-y-1">
          <Label className="text-xs">Shape</Label>
          <Select value={f.shape} onValueChange={(v) => setF((p) => ({ ...p, shape: v as TankShape }))}>
            <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
            <SelectContent>{SHAPES.map((s) => <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>)}</SelectContent>
          </Select>
        </div>
        <FieldGrid>
          {f.shape !== "vertical-cylinder" && <NumberField id="tk-l" label="Length" unit="m" value={f.length} onChange={set("length")} placeholder="10" />}
          {f.shape === "rectangular" && <NumberField id="tk-b" label="Breadth" unit="m" value={f.breadth} onChange={set("breadth")} placeholder="8" />}
          {f.shape !== "horizontal-cylinder" && <NumberField id="tk-h" label="Height" unit="m" value={f.height} onChange={set("height")} placeholder="5" />}
          {f.shape !== "rectangular" && <NumberField id="tk-d" label="Diameter" unit="m" value={f.diameter} onChange={set("diameter")} placeholder="2.4" />}
          <NumberField id="tk-depth" label="Depth of liquid" unit="m" value={f.depth} onChange={set("depth")} placeholder="2.5" help="Sounding corrected to the tank bottom." />
          <NumberField id="tk-rho" label="Liquid density" unit="t/m³" value={f.density} onChange={set("density")} placeholder="1.025" />
        </FieldGrid>
        {ready ? <ResultTable title="Contents" rows={rows} /> : <ToolNotice>Enter the dimensions, depth and density.</ToolNotice>}
      </ToolSection>
    </ToolPage>
  );
}
