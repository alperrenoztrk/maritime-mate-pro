import type { CalcResult, CalcStep, CourseEntry } from "@/data/courseContent/types";

/**
 * Elle `steps` yazılmamış HER formül için genel (otomatik) adım adım çözüm
 * üretir. Adımlar daima `calculate()` çıktısıyla tutarlıdır (sonuçlar doğrudan
 * `calculate` sonucundan alınır — yeni sayı üretilmez):
 *
 *   1..n. Girdi doğrulama (her büyüklük, değer ve birimi ayrı satır)
 *   n+1. Uygulanan formül (entry.formula + varsa not)
 *   n+2. Sayısal yerine koyma izi
 *   n+3.. Sonuç(lar) (calculate çıktısının her satırı)
 *
 * Derinlemesine "neden/nasıl" anlatımı, StepByStepSolution içindeki
 * "yapay zekaya sor" butonu ile (bu adımlar bağlam verilerek) sağlanır.
 * Navigasyondaki gibi elle yazılmış zengin `entry.steps` varsa o önceliklidir.
 */
export function buildAutoSteps(
  entry: CourseEntry,
  vals: Record<string, number>,
  results: CalcResult[],
): CalcStep[] {
  const steps: CalcStep[] = [];
  const inputs = entry.inputs ?? [];

  inputs.forEach((input) => {
    const unit = input.unit ? ` ${input.unit}` : "";
    steps.push({
      title: `Girdi doğrulama — ${input.label}`,
      expression: `${input.key} = ${vals[input.key]}${unit}`,
      hint: input.help,
    });
  });

  steps.push({
    title: "Uygulanan formül",
    expression: entry.formula,
    hint: entry.note,
  });

  if (inputs.length) {
    const substitution = inputs
      .map((input) => `${input.key}=${vals[input.key]}${input.unit ? ` ${input.unit}` : ""}`)
      .join("; ");
    steps.push({
      title: "Sayısal yerine koyma",
      expression: `${entry.formula}  |  ${substitution}`,
      hint: "Ara değerler tam hassasiyetle hesaplanır; ekrandaki yuvarlama yalnız gösterim içindir.",
    });
  }

  results.forEach((r) => {
    steps.push({
      title: `Sonuç — ${r.label}`,
      result: r.value,
      hint: /^(?:hata|error)$/i.test(r.label.trim())
        ? "Girdileri ve formülün geçerlilik koşullarını kontrol edin."
        : undefined,
    });
  });

  return steps;
}
