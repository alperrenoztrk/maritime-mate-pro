/** Pure types, input validation and deterministic text audit for calculator UI. */
export interface ProfessionalField {
  key: string;
  label: string;
  unit?: string;
  placeholder?: string;
  defaultValue?: string;
  help?: string;
  min?: number;
  max?: number;
}
export interface ProfessionalGroup {
  title: string;
  description?: string;
  fields: ProfessionalField[];
}
export interface ProfessionalResult {
  label: string;
  value: string;
  primary?: boolean;
}
export interface ProfessionalOutput {
  results: ProfessionalResult[];
  steps: string[];
  notices?: string[];
}
export function parseProfessionalFields(
  groups: ProfessionalGroup[],
  raw: Record<string, string>,
): { values: Record<string, number>; errors: Record<string, string> } {
  const values: Record<string, number> = {};
  const errors: Record<string, string> = {};
  for (const field of groups.flatMap((group) => group.fields)) {
    const original = (raw[field.key] ?? "").trim().replace(",", ".");
    if (!original) {
      errors[field.key] = "Required field.";
      continue;
    }
    // Number('') becomes 0 and parseFloat('12text') becomes 12: both must fail.
    if (!/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?$/.test(original)) {
      errors[field.key] = "Enter a valid number.";
      continue;
    }
    const value = Number(original);
    if (!Number.isFinite(value)) {
      errors[field.key] = "Number is outside the supported range.";
    } else if (field.min !== undefined && value < field.min) {
      errors[field.key] = `Minimum: ${field.min}${field.unit ? ` ${field.unit}` : ""}.`;
    } else if (field.max !== undefined && value > field.max) {
      errors[field.key] = `Maximum: ${field.max}${field.unit ? ` ${field.unit}` : ""}.`;
    } else {
      values[field.key] = value;
    }
  }
  return { values, errors };
}

export function buildProfessionalReport(
  title: string,
  fields: ProfessionalGroup[],
  values: Record<string, number>,
  output: ProfessionalOutput,
  formula: string,
  timestamp: string,
): string {
  return [
    title,
    `UTC: ${timestamp}`,
    "TRAINING / CROSS-CHECK ONLY — NOT VESSEL-APPROVED",
    "",
    "INPUTS",
    ...fields.flatMap((group) => [
      `[${group.title}]`,
      ...group.fields.map((field) =>
        `${field.label}: ${values[field.key]}${field.unit ? ` ${field.unit}` : ""}`),
    ]),
    "",
    `METHOD: ${formula}`,
    "",
    "RESULTS",
    ...output.results.map((result) => `${result.label}: ${result.value}`),
    "",
    "WORKING",
    ...output.steps.map((step, index) => `${index + 1}. ${step}`),
    ...(output.notices?.length ? ["", "NOTES", ...output.notices] : []),
  ].join("\n");
}

