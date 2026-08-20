import { AlertTriangle, CheckCircle2, Sigma } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { LessonTopicEnhancement } from "@/data/lessonTopicEnhancements";

/**
 * Personel modülündeki "Detailed Explanation" düzeniyle aynı dil.
 * `LessonTopicDetailPage` ve `MachineTopicDetailPage` tarafından kullanılır.
 */
export function LessonEnhancementBlock({ data }: { data: LessonTopicEnhancement }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 border-t border-border/40 pt-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow">
          <Sigma className="h-4 w-4" />
        </div>
        <div>
          <h2 className="text-base font-bold text-foreground">
            Detailed Explanation & Examples with Solutions
          </h2>
        </div>
      </div>

      {data.deepDive && (
        <div className="rounded-2xl border border-border/50 bg-card/80 p-5 shadow-md">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-muted-foreground">
            Conceptual Framework
          </p>
          <p className="mt-2 text-sm leading-relaxed text-foreground/90">{data.deepDive}</p>
        </div>
      )}

      {data.coreFormula && (
        <div className="rounded-xl border-2 border-primary/30 bg-primary/5 p-4 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
            Core Correlation
          </p>
          <p className="mt-2 font-mono text-sm font-semibold text-foreground">
            {data.coreFormula.text}
          </p>
          {data.coreFormula.description && (
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              {data.coreFormula.description}
            </p>
          )}
        </div>
      )}

      {data.steps && data.steps.length > 0 && (
        <div className="rounded-2xl border border-border/50 bg-card/80 p-4 shadow-md">
          <div className="mb-3 flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow">
              <CheckCircle2 className="h-4 w-4" />
            </div>
            <h3 className="text-sm font-bold text-foreground">Calculation Steps</h3>
          </div>
          <Accordion type="single" collapsible className="space-y-2">
            {data.steps.map((step, i) => (
              <AccordionItem
                key={i}
                value={`step-${i}`}
                className="rounded-xl border border-border/40 bg-background/80 px-4 data-[state=open]:bg-emerald-500/5"
              >
                <AccordionTrigger className="text-left text-sm font-semibold hover:no-underline">
                  <span className="flex items-center gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                      {i + 1}
                    </span>
                    <span className="text-foreground">{step.title}</span>
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="pl-10 text-sm leading-relaxed text-foreground/85">
                    {step.description}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      )}

      {data.workedExamples && data.workedExamples.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-sky-500 to-blue-600 text-white shadow">
              <Sigma className="h-4 w-4" />
            </div>
            <h3 className="text-sm font-bold text-foreground">
              Solved Examples ({data.workedExamples.length})
            </h3>
          </div>

          {data.workedExamples.map((ex, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-2xl border border-sky-500/30 bg-sky-500/5 shadow-md"
            >
              <div className="bg-sky-500/10 px-4 py-3">
                <p className="text-micro font-bold uppercase tracking-[0.2em] text-sky-700 dark:text-sky-300">
                  Example {i + 1}
                </p>
                <p className="mt-1 text-sm font-semibold leading-relaxed text-foreground">
                  {ex.scenario}
                </p>
              </div>

              <div className="grid gap-4 p-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)]">
                <div className="rounded-lg border border-border/40 bg-background/60 p-3">
                  <p className="text-micro font-bold uppercase tracking-wider text-muted-foreground">
                    Given
                  </p>
                  <ul className="mt-2 space-y-1.5">
                    {ex.given.map((g, j) => (
                      <li key={j} className="text-xs text-foreground/85">
                        <span className="font-semibold text-foreground">{g.label}:</span>{" "}
                        <span className="font-mono">{g.value}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-lg border border-border/40 bg-background/60 p-3">
                  <p className="text-micro font-bold uppercase tracking-wider text-muted-foreground">
                    Solution
                  </p>
                  <ol className="mt-2 space-y-2">
                    {ex.solution.map((s, j) => (
                      <li key={j} className="text-xs leading-relaxed">
                        <p className="font-semibold text-foreground">
                          {j + 1}. {s.step}
                        </p>
                        {s.expression && (
                          <p className="ml-4 font-mono text-foreground/80">= {s.expression}</p>
                        )}
                        {s.result && (
                          <p className="ml-4 font-mono font-semibold text-emerald-700 dark:text-emerald-400">
                            → {s.result}
                          </p>
                        )}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

              <div className="border-t border-sky-500/20 bg-emerald-500/10 px-4 py-3">
                <p className="text-micro font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
                  Result
                </p>
                <p className="mt-1 text-sm font-bold text-foreground">{ex.answer}</p>
                {ex.note && (
                  <p className="mt-1 text-xs italic text-muted-foreground">Not: {ex.note}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {data.commonMistakes && data.commonMistakes.length > 0 && (
        <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-5 shadow-md">
          <div className="mb-3 flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500/20 text-amber-600 dark:text-amber-400">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-bold text-foreground">Common Mistakes</h3>
          </div>
          <ul className="space-y-2">
            {data.commonMistakes.map((m, i) => (
              <li key={i} className="flex gap-3 text-sm">
                <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-500/20 text-xs font-bold text-amber-700 dark:text-amber-400">
                  ✗
                </span>
                <span className="leading-relaxed text-foreground/90">{m}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {data.criticalNotes && data.criticalNotes.length > 0 && (
        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-5 shadow-md">
          <div className="mb-3 flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-bold text-foreground">Critical Practical Warnings</h3>
          </div>
          <ul className="space-y-2">
            {data.criticalNotes.map((n, i) => (
              <li key={i} className="flex gap-3 text-sm">
                <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-xs font-bold text-emerald-700 dark:text-emerald-400">
                  !
                </span>
                <span className="leading-relaxed text-foreground/90">{n}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
