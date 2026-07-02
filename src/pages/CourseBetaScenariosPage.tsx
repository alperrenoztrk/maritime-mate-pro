import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ChevronRight, Ship, Target } from "lucide-react";
import { getScenariosByTopic, type Scenario } from "@/data/scenarios";
import { ScenarioPlayer } from "@/components/lessons/ScenarioPlayer";

const LEVEL_LABEL: Record<Scenario["level"], string> = {
  cadet: "Stajyer",
  officer: "Zabit",
};

/**
 * "Alıştırmalar" — senaryo liste + oynatıcı sayfası.
 * Kategorinin (pilot: Seyir) vardiya/COLREG vakalarını listeler.
 */
export default function CourseBetaScenariosPage() {
  const { topicKey } = useParams<{ topicKey: string }>();
  const scenarios = getScenariosByTopic(topicKey);
  const [active, setActive] = useState<Scenario | null>(null);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-violet-50 via-indigo-50 to-blue-50 px-4 py-8 dark:from-[hsl(265,45%,7%)] dark:via-[hsl(245,45%,8%)] dark:to-[hsl(220,50%,10%)]">
      <div className="mx-auto flex max-w-2xl flex-col gap-6">
        <Link
          to={`/exercises/${topicKey}/topics`}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Konulara Dön
        </Link>

        <header className="space-y-2 text-center">
          <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-500 to-orange-500 text-white shadow-lg">
            <Ship className="h-6 w-6" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Vardiya Senaryoları</h1>
        </header>

        {active ? (
          <div className="space-y-4">
            <div className="rounded-2xl border border-border/60 bg-card/85 p-5 shadow-md backdrop-blur">
              <div className="mb-2 flex items-center gap-2">
                <span className="rounded-full bg-rose-500/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-rose-600 dark:text-rose-300">
                  {LEVEL_LABEL[active.level]}
                </span>
                <h2 className="text-lg font-bold text-foreground">{active.title}</h2>
              </div>
              <p className="text-sm leading-relaxed text-foreground/90">{active.briefing}</p>
              {active.learningGoals.length > 0 && (
                <div className="mt-3 rounded-xl border border-border/40 bg-background/60 p-3">
                  <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    <Target className="h-3.5 w-3.5" /> Öğrenme Hedefleri
                  </p>
                  <ul className="mt-1.5 space-y-1">
                    {active.learningGoals.map((g, i) => (
                      <li key={i} className="text-xs text-foreground/80">• {g}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <ScenarioPlayer scenario={active} onExit={() => setActive(null)} />
          </div>
        ) : scenarios.length > 0 ? (
          <div className="flex flex-col gap-3">
            {scenarios.map((scenario) => (
              <button
                key={scenario.id}
                type="button"
                onClick={() => setActive(scenario)}
                className="group flex items-center gap-3 rounded-2xl border border-border/60 bg-card/85 p-4 text-left shadow-sm backdrop-blur transition hover:border-rose-400/50 hover:bg-card"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-rose-500/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-rose-600 dark:text-rose-300">
                      {LEVEL_LABEL[scenario.level]}
                    </span>
                    <span className="font-bold text-foreground">{scenario.title}</span>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
              </button>
            ))}
          </div>
        ) : (
          <p className="text-center text-sm text-muted-foreground">
            Bu konu için senaryo henüz eklenmedi.
          </p>
        )}
      </div>
    </div>
  );
}
