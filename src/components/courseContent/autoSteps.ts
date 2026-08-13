import type { CalcResult, CalcStep, CourseEntry } from "@/data/courseContent/types";

/**
 * Builds a generic (automatic) step-by-step solution for EVERY formula that has
 * no hand-written `steps`. The steps are always consistent with the `calculate()`
 * output (results are taken directly from the `calculate` result — no new numbers
 * are produced):
 *
 *   1..n. Input validation (each quantity, value and unit on its own line)
 *   n+1. Formula applied (entry.formula + note when present)
 *   n+2. Numerical substitution trace
 *   n+3.. Result(s) (one line per `calculate` output row)
 *
 * The deeper "why/how" narrative is provided by the "ask AI" button inside
 * StepByStepSolution (these steps are passed to it as context). When a rich
 * hand-written `entry.steps` exists (as in navigation), it takes precedence.
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
      title: `Input validation — ${input.label}`,
      expression: `${input.key} = ${vals[input.key]}${unit}`,
      hint: input.help,
    });
  });

  steps.push({
    title: "Formula applied",
    expression: entry.formula,
    hint: entry.note,
  });

  if (inputs.length) {
    const substitution = inputs
      .map((input) => `${input.key}=${vals[input.key]}${input.unit ? ` ${input.unit}` : ""}`)
      .join("; ");
    steps.push({
      title: "Numerical substitution",
      expression: `${entry.formula}  |  ${substitution}`,
      hint: "Intermediate values are calculated with full precision; The on-screen rounding is for display only.",
    });
  }

  results.forEach((r) => {
    steps.push({
      title: `Result — ${r.label}`,
      result: r.value,
      hint: /^(?:hata|error)$/i.test(r.label.trim())
        ? "Check the inputs and validity conditions of the formula."
        : undefined,
    });
  });

  return steps;
}
