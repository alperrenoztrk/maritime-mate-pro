import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { machineTopicBySlug } from "@/data/machineTopicData";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ListChecks, Shuffle } from "lucide-react";
import { StabilityQuiz as Quiz } from "@/components/stability/StabilityQuiz";
import { getMachineQuizQuestions } from "@/data/machineQuizDataIndex";
import { createSeededRng, pickRandomUnique } from "@/utils/random";

export default function MachineTopicQuizPage() {
  const { topicSlug } = useParams<{ topicSlug: string }>();
  const topic = topicSlug ? machineTopicBySlug[topicSlug] : null;
  const allQuestions = useMemo(
    () => (topicSlug ? getMachineQuizQuestions(topicSlug) : []),
    [topicSlug],
  );
  const maxCount = allQuestions.length;

  const [count, setCount] = useState<number>(25);
  const [seed, setSeed] = useState<number>(Date.now());

  const questions = useMemo(
    () => pickRandomUnique(allQuestions, count, createSeededRng(seed)),
    [allQuestions, count, seed],
  );

  if (!topic || maxCount === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-muted-foreground">Quiz bulunamadı</p>
      </div>
    );
  }

  const selectableCounts = Array.from(
    new Set([10, 25, 50, 100, maxCount].filter((n) => n <= maxCount)),
  ).sort((a, b) => a - b);

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 dark:from-[hsl(220,50%,6%)] dark:via-[hsl(220,50%,8%)] dark:to-[hsl(220,50%,10%)]">
      <div className="container mx-auto p-4 space-y-4 max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ListChecks className="h-5 w-5" />
              {topic.title} Quiz
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              <span>Toplam soru: {maxCount}</span>
              <span>•</span>
              <span>Görüntülenen: {count}</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {selectableCounts.map((c) => (
                <Button key={c} variant={count === c ? "default" : "outline"} size="sm" onClick={() => { setCount(c); setSeed(Date.now()); }}>
                  {c === maxCount ? `Tümü (${c})` : `${c} Soru`}
                </Button>
              ))}
              <Button variant="ghost" size="sm" className="gap-1" onClick={() => setSeed(Date.now())}>
                <Shuffle className="h-4 w-4" /> Karıştır
              </Button>
            </div>

            <Quiz questions={questions} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
