import type {
  CalcInput,
  CalcResult,
  CalcStep,
  CourseEntry,
} from "@/data/courseContent/types";

const BAD_OUTPUT = /\b(?:NaN|Infinity|undefined|null)\b/i;

export interface CalculationInputSnapshot {
  key: string;
  label: string;
  value: number;
  unit?: string;
}

export interface CalculationCheck {
  label: string;
  status: "pass" | "warning" | "error";
  detail: string;
}

export interface CalculationRecord {
  id: string;
  name: string;
  group: string;
  computedAtUtc: string;
  formula: string;
  inputs: CalculationInputSnapshot[];
  results: CalcResult[];
  steps: CalcStep[];
  source?: { code: string; detail?: string; url?: string };
  note?: string;
  checks: CalculationCheck[];
}

export interface InputValidationResult {
  values: Record<string, number>;
  errors: Record<string, string>;
}

const isRequired = (input: CalcInput) => input.required !== false;

/**
 * Ortak hesaplayıcı giriş sözleşmesi.
 *
 * Boş alanların daha önce sessizce 0 kabul edilmesini engeller; sonlu sayı,
 * isteğe bağlı min/max ve zorunluluk kontrollerini tek yerde uygular.
 */
export function validateCalculationInputs(
  inputs: CalcInput[],
  rawValues: Record<string, string>,
): InputValidationResult {
  const values: Record<string, number> = {};
  const errors: Record<string, string> = {};

  inputs.forEach((input) => {
    const raw = rawValues[input.key]?.trim() ?? "";
    if (raw === "") {
      if (isRequired(input)) errors[input.key] = "Bu alan zorunludur.";
      return;
    }

    const value = Number(raw.replace(",", "."));
    if (!Number.isFinite(value)) {
      errors[input.key] = "Geçerli bir sayı girin.";
      return;
    }
    if (input.min !== undefined && value < input.min) {
      errors[input.key] = `En küçük değer ${input.min}${input.unit ? ` ${input.unit}` : ""}.`;
      return;
    }
    if (input.max !== undefined && value > input.max) {
      errors[input.key] = `En büyük değer ${input.max}${input.unit ? ` ${input.unit}` : ""}.`;
      return;
    }

    values[input.key] = value;
  });

  return { values, errors };
}

export function hasCalculationError(results: CalcResult[]): boolean {
  return results.some(
    (result) =>
      /^(?:hata|error)$/i.test(result.label.trim()) ||
      BAD_OUTPUT.test(result.value),
  );
}

export function buildCalculationRecord(
  entry: CourseEntry,
  values: Record<string, number>,
  results: CalcResult[],
  steps: CalcStep[],
  computedAt: Date = new Date(),
): CalculationRecord {
  const inputs = (entry.inputs ?? [])
    .filter((input) => values[input.key] !== undefined)
    .map((input) => ({
      key: input.key,
      label: input.label,
      value: values[input.key],
      unit: input.unit,
    }));

  const checks: CalculationCheck[] = [
    {
      label: "Girdi bütünlüğü",
      status: inputs.length >= (entry.inputs ?? []).filter(isRequired).length ? "pass" : "warning",
      detail: `${inputs.length}/${(entry.inputs ?? []).length} alan sayısal olarak işlendi.`,
    },
    {
      label: "Formül izi",
      status: entry.formula.trim() ? "pass" : "error",
      detail: entry.formula.trim() ? "Kullanılan bağıntı kayda eklendi." : "Formül metni eksik.",
    },
    {
      label: "Kaynak izi",
      status: entry.source?.code ? "pass" : "warning",
      detail: entry.source?.code ?? "Bu hesap için kaynak referansı belirtilmemiş.",
    },
    {
      label: "Sayısal çıktı",
      status: hasCalculationError(results) ? "error" : "pass",
      detail: hasCalculationError(results)
        ? "Hesap motoru hata veya sonlu olmayan çıktı bildirdi."
        : `${results.length} sonuç satırı üretildi.`,
    },
  ];

  return {
    id: entry.id,
    name: entry.name,
    group: entry.group,
    computedAtUtc: computedAt.toISOString(),
    formula: entry.formula,
    inputs,
    results,
    steps,
    source: entry.source,
    note: entry.note,
    checks,
  };
}

export function calculationRecordToText(record: CalculationRecord): string {
  const source = record.source
    ? `${record.source.code}${record.source.detail ? ` — ${record.source.detail}` : ""}`
    : "Belirtilmemiş";

  return [
    record.name,
    `Grup: ${record.group}`,
    `UTC: ${record.computedAtUtc}`,
    "",
    "GİRDİLER",
    ...record.inputs.map(
      (input) => `${input.label}: ${input.value}${input.unit ? ` ${input.unit}` : ""}`,
    ),
    "",
    `FORMÜL: ${record.formula}`,
    "",
    "SONUÇLAR",
    ...record.results.map((result) => `${result.label}: ${result.value}`),
    "",
    "İŞLEM İZİ",
    ...record.steps.flatMap((step, index) => [
      `${index + 1}. ${step.title}`,
      step.expression ? `   ${step.expression}` : "",
      step.result ? `   Sonuç: ${step.result}` : "",
      step.hint ? `   Not: ${step.hint}` : "",
    ]).filter(Boolean),
    "",
    `KAYNAK: ${source}`,
    ...(record.note ? [`KAPSAM / NOT: ${record.note}`] : []),
  ].join("\n");
}
