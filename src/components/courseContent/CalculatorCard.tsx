import { useState } from "react";
import { AlertCircle, Calculator, ListOrdered } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { CalcStep, CourseEntry } from "@/data/courseContent/types";
import { StepByStepSolution } from "./StepByStepSolution";
import { buildAutoSteps } from "./autoSteps";
import { CalculationRecordPanel } from "./CalculationRecordPanel";
import { hapticNotify } from "@/lib/haptics";
import { CalculatorPanel, CalculatorNumberField } from "@/components/calculations/ProfessionalCalculator";
import {
  buildCalculationRecord,
  hasCalculationError,
  validateCalculationInputs,
  type CalculationRecord,
} from "@/utils/calculationRecord";

/**
 * A single linked calculator card. Shows the formula on top (the same expression
 * as the Formulas page → the formula-calculation link stays visible), with the
 * inputs and the results computed by `entry.calculate` underneath.
 *
 * The design is carried over from the existing machine "CalcToolCard" and shared
 * across all topics.
 */
export function CalculatorCard({ entry }: { entry: CourseEntry }) {
  const [vals, setVals] = useState<Record<string, string>>({});
  const [results, setResults] = useState<{ label: string; value: string }[] | null>(null);
  const [steps, setSteps] = useState<CalcStep[] | null>(null);
  const [showSteps, setShowSteps] = useState(false);
  const [numVals, setNumVals] = useState<Record<string, number>>({});
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [calculationError, setCalculationError] = useState("");
  const [record, setRecord] = useState<CalculationRecord | null>(null);

  const inputs = entry.inputs ?? [];

  const handleCalc = () => {
    if (!entry.calculate) return;
    const validation = validateCalculationInputs(inputs, vals);
    setFieldErrors(validation.errors);
    setCalculationError("");

    if (Object.keys(validation.errors).length > 0) {
      hapticNotify("error");
      setResults(null);
      setSteps(null);
      setRecord(null);
      setShowSteps(false);
      return;
    }

    try {
      const resultList = entry.calculate(validation.values);
      if (!Array.isArray(resultList) || resultList.length === 0) {
        throw new Error("The calculator produced no results.");
      }

      const calculatedSteps = entry.steps
        ? entry.steps(validation.values)
        : buildAutoSteps(entry, validation.values, resultList);

      if (hasCalculationError(resultList)) {
        hapticNotify("error");
        setCalculationError(resultList.map((result) => result.value).join(" "));
        setResults(null);
        setSteps(null);
        setRecord(null);
        setShowSteps(false);
        return;
      }

      hapticNotify("success");
      setResults(resultList);
      setNumVals(validation.values);
      setSteps(calculatedSteps);
      setRecord(buildCalculationRecord(entry, validation.values, resultList, calculatedSteps));
      // As in the Navigation Almanac comparison, the detail is shown together with the result.
      setShowSteps(true);
    } catch (error) {
      hapticNotify("error");
      setResults(null);
      setSteps(null);
      setRecord(null);
      setShowSteps(false);
      setCalculationError(
        error instanceof Error ? error.message : "The calculation could not be completed. Check the entries.",
      );
    }
  };

  const updateValue = (key: string, value: string) => {
    setVals((previous) => ({ ...previous, [key]: value }));
    setFieldErrors((previous) => {
      if (!previous[key]) return previous;
      const next = { ...previous };
      delete next[key];
      return next;
    });
    setCalculationError("");
    // Prevent a stale result from staying on screen when the inputs change.
    setResults(null);
    setSteps(null);
    setRecord(null);
    setShowSteps(false);
  };

  return (
    <CalculatorPanel title={entry.name} description={entry.note}>
      <div className="space-y-4">
        <div className="rounded-xl border border-border/60 bg-background/70 p-3 font-mono text-xs leading-relaxed text-primary">
          <span translate="no" className="notranslate break-words">{entry.formula}</span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {inputs.map((inp) => (
            <CalculatorNumberField
              key={inp.key}
              id={`${entry.id}-${inp.key}`}
              label={inp.label}
              unit={inp.unit}
              placeholder={inp.placeholder}
              help={inp.help}
              min={inp.min}
              max={inp.max}
              value={vals[inp.key] ?? ""}
              onChange={(value) => updateValue(inp.key, value)}
              error={fieldErrors[inp.key]}
            />
          ))}
        </div>
        <Button onClick={handleCalc} size="lg" className="min-h-11 w-full gap-2 rounded-xl">
          <Calculator className="h-4 w-4" /> Calculate
        </Button>
        {calculationError && (
          <div role="alert" className="flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <div>
              <p className="font-semibold">Calculation could not be completed</p>
              <p className="text-xs">{calculationError}</p>
            </div>
          </div>
        )}
        {results && record && <CalculationRecordPanel record={record} />}
        {results && steps && steps.length > 0 && (
          <>
            <Button
              onClick={() => setShowSteps((s) => !s)}
              size="sm"
              variant="ghost"
              className="w-full gap-2 text-primary"
            >
              <ListOrdered className="h-4 w-4" />
              {showSteps ? "Hide Steps" : "Show Solution Step by Step"}
            </Button>
            {showSteps && (
              <StepByStepSolution entry={entry} vals={numVals} steps={steps} />
            )}
          </>
        )}
        {entry.source && (
          <p className="text-micro text-muted-foreground">
            Source: {entry.source.code}
            {entry.source.detail ? ` — ${entry.source.detail}` : ""}
          </p>
        )}
      </div>
    </CalculatorPanel>
  );
}
