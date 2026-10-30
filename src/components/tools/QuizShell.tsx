import { useMemo, useState } from "react";
import { ListChecks, Shuffle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StabilityQuiz as Quiz } from "@/components/stability/StabilityQuiz";
import type { QuizQuestion } from "@/types/quiz";
import { ToolPage, ToolSection } from "./ToolKit";

/** Shared page for the topic quizzes: question count, reshuffle and the quiz itself. */
export function QuizShell({
  title,
  scope,
  poolSize,
  pick,
  defaultCount = 25,
}: {
  title: string;
  /** Short list of what the question bank covers. */
  scope?: string;
  poolSize: number;
  pick: (count: number, seed: number) => QuizQuestion[];
  defaultCount?: number;
}) {
  const [count, setCount] = useState(Math.min(defaultCount, poolSize));
  const [seed, setSeed] = useState(() => Date.now());
  const questions = useMemo(() => pick(count, seed), [pick, count, seed]);
  const counts = useMemo(
    () => Array.from(new Set([10, 25, 50, 100, poolSize].filter((n) => n <= poolSize))).sort((a, b) => a - b),
    [poolSize],
  );

  return (
    <ToolPage title={title} icon={ListChecks}>
      <ToolSection title="Question set" icon={ListChecks} description={`${poolSize} questions in the bank${scope ? ` · ${scope}` : ""}`}>
        <div className="flex flex-wrap gap-2">
          {counts.map((c) => (
            <Button key={c} variant={count === c ? "default" : "outline"} size="sm" onClick={() => setCount(c)} aria-pressed={count === c}>
              {c === poolSize ? `All (${c})` : `${c} questions`}
            </Button>
          ))}
          <Button variant="secondary" size="sm" className="gap-2" onClick={() => setSeed(Date.now())}>
            <Shuffle className="h-4 w-4" /> New set
          </Button>
        </div>
      </ToolSection>
      <Quiz questions={questions} />
    </ToolPage>
  );
}
