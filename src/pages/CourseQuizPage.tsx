import { useParams } from "react-router-dom";
import { getCourseTopic } from "@/data/courseContent";
import { getTopicQuiz } from "@/data/courseContent/quiz";
import { CourseQuiz } from "@/components/courseContent/CourseQuiz";

export default function CourseQuizPage() {
  const { topicKey } = useParams<{ topicKey: string }>();
  const topic = getCourseTopic(topicKey);
  const questions = getTopicQuiz(topicKey);

  if (!topic || questions.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-muted-foreground">No exercise found</p>
      </div>
    );
  }

  return (
    <CourseQuiz
      title={topic.title}
      icon={topic.icon}
      accent={topic.accent}
      questions={questions}
      courseKey={topic.key}
      group={topic.group}
    />
  );
}
