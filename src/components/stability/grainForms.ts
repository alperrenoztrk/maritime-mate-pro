import { grainHeelingMoment } from "@/lib/calc/stability";
import { parseNumber } from "@/components/tools/format";
import type { TableRow } from "@/components/tools/EditableTable";
import { readStabilityForm, useStabilityForm } from "./stabilityForms";

/** Vertical-shift factor per compartment condition (Grain Code B 1.3 / B 1.5). */
export const GRAIN_CONDITIONS = [
  { value: "1.00", label: "Filled, trimmed or untrimmed (× 1.00)" },
  { value: "1.06", label: "Filled, trimmed, underdeck voids used for VCG (× 1.06)" },
  { value: "1.12", label: "Partly filled (× 1.12)" },
] as const;

export interface GrainForm {
  stowageFactor: string;
  holds: TableRow[];
}

const hold = (name: string): TableRow => ({ name, moment: "", factor: "1.00" });

export const emptyGrain: GrainForm = {
  stowageFactor: "",
  holds: [hold("No.1 hold"), hold("No.2 hold"), hold("No.3 hold"), hold("No.4 hold"), hold("No.5 hold")],
};

export const useGrainForm = () => useStabilityForm("grain-holds", emptyGrain);

export function computeGrain(form: GrainForm) {
  const sf = parseNumber(form.stowageFactor);
  const holds = form.holds
    .map((h) => ({ volumetricMoment: parseNumber(h.moment), factor: parseNumber(h.factor) || 1 }))
    .filter((h) => Number.isFinite(h.volumetricMoment));
  if (!(sf > 0) || holds.length === 0) return undefined;
  return { stowageFactor: sf, ...grainHeelingMoment(holds, sf) };
}

export const savedGrain = () => computeGrain(readStabilityForm("grain-holds", emptyGrain));
