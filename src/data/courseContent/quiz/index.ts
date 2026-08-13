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
 * Unified quiz registry. Deck topics come from their own question banks;
 * machine topics come from the 2400-question bank (keyed by slug, 150 per topic).
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
