import { Link } from "react-router-dom";

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
  return (
    <header className="space-y-4">
      {/* Back is global (AppNavBar + edge swipe) — no per-page duplicate. */}
      <h1
        data-page-title
        className="library-page-title font-bold leading-[1.08] tracking-[-0.035em] text-foreground"
      >
        {topic.title}
      </h1>

      <CourseSectionTabs
        group={topic.group}
        courseKey={topic.key}
        active={section}
      />
    </header>
  );
}
