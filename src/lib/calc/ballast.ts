/**
 * Ballast operations (pure functions).
 *
 * Source: International Convention for the Control and Management of Ships'
 * Ballast Water and Sediments, 2004 (BWM Convention) — regulation B-4
 * (exchange location), D-1 (exchange standard), D-2 (performance standard),
 * as published by IMO.
 *
 * Longitudinal positions are metres forward of the AP, transverse positions
 * metres from the centreline (+ starboard); trim + by the stern.
 */

const RAD = Math.PI / 180;

export interface TransferInput {
  /** Volume transferred (m³). */
  volume: number;
  /** Ballast density (t/m³). */
  density: number;
  /** Effective pump rate (m³/h). */
  pumpRate: number;
  from: { lcg: number; tcg: number; vcg: number };
  to: { lcg: number; tcg: number; vcg: number };
  displacement: number;
  gmFluid: number;
  mctc: number;
}

export function ballastTransfer(i: TransferInput) {
  const weight = i.volume * i.density;
  return {
    weight,
    hours: i.volume / i.pumpRate,
    /** Change of trim (cm, + by the stern). */
    trimChangeCm: (-weight * (i.to.lcg - i.from.lcg)) / i.mctc,
    /** Change of heel (degrees, + to starboard), small-angle. */
    heelChange: i.gmFluid > 0 ? Math.atan((weight * (i.to.tcg - i.from.tcg)) / (i.displacement * i.gmFluid)) / RAD : Number.NaN,
    /** Rise of G (m) from the vertical shift (free surface not included). */
    riseOfG: (weight * (i.to.vcg - i.from.vcg)) / i.displacement,
  };
}

export type ExchangeMethod = "sequential" | "flow-through";

/**
 * D-1 exchange planning for one tank. Sequential: the tank is emptied and
 * refilled. Flow-through: pumping three times the tank volume is deemed to meet
 * the 95 % volumetric standard; less needs a demonstrated 95 % exchange.
 */
export function exchangePlan(method: ExchangeMethod, tankVolume: number, pumpRate: number, volumePumped?: number) {
  if (method === "sequential") {
    return { volumePumped: 2 * tankVolume, hours: (2 * tankVolume) / pumpRate, deemedCompliant: true, timesVolume: undefined as number | undefined };
  }
  const pumped = volumePumped ?? 3 * tankVolume;
  const times = pumped / tankVolume;
  return { volumePumped: pumped, hours: pumped / pumpRate, deemedCompliant: times >= 3, timesVolume: times };
}

/** Regulation B-4.1 location test for an exchange. */
export function exchangeLocation(distanceFromLandNm: number, depthM: number): "b4-1-1" | "b4-1-2" | "not-met" {
  if (depthM >= 200 && distanceFromLandNm >= 200) return "b4-1-1";
  if (depthM >= 200 && distanceFromLandNm >= 50) return "b4-1-2";
  return "not-met";
}

export interface D2Sample {
  /** Viable organisms ≥ 50 µm per m³. */
  large?: number;
  /** Viable organisms 10–50 µm per mL. */
  small?: number;
  /** Toxicogenic Vibrio cholerae (O1, O139), cfu per 100 mL. */
  vibrio?: number;
  /** Escherichia coli, cfu per 100 mL. */
  ecoli?: number;
  /** Intestinal enterococci, cfu per 100 mL. */
  enterococci?: number;
}

export const D2_LIMITS: Array<{ key: keyof D2Sample; label: string; limit: number; unit: string }> = [
  { key: "large", label: "Organisms ≥ 50 µm", limit: 10, unit: "per m³" },
  { key: "small", label: "Organisms 10–50 µm", limit: 10, unit: "per mL" },
  { key: "vibrio", label: "Toxicogenic Vibrio cholerae", limit: 1, unit: "cfu per 100 mL" },
  { key: "ecoli", label: "Escherichia coli", limit: 250, unit: "cfu per 100 mL" },
  { key: "enterococci", label: "Intestinal enterococci", limit: 100, unit: "cfu per 100 mL" },
];

/** D-2: every measured value must be LESS THAN its limit. Unmeasured values are skipped. */
export function d2Check(sample: D2Sample) {
  return D2_LIMITS.filter((l) => sample[l.key] !== undefined).map((l) => ({
    ...l,
    value: sample[l.key] as number,
    pass: (sample[l.key] as number) < l.limit,
  }));
}
