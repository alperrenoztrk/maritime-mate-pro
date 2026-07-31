import type { QuizQuestion } from "@/types/quiz";
import { getMachineQuizQuestions } from "@/data/machineQuizDataIndex";
import { stabilityQuestions } from "@/data/stabilityQuestions";
import { navigationQuestions } from "@/data/navigationQuestions";
import { safetyQuestions } from "@/data/safetyQuestions";
import { cargoQuestions } from "@/data/cargoQuestions";
import { meteorologyQuestions } from "@/data/meteorologyQuestions";
import { seamanshipQuestions } from "@/data/seamanshipQuestions";
import { environmentQuestions } from "@/data/environmentQuestions";
import { communicationQuestions } from "@/data/communicationQuestions";
import { economicsQuestions } from "@/data/economicsQuestions";

/**
 * Birleşik quiz registry'si. Güverte konuları kendi soru bankalarından;
 * makine konuları 2400'lük bankadan (slug anahtarlı, 150/konu) gelir.
 */
const deckQuiz: Record<string, QuizQuestion[]> = {
  stability: stabilityQuestions,
  navigation: navigationQuestions,
  safety: safetyQuestions,
  cargo: cargoQuestions,
  meteorology: meteorologyQuestions,
  seamanship: seamanshipQuestions,
  environment: environmentQuestions,
  communication: communicationQuestions,
  economics: economicsQuestions,
};

export function getTopicQuiz(key?: string): QuizQuestion[] {
  if (!key) return [];
  if (deckQuiz[key]) return deckQuiz[key];
  return getMachineQuizQuestions(key);
}

export function hasTopicQuiz(key?: string): boolean {
  return getTopicQuiz(key).length > 0;
}
