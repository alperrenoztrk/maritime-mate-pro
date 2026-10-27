export type UnitValidationOptions = {
  label: string;
  unit: string;
  example: string;
};

export type RangeValidationOptions = UnitValidationOptions & {
  min: number;
  max: number;
};

export type ConsistencyCheck = {
  ok: boolean;
  message: string;
  example: string;
};

export type StabilityLogicInput = {
  km?: number | null;
  kg?: number | null;
  gm?: number | null;
  gz?: number | null;
  displacement?: number | null;
};

const NON_NUMERIC_PATTERN = /[^0-9,.+-]/;

export const validateUnit = (rawValue: string, options: UnitValidationOptions): string | null => {
  if (!rawValue || rawValue.trim().length === 0) {
    return null;
  }
  if (NON_NUMERIC_PATTERN.test(rawValue)) {
    return `Enter only a number for ${options.label}; the unit is shown separately. Example: ${options.example} ${options.unit}.`;
  }
  return null;
};

export const validateRange = (value: number, options: RangeValidationOptions): string | null => {
  if (value < options.min || value > options.max) {
    return `${options.label} must be between ${options.min} and ${options.max} ${options.unit}. Example: ${options.example} ${options.unit}.`;
  }
  return null;
};

export const validateConsistency = (checks: ConsistencyCheck[]): string[] =>
  checks.filter((check) => !check.ok).map((check) => `${check.message} Example: ${check.example}.`);

export const validateStabilityLogic = (input: StabilityLogicInput): string[] => {
  const errors: string[] = [];

  if (typeof input.km === "number" && typeof input.kg === "number" && input.km <= input.kg) {
    errors.push("KM must be greater than KG (GM = KM − KG must be positive).");
  }

  if (typeof input.displacement === "number" && input.displacement <= 0) {
    errors.push("Δ (displacement) must be greater than 0.");
  }

  if (typeof input.gm === "number" && input.gm < 0) {
    errors.push("GM must not be negative.");
  }

  if (typeof input.gz === "number" && input.gz < 0) {
    errors.push("GZ must not be negative.");
  }

  return errors;
};
