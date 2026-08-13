import { useState } from "react";
import { Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/useLanguage";
import { explainCalculation } from "@/services/aiClient";
import type { CalcStep, CourseEntry } from "@/data/courseContent/types";

/**
 * Shows the deterministic solution steps of a formula as numbered cards, with an
 * "Ask AI about this calculation" button underneath. The AI only explains the
 * existing (correct) steps in a teaching style; it never produces new numbers.
 *
 * The steps are generated on the CalculatorCard side via `entry.steps(vals)` and
 * passed in here. The styling matches the existing CalculatorCard look.
 */
export function StepByStepSolution({
  entry,
  vals,
  steps,
}: {
  entry: CourseEntry;
  vals: Record<string, number>;
  steps: CalcStep[];
}) {
  const { currentLanguage } = useLanguage();
  const [aiAnswer, setAiAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAskAI = async () => {
    setLoading(true);
    setError("");
    setAiAnswer("");
    try {
      const result = await explainCalculation(entry, vals, steps, currentLanguage);
      setAiAnswer(result);
    } catch {
      setError("No explanation received. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!steps.length) return null;

  return (
    <div className="space-y-3 rounded-lg border border-border/40 bg-background/60 p-3">
      <p className="text-xs font-semibold text-primary">Step by Step Solution</p>

      <ol className="space-y-2">
        {steps.map((s, i) => (
          <li key={i} className="rounded-md border border-border/30 bg-card/60 p-2">
            <div className="flex items-start gap-2">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-micro font-bold text-primary">
                {i + 1}
              </span>
              <div className="min-w-0 flex-1 space-y-1">
                <p className="text-xs font-medium text-foreground">{s.title}</p>
                {s.expression && (
                  <p className="break-words font-mono text-micro text-muted-foreground">
                    {s.expression}
                  </p>
                )}
                {s.result && (
                  <p className="text-xs font-semibold text-foreground">{s.result}</p>
                )}
                {s.hint && (
                  <p className="text-micro italic text-muted-foreground">{s.hint}</p>
                )}
              </div>
            </div>
          </li>
        ))}
      </ol>

      <Button
        onClick={handleAskAI}
        disabled={loading}
        size="sm"
        variant="outline"
        className="w-full gap-2 border-blue-400/40 text-blue-600 hover:bg-blue-500/10 dark:text-blue-300"
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Getting ready...
          </>
        ) : (
          <>
            <Sparkles className="h-4 w-4" /> Ask this process to artificial intelligence
          </>
        )}
      </Button>

      {error && <p className="text-xs text-red-500">{error}</p>}
      {aiAnswer && !loading && (
        <div className="rounded-md border border-blue-500/20 bg-blue-500/5 p-3">
          <p className="mb-1 flex items-center gap-1.5 text-micro uppercase tracking-wide text-blue-500">
            <Sparkles className="h-3 w-3" /> Artificial Intelligence Explained
          </p>
          <p className="whitespace-pre-wrap text-xs leading-relaxed text-foreground">
            {aiAnswer}
          </p>
        </div>
      )}
    </div>
  );
}
