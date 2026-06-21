import type { CalcResult, CalcStep, CourseEntry } from "@/data/courseContent/types";

/**
 * Elle `steps` yazılmamış HER formül için genel (otomatik) adım adım çözüm
 * üretir. Adımlar daima `calculate()` çıktısıyla tutarlıdır (sonuçlar doğrudan
 * `calculate` sonucundan alınır — yeni sayı üretilmez):
 *
 *   1. Verilen değerler  (girdiler etiket + birimleriyle)
 *   2. Uygulanan formül  (entry.formula + varsa not)
 *   3..n. Sonuç(lar)     (calculate çıktısının her satırı)
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

  if (inputs.length) {
    const expr = inputs
      .map((inp) => {
        const unit = inp.unit ? ` ${inp.unit}` : "";
        return `${inp.label} = ${vals[inp.key]}${unit}`;
      })
      .join("   •   ");
    steps.push({ title: "Verilen değerler", expression: expr });
  }

  steps.push({
    title: "Uygulanan formül",
    expression: entry.formula,
    hint: entry.note,
  });

  results.forEach((r) => {
    steps.push({ title: r.label, result: r.value });
  });

  return steps;
}
