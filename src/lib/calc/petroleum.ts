/**
 * Petroleum quantity calculation (bunkers, oil cargo).
 *
 * Volume correction factor follows ASTM D1250-80 / API 2540 Table 54B
 * ("generalized products", metric, base 15 °C):
 *   α15 = K0 / ρ15² + K1 / ρ15                 (ρ15 in kg/m³)
 *   VCF = exp(−α15 · ΔT · (1 + 0.8 · α15 · ΔT)),  ΔT = t − 15 °C
 * with the product-range constants below. Weight in air uses the Table 56
 * convention: WCF = ρ15 − 0.0011 (t/m³).
 */

interface ProductRange {
  name: string;
  min: number;
  max: number;
  alpha: (rho: number) => number;
}

const RANGES: ProductRange[] = [
  { name: "gasolines", min: 653, max: 770, alpha: (r) => 346.4228 / (r * r) + 0.4388 / r },
  { name: "transition", min: 770, max: 788, alpha: (r) => -0.00336312 + 2680.3206 / (r * r) },
  { name: "jet fuels", min: 788, max: 839, alpha: (r) => 594.5418 / (r * r) },
  { name: "fuel oils", min: 839, max: 1075, alpha: (r) => 186.9696 / (r * r) + 0.4862 / r },
];

/** Thermal expansion coefficient α15 (1/°C) for a density at 15 °C in kg/m³. */
export function alpha15(density15KgM3: number): number {
  const range = RANGES.find((r) => density15KgM3 >= r.min && density15KgM3 <= r.max);
  if (!range) throw new Error("Density at 15 °C must be between 653 and 1075 kg/m³ (Table 54B range).");
  return range.alpha(density15KgM3);
}

/** Table 54B VCF, rounded to 4 decimals as printed in the tables. */
export function vcf54B(density15KgM3: number, temperatureC: number): number {
  const a = alpha15(density15KgM3);
  const dt = temperatureC - 15;
  return Math.round(Math.exp(-a * dt * (1 + 0.8 * a * dt)) * 10000) / 10000;
}

/** Weight correction factor (t/m³ in air) from density at 15 °C in kg/m³. */
export const wcf56 = (density15KgM3: number) => density15KgM3 / 1000 - 0.0011;

export interface OilQuantity {
  vcf: number;
  /** Gross standard volume at 15 °C (m³). */
  volume15: number;
  /** Metric tonnes in air. */
  tonnesInAir: number;
  /** Metric tonnes in vacuum (V15 × ρ15). */
  tonnesInVacuum: number;
}

/** Observed volume (m³) at temperature → standard volume and weight. */
export function oilQuantity(observedVolumeM3: number, density15KgM3: number, temperatureC: number): OilQuantity {
  const vcf = vcf54B(density15KgM3, temperatureC);
  const volume15 = observedVolumeM3 * vcf;
  return {
    vcf,
    volume15,
    tonnesInAir: volume15 * wcf56(density15KgM3),
    tonnesInVacuum: (volume15 * density15KgM3) / 1000,
  };
}
