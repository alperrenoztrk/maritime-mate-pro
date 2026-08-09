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
        <p className="text-muted-foreground">Kategori bulunamadı</p>
      </div>
    );
  }

  const CategoryIcon = category.icon;
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
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 px-4 py-8 pb-24 dark:from-[hsl(220,50%,6%)] dark:via-[hsl(220,50%,8%)] dark:to-[hsl(220,50%,10%)]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/4 h-48 w-48 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute right-10 top-10 h-56 w-56 rounded-full bg-indigo-500/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col gap-5">
        <header className="space-y-4">
          {/* Back is global (AppNavBar + edge swipe) — no per-page duplicate. */}


          <div className="flex items-center gap-3">
            <div
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${category.accent} text-white shadow-lg`}
            >
              <CategoryIcon className="h-6 w-6" />
            </div>
            <h1 className="text-2xl font-bold leading-tight text-foreground">{category.title}</h1>
          </div>

          <CourseSectionTabs
            group="deck"
            courseKey={categoryId}
            active="topics"
            hrefs={tabHrefs}
          />
        </header>

        <CurriculumModuleAccordion
          modules={modules}
          topicHref={(topic) => topicLink(topic.id)}
        />
      </div>
    </div>
  );
}
