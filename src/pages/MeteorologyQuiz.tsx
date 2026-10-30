import { useCallback } from "react";
import { meteorologyQuestions } from "@/data/meteorologyQuestions";
import { createSeededRng, pickRandomUnique } from "@/utils/random";
import { QuizShell } from "@/components/tools/QuizShell";

export default function MeteorologyQuizPage() {
  const pick = useCallback((count: number, seed: number) => {
    const rng = createSeededRng(seed);
    return pickRandomUnique(meteorologyQuestions, count, rng);
  }, []);
  return (
    <QuizShell
      title="Meteorology Quiz"
      scope="Beaufort scale, clouds, fronts, storm avoidance"
      poolSize={meteorologyQuestions.length}
      pick={pick}
      defaultCount={25}
    />
  );
}
