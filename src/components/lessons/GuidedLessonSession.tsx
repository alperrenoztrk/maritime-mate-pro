import { withGuidedEnhancements } from "@/utils/guidedEnhancements";
import { shuffleAnswerOptions } from "@/utils/practiceQuestion";
import { updateTopicProgress } from "@/utils/learningProgress";
import { TopicLearningContext } from "@/components/curriculum/TopicLearningContext";
import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, CheckCircle2, RotateCcw, Sparkles, Trophy } from "lucide-react";
import { useBackNavigation } from "@/hooks/useBackNavigation";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { LessonTeachCard } from "@/components/lessons/LessonTeachCard";
import { KnowledgeCheck } from "@/components/lessons/KnowledgeCheck";
import { getLessonFlow } from "@/data/lessonFlow";
import type { RecapQuestion } from "@/data/lessonFlow";
import { buildLessonSequence, buildReviewSequence, getReviewSections, type LessonSequenceItem } from "@/utils/lessonSequence";
import { getBetaTopic } from "@/data/betaLessons";
import { courseHref, topicHref } from "@/data/learningGuide";

/** Deck: /lessons/:categoryId/topics/:topicTitle/learn — Engine: /machine/:topicSlug/topics/:subTopicTitle/learn */
function useGuidedParams() {
  const { categoryId, topicTitle, topicSlug, subTopicTitle } = useParams();
  return {
    categoryId: categoryId ?? (topicSlug ? `machine-${topicSlug}` : undefined),
    topicTitle: topicTitle ?? subTopicTitle,
  };
}

/** Fisher-Yates karıştırma. */
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

type FlowItem = LessonSequenceItem;

/**
 * Konular (Topics) — rehberli ders oturumu (güverte + makine, tüm konular).
 * Akış (lessonFlow) yazılmış konularda Duolingo modu: ÖNCE ANLAT → KARIŞIK SOR,
 * yanlışlar sonda tekrar. Akışı henüz olmayan konularda REHBERLİ OKUMA modu:
 * bölümler sırayla öğretilir (içerik mevcut anlatımdan, read-only).
 */
export default function GuidedLessonSession() {
  const { categoryId, topicTitle } = useGuidedParams();
  return <GuidedSession key={`${categoryId}-${topicTitle}`} />;
}

function GuidedSession() {
  const { categoryId, topicTitle } = useGuidedParams();
  const { goBack } = useBackNavigation();
  const decodedTitle = topicTitle ? decodeURIComponent(topicTitle): "";
  const content = useMemo(() => {
    const topic = getBetaTopic(categoryId, decodedTitle);
    return topic ? withGuidedEnhancements(categoryId, topic) : null;
  }, [categoryId, decodedTitle]);
  const flow = getLessonFlow(categoryId, content?.sourceTitle ?? decodedTitle);
  const hasFlow = !!flow;

  // Session elements: teach block by block if flow exists → ask shuffle; Otherwise just teach.
  const prepareSession = () => content ? buildLessonSequence(content, flow, (questions) => shuffle(questions).map((question) => shuffleAnswerOptions(question))) : [];
  const [mainItems, setMainItems] = useState<FlowItem[]>(prepareSession);

  const [sessionKey, setSessionKey] = useState(0);
  const [pos, setPos] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [answeredTotal, setAnsweredTotal] = useState(0);
  const [wrong, setWrong] = useState<RecapQuestion[]>([]);
  const [remainingWrong, setRemainingWrong] = useState<RecapQuestion[]>([]);
  const [showReview, setShowReview] = useState(false);
  const [repeatItems, setRepeatItems] = useState<FlowItem[] | null>(null);
  const [finished, setFinished] = useState(false);
  const [answeredThisStep, setAnsweredThisStep] = useState(false);

  useEffect(() => { setAnsweredThisStep(false); setShowReview(false); }, [pos, sessionKey]);

  const [progressSaved, setProgressSaved] = useState(true);
  useEffect(() => {
    if (!finished || !content?.id) return;
    setProgressSaved(updateTopicProgress(content.id, {
      reviewedAt: new Date().toISOString(),
      ...(hasFlow && answeredTotal > 0 ? { practice: { correct, total: answeredTotal, completedAt: new Date().toISOString(), weakSections: [...new Set(remainingWrong.map((question) => question.sectionRef))] } } : {}),
    }));
  }, [finished, content?.id, hasFlow, correct, answeredTotal, remainingWrong]);

  if (!content || content.sections.length === 0) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background px-6 text-center">
        <p className="text-muted-foreground">The narrative content for this topic has not been prepared yet.</p>
        <Link
          to={courseHref(categoryId ?? "")}
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

  const handleAnswered = (isCorrect: boolean, question: RecapQuestion) => {
    if (answeredThisStep) return;
    setAnsweredThisStep(true);
    if (!inRepeatPhase) {
      setAnsweredTotal((n) => n + 1);
      if (isCorrect) setCorrect((n) => n + 1);
      else { setWrong((items) => [...items, question]); setRemainingWrong((items) => [...items, question]); }
    } else if (isCorrect) {
      setRemainingWrong((items) => items.filter((item) => item.id !== question.id || item.sectionRef !== question.sectionRef));
    }
  };

  const advance = () => {
    if (pos < allItems.length - 1) {
      setPos((p) => p + 1);
      return;
    }
    if (repeatItems === null && wrong.length > 0) {
      setRepeatItems(buildReviewSequence(content, shuffle(wrong).map((question) => shuffleAnswerOptions(question))));
      setPos(mainItems.length);
    } else {
      setFinished(true);
    }
  };

  const restart = () => {
    setMainItems(prepareSession());
    setPos(0);
    setCorrect(0);
    setAnsweredTotal(0);
    setWrong([]);
    setRemainingWrong([]);
    setShowReview(false);
    setRepeatItems(null);
    setFinished(false);
    setAnsweredThisStep(false);
    setSessionKey((k) => k + 1);
  };

  const percent = answeredTotal > 0 ? Math.round((correct / answeredTotal) * 100) : 0;
  const weakSections = Array.from(new Set(remainingWrong.map((q) => q.sectionRef)));
  const isTeachStep = current?.kind === "teach";
  const lastStep = pos === allItems.length - 1 && (repeatItems !== null || wrong.length === 0);

  return (
    <div className="relative min-h-screen bg-background">
      <div className="surface-glass sticky top-0 z-10 border-b px-4 py-3 pt-[max(0.75rem,var(--safe-top))]">
        <div className="mx-auto flex max-w-2xl items-center gap-3">
          {/* This immersive route hides AppNavBar; use the same logical back handler. */}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-11 w-11 shrink-0 text-primary"
            aria-label="Back"
            title="Back"
            onClick={() => goBack()}
          >
            <ArrowLeft className="h-5 w-5" aria-hidden="true" />
          </Button>

          <Progress value={finished ? 100 : progress} className="h-3 flex-1" />
          {hasFlow ? (
            <span className="text-xs font-medium text-muted-foreground">{inRepeatPhase ? "Review round" : "Learn and practise"}</span>
          ) : (
            <span className="text-xs font-medium text-muted-foreground">Guided Reading</span>
          )}
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-4 py-6 sm:py-8">
        <h1 data-page-title className="mb-4 text-center text-xs font-bold uppercase tracking-[0.2em] text-primary">
          {content.title}
        </h1>

        {finished ? (
          <div className="space-y-4">
          <div className="surface-2 rounded-2xl border p-6 text-center shadow-elev-1">
            {hasFlow ? (
              <>
                <Trophy className="mx-auto h-16 w-16 text-amber-500" />
                <h2 className="mt-4 text-2xl font-bold text-foreground">Session Completed!</h2>
                <div className="mt-3 text-5xl font-bold text-primary">{percent}%</div>
                <p className="mt-2 text-sm text-muted-foreground">{correct} / {answeredTotal} correct on the first attempt</p>
                {wrong.length > 0 && <p className="mt-2 text-sm text-muted-foreground">{wrong.length - remainingWrong.length} / {wrong.length} missed questions corrected in the review round. Review answers do not change the first-attempt score.</p>}
                {weakSections.length > 0 ? (
                  <div className="mt-5 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-left">
                    <p className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-300">
                      Sections to revisit
                    </p>
                    <ul className="mt-2 space-y-1">
                      {weakSections.map((s) => (
                        <li key={s} className="text-sm text-foreground/85"><Link className="underline" to={`${topicHref(categoryId!, content.id ?? decodedTitle)}#${getReviewSections(content, s)[0]?.id ?? ""}`}>{getReviewSections(content, s)[0]?.title ?? s}</Link></li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <p className="mt-4 text-sm text-emerald-600 dark:text-emerald-400">
                    No unresolved questions remain in this session.
                  </p>
                )}
              </>
            ) : (
              <>
                <CheckCircle2 className="mx-auto h-16 w-16 text-emerald-500" />
                <h2 className="mt-4 text-2xl font-bold text-foreground">You have completed the topic!</h2>
              </>
            )}

            {!progressSaved && <p role="status" className="mt-3 text-sm text-muted-foreground">Your browser could not save progress. You can continue reading.</p>}
            <div className="mt-6 flex flex-col gap-2">
              <Button onClick={restart} className="w-full">
                <RotateCcw className="mr-2 h-4 w-4" /> Start Again
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link to={topicHref(categoryId!, content.id ?? decodedTitle)}>
                  <Sparkles className="mr-2 h-4 w-4" /> Ask the AI Instructor
                </Link>
              </Button>
            </div>
          </div>
          <TopicLearningContext categoryKey={categoryId!} topic={content} placement="after" />
          </div>
        ) : (
          <div className="surface-2 rounded-2xl border p-5 shadow-elev-1 sm:p-6">
            {inRepeatPhase && (
              <div className="mb-4 flex items-center justify-center gap-1.5 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-center text-xs font-semibold text-amber-700 dark:text-amber-300">
                <RotateCcw className="h-3.5 w-3.5" aria-hidden />
                Review the explanation, then try the missed questions again.
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
                  {lastStep ? "Finish" : "Got it, continue."} <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </>
            ) : current?.kind === "quiz" ? (
              <>
                <p className="mb-3 text-micro font-bold uppercase tracking-[0.2em] text-primary">
                  Knowledge check
                </p>
                <KnowledgeCheck
                  key={`${sessionKey}-${pos}`}
                  question={current.question}
                  compact
                  onAnswered={(c) => handleAnswered(c, current.question)}
                  onReview={() => setShowReview((value) => !value)}
                />
                {showReview && <div className="mt-5 space-y-4">{getReviewSections(content, current.question.sectionRef).map((section, index) => <LessonTeachCard key={section.id ?? index} section={section} categoryId={categoryId!} topicTitle={content.title} />)}</div>}
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
