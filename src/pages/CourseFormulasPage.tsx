import { useParams } from "react-router-dom";
import { getCourseTopic } from "@/data/courseContent";
import { CourseTopicHeader } from "@/components/courseContent/CourseTopicHeader";
import { FormulaList } from "@/components/courseContent/FormulaList";

/**
 * Unified Formulas page — a single design for all deck and machine topics.
 * It is fed from the single source registry; when a formula has a calculator it
 * links to the corresponding tool on the Calculations page.
 */
export default function CourseFormulasPage() {
  const { topicKey } = useParams<{ topicKey: string }>();
  const topic = getCourseTopic(topicKey);

  if (!topic) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-muted-foreground">Topic not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto max-w-4xl space-y-6 p-4">
        <CourseTopicHeader topic={topic} section="formulas" />

        <FormulaList entries={topic.entries} calcHref={`/lessons/${topic.key}/calculations`} />
      </div>
    </div>
  );
}
