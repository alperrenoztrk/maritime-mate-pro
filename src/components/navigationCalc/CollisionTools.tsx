import { Radar, Ship, Shield } from "lucide-react";
import {
  assessColregSituation,
  computeArpaCpaTcpa,
  computeTargetMotionFromTwoRadarPlots,
  relativeToTrueBearing,
  type ColregSituation,
} from "@/components/calculations/navigationMath";
import { FieldGrid, FormulaLine, NumberField, ToolNotice, ToolSection, type ResultRow } from "@/components/tools/ToolKit";
import { fmt, parseNumber } from "@/components/tools/format";
import { ChoiceField, Outcome } from "./fields";
import { attempt, fmtBearing, need } from "./navFormat";
import { useNavForm } from "./useNavForm";

const tcpaText = (min: number) => (min >= 0 ? `${fmt(min, 1)} min` : `passed ${fmt(-min, 1)} min ago`);

export function CpaTool() {
  const { form, set } = useNavForm("cpa", {
    ownCourse: "",
    ownSpeed: "",
    bearingType: "true" as "true" | "relative",
    bearing: "",
    range: "",
    targetCourse: "",
    targetSpeed: "",
    limit: "1",
  });
  const { value: r, error } = attempt(() => {
    const oc = parseNumber(form.ownCourse);
    const os = parseNumber(form.ownSpeed);
    const b = parseNumber(form.bearing);
    const rg = parseNumber(form.range);
    const tc = parseNumber(form.targetCourse);
    const ts = parseNumber(form.targetSpeed);
    need(oc, os, b, rg, tc, ts);
    const trueBearing = form.bearingType === "true" ? b : relativeToTrueBearing(oc, b);
    return { trueBearing, ...computeArpaCpaTcpa({ targetBearingDeg: trueBearing, targetDistanceNm: rg, targetCourseDeg: tc, targetSpeedKn: ts, ownCourseDeg: oc, ownSpeedKn: os }) };
  });
  const limit = parseNumber(form.limit);
  const rows: ResultRow[] | null = r
    ? [
        { label: "CPA", value: `${fmt(r.cpaNm, 2)} nm`, emphasis: true },
        { label: "TCPA", value: tcpaText(r.tcpaMin), emphasis: true },
        { label: "Target true bearing", value: fmtBearing(r.trueBearing) },
        { label: "Direction of relative motion", value: fmtBearing(r.relativeBearingDeg) },
        { label: "Relative speed", value: `${fmt(r.relativeSpeedKn, 1)} kn` },
      ]
    : null;
  return (
    <ToolSection title="CPA and TCPA" icon={Radar}>
      <FormulaLine>TCPA = −(R₀ · Vr) / |Vr|² · CPA = |R₀ + Vr · TCPA|</FormulaLine>
      <FieldGrid>
        <NumberField id="cpa-oc" label="Own true course" unit="°" value={form.ownCourse} onChange={set("ownCourse")} placeholder="000" />
        <NumberField id="cpa-os" label="Own speed" unit="kn" value={form.ownSpeed} onChange={set("ownSpeed")} placeholder="12" />
        <ChoiceField
          id="cpa-bt"
          label="Target bearing is"
          value={form.bearingType}
          onChange={set("bearingType")}
          options={[
            { value: "true", label: "True bearing" },
            { value: "relative", label: "Relative bearing (from the bow, clockwise)" },
          ]}
        />
        <NumberField id="cpa-b" label="Target bearing" unit="°" value={form.bearing} onChange={set("bearing")} placeholder="045" />
        <NumberField id="cpa-r" label="Range" unit="nm" value={form.range} onChange={set("range")} placeholder="8" />
        <NumberField id="cpa-tc" label="Target true course" unit="°" value={form.targetCourse} onChange={set("targetCourse")} placeholder="270" />
        <NumberField id="cpa-ts" label="Target speed" unit="kn" value={form.targetSpeed} onChange={set("targetSpeed")} placeholder="14" />
        <NumberField id="cpa-lim" label="Your CPA limit" unit="nm" value={form.limit} onChange={set("limit")} placeholder="1" help="From the master's standing orders." />
      </FieldGrid>
      <Outcome title="Closest point of approach" rows={rows} error={error} />
      {r && r.opening && <ToolNotice>The range is opening: the closest approach has already passed.</ToolNotice>}
      {r && !r.opening && Number.isFinite(limit) && r.cpaNm < limit && (
        <ToolNotice tone="warning">CPA is inside your limit of {fmt(limit, 1)} nm: risk of collision must be assessed (Rule 7).</ToolNotice>
      )}
      <ToolNotice>Based on the courses and speeds entered. Keep plotting: assumptions on scanty radar information must not be made (Rule 7(c)).</ToolNotice>
    </ToolSection>
  );
}

export function RadarTool() {
  const { form, set } = useNavForm("radar", { ownCourse: "", ownSpeed: "", b1: "", r1: "", b2: "", r2: "", interval: "6" });
  const { value: r, error } = attempt(() => {
    const v = [form.ownCourse, form.ownSpeed, form.b1, form.r1, form.b2, form.r2, form.interval].map(parseNumber);
    need(...v);
    const [oc, os, b1, r1, b2, r2, minutes] = v;
    if (minutes <= 0) throw new Error("The interval must be > 0 minutes");
    const t0 = new Date(0);
    return computeTargetMotionFromTwoRadarPlots({
      plot1: { bearingTrueDeg: b1, rangeNm: r1, timeUtc: t0 },
      plot2: { bearingTrueDeg: b2, rangeNm: r2, timeUtc: new Date(minutes * 60_000) },
      ownCourseTrueDeg: oc,
      ownSpeedKn: os,
    });
  });
  const rows: ResultRow[] | null = r
    ? [
        { label: "Target true course", value: fmtBearing(r.targetCourseTrueDeg), emphasis: true },
        { label: "Target speed", value: `${fmt(r.targetSpeedKn, 1)} kn`, emphasis: true },
        { label: "Direction of relative motion", value: fmtBearing(r.relativeCourseDeg) },
        { label: "Relative speed", value: `${fmt(r.relativeSpeedKn, 1)} kn` },
        { label: "CPA", value: `${fmt(r.cpaNm, 2)} nm`, emphasis: true },
        { label: "TCPA (from the second plot)", value: tcpaText(r.tcpaMin) },
      ]
    : null;
  return (
    <ToolSection title="Radar plot from two observations" icon={Radar} description="True bearings and ranges of the same target, own course and speed steady between them.">
      <FormulaLine>Vrel = (P₂ − P₁) / Δt · Vtarget = Vrel + Vown</FormulaLine>
      <FieldGrid>
        <NumberField id="rd-oc" label="Own true course" unit="°" value={form.ownCourse} onChange={set("ownCourse")} placeholder="000" />
        <NumberField id="rd-os" label="Own speed" unit="kn" value={form.ownSpeed} onChange={set("ownSpeed")} placeholder="12" />
        <NumberField id="rd-b1" label="First plot: true bearing" unit="°" value={form.b1} onChange={set("b1")} placeholder="040" />
        <NumberField id="rd-r1" label="First plot: range" unit="nm" value={form.r1} onChange={set("r1")} placeholder="9.0" />
        <NumberField id="rd-b2" label="Second plot: true bearing" unit="°" value={form.b2} onChange={set("b2")} placeholder="038" />
        <NumberField id="rd-r2" label="Second plot: range" unit="nm" value={form.r2} onChange={set("r2")} placeholder="7.4" />
        <NumberField id="rd-dt" label="Interval between plots" unit="min" value={form.interval} onChange={set("interval")} placeholder="6" />
      </FieldGrid>
      <Outcome title="Target motion" rows={rows} error={error} />
      <ToolNotice>
        If the compass bearing of an approaching vessel does not appreciably change, risk of collision shall be deemed to
        exist; it may exist even with an appreciable bearing change, particularly with a very large vessel, a tow or at
        close range (Rule 7(d)).
      </ToolNotice>
    </ToolSection>
  );
}

const ACTION: Record<ColregSituation, { title: string; text: string }> = {
  "head-on": {
    title: "Head-on situation",
    text: "Each vessel alters course to starboard so that each passes on the port side of the other.",
  },
  "crossing-starboard": {
    title: "Crossing — the other vessel is on your starboard side",
    text: "You are the give-way vessel: keep out of the way, take early and substantial action and, if the circumstances admit, avoid crossing ahead of the other vessel.",
  },
  "crossing-port": {
    title: "Crossing — the other vessel is on your port side",
    text: "You are the stand-on vessel: keep your course and speed. You may act as soon as it becomes apparent that the give-way vessel is not taking appropriate action, but do not alter course to port for a vessel on your own port side; when collision cannot be avoided by the action of the give-way vessel alone, take such action as will best aid to avoid collision.",
  },
  overtaking: {
    title: "You are overtaking",
    text: "Keep out of the way of the vessel being overtaken until you are finally past and clear.",
  },
  "being-overtaken": {
    title: "You are being overtaken",
    text: "You are the stand-on vessel: keep your course and speed, and act as Rule 17 allows if the overtaking vessel does not keep out of the way.",
  },
};

export function ColregTool() {
  const { form, set } = useNavForm("colreg", { ownCourse: "", relBearing: "", targetCourse: "", tolerance: "6" });
  const { value: r, error } = attempt(() => {
    const oc = parseNumber(form.ownCourse);
    const rb = parseNumber(form.relBearing);
    const tc = parseNumber(form.targetCourse);
    need(oc, rb, tc);
    const tol = parseNumber(form.tolerance);
    return assessColregSituation({ ownCourseDeg: oc, targetRelativeBearingDeg: rb, targetCourseDeg: tc, aheadToleranceDeg: Number.isFinite(tol) ? tol : undefined });
  });
  const rows: ResultRow[] | null = r
    ? [
        { label: "Situation", value: ACTION[r.situation].title, emphasis: true },
        { label: "Your role", value: r.role === "both-alter" ? "Both alter to starboard" : r.role === "give-way" ? "Give-way" : "Stand-on", emphasis: true },
        { label: "Rules", value: r.rule },
        { label: "Relative bearing of own ship from the other vessel", value: fmtBearing(r.ownAspectDeg), hint: "From the other vessel's bow, clockwise" },
      ]
    : null;
  return (
    <ToolSection title="COLREG situation" icon={Shield} description="Two power-driven vessels in sight of one another, with risk of collision.">
      <FieldGrid>
        <NumberField id="cr-oc" label="Own true course" unit="°" value={form.ownCourse} onChange={set("ownCourse")} placeholder="000" />
        <NumberField id="cr-rb" label="Other vessel: relative bearing" unit="°" value={form.relBearing} onChange={set("relBearing")} placeholder="045" help="From your bow, clockwise." />
        <NumberField id="cr-tc" label="Other vessel: true course" unit="°" value={form.targetCourse} onChange={set("targetCourse")} placeholder="270" />
        <NumberField id="cr-tol" label="“Ahead or nearly ahead”" unit="°" value={form.tolerance} onChange={set("tolerance")} placeholder="6" help="COLREG gives no figure; when in doubt, treat it as head-on (Rule 14(c))." />
      </FieldGrid>
      <Outcome title="Assessment" rows={rows} error={error} />
      {r && <ToolNotice>{ACTION[r.situation].text}</ToolNotice>}
      <ToolNotice>
        <Ship className="mr-1 inline h-3 w-3" aria-hidden />
        Not for restricted visibility (Rule 19: no stand-on vessel) or when Rule 18 changes the responsibilities (NUC, RAM, CBD,
        fishing or sailing vessels); Rule 18 does not override Rule 13: an overtaking vessel always keeps out of the way.
        Overtaking means coming up from more than 22.5° abaft the other vessel's beam.
      </ToolNotice>
    </ToolSection>
  );
}
