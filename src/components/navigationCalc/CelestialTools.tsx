import { Globe2, Sun, Sunrise } from "lucide-react";
import {
  calculateAmplitude,
  calculateSightReduction,
  computeSunAlmanac,
  correctSextantAltitude,
  latitudeByMeridianAltitude,
} from "@/components/calculations/navigationMath";
import { getSunAriesAlmanac2025Utc } from "@/utils/nauticalAlmanac2025";
import { FieldGrid, FormulaLine, NumberField, ToolNotice, ToolSection, type ResultRow } from "@/components/tools/ToolKit";
import { fmt, parseNumber, signed } from "@/components/tools/format";
import { ChoiceField, Outcome, PositionField, UtcField } from "./fields";
import { attempt, fmtBearing, fmtEW, fmtLat, lat, lon, need, parseUtc, positionToDecimal } from "./navFormat";
import { useNavForm } from "./useNavForm";

/** 23°26.3′ */
const fmtDegMin = (value: number) => {
  if (!Number.isFinite(value)) return "—";
  const abs = Math.abs(value);
  let d = Math.floor(abs);
  let m = Math.round((abs - d) * 600) / 10;
  if (m >= 60) {
    d += 1;
    m = 0;
  }
  return `${value < 0 ? "−" : ""}${d}° ${m.toFixed(1).padStart(4, "0")}′`;
};
const fmtDec = (value: number) => (Number.isFinite(value) ? `${fmtDegMin(Math.abs(value))} ${value < 0 ? "S" : "N"}` : "—");
const norm360 = (x: number) => ((x % 360) + 360) % 360;

const interceptRows = (ho: number, hc: number, zn: number): ResultRow[] => {
  const p = (ho - hc) * 60;
  return [
    { label: "Intercept", value: `${fmt(Math.abs(p), 1)} nm ${p >= 0 ? "towards" : "away"}`, emphasis: true, hint: "Ho − Hc; towards the body when Ho is greater" },
    { label: "Azimuth Zn", value: fmtBearing(zn), emphasis: true },
  ];
};

export function SightTool() {
  const { form, set } = useNavForm("sight", { lat: lat(), dec: lat(), lha: "", ho: "" });
  const { value: r, error } = attempt(() => {
    const la = positionToDecimal(form.lat, "lat");
    const de = positionToDecimal(form.dec, "lat");
    const lha = parseNumber(form.lha);
    need(la, de, lha);
    return calculateSightReduction({ latDeg: la, decDeg: de, lhaDeg: norm360(lha) });
  });
  const ho = parseNumber(form.ho);
  const rows: ResultRow[] | null = r
    ? [
        { label: "Calculated altitude Hc", value: fmtDegMin(r.hcDeg), emphasis: true },
        { label: "Azimuth Zn", value: fmtBearing(r.azimuthDeg), emphasis: true },
        ...(Number.isFinite(ho) ? interceptRows(ho, r.hcDeg, r.azimuthDeg).slice(0, 1) : []),
      ]
    : null;
  return (
    <ToolSection title="Sight reduction" icon={Globe2}>
      <FormulaLine>sin Hc = sin φ sin δ + cos φ cos δ cos LHA</FormulaLine>
      <FieldGrid>
        <PositionField id="sr-lat" label="Assumed latitude" kind="lat" value={form.lat} onChange={set("lat")} />
        <PositionField id="sr-dec" label="Declination" kind="lat" value={form.dec} onChange={set("dec")} />
        <NumberField id="sr-lha" label="LHA" unit="°" value={form.lha} onChange={set("lha")} placeholder="39.5" />
        <NumberField id="sr-ho" label="Observed altitude Ho" unit="°" value={form.ho} onChange={set("ho")} placeholder="38.75" help="Optional, decimal degrees, for the intercept." />
      </FieldGrid>
      <Outcome title="Sight reduction" rows={rows} error={error} />
    </ToolSection>
  );
}

export function AstroTool() {
  const { form, set } = useNavForm("astro", {
    time: "",
    apLat: lat(),
    apLon: lon(),
    gha: "",
    dec: lat(),
    hs: "",
    ie: "0",
    he: "",
    limb: "lower" as "lower" | "upper",
    sd: "16.0",
    pressure: "1010",
    temp: "10",
  });
  const t = parseUtc(form.time);
  const builtIn = Number.isFinite(t.getTime()) ? computeSunAlmanac(t) : null;
  const fromTable = Number.isFinite(t.getTime()) && getSunAriesAlmanac2025Utc(t) !== null;

  const { value: r, error } = attempt(() => {
    const la = positionToDecimal(form.apLat, "lat");
    const lo = positionToDecimal(form.apLon, "lon");
    const hs = parseNumber(form.hs);
    need(la, lo, hs);
    const enteredGha = parseNumber(form.gha);
    const enteredDec = positionToDecimal(form.dec, "lat");
    const useEntered = Number.isFinite(enteredGha) && Number.isFinite(enteredDec);
    if (!useEntered && !builtIn) need(Number.NaN);
    const gha = useEntered ? enteredGha : (builtIn as NonNullable<typeof builtIn>).ghaSunDeg;
    const dec = useEntered ? enteredDec : (builtIn as NonNullable<typeof builtIn>).decSunDeg;
    const corr = correctSextantAltitude({
      hsDeg: hs,
      indexErrorMin: parseNumber(form.ie) || 0,
      heightOfEyeM: parseNumber(form.he) || 0,
      pressureHPa: Number.isFinite(parseNumber(form.pressure)) ? parseNumber(form.pressure) : 1010,
      temperatureC: Number.isFinite(parseNumber(form.temp)) ? parseNumber(form.temp) : 10,
      limb: form.limb,
      semiDiameterMin: parseNumber(form.sd) || 0,
      horizontalParallaxMin: 0.15,
    });
    const lha = norm360(gha + lo);
    const sr = calculateSightReduction({ latDeg: la, decDeg: dec, lhaDeg: lha });
    return { useEntered, gha, dec, lha, corr, sr };
  });
  const rows: ResultRow[] | null = r
    ? [
        { label: "Dip of the horizon", value: `−${fmt(r.corr.dipMin, 1)}′` },
        { label: "Apparent altitude Ha", value: fmtDegMin(r.corr.haDeg) },
        { label: "Refraction", value: `−${fmt(r.corr.refractionMin, 1)}′` },
        { label: "Semi-diameter", value: `${signed(r.corr.semiDiameterMin, 1)}′` },
        { label: "Parallax", value: `+${fmt(r.corr.parallaxMin, 1)}′` },
        { label: "Observed altitude Ho", value: fmtDegMin(r.corr.hoDeg), emphasis: true },
        { label: "GHA", value: fmtDegMin(r.gha), hint: r.useEntered ? "As entered" : fromTable ? "Built-in 2025 almanac table" : "Built-in low-precision formula (about ±0.5′)" },
        { label: "Declination", value: fmtDec(r.dec) },
        { label: "LHA", value: fmtDegMin(r.lha), hint: "GHA + east longitude − west longitude" },
        { label: "Calculated altitude Hc", value: fmtDegMin(r.sr.hcDeg) },
        ...interceptRows(r.corr.hoDeg, r.sr.hcDeg, r.sr.azimuthDeg),
      ]
    : null;
  return (
    <>
      <ToolSection title="Sun sight: altitude corrections and intercept" icon={Sun}>
        <FormulaLine>Ho = Hs − IE − dip − R ± SD + P · p = Ho − Hc</FormulaLine>
        <FieldGrid>
          <UtcField id="as-t" label="Time of the sight" value={form.time} onChange={set("time")} />
          <NumberField id="as-hs" label="Sextant altitude Hs" unit="°" value={form.hs} onChange={set("hs")} placeholder="42.35" help="Decimal degrees (42° 21′ = 42.35)." />
          <PositionField id="as-lat" label="Assumed / DR latitude" kind="lat" value={form.apLat} onChange={set("apLat")} />
          <PositionField id="as-lon" label="Assumed / DR longitude" kind="lon" value={form.apLon} onChange={set("apLon")} />
          <NumberField id="as-ie" label="Index error" unit="′" value={form.ie} onChange={set("ie")} placeholder="0" help="+ on the arc (subtracted), − off the arc (added)." />
          <NumberField id="as-he" label="Height of eye" unit="m" value={form.he} onChange={set("he")} placeholder="18" />
          <ChoiceField
            id="as-limb"
            label="Limb observed"
            value={form.limb}
            onChange={set("limb")}
            options={[
              { value: "lower", label: "Lower limb (+SD)" },
              { value: "upper", label: "Upper limb (−SD)" },
            ]}
          />
          <NumberField id="as-sd" label="Sun's semi-diameter" unit="′" value={form.sd} onChange={set("sd")} placeholder="16.0" help="From the Nautical Almanac daily page (15.8′–16.3′)." />
          <NumberField id="as-p" label="Pressure" unit="hPa" value={form.pressure} onChange={set("pressure")} placeholder="1010" />
          <NumberField id="as-tc" label="Air temperature" unit="°C" value={form.temp} onChange={set("temp")} placeholder="10" />
        </FieldGrid>
      </ToolSection>
      <ToolSection title="Almanac" icon={Globe2} description="Enter GHA and declination from the Nautical Almanac, or leave them empty to use the built-in Sun ephemeris.">
        <FieldGrid>
          <NumberField id="as-gha" label="GHA of the Sun" unit="°" value={form.gha} onChange={set("gha")} placeholder="359.535" help="Decimal degrees." />
          <PositionField id="as-dec" label="Declination" kind="lat" value={form.dec} onChange={set("dec")} />
        </FieldGrid>
        {builtIn && (
          <p className="text-xs text-muted-foreground">
            Built-in for this time: GHA {fmtDegMin(builtIn.ghaSunDeg)}, Dec {fmtDec(builtIn.decSunDeg)} ({fromTable ? "2025 almanac table" : "low-precision formula, about ±0.5′"}).
          </p>
        )}
        <Outcome title="Sun sight" rows={rows} error={error} empty="Enter the time, the assumed position and the sextant altitude." />
        <ToolNotice>Plot the position line at right angles to Zn through the intercept point from the assumed position.</ToolNotice>
      </ToolSection>
    </>
  );
}

export function CelestialTool() {
  const { form, set } = useNavForm("celestial", {
    ho: "",
    dec: lat(),
    bears: "S" as "N" | "S",
    aLat: lat(),
    aDec: lat(),
    riseSet: "rising" as "rising" | "setting",
    compass: "",
  });
  const mer = attempt(() => {
    const ho = parseNumber(form.ho);
    const de = positionToDecimal(form.dec, "lat");
    need(ho, de);
    return latitudeByMeridianAltitude(ho, de, form.bears);
  });
  const amp = attempt(() => {
    const la = positionToDecimal(form.aLat, "lat");
    const de = positionToDecimal(form.aDec, "lat");
    need(la, de);
    const c = parseNumber(form.compass);
    return calculateAmplitude({ latDeg: la, decDeg: de, riseOrSet: form.riseSet, compassBearingDeg: Number.isFinite(c) ? c : undefined });
  });
  const ampRows: ResultRow[] | null = amp.value
    ? [
        { label: "Amplitude", value: amp.value.amplitudeName },
        { label: "True bearing Zn", value: fmtBearing(amp.value.azimuthDeg), emphasis: true },
        ...(amp.value.compassErrorDeg !== undefined ? [{ label: "Compass error", value: fmtEW(amp.value.compassErrorDeg), emphasis: true }] : []),
      ]
    : null;
  return (
    <>
      <ToolSection title="Latitude by meridian altitude" icon={Sun}>
        <FormulaLine>ZD = 90° − Ho (named opposite to the bearing) · φ = ZD ± δ</FormulaLine>
        <FieldGrid>
          <NumberField id="cl-ho" label="Observed altitude Ho" unit="°" value={form.ho} onChange={set("ho")} placeholder="52.4" help="Corrected altitude at meridian passage, decimal degrees." />
          <PositionField id="cl-dec" label="Declination" kind="lat" value={form.dec} onChange={set("dec")} />
          <ChoiceField
            id="cl-b"
            label="Body bears"
            value={form.bears}
            onChange={set("bears")}
            options={[
              { value: "S", label: "South" },
              { value: "N", label: "North" },
            ]}
          />
        </FieldGrid>
        <Outcome title="Latitude" rows={mer.value !== undefined ? [{ label: "Latitude", value: fmtLat(mer.value), emphasis: true }] : null} error={mer.error} />
      </ToolSection>
      <ToolSection title="Amplitude" icon={Sunrise} description="Compass error from the Sun's true bearing at rising or setting.">
        <FormulaLine>sin A = sin δ / cos φ</FormulaLine>
        <FieldGrid>
          <PositionField id="am-lat" label="Latitude" kind="lat" value={form.aLat} onChange={set("aLat")} />
          <PositionField id="am-dec" label="Declination" kind="lat" value={form.aDec} onChange={set("aDec")} />
          <ChoiceField
            id="am-rs"
            label="Sun is"
            value={form.riseSet}
            onChange={set("riseSet")}
            options={[
              { value: "rising", label: "Rising" },
              { value: "setting", label: "Setting" },
            ]}
          />
          <NumberField id="am-c" label="Compass (or gyro) bearing" unit="°" value={form.compass} onChange={set("compass")} placeholder="118" help="Optional, for the error." />
        </FieldGrid>
        <Outcome title="Amplitude" rows={ampRows} error={amp.error} />
        <ToolNotice>Take the bearing when the Sun's centre is on the celestial horizon: with normal refraction its lower limb is then about two-thirds of a diameter above the visible horizon.</ToolNotice>
      </ToolSection>
    </>
  );
}
