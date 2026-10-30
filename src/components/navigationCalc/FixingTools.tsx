import { Eye, MapPinned, Monitor, Navigation } from "lucide-react";
import {
  calculateCrossTrackDistance,
  calculateDistance,
  calculateFixFromBearingAndDistance,
  calculateFixFromThreeBearings,
  calculateFixFromTwoBearings,
  calculateFixFromTwoDistances,
  calculateLookAheadDistance,
  calculateRunningFix,
  calculateTwoBearingsOnBow,
  type LatLon,
} from "@/components/calculations/navigationMath";
import { FieldGrid, FormulaLine, NumberField, ToolNotice, ToolSection, type ResultRow } from "@/components/tools/ToolKit";
import { fmt, parseNumber } from "@/components/tools/format";
import { ChoiceField, Outcome, PositionField } from "./fields";
import { attempt, fmtLat, fmtLon, lat, lon, need, positionToDecimal, type PositionInput } from "./navFormat";
import { useNavForm } from "./useNavForm";

export function BearingsTool() {
  const { form, set } = useNavForm("bearings", { first: "", second: "", run: "", speed: "", minutes: "" });
  const { value: r, error } = attempt(() => {
    const a = parseNumber(form.first);
    const b = parseNumber(form.second);
    const run = Number.isFinite(parseNumber(form.run)) ? parseNumber(form.run) : (parseNumber(form.speed) * parseNumber(form.minutes)) / 60;
    need(a, b, run);
    return { run, ...calculateTwoBearingsOnBow(a, b, run) };
  });
  const rows: ResultRow[] | null = r
    ? [
        { label: "Distance off at the second bearing", value: `${fmt(r.distanceAtSecondBearingNm, 2)} nm`, emphasis: true },
        { label: "Distance off when abeam", value: `${fmt(r.distanceAbeamNm, 2)} nm`, emphasis: true, hint: "If course and speed are kept" },
        { label: "Run between bearings", value: `${fmt(r.run, 2)} nm` },
      ]
    : null;
  return (
    <ToolSection title="Two bearings of one object" icon={Navigation} description="Relative bearings (angles on the bow) of the same object, same side, course and speed steady.">
      <FormulaLine>d₂ = run × sin θ₁ / sin(θ₂ − θ₁) · abeam = d₂ × sin θ₂</FormulaLine>
      <FieldGrid>
        <NumberField id="bb-1" label="First angle on the bow" unit="°" value={form.first} onChange={set("first")} placeholder="30" />
        <NumberField id="bb-2" label="Second angle on the bow" unit="°" value={form.second} onChange={set("second")} placeholder="60" />
        <NumberField id="bb-run" label="Run between bearings" unit="nm" value={form.run} onChange={set("run")} placeholder="4.5" help="Or leave empty and enter speed and time." />
        <NumberField id="bb-v" label="Speed" unit="kn" value={form.speed} onChange={set("speed")} placeholder="12" />
        <NumberField id="bb-t" label="Time between bearings" unit="min" value={form.minutes} onChange={set("minutes")} placeholder="22.5" />
      </FieldGrid>
      <Outcome title="Distance off" rows={rows} error={error} />
      <ToolNotice>
        Special cases: doubling the angle on the bow (e.g. 30°→60°, 45°→90°) gives distance off at the second bearing = run;
        22.5°→45° gives distance abeam ≈ 0.7 × run. The run is over the ground: allow for current.
      </ToolNotice>
    </ToolSection>
  );
}

type FixMethod = "two" | "three" | "running" | "bd" | "ranges";
type Obj = { lat: PositionInput; lon: PositionInput; brg: string; dist: string };
const obj = (): Obj => ({ lat: lat(), lon: lon(), brg: "", dist: "" });

function ObjectFields({ id, label, value, onChange, show }: { id: string; label: string; value: Obj; onChange: (v: Obj) => void; show: { brg?: boolean; dist?: boolean } }) {
  return (
    <fieldset className="space-y-2 rounded-lg border border-border/40 p-3">
      <legend className="px-1 text-xs font-semibold">{label}</legend>
      <FieldGrid>
        <PositionField id={`${id}-lat`} label="Latitude" kind="lat" value={value.lat} onChange={(v) => onChange({ ...value, lat: v })} />
        <PositionField id={`${id}-lon`} label="Longitude" kind="lon" value={value.lon} onChange={(v) => onChange({ ...value, lon: v })} />
        {show.brg && <NumberField id={`${id}-brg`} label="True bearing from the ship" unit="°" value={value.brg} onChange={(v) => onChange({ ...value, brg: v })} placeholder="045" />}
        {show.dist && <NumberField id={`${id}-dist`} label="Range" unit="nm" value={value.dist} onChange={(v) => onChange({ ...value, dist: v })} placeholder="3.2" />}
      </FieldGrid>
    </fieldset>
  );
}

const posOf = (o: Obj): LatLon => {
  const p = { latDeg: positionToDecimal(o.lat, "lat"), lonDeg: positionToDecimal(o.lon, "lon") };
  need(p.latDeg, p.lonDeg);
  return p;
};
const num = (v: string) => {
  const n = parseNumber(v);
  need(n);
  return n;
};

export function FixTool() {
  const { form, set } = useNavForm("fix", { method: "two" as FixMethod, a: obj(), b: obj(), c: obj(), runCourse: "", runDistance: "" });
  const m = form.method;
  const { value: r, error } = attempt((): { fixes: LatLon[]; rows: ResultRow[]; cut?: number } => {
    switch (m) {
      case "two": {
        const x = calculateFixFromTwoBearings({ object1: posOf(form.a), bearingToObject1TrueDeg: num(form.a.brg), object2: posOf(form.b), bearingToObject2TrueDeg: num(form.b.brg) });
        return { fixes: [x.fix], cut: x.intersectionAngleDeg, rows: [{ label: "Angle of cut", value: `${fmt(x.intersectionAngleDeg, 0)}°` }] };
      }
      case "three": {
        const x = calculateFixFromThreeBearings({
          object1: posOf(form.a),
          bearingToObject1TrueDeg: num(form.a.brg),
          object2: posOf(form.b),
          bearingToObject2TrueDeg: num(form.b.brg),
          object3: posOf(form.c),
          bearingToObject3TrueDeg: num(form.c.brg),
        });
        return {
          fixes: [x.fix],
          cut: x.bestIntersectionAngleDeg,
          rows: [{ label: "Cocked hat (RMS distance from the lines)", value: `${fmt(x.residualNm, 2)} nm`, hint: "Large value: check bearings, compass error and object identification" }],
        };
      }
      case "running": {
        const x = calculateRunningFix({
          objectOld: posOf(form.a),
          bearing1TrueDeg: num(form.a.brg),
          objectNew: posOf(form.b),
          bearing2TrueDeg: num(form.b.brg),
          runCourseTrueDeg: num(form.runCourse),
          runDistanceNm: num(form.runDistance),
        });
        return { fixes: [x.fix], cut: x.intersectionAngleDeg, rows: [{ label: "Angle of cut", value: `${fmt(x.intersectionAngleDeg, 0)}°` }] };
      }
      case "bd": {
        const x = calculateFixFromBearingAndDistance({ object: posOf(form.a), bearingToObjectTrueDeg: num(form.a.brg), distanceToObjectNm: num(form.a.dist) });
        return { fixes: [x.fix], rows: [] };
      }
      case "ranges": {
        const x = calculateFixFromTwoDistances({ object1: posOf(form.a), distanceToObject1Nm: num(form.a.dist), object2: posOf(form.b), distanceToObject2Nm: num(form.b.dist) });
        if (x.candidates.length === 0) throw new Error("The range circles do not intersect: check the ranges and the objects.");
        return { fixes: x.candidates, rows: x.candidates.length > 1 ? [{ label: "Two intersections", value: "Choose by a bearing or the DR" }] : [] };
      }
    }
  });
  const rows: ResultRow[] | null = r
    ? [
        ...r.fixes.flatMap((f, i) => [
          { label: r.fixes.length > 1 ? `Position ${i + 1}: latitude` : "Fix latitude", value: fmtLat(f.latDeg), emphasis: true },
          { label: r.fixes.length > 1 ? `Position ${i + 1}: longitude` : "Fix longitude", value: fmtLon(f.lonDeg), emphasis: true },
        ]),
        ...r.rows,
      ]
    : null;
  const two = m === "two" || m === "three" || m === "running";
  return (
    <ToolSection title="Position fixing" icon={MapPinned}>
      <ChoiceField
        id="fx-m"
        label="Method"
        value={m}
        onChange={set("method")}
        options={[
          { value: "two", label: "Cross bearings (two objects)" },
          { value: "three", label: "Cross bearings (three objects)" },
          { value: "running", label: "Running fix" },
          { value: "bd", label: "Bearing and range of one object" },
          { value: "ranges", label: "Ranges of two objects" },
        ]}
      />
      <ObjectFields id="fx-a" label={m === "running" ? "Object at the first bearing" : "Object A"} value={form.a} onChange={set("a")} show={{ brg: m !== "ranges", dist: m === "bd" || m === "ranges" }} />
      {(two || m === "ranges") && (
        <ObjectFields id="fx-b" label={m === "running" ? "Object at the second bearing" : "Object B"} value={form.b} onChange={set("b")} show={{ brg: two, dist: m === "ranges" }} />
      )}
      {m === "three" && <ObjectFields id="fx-c" label="Object C" value={form.c} onChange={set("c")} show={{ brg: true }} />}
      {m === "running" && (
        <FieldGrid>
          <NumberField id="fx-rc" label="Course made good between bearings" unit="°" value={form.runCourse} onChange={set("runCourse")} placeholder="090" />
          <NumberField id="fx-rd" label="Distance made good between bearings" unit="nm" value={form.runDistance} onChange={set("runDistance")} placeholder="6" />
        </FieldGrid>
      )}
      <Outcome title="Fix" rows={rows} error={error} />
      {r?.cut !== undefined && r.cut < 30 && <ToolNotice tone="warning">Angle of cut below 30°: a small bearing error moves the fix a long way.</ToolNotice>}
      <ToolNotice>Flat-plane solution for coastal distances. Bearings are true: apply the compass or gyro error first.</ToolNotice>
    </ToolSection>
  );
}

export function DistanceTool() {
  const { form, set } = useNavForm("distance", { eye: "", light: "", aerial: "", target: "" });
  const eye = parseNumber(form.eye);
  const rows: ResultRow[] = [];
  let error: string | undefined;
  const add = (label: string, compute: () => number, hint?: string) => {
    const r = attempt(compute);
    if (r.error) error = r.error;
    if (r.value !== undefined) rows.push({ label, value: `${fmt(r.value, 1)} nm`, emphasis: true, hint });
  };
  add("Distance of the sea horizon", () => (need(eye), calculateDistance({ type: "horizon", heightM: eye }).distanceNm));
  add(
    "Geographical range of the light (dipping distance)",
    () => (need(eye, parseNumber(form.light)), calculateDistance({ type: "light", heightM: eye, lightHeightM: parseNumber(form.light) }).distanceNm),
  );
  add(
    "Radar horizon of the aerial",
    () => (need(parseNumber(form.aerial)), calculateDistance({ type: "radar", heightM: parseNumber(form.aerial) }).distanceNm),
  );
  add(
    "Radar detection range limit for the target height",
    () => {
      const a = parseNumber(form.aerial);
      const t = parseNumber(form.target);
      need(a, t);
      return calculateDistance({ type: "radar", heightM: a }).distanceNm + calculateDistance({ type: "radar", heightM: t }).distanceNm;
    },
    "Horizon limit only; the echo also depends on the target and the radar",
  );
  return (
    <ToolSection title="Ranges" icon={Eye} description="Standard atmospheric refraction; heights in metres.">
      <FormulaLine>horizon 2.08√h · light 2.08(√H + √h) · radar 2.23(√h₁ + √h₂)</FormulaLine>
      <FieldGrid>
        <NumberField id="ds-eye" label="Height of eye" unit="m" value={form.eye} onChange={set("eye")} placeholder="16" />
        <NumberField id="ds-light" label="Elevation of the light" unit="m" value={form.light} onChange={set("light")} placeholder="45" help="As charted (above MHWS or the stated datum)." />
        <NumberField id="ds-aer" label="Radar aerial height" unit="m" value={form.aerial} onChange={set("aerial")} placeholder="30" />
        <NumberField id="ds-tgt" label="Target height" unit="m" value={form.target} onChange={set("target")} placeholder="10" />
      </FieldGrid>
      <Outcome title="Ranges" rows={rows} error={error} />
      <ToolNotice>
        A light is seen at the lesser of its geographical range and its luminous range for the visibility (List of Lights
        diagram). Abnormal refraction changes these ranges.
      </ToolNotice>
    </ToolSection>
  );
}

export function EcdisTool() {
  const { form, set } = useNavForm("ecdis", { lat1: lat(), lon1: lon(), lat2: lat(), lon2: lon(), plat: lat(), plon: lon(), sog: "", minutes: "" });
  const xtd = attempt(() => {
    const p = [form.lat1, form.lon1, form.lat2, form.lon2, form.plat, form.plon].map((v, i) => positionToDecimal(v, i % 2 ? "lon" : "lat"));
    need(...p);
    return calculateCrossTrackDistance({ legStart: { latDeg: p[0], lonDeg: p[1] }, legEnd: { latDeg: p[2], lonDeg: p[3] }, position: { latDeg: p[4], lonDeg: p[5] } });
  });
  const look = attempt(() => {
    const s = parseNumber(form.sog);
    const t = parseNumber(form.minutes);
    need(s, t);
    return calculateLookAheadDistance(s, t).lookAheadDistanceNm;
  });
  const rows: ResultRow[] = [
    ...(xtd.value
      ? [
          { label: "Cross-track distance", value: `${fmt(xtd.value.xtdNm, 2)} nm ${xtd.value.side === "on-track" ? "" : `to ${xtd.value.side}`}`.trim(), emphasis: true, hint: "Side of the planned track the ship is on" },
          { label: "Along-track from the leg start", value: `${fmt(xtd.value.alongTrackNm, 2)} nm` },
        ]
      : []),
    ...(look.value !== undefined ? [{ label: "Look-ahead distance", value: `${fmt(look.value, 2)} nm`, emphasis: true }] : []),
  ];
  return (
    <ToolSection title="Cross-track distance and look-ahead" icon={Monitor}>
      <FormulaLine>look-ahead = SOG × time</FormulaLine>
      <FieldGrid>
        <PositionField id="ec-lat1" label="Leg start latitude" kind="lat" value={form.lat1} onChange={set("lat1")} />
        <PositionField id="ec-lon1" label="Leg start longitude" kind="lon" value={form.lon1} onChange={set("lon1")} />
        <PositionField id="ec-lat2" label="Leg end latitude" kind="lat" value={form.lat2} onChange={set("lat2")} />
        <PositionField id="ec-lon2" label="Leg end longitude" kind="lon" value={form.lon2} onChange={set("lon2")} />
        <PositionField id="ec-plat" label="Ship latitude" kind="lat" value={form.plat} onChange={set("plat")} />
        <PositionField id="ec-plon" label="Ship longitude" kind="lon" value={form.plon} onChange={set("plon")} />
        <NumberField id="ec-sog" label="SOG" unit="kn" value={form.sog} onChange={set("sog")} placeholder="12" />
        <NumberField id="ec-t" label="Look-ahead time" unit="min" value={form.minutes} onChange={set("minutes")} placeholder="6" />
      </FieldGrid>
      <Outcome title="Route monitoring" rows={rows} error={xtd.error ?? look.error} />
      <ToolNotice>Flat-plane cross-track for a coastal leg. Set the XTL and safety contour on the ECDIS itself.</ToolNotice>
    </ToolSection>
  );
}
