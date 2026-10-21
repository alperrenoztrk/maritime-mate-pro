import type { QuizQuestion } from "@/types/quiz";

/** Shuffle positions without changing the answer, including duplicate labels. */
export function shuffleAnswerOptions<T extends QuizQuestion>(question: T, random = Math.random): T {
  const indices = question.options.map((_, index) => index);
  for (let index = indices.length - 1; index > 0; index--) {
    const target = Math.floor(random() * (index + 1));
    [indices[index], indices[target]] = [indices[target], indices[index]];
  }
  return { ...question, options: indices.map((index) => question.options[index]), correctAnswer: indices.indexOf(question.correctAnswer) };
}
