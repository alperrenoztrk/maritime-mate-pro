import { useCallback } from "react";
import { economicsQuestions } from "@/data/economicsQuestions";
import { createSeededRng, pickRandomUnique } from "@/utils/random";
import { QuizShell } from "@/components/tools/QuizShell";

export default function EconomicsQuizPage() {
  const pick = useCallback((count: number, seed: number) => {
    const rng = createSeededRng(seed);
    return pickRandomUnique(economicsQuestions, count, rng);
  }, []);
  return (
    <QuizShell
      title="Maritime Economics Quiz"
      scope="Charter, TCE, laytime/demurrage, voyage economy"
      poolSize={economicsQuestions.length}
      pick={pick}
      defaultCount={25}
    />
  );
}
