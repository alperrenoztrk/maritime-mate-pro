import { RotateCw } from "lucide-react";
import { calculateTurning } from "@/components/calculations/navigationMath";
import { FieldGrid, FormulaLine, NumberField, ToolNotice, ToolSection, type ResultRow } from "@/components/tools/ToolKit";
import { fmt, parseNumber } from "@/components/tools/format";
import { Outcome } from "./fields";
import { attempt, need } from "./navFormat";
import { useNavForm } from "./useNavForm";

export function TurningTool() {
  const { form, set } = useNavForm("turning", { td: "", length: "", alteration: "", speed: "" });
  const { value: r, error } = attempt(() => {
    const a = parseNumber(form.alteration);
    const v = parseNumber(form.speed);
    const td = parseNumber(form.td);
    const l = parseNumber(form.length);
    need(a, v);
    if (!Number.isFinite(td)) need(l);
    return calculateTurning({ shipLengthM: l, courseChangeDeg: a, speedKn: v, tacticalDiameterM: Number.isFinite(td) ? td : undefined });
  });
  const rows: ResultRow[] | null = r
    ? [
        { label: "Turning radius", value: `${fmt(r.radiusM, 0)} m`, hint: r.tacticalDiameterEstimated ? "From 3.5 × L (rough estimate)" : "Half the tactical diameter; the steady turning radius is slightly smaller" },
        { label: "Wheel-over before the course intersection", value: `${fmt(r.wheelOverDistanceM, 0)} m`, emphasis: true, hint: `${fmt(r.wheelOverDistanceM / 1852, 2)} nm` },
        { label: "Advance (from the start of the turn)", value: `${fmt(r.advanceM, 0)} m` },
        { label: "Transfer", value: `${fmt(r.transferM, 0)} m` },
        { label: "Rate of turn", value: `${fmt(r.rotDegPerMin, 1)} °/min`, emphasis: true },
      ]
    : null;
  return (
    <ToolSection title="Turn on a constant radius" icon={RotateCw}>
      <FormulaLine>R = TD / 2 · WOP = R tan(Δ/2) · advance = R sin Δ · transfer = R (1 − cos Δ) · ROT = V / R</FormulaLine>
      <FieldGrid>
        <NumberField id="tn-a" label="Alteration of course" unit="°" value={form.alteration} onChange={set("alteration")} placeholder="60" />
        <NumberField id="tn-v" label="Speed" unit="kn" value={form.speed} onChange={set("speed")} placeholder="12" />
        <NumberField id="tn-td" label="Tactical diameter" unit="m" value={form.td} onChange={set("td")} placeholder="620" help="From the wheelhouse poster / manoeuvring booklet for this speed, loading and rudder angle." />
        <NumberField id="tn-l" label="Length overall" unit="m" value={form.length} onChange={set("length")} placeholder="180" help="Only if the tactical diameter is not known." />
      </FieldGrid>
      <Outcome title="Turn" rows={rows} error={error} />
      {r?.tacticalDiameterEstimated && (
        <ToolNotice tone="warning">No tactical diameter entered: 3.5 × L is only a rough figure. Use the ship's trial data.</ToolNotice>
      )}
      <ToolNotice>
        Circular-arc geometry. The ship runs on before she starts to turn, so the real advance is larger: put the wheel over
        earlier by that distance, as the manoeuvring data show. Check the turn against parallel indexes or the ECDIS.
      </ToolNotice>
    </ToolSection>
  );
}
