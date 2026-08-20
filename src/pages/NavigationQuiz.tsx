import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ListChecks, Shuffle } from "lucide-react";

import { StabilityQuiz as Quiz } from "@/components/stability/StabilityQuiz";
import { navigationQuestions, getRandomNavigationQuestions } from "@/data/navigationQuestions";

export default function NavigationQuizPage() {
  const [count, setCount] = useState<number>(50);
  const [seed, setSeed] = useState<number>(Date.now());

  const questions = useMemo(() => {
    return getRandomNavigationQuestions(count, seed);
  }, [seed, count]);
  const maxCount = navigationQuestions.length;
  const selectableCounts = useMemo(() => {
    const baseCounts = [10, 25, 50, 100, maxCount];
    const uniqueCounts = Array.from(new Set(baseCounts.filter((n) => n <= maxCount)));
    return uniqueCounts.sort((a, b) => a - b);
  }, [maxCount]);

  return (
    <div className="container mx-auto p-6 space-y-4">
      <div className="flex items-center justify-between">
</div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ListChecks className="h-5 w-5" />
            Navigation Quiz
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <span>Total question pool: {maxCount}</span>
            <span>•</span>
            <span>Displayed: {count} questions</span>
            <span>•</span>
            <span>Mixed basic and applied</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {selectableCounts.map((c) => (
              <Button
                key={c}
                variant={count === c ? "default" : "outline"}
                size="sm"
                onClick={() => setCount(Math.min(c, maxCount))}
              >
                {c} Question
              </Button>
            ))}
            <Button variant="secondary" size="sm" className="gap-2" onClick={() => setSeed(Date.now())}>
              <Shuffle className="h-4 w-4" />
              Remix
            </Button>
          </div>
        </CardContent>
      </Card>

      <Quiz questions={questions} />
    </div>
  );
}

