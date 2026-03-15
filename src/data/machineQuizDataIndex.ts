// Aggregator for all machine quiz questions
import type { QuizQuestion } from "@/types/quiz";
import { machineQuizQuestions } from "./machineQuizData1";
import { machineQuizQuestions2 } from "./machineQuizData2";
import { machineQuizQuestions3 } from "./machineQuizData3";
import { machineQuizQuestions4 } from "./machineQuizData4";
import { machineQuizQuestions5 } from "./machineQuizData5";

// Merge all quiz data
export const allMachineQuizQuestions: Record<string, QuizQuestion[]> = {
  ...machineQuizQuestions,
  ...machineQuizQuestions2,
  ...machineQuizQuestions3,
  ...machineQuizQuestions4,
  ...machineQuizQuestions5,
};

// Topics not yet expanded to 50 get placeholder from existing inline data
export function getMachineQuizQuestions(topicSlug: string): QuizQuestion[] {
  return allMachineQuizQuestions[topicSlug] || [];
}
