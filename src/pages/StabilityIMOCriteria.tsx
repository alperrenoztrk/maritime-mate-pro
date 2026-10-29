import { ShieldCheck, TableProperties } from "lucide-react";
import { isCodeGeneralCriteria, smoothCurve } from "@/lib/calc/stability";
import { FieldGrid, FormulaLine, NumberField, ToolNotice, ToolPage, ToolSection } from "@/components/tools/ToolKit";
import { EditableTable, type TableRow } from "@/components/tools/EditableTable";
import { CriteriaTable } from "@/components/tools/CriteriaTable";
import { GzChart } from "@/components/tools/GzChart";
import { parseNumber } from "@/components/tools/format";
import { DEFAULT_KN_ANGLES, parseCurveRows, useStabilityForm } from "@/components/stability/stabilityForms";
import { StabilityDisclaimer } from "@/components/stability/StabilityDisclaimer";

const initial = {
  gm0: "",
  downflooding: "",
  rows: DEFAULT_KN_ANGLES.map((angle): TableRow => ({ angle, value: angle === "0" ? "0" : "" })),
};

/** IS Code 2008 Part A 2.2 with GZ values typed from the booklet or loading instrument printout. */
export default function StabilityIMOCriteriaPage() {
  const [form, setForm] = useStabilityForm("imo-criteria", initial);
  const gm0 = parseNumber(form.gm0);
  const theta = parseNumber(form.downflooding);
  const { points, errors } = parseCurveRows(form.rows);
  const top = points.length ? Math.max(...points.map((p) => p.angle)) : 0;
  const typed = form.rows.some((r) => r.value && r.angle !== "0");

  const problems = [...errors];
  if (!Number.isFinite(gm0)) problems.push("Initial GM (fluid) is required.");
  if (errors.length === 0 && top < 40) problems.push("GZ values must extend to at least 40°.");
  const result = problems.length === 0 ? isCodeGeneralCriteria(points, gm0, Number.isFinite(theta) && theta > 0 ? theta : undefined) : null;

  return (
    <ToolPage title="IMO Stability Criteria" icon={ShieldCheck}>
      <StabilityDisclaimer />
      <ToolSection title="Righting levers" icon={TableProperties} description="GZ at each heel angle, corrected for free surface, from the booklet or the loading instrument.">
        <EditableTable
          caption="GZ table"
          columns={[{ key: "angle", label: "Heel", unit: "°" }, { key: "value", label: "GZ", unit: "m" }]}
          rows={form.rows}
          onChange={(rows) => setForm((prev) => ({ ...prev, rows }))}
          newRow={() => ({ angle: "", value: "" })}
          addLabel="Add angle"
        />
        <FieldGrid>
          <NumberField id="imo-gm0" label="Initial GM (fluid)" unit="m" value={form.gm0} onChange={(v) => setForm((p) => ({ ...p, gm0: v }))} placeholder="1.20" />
          <NumberField id="imo-thetaf" label="Downflooding angle θf (optional)" unit="°" value={form.downflooding} onChange={(v) => setForm((p) => ({ ...p, downflooding: v }))} placeholder="45" />
        </FieldGrid>
      </ToolSection>

      <ToolSection title="IS Code 2008 Part A 2.2" icon={ShieldCheck} description="General criteria for cargo and passenger ships.">
        <FormulaLine>Areas 0–30° ≥ 0.055 · 0–40°(θf) ≥ 0.090 · 30–40°(θf) ≥ 0.030 m·rad · GZ ≥ 0.20 m at ≥ 30° · GZmax at ≥ 25° · GM0 ≥ 0.15 m</FormulaLine>
        {result ? (
          <>
            <GzChart
              title="Righting lever GZ"
              to={top}
              lines={[{ key: "gz", label: "GZ", value: smoothCurve(points), kind: "righting" }]}
              markers={result.upperAngle < 40 ? [{ angle: result.upperAngle, label: "θf" }] : []}
            />
            <CriteriaTable title="Result" criteria={result.criteria} />
          </>
        ) : (
          <ToolNotice tone={typed ? "warning" : "info"}>{typed ? problems.map((p) => <p key={p}>{p}</p>) : "Enter the GZ values and the initial GM."}</ToolNotice>
        )}
        <ToolNotice>
          Areas are integrated on a shape-preserving cubic through the table values. Ships may also have to meet the
          weather criterion (2.3) and any special criteria for their type.
        </ToolNotice>
      </ToolSection>
    </ToolPage>
  );
}
