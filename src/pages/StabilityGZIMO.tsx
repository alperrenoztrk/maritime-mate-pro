import { ShieldCheck } from "lucide-react";
import { isCodeGeneralCriteria, smoothCurve } from "@/lib/calc/stability";
import { FormulaLine, NumberField, ToolNotice, ToolPage, ToolSection } from "@/components/tools/ToolKit";
import { CriteriaTable } from "@/components/tools/CriteriaTable";
import { GzChart } from "@/components/tools/GzChart";
import { parseNumber } from "@/components/tools/format";
import { GzInputsSection } from "@/components/stability/GzInputs";
import { useGzInputs } from "@/components/stability/useGzInputs";
import { StabilityDisclaimer } from "@/components/stability/StabilityDisclaimer";
import { useStabilityForm } from "@/components/stability/stabilityForms";

/** IS Code 2008 Part A 2.2 check with GZ worked out from the KN cross curves. */
export default function StabilityGZIMO() {
  const inputs = useGzInputs();
  const [extra, setExtra] = useStabilityForm("gz-imo", { downflooding: "" });
  const theta = parseNumber(extra.downflooding);
  const top = inputs.gz.length ? Math.max(...inputs.gz.map((p) => p.angle)) : 0;

  let content: JSX.Element;
  if (inputs.gz.length === 0) {
    content = <ToolNotice>{inputs.errors.length ? inputs.errors.map((e) => <p key={e}>{e}</p>) : "Enter the KN values."}</ToolNotice>;
  } else if (top < 40) {
    content = <ToolNotice tone="warning">The KN table must extend to at least 40° for the IS Code areas.</ToolNotice>;
  } else {
    const result = isCodeGeneralCriteria(inputs.gz, inputs.gmFluid, Number.isFinite(theta) && theta > 0 ? theta : undefined);
    const curve = smoothCurve(inputs.gz);
    content = (
      <>
        <GzChart
          title="Righting lever GZ"
          to={top}
          lines={[{ key: "gz", label: "GZ", value: curve, kind: "righting" }]}
          markers={result.upperAngle < 40 ? [{ angle: result.upperAngle, label: "θf" }] : []}
        />
        <CriteriaTable title="IS Code 2008 Part A 2.2" criteria={result.criteria} />
      </>
    );
  }

  return (
    <ToolPage title="IS Code Check from KN" icon={ShieldCheck}>
      <StabilityDisclaimer />
      <GzInputsSection inputs={inputs} />
      <ToolSection title="General intact stability criteria" icon={ShieldCheck} description="IMO 2008 IS Code (MSC.267(85)) Part A 2.2.">
        <FormulaLine>Areas 0–30° ≥ 0.055 · 0–40° ≥ 0.090 · 30–40° ≥ 0.030 m·rad</FormulaLine>
        <NumberField
          id="gzimo-theta-f"
          label="Downflooding angle θf (optional)"
          unit="°"
          value={extra.downflooding}
          onChange={(value) => setExtra({ downflooding: value })}
          placeholder="45"
          help="From the booklet; if below 40° the 40° areas stop at θf."
        />
        {content}
      </ToolSection>
    </ToolPage>
  );
}
