import { Anchor, ArrowDownUp, TableProperties, Waves } from "lucide-react";
import { Link } from "react-router-dom";
import {
  calculateHeightOfTideAtTime,
  calculateTidalStream,
  calculateUKC,
  estimateSquatBarrass,
  ruleOfTwelfthsTable,
  type SquatEnvironment,
} from "@/components/calculations/navigationMath";
import { FieldGrid, FormulaLine, NumberField, ToolNotice, ToolSection, type ResultRow } from "@/components/tools/ToolKit";
import { fmt, parseNumber } from "@/components/tools/format";
import { ChoiceField, Outcome, UtcField } from "./fields";
import { attempt, fmtBearing, fmtUtc, need, parseUtc } from "./navFormat";
import { useNavForm } from "./useNavForm";

export function TidesTool() {
  const { form, set } = useNavForm("tides", {
    lwTime: "",
    lwHeight: "",
    hwTime: "",
    hwHeight: "",
    query: "",
    springRate: "",
    neapRate: "",
    direction: "",
    springRange: "",
    neapRange: "",
    stdRange: "",
  });
  const lwT = parseUtc(form.lwTime);
  const hwT = parseUtc(form.hwTime);
  const lwH = parseNumber(form.lwHeight);
  const hwH = parseNumber(form.hwHeight);

  const table = attempt(() => {
    need(lwT.getTime(), hwT.getTime(), lwH, hwH);
    return lwT < hwT ? ruleOfTwelfthsTable(lwT, lwH, hwT, hwH) : ruleOfTwelfthsTable(hwT, hwH, lwT, lwH);
  });
  const hot = attempt(() => {
    const q = parseUtc(form.query);
    need(lwT.getTime(), hwT.getTime(), lwH, hwH, q.getTime());
    return calculateHeightOfTideAtTime({ lowWaterTimeUtc: lwT, lowWaterHeightM: lwH, highWaterTimeUtc: hwT, highWaterHeightM: hwH, queryTimeUtc: q });
  });
  const range = Number.isFinite(lwH) && Number.isFinite(hwH) ? hwH - lwH : Number.NaN;
  const hotRows: ResultRow[] | null = hot.value
    ? [
        { label: "Height of tide", value: `${fmt(hot.value.heightM, 2)} m`, emphasis: true, hint: "Above chart datum" },
        { label: "Tide", value: hot.value.stage === "rising" ? "Rising" : "Falling" },
        { label: "Range", value: `${fmt(range, 2)} m` },
      ]
    : null;

  const stream = attempt(() => {
    const v = [form.springRate, form.neapRate, form.springRange, form.neapRange, form.stdRange].map(parseNumber);
    need(...v);
    return calculateTidalStream({ springRateKn: v[0], neapRateKn: v[1], springRangeM: v[2], neapRangeM: v[3], rangeM: v[4] });
  });
  const direction = parseNumber(form.direction);
  const streamRows: ResultRow[] | null = stream.value
    ? [
        { label: "Rate", value: `${fmt(stream.value.rateKn, 1)} kn`, emphasis: true },
        ...(Number.isFinite(direction) ? [{ label: "Set (direction towards)", value: fmtBearing(direction, 0), emphasis: true }] : []),
        { label: "Between neaps (0) and springs (1)", value: fmt(stream.value.factor, 2) },
      ]
    : null;

  return (
    <>
      <ToolSection title="Height of tide" icon={Waves} description="Consecutive low and high water from the tide tables (secondary port corrections applied).">
        <FormulaLine>Rule of twelfths: 1 · 2 · 3 · 3 · 2 · 1 twelfths of the range per tidal hour</FormulaLine>
        <FieldGrid>
          <UtcField id="td-lwt" label="Low water time" value={form.lwTime} onChange={set("lwTime")} />
          <NumberField id="td-lwh" label="Low water height" unit="m" value={form.lwHeight} onChange={set("lwHeight")} placeholder="1.0" />
          <UtcField id="td-hwt" label="High water time" value={form.hwTime} onChange={set("hwTime")} />
          <NumberField id="td-hwh" label="High water height" unit="m" value={form.hwHeight} onChange={set("hwHeight")} placeholder="5.5" />
          <UtcField id="td-q" label="Time required" value={form.query} onChange={set("query")} help="Between the two tides." />
        </FieldGrid>
        <Outcome title="Height of tide" rows={hotRows} error={hot.error} />
      </ToolSection>

      {table.value && (
        <ToolSection title="Tidal hours" icon={TableProperties} description="Each tidal hour is one sixth of the duration.">
          <div className="overflow-x-auto rounded-lg border border-border/40">
            <table className="w-full min-w-[20rem] text-xs">
              <caption className="sr-only">Heights by the rule of twelfths</caption>
              <thead className="bg-muted/40 text-muted-foreground">
                <tr>
                  <th scope="col" className="px-2 py-1.5 text-left font-medium">Time</th>
                  <th scope="col" className="px-2 py-1.5 text-right font-medium">Twelfths</th>
                  <th scope="col" className="px-2 py-1.5 text-right font-medium">Height</th>
                </tr>
              </thead>
              <tbody translate="no" className="notranslate divide-y divide-border/40 font-mono">
                {table.value.map((row, i) => (
                  <tr key={i} className={i === 0 || i === 6 ? "font-semibold" : ""}>
                    <td className="px-2 py-1.5">{fmtUtc(row.timeUtc)}</td>
                    <td className="px-2 py-1.5 text-right">{row.twelfths}/12</td>
                    <td className="px-2 py-1.5 text-right">{fmt(row.heightM, 2)} m</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ToolSection>
      )}

      <ToolSection title="Tidal stream from a tidal diamond" icon={ArrowDownUp} description="Rates for the hour from the chart's tidal diamond table. Interpolate with the day's range at the standard port named on the chart.">
        <FormulaLine>rate = neap + (spring − neap) × (range − neap range) / (spring range − neap range)</FormulaLine>
        <FieldGrid>
          <NumberField id="ts-sr" label="Spring rate" unit="kn" value={form.springRate} onChange={set("springRate")} placeholder="2.4" />
          <NumberField id="ts-nr" label="Neap rate" unit="kn" value={form.neapRate} onChange={set("neapRate")} placeholder="1.2" />
          <NumberField id="ts-dir" label="Direction" unit="°" value={form.direction} onChange={set("direction")} placeholder="065" />
          <NumberField id="ts-srg" label="Mean spring range" unit="m" value={form.springRange} onChange={set("springRange")} placeholder="4.8" help="At the standard port, from the tide tables." />
          <NumberField id="ts-nrg" label="Mean neap range" unit="m" value={form.neapRange} onChange={set("neapRange")} placeholder="2.2" />
          <NumberField id="ts-rg" label="Today's range at that standard port" unit="m" value={form.stdRange} onChange={set("stdRange")} placeholder="3.5" help="HW height − LW height at the standard port, not at a secondary port." />
        </FieldGrid>
        <Outcome title="Tidal stream" rows={streamRows} error={stream.error} empty="Enter the diamond's rates and the ranges." />
        {stream.value?.extrapolated && <ToolNotice tone="warning">The day's range is outside the neap–spring ranges: the rate is extrapolated.</ToolNotice>}
      </ToolSection>

      <ToolNotice>
        The rule of twelfths assumes a regular semidiurnal tide rising for about six hours. Where the tidal curve is not
        symmetrical, use the tidal curves of the Admiralty Tide Tables. For under-keel clearance use{" "}
        <Link to="/navigation/calc/safety" className="font-medium text-primary underline-offset-2 hover:underline">Squat and UKC</Link>.
      </ToolNotice>
    </>
  );
}

export function SafetyTool() {
  const { form, set } = useNavForm("safety", { speed: "", cb: "", environment: "open" as SquatEnvironment, depth: "", tide: "", draft: "", margin: "", required: "" });
  const { value: r, error } = attempt(() => {
    const v = [form.speed, form.cb, form.depth, form.tide, form.draft].map(parseNumber);
    need(...v);
    const squatM = estimateSquatBarrass({ speedKn: v[0], blockCoefficient: v[1], environment: form.environment });
    const margin = Number.isFinite(parseNumber(form.margin)) ? parseNumber(form.margin) : 0;
    return { squatM, ...calculateUKC({ chartedDepthM: v[2], heightOfTideM: v[3], draftM: v[4], squatM, safetyMarginM: margin }), waterDepth: v[2] + v[3] };
  });
  const required = parseNumber(form.required);
  const rows: ResultRow[] | null = r
    ? [
        { label: "Depth of water", value: `${fmt(r.waterDepth, 2)} m`, hint: "Charted depth + height of tide" },
        { label: "Maximum squat (Barrass)", value: `${fmt(r.squatM, 2)} m` },
        { label: "Under-keel clearance", value: `${fmt(r.ukcM, 2)} m`, emphasis: true, hint: "After squat and the margin entered" },
      ]
    : null;
  return (
    <ToolSection title="Squat and under-keel clearance" icon={Anchor}>
      <FormulaLine>squat = Cb × V² / 100 (open water) · × 2 in a confined channel · UKC = depth + tide − draft − squat − margin</FormulaLine>
      <FieldGrid>
        <NumberField id="sf-v" label="Speed through the water" unit="kn" value={form.speed} onChange={set("speed")} placeholder="10" />
        <NumberField id="sf-cb" label="Block coefficient Cb" value={form.cb} onChange={set("cb")} placeholder="0.80" />
        <ChoiceField
          id="sf-env"
          label="Water"
          value={form.environment}
          onChange={set("environment")}
          options={[
            { value: "open", label: "Open water (shallow, unrestricted width)" },
            { value: "confined", label: "Confined channel" },
          ]}
        />
        <NumberField id="sf-d" label="Charted depth" unit="m" value={form.depth} onChange={set("depth")} placeholder="14.2" />
        <NumberField id="sf-t" label="Height of tide" unit="m" value={form.tide} onChange={set("tide")} placeholder="1.8" />
        <NumberField id="sf-dr" label="Deepest draft" unit="m" value={form.draft} onChange={set("draft")} placeholder="12.4" help="Static draft, corrected for density." />
        <NumberField id="sf-m" label="Other allowances" unit="m" value={form.margin} onChange={set("margin")} placeholder="0.3" help="Swell, heel, chart accuracy: as your company or port requires." />
        <NumberField id="sf-req" label="Required UKC" unit="m" value={form.required} onChange={set("required")} placeholder="1.0" help="From the company SMS or port regulations." />
      </FieldGrid>
      <Outcome title="Under-keel clearance" rows={rows} error={error} />
      {r && r.ukcM < 0 && <ToolNotice tone="warning">Negative clearance: the ship would touch bottom.</ToolNotice>}
      {r && r.ukcM >= 0 && Number.isFinite(required) && r.ukcM < required && (
        <ToolNotice tone="warning">UKC is below the required {fmt(required, 2)} m: reduce speed, wait for the tide or reduce draft.</ToolNotice>
      )}
      <ToolNotice>Barrass' approximation of maximum squat at the bow (full ships) or stern (fine ships). Squat varies with the square of the speed: halving the speed quarters it.</ToolNotice>
    </ToolSection>
  );
}
