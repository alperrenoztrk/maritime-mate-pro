import { useCallback } from "react";
import { machineQuestions, getRandomMachineQuestions } from "@/data/machineQuestions";
import { QuizShell } from "@/components/tools/QuizShell";

export default function MachineQuizPage() {
  const pick = useCallback((count: number, seed: number) => {
    return getRandomMachineQuestions(count, seed);
  }, []);
  return (
    <QuizShell
      title="Machine Quiz"
      scope="Main engine, auxiliary systems, safety"
      poolSize={machineQuestions.length}
      pick={pick}
      defaultCount={25}
    />
  );
}
