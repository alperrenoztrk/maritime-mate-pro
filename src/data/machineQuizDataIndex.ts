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
import { machineQuizQuestionsScenario } from "./machineQuizDataScenario";
import { machineQuizQuestionsTopicFill1 } from "./machineQuizDataTopicFill1";
import { machineQuizQuestionsTopicFill2 } from "./machineQuizDataTopicFill2";
import { machineQuizQuestionsTopicFill3 } from "./machineQuizDataTopicFill3";
import { machineQuizQuestionsTopicFill4 } from "./machineQuizDataTopicFill4";
import { machineQuizQuestionsTopicFill5 } from "./machineQuizDataTopicFill5";
import { machineQuizQuestionsTopicFill6 } from "./machineQuizDataTopicFill6";
import { machineQuizQuestionsTopicFill7 } from "./machineQuizDataTopicFill7";
import { machineQuizQuestionsTopicFill8 } from "./machineQuizDataTopicFill8";
import { machineQuizQuestionsTopicFill9 } from "./machineQuizDataTopicFill9";
import { machineQuizQuestionsTopicFill10 } from "./machineQuizDataTopicFill10";
import { machineQuizQuestionsTopicFill11 } from "./machineQuizDataTopicFill11";
import { machineQuizQuestionsTopicFill12 } from "./machineQuizDataTopicFill12";

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

/**
 * Konu başına taban bankadan 50, devam bankasından 100 ve vaka bankasından 4
 * soru gelir (vaka soruları durum verip karar sorduğu için sona eklenir).
 * Konu doldurma bankaları, konu başına en az 8 soru hedefini tutturmak için
 * bunların ardından eklenir; bu yüzden her konunun toplamı 154 veya üzeridir.
 */
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
  machineQuizQuestionsScenario,
  machineQuizQuestionsTopicFill1,
  machineQuizQuestionsTopicFill2,
  machineQuizQuestionsTopicFill3,
  machineQuizQuestionsTopicFill4,
  machineQuizQuestionsTopicFill5,
  machineQuizQuestionsTopicFill6,
  machineQuizQuestionsTopicFill7,
  machineQuizQuestionsTopicFill8,
  machineQuizQuestionsTopicFill9,
  machineQuizQuestionsTopicFill10,
  machineQuizQuestionsTopicFill11,
  machineQuizQuestionsTopicFill12,
);

export function getMachineQuizQuestions(topicSlug: string): QuizQuestion[] {
  return allMachineQuizQuestions[topicSlug] || [];
}
