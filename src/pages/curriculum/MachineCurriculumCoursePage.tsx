import { PageHeader } from "@/components/layout/PageHeader";
import { CourseLearningOverview } from "@/components/curriculum/CourseLearningOverview";
import { Link, useParams } from "react-router-dom";
import { getBetaCategories, getBetaModules } from "@/data/betaLessons";
import { CourseSectionTabs } from "@/components/curriculum/CourseSectionTabs";
import { CurriculumModuleAccordion } from "@/components/curriculum/CurriculumModuleAccordion";


export default function MachineCurriculumCoursePage() {
  const { topicSlug } = useParams<{ topicSlug: string }>();
  const categoryKey = topicSlug ? `machine-${topicSlug}` : undefined;
  const category = getBetaCategories().find((item) => item.key === categoryKey);
  const modules = getBetaModules(categoryKey);

  if (!topicSlug || !category) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-muted-foreground">Topic not found</p>
      </div>
    );
  }


  return (
    <div className="relative min-h-screen overflow-hidden px-4 py-8 pb-24">

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col gap-5">
        <header className="space-y-4">
          {/* Back is global (AppNavBar + edge swipe) — no per-page duplicate. */}


          <PageHeader title={category.title} />

          <CourseSectionTabs group="machine" courseKey={topicSlug} active="topics" />
        </header>

        <CourseLearningOverview courseKey={categoryKey} />

        <CurriculumModuleAccordion
          modules={modules}
          topicHref={(topic) => `/machine/${topicSlug}/topics/${encodeURIComponent(topic.id)}`}
        />
      </div>
    </div>
  );
}
