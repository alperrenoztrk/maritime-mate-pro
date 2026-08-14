import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowRight, BookOpen, CheckCircle2, Heart, RotateCcw, Sparkles, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { LessonTeachCard } from "@/components/lessons/LessonTeachCard";
import { KnowledgeCheck } from "@/components/lessons/KnowledgeCheck";
import { getLessonFlow } from "@/data/lessonFlow";
import type { RecapQuestion } from "@/data/lessonFlow";
import { getBetaTopic, type BetaSection } from "@/data/betaLessons";

/** Fisher-Yates karıştırma. */
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

type FlowItem =
  | { kind: "teach"; section: BetaSection }
  | { kind: "quiz"; question: RecapQuestion };

/**
 * "Exercises" — rehberli ders oturumu (güverte + makine, tüm konular).
 * Akış (lessonFlow) yazılmış konularda Duolingo modu: ÖNCE ANLAT → KARIŞIK SOR,
 * yanlışlar sonda tekrar. Akışı henüz olmayan konularda REHBERLİ OKUMA modu:
 * bölümler sırayla öğretilir (içerik mevcut anlatımdan, read-only).
 */
export default function GuidedLessonSession() {
  const { categoryId, topicTitle } = useParams<{ categoryId: string; topicTitle: string }>();
  const decodedTitle = topicTitle ? decodeURIComponent(topicTitle): "";
  const flow = getLessonFlow(categoryId, decodedTitle);
  const content = getBetaTopic(categoryId, decodedTitle);
  const hasFlow = !!flow;

  // Session elements: teach block by block if flow exists → ask shuffle; Otherwise just teach.
  const mainItems = useMemo<FlowItem[]>(() => {
    if (!content) return [];
    const items: FlowItem[] = [];
    if (flow) {
      const sectionByTitle = new Map(content.sections.map((s) => [s.title, s]));
      const consumedSections = new Set<string>();
      for (const block of flow.blocks) {
        for (const title of block.sectionTitles) {
          const section = sectionByTitle.get(title);
          if (section) {
            items.push({ kind: "teach", section });
            consumedSections.add(section.id ?? section.title);
          }
        }
        const blockQs = shuffle(
          flow.questions.filter((q) => block.sectionTitles.includes(q.sectionRef)),
        );
        for (const question of blockQs) items.push({ kind: "quiz", question });
      }

      // Akış dosyaları yalnız ölçme adımlarını tanımlar. Sonradan konu
      // anlatımına eklenen mevzuat bölümleri (ve akışta adı geçmeyen mevcut
      // bölümler) de alıştırma oturumunda öğretilmeden atlanmamalıdır.
      for (const section of content.sections) {
        if (!consumedSections.has(section.id ?? section.title)) {
          items.push({ kind: "teach", section });
        }
      }
    } else {
      for (const section of content.sections) items.push({ kind: "teach", section });
    }
    return items;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [decodedTitle, categoryId]);

  const [sessionKey, setSessionKey] = useState(0);
  const [pos, setPos] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [answeredTotal, setAnsweredTotal] = useState(0);
  const [wrong, setWrong] = useState<RecapQuestion[]>([]);
  const [repeatItems, setRepeatItems] = useState<FlowItem[] | null>(null);
  const [finished, setFinished] = useState(false);
  const [answeredThisStep, setAnsweredThisStep] = useState(false);

  useEffect(() => setAnsweredThisStep(false), [pos, sessionKey]);

  if (!content || content.sections.length === 0) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background px-6 text-center">
        <p className="text-muted-foreground">The narrative content for this topic has not been prepared yet.</p>
        <Link
          to={`/exercises/${categoryId}/topics`}
          className="text-sm text-primary underline"
        >
          Back to topics
        </Link>
      </div>
    );
  }

  const allItems = repeatItems ? [...mainItems, ...repeatItems] : mainItems;
  const current = allItems[pos];
  const inRepeatPhase = pos >= mainItems.length;
  const progress = allItems.length > 0 ? Math.round(((pos + (answeredThisStep ? 1 : 0)) / allItems.length) * 100) : 0;
  const hearts = Math.max(0, 5 - wrong.length);

  const handleAnswered = (isCorrect: boolean, question: RecapQuestion) => {
    setAnsweredThisStep(true);
    setAnsweredTotal((n) => n + 1);
    if (isCorrect) {
      setCorrect((n) => n + 1);
    } else {
      setWrong((w) => (w.some((q) => q.id === question.id && q.sectionRef === question.sectionRef) ? w : [...w, question]));
    }
  };

  const advance = () => {
    if (pos < allItems.length - 1) {
      setPos((p) => p + 1);
      return;
    }
    if (repeatItems === null && wrong.length > 0) {
      setRepeatItems(shuffle(wrong).map((question) => ({ kind: "quiz", question })));
      setPos(mainItems.length);
    } else {
      setFinished(true);
    }
  };

  const restart = () => {
    setPos(0);
    setCorrect(0);
    setAnsweredTotal(0);
    setWrong([]);
    setRepeatItems(null);
    setFinished(false);
    setAnsweredThisStep(false);
    setSessionKey((k) => k + 1);
  };

  const percent = answeredTotal > 0 ? Math.round((correct / answeredTotal) * 100) : 0;
  const weakSections = Array.from(new Set(wrong.map((q) => q.sectionRef)));
  const isTeachStep = current?.kind === "teach";
  const lastStep = pos === allItems.length - 1 && (repeatItems !== null || wrong.length === 0);

  return (
    <div className="relative min-h-screen bg-background">
      <div className="surface-glass sticky top-0 z-10 border-b px-4 py-3 pt-[max(0.75rem,var(--safe-top))]">
        <div className="mx-auto flex max-w-2xl items-center gap-3">
          {/* Back is global (AppNavBar + edge swipe) — no per-page duplicate. */}

          <Progress value={finished ? 100 : progress} className="h-3 flex-1" />
          {hasFlow ? (
            <span className="flex items-center gap-1 text-sm font-semibold text-rose-500">
              <Heart className="h-4 w-4 fill-rose-500" /> {hearts}
            </span>
          ) : (
            <span className="text-xs font-medium text-muted-foreground">Rehberli Okuma</span>
          )}
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-4 py-6 sm:py-8">
        <p className="mb-4 text-center text-xs font-bold uppercase tracking-[0.2em] text-primary">
          {content.title}
        </p>

        {finished ? (
          <div className="surface-2 rounded-2xl border p-6 text-center shadow-elev-1">
            {hasFlow ? (
              <>
                <Trophy className="mx-auto h-16 w-16 text-amber-500" />
                <h2 className="mt-4 text-2xl font-bold text-foreground">Session Completed!</h2>
                <div className="mt-3 text-5xl font-bold text-primary">%{percent}</div>
                <p className="mt-2 text-sm text-muted-foreground">{correct} / {answeredTotal} doğru</p>
                {weakSections.length > 0 ? (
                  <div className="mt-5 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-left">
                    <p className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-300">
                      You better repeat
                    </p>
                    <ul className="mt-2 space-y-1">
                      {weakSections.map((s) => (
                        <li key={s} className="text-sm text-foreground/85">• {s}</li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <p className="mt-4 text-sm text-emerald-600 dark:text-emerald-400">
                    Great! You got all the questions correct.
                  </p>
                )}
              </>
            ) : (
              <>
                <CheckCircle2 className="mx-auto h-16 w-16 text-emerald-500" />
                <h2 className="mt-4 text-2xl font-bold text-foreground">You have completed the topic!</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  You have read all the chapters. You can ask questions to the AI trainer to reinforce it.
                </p>
              </>
            )}

            <div className="mt-6 flex flex-col gap-2">
              <Button onClick={restart} className="w-full">
                <RotateCcw className="mr-2 h-4 w-4" /> Start Again
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link to={`/exercises/${categoryId}/topics/${encodeURIComponent(decodedTitle)}`}>
                  <Sparkles className="mr-2 h-4 w-4" /> Ask the AI Instructor
                </Link>
              </Button>
            </div>
          </div>
        ) : (
          <div className="surface-2 rounded-2xl border p-5 shadow-elev-1 sm:p-6">
            {inRepeatPhase && (
              <div className="mb-4 flex items-center justify-center gap-1.5 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-center text-xs font-semibold text-amber-700 dark:text-amber-300">
                <RotateCcw className="h-3.5 w-3.5" aria-hidden />
                Tour of reinforcing mistakes
              </div>
            )}

            {isTeachStep && current?.kind === "teach" ? (
              <>
                <LessonTeachCard
                  section={current.section}
                  categoryId={categoryId ?? "navigation"}
                  topicTitle={content.title}
                />
                <Button onClick={advance} className="mt-6 w-full">
                  {lastStep ? "Bitir" : "Got it, continue."} <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </>
            ) : current?.kind === "quiz" ? (
              <>
                <p className="mb-3 text-micro font-bold uppercase tracking-[0.2em] text-primary">
                  Mixed Question
                </p>
                <KnowledgeCheck
                  key={`${sessionKey}-${pos}`}
                  question={current.question}
                  compact
                  onAnswered={(c) => handleAnswered(c, current.question)}
                />
                {answeredThisStep && (
                  <Button onClick={advance} className="mt-5 w-full">
                    {lastStep ? "See Result" : "Continue"} <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}
