import { Globe2, Map, MapPinned, Route, Ruler, Waves } from "lucide-react";
import {
  calculateDeadReckoning,
  calculateGreatCircle,
  calculateMiddleLatitudeSailing,
  calculateRhumbLine,
  chartCmToNm,
  chartNmToCm,
  generateGreatCircleWaypoints,
  planeSailingFromCourse,
  planeSailingFromDLatDep,
  solveCurrentTriangle,
} from "@/components/calculations/navigationMath";
import { FieldGrid, FormulaLine, NumberField, ToolNotice, ToolSection, type ResultRow } from "@/components/tools/ToolKit";
import { fmt, parseNumber, signed } from "@/components/tools/format";
import { ChoiceField, Outcome, PositionField } from "./fields";
import { attempt, fmtBearing, fmtLat, fmtLon, lat, lon, need, positionToDecimal, type PositionInput } from "./navFormat";
import { useNavForm } from "./useNavForm";

type Route2 = { lat1: PositionInput; lon1: PositionInput; lat2: PositionInput; lon2: PositionInput };
const ROUTE: Route2 = { lat1: lat(), lon1: lon(), lat2: lat(), lon2: lon() };

function RouteFields({ id, form, set }: { id: string; form: Route2; set: <K extends keyof Route2>(k: K) => (v: Route2[K]) => void }) {
  return (
    <FieldGrid>
      <PositionField id={`${id}-lat1`} label="From latitude" kind="lat" value={form.lat1} onChange={set("lat1")} />
      <PositionField id={`${id}-lon1`} label="From longitude" kind="lon" value={form.lon1} onChange={set("lon1")} />
      <PositionField id={`${id}-lat2`} label="To latitude" kind="lat" value={form.lat2} onChange={set("lat2")} />
      <PositionField id={`${id}-lon2`} label="To longitude" kind="lon" value={form.lon2} onChange={set("lon2")} />
    </FieldGrid>
  );
}

const routeOf = (f: Route2) => {
  const p = [positionToDecimal(f.lat1, "lat"), positionToDecimal(f.lon1, "lon"), positionToDecimal(f.lat2, "lat"), positionToDecimal(f.lon2, "lon")];
  need(...p);
  return p as [number, number, number, number];
};

export function GreatCircleTool() {
  const { form, set } = useNavForm("gc", { ...ROUTE, segments: "10" });
  const { value: r, error } = attempt(() => {
    const [la1, lo1, la2, lo2] = routeOf(form);
    const gc = calculateGreatCircle(la1, lo1, la2, lo2);
    const rl = calculateRhumbLine(la1, lo1, la2, lo2);
    const n = Math.round(parseNumber(form.segments));
    const points = n >= 1 && n <= 60 ? generateGreatCircleWaypoints({ start: { latDeg: la1, lonDeg: lo1 }, end: { latDeg: la2, lonDeg: lo2 }, segments: n }) : [];
    return { gc, rl, points };
  });

  const rows: ResultRow[] | null = r
    ? [
        { label: "Great circle distance", value: `${fmt(r.gc.distance, 1)} nm`, emphasis: true },
        { label: "Initial course", value: fmtBearing(r.gc.initialCourse) },
        { label: "Final course (on arrival)", value: fmtBearing(r.gc.finalCourse) },
        ...(r.gc.vertex
          ? [
              {
                label: "Vertex",
                value: `${fmtLat(r.gc.vertex.latDeg)}  ${fmtLon(r.gc.vertex.lonDeg)}`,
                hint: r.gc.vertex.onRoute ? "Lies on this route" : "Lies beyond the destination or before the departure",
              },
            ]
          : []),
        { label: "Rhumb line distance", value: `${fmt(r.rl.distance, 1)} nm`, hint: `Course ${fmtBearing(r.rl.course)}` },
        { label: "Saving on the great circle", value: `${fmt(r.rl.distance - r.gc.distance, 1)} nm` },
      ]
    : null;

  return (
    <>
      <ToolSection title="Route" icon={Globe2}>
        <FormulaLine>cos d = sin φ₁ sin φ₂ + cos φ₁ cos φ₂ cos d.long · cos φv = cos φ₁ · |sin C|</FormulaLine>
        <RouteFields id="gc" form={form} set={set} />
        <NumberField id="gc-seg" label="Waypoints: number of legs" value={form.segments} onChange={set("segments")} placeholder="10" help="1–60 legs of equal great circle distance." />
        <Outcome title="Great circle" rows={rows} error={error} />
      </ToolSection>
      {r && r.points.length > 1 && (
        <ToolSection title="Waypoints" icon={MapPinned} description="Steer the rhumb line between consecutive waypoints.">
          <div className="overflow-x-auto rounded-lg border border-border/40">
            <table className="w-full min-w-[30rem] text-xs">
              <caption className="sr-only">Great circle waypoints</caption>
              <thead className="bg-muted/40 text-muted-foreground">
                <tr>
                  <th scope="col" className="px-2 py-1.5 text-left font-medium">WP</th>
                  <th scope="col" className="px-2 py-1.5 text-left font-medium">Latitude</th>
                  <th scope="col" className="px-2 py-1.5 text-left font-medium">Longitude</th>
                  <th scope="col" className="px-2 py-1.5 text-right font-medium">Course to next</th>
                  <th scope="col" className="px-2 py-1.5 text-right font-medium">Distance</th>
                </tr>
              </thead>
              <tbody translate="no" className="notranslate divide-y divide-border/40 font-mono">
                {r.points.map((p, i) => {
                  const next = r.points[i + 1];
                  const leg = next ? calculateRhumbLine(p.latDeg, p.lonDeg, next.latDeg, next.lonDeg) : null;
                  return (
                    <tr key={i}>
                      <td className="px-2 py-1.5">{i}</td>
                      <td className="px-2 py-1.5">{fmtLat(p.latDeg)}</td>
                      <td className="px-2 py-1.5">{fmtLon(p.lonDeg)}</td>
                      <td className="px-2 py-1.5 text-right">{leg ? fmtBearing(leg.course) : "—"}</td>
                      <td className="px-2 py-1.5 text-right">{leg ? `${fmt(leg.distance, 1)} nm` : "—"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </ToolSection>
      )}
      <ToolNotice>Spherical Earth (R = 3,440.065 nm). Check the route against the chart for land, ice limits and load line zones.</ToolNotice>
    </>
  );
}

export function RhumbTool() {
  const { form, set } = useNavForm("rhumb", ROUTE);
  const { value: r, error } = attempt(() => {
    const [la1, lo1, la2, lo2] = routeOf(form);
    return calculateRhumbLine(la1, lo1, la2, lo2);
  });
  const rows: ResultRow[] | null = r
    ? [
        { label: "Course", value: fmtBearing(r.course), emphasis: true },
        { label: "Distance", value: `${fmt(r.distance, 1)} nm`, emphasis: true },
        { label: "d.lat", value: `${signed(r.dLatMin, 1)}′`, hint: "+ north" },
        { label: "d.long", value: `${signed(r.dLongMin, 1)}′`, hint: "+ east" },
        { label: "DMP", value: `${signed(r.dmp, 1)}′`, hint: "Difference of meridional parts (WGS 84)" },
      ]
    : null;
  return (
    <ToolSection title="Mercator sailing" icon={Map}>
      <FormulaLine>tan C = d.long / DMP · D = d.lat / cos C</FormulaLine>
      <RouteFields id="rh" form={form} set={set} />
      <Outcome title="Rhumb line" rows={rows} error={error} />
    </ToolSection>
  );
}

export function PlaneTool() {
  const { form, set } = useNavForm("plane", { mode: "course" as "course" | "dlat", course: "", distance: "", dLat: "", dep: "" });
  const byCourse = attempt(() => {
    const c = parseNumber(form.course);
    const d = parseNumber(form.distance);
    need(c, d);
    return planeSailingFromCourse(c, d);
  });
  const byDLat = attempt(() => {
    const dl = parseNumber(form.dLat);
    const dp = parseNumber(form.dep);
    need(dl, dp);
    return planeSailingFromDLatDep(dl, dp);
  });
  const { value: a, error: errorA } = byCourse;
  const { value: b, error: errorB } = byDLat;
  const rows: ResultRow[] | null =
    form.mode === "course"
      ? a && [
          { label: "d.lat", value: `${signed(a.dLatMin, 1)}′`, hint: "+ north", emphasis: true },
          { label: "Departure", value: `${signed(a.depMin, 1)} nm`, hint: "+ east", emphasis: true },
        ]
      : b && [
          { label: "Course", value: fmtBearing(b.courseDeg), emphasis: true },
          { label: "Distance", value: `${fmt(b.distanceNm, 1)} nm`, emphasis: true },
        ];
  const error = form.mode === "course" ? errorA : errorB;
  return (
    <ToolSection title="Plane sailing" icon={Route}>
      <FormulaLine>d.lat = D cos C · dep = D sin C · tan C = dep / d.lat</FormulaLine>
      <ChoiceField
        id="pl-mode"
        label="Solve for"
        value={form.mode}
        onChange={set("mode")}
        options={[
          { value: "course", label: "d.lat and departure from course and distance" },
          { value: "dlat", label: "Course and distance from d.lat and departure" },
        ]}
      />
      <FieldGrid>
        {form.mode === "course" ? (
          <>
            <NumberField id="pl-c" label="True course" unit="°" value={form.course} onChange={set("course")} placeholder="045" />
            <NumberField id="pl-d" label="Distance" unit="nm" value={form.distance} onChange={set("distance")} placeholder="120" />
          </>
        ) : (
          <>
            <NumberField id="pl-dl" label="d.lat" unit="′" value={form.dLat} onChange={set("dLat")} placeholder="84.9" help="+ north, − south" />
            <NumberField id="pl-dep" label="Departure" unit="nm" value={form.dep} onChange={set("dep")} placeholder="84.9" help="+ east, − west" />
          </>
        )}
      </FieldGrid>
      <Outcome title="Plane sailing" rows={rows} error={error} />
    </ToolSection>
  );
}

export function MidLatTool() {
  const { form, set } = useNavForm("midlat", ROUTE);
  const { value: r, error } = attempt(() => {
    const [la1, lo1, la2, lo2] = routeOf(form);
    return calculateMiddleLatitudeSailing({ lat1Deg: la1, lon1Deg: lo1, lat2Deg: la2, lon2Deg: lo2 });
  });
  const crossesEquator = r ? Math.sign(positionToDecimal(form.lat1, "lat")) * Math.sign(positionToDecimal(form.lat2, "lat")) < 0 : false;
  const rows: ResultRow[] | null = r
    ? [
        { label: "Course", value: fmtBearing(r.courseDeg), emphasis: true },
        { label: "Distance", value: `${fmt(r.distanceNm, 1)} nm`, emphasis: true },
        { label: "Mean latitude", value: fmtLat(r.meanLatDeg) },
        { label: "d.lat", value: `${signed(r.dLatMin, 1)}′` },
        { label: "d.long", value: `${signed(r.dLongMin, 1)}′` },
        { label: "Departure", value: `${signed(r.departureMin, 1)} nm` },
      ]
    : null;
  return (
    <ToolSection title="Mid-latitude sailing" icon={Route}>
      <FormulaLine>dep = d.long × cos φm · tan C = dep / d.lat · D = d.lat / cos C</FormulaLine>
      <RouteFields id="ml" form={form} set={set} />
      {crossesEquator && <ToolNotice tone="warning">The route crosses the equator: work each side separately or use Mercator sailing.</ToolNotice>}
      <Outcome title="Mid-latitude sailing" rows={rows} error={error} />
      <ToolNotice>For short distances (a day's run). For longer passages use Mercator or great circle sailing.</ToolNotice>
    </ToolSection>
  );
}

export function PositionTool() {
  const { form, set } = useNavForm("position", { lat1: lat(), lon1: lon(), course: "", distance: "", speed: "", hours: "" });
  const { value: r, error } = attempt(() => {
    const la = positionToDecimal(form.lat1, "lat");
    const lo = positionToDecimal(form.lon1, "lon");
    const c = parseNumber(form.course);
    const d = Number.isFinite(parseNumber(form.distance)) ? parseNumber(form.distance) : parseNumber(form.speed) * parseNumber(form.hours);
    need(la, lo, c, d);
    return { d, p: calculateDeadReckoning({ start: { latDeg: la, lonDeg: lo }, courseTrueDeg: c, distanceNm: d }) };
  });
  const rows: ResultRow[] | null = r
    ? [
        { label: "DR latitude", value: fmtLat(r.p.latDeg), emphasis: true },
        { label: "DR longitude", value: fmtLon(r.p.lonDeg), emphasis: true },
        { label: "Distance run", value: `${fmt(r.d, 1)} nm` },
      ]
    : null;
  return (
    <ToolSection title="Dead reckoning position" icon={MapPinned}>
      <FormulaLine>d.lat = D cos C · d.long = D sin C / cos φm</FormulaLine>
      <FieldGrid>
        <PositionField id="dr-lat" label="Start latitude" kind="lat" value={form.lat1} onChange={set("lat1")} />
        <PositionField id="dr-lon" label="Start longitude" kind="lon" value={form.lon1} onChange={set("lon1")} />
        <NumberField id="dr-c" label="True course" unit="°" value={form.course} onChange={set("course")} placeholder="060" />
        <NumberField id="dr-d" label="Distance" unit="nm" value={form.distance} onChange={set("distance")} placeholder="45" help="Or leave empty and enter speed and time." />
        <NumberField id="dr-v" label="Speed" unit="kn" value={form.speed} onChange={set("speed")} placeholder="12" />
        <NumberField id="dr-t" label="Time" unit="h" value={form.hours} onChange={set("hours")} placeholder="3.75" />
      </FieldGrid>
      <Outcome title="DR position" rows={rows} error={error} />
      <ToolNotice>Course and speed through the water give the DR; apply leeway and the set and drift of the current for the EP.</ToolNotice>
    </ToolSection>
  );
}

export function ChartTool() {
  const { form, set } = useNavForm("chart", { scale: "", cm: "", nm: "" });
  const scale = parseNumber(form.scale);
  const toNm = attempt(() => {
    need(scale, parseNumber(form.cm));
    return chartCmToNm(parseNumber(form.cm), scale);
  });
  const toCm = attempt(() => {
    need(scale, parseNumber(form.nm));
    return chartNmToCm(parseNumber(form.nm), scale);
  });
  const rows: ResultRow[] = [
    ...(toNm.value !== undefined ? [{ label: `${form.cm} cm on the chart`, value: `${fmt(toNm.value, 2)} nm`, emphasis: true }] : []),
    ...(toCm.value !== undefined ? [{ label: `${form.nm} nm`, value: `${fmt(toCm.value, 2)} cm on the chart`, emphasis: true }] : []),
  ];
  return (
    <ToolSection title="Chart scale" icon={Ruler}>
      <FormulaLine>distance (nm) = length (cm) × scale / 185,200</FormulaLine>
      <FieldGrid columns={3}>
        <NumberField id="ch-s" label="Scale 1 :" value={form.scale} onChange={set("scale")} placeholder="50000" />
        <NumberField id="ch-cm" label="Length on chart" unit="cm" value={form.cm} onChange={set("cm")} placeholder="7.4" />
        <NumberField id="ch-nm" label="Distance" unit="nm" value={form.nm} onChange={set("nm")} placeholder="2" />
      </FieldGrid>
      <Outcome title="Chart scale" rows={rows} error={toNm.error ?? toCm.error} />
      <ToolNotice>On a Mercator chart the scale changes with latitude: measure distances on the latitude scale beside the area.</ToolNotice>
    </ToolSection>
  );
}

export function CurrentTool() {
  const { form, set } = useNavForm("current", { track: "", speed: "", set: "", drift: "", leeway: "" });
  const { value: r, error } = attempt(() => {
    const v = [form.track, form.speed, form.set, form.drift].map(parseNumber);
    need(...v);
    const lw = parseNumber(form.leeway);
    return solveCurrentTriangle({ courseDeg: v[0], speedKn: v[1], setDeg: v[2], driftKn: v[3], leewayDeg: Number.isFinite(lw) ? lw : 0 });
  });
  const rows: ResultRow[] | null = r
    ? [
        { label: "Course to steer (true)", value: fmtBearing(r.courseToSteerDeg), emphasis: true },
        { label: "Correction from the track", value: `${fmt(Math.abs(r.correctionDeg), 1)}° to ${r.correctionDeg < 0 ? "port" : "starboard"}` },
        { label: "Speed made good", value: `${fmt(r.groundSpeedKn, 2)} kn`, emphasis: true },
        { label: "Water track", value: fmtBearing(r.waterTrackDeg), hint: "Course through the water: CTS + leeway" },
      ]
    : null;
  return (
    <ToolSection title="Course to steer for a current" icon={Waves}>
      <FormulaLine>sin(CTS − track) = drift × sin(track − set) / V · then allow for leeway</FormulaLine>
      <FieldGrid>
        <NumberField id="ct-tr" label="Track to make good" unit="°" value={form.track} onChange={set("track")} placeholder="090" />
        <NumberField id="ct-v" label="Speed through the water" unit="kn" value={form.speed} onChange={set("speed")} placeholder="12" />
        <NumberField id="ct-set" label="Set (direction towards)" unit="°" value={form.set} onChange={set("set")} placeholder="180" />
        <NumberField id="ct-dr" label="Drift (rate)" unit="kn" value={form.drift} onChange={set("drift")} placeholder="2" />
        <NumberField id="ct-lw" label="Leeway" unit="°" value={form.leeway} onChange={set("leeway")} placeholder="0" help="+ when the wind pushes the ship to starboard (wind on the port side)." />
      </FieldGrid>
      <Outcome title="Current triangle" rows={rows} error={error} />
      {r && !r.feasible && <ToolNotice tone="warning">The current is too strong for this speed: the track cannot be made good.</ToolNotice>}
    </ToolSection>
  );
}
