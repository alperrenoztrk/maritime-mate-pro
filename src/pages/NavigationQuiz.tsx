import { useCallback } from "react";
import { navigationQuestions, getRandomNavigationQuestions } from "@/data/navigationQuestions";
import { QuizShell } from "@/components/tools/QuizShell";

export default function NavigationQuizPage() {
  const pick = useCallback((count: number, seed: number) => {
    return getRandomNavigationQuestions(count, seed);
  }, []);
  return (
    <QuizShell
      title="Navigation Quiz"
      scope="Sailings, compass, tides, celestial, COLREG, buoyage"
      poolSize={navigationQuestions.length}
      pick={pick}
      defaultCount={50}
    />
  );
}
