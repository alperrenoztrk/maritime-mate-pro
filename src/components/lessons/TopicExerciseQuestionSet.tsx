import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BookOpen, CheckCircle, ListChecks, RotateCcw, Trophy } from "lucide-react";
import { shuffleAnswerOptions } from "@/utils/practiceQuestion";
import { updateTopicProgress } from "@/utils/learningProgress";
import { getReviewSections } from "@/utils/lessonSequence";
import { Button } from "@/components/ui/button";
import { KnowledgeCheck } from "@/components/lessons/KnowledgeCheck";
import type { BetaTopic } from "@/data/betaLessons";
import { topicHref } from "@/data/learningGuide";
import type { QuizQuestion } from "@/types/quiz";
const prepare = (questions: QuizQuestion[]) => {
  const result = questions.map((question) => shuffleAnswerOptions(question));
  for (let index = result.length - 1; index > 0; index--) {
    const target = Math.floor(Math.random() * (index + 1));
    [result[index], result[target]] = [result[target], result[index]];
  }
  return result;
};
export function TopicExerciseQuestionSet({ questions, topicId, topic, categoryId }: { questions: QuizQuestion[]; topicId?: string; topic: BetaTopic; categoryId: string }) {
  const [order, setOrder] = useState(() => prepare(questions));
  const [current, setCurrent] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);
  const [reviewRound, setReviewRound] = useState(false);
  const [missed, setMissed] = useState<QuizQuestion[]>([]);
  const [remaining, setRemaining] = useState<QuizQuestion[]>([]);
  const [showReview, setShowReview] = useState(false);
  const [run, setRun] = useState(0);
  const [saved, setSaved] = useState(true);
  useEffect(() => {
    if (!finished || !topicId || questions.length === 0) return;
    setSaved(updateTopicProgress(topicId, { practice: { correct: correctCount, total: questions.length, completedAt: new Date().toISOString(), weakSections: [...new Set(remaining.map((question) => question.sectionRef ?? topic.sections[0]?.id ?? topicId))] } }));
  }, [finished, topicId, correctCount, questions.length, remaining, topic]);
  if (!questions.length) return null;
  const question = order[current];
  const handleAnswered = (correct: boolean) => {
    if (answered) return;
    setAnswered(true);
    if (!reviewRound) {
      if (correct) setCorrectCount((value) => value + 1);
      else { setMissed((value) => [...value, question]); setRemaining((value) => [...value, question]); }
    } else if (correct) setRemaining((value) => value.filter((item) => item.id !== question.id || item.sectionRef !== question.sectionRef));
  };
  const next = () => {
    if (current === order.length - 1) { setFinished(true); return; }
    setCurrent((value) => value + 1); setAnswered(false); setShowReview(reviewRound);
  };
  const start = (review: boolean) => {
    setOrder(prepare(review ? remaining : questions)); setCurrent(0); setAnswered(false);
    setFinished(false); setReviewRound(review); setShowReview(review); setRun((value) => value + 1);
    if (!review) { setCorrectCount(0); setMissed([]); setRemaining([]); }
  };
  return <section id="topic-questions" className="scroll-mt-24 rounded-2xl border border-violet-500/25 bg-violet-500/5 p-4 sm:p-6">
    <div className="mb-5 flex items-center gap-3"><ListChecks className="h-5 w-5 text-primary" /><h2 className="flex-1 font-bold">Topic Exercises</h2><span className="text-xs">{questions.length} questions</span></div>
    {finished ? <div className="space-y-4 rounded-2xl border bg-card/80 p-5 text-center">
      <Trophy className="mx-auto h-14 w-14 text-amber-500" />
      <p className="text-3xl font-bold text-primary">{Math.round(correctCount / questions.length * 100)}%</p>
      <p className="text-sm">{correctCount} / {questions.length} correct on the first attempt</p>
      {missed.length > 0 && <p className="text-sm text-muted-foreground">{missed.length - remaining.length} / {missed.length} missed questions corrected. Review answers do not change the first-attempt score.</p>}
      {remaining.length > 0 && <Button onClick={() => start(true)} className="w-full"><RotateCcw className="mr-2 h-4 w-4" />Review missed questions ({remaining.length})</Button>}
      <Button variant="outline" onClick={() => start(false)} className="w-full">Start a new attempt</Button>
      {!saved && <p role="status" className="text-sm text-muted-foreground">Your browser could not save progress. You can continue reading.</p>}
    </div> : <div className="space-y-4">
      <p className="text-xs text-muted-foreground">{reviewRound ? "Review round" : "First attempt"} · Question {current + 1} / {order.length}</p>
      {showReview && <nav aria-label="Related lesson sections" className="space-y-2 rounded-xl border p-4">
        <p className="text-sm font-semibold">Review in the lesson</p>
        <ul className="space-y-1">{getReviewSections(topic, question.sectionRef).map((section, index) => <li key={section.id ?? index}><Link to={`${topicHref(categoryId, topic.id ?? topic.title)}${section.id ? `#${section.id}` : ""}`} className="inline-flex min-h-11 items-center gap-2 text-sm text-primary underline"><BookOpen className="h-4 w-4 shrink-0" />{section.title}</Link></li>)}</ul>
      </nav>}
      <KnowledgeCheck key={`${run}-${current}`} question={question} onAnswered={handleAnswered} onReview={() => setShowReview((value) => !value)} />
      {answered && <Button onClick={next} className="w-full">{current < order.length - 1 ? "Next Question" : "See Result"}<CheckCircle className="ml-2 h-4 w-4" /></Button>}
    </div>}
  </section>;
}
