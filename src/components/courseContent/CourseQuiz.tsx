import { useState } from "react";
import { Link } from "react-router-dom";
import type { LucideIcon } from "lucide-react";
import { CheckCircle, RotateCcw, Trophy, XCircle } from "lucide-react";
import { hapticNotify } from "@/lib/haptics";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CourseSectionTabs } from "@/components/curriculum/CourseSectionTabs";
import { toast } from "sonner";
import type { QuizQuestion } from "@/types/quiz";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function CourseQuiz({
  title,
  icon: Icon,
  accent,
  questions,
  courseKey,
  group,
}: {
  title: string;
  icon: LucideIcon;
  accent: string;
  questions: QuizQuestion[];
  courseKey?: string;
  group?: "deck" | "machine";
}) {
  const [order, setOrder] = useState<QuizQuestion[]>(() => shuffle(questions));
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [correct, setCorrect] = useState(0);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [finished, setFinished] = useState(false);

  const question = order[current];

  const handleAnswer = (idx: number) => {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    setAnsweredCount((count) => count + 1);
    if (idx === question.correctAnswer) {
      setCorrect((count) => count + 1);
      hapticNotify("success");
      toast.success("TRUE!");
    } else {
      hapticNotify("error");
      toast.error("Wrong!");
    }
  };

  const next = () => {
    if (current < order.length - 1) {
      setCurrent((index) => index + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      setFinished(true);
    }
  };

  const finishNow = () => setFinished(true);

  const restart = () => {
    setOrder(shuffle(questions));
    setCurrent(0);
    setSelected(null);
    setAnswered(false);
    setCorrect(0);
    setAnsweredCount(0);
    setFinished(false);
  };

  const percent = answeredCount > 0 ? Math.round((correct / answeredCount) * 100) : 0;
  const libraryHref = group ? `/lessons?library=${group}` : "/lessons";

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 dark:from-[hsl(220,50%,6%)] dark:via-[hsl(220,50%,8%)] dark:to-[hsl(220,50%,10%)]">
      <div className="relative z-10 mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-12">
        <header className="mb-6 space-y-4">
          {/* Back is global (AppNavBar + edge swipe) — no per-page duplicate. */}


          <div className="flex items-center gap-3">
            <div
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${accent} text-white shadow-lg`}
            >
              <Icon className="h-5 w-5" />
            </div>
            <h1 className="text-xl font-bold leading-tight text-foreground">{title}</h1>
          </div>

          {courseKey && group && (
            <CourseSectionTabs group={group} courseKey={courseKey} active="quiz" />
          )}
        </header>

        {!finished ? (
          <Card className="border-border/60 bg-card/85">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Question</CardTitle>
                <span className="text-sm text-muted-foreground">Skor: %{percent}</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-lg font-medium text-foreground">{question.question}</p>

              <div className="space-y-3">
                {question.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    disabled={answered}
                    className={`w-full rounded-xl p-4 text-left transition-[background-color,color,border-color,box-shadow,opacity,transform,width] ${
                      answered
                        ? index === question.correctAnswer
                          ? "border-2 border-emerald-500 bg-emerald-100 dark:bg-emerald-900/30"
                          : index === selected
                            ? "border-2 border-red-500 bg-red-100 dark:bg-red-900/30"
                            : "border border-border bg-muted/50"
                        : "border border-border bg-muted/50 hover:border-primary/40 hover:bg-muted"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {answered && index === question.correctAnswer && (
                        <CheckCircle className="h-5 w-5 flex-shrink-0 text-emerald-600" />
                      )}
                      {answered && index === selected && index !== question.correctAnswer && (
                        <XCircle className="h-5 w-5 flex-shrink-0 text-red-600" />
                      )}
                      <span className="text-foreground">{option}</span>
                    </div>
                  </button>
                ))}
              </div>

              {answered && (
                <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-900/20">
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    <strong>Description:</strong> {question.explanation}
                  </p>
                </div>
              )}

              <div className="flex flex-col gap-2 sm:flex-row">
                {answered && (
                  <Button onClick={next} className="flex-1">
                    {current < order.length - 1 ? "Next Question" : "See Result"}
                  </Button>
                )}
                <Button onClick={finishNow} variant="outline" className="flex-1">
                  Complete Exercise
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="border-border/60 bg-card/85 text-center">
            <CardContent className="space-y-6 pb-8 pt-8">
              <Trophy className="mx-auto h-16 w-16 text-amber-500" />
              <h2 className="text-2xl font-bold text-foreground">Exercise Completed</h2>
              <div className="text-5xl font-bold text-primary">%{percent}</div>
              <p className="text-sm text-muted-foreground">Doğru cevap: {correct}</p>
              <p className="text-sm text-muted-foreground">
                {percent >= 80
                  ? "Perfect! You are an expert on this subject."
                  : percent >= 60
                    ? "Good morning my baby! With a little more work you can become perfect."
                    : "It is recommended that you study more."}
              </p>
              <Button onClick={restart} className="w-full">
                <RotateCcw className="mr-2 h-4 w-4" /> Try Again
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
