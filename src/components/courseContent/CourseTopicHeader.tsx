import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import type { CourseTopic } from "@/data/courseContent/types";
import {
  CourseSectionTabs,
  type CurriculumSectionId,
} from "@/components/curriculum/CourseSectionTabs";

export function CourseTopicHeader({
  topic,
  section,
}: {
  topic: CourseTopic;
  section: Exclude<CurriculumSectionId, "topics">;
}) {
  const TopicIcon = topic.icon;

  return (
    <header className="space-y-4">
      <Link
        to={`/lessons?library=${topic.group}`}
        className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        {topic.group === "machine" ? "Makine Kitaplığı" : "Güverte Kitaplığı"}
      </Link>

      <div className="flex items-center gap-3">
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${topic.accent} text-white shadow-lg`}
        >
          <TopicIcon className="h-5 w-5" />
        </div>
        <h1 className="text-xl font-bold leading-tight text-foreground">{topic.title}</h1>
      </div>

      <CourseSectionTabs
        group={topic.group}
        courseKey={topic.key}
        active={section}
      />
    </header>
  );
}
