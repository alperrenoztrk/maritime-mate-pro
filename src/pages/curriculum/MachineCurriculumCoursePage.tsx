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
        <p className="text-muted-foreground">Konu bulunamadı</p>
      </div>
    );
  }

  const TopicIcon = category.icon;

  return (
    <div className="relative min-h-screen overflow-hidden px-4 py-8 pb-24">
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
              <TopicIcon className="h-6 w-6" />
            </div>
            <h1 className="text-2xl font-bold leading-tight text-foreground">{category.title}</h1>
          </div>

          <CourseSectionTabs group="machine" courseKey={topicSlug} active="topics" />
        </header>

        <CurriculumModuleAccordion
          modules={modules}
          topicHref={(topic) => `/machine/${topicSlug}/topics/${encodeURIComponent(topic.id)}`}
        />
      </div>
    </div>
  );
}
