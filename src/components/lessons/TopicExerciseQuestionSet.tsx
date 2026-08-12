import { useState } from "react";
import { CheckCircle, ListChecks, RotateCcw, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { KnowledgeCheck } from "@/components/lessons/KnowledgeCheck";
import type { QuizQuestion } from "@/types/quiz";

const shuffle = <T,>(items: T[]) => {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const target = Math.floor(Math.random() * (index + 1));
    [result[index], result[target]] = [result[target], result[index]];
  }
  return result;
};

export function TopicExerciseQuestionSet({
  questions,
}: {
  questions: QuizQuestion[];
}) {
  const [order, setOrder] = useState<QuizQuestion[]>(() => shuffle(questions));
  const [current, setCurrent] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);
  const [run, setRun] = useState(0);

  if (questions.length === 0) return null;

  const question = order[current] ?? questions[0];
  const questionCount = order.length || questions.length;
  const percentage = Math.round((correctCount / questionCount) * 100);

  const handleAnswered = (correct: boolean) => {
    if (answered) return;
    setAnswered(true);
    if (correct) setCorrectCount((value) => value + 1);
  };

  const next = () => {
    if (current >= questionCount - 1) {
      setFinished(true);
      return;
    }
    setCurrent((value) => value + 1);
    setAnswered(false);
  };

  const restart = () => {
    setOrder(shuffle(questions));
    setCurrent(0);
    setAnswered(false);
    setCorrectCount(0);
    setFinished(false);
    setRun((value) => value + 1);
  };

  return (
    <section
      id="topic-questions"
      className="scroll-mt-24 rounded-2xl border border-violet-500/25 bg-violet-500/5 p-4 sm:p-6"
    >
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 text-white shadow">
          <ListChecks className="h-5 w-5" />
        </div>
        <h2 className="min-w-0 flex-1 font-bold text-foreground">Topic Exercises</h2>
        <span className="rounded-full bg-violet-500/15 px-2.5 py-1 text-xs font-semibold text-violet-700 dark:text-violet-300">
          {questions.length} soru
        </span>
      </div>

      {finished ? (
        <div className="space-y-5 rounded-2xl border border-border/50 bg-card/80 p-5 text-center">
          <Trophy className="mx-auto h-14 w-14 text-amber-500" />
          <div>
            <p className="text-3xl font-bold text-primary">%{percentage}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {correctCount} / {questionCount} doğru cevap
            </p>
          </div>
          <Button onClick={restart} className="w-full sm:w-auto">
            <RotateCcw className="mr-2 h-4 w-4" />
            Solve the Questions Again
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>
              Soru {current + 1} / {questionCount}
            </span>
            <span>{question.category}</span>
          </div>

          <KnowledgeCheck
            key={`${run}-${current}-${question.id}`}
            question={question}
            onAnswered={handleAnswered}
          />

          {answered && (
            <Button onClick={next} className="w-full">
              {current < questionCount - 1 ? "Next Question" : "See Result"}
              <CheckCircle className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      )}
    </section>
  );
}
