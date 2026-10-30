import { CalendarClock, Clock, Gauge, Route, Timer } from "lucide-react";
import {
  calculateRemaining,
  kmhToKnots,
  knotsToKmh,
  knotsToMs,
  longitudeDegToTimeMinutes,
  msToKnots,
  solveSpeedDistanceTime,
  utcToLocalMeanTime,
  utcToZoneTime,
} from "@/components/calculations/navigationMath";
import { FieldGrid, FormulaLine, NumberField, ToolNotice, ToolSection, type ResultRow } from "@/components/tools/ToolKit";
import { EditableTable, type TableRow } from "@/components/tools/EditableTable";
import { fmt, parseNumber } from "@/components/tools/format";
import { ChoiceField, Outcome, PositionField, UtcField } from "./fields";
import { attempt, fmtHours, fmtUtc, lon, need, parseUtc, positionToDecimal } from "./navFormat";
import { useNavForm } from "./useNavForm";

const fmtZone = (date: Date, offsetH: number) =>
  Number.isFinite(date.getTime()) ? `${date.toISOString().slice(0, 16).replace("T", " ")} (UTC${offsetH >= 0 ? "+" : "−"}${fmt(Math.abs(offsetH), offsetH % 1 ? 1 : 0)})` : "—";

type SpeedUnit = "kn" | "kmh" | "ms";

export function EtaTool() {
  const { form, set } = useNavForm("eta", {
    distance: "",
    speed: "",
    hours: "",
    etd: "",
    zone: "",
    planned: "",
    dmg: "",
    sog: "",
    checkTime: "",
    convertValue: "",
    convertFrom: "kn" as SpeedUnit,
    timeUtc: "",
    lmtLon: lon(),
  });

  const sdt = attempt(() => {
    const known = [form.distance, form.speed, form.hours].filter((v) => Number.isFinite(parseNumber(v))).length;
    if (known < 2) need(Number.NaN);
    const opt = (v: string) => (Number.isFinite(parseNumber(v)) ? parseNumber(v) : undefined);
    return solveSpeedDistanceTime({ distanceNm: opt(form.distance), speedKn: opt(form.speed), timeHours: opt(form.hours) });
  });
  const zone = Number.isFinite(parseNumber(form.zone)) ? parseNumber(form.zone) : 0;
  const etd = parseUtc(form.etd);
  const eta = sdt.value && Number.isFinite(etd.getTime()) ? new Date(etd.getTime() + sdt.value.timeHours * 3600_000) : null;
  const sdtRows: ResultRow[] | null = sdt.value
    ? [
        { label: "Distance", value: `${fmt(sdt.value.distanceNm, 1)} nm` },
        { label: "Speed", value: `${fmt(sdt.value.speedKn, 2)} kn` },
        { label: "Time", value: fmtHours(sdt.value.timeHours), hint: `${fmt(sdt.value.timeHours, 2)} h`, emphasis: true },
        ...(eta
          ? [
              { label: "ETA", value: fmtUtc(eta), emphasis: true },
              ...(form.zone.trim() ? [{ label: "ETA zone time", value: fmtZone(utcToZoneTime(eta, zone), zone) }] : []),
            ]
          : []),
      ]
    : null;

  const remaining = attempt(() => {
    const p = parseNumber(form.planned);
    const d = parseNumber(form.dmg);
    const s = parseNumber(form.sog);
    need(p, d, s);
    if (s <= 0) throw new Error("Speed over ground must be > 0");
    const r = calculateRemaining({ plannedTotalDistanceNm: p, distanceMadeGoodNm: d, currentSogKn: s });
    const at = parseUtc(form.checkTime);
    return { ...r, eta: Number.isFinite(at.getTime()) ? new Date(at.getTime() + r.remainingTimeHours * 3600_000) : null };
  });
  const remRows: ResultRow[] | null = remaining.value
    ? [
        { label: "Distance to go", value: `${fmt(remaining.value.remainingDistanceNm, 1)} nm` },
        { label: "Time to go", value: fmtHours(remaining.value.remainingTimeHours), emphasis: true },
        ...(remaining.value.eta ? [{ label: "ETA at this SOG", value: fmtUtc(remaining.value.eta), emphasis: true }] : []),
      ]
    : null;

  const cv = parseNumber(form.convertValue);
  const asKn = form.convertFrom === "kn" ? cv : form.convertFrom === "kmh" ? kmhToKnots(cv) : msToKnots(cv);
  const convRows: ResultRow[] | null = Number.isFinite(cv)
    ? [
        { label: "Knots", value: `${fmt(asKn, 2)} kn` },
        { label: "Kilometres per hour", value: `${fmt(knotsToKmh(asKn), 2)} km/h` },
        { label: "Metres per second", value: `${fmt(knotsToMs(asKn), 2)} m/s` },
      ]
    : null;

  const time = attempt(() => {
    const t = parseUtc(form.timeUtc);
    const lo = positionToDecimal(form.lmtLon, "lon");
    need(t.getTime(), lo);
    return { t, lo, lmt: utcToLocalMeanTime(t, lo), arcMin: longitudeDegToTimeMinutes(lo) };
  });
  const timeRows: ResultRow[] | null = time.value
    ? [
        ...(form.zone.trim() ? [{ label: "Zone time", value: fmtZone(utcToZoneTime(time.value.t, zone), zone) }] : []),
        { label: "Longitude in time", value: `${time.value.arcMin >= 0 ? "+" : "−"}${fmtHours(Math.abs(time.value.arcMin) / 60)}`, hint: "4 min per degree; east +" },
        { label: "Local mean time", value: time.value.lmt.toISOString().slice(0, 16).replace("T", " "), emphasis: true },
      ]
    : null;

  return (
    <>
      <ToolSection title="Speed, distance and time" icon={Timer} description="Enter any two; the third is calculated.">
        <FormulaLine>D = V × t</FormulaLine>
        <FieldGrid columns={3}>
          <NumberField id="eta-d" label="Distance" unit="nm" value={form.distance} onChange={set("distance")} placeholder="240" />
          <NumberField id="eta-v" label="Speed" unit="kn" value={form.speed} onChange={set("speed")} placeholder="12.5" />
          <NumberField id="eta-t" label="Time" unit="h" value={form.hours} onChange={set("hours")} placeholder="" />
        </FieldGrid>
        <FieldGrid>
          <UtcField id="eta-etd" label="ETD" value={form.etd} onChange={set("etd")} help="Optional, for the ETA." />
          <NumberField id="eta-zone" label="Zone time offset" unit="h" value={form.zone} onChange={set("zone")} placeholder="+3" help="Zone time = UTC + offset (UTC+3 → 3). The zone description has the opposite sign." />
        </FieldGrid>
        <Outcome title="Passage time" rows={sdtRows} error={sdt.error} empty="Enter two of distance, speed and time." />
      </ToolSection>

      <ToolSection title="Distance and time to go" icon={Clock}>
        <FieldGrid>
          <NumberField id="eta-plan" label="Planned distance" unit="nm" value={form.planned} onChange={set("planned")} placeholder="540" />
          <NumberField id="eta-dmg" label="Distance made good" unit="nm" value={form.dmg} onChange={set("dmg")} placeholder="315" />
          <NumberField id="eta-sog" label="Speed over ground" unit="kn" value={form.sog} onChange={set("sog")} placeholder="11.8" />
          <UtcField id="eta-now" label="Time of this check" value={form.checkTime} onChange={set("checkTime")} help="Optional, for the ETA." />
        </FieldGrid>
        <Outcome title="To go" rows={remRows} error={remaining.error} />
      </ToolSection>

      <ToolSection title="Speed units" icon={Gauge}>
        <FormulaLine>1 kn = 1.852 km/h = 0.5144 m/s</FormulaLine>
        <FieldGrid>
          <NumberField id="eta-cv" label="Speed" value={form.convertValue} onChange={set("convertValue")} placeholder="14" />
          <ChoiceField
            id="eta-cu"
            label="Unit"
            value={form.convertFrom}
            onChange={set("convertFrom")}
            options={[
              { value: "kn", label: "Knots" },
              { value: "kmh", label: "km/h" },
              { value: "ms", label: "m/s" },
            ]}
          />
        </FieldGrid>
        <Outcome title="Speed" rows={convRows} />
      </ToolSection>

      <ToolSection title="Zone time and local mean time" icon={CalendarClock}>
        <FormulaLine>LMT = UTC + longitude (E +) × 4 min/°</FormulaLine>
        <FieldGrid>
          <UtcField id="eta-utc" label="Time" value={form.timeUtc} onChange={set("timeUtc")} />
          <PositionField id="eta-lmt" label="Longitude" kind="lon" value={form.lmtLon} onChange={set("lmtLon")} />
        </FieldGrid>
        <Outcome title="Time" rows={timeRows} error={time.error} />
      </ToolSection>
    </>
  );
}

const leg = (): TableRow => ({ name: "", distance: "", sog: "", stop: "" });

export function PassageTool() {
  const { form, set } = useNavForm("passage", { etd: "", legs: [leg(), leg(), leg()] });
  const etd = parseUtc(form.etd);
  const { value: plan, error } = attempt(() => {
    need(etd.getTime());
    const legs = form.legs.filter((l) => l.distance.trim() !== "" || l.sog.trim() !== "");
    if (legs.length === 0) need(Number.NaN);
    let t = etd.getTime();
    return legs.map((l, i) => {
      const d = parseNumber(l.distance);
      const v = parseNumber(l.sog);
      const stop = Number.isFinite(parseNumber(l.stop)) ? parseNumber(l.stop) : 0;
      const name = l.name.trim() || `Leg ${i + 1}`;
      if (!(d >= 0) || !(v > 0)) throw new Error(`${name}: enter the distance and a speed above 0.`);
      const hours = d / v;
      const depart = new Date(t);
      t += hours * 3600_000;
      const arrive = new Date(t);
      t += stop * 3600_000;
      return { name, d, v, hours, depart, arrive, stop };
    });
  });
  const total = plan ? plan.reduce((a, l) => a + l.d, 0) : 0;
  const rows: ResultRow[] | null = plan
    ? [
        ...plan.map((l) => ({ label: `${l.name} · ${fmt(l.d, 1)} nm at ${fmt(l.v, 1)} kn`, value: fmtUtc(l.arrive), hint: `Steaming ${fmtHours(l.hours)}${l.stop ? `, then ${fmtHours(l.stop)} stop` : ""}` })),
        { label: "Total distance", value: `${fmt(total, 1)} nm` },
        { label: "Final ETA", value: fmtUtc(plan[plan.length - 1].arrive), emphasis: true },
      ]
    : null;
  return (
    <ToolSection title="Passage legs" icon={Route}>
      <UtcField id="ps-etd" label="ETD" value={form.etd} onChange={set("etd")} />
      <EditableTable
        caption="Passage legs"
        columns={[
          { key: "name", label: "Leg", text: true, placeholder: "Pilot – WP1" },
          { key: "distance", label: "Distance", unit: "nm" },
          { key: "sog", label: "Planned SOG", unit: "kn" },
          { key: "stop", label: "Stop after", unit: "h" },
        ]}
        rows={form.legs}
        onChange={(legs) => set("legs")(legs)}
        newRow={leg}
        addLabel="Add leg"
      />
      <Outcome title="Passage plan ETAs" rows={rows} error={error} empty="Enter the ETD and at least one leg." />
      <ToolNotice>ETAs assume the planned speed over ground on each leg; revise them with the actual SOG during the passage.</ToolNotice>
    </ToolSection>
  );
}
