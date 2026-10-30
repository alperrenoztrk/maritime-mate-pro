import { useCallback } from "react";
import { safetyQuestions } from "@/data/safetyQuestions";
import { createSeededRng, pickRandomUnique } from "@/utils/random";
import { QuizShell } from "@/components/tools/QuizShell";

export default function SafetyQuizPage() {
  const pick = useCallback((count: number, seed: number) => {
    const rng = createSeededRng(seed);
    return pickRandomUnique(safetyQuestions, count, rng);
  }, []);
  return (
    <QuizShell
      title="Safety Quiz"
      scope="SOLAS, FFA/LSA, PTW, SMS"
      poolSize={safetyQuestions.length}
      pick={pick}
      defaultCount={25}
    />
  );
}
