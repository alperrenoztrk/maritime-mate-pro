import { useCallback } from "react";
import { cargoQuestions } from "@/data/cargoQuestions";
import { createSeededRng, pickRandomUnique } from "@/utils/random";
import { QuizShell } from "@/components/tools/QuizShell";

export default function CargoQuizPage() {
  const pick = useCallback((count: number, seed: number) => {
    const rng = createSeededRng(seed);
    return pickRandomUnique(cargoQuestions, count, rng);
  }, []);
  return (
    <QuizShell
      title="Cargo Handling and Stowage Quiz"
      scope="Draft survey, IMSBC, IMDG, grain"
      poolSize={cargoQuestions.length}
      pick={pick}
      defaultCount={25}
    />
  );
}
