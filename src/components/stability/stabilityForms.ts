import {
  fromAftPerpendicular,
  gzCurveFromKn,
  listFromTcg,
  metacentricHeight,
  summariseLoading,
  trimAndDrafts,
  type CurvePoint,
  type LoadItem,
  type LongitudinalReference,
} from "@/lib/calc/stability";
import { parseNumber } from "@/components/tools/format";
import type { TableRow } from "@/components/tools/EditableTable";
import { readStored, useStoredState } from "@/components/tools/useStoredState";

const PREFIX = "marine-expert-stability:";

/** Stability forms persisted on this device and shared by the stability tools. */
export const useStabilityForm = <T extends object>(key: string, initial: T) => useStoredState(PREFIX + key, initial);
export const readStabilityForm = <T extends object>(key: string, initial: T) => readStored(PREFIX + key, initial);

// ── Loading condition ───────────────────────────────────────────────────────

export interface LoadingForm {
  lbp: string;
  km: string;
  lcb: string;
  lcf: string;
  mctc: string;
  tableDraft: string;
  reference: LongitudinalReference;
  items: TableRow[];
}

const item = (name: string, weight = "", vcg = "", lcg = "", tcg = "0", fsm = "0"): TableRow => ({ name, weight, vcg, lcg, tcg, fsm });

export const emptyLoading: LoadingForm = {
  lbp: "",
  km: "",
  lcb: "",
  lcf: "",
  mctc: "",
  tableDraft: "",
  reference: "from-aft-perpendicular",
  items: [item("Lightship"), item("Constant"), item("Cargo"), item("Fuel oil"), item("Fresh water"), item("Ballast")],
};

export interface LoadingResult {
  displacement: number;
  kg: number;
  kgFluid: number;
  fsc: number;
  gmSolid: number;
  gmFluid: number;
  tcg: number;
  list: number;
  /** Present when LBP, LCB, LCF, MCTC and table draft are given. */
  trim?: { trim: number; forward: number; aft: number; lcg: number };
  km: number;
}

export function computeLoading(form: LoadingForm): { result?: LoadingResult; errors: string[] } {
  const errors: string[] = [];
  const items: LoadItem[] = [];
  form.items.forEach((row, i) => {
    const weight = parseNumber(row.weight);
    if (!Number.isFinite(weight) || weight === 0) return; // empty rows are ignored
    const vcg = parseNumber(row.vcg);
    if (!Number.isFinite(vcg)) {
      errors.push(`Row ${i + 1} (${row.name || "item"}): VCG is required.`);
      return;
    }
    if (weight < 0) errors.push(`Row ${i + 1} (${row.name || "item"}): weight cannot be negative.`);
    items.push({
      weight,
      vcg,
      lcg: parseNumber(row.lcg),
      tcg: parseNumber(row.tcg) || 0,
      fsm: parseNumber(row.fsm) || 0,
    });
  });
  const km = parseNumber(form.km);
  if (items.length === 0) errors.push("Enter at least the lightship weight and VCG.");
  if (!Number.isFinite(km)) errors.push("KM is required (hydrostatic table at this displacement).");
  if (errors.length > 0) return { errors };

  const s = summariseLoading(items.map((i) => ({ ...i, lcg: Number.isFinite(i.lcg) ? i.lcg : 0 })));
  const gm = metacentricHeight(km, s.kg, s.totalFsm, s.displacement);
  const result: LoadingResult = {
    displacement: s.displacement,
    kg: s.kg,
    kgFluid: gm.kgFluid,
    fsc: gm.fsc,
    gmSolid: gm.gmSolid,
    gmFluid: gm.gmFluid,
    tcg: s.tcg,
    list: listFromTcg(s.tcg, gm.gmFluid),
    km,
  };

  const lbp = parseNumber(form.lbp);
  const lcb = parseNumber(form.lcb);
  const lcf = parseNumber(form.lcf);
  const mctc = parseNumber(form.mctc);
  const tableDraft = parseNumber(form.tableDraft);
  const allLcg = items.every((i) => Number.isFinite(i.lcg));
  if ([lbp, lcb, lcf, mctc, tableDraft].every(Number.isFinite) && lbp > 0 && mctc > 0 && allLcg) {
    const toAp = (v: number) => fromAftPerpendicular(v, form.reference, lbp);
    const lcgAp = toAp(s.lcg);
    result.trim = {
      ...trimAndDrafts({ displacement: s.displacement, lcg: lcgAp, lcb: toAp(lcb), lcf: toAp(lcf), mctc, tableDraft, lbp }),
      lcg: s.lcg,
    };
  }
  return { result, errors };
}

/** Saved loading condition, if complete (used to prefill other stability tools). */
export function savedLoadingResult(): LoadingResult | undefined {
  return computeLoading(readStabilityForm("loading", emptyLoading)).result;
}

// ── KN / GZ tables ──────────────────────────────────────────────────────────

export const DEFAULT_KN_ANGLES = ["0", "10", "20", "30", "40", "50", "60"];

export const emptyKnRows = (): TableRow[] => DEFAULT_KN_ANGLES.map((angle) => ({ angle, value: angle === "0" ? "0" : "" }));

/** Parses (angle, value) rows; empty rows are skipped. */
export function parseCurveRows(rows: TableRow[]): { points: CurvePoint[]; errors: string[] } {
  const errors: string[] = [];
  const points: CurvePoint[] = [];
  rows.forEach((row, i) => {
    const angle = parseNumber(row.angle);
    const value = parseNumber(row.value);
    if (!Number.isFinite(angle) && !Number.isFinite(value)) return;
    if (!Number.isFinite(angle) || !Number.isFinite(value)) {
      errors.push(`Row ${i + 1}: enter both the angle and the value.`);
      return;
    }
    if (angle < 0 || angle > 90) errors.push(`Row ${i + 1}: angle must be 0 – 90°.`);
    points.push({ angle, value });
  });
  const angles = points.map((p) => p.angle);
  if (new Set(angles).size !== angles.length) errors.push("Each angle may appear only once.");
  if (points.length > 0 && !angles.includes(0)) points.push({ angle: 0, value: 0 });
  points.sort((a, b) => a.angle - b.angle);
  if (points.length < 4) errors.push("Enter at least three angles besides 0°.");
  return { points, errors };
}

/** GZ points from a KN table and KG (fluid). */
export function gzFromKnRows(rows: TableRow[], kgFluid: number, tcg = 0) {
  const { points, errors } = parseCurveRows(rows);
  return { gz: errors.length === 0 ? gzCurveFromKn(points, kgFluid, tcg) : [], errors };
}
