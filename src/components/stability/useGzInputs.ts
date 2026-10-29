import type { CurvePoint } from "@/lib/calc/stability";
import type { TableRow } from "@/components/tools/EditableTable";
import { parseNumber } from "@/components/tools/format";
import { emptyKnRows, gzFromKnRows, savedLoadingResult, useStabilityForm } from "./stabilityForms";

export interface GzInputState {
  useLoading: boolean;
  displacement: string;
  kgFluid: string;
  gmFluid: string;
  tcg: string;
  rows: TableRow[];
}

const initial: GzInputState = { useLoading: true, displacement: "", kgFluid: "", gmFluid: "", tcg: "0", rows: emptyKnRows() };

export interface GzInputs {
  state: GzInputState;
  setState: (updater: (prev: GzInputState) => GzInputState) => void;
  gz: CurvePoint[];
  displacement: number;
  kgFluid: number;
  gmFluid: number;
  errors: string[];
  fromLoading: boolean;
}

/** KN table + condition (saved loading condition or typed) → GZ curve. Shared by the curve and criteria tools. */
export function useGzInputs(): GzInputs {
  const [state, setState] = useStabilityForm("gz-inputs", initial);
  const loading = savedLoadingResult();
  const fromLoading = state.useLoading && loading !== undefined;
  const displacement = fromLoading ? loading.displacement : parseNumber(state.displacement);
  const kgFluid = fromLoading ? loading.kgFluid : parseNumber(state.kgFluid);
  const gmFluid = fromLoading ? loading.gmFluid : parseNumber(state.gmFluid);
  const tcg = fromLoading ? loading.tcg : parseNumber(state.tcg) || 0;
  const errors: string[] = [];
  if (!Number.isFinite(displacement) || displacement <= 0) errors.push("Displacement is required.");
  if (!Number.isFinite(kgFluid)) errors.push("KG (fluid) is required.");
  if (!Number.isFinite(gmFluid)) errors.push("GM (fluid) is required.");
  const curve = gzFromKnRows(state.rows, Number.isFinite(kgFluid) ? kgFluid : 0, tcg);
  errors.push(...curve.errors);
  return { state, setState, gz: errors.length === 0 ? curve.gz : [], displacement, kgFluid, gmFluid, errors, fromLoading };
}

