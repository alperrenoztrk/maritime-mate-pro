import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle2, Heart, RotateCcw, Sparkles, Trophy } from "lucide-react";
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
 * "Alıştırmalar" — rehberli ders oturumu (güverte + makine, tüm konular).
 * Akış (lessonFlow) yazılmış konularda Duolingo modu: ÖNCE ANLAT → KARIŞIK SOR,
 * yanlışlar sonda tekrar. Akışı henüz olmayan konularda REHBERLİ OKUMA modu:
 * bölümler sırayla öğretilir (içerik mevcut anlatımdan, read-only).
 */
export default function GuidedLessonSession() {
  const { categoryId, topicTitle } = useParams<{ categoryId: string; topicTitle: string }>();
  const decodedTitle = topicTitle ? decodeURIComponent(topicTitle) : "";
  const flow = getLessonFlow(categoryId, decodedTitle);
  const content = getBetaTopic(categoryId, decodedTitle);
  const hasFlow = !!flow;

  // Oturum öğeleri: akış varsa blok blok öğret → karışık sor; yoksa sadece öğret.
  const mainItems = useMemo<FlowItem[]>(() => {
    if (!content) return [];
    const items: FlowItem[] = [];
    if (flow) {
      const sectionByTitle = new Map(content.sections.map((s) => [s.title, s]));
      for (const block of flow.blocks) {
        for (const title of block.sectionTitles) {
          const section = sectionByTitle.get(title);
          if (section) items.push({ kind: "teach", section });
        }
        const blockQs = shuffle(
          flow.questions.filter((q) => block.sectionTitles.includes(q.sectionRef)),
        );
        for (const question of blockQs) items.push({ kind: "quiz", question });
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
        <p className="text-muted-foreground">Bu konu için anlatım içeriği henüz hazırlanmadı.</p>
        <Link
          to={`/exercises/${categoryId}/topics`}
          className="text-sm text-primary underline"
        >
          Konulara dön
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
    <div className="relative min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 dark:from-[hsl(220,50%,6%)] dark:via-[hsl(220,50%,8%)] dark:to-[hsl(220,50%,10%)]">
      <div className="sticky top-0 z-10 border-b border-border/40 bg-card/90 px-4 py-3 backdrop-blur">
        <div className="mx-auto flex max-w-2xl items-center gap-3">
          <Link
            to={`/exercises/${categoryId}/topics/${encodeURIComponent(decodedTitle)}`}
            className="text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Çıkış"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
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
          <div className="rounded-2xl border border-border/60 bg-card/85 p-6 text-center shadow-md backdrop-blur">
            {hasFlow ? (
              <>
                <Trophy className="mx-auto h-16 w-16 text-amber-500" />
                <h2 className="mt-4 text-2xl font-bold text-foreground">Oturum Tamamlandı!</h2>
                <div className="mt-3 text-5xl font-bold text-primary">%{percent}</div>
                <p className="mt-2 text-sm text-muted-foreground">{correct} / {answeredTotal} doğru</p>
                {weakSections.length > 0 ? (
                  <div className="mt-5 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-left">
                    <p className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-300">
                      Tekrar etmen iyi olur
                    </p>
                    <ul className="mt-2 space-y-1">
                      {weakSections.map((s) => (
                        <li key={s} className="text-sm text-foreground/85">• {s}</li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <p className="mt-4 text-sm text-emerald-600 dark:text-emerald-400">
                    Harika! Tüm soruları doğru bildin.
                  </p>
                )}
              </>
            ) : (
              <>
                <CheckCircle2 className="mx-auto h-16 w-16 text-emerald-500" />
                <h2 className="mt-4 text-2xl font-bold text-foreground">Konuyu Tamamladın!</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Tüm bölümleri okudun. Pekiştirmek için AI eğitmene soru sorabilirsin.
                </p>
              </>
            )}

            <div className="mt-6 flex flex-col gap-2">
              <Button onClick={restart} className="w-full">
                <RotateCcw className="mr-2 h-4 w-4" /> Tekrar Başla
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link to={`/exercises/${categoryId}/topics/${encodeURIComponent(decodedTitle)}`}>
                  <Sparkles className="mr-2 h-4 w-4" /> AI Eğitmene Sor
                </Link>
              </Button>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-border/60 bg-card/85 p-5 shadow-md backdrop-blur sm:p-6">
            {inRepeatPhase && (
              <div className="mb-4 flex items-center justify-center gap-1.5 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-center text-xs font-semibold text-amber-700 dark:text-amber-300">
                <RotateCcw className="h-3.5 w-3.5" aria-hidden />
                Yanlışları pekiştirme turu
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
                  {lastStep ? "Bitir" : "Anladım, devam"} <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </>
            ) : current?.kind === "quiz" ? (
              <>
                <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                  Karışık Soru
                </p>
                <KnowledgeCheck
                  key={`${sessionKey}-${pos}`}
                  question={current.question}
                  compact
                  onAnswered={(c) => handleAnswered(c, current.question)}
                />
                {answeredThisStep && (
                  <Button onClick={advance} className="mt-5 w-full">
                    {lastStep ? "Sonucu Gör" : "Devam"} <ArrowRight className="ml-2 h-4 w-4" />
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
