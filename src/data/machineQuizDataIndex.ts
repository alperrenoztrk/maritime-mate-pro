// Aggregator for all machine quiz questions
import type { QuizQuestion } from "@/types/quiz";
import { machineQuizQuestions } from "./machineQuizData1";
import { machineQuizQuestions2 } from "./machineQuizData2";
import { machineQuizQuestions3 } from "./machineQuizData3";
import { machineQuizQuestions4 } from "./machineQuizData4";
import { machineQuizQuestions5 } from "./machineQuizData5";
import { machineQuizQuestionsExt1 } from "./machineQuizDataExt1";
import { machineQuizQuestionsExt2 } from "./machineQuizDataExt2";
import { machineQuizQuestionsExt3 } from "./machineQuizDataExt3";
import { machineQuizQuestionsExt4 } from "./machineQuizDataExt4";
import { machineQuizQuestionsExt5 } from "./machineQuizDataExt5";

/**
 * Aynı konu slug'ı hem taban hem devam bankasında bulunduğundan sığ spread
 * (`{...a, ...b}`) kullanılamaz; ikinci nesne birincisini tamamen ezerdi.
 * Bu yüzden diziler slug bazında birleştirilir.
 */
const mergeBanks = (
  ...banks: Record<string, QuizQuestion[]>[]
): Record<string, QuizQuestion[]> => {
  const merged: Record<string, QuizQuestion[]> = {};

  for (const bank of banks) {
    for (const [slug, questions] of Object.entries(bank)) {
      merged[slug] = [...(merged[slug] ?? []), ...questions];
    }
  }

  return merged;
};

/** Her konu için 150 soru: taban bankadan 50, devam bankasından 100. */
export const allMachineQuizQuestions: Record<string, QuizQuestion[]> = mergeBanks(
  machineQuizQuestions,
  machineQuizQuestions2,
  machineQuizQuestions3,
  machineQuizQuestions4,
  machineQuizQuestions5,
  machineQuizQuestionsExt1,
  machineQuizQuestionsExt2,
  machineQuizQuestionsExt3,
  machineQuizQuestionsExt4,
  machineQuizQuestionsExt5,
);

export function getMachineQuizQuestions(topicSlug: string): QuizQuestion[] {
  return allMachineQuizQuestions[topicSlug] || [];
}
