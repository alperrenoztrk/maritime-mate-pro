import { Compass, Crosshair } from "lucide-react";
import { convertTVMDCFromCompass, convertTVMDCFromTrue, signedAngle } from "@/components/calculations/navigationMath";
import { FieldGrid, FormulaLine, NumberField, ToolNotice, ToolSection, type ResultRow } from "@/components/tools/ToolKit";
import { parseNumber } from "@/components/tools/format";
import { ChoiceField, Outcome } from "./fields";
import { attempt, fmtBearing, fmtEW, need } from "./navFormat";
import { useNavForm } from "./useNavForm";

const gyroName = (error: number) => (error > 0 ? "low" : error < 0 ? "high" : "");

export function CompassTool() {
  const { form, set } = useNavForm("compass", {
    from: "compass" as "compass" | "true",
    course: "",
    variation: "",
    deviation: "",
    trueBearing: "",
    compassBearing: "",
    gyroBearing: "",
    errVariation: "",
  });

  const conv = attempt(() => {
    const c = parseNumber(form.course);
    const v = parseNumber(form.variation);
    const d = parseNumber(form.deviation);
    need(c, v, d);
    const input = { courseDeg: c, variationDeg: v, deviationDeg: d };
    return form.from === "compass" ? convertTVMDCFromCompass(input) : convertTVMDCFromTrue(input);
  });
  const convRows: ResultRow[] | null = conv.value
    ? [
        { label: "Compass", value: fmtBearing(conv.value.compassDeg), emphasis: form.from === "true" },
        { label: "Magnetic", value: fmtBearing(conv.value.magneticDeg) },
        { label: "True", value: fmtBearing(conv.value.trueDeg), emphasis: form.from === "compass" },
        { label: "Compass error", value: fmtEW(conv.value.compassErrorDeg), hint: "Variation + deviation" },
      ]
    : null;

  const err = attempt(() => {
    const t = parseNumber(form.trueBearing);
    need(t);
    const c = parseNumber(form.compassBearing);
    const g = parseNumber(form.gyroBearing);
    const v = parseNumber(form.errVariation);
    if (!Number.isFinite(c) && !Number.isFinite(g)) need(Number.NaN);
    const rows: ResultRow[] = [];
    if (Number.isFinite(c)) {
      const ce = signedAngle(t - c);
      rows.push({ label: "Compass error", value: fmtEW(ce), emphasis: true });
      if (Number.isFinite(v)) rows.push({ label: "Deviation on this heading", value: fmtEW(ce - v), emphasis: true });
    }
    if (Number.isFinite(g)) {
      const ge = signedAngle(t - g);
      rows.push({ label: "Gyro error", value: ge === 0 ? "0.0°" : `${Math.abs(ge).toFixed(1)}° ${gyroName(ge)}`, hint: "Gyro reads high: subtract; low: add", emphasis: true });
    }
    return rows;
  });

  return (
    <>
      <ToolSection title="True, magnetic and compass" icon={Compass}>
        <FormulaLine>T = C + deviation + variation (east +, west −)</FormulaLine>
        <ChoiceField
          id="cp-from"
          label="Convert from"
          value={form.from}
          onChange={set("from")}
          options={[
            { value: "compass", label: "Compass to true" },
            { value: "true", label: "True to compass" },
          ]}
        />
        <FieldGrid columns={3}>
          <NumberField id="cp-c" label={form.from === "compass" ? "Compass course" : "True course"} unit="°" value={form.course} onChange={set("course")} placeholder="125" />
          <NumberField id="cp-v" label="Variation" unit="°" value={form.variation} onChange={set("variation")} placeholder="3.5" help="East +, west −. From the chart, corrected for the year." />
          <NumberField id="cp-d" label="Deviation" unit="°" value={form.deviation} onChange={set("deviation")} placeholder="-2" help="East +, west −. From the deviation card for the ship's head." />
        </FieldGrid>
        <Outcome title="Course" rows={convRows} error={conv.error} />
      </ToolSection>

      <ToolSection title="Error by transit or azimuth" icon={Crosshair} description="True bearing from a transit on the chart, or a calculated azimuth or amplitude.">
        <FormulaLine>Error = true − observed (east +) · deviation = compass error − variation</FormulaLine>
        <FieldGrid>
          <NumberField id="ce-t" label="True bearing" unit="°" value={form.trueBearing} onChange={set("trueBearing")} placeholder="087.5" />
          <NumberField id="ce-c" label="Magnetic compass bearing" unit="°" value={form.compassBearing} onChange={set("compassBearing")} placeholder="091" />
          <NumberField id="ce-g" label="Gyro bearing" unit="°" value={form.gyroBearing} onChange={set("gyroBearing")} placeholder="088.5" />
          <NumberField id="ce-v" label="Variation" unit="°" value={form.errVariation} onChange={set("errVariation")} placeholder="2.5" help="East +, west −; for the deviation." />
        </FieldGrid>
        <Outcome title="Errors" rows={err.value} error={err.error} empty="Enter the true bearing and at least one observed bearing." />
        <ToolNotice>Deviation changes with the ship's head: record it with the heading at the time of the observation.</ToolNotice>
      </ToolSection>
    </>
  );
}
