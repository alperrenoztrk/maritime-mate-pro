// Aggregator for all machine quiz questions
import type { QuizQuestion } from "@/types/quiz";
import { machineQuizQuestions } from "./machineQuizData1";
import { machineQuizQuestions2 } from "./machineQuizData2";

// Merge all quiz data — topics from data2 override/supplement data1
export const allMachineQuizQuestions: Record<string, QuizQuestion[]> = {
  ...machineQuizQuestions,
  ...machineQuizQuestions2,
};

// Topics not yet expanded to 50 get placeholder from existing inline data
export function getMachineQuizQuestions(topicSlug: string): QuizQuestion[] {
  return allMachineQuizQuestions[topicSlug] || [];
}
