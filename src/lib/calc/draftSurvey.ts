/**
 * Draft survey engine (pure functions, no UI).
 *
 * Procedure follows the UNECE "Code of Uniform Standards and Procedures for the
 * Performance of Draught Surveys of Coal Cargoes" (ECE/ENERGY/19, 1992), which
 * is the reference procedure used for bulk cargo draft surveys in general:
 *
 *  1. Mean of port/starboard readings at the forward, midship and aft marks.
 *  2. Correct the mark readings to the perpendiculars / amidships using the
 *     observed trim over the length between marks (LBM).
 *  3. Mean of means: (F + A + 6M) / 8 ("quarter mean"), hog/sag = M − (F + A)/2.
 *  4. Enter the hydrostatic table at the corrected mean draft (linear
 *     interpolation between the two bracketing rows).
 *  5. First trim correction  = T × LCF × TPC × 100 / LBP          (tonnes)
 *     Second trim correction = 50 × T² × (MTC₊ − MTC₋) / LBP      (tonnes, Nemoto)
 *  6. Density correction     = Δ × ρ_dock / ρ_table
 *  7. Net displacement       = Δ_corrected − deductibles (ballast, fresh water,
 *     fuel, diesel, lube oil, bilges, other)
 *  8. Cargo = |net displacement (final) − net displacement (initial)|.
 *
 * Sign conventions (all distances in metres, drafts in metres):
 *  - Trim T = A − F, positive by the stern.
 *  - forwardMarkAftOfFP: forward marks aft of the forward perpendicular (+);
 *    negative if the marks are forward of the FP (raked stem).
 *  - aftMarkForwardOfAP: aft marks forward of the aft perpendicular (+);
 *    negative if the marks are aft of the AP.
 *  - midMarkAftOfMidships: midship marks aft of amidships (+), forward (−).
 *  - LCF is taken as distance from amidships, positive AFT. Use
 *    `lcfAftOfMidships` to convert other table conventions.
 */

export type LcfReference = "midships-aft-positive" | "midships-forward-positive" | "from-aft-perpendicular";

export interface DraftSurveyShip {
  /** Length between perpendiculars (m). */
  lbp: number;
  forwardMarkAftOfFP: number;
  aftMarkForwardOfAP: number;
  midMarkAftOfMidships: number;
  /** Density the hydrostatic table is based on (t/m³), usually 1.025. */
  tableDensity: number;
  /**
   * Keel correction (m) subtracted from the corrected mean draft before the
   * table is entered, e.g. keel plate thickness when the tables are moulded.
   * Zero when the tables are on extreme (keel) draft.
   */
  keelCorrection?: number;
}

export interface MarkReading {
  port: number;
  starboard: number;
}

export interface DraftReadings {
  forward: MarkReading;
  midship: MarkReading;
  aft: MarkReading;
}

export interface HydrostaticRow {
  draft: number;
  /** Displacement at table density (t). */
  displacement: number;
  /** Tonnes per centimetre immersion. */
  tpc: number;
  /** LCF, metres from amidships, positive aft (see lcfAftOfMidships). */
  lcf: number;
}

export interface Deductibles {
  ballast?: number;
  freshWater?: number;
  fuelOil?: number;
  dieselOil?: number;
  lubOil?: number;
  bilges?: number;
  other?: number;
}

export interface DraftSurveyStageInput {
  readings: DraftReadings;
  /** Dock water density at the time of the survey (t/m³). */
  dockDensity: number;
  /** Two hydrostatic rows bracketing the corrected mean draft. */
  hydrostatics: [HydrostaticRow, HydrostaticRow];
  /** MTC (t·m/cm) at corrected mean draft + 0.50 m and − 0.50 m. */
  mtcPlus50: number;
  mtcMinus50: number;
  deductibles: Deductibles;
}

export interface DraftSurveyResult {
  observed: { forward: number; midship: number; aft: number; trim: number };
  lengthBetweenMarks: number;
  corrections: { forward: number; midship: number; aft: number };
  corrected: { forward: number; midship: number; aft: number };
  trim: number;
  /** Positive = sagging, negative = hogging (metres). */
  deflection: number;
  meanOfMeans: number;
  /** Mean of means less keel correction: the draft the table is entered with. */
  tableDraft: number;
  /** True when tableDraft lies outside the two hydrostatic rows given. */
  extrapolated: boolean;
  hydrostatics: { displacement: number; tpc: number; lcf: number };
  firstTrimCorrection: number;
  secondTrimCorrection: number;
  displacementCorrectedForTrim: number;
  densityCorrection: number;
  displacementInDockWater: number;
  totalDeductibles: number;
  netDisplacement: number;
}

export const meanOf = (reading: MarkReading) => (reading.port + reading.starboard) / 2;

/** Converts a hydrostatic-table LCF to metres from amidships, positive aft. */
export function lcfAftOfMidships(value: number, reference: LcfReference, lbp: number): number {
  switch (reference) {
    case "midships-aft-positive":
      return value;
    case "midships-forward-positive":
      return -value;
    case "from-aft-perpendicular":
      return lbp / 2 - value;
  }
}

/** Linear interpolation of a hydrostatic row at `draft`. */
export function interpolateHydrostatics(rows: [HydrostaticRow, HydrostaticRow], draft: number) {
  const [a, b] = rows[0].draft <= rows[1].draft ? rows : [rows[1], rows[0]];
  const span = b.draft - a.draft;
  if (span <= 0) throw new Error("The two hydrostatic rows must have different drafts.");
  const f = (draft - a.draft) / span;
  const lerp = (x: number, y: number) => x + (y - x) * f;
  return {
    displacement: lerp(a.displacement, b.displacement),
    tpc: lerp(a.tpc, b.tpc),
    lcf: lerp(a.lcf, b.lcf),
    extrapolated: draft < a.draft || draft > b.draft,
  };
}

/** Corrects the three mark drafts to the perpendiculars and amidships. */
export function correctToPerpendiculars(ship: DraftSurveyShip, readings: DraftReadings) {
  const forward = meanOf(readings.forward);
  const midship = meanOf(readings.midship);
  const aft = meanOf(readings.aft);
  const observedTrim = aft - forward;
  const lengthBetweenMarks = ship.lbp - ship.forwardMarkAftOfFP - ship.aftMarkForwardOfAP;
  if (!(lengthBetweenMarks > 0)) throw new Error("Length between marks must be positive: check LBP and mark distances.");
  const slope = observedTrim / lengthBetweenMarks; // draft change per metre going aft
  const corrections = {
    forward: -slope * ship.forwardMarkAftOfFP,
    midship: -slope * ship.midMarkAftOfMidships,
    aft: slope * ship.aftMarkForwardOfAP,
  };
  const corrected = {
    forward: forward + corrections.forward,
    midship: midship + corrections.midship,
    aft: aft + corrections.aft,
  };
  return {
    observed: { forward, midship, aft, trim: observedTrim },
    lengthBetweenMarks,
    corrections,
    corrected,
  };
}

/** (F + A + 6M) / 8 */
export const meanOfMeans = (forward: number, midship: number, aft: number) => (forward + aft + 6 * midship) / 8;

/** First trim correction in tonnes. trim (m, + by stern), lcf (m aft of amidships), tpc (t/cm). */
export const firstTrimCorrection = (trim: number, lcf: number, tpc: number, lbp: number) =>
  (trim * lcf * tpc * 100) / lbp;

/** Second (Nemoto) trim correction in tonnes. Always additive. */
export const secondTrimCorrection = (trim: number, mtcPlus50: number, mtcMinus50: number, lbp: number) =>
  (50 * trim * trim * (mtcPlus50 - mtcMinus50)) / lbp;

export const sumDeductibles = (d: Deductibles) =>
  (d.ballast ?? 0) + (d.freshWater ?? 0) + (d.fuelOil ?? 0) + (d.dieselOil ?? 0) + (d.lubOil ?? 0) + (d.bilges ?? 0) + (d.other ?? 0);

export function computeDraftSurvey(ship: DraftSurveyShip, stage: DraftSurveyStageInput): DraftSurveyResult {
  if (!(ship.lbp > 0)) throw new Error("LBP must be greater than zero.");
  if (!(ship.tableDensity > 0) || !(stage.dockDensity > 0)) throw new Error("Densities must be greater than zero.");

  const perp = correctToPerpendiculars(ship, stage.readings);
  const { forward, midship, aft } = perp.corrected;
  const trim = aft - forward;
  const mmm = meanOfMeans(forward, midship, aft);
  const tableDraft = mmm - (ship.keelCorrection ?? 0);
  const hydro = interpolateHydrostatics(stage.hydrostatics, tableDraft);

  const ftc = firstTrimCorrection(trim, hydro.lcf, hydro.tpc, ship.lbp);
  const stc = secondTrimCorrection(trim, stage.mtcPlus50, stage.mtcMinus50, ship.lbp);
  const displacementCorrectedForTrim = hydro.displacement + ftc + stc;
  const displacementInDockWater = (displacementCorrectedForTrim * stage.dockDensity) / ship.tableDensity;
  const totalDeductibles = sumDeductibles(stage.deductibles);

  return {
    ...perp,
    trim,
    deflection: midship - (forward + aft) / 2,
    meanOfMeans: mmm,
    tableDraft,
    extrapolated: hydro.extrapolated,
    hydrostatics: { displacement: hydro.displacement, tpc: hydro.tpc, lcf: hydro.lcf },
    firstTrimCorrection: ftc,
    secondTrimCorrection: stc,
    displacementCorrectedForTrim,
    densityCorrection: displacementInDockWater - displacementCorrectedForTrim,
    displacementInDockWater,
    totalDeductibles,
    netDisplacement: displacementInDockWater - totalDeductibles,
  };
}

/** Cargo between two surveys (always positive): loading → final − initial, discharging → initial − final. */
export const cargoBetweenSurveys = (initialNet: number, finalNet: number) => Math.abs(finalNet - initialNet);

/** Ship's constant from a light-condition survey. */
export const shipsConstant = (netDisplacement: number, lightship: number) => netDisplacement - lightship;

/** Difference of a survey figure against a reference (e.g. B/L), in tonnes and percent of the reference. */
export function differenceAgainst(reference: number, measured: number) {
  const tonnes = measured - reference;
  return { tonnes, percent: reference !== 0 ? (tonnes / reference) * 100 : NaN };
}

/** Displacement at table density → displacement in dock water (t). */
export const displacementInDensity = (displacementAtTable: number, tableDensity: number, dockDensity: number) =>
  (displacementAtTable * dockDensity) / tableDensity;

/**
 * Change of mean draft (cm, + = deeper) when a ship of displacement Δ moves from
 * water of density ρ1 into water of density ρ2. TPC is the value in ρ1.
 *   δT = Δ (ρ1 − ρ2) / (ρ2 · TPC₁)
 * With ρ1 = 1.025 and ρ2 = 1.000 this reduces to the FWA, Δ / (40 · TPC).
 */
export const densitySinkageCm = (displacement: number, tpcInRho1: number, rho1: number, rho2: number) =>
  (displacement * (rho1 - rho2)) / (rho2 * tpcInRho1);
