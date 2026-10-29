import { readStored, useStoredState } from "@/components/tools/useStoredState";
import {
  computeDraftSurvey,
  lcfAftOfMidships,
  type DraftSurveyResult,
  type DraftSurveyShip,
  type DraftSurveyStageInput,
  type LcfReference,
} from "@/lib/calc/draftSurvey";
import {
  type ResultRow,
} from "@/components/tools/ToolKit";
import { fmt, parseNumber, signed } from "@/components/tools/format";

/** Form state is kept as typed strings so half-typed numbers survive re-renders. */
export interface ShipForm {
  lbp: string;
  forwardMark: string;
  aftMark: string;
  midMark: string;
  tableDensity: string;
  keelCorrection: string;
  lightship: string;
  lcfReference: LcfReference;
}

export const emptyShip: ShipForm = {
  lbp: "",
  forwardMark: "",
  aftMark: "",
  midMark: "0",
  tableDensity: "1.025",
  keelCorrection: "0",
  lightship: "",
  lcfReference: "midships-aft-positive",
};

export const STAGE_FIELDS = [
  "forwardPort", "forwardStarboard", "midPort", "midStarboard", "aftPort", "aftStarboard",
  "dockDensity",
  "row1Draft", "row1Displacement", "row1Tpc", "row1Lcf",
  "row2Draft", "row2Displacement", "row2Tpc", "row2Lcf",
  "mtcPlus50", "mtcMinus50",
  "ballast", "freshWater", "fuelOil", "dieselOil", "lubOil", "bilges", "other",
] as const;

export type StageField = (typeof STAGE_FIELDS)[number];
export type StageForm = Record<StageField, string>;

const DEDUCTIBLE_FIELDS: StageField[] = ["ballast", "freshWater", "fuelOil", "dieselOil", "lubOil", "bilges", "other"];

export const emptyStage = (): StageForm =>
  Object.fromEntries(STAGE_FIELDS.map((key) => [key, DEDUCTIBLE_FIELDS.includes(key) ? "0" : ""])) as StageForm;

const STORAGE_PREFIX = "marine-expert-draft-survey:";

/** Draft survey forms persisted on this device, shared by all draft survey pages. */
export const useStoredForm = <T extends object>(key: string, initial: T) => useStoredState(STORAGE_PREFIX + key, initial);

/** Reads a saved stage without subscribing to it (for comparison pages). */
export function readStoredStage(key: string): StageForm | null {
  const stored = readStored<Partial<StageForm>>(STORAGE_PREFIX + key, {});
  return Object.keys(stored).length > 0 ? { ...emptyStage(), ...stored } : null;
}

export type Errors = Partial<Record<string, string>>;

const REQUIRED = "Required";
const POSITIVE = "Must be greater than zero";

export function parseShip(form: ShipForm): { ship?: DraftSurveyShip; lightship?: number; errors: Errors } {
  const errors: Errors = {};
  const lbp = parseNumber(form.lbp);
  const fwd = parseNumber(form.forwardMark);
  const aft = parseNumber(form.aftMark);
  const mid = parseNumber(form.midMark);
  const rho = parseNumber(form.tableDensity);
  const keel = parseNumber(form.keelCorrection);
  const light = parseNumber(form.lightship);
  if (!Number.isFinite(lbp)) errors.lbp = REQUIRED;
  else if (lbp <= 0) errors.lbp = POSITIVE;
  if (!Number.isFinite(fwd)) errors.forwardMark = REQUIRED;
  if (!Number.isFinite(aft)) errors.aftMark = REQUIRED;
  if (!Number.isFinite(mid)) errors.midMark = REQUIRED;
  if (!Number.isFinite(rho)) errors.tableDensity = REQUIRED;
  else if (rho < 0.99 || rho > 1.04) errors.tableDensity = "Expected 0.990 – 1.040 t/m³";
  if (Number.isFinite(lbp) && Number.isFinite(fwd) && Number.isFinite(aft) && lbp - fwd - aft <= 0) {
    errors.aftMark = "Length between marks would be zero or negative";
  }
  if (Object.keys(errors).length > 0) return { errors };
  return {
    ship: {
      lbp,
      forwardMarkAftOfFP: fwd,
      aftMarkForwardOfAP: aft,
      midMarkAftOfMidships: mid,
      tableDensity: rho,
      keelCorrection: Number.isFinite(keel) ? keel : 0,
    },
    lightship: Number.isFinite(light) && light > 0 ? light : undefined,
    errors,
  };
}

export function parseStage(
  form: StageForm,
  ship: DraftSurveyShip | undefined,
  lcfReference: LcfReference,
): { stage?: DraftSurveyStageInput; errors: Errors } {
  const errors: Errors = {};
  const n: Partial<Record<StageField, number>> = {};
  for (const key of STAGE_FIELDS) {
    const value = parseNumber(form[key]);
    if (!Number.isFinite(value)) {
      if (DEDUCTIBLE_FIELDS.includes(key)) n[key] = 0;
      else errors[key] = REQUIRED;
      continue;
    }
    if (DEDUCTIBLE_FIELDS.includes(key) && value < 0) errors[key] = "Cannot be negative";
    n[key] = value;
  }
  for (const key of ["forwardPort", "forwardStarboard", "midPort", "midStarboard", "aftPort", "aftStarboard"] as const) {
    if (n[key] !== undefined && (n[key]! <= 0 || n[key]! > 30)) errors[key] = "Draft must be 0 – 30 m";
  }
  if (n.dockDensity !== undefined && (n.dockDensity < 0.99 || n.dockDensity > 1.04)) errors.dockDensity = "Expected 0.990 – 1.040 t/m³";
  if (n.row1Draft !== undefined && n.row2Draft !== undefined && n.row1Draft === n.row2Draft) errors.row2Draft = "Use two different table drafts";
  for (const key of ["row1Displacement", "row2Displacement", "row1Tpc", "row2Tpc", "mtcPlus50", "mtcMinus50"] as const) {
    if (n[key] !== undefined && n[key]! <= 0) errors[key] = POSITIVE;
  }
  if (Object.keys(errors).length > 0 || !ship) return { errors };
  const lcf = (value: number) => lcfAftOfMidships(value, lcfReference, ship.lbp);
  return {
    stage: {
      readings: {
        forward: { port: n.forwardPort!, starboard: n.forwardStarboard! },
        midship: { port: n.midPort!, starboard: n.midStarboard! },
        aft: { port: n.aftPort!, starboard: n.aftStarboard! },
      },
      dockDensity: n.dockDensity!,
      hydrostatics: [
        { draft: n.row1Draft!, displacement: n.row1Displacement!, tpc: n.row1Tpc!, lcf: lcf(n.row1Lcf!) },
        { draft: n.row2Draft!, displacement: n.row2Displacement!, tpc: n.row2Tpc!, lcf: lcf(n.row2Lcf!) },
      ],
      mtcPlus50: n.mtcPlus50!,
      mtcMinus50: n.mtcMinus50!,
      deductibles: {
        ballast: n.ballast, freshWater: n.freshWater, fuelOil: n.fuelOil, dieselOil: n.dieselOil,
        lubOil: n.lubOil, bilges: n.bilges, other: n.other,
      },
    },
    errors,
  };
}

export interface StageComputation {
  result?: DraftSurveyResult;
  errors: Errors;
  message?: string;
}

export function computeStage(shipForm: ShipForm, stageForm: StageForm): StageComputation {
  const { ship } = parseShip(shipForm);
  const { stage, errors } = parseStage(stageForm, ship, shipForm.lcfReference);
  if (!ship) return { errors, message: "Complete the ship particulars first." };
  if (!stage) return { errors };
  try {
    return { result: computeDraftSurvey(ship, stage), errors };
  } catch (error) {
    return { errors, message: error instanceof Error ? error.message : "The survey could not be calculated." };
  }
}

/** Warnings a surveyor would raise before accepting the figures. */
export function stageWarnings(result: DraftSurveyResult, form: StageForm): string[] {
  const warnings: string[] = [];
  if (result.extrapolated) {
    warnings.push(`Table draft ${fmt(result.tableDraft, 3)} m is outside the two hydrostatic rows: enter the rows that bracket it.`);
  }
  const sides: Array<[string, StageField, StageField]> = [
    ["forward", "forwardPort", "forwardStarboard"],
    ["midship", "midPort", "midStarboard"],
    ["aft", "aftPort", "aftStarboard"],
  ];
  for (const [mark, p, s] of sides) {
    const diff = Math.abs(parseNumber(form[p]) - parseNumber(form[s]));
    if (diff > 0.1) warnings.push(`Port/starboard ${mark} readings differ by ${fmt(diff, 2)} m: check for list before accepting the readings.`);
  }
  if (Math.abs(result.deflection) > 0.15) {
    warnings.push(`${result.deflection > 0 ? "Sagging" : "Hogging"} of ${fmt(Math.abs(result.deflection) * 100, 0)} cm: verify the midship readings and the loading sequence.`);
  }
  return warnings;
}

export function stageRows(result: DraftSurveyResult): ResultRow[] {
  return [
    { label: "Observed drafts F / M / A", value: `${fmt(result.observed.forward, 3)} / ${fmt(result.observed.midship, 3)} / ${fmt(result.observed.aft, 3)} m` },
    { label: "Length between marks (LBM)", value: `${fmt(result.lengthBetweenMarks, 2)} m` },
    { label: "Corrected drafts F / M / A", value: `${fmt(result.corrected.forward, 3)} / ${fmt(result.corrected.midship, 3)} / ${fmt(result.corrected.aft, 3)} m`, hint: "At the perpendiculars and amidships" },
    { label: "Trim (+ by the stern)", value: `${signed(result.trim, 3)} m` },
    { label: result.deflection >= 0 ? "Sagging" : "Hogging", value: `${fmt(Math.abs(result.deflection) * 100, 1)} cm` },
    { label: "Mean of means (F + A + 6M)/8", value: `${fmt(result.meanOfMeans, 3)} m` },
    { label: "Draft for hydrostatic table", value: `${fmt(result.tableDraft, 3)} m` },
    { label: "Displacement from table", value: `${fmt(result.hydrostatics.displacement, 1)} t`, hint: `TPC ${fmt(result.hydrostatics.tpc, 2)} t/cm · LCF ${signed(result.hydrostatics.lcf, 2)} m (+ aft)` },
    { label: "First trim correction", value: `${signed(result.firstTrimCorrection, 1)} t` },
    { label: "Second trim correction (Nemoto)", value: `${signed(result.secondTrimCorrection, 1)} t` },
    { label: "Displacement corrected for trim", value: `${fmt(result.displacementCorrectedForTrim, 1)} t` },
    { label: "Density correction", value: `${signed(result.densityCorrection, 1)} t` },
    { label: "Displacement in dock water", value: `${fmt(result.displacementInDockWater, 1)} t` },
    { label: "Total deductibles", value: `${fmt(result.totalDeductibles, 1)} t` },
    { label: "Net displacement", value: `${fmt(result.netDisplacement, 1)} t`, emphasis: true },
  ];
}

export const rowsToText = (title: string, rows: ResultRow[]) =>
  [title, ...rows.map((row) => `${row.label}: ${row.value}`)].join("\n");
