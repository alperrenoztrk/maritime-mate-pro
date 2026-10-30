import { LifeBuoy, Wind } from "lucide-react";
import { BEAUFORT_TABLE, beaufortForKnots, expandingSquareSearch, parallelSweepSearch, sectorSearch } from "@/components/calculations/navigationMath";
import { FieldGrid, FormulaLine, NumberField, ToolNotice, ToolSection, type ResultRow } from "@/components/tools/ToolKit";
import { fmt, parseNumber } from "@/components/tools/format";
import { ChoiceField, Outcome } from "./fields";
import { attempt, fmtHours, need } from "./navFormat";
import { useNavForm } from "./useNavForm";

const waves = (m: number | null) => (m === null ? "—" : `${fmt(m, 1)} m`);
const speedRange = (row: (typeof BEAUFORT_TABLE)[number]) =>
  row.force === 0 ? "< 1 kn" : row.maxKn === null ? `≥ ${row.minKn} kn` : `${row.minKn}–${row.maxKn} kn`;

export function WeatherTool() {
  const { form, set } = useNavForm("weather", { speed: "" });
  const { value: row, error } = attempt(() => {
    const v = parseNumber(form.speed);
    need(v);
    return beaufortForKnots(v);
  });
  const rows: ResultRow[] | null = row
    ? [
        { label: "Beaufort force", value: `${row.force} — ${row.description}`, emphasis: true },
        { label: "Wind speed limits", value: speedRange(row) },
        { label: "Probable wave height", value: waves(row.probableWaveM), emphasis: true },
        { label: "Probable maximum wave height", value: waves(row.probableMaxWaveM) },
      ]
    : null;
  return (
    <>
      <ToolSection title="Beaufort force from wind speed" icon={Wind}>
        <FieldGrid>
          <NumberField id="wx-v" label="Mean wind speed" unit="kn" value={form.speed} onChange={set("speed")} placeholder="25" help="True wind, 10 m above the sea." />
        </FieldGrid>
        <Outcome title="Beaufort scale" rows={rows} error={error} />
      </ToolSection>
      <ToolSection title="Beaufort scale" icon={Wind} description="Met Office / WMO. Wave heights are for well-developed wind waves in the open sea.">
        <div className="overflow-x-auto rounded-lg border border-border/40">
          <table className="w-full min-w-[30rem] text-xs">
            <caption className="sr-only">Beaufort wind force scale</caption>
            <thead className="bg-muted/40 text-muted-foreground">
              <tr>
                <th scope="col" className="px-2 py-1.5 text-left font-medium">Force</th>
                <th scope="col" className="px-2 py-1.5 text-left font-medium">Description</th>
                <th scope="col" className="px-2 py-1.5 text-right font-medium">Wind</th>
                <th scope="col" className="px-2 py-1.5 text-right font-medium">Probable wave</th>
                <th scope="col" className="px-2 py-1.5 text-right font-medium">Probable max.</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {BEAUFORT_TABLE.map((b) => (
                <tr key={b.force} className={row?.force === b.force ? "bg-primary/[0.06] font-semibold" : ""}>
                  <td className="px-2 py-1.5 font-mono">{b.force}</td>
                  <td className="px-2 py-1.5">{b.description}</td>
                  <td translate="no" className="notranslate px-2 py-1.5 text-right font-mono">{speedRange(b)}</td>
                  <td translate="no" className="notranslate px-2 py-1.5 text-right font-mono">{waves(b.probableWaveM)}</td>
                  <td translate="no" className="notranslate px-2 py-1.5 text-right font-mono">{waves(b.probableMaxWaveM)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ToolNotice>Near land, in offshore winds and in short fetches the waves are lower and steeper; the sea also lags behind a rising wind.</ToolNotice>
      </ToolSection>
    </>
  );
}

type Pattern = "ss" | "vs" | "ps";

export function EmergencyTool() {
  const { form, set } = useNavForm("emergency", { pattern: "ss" as Pattern, spacing: "", legs: "9", radius: "", length: "", width: "", speed: "" });
  const { value: r, error } = attempt(() => {
    const v = parseNumber(form.speed);
    if (form.pattern === "ss") {
      const s = parseNumber(form.spacing);
      const n = parseNumber(form.legs);
      need(s, n, v);
      if (!Number.isInteger(n)) throw new Error("Enter a whole number of legs");
      return expandingSquareSearch(s, n, v);
    }
    if (form.pattern === "vs") {
      const rad = parseNumber(form.radius);
      need(rad, v);
      return sectorSearch(rad, v);
    }
    const l = parseNumber(form.length);
    const w = parseNumber(form.width);
    const s = parseNumber(form.spacing);
    need(l, w, s, v);
    return parallelSweepSearch(l, w, s, v);
  });
  const rows: ResultRow[] | null = r
    ? [
        { label: "Legs", value: r.legsNm.map((x) => fmt(x, 1)).join(", ") + " nm" },
        { label: "Total track", value: `${fmt(r.totalTrackNm, 1)} nm` },
        { label: "Time to complete", value: fmtHours(r.timeHours), emphasis: true },
      ]
    : null;
  return (
    <ToolSection title="Search patterns (IAMSAR Vol. III)" icon={LifeBuoy}>
      <ChoiceField
        id="sar-p"
        label="Pattern"
        value={form.pattern}
        onChange={set("pattern")}
        options={[
          { value: "ss", label: "Expanding square (SS)" },
          { value: "vs", label: "Sector search (VS)" },
          { value: "ps", label: "Parallel sweep (PS)" },
        ]}
      />
      {form.pattern === "ss" && (
        <>
          <FormulaLine>Legs S, S, 2S, 2S, 3S, 3S … · all turns 90°</FormulaLine>
          <FieldGrid columns={3}>
            <NumberField id="sar-s" label="Track spacing S" unit="nm" value={form.spacing} onChange={set("spacing")} placeholder="1" help="From the IAMSAR tables or the SMC." />
            <NumberField id="sar-n" label="Number of legs" value={form.legs} onChange={set("legs")} placeholder="9" help="5, 9, 13, 17 …" />
            <NumberField id="sar-v" label="Search speed" unit="kn" value={form.speed} onChange={set("speed")} placeholder="10" />
          </FieldGrid>
        </>
      )}
      {form.pattern === "vs" && (
        <>
          <FormulaLine>Legs = radius · all turns 120° to starboard · 9 × radius per pattern</FormulaLine>
          <FieldGrid>
            <NumberField id="sar-r" label="Radius (leg length)" unit="nm" value={form.radius} onChange={set("radius")} placeholder="2" help="Ships: usually 2–5 nm." />
            <NumberField id="sar-v2" label="Search speed" unit="kn" value={form.speed} onChange={set("speed")} placeholder="10" />
          </FieldGrid>
        </>
      )}
      {form.pattern === "ps" && (
        <>
          <FormulaLine>Legs = width / S, each the length of the area, joined by S</FormulaLine>
          <FieldGrid>
            <NumberField id="sar-l" label="Length of the area" unit="nm" value={form.length} onChange={set("length")} placeholder="10" />
            <NumberField id="sar-w" label="Width of the area" unit="nm" value={form.width} onChange={set("width")} placeholder="6" />
            <NumberField id="sar-s2" label="Track spacing S" unit="nm" value={form.spacing} onChange={set("spacing")} placeholder="2" />
            <NumberField id="sar-v3" label="Search speed" unit="kn" value={form.speed} onChange={set("speed")} placeholder="10" />
          </FieldGrid>
        </>
      )}
      <Outcome title="Search" rows={rows} error={error} />
      <ToolNotice>
        Follow the SAR Mission Co-ordinator or the On-Scene Co-ordinator. The expanding square and the sector search start at
        the datum; begin the sector search towards the drift where possible.
      </ToolNotice>
    </ToolSection>
  );
}
