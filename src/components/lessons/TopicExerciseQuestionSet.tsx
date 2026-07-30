import { useEffect, useMemo, useState } from "react";
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
  const questionSignature = useMemo(
    () => questions.map((question) => question.id).join("-"),
    [questions],
  );
  const [order, setOrder] = useState<QuizQuestion[]>(() => shuffle(questions));
  const [current, setCurrent] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);
  const [run, setRun] = useState(0);

  useEffect(() => {
    setOrder(shuffle(questions));
    setCurrent(0);
    setAnswered(false);
    setCorrectCount(0);
    setFinished(false);
    setRun((value) => value + 1);
  }, [questionSignature, questions]);

  if (questions.length === 0) return null;

  const question = order[current];
  const percentage = Math.round((correctCount / order.length) * 100);

  const handleAnswered = (correct: boolean) => {
    if (answered) return;
    setAnswered(true);
    if (correct) setCorrectCount((value) => value + 1);
  };

  const next = () => {
    if (current >= order.length - 1) {
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
      id="konu-sorulari"
      className="scroll-mt-24 rounded-2xl border border-violet-500/25 bg-violet-500/5 p-4 sm:p-6"
    >
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 text-white shadow">
          <ListChecks className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="font-bold text-foreground">Konu Alıştırmaları</h2>
          <p className="text-xs text-muted-foreground">
            {questions.length} soru bu konuyla eşleştirildi
          </p>
        </div>
      </div>

      {finished ? (
        <div className="space-y-5 rounded-2xl border border-border/50 bg-card/80 p-5 text-center">
          <Trophy className="mx-auto h-14 w-14 text-amber-500" />
          <div>
            <p className="text-3xl font-bold text-primary">%{percentage}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {correctCount} / {order.length} doğru cevap
            </p>
          </div>
          <Button onClick={restart} className="w-full sm:w-auto">
            <RotateCcw className="mr-2 h-4 w-4" />
            Soruları Yeniden Çöz
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>
              Soru {current + 1} / {order.length}
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
              {current < order.length - 1 ? "Sonraki Soru" : "Sonucu Gör"}
              <CheckCircle className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      )}
    </section>
  );
}
