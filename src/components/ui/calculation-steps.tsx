import { useState } from "react";
import { Check, ChevronDown, ChevronUp, Clipboard, ListOrdered } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import type { CalculationStep } from "@/types/calculationSteps";
import { Button } from "@/components/ui/button";

interface CalculationStepsProps {
  steps: CalculationStep[];
}

export const CalculationSteps = ({ steps }: CalculationStepsProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!steps || steps.length === 0) return null;

  const copySteps = async () => {
    const text = steps
      .flatMap((step) => [
        `${step.step}. ${step.title}`,
        `Formula: ${step.formula}`,
        step.substitution ? `Yerine koyma: ${step.substitution}` : "",
        step.result ? `Result: ${step.result}` : "",
        step.explanation ? `Explanation: ${step.explanation}` : "",
      ])
      .filter(Boolean)
      .join("\n");

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="mt-3 rounded-lg border border-blue-500/15 bg-blue-500/[0.035] p-2">
      <div className="flex flex-wrap items-center gap-2">
        <CollapsibleTrigger className="flex min-w-0 flex-1 items-center justify-center gap-2 rounded-md py-1.5 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-50 hover:text-blue-800 dark:text-blue-400 dark:hover:bg-blue-900/20 dark:hover:text-blue-300">
          <ListOrdered className="h-4 w-4" />
          {isOpen ? `Hide the calculation chain (${steps.length} steps)` : `Show the calculation chain (${steps.length} steps)`}
          {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </CollapsibleTrigger>
        <Button type="button" size="sm" variant="ghost" className="h-8 gap-1.5 text-xs" onClick={copySteps}>
          {copied ? <Check className="h-3.5 w-3.5" /> : <Clipboard className="h-3.5 w-3.5" />}
          {copied ? "Kopyalandı" : "İşlem izini kopyala"}
        </Button>
      </div>
      <CollapsibleContent>
        <div className="mt-2 space-y-2 border-l-2 border-blue-200 dark:border-blue-800 pl-4">
          {steps.map((s, index) => (
            <div key={`${s.step}-${index}`} className="text-sm">
              <div className="flex items-start gap-2">
                <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs font-bold shrink-0 mt-0.5">
                  {s.step}
                </span>
                <div className="space-y-0.5 min-w-0">
                  <div className="font-semibold text-gray-700 dark:text-gray-300">{s.title}</div>
                  <div className="font-mono text-xs bg-gray-50 dark:bg-gray-800 rounded px-2 py-1 text-gray-800 dark:text-gray-200">
                    <span translate="no" className="notranslate">{s.formula}</span>
                  </div>
                  {s.substitution && (
                    <div className="font-mono text-xs bg-gray-100 dark:bg-gray-700 rounded px-2 py-1 text-gray-700 dark:text-gray-300">
                      {s.substitution}
                    </div>
                  )}
                  {s.result && (
                    <div className="font-mono text-xs font-bold bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded px-2 py-1">
                      {s.result}
                    </div>
                  )}
                  {s.explanation && (
                    <div className="text-xs text-gray-500 dark:text-gray-400 italic">
                      {s.explanation}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-2 px-2 text-micro leading-relaxed text-muted-foreground">
          Ara değerler hesap motorunda tam hassasiyetle tutulur; gösterimdeki yuvarlama sonraki adıma taşınmaz.
          Sonuçları gemiye özel onaylı doküman ve cihaz çıktılarıyla doğrulayın.
        </p>
      </CollapsibleContent>
    </Collapsible>
  );
};
