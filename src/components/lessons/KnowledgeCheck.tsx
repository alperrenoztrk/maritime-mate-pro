import { useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";
import type { QuizQuestion } from "@/types/quiz";
import { hapticNotify } from "@/lib/haptics";

/**
 * Tek-soruluk bilgi kontrolü (mini quiz).
 *
 * Hem beta detay sayfasında bölüm-arası, hem de `GuidedLessonSession` içinde
 * Duolingo "quiz" adımı olarak kullanılır. `CourseQuiz`'in tek-soru hâlidir.
 * `onAnswered(correct)` ile dış akışa sonucu bildirir.
 */
export function KnowledgeCheck({
  question,
  onAnswered,
  compact = false,
}: {
  question: QuizQuestion;
  onAnswered?: (correct: boolean) => void;
  compact?: boolean;
}) {
  const [selected, setSelected] = useState<number | null>(null);
  const answered = selected !== null;

  const handleAnswer = (idx: number) => {
    if (answered) return;
    const correct = idx === question.correctAnswer;
    setSelected(idx);
    // Grading is the moment the answer lands — iOS marks it with a
    // notification haptic, not a plain tap.
    hapticNotify(correct ? "success" : "error");
    onAnswered?.(correct);
  };

  return (
    <div
      className={
        compact
          ? "space-y-4"
          : "rounded-2xl border border-primary/20 bg-primary/5 p-4 sm:p-5"
      }
    >
      {!compact && (
        <p className="text-micro font-bold uppercase tracking-[0.2em] text-primary">
          Information Control
        </p>
      )}
      <p className="text-base font-medium text-foreground">{question.question}</p>

      <div className="space-y-2.5">
        {question.options.map((option, index) => {
          const isCorrect = index === question.correctAnswer;
          const isSelected = index === selected;
          return (
            <button
              key={index}
              type="button"
              onClick={() => handleAnswer(index)}
              disabled={answered}
              className={`w-full rounded-xl p-3.5 text-left transition-[background-color,color,border-color,box-shadow,opacity,transform,width] ${
                answered
                  ? isCorrect
                    ? "border-2 border-emerald-500 bg-emerald-100 dark:bg-emerald-900/30"
                    : isSelected
                    ? "border-2 border-red-500 bg-red-100 dark:bg-red-900/30"
                    : "border border-border bg-muted/50"
                  : "border border-border bg-card/70 hover:border-primary/40 hover:bg-muted"
              }`}
            >
              <div className="flex items-center gap-3">
                {answered && isCorrect && (
                  <CheckCircle className="h-5 w-5 flex-shrink-0 text-emerald-600" />
                )}
                {answered && isSelected && !isCorrect && (
                  <XCircle className="h-5 w-5 flex-shrink-0 text-red-600" />
                )}
                <span className="text-sm text-foreground">{option}</span>
              </div>
            </button>
          );
        })}
      </div>

      {answered && (
        <div className="rounded-xl border border-blue-200 bg-blue-50 p-3.5 dark:border-blue-800 dark:bg-blue-900/20">
          <p className="text-sm text-blue-700 dark:text-blue-300">
            <strong>Description:</strong> {question.explanation}
          </p>
        </div>
      )}
    </div>
  );
}
