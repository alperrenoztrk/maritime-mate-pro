import { useState } from "react";
import { Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { explainCalculation } from "@/services/aiClient";
import type { CalcStep, CourseEntry } from "@/data/courseContent/types";

/**
 * Bir formülün deterministik çözüm adımlarını numaralı kartlar halinde gösterir
 * ve altında "Bu işlemi yapay zekaya sor" butonu sunar. Yapay zeka yalnızca
 * mevcut (doğru) adımları öğretici biçimde açıklar; yeni sayı üretmez.
 *
 * Adımlar `entry.steps(vals)` ile CalculatorCard tarafında üretilip buraya
 * verilir. Stil mevcut CalculatorCard görünümüyle uyumludur.
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
      setError("Açıklama alınamadı. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  };

  if (!steps.length) return null;

  return (
    <div className="space-y-3 rounded-lg border border-border/40 bg-background/60 p-3">
      <p className="text-xs font-semibold text-primary">Adım Adım Çözüm</p>

      <ol className="space-y-2">
        {steps.map((s, i) => (
          <li key={i} className="rounded-md border border-border/30 bg-card/60 p-2">
            <div className="flex items-start gap-2">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-[11px] font-bold text-primary">
                {i + 1}
              </span>
              <div className="min-w-0 flex-1 space-y-1">
                <p className="text-xs font-medium text-foreground">{s.title}</p>
                {s.expression && (
                  <p className="break-words font-mono text-[11px] text-muted-foreground">
                    {s.expression}
                  </p>
                )}
                {s.result && (
                  <p className="text-xs font-semibold text-foreground">{s.result}</p>
                )}
                {s.hint && (
                  <p className="text-[11px] italic text-muted-foreground">{s.hint}</p>
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
            <Loader2 className="h-4 w-4 animate-spin" /> Hazırlanıyor...
          </>
        ) : (
          <>
            <Sparkles className="h-4 w-4" /> Bu işlemi yapay zekaya sor
          </>
        )}
      </Button>

      {error && <p className="text-xs text-red-500">{error}</p>}
      {aiAnswer && !loading && (
        <div className="rounded-md border border-blue-500/20 bg-blue-500/5 p-3">
          <p className="mb-1 flex items-center gap-1.5 text-[10px] uppercase tracking-wide text-blue-500">
            <Sparkles className="h-3 w-3" /> Yapay Zeka Açıklaması
          </p>
          <p className="whitespace-pre-wrap text-xs leading-relaxed text-foreground">
            {aiAnswer}
          </p>
        </div>
      )}
    </div>
  );
}
