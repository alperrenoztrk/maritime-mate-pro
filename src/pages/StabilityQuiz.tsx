import { useCallback } from "react";
import { stabilityQuestions, getRandomQuestions } from "@/data/stabilityQuestions";
import { QuizShell } from "@/components/tools/QuizShell";

export default function StabilityQuizPage() {
  const pick = useCallback((count: number, seed: number) => {
    return getRandomQuestions(count, seed);
  }, []);
  return (
    <QuizShell
      title="Stability Quiz"
      scope="Theory and calculations"
      poolSize={stabilityQuestions.length}
      pick={pick}
      defaultCount={50}
    />
  );
}
