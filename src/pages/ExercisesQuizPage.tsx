import { useParams } from "react-router-dom";
import { CourseQuiz } from "@/components/courseContent/CourseQuiz";
import { getBetaCategories } from "@/data/betaLessons";
import { getTopicQuiz } from "@/data/courseContent/quiz";

const toCourseKey = (categoryId?: string) =>
  categoryId?.startsWith("machine-") ? categoryId.replace("machine-", "") : categoryId;

export default function ExercisesQuizPage() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const category = getBetaCategories().find((item) => item.key === categoryId);
  const courseKey = toCourseKey(categoryId);
  const questions = getTopicQuiz(courseKey);

  if (!category || !categoryId || !courseKey || questions.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-muted-foreground">Quiz sorusu bulunamadı</p>
      </div>
    );
  }

  return (
    <CourseQuiz
      title={category.title}
      icon={category.icon}
      accent={category.accent}
      questions={questions}
      courseKey={courseKey}
      group={category.group}
      returnHref={`/exercises/${categoryId}/topics`}
      returnLabel="Alıştırmalara Dön"
    />
  );
}
