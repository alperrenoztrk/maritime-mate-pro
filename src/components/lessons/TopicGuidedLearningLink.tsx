import { Link } from "react-router-dom";
import { Play } from "lucide-react";
import { getLessonFlow } from "@/data/lessonFlow";
import { topicLearnHref } from "@/data/learningGuide";
import type { BetaTopic } from "@/data/betaLessons";

/** Konu sayfasından rehberli öğrenme oturumuna (adım adım anlatım) giriş. */
export function TopicGuidedLearningLink({ categoryKey, topic }: { categoryKey: string; topic: BetaTopic }) {
  if (!topic.id || topic.sections.length === 0) return null;
  const flow = getLessonFlow(categoryKey, topic.sourceTitle ?? topic.title);
  return (
    <Link
      to={topicLearnHref(categoryKey, topic.id)}
      className="flex min-h-11 items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-3 text-base font-semibold text-primary-foreground shadow-elev-1 transition-[background-color,transform] duration-control ease-out-ios hover:bg-primary/90 active:scale-[0.98]"
    >
      <Play className="h-4 w-4" />
      {flow ? "Start Learning" : "Start Guided Reading"}
    </Link>
  );
}
