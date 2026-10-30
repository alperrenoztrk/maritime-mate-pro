import { Gauge, TableProperties } from "lucide-react";
import { lookUpTankTable, type TankTableResult } from "@/lib/calc/tank";
import { FieldGrid, FormulaLine, NumberField, ResultTable, ToolNotice, ToolPage, ToolSection, type ResultRow } from "@/components/tools/ToolKit";
import { EditableTable, type TableRow } from "@/components/tools/EditableTable";
import { fmt, parseNumber, signed } from "@/components/tools/format";
import { useStoredState } from "@/components/tools/useStoredState";

const row = (): TableRow => ({ reading: "", volume: "", vcg: "", lcg: "", fsm: "" });

/** Tank contents from the ship's calibration (sounding/ullage) table. */
export default function TankCalculationsPage() {
  const [f, setF] = useStoredState("marine-expert-tank:table", {
    name: "",
    reading: "",
    trimCorrection: "0",
    listCorrection: "0",
    density: "1.025",
    rows: [row(), row(), row()],
  });
  const set = (k: "name" | "reading" | "trimCorrection" | "listCorrection" | "density") => (v: string) => setF((p) => ({ ...p, [k]: v }));

  const tableRows = f.rows
    .map((r) => ({
      reading: parseNumber(r.reading),
      volume: parseNumber(r.volume),
      vcg: Number.isFinite(parseNumber(r.vcg)) ? parseNumber(r.vcg) : undefined,
      lcg: Number.isFinite(parseNumber(r.lcg)) ? parseNumber(r.lcg) : undefined,
      fsm: Number.isFinite(parseNumber(r.fsm)) ? parseNumber(r.fsm) : undefined,
    }))
    .filter((r) => Number.isFinite(r.reading) && Number.isFinite(r.volume));
  const reading = parseNumber(f.reading);
  const density = parseNumber(f.density);

  let result: TankTableResult | null = null;
  let error = "";
  if (tableRows.length >= 2 && Number.isFinite(reading) && density > 0) {
    try {
      result = lookUpTankTable(tableRows, reading, parseNumber(f.trimCorrection) || 0, parseNumber(f.listCorrection) || 0);
    } catch (e) {
      error = e instanceof Error ? e.message : "Check the table.";
    }
  }

  const rows: ResultRow[] = result
    ? [
        { label: "Corrected reading", value: fmt(result.correctedReading, 1) },
        { label: "Volume", value: `${fmt(result.volume, 2)} m³` },
        { label: "Weight", value: `${fmt(result.volume * density, 2)} t`, emphasis: true },
        ...(result.vcg !== undefined ? [{ label: "VCG", value: `${fmt(result.vcg, 3)} m` }] : []),
        ...(result.lcg !== undefined ? [{ label: "LCG", value: `${fmt(result.lcg, 3)} m` }] : []),
        ...(result.fsm !== undefined ? [{ label: "FSM (table value × ρ)", value: `${fmt(result.fsm * density, 1)} t·m`, hint: "Assumes the table FSM is for ρ = 1.000 t/m³" }] : []),
      ]
    : [];

  return (
    <ToolPage title="Tank Sounding" icon={Gauge}>
      <ToolNotice>
        Enter the rows of the ship's approved calibration table around the reading. Trim and list corrections are
        read from the same table for the actual trim and list (sign as tabulated).
      </ToolNotice>
      <ToolSection title="Calibration table" icon={TableProperties} description="Sounding or ullage, as the table is entered; the same unit for the reading below.">
        <EditableTable
          caption="Calibration table"
          columns={[
            { key: "reading", label: "Sounding / ullage" },
            { key: "volume", label: "Volume", unit: "m³" },
            { key: "vcg", label: "VCG", unit: "m" },
            { key: "lcg", label: "LCG", unit: "m" },
            { key: "fsm", label: "FSM", unit: "t·m" },
          ]}
          rows={f.rows}
          onChange={(rows) => setF((p) => ({ ...p, rows }))}
          newRow={row}
          addLabel="Add row"
        />
      </ToolSection>
      <ToolSection title="Reading" icon={Gauge}>
        <FormulaLine>Corrected reading = observed + trim correction + list correction · W = V × ρ</FormulaLine>
        <FieldGrid>
          <NumberField id="tk-reading" label="Observed sounding / ullage" value={f.reading} onChange={set("reading")} placeholder="112" />
          <NumberField id="tk-trim" label="Trim correction" value={f.trimCorrection} onChange={set("trimCorrection")} placeholder="0" help="From the table, for the actual trim (± as tabulated)." />
          <NumberField id="tk-list" label="List correction" value={f.listCorrection} onChange={set("listCorrection")} placeholder="0" />
          <NumberField id="tk-rho" label="Density of contents" unit="t/m³" value={f.density} onChange={set("density")} placeholder="1.025" help="Ballast/fresh water: sampled density. Oils: use Bunker Quantity (VCF)." />
        </FieldGrid>
        {error && <ToolNotice tone="warning">{error}</ToolNotice>}
        {result?.extrapolated && <ToolNotice tone="warning">The corrected reading is outside the rows entered: add the rows that bracket it.</ToolNotice>}
        {result ? (
          <ResultTable title="Tank contents" rows={rows} copyText={rows.map((r) => `${r.label}: ${r.value}`).join("\n")} />
        ) : (
          <ToolNotice>Enter at least two table rows and the reading.</ToolNotice>
        )}
        {result && (parseNumber(f.trimCorrection) || parseNumber(f.listCorrection)) ? (
          <p className="text-xs text-muted-foreground">
            Corrections applied: trim {signed(parseNumber(f.trimCorrection) || 0, 1)}, list {signed(parseNumber(f.listCorrection) || 0, 1)}.
          </p>
        ) : null}
      </ToolSection>
    </ToolPage>
  );
}
