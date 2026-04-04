import { useState } from "react";
import { ChevronDown, ChevronUp, ListOrdered } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import type { CalculationStep } from "@/types/calculationSteps";

interface CalculationStepsProps {
  steps: CalculationStep[];
}

export const CalculationSteps = ({ steps }: CalculationStepsProps) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!steps || steps.length === 0) return null;

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="mt-3">
      <CollapsibleTrigger className="flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors w-full justify-center py-1.5 rounded-md hover:bg-blue-50 dark:hover:bg-blue-900/20">
        <ListOrdered className="h-4 w-4" />
        {isOpen ? "Adım adım çözümü gizle" : "Adım adım çözümü göster"}
        {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="mt-2 space-y-2 border-l-2 border-blue-200 dark:border-blue-800 pl-4">
          {steps.map((s) => (
            <div key={s.step} className="text-sm">
              <div className="flex items-start gap-2">
                <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs font-bold shrink-0 mt-0.5">
                  {s.step}
                </span>
                <div className="space-y-0.5 min-w-0">
                  <div className="font-semibold text-gray-700 dark:text-gray-300">{s.title}</div>
                  <div className="font-mono text-xs bg-gray-50 dark:bg-gray-800 rounded px-2 py-1 text-gray-800 dark:text-gray-200">
                    {s.formula}
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
      </CollapsibleContent>
    </Collapsible>
  );
};
