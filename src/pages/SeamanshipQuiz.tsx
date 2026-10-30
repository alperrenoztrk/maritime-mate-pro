import { useCallback } from "react";
import { seamanshipQuestions } from "@/data/seamanshipQuestions";
import { createSeededRng, pickRandomUnique } from "@/utils/random";
import { QuizShell } from "@/components/tools/QuizShell";

export default function SeamanshipQuizPage() {
  const pick = useCallback((count: number, seed: number) => {
    const rng = createSeededRng(seed);
    return pickRandomUnique(seamanshipQuestions, count, rng);
  }, []);
  return (
    <QuizShell
      title="Seamanship Quiz"
      scope="Mooring, knots, SMS"
      poolSize={seamanshipQuestions.length}
      pick={pick}
      defaultCount={25}
    />
  );
}
