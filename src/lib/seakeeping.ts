/**
 * Seakeeping helpers for the 3D ship simulator.
 *
 * Sources (formula forms only, no tuned constants):
 * - Deep-water dispersion: λ = g·T² / 2π, c = g·T / 2π.
 * - Encounter frequency: ωe = ω − (ω²·V·cos μ) / g, μ = 180° head seas, 0° following.
 * - Douglas sea scale (WMO code 3700): significant wave height bands.
 * - Synchronous roll (Te ≈ Tr) and parametric roll (Te ≈ Tr/2):
 *   IMO MSC.1/Circ.1228 guidance on dangerous resonance conditions.
 */

export const G = 9.81;
export const KNOT_MS = 0.514444;

/** Scene scale: 190 m reference hull spans ~5.7 scene units. */
export const METRES_PER_UNIT = 190 / 5.7;

export interface DouglasState {
  code: number;
  name: string;
  /** Band of significant wave height in metres [min, max]. */
  hs: [number, number];
}

export const DOUGLAS_SEA_STATES: DouglasState[] = [
  { code: 0, name: "Calm (glassy)", hs: [0, 0] },
  { code: 1, name: "Calm (rippled)", hs: [0, 0.1] },
  { code: 2, name: "Smooth", hs: [0.1, 0.5] },
  { code: 3, name: "Slight", hs: [0.5, 1.25] },
  { code: 4, name: "Moderate", hs: [1.25, 2.5] },
  { code: 5, name: "Rough", hs: [2.5, 4] },
  { code: 6, name: "Very rough", hs: [4, 6] },
  { code: 7, name: "High", hs: [6, 9] },
];

/** Representative height = middle of the Douglas band. */
export function representativeHs(code: number): number {
  const s = DOUGLAS_SEA_STATES.find((d) => d.code === code) ?? DOUGLAS_SEA_STATES[0];
  return (s.hs[0] + s.hs[1]) / 2;
}

export function deepWaterWavelength(periodS: number): number {
  return (G * periodS * periodS) / (2 * Math.PI);
}

export function deepWaterCelerity(periodS: number): number {
  return (G * periodS) / (2 * Math.PI);
}

/** Encounter period in seconds. μ in degrees (180 head, 90 beam, 0 following). */
export function encounterPeriod(periodS: number, speedKn: number, headingDeg: number): number {
  const w = (2 * Math.PI) / periodS;
  const v = speedKn * KNOT_MS;
  const we = w - (w * w * v * Math.cos((headingDeg * Math.PI) / 180)) / G;
  if (Math.abs(we) < 1e-6) return Infinity;
  return (2 * Math.PI) / Math.abs(we);
}

export type ResonanceRisk = "none" | "synchronous" | "parametric";

/** Within ±tolerance (default 15 %) of Tr → synchronous, of Tr/2 → parametric. */
export function resonanceRisk(rollPeriodS: number, encounterS: number, tolerance = 0.15): ResonanceRisk {
  if (!isFinite(rollPeriodS) || !isFinite(encounterS)) return "none";
  if (Math.abs(encounterS - rollPeriodS) / rollPeriodS <= tolerance) return "synchronous";
  const half = rollPeriodS / 2;
  if (Math.abs(encounterS - half) / half <= tolerance) return "parametric";
  return "none";
}

/** Gerstner component in scene units: [dirX, dirY, steepness k·a, wavelength]. */
export type WaveComponent = [number, number, number, number];

/** Compact directional visual spectrum, normalised to Hs = 4√m₀.
 * μ is the propagation angle: 180° head seas travel towards −x,
 * matching encounterPeriod. Local y maps to world −z. */
export const WAVE_COUNT = 12;
export function buildSea(hsM: number, periodS: number, headingDeg: number): WaveComponent[] {
  const height = Number.isFinite(hsM) ? Math.max(0, hsM) : 0;
  const period = Number.isFinite(periodS) ? Math.max(2, periodS) : 9;
  const heading = Number.isFinite(headingDeg) ? headingDeg : 90;
  const bands = [
    [0, 1, 1], [12, 1.21, 0.74], [-14, 0.83, 0.66],
    [24, 0.67, 0.47], [-25, 1.53, 0.43], [7, 0.52, 0.32],
    [-9, 0.41, 0.24], [38, 0.34, 0.18], [-40, 0.27, 0.13],
    [19, 1.89, 0.25], [-31, 0.22, 0.08], [51, 0.18, 0.055],
  ];
  const norm = Math.sqrt(bands.reduce((sum, b) => sum + b[2] ** 2, 0));
  return bands.map(([offset, factor, weight]) => {
    const direction = (heading + offset) * Math.PI / 180;
    const wavelength = deepWaterWavelength(period) * factor / METRES_PER_UNIT;
    const amplitude = height * weight / (Math.sqrt(8) * norm * METRES_PER_UNIT);
    const steepness = Math.min(2 * Math.PI * amplitude / wavelength, 0.38);
    return [Math.cos(direction), Math.sin(direction), steepness, wavelength];
  });
}
export const SCENE_G = G / METRES_PER_UNIT;
/** Height in material coordinates, before horizontal displacement. */
export function gerstnerHeight(waves: WaveComponent[], g: number, px: number, py: number, t: number): number {
  let h = 0;
  for (const [dx, dy, steep, wl] of waves) {
    const k = (2 * Math.PI) / wl, len = Math.hypot(dx, dy) || 1;
    h += (steep / k) * Math.sin(k * ((dx / len) * px + (dy / len) * py) - Math.sqrt(g * k) * t);
  }
  return h;
}
/** Actual spectral Hs after limiting impossible height/period combinations. */
export function spectralHs(waves: WaveComponent[]): number {
  return 4 * METRES_PER_UNIT * Math.sqrt(waves.reduce((v, w) => v + (w[2] * w[3] / (2 * Math.PI)) ** 2 / 2, 0));
}
