import { useState } from "react";
import { Link } from "react-router-dom";
import { Package, Wheat } from "lucide-react";
import { grainCriteria, smoothCurve, type GrainResult } from "@/lib/calc/stability";
import { FieldGrid, FormulaLine, NumberField, ResultTable, ToolNotice, ToolPage, ToolSection } from "@/components/tools/ToolKit";
import { CriteriaTable } from "@/components/tools/CriteriaTable";
import { GzChart } from "@/components/tools/GzChart";
import { fmt, parseNumber } from "@/components/tools/format";
import { GzInputsSection } from "@/components/stability/GzInputs";
import { useGzInputs } from "@/components/stability/useGzInputs";
import { StabilityDisclaimer } from "@/components/stability/StabilityDisclaimer";
import { savedGrain } from "@/components/stability/grainForms";
import { useStabilityForm } from "@/components/stability/stabilityForms";

export default function StabilityGrainCalculationPage() {
  const inputs = useGzInputs();
  const saved = savedGrain();
  const [form, setForm] = useStabilityForm("grain-criteria", { volumetricMoment: "", stowageFactor: "", downflooding: "", deckEdge: "" });
  const set = (key: keyof typeof form) => (value: string) => setForm((prev) => ({ ...prev, [key]: value }));

  const mv = form.volumetricMoment ? parseNumber(form.volumetricMoment) : saved?.volumetric ?? Number.NaN;
  const sf = form.stowageFactor ? parseNumber(form.stowageFactor) : saved?.stowageFactor ?? Number.NaN;
  const thetaF = parseNumber(form.downflooding);
  const deckEdge = parseNumber(form.deckEdge);
  const top = inputs.gz.length ? Math.max(...inputs.gz.map((p) => p.angle)) : 0;

  let result: GrainResult | null = null;
  let error = "";
  if (inputs.gz.length > 0 && mv > 0 && sf > 0) {
    if (top < 40) error = "The KN table must extend to at least 40°.";
    else {
      try {
        result = grainCriteria({
          gz: inputs.gz,
          displacement: inputs.displacement,
          gmFluid: inputs.gmFluid,
          volumetricMoment: mv,
          stowageFactor: sf,
          downfloodingAngle: thetaF > 0 ? thetaF : undefined,
          deckEdgeAngle: deckEdge > 0 ? deckEdge : undefined,
        });
      } catch (e) {
        error = e instanceof Error ? e.message : "The criteria could not be evaluated.";
      }
    }
  }
  const curve = inputs.gz.length ? smoothCurve(inputs.gz) : null;

  return (
    <ToolPage title="Grain Stability Criteria" icon={Wheat}>
      <StabilityDisclaimer />
      <GzInputsSection inputs={inputs} />

      <ToolSection title="Grain heeling arm" icon={Wheat} description="International Grain Code A 7.">
        <FormulaLine>λ0 = Σ(Mv × factor) / (SF × Δ) · λ40 = 0.8 λ0</FormulaLine>
        <FieldGrid>
          <NumberField id="gc-mv" label="Σ Mv × factor" unit="m⁴" value={form.volumetricMoment} onChange={set("volumetricMoment")} placeholder={saved ? fmt(saved.volumetric, 0) : "5800"} help={saved ? "Empty: value from Grain Heeling Moment." : undefined} />
          <NumberField id="gc-sf" label="Stowage factor" unit="m³/t" value={form.stowageFactor} onChange={set("stowageFactor")} placeholder={saved ? fmt(saved.stowageFactor, 2) : "1.30"} />
          <NumberField id="gc-thetaf" label="Angle of flooding θf" unit="°" value={form.downflooding} onChange={set("downflooding")} placeholder="40" />
          <NumberField id="gc-deck" label="Deck edge immersion angle" unit="°" value={form.deckEdge} onChange={set("deckEdge")} placeholder="14" help="Heel limit is 12° or this angle if less (ships built from 1 Jan 1994)." />
        </FieldGrid>
        {!saved && !form.volumetricMoment && (
          <ToolNotice>
            Work out the moments per compartment on the{" "}
            <Link to="/stability/practical/ghm" className="font-semibold text-primary underline">Grain Heeling Moment</Link> page.
          </ToolNotice>
        )}
        {error && <ToolNotice tone="warning">{error}</ToolNotice>}
        {result && curve && (
          <>
            <GzChart
              title="Grain heeling arm against GZ"
              to={Math.min(top, 60)}
              lines={[
                { key: "gz", label: "GZ", value: curve, kind: "righting" },
                { key: "lambda", label: "Grain heeling arm", value: (a) => result!.lambda0 + ((result!.lambda40 - result!.lambda0) * a) / 40, kind: "heeling" },
              ]}
              markers={[{ angle: Math.round(result.heelAngle * 10) / 10, label: "heel" }, { angle: Math.round(result.residualUpper * 10) / 10, label: "limit" }]}
            />
            <CriteriaTable title="Grain Code A 7.1" criteria={result.criteria} />
            <ResultTable
              title="Working"
              rows={[
                { label: "λ0 / λ40", value: `${fmt(result.lambda0, 4)} / ${fmt(result.lambda40, 4)} m` },
                { label: "Angle of heel", value: `${fmt(result.heelAngle, 2)}°` },
                { label: "Residual area", value: `${fmt(result.residualArea, 4)} m·rad up to ${fmt(result.residualUpper, 1)}°`, emphasis: true },
              ]}
            />
          </>
        )}
      </ToolSection>

      <HoldCapacity />
    </ToolPage>
  );
}

/** Weight of grain that fills a compartment, and stowage factor from a known parcel. */
function HoldCapacity() {
  const [v, setV] = useState({ volume: "", sf: "", weight: "" });
  const volume = parseNumber(v.volume);
  const sf = parseNumber(v.sf);
  const weight = parseNumber(v.weight);
  const rows = [];
  if (volume > 0 && sf > 0) rows.push({ label: "Weight that fills the compartment", value: `${fmt(volume / sf, 1)} t`, emphasis: true });
  if (volume > 0 && weight > 0) rows.push({ label: "Stowage factor of this parcel", value: `${fmt(volume / weight, 3)} m³/t` });
  return (
    <ToolSection title="Compartment capacity" icon={Package} description="Filled compartment: cargo weight = grain capacity / stowage factor (Grain Code B 1.3).">
      <FormulaLine>W = V / SF · SF = V / W</FormulaLine>
      <FieldGrid columns={3}>
        <NumberField id="hc-v" label="Grain capacity" unit="m³" value={v.volume} onChange={(x) => setV((p) => ({ ...p, volume: x }))} placeholder="12500" />
        <NumberField id="hc-sf" label="Stowage factor" unit="m³/t" value={v.sf} onChange={(x) => setV((p) => ({ ...p, sf: x }))} placeholder="1.30" />
        <NumberField id="hc-w" label="Weight (optional)" unit="t" value={v.weight} onChange={(x) => setV((p) => ({ ...p, weight: x }))} placeholder="" />
      </FieldGrid>
      {rows.length > 0 && <ResultTable title="Capacity" rows={rows} />}
    </ToolSection>
  );
}
