import { CloudSun } from "lucide-react";
import type { CourseTopic } from "./types";

/**
 * Meteoroloji — tek kaynak ders içeriği.
 * Formüller ve hesaplayıcılar TEK listede birleştirildi; `calculate` taşıyan
 * girdiler hem Formüller hem Hesaplamalar sayfasında görünür. Tüm formüller
 * mevcut Meteoroloji Formülleri sayfasından ve WeatherCalculations bileşeninden
 * birebir alınmıştır (uydurma yok).
 */
export const meteorology: CourseTopic = {
  key: "meteorology",
  title: "Meteoroloji",
  icon: CloudSun,
  accent: "from-sky-500 via-cyan-500 to-blue-500",
  group: "deck",
  intro:
    "Wind, wave, atmosphere and sea state equations. " +
    "Each formula is followed by the calculator that uses the same formula.",
  entries: [
    {
      id: "true-wind-speed",
      name: "True Wind Speed",
      group: "Wind",
      formula: "|Vt| = √(Va² + Vg² + 2·Va·Vg·cos θ)",
      variables: [
        { symbol: "Va", label: "Apparent wind speed", unit: "kn" },
        { symbol: "Vg", label: "Vessel speed", unit: "kn" },
        { symbol: "θ", label: "Angle between the Va vector and the vessel velocity vector", unit: "°" },
      ],
      source: { code: "True/apparent wind vector relation" },
      note: "The definitions are vectorial. The safest approach is to use the vector relation V⃗t = V⃗a + V⃗g.",
      inputs: [
        { key: "va", label: "Apparent Wind (Va)", unit: "kn", placeholder: "20" },
        { key: "vg", label: "Vessel Speed (Vg)", unit: "kn", placeholder: "12" },
        { key: "theta", label: "Angle (θ)", unit: "°", placeholder: "60" },
      ],
      calculate: (v) => {
        const rad = (v.theta * Math.PI) / 180;
        const vt = Math.sqrt(v.va * v.va + v.vg * v.vg + 2 * v.va * v.vg * Math.cos(rad));
        return [{ label: "True Wind Speed (|Vt|)", value: `${vt.toFixed(2)} kn` }];
      },
    },
    {
      id: "beaufort-wind-speed",
      name: "Beaufort Wind Speed",
      group: "Wind",
      formula: "V = 0.836 · B^1.5",
      variables: [
        { symbol: "V", label: "Wind speed", unit: "m/s" },
        { symbol: "B", label: "Beaufort number (0-12)" },
      ],
      source: { code: "Beaufort scale", detail: "Approximate wind speed relation" },
      note: "Approximate formula. Beaufort 8 (Gale) ≈ 34-40 knots.",
      inputs: [
        { key: "b", label: "Beaufort Number (B)", unit: "", placeholder: "8" },
      ],
      calculate: (v) => {
        if (v.b < 0) return [{ label: "Error", value: "The Beaufort number cannot be negative" }];
        const ms = 0.836 * Math.pow(v.b, 1.5);
        return [
          { label: "Wind Speed (V)", value: `${ms.toFixed(2)} m/s` },
          { label: "Wind Speed", value: `${(ms * 1.94384).toFixed(1)} kn` },
        ];
      },
    },
    {
      id: "air-density",
      name: "Air Density",
      group: "Atmosfer",
      formula: "ρ = P / (R · T)",
      variables: [
        { symbol: "ρ", label: "Air density", unit: "kg/m³" },
        { symbol: "P", label: "Atmospheric pressure", unit: "Pa" },
        { symbol: "R", label: "Specific gas constant", unit: "287 J/kg·K" },
        { symbol: "T", label: "Absolute temperature", unit: "K" },
      ],
      source: { code: "Ideal gas equation of state (dry air)" },
      note: "The pressure is entered in hPa and converted to Pa in the calculation (×100). The temperature is entered in °C and converted to K. Under standard conditions (15 °C, 1013.25 hPa) ρ ≈ 1.225 kg/m³.",
      inputs: [
        { key: "p", label: "Pressure (P)", unit: "hPa", placeholder: "1013.25" },
        { key: "t", label: "Temperature (T)", unit: "°C", placeholder: "15" },
      ],
      calculate: (v) => {
        const tK = v.t + 273.15;
        if (tK <= 0) return [{ label: "Error", value: "The temperature must be above absolute zero" }];
        const rho = (v.p * 100) / (287 * tK);
        return [{ label: "Air Density (ρ)", value: `${rho.toFixed(3)} kg/m³` }];
      },
    },
    {
      id: "sea-level-pressure",
      name: "Pressure Reduced to Sea Level",
      group: "Atmosfer",
      formula: "P₀ = P · e^( (g·h) / (R·T̄) )",
      variables: [
        { symbol: "P₀", label: "Sea level pressure", unit: "hPa" },
        { symbol: "P", label: "Measured pressure", unit: "hPa" },
        { symbol: "g", label: "Gravitational acceleration", unit: "9,81 m/s²" },
        { symbol: "h", label: "Height", unit: "m" },
        { symbol: "R", label: "Specific gas constant", unit: "287 J/kg·K" },
        { symbol: "T̄", label: "Mean temperature", unit: "K" },
      ],
      source: { code: "Barometric height correction" },
      note: "The temperature is entered in °C and converted to K. Approximately: a 1 hPa drop for every 8 m of height.",
      inputs: [
        { key: "p", label: "Measured Pressure (P)", unit: "hPa", placeholder: "1010" },
        { key: "h", label: "Height (h)", unit: "m", placeholder: "25" },
        { key: "t", label: "Mean Temperature (T̄)", unit: "°C", placeholder: "15" },
      ],
      calculate: (v) => {
        const tK = v.t + 273.15;
        if (tK <= 0) return [{ label: "Error", value: "The temperature must be above absolute zero" }];
        const p0 = v.p * Math.exp((9.81 * v.h) / (287 * tK));
        return [{ label: "Sea Level Pressure (P₀)", value: `${p0.toFixed(1)} hPa` }];
      },
    },
    {
      id: "dew-point",
      name: "Dew Point Temperature",
      group: "Nem",
      formula: "Td ≈ T − ((100 − RH) / 5)",
      variables: [
        { symbol: "Td", label: "Dew point temperature", unit: "°C" },
        { symbol: "T", label: "Air temperature", unit: "°C" },
        { symbol: "RH", label: "Relative humidity", unit: "%" },
      ],
      source: { code: "Simple dew point approximation" },
      note: "Simple approximation formula. Fog risk: T − Td < 2.5 °C.",
      inputs: [
        { key: "t", label: "Air Temperature (T)", unit: "°C", placeholder: "20" },
        { key: "rh", label: "Relative Humidity (RH)", unit: "%", placeholder: "80" },
      ],
      calculate: (v) => {
        const td = v.t - (100 - v.rh) / 5;
        const spread = v.t - td;
        const durum = spread < 2.5 ? "Fog risk (T − Td < 2.5 °C)" : "Low fog risk";
        return [
          { label: "Dew Point (Td)", value: `${td.toFixed(1)} °C` },
          { label: "Temperature-Dew Point Spread", value: `${spread.toFixed(1)} °C` },
          { label: "Durum", value: durum },
        ];
      },
    },
    {
      id: "deep-water-wavelength",
      name: "Derin Su Dalgaboyu",
      group: "Wave",
      formula: "L = (g · T²) / (2π)",
      variables: [
        { symbol: "L", label: "Dalgaboyu", unit: "m" },
        { symbol: "g", label: "Gravitational acceleration", unit: "9,81 m/s²" },
        { symbol: "T", label: "Wave period", unit: "s" },
      ],
      source: { code: "Deep water wave theory" },
      note: "Deep water condition: depth > L/2.",
      inputs: [
        { key: "t", label: "Wave Period (T)", unit: "s", placeholder: "8" },
      ],
      calculate: (v) => {
        const l = (9.81 * v.t * v.t) / (2 * Math.PI);
        return [{ label: "Dalgaboyu (L)", value: `${l.toFixed(2)} m` }];
      },
    },
    {
      id: "deep-water-wave-speed",
      name: "Wave Speed (Deep Water)",
      group: "Wave",
      formula: "C = L / T = (g · T) / (2π) ≈ 1.56 · T",
      variables: [
        { symbol: "C", label: "Wave speed", unit: "m/s" },
        { symbol: "L", label: "Dalgaboyu", unit: "m" },
        { symbol: "T", label: "Wave period", unit: "s" },
      ],
      source: { code: "Deep water wave theory (phase speed)" },
      note: "In knots: C (kn) ≈ 3.03 · T.",
      inputs: [
        { key: "t", label: "Wave Period (T)", unit: "s", placeholder: "8" },
      ],
      calculate: (v) => {
        const c = (9.81 * v.t) / (2 * Math.PI);
        return [
          { label: "Wave Speed (C)", value: `${c.toFixed(2)} m/s` },
          { label: "Wave Speed", value: `${(c * 1.94384).toFixed(2)} kn` },
        ];
      },
    },
    {
      id: "relative-wind-vector",
      name: "Relative (Apparent) Wind Vector",
      group: "Wind",
      formula: "Rx = Wx − Sx ; Ry = Wy − Sy ; V_rel = √(Rx² + Ry²)",
      variables: [
        { symbol: "Wx, Wy", label: "True wind vector components", unit: "kn" },
        { symbol: "Sx, Sy", label: "Vessel velocity vector components", unit: "kn" },
        { symbol: "V_rel", label: "Relative wind speed", unit: "kn" },
      ],
      source: { code: "Relative wind vector relation (WeatherCalculations)" },
      note: "Directions are in degrees clockwise from north; Wx = V·sin(direction), Wy = V·cos(direction). Relative direction = atan2(Rx, Ry).",
      inputs: [
        { key: "windSpeed", label: "True Wind Speed", unit: "kn", placeholder: "25" },
        { key: "windDir", label: "Wind Direction", unit: "°", placeholder: "270" },
        { key: "shipSpeed", label: "Vessel Speed", unit: "kn", placeholder: "12" },
        { key: "shipHeading", label: "Vessel Heading", unit: "°", placeholder: "45" },
      ],
      calculate: (v) => {
        const wRad = (v.windDir * Math.PI) / 180;
        const sRad = (v.shipHeading * Math.PI) / 180;
        const wx = v.windSpeed * Math.sin(wRad);
        const wy = v.windSpeed * Math.cos(wRad);
        const sx = v.shipSpeed * Math.sin(sRad);
        const sy = v.shipSpeed * Math.cos(sRad);
        const rx = wx - sx;
        const ry = wy - sy;
        const speed = Math.sqrt(rx * rx + ry * ry);
        let dir = (Math.atan2(rx, ry) * 180) / Math.PI;
        if (dir < 0) dir += 360;
        return [
          { label: "Relative Wind Speed", value: `${speed.toFixed(1)} kn` },
          { label: "Relative Wind Direction", value: `${dir.toFixed(0)} °` },
        ];
      },
    },
    {
      id: "wind-force-on-ship",
      name: "Wind Force on the Vessel",
      group: "Wind",
      formula: "F = 0.5 · ρ · V² · A · Cd",
      variables: [
        { symbol: "F", label: "Wind force", unit: "N" },
        { symbol: "ρ", label: "Air density", unit: "kg/m³" },
        { symbol: "V", label: "Relative wind speed", unit: "m/s" },
        { symbol: "A", label: "Lateral windage area (length × freeboard)", unit: "m²" },
        { symbol: "Cd", label: "Drag coefficient (typically 0.8)" },
      ],
      source: { code: "Aerodynamic drag (WeatherCalculations)" },
      note: "The wind speed is entered in knots and converted to m/s in the calculation (×0.5144). A = length × freeboard.",
      inputs: [
        { key: "rho", label: "Air Density (ρ)", unit: "kg/m³", placeholder: "1.225" },
        { key: "vkn", label: "Relative Wind Speed (V)", unit: "kn", placeholder: "25" },
        { key: "length", label: "Ship Length", unit: "m", placeholder: "180" },
        { key: "freeboard", label: "Freeboard", unit: "m", placeholder: "12" },
        { key: "cd", label: "Drag Coefficient (Cd)", unit: "", placeholder: "0.8" },
      ],
      calculate: (v) => {
        const vms = v.vkn * 0.5144;
        const area = v.length * v.freeboard;
        const force = 0.5 * v.rho * vms * vms * area * v.cd;
        return [
          { label: "Wind Force (F)", value: `${force.toFixed(0)} N` },
          { label: "Wind Force", value: `${(force / 1000).toFixed(1)} kN` },
        ];
      },
    },
    {
      id: "speed-over-ground",
      name: "Speed Over Ground with Current (SOG)",
      group: "Current",
      formula: "Rx = Sx + Cx ; Ry = Sy + Cy ; SOG = √(Rx² + Ry²)",
      variables: [
        { symbol: "Sx, Sy", label: "Vessel velocity components", unit: "kn" },
        { symbol: "Cx, Cy", label: "Current velocity components", unit: "kn" },
        { symbol: "SOG", label: "Speed over ground", unit: "kn" },
      ],
      source: { code: "Vessel + current vector sum (WeatherCalculations)" },
      note: "Course over ground (COG) = atan2(Rx, Ry). Directions are clockwise from north.",
      inputs: [
        { key: "shipSpeed", label: "Vessel Speed", unit: "kn", placeholder: "12" },
        { key: "shipHeading", label: "Vessel Heading", unit: "°", placeholder: "45" },
        { key: "currentSpeed", label: "Current Drift", unit: "kn", placeholder: "1.5" },
        { key: "currentDir", label: "Current Set", unit: "°", placeholder: "180" },
      ],
      calculate: (v) => {
        const sRad = (v.shipHeading * Math.PI) / 180;
        const cRad = (v.currentDir * Math.PI) / 180;
        const sx = v.shipSpeed * Math.sin(sRad);
        const sy = v.shipSpeed * Math.cos(sRad);
        const cx = v.currentSpeed * Math.sin(cRad);
        const cy = v.currentSpeed * Math.cos(cRad);
        const rx = sx + cx;
        const ry = sy + cy;
        const sog = Math.sqrt(rx * rx + ry * ry);
        let cog = (Math.atan2(rx, ry) * 180) / Math.PI;
        if (cog < 0) cog += 360;
        return [
          { label: "Speed Over Ground (SOG)", value: `${sog.toFixed(1)} kn` },
          { label: "Course Over Ground (COG)", value: `${cog.toFixed(0)} °` },
        ];
      },
    },
    {
      id: "beaufort-scale",
      name: "Beaufort Scale (Force from Speed)",
      group: "Sea State",
      formula: "Beaufort = f(wind speed) — range table",
      variables: [
        { symbol: "V", label: "Wind speed", unit: "kn" },
        { symbol: "B", label: "Beaufort number (0-12)" },
      ],
      source: { code: "Beaufort scale", detail: "Wind speed classification table" },
      note: "The wind speed (knots) is mapped to a Beaufort force (WeatherCalculations table).",
      inputs: [
        { key: "windSpeed", label: "Wind Speed", unit: "kn", placeholder: "25" },
      ],
      calculate: (v) => {
        const s = v.windSpeed;
        let scale: number;
        let desc: string;
        if (s < 1) { scale = 0; desc = "Calm"; }
        else if (s <= 3) { scale = 1; desc = "Light air"; }
        else if (s <= 7) { scale = 2; desc = "Light breeze"; }
        else if (s <= 12) { scale = 3; desc = "Gentle breeze"; }
        else if (s <= 18) { scale = 4; desc = "Moderate breeze"; }
        else if (s <= 24) { scale = 5; desc = "Fresh breeze"; }
        else if (s <= 31) { scale = 6; desc = "Strong breeze"; }
        else if (s <= 38) { scale = 7; desc = "Near gale"; }
        else if (s <= 46) { scale = 8; desc = "Gale"; }
        else if (s <= 54) { scale = 9; desc = "Strong gale"; }
        else if (s <= 63) { scale = 10; desc = "Storm"; }
        else if (s <= 72) { scale = 11; desc = "Violent storm"; }
        else { scale = 12; desc = "Hurricane"; }
        return [
          { label: "Beaufort", value: `${scale}` },
          { label: "Description", value: desc },
        ];
      },
    },
    {
      id: "douglas-sea-scale",
      name: "Douglas Sea Scale (State from Wave Height)",
      group: "Sea State",
      formula: "Douglas = f(significant wave height) — range table",
      variables: [
        { symbol: "Hs", label: "Significant wave height", unit: "m" },
        { symbol: "D", label: "Douglas sea state number (0-9)" },
      ],
      source: { code: "Douglas sea scale", detail: "Wave height classification table" },
      note: "The significant wave height (m) is mapped to a Douglas sea state (WeatherCalculations table).",
      inputs: [
        { key: "waveHeight", label: "Wave Height (Hs)", unit: "m", placeholder: "3.5" },
      ],
      calculate: (v) => {
        const h = v.waveHeight;
        let scale: number;
        let desc: string;
        if (h < 0.1) { scale = 0; desc = "Calm (glassy)"; }
        else if (h <= 0.5) { scale = 1; desc = "Calm (rippled)"; }
        else if (h <= 1.25) { scale = 2; desc = "Smooth (wavelets)"; }
        else if (h <= 2.5) { scale = 3; desc = "Slight"; }
        else if (h <= 4) { scale = 4; desc = "Moderate"; }
        else if (h <= 6) { scale = 5; desc = "Rough"; }
        else if (h <= 9) { scale = 6; desc = "Very rough"; }
        else if (h <= 14) { scale = 7; desc = "High"; }
        else if (h <= 20) { scale = 8; desc = "Very high"; }
        else { scale = 9; desc = "Phenomenal"; }
        return [
          { label: "Douglas", value: `${scale}` },
          { label: "Description", value: desc },
        ];
      },
    },
    {
      id: "geostrophic-wind",
      name: "Geostrophic Wind",
      group: "Wind",
      formula: "Vg = (1 / (ρ·f)) · (ΔP / Δn) ,  f = 2Ω·sin φ",
      variables: [
        { symbol: "Vg", label: "Geostrophic wind speed", unit: "m/s" },
        { symbol: "ρ", label: "Air density", unit: "kg/m³" },
        { symbol: "f", label: "Coriolis parameter", unit: "1/s" },
        { symbol: "ΔP/Δn", label: "Horizontal pressure gradient", unit: "Pa/m" },
        { symbol: "φ", label: "Latitude", unit: "°" },
      ],
      source: { code: "Dynamic meteorology — geostrophic balance" },
      note: "Ω = 7.292×10⁻⁵ rad/s. The pressure gradient is entered in hPa/100 km and converted to Pa/m in the calculation (1 hPa/100 km = 10⁻³ Pa/m). It is not valid at the equator (φ = 0).",
      inputs: [
        { key: "rho", label: "Air Density (ρ)", unit: "kg/m³", placeholder: "1.225" },
        { key: "grad", label: "Pressure Gradient", unit: "hPa/100km", placeholder: "3" },
        { key: "lat", label: "Latitude (φ)", unit: "°", placeholder: "45" },
      ],
      calculate: (v) => {
        const phi = Math.abs(v.lat);
        if (phi < 1) return [{ label: "Error", value: "Geostrophic balance is not valid near the equator (φ ≥ 1°)" }];
        if (v.rho <= 0) return [{ label: "Error", value: "Density must be positive" }];
        const f = 2 * 7.292e-5 * Math.sin((phi * Math.PI) / 180);
        const gradPaPerM = v.grad * 1e-3; // hPa/100km → Pa/m
        const vg = gradPaPerM / (v.rho * f);
        return [
          { label: "Coriolis Parameter (f)", value: `${f.toExponential(3)} 1/s` },
          { label: "Geostrophic Wind (Vg)", value: `${vg.toFixed(1)} m/s` },
          { label: "Geostrophic Wind", value: `${(vg * 1.94384).toFixed(1)} kn` },
        ];
      },
    },
    {
      id: "relative-humidity",
      name: "Relative Humidity (from the Dew Point)",
      group: "Atmosfer",
      formula: "RH = 100 · e(Td) / e(T) ,  e(T) = 6.112·exp(17.62·T/(243.12+T))",
      variables: [
        { symbol: "RH", label: "Relative humidity", unit: "%" },
        { symbol: "T", label: "Air temperature (dry bulb)", unit: "°C" },
        { symbol: "Td", label: "Dew point temperature", unit: "°C" },
        { symbol: "e", label: "Vapour pressure", unit: "hPa" },
      ],
      source: { code: "Magnus-Tetens saturation vapour pressure relation (WMO)" },
      note: "RH is the ratio of the saturation vapour pressure at the dew point to that at the air temperature. Td ≤ T is required.",
      inputs: [
        { key: "t", label: "Air Temperature (T)", unit: "°C", placeholder: "25" },
        { key: "td", label: "Dew Point (Td)", unit: "°C", placeholder: "15" },
      ],
      calculate: (v) => {
        if (v.td > v.t) return [{ label: "Error", value: "The dew point cannot be higher than the air temperature" }];
        const es = (t: number) => 6.112 * Math.exp((17.62 * t) / (243.12 + t));
        const rh = (es(v.td) / es(v.t)) * 100;
        return [{ label: "Relative Humidity (RH)", value: `${rh.toFixed(1)} %` }];
      },
    },
  ],
};
