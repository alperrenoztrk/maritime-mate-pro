import { CourseLearningOverview } from "@/components/curriculum/CourseLearningOverview";
import { Link, useParams } from "react-router-dom";
import { CourseSectionTabs } from "@/components/curriculum/CourseSectionTabs";
import { CurriculumModuleAccordion } from "@/components/curriculum/CurriculumModuleAccordion";
import { getBetaCategories } from "@/data/betaLessons";
import { getExerciseModules } from "@/data/exerciseQuestionDistribution";

export default function ExerciseTopicsPage() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const category = getBetaCategories().find((item) => item.key === categoryId);
  const modules = getExerciseModules(categoryId);

  if (!category) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-muted-foreground">Category not found</p>
      </div>
    );
  }

  const CategoryIcon = category.icon;
  const courseKey =
    category.group === "machine" ? category.key.replace("machine-", "") : category.key;
  const detailLink = (topicId: string) =>
    `/exercises/${categoryId}/topics/${encodeURIComponent(topicId)}`;

  return (
    <div className="relative min-h-screen overflow-hidden px-4 py-8 pb-24">
      <div className="relative z-10 mx-auto flex max-w-5xl flex-col gap-6">
        <header className="text-center">
          <div className="flex items-center justify-center gap-3">
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${category.accent} text-white shadow-lg`}
            >
              <CategoryIcon className="h-6 w-6" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">{category.title}</h1>
          </div>
        </header>

        <CourseSectionTabs group={category.group} courseKey={courseKey} active="quiz" />

        <CourseLearningOverview courseKey={category.key} />
        <Link to={category.group === "machine" ? `/machine/${courseKey}/quiz` : `/lessons/${courseKey}/quiz`} className="inline-flex min-h-11 items-center rounded-xl border bg-card px-4 py-3 text-sm font-semibold text-primary">Open the complete course question bank</Link>
        <p className="text-sm text-muted-foreground">Topic questions follow the lesson they were written for. Use the course question bank for broader revision.</p>
        {modules.length > 0 ? (
          <CurriculumModuleAccordion
            modules={modules}
            topicHref={(topic) => detailLink(topic.id)}
          />
        ) : (
          <p className="rounded-2xl border bg-card p-5 text-center text-sm text-muted-foreground">
            No topic exercises have been written for this course yet. Use the course question bank above.
          </p>
        )}
      </div>
    </div>
  );
}
