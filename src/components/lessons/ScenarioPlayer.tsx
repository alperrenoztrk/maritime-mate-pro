import { useState } from "react";
import { AlertTriangle, ArrowRight, CheckCircle2, Flag, RotateCcw, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ChoiceOutcome, Scenario } from "@/data/scenarios";

const OUTCOME_STYLES: Record<
  ChoiceOutcome,
  { border: string; bg: string; text: string; icon: typeof CheckCircle2; label: string }
> = {
  safe: {
    border: "border-emerald-500",
    bg: "bg-emerald-100 dark:bg-emerald-900/30",
    text: "text-emerald-700 dark:text-emerald-300",
    icon: CheckCircle2,
    label: "Güvenli",
  },
  risky: {
    border: "border-amber-500",
    bg: "bg-amber-100 dark:bg-amber-900/30",
    text: "text-amber-700 dark:text-amber-300",
    icon: AlertTriangle,
    label: "Riskli",
  },
  danger: {
    border: "border-red-500",
    bg: "bg-red-100 dark:bg-red-900/30",
    text: "text-red-700 dark:text-red-300",
    icon: ShieldAlert,
    label: "Tehlikeli",
  },
};

/**
 * "Dersler Beta" — dallanan senaryo oynatıcı.
 * Her seçim kilitlenir, outcome rengi + kural atıflı geri bildirim açılır,
 * `next` ile ilerlenir; sonunda debrief gösterilir.
 */
export function ScenarioPlayer({ scenario, onExit }: { scenario: Scenario; onExit?: () => void }) {
  const [stepId, setStepId] = useState(scenario.steps[0]?.id);
  const [picked, setPicked] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);

  const step = scenario.steps.find((s) => s.id === stepId);

  const restart = () => {
    setStepId(scenario.steps[0]?.id);
    setPicked(null);
    setFinished(false);
  };

  const proceed = () => {
    if (picked === null || !step) return;
    const choice = step.choices[picked];
    if (choice.next && scenario.steps.some((s) => s.id === choice.next)) {
      setStepId(choice.next);
      setPicked(null);
    } else {
      setFinished(true);
    }
  };

  if (finished || !step) {
    return (
      <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-6 shadow-md">
        <div className="flex items-center gap-2">
          <Flag className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
          <h3 className="text-lg font-bold text-foreground">Vaka Değerlendirmesi (Debrief)</h3>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-foreground/90">{scenario.debrief}</p>
        <div className="mt-5 flex flex-col gap-2 sm:flex-row">
          <Button onClick={restart} variant="outline" className="flex-1">
            <RotateCcw className="mr-2 h-4 w-4" /> Tekrar Oyna
          </Button>
          {onExit && (
            <Button onClick={onExit} className="flex-1">
              Diğer Senaryolar
            </Button>
          )}
        </div>
      </div>
    );
  }

  const pickedChoice = picked !== null ? step.choices[picked] : null;
  const answered = picked !== null;

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-border/40 bg-card/70 p-4">
        <p className="text-sm leading-relaxed text-foreground/90">{step.situation}</p>
      </div>

      {step.image && (
        <div className="mx-auto max-w-md overflow-hidden rounded-xl border border-border/40">
          <img src={step.image} alt={step.question} className="h-44 w-full bg-muted/30 object-contain" loading="lazy" />
        </div>
      )}

      <p className="text-base font-semibold text-foreground">{step.question}</p>

      <div className="space-y-2.5">
        {step.choices.map((choice, index) => {
          const isPicked = index === picked;
          const style = OUTCOME_STYLES[choice.outcome];
          return (
            <button
              key={index}
              type="button"
              onClick={() => !answered && setPicked(index)}
              disabled={answered}
              className={`w-full rounded-xl p-3.5 text-left transition-all ${
                answered
                  ? isPicked
                    ? `border-2 ${style.border} ${style.bg}`
                    : "border border-border bg-muted/40 opacity-60"
                  : "border border-border bg-card/70 hover:border-primary/40 hover:bg-muted"
              }`}
            >
              <span className="text-sm text-foreground">{choice.text}</span>
            </button>
          );
        })}
      </div>

      {answered && pickedChoice && (
        <div className={`rounded-xl border ${OUTCOME_STYLES[pickedChoice.outcome].border}/40 bg-card/80 p-4`}>
          <div className="mb-1.5 flex items-center gap-2">
            {(() => {
              const S = OUTCOME_STYLES[pickedChoice.outcome];
              const Icon = S.icon;
              return (
                <>
                  <Icon className={`h-4 w-4 ${S.text}`} />
                  <span className={`text-xs font-bold uppercase tracking-wider ${S.text}`}>{S.label}</span>
                </>
              );
            })()}
          </div>
          <p className="text-sm leading-relaxed text-foreground/90">{pickedChoice.feedback}</p>
          {pickedChoice.source && (
            <p className="mt-2 text-xs font-medium text-muted-foreground">
              📖 {pickedChoice.source.code}
              {pickedChoice.source.detail ? ` — ${pickedChoice.source.detail}` : ""}
            </p>
          )}
          <Button onClick={proceed} className="mt-4 w-full">
            Devam <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
