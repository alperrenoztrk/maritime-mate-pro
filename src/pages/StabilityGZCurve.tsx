import { LineChart } from "lucide-react";
import { area, firstRoot, smoothCurve } from "@/lib/calc/stability";
import { ResultTable, ToolNotice, ToolPage, ToolSection, type ResultRow } from "@/components/tools/ToolKit";
import { GzChart } from "@/components/tools/GzChart";
import { fmt } from "@/components/tools/format";
import { GzInputsSection } from "@/components/stability/GzInputs";
import { useGzInputs } from "@/components/stability/useGzInputs";
import { StabilityDisclaimer } from "@/components/stability/StabilityDisclaimer";

export default function StabilityGZCurvePage() {
  const inputs = useGzInputs();
  const { gz, displacement } = inputs;
  const ready = gz.length > 0;
  const curve = ready ? smoothCurve(gz) : null;
  const top = ready ? Math.max(...gz.map((p) => p.angle)) : 0;

  let rows: ResultRow[] = [];
  if (curve) {
    let max = { angle: 0, value: curve(0) };
    for (let a = 0; a <= top; a += 0.1) if (curve(a) > max.value) max = { angle: a, value: curve(a) };
    const vanishing = firstRoot((a) => curve(a), Math.max(max.angle, 1), top);
    rows = [
      { label: "Maximum GZ", value: `${fmt(max.value, 3)} m at ${fmt(max.angle, 1)}°`, emphasis: true },
      { label: "Maximum righting moment", value: `${fmt(max.value * displacement, 0)} t·m` },
      { label: "Area 0° – 30°", value: `${fmt(area(curve, 0, Math.min(30, top)), 4)} m·rad` },
      ...(top >= 40 ? [{ label: "Area 0° – 40°", value: `${fmt(area(curve, 0, 40), 4)} m·rad` }] : []),
      {
        label: "Angle of vanishing stability",
        value: Number.isFinite(vanishing) ? `${fmt(vanishing, 1)}°` : `beyond ${fmt(top, 0)}° (table range)`,
      },
      ...gz.map((p) => ({ label: `GZ at ${p.angle}°`, value: `${fmt(p.value, 3)} m` })),
    ];
  }

  return (
    <ToolPage title="GZ Curve" icon={LineChart}>
      <StabilityDisclaimer />
      <GzInputsSection inputs={inputs} />
      <ToolSection title="Statical stability curve" icon={LineChart}>
        {curve ? (
          <>
            <GzChart title="Righting lever GZ" to={top} lines={[{ key: "gz", label: "GZ", value: curve, kind: "righting" }]} />
            <ResultTable title="Curve values" rows={rows} copyText={rows.map((r) => `${r.label}: ${r.value}`).join("\n")} />
          </>
        ) : (
          <ToolNotice tone={inputs.state.rows.some((r) => r.value && r.angle !== "0") ? "warning" : "info"}>
            {inputs.errors.length > 0 ? inputs.errors.map((e) => <p key={e}>{e}</p>) : "Enter the KN values to draw the curve."}
          </ToolNotice>
        )}
      </ToolSection>
    </ToolPage>
  );
}
