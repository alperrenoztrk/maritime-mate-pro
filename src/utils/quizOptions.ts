import type { QuizQuestion } from "@/types/quiz";
import { shuffleArray, type Rng } from "@/utils/random";

/**
 * Şık sırası karıştırma.
 *
 * Soru bankalarında doğru cevap belirli bir şıkta toplanabiliyor — rehberli ders
 * (beta) havuzlarında doğru cevap soruların %97-100'ünde ilk şıktı. Şıklar veri
 * dosyasındaki sırayla gösterildiği sürece bu, bilgi gerektirmeyen bir ipucudur
 * ("her zaman A'yı seç"). Karıştırma sunum katmanında yapılır; böylece kural
 * bütün havuzlar için tek yerde ve geçmiş içerik düzeltilmeden geçerli olur.
 */

/** Karıştırılmış şıklarla sunulan soru. */
export interface ShuffledQuestion extends QuizQuestion {
  /** `sourceOrder[i]` = i. gösterilen şıkkın veri dosyasındaki indeksi. */
  sourceOrder: number[];
}

/**
 * Şıkları karıştırır ve `correctAnswer`'ı yeni sıraya taşır. Dönen nesne kendi
 * içinde tutarlıdır: puanlama, "doğru cevap" gösterimi ve seçim karşılaştırması
 * hep gösterilen sırayı kullanır.
 */
export const shuffleOptions = (question: QuizQuestion, rng: Rng = Math.random): ShuffledQuestion => {
  const sourceOrder = shuffleArray(
    question.options.map((_, index) => index),
    rng,
  );

  return {
    ...question,
    options: sourceOrder.map((index) => question.options[index]),
    correctAnswer: sourceOrder.indexOf(question.correctAnswer),
    sourceOrder,
  };
};

export const shuffleOptionsAll = (
  questions: QuizQuestion[],
  rng: Rng = Math.random,
): ShuffledQuestion[] => questions.map((question) => shuffleOptions(question, rng));

/**
 * Gösterilen şık indekslerini veri dosyasındaki indekslere çevirir.
 *
 * Quiz sonuçları (`quiz_results.question_results`) kaynak indeksle saklanır;
 * kayıt ve istatistikler karıştırmadan etkilenmemelidir.
 */
export const toSourceAnswers = (
  questions: ShuffledQuestion[],
  answers: Record<number, number>,
): Record<number, number> => {
  const bySourceIndex: Record<number, number> = {};

  for (const question of questions) {
    const shown = answers[question.id];
    if (shown === undefined) continue;
    bySourceIndex[question.id] = question.sourceOrder[shown] ?? shown;
  }

  return bySourceIndex;
};
