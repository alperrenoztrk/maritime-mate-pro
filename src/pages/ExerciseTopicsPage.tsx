import { useParams } from "react-router-dom";
import { CourseSectionTabs } from "@/components/curriculum/CourseSectionTabs";
import { CurriculumModuleAccordion } from "@/components/curriculum/CurriculumModuleAccordion";
import { getBetaCategories, getBetaModules } from "@/data/betaLessons";

export default function ExerciseTopicsPage() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const category = getBetaCategories().find((item) => item.key === categoryId);
  const modules = getBetaModules(categoryId);

  if (!category) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-muted-foreground">Kategori bulunamadı</p>
      </div>
    );
  }

  const CategoryIcon = category.icon;
  const courseKey =
    category.group === "machine" ? category.key.replace("machine-", "") : category.key;
  const detailLink = (topicId: string) =>
    `/exercises/${categoryId}/topics/${encodeURIComponent(topicId)}`;

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-violet-50 via-indigo-50 to-blue-50 px-4 py-8 pb-24 dark:from-[hsl(265,45%,7%)] dark:via-[hsl(245,45%,8%)] dark:to-[hsl(220,50%,10%)]">
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

        <CurriculumModuleAccordion
          modules={modules}
          topicHref={(topic) => detailLink(topic.id)}
        />
      </div>
    </div>
  );
}
