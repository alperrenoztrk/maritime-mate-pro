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

/**
 * Builds a 3-component sea in scene units. Primary carries Hs/2 amplitude
 * along heading μ; two shorter components add natural irregularity.
 * Steepness is capped below the Stokes breaking limit (H/λ = 1/7).
 */
export function buildSea(hsM: number, periodS: number, headingDeg: number): WaveComponent[] {
  const lambdaM = deepWaterWavelength(periodS);
  const comps: Array<[number, number, number]> = [
    // [relative heading offset deg, wavelength factor, amplitude factor]
    [0, 1, 1],
    [28, 0.55, 0.35],
    [-35, 0.3, 0.18],
  ];
  return comps.map(([off, lf, af]) => {
    // Waves travel FROM μ toward the ship: head seas (180°) propagate toward −x.
    const dirRad = ((headingDeg + 180 + off) * Math.PI) / 180;
    const lambda = lambdaM * lf;
    const a = (hsM / 2) * af;
    const k = (2 * Math.PI) / lambda;
    const steep = Math.min(k * a, Math.PI / 7);
    return [Math.cos(dirRad), Math.sin(dirRad), steep, lambda / METRES_PER_UNIT];
  });
}

/** Scene-unit gravity so wave periods stay real-time at scene scale. */
export const SCENE_G = G / METRES_PER_UNIT;

/** Vertical Gerstner displacement at local plane point (px, py), matches the shader. */
export function gerstnerHeight(waves: WaveComponent[], g: number, px: number, py: number, t: number): number {
  let h = 0;
  for (const [dx, dy, steep, wl] of waves) {
    const k = (2 * Math.PI) / wl;
    const c = Math.sqrt(g / k);
    const len = Math.hypot(dx, dy) || 1;
    const f = k * ((dx / len) * px + (dy / len) * py - c * t);
    h += (steep / k) * Math.sin(f);
  }
  return h;
}
