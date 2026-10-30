import { useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, ChevronRight } from "lucide-react";
import { getBetaModules, type BetaTopic } from "@/data/betaLessons";
import { getCurriculumCourse } from "@/data/curriculumHierarchy";
import { hasExerciseQuestions } from "@/data/exerciseQuestionDistribution";
import { courseHref, courseLearningGuides, topicHref } from "@/data/learningGuide";
import { useLearningProgress } from "@/hooks/useLearningProgress";
import { updateTopicProgress } from "@/utils/learningProgress";

export function TopicLearningContext({ categoryKey, topic, placement = "before" }: { categoryKey: string; topic: BetaTopic; placement?: "before" | "after" }) {
  const progress = useLearningProgress();
  const [saveError, setSaveError] = useState(false);
  const course = getCurriculumCourse(categoryKey);
  const modules = getBetaModules(categoryKey);
  const module = modules.find((entry) => entry.topics.some((item) => item.id === topic.id));
  const ordered = modules.flatMap((entry) => entry.topics);
  const index = ordered.findIndex((entry) => entry.id === topic.id);
  const previous = ordered[index - 1];
  const next = index >= 0 ? ordered[index + 1] : undefined;
  const guide = courseLearningGuides[categoryKey];
  if (!course || !module || !topic.id) return null;
  const record = progress[topic.id];
  const reviewed = !!record?.reviewedAt;
  const level = topic.level === "foundation" ? "Foundation" : topic.level === "advanced" ? "Advanced" : "Operational";
  if (placement === "before") return (
    <section className="space-y-3 rounded-2xl border bg-card p-4">
      <nav aria-label="Learning location" className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
        <Link to="/lessons/map" className="inline-flex min-h-11 items-center text-primary underline">Learning map</Link>
        <ChevronRight className="h-3 w-3" aria-hidden />
        <Link to={courseHref(categoryKey)} className="inline-flex min-h-11 items-center text-primary underline">{course.title}</Link>
        <ChevronRight className="h-3 w-3" aria-hidden />
        <Link to={`${courseHref(categoryKey)}?module=${encodeURIComponent(module.id)}`} className="inline-flex min-h-11 items-center text-primary underline">{module.title}</Link>
      </nav>
      <p className="text-sm leading-relaxed text-muted-foreground">{module.description}</p>
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="rounded-full bg-primary/10 px-3 py-1 font-medium text-primary">{level}</span>
        {reviewed && <span className="inline-flex items-center gap-1"><CheckCircle2 className="h-4 w-4 text-emerald-600" />Reviewed</span>}
      </div>
      <details>
        <summary className="min-h-11 cursor-pointer text-sm font-semibold">Inside this lesson</summary>
        <ol className="list-decimal space-y-2 pl-5 text-sm">
          {topic.sections.map((section) => <li key={section.id}><a href={`#${section.id}`} className="text-primary underline">{section.title}</a></li>)}
        </ol>
      </details>
      {previous && <p className="text-sm"><span>Previous in this reading sequence:</span>{" "}<Link to={topicHref(categoryKey, previous.id)} className="text-primary underline">{previous.title}</Link></p>}
    </section>
  );
  return (
    <section className="space-y-5 rounded-2xl border border-primary/20 bg-card p-4 sm:p-5">
      <div className="flex flex-wrap gap-3">
        <button type="button" className="min-h-11 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground" onClick={() => {
          setSaveError(!updateTopicProgress(topic.id!, { reviewedAt: reviewed ? undefined : new Date().toISOString() }));
        }}>{reviewed ? "Mark as unread" : "Mark as reviewed"}</button>
        {hasExerciseQuestions(categoryKey, topic.id) && <Link className="inline-flex min-h-11 items-center rounded-xl border px-4 py-2 text-sm font-semibold text-primary" to={`/exercises/${categoryKey}/topics/${encodeURIComponent(topic.id)}`}>Practise this topic</Link>}
      </div>
      {saveError && <p role="status" className="text-sm text-amber-700 dark:text-amber-300">Your browser could not save progress. You can continue reading.</p>}
      {record?.practice && <p className="text-sm text-muted-foreground"><span>Last practice:</span>{" "}{record.practice.correct} / {record.practice.total}{" "}<span>correct answers</span></p>}
      {next && <div><h2 className="font-semibold">Continue learning</h2><Link to={topicHref(categoryKey, next.id)} className="inline-flex min-h-11 items-center text-sm text-primary underline">{next.title}</Link></div>}
      {guide && <details className="rounded-xl border p-3">
        <summary className="min-h-11 cursor-pointer text-sm font-semibold">Connect this course to shipboard practice</summary>
        <ul className="space-y-3 pt-3 text-sm">
          {guide.connections.map((connection) => <li key={connection.href}><Link to={connection.href} className="font-medium text-primary underline">{connection.label}</Link><p className="mt-1 leading-relaxed text-muted-foreground">{connection.reason}</p></li>)}
          {guide.related.map((key) => <li key={key}><Link to={courseHref(key)} className="inline-flex min-h-11 items-center text-primary underline">{getCurriculumCourse(key)?.title}</Link></li>)}
        </ul>
      </details>}
    </section>
  );
}
