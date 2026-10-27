import { PageHeader } from "@/components/layout/PageHeader";
import { CourseLearningOverview } from "@/components/curriculum/CourseLearningOverview";
import { Link, useParams } from "react-router-dom";
import { getBetaCategories, getBetaModules } from "@/data/betaLessons";
import { calculationCategories, type SectionId } from "@/data/calculationCenterConfig";
import { hasCourseTopic } from "@/data/courseContent";
import {
  CourseSectionTabs,
  type CurriculumSectionId,
} from "@/components/curriculum/CourseSectionTabs";
import { CurriculumModuleAccordion } from "@/components/curriculum/CurriculumModuleAccordion";


export default function DeckCurriculumCoursePage() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const category = getBetaCategories().find((item) => item.key === categoryId);
  const categoryConfig = calculationCategories.find((item) => item.id === categoryId);
  const modules = getBetaModules(categoryId);

  if (!category || !categoryConfig || !categoryId) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-muted-foreground">Category not found</p>
      </div>
    );
  }

  const topicLink = (topicId: string) =>
    `/lessons/${categoryId}/topics/${encodeURIComponent(topicId)}`;
  const unifiedSections = hasCourseTopic(categoryId);

  const getSectionHref = (sectionId: SectionId) => {
    if (unifiedSections && ["calculations", "formulas", "quiz"].includes(sectionId)) {
      return `/lessons/${categoryId}/${sectionId}`;
    }
    return categoryConfig.sections.find((section) => section.id === sectionId)?.href ?? null;
  };

  const tabHrefs: Partial<Record<CurriculumSectionId, string | null>> = {
    topics: `/lessons/${categoryId}/topics`,
    calculations: getSectionHref("calculations"),
    formulas: getSectionHref("formulas"),
    quiz: getSectionHref("quiz"),
  };

  return (
    <div className="relative min-h-screen overflow-hidden px-4 py-8 pb-24">

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col gap-5">
        <header className="space-y-4">
          {/* Back is global (AppNavBar + edge swipe) — no per-page duplicate. */}


          <PageHeader title={category.title} />

          <CourseSectionTabs
            group="deck"
            courseKey={categoryId}
            active="topics"
            hrefs={tabHrefs}
          />
        </header>

        <CourseLearningOverview courseKey={categoryId} />

        <CurriculumModuleAccordion
          modules={modules}
          topicHref={(topic) => topicLink(topic.id)}
        />
      </div>
    </div>
  );
}
