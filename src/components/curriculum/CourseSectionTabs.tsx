import { Link } from "react-router-dom";
import { BookOpen, Calculator, ListChecks, Scale, Sigma } from "lucide-react";

export type CurriculumSectionId =
  | "topics"
  | "calculations"
  | "formulas"
  | "rules"
  | "quiz";

interface CourseSectionTabsProps {
  group: "deck" | "machine";
  courseKey: string;
  active: CurriculumSectionId;
  hrefs?: Partial<Record<CurriculumSectionId, string | null>>;
}

const tabDefinitions = [
  { id: "topics", label: "Konular", icon: BookOpen },
  { id: "calculations", label: "Hesaplamalar", icon: Calculator },
  { id: "formulas", label: "Formüller", icon: Sigma },
  { id: "rules", label: "Kurallar", icon: Scale },
  { id: "quiz", label: "Alıştırmalar", icon: ListChecks },
] satisfies { id: CurriculumSectionId; label: string; icon: typeof BookOpen }[];

export function CourseSectionTabs({
  group,
  courseKey,
  active,
  hrefs,
}: CourseSectionTabsProps) {
  const basePath = group === "machine" ? `/machine/${courseKey}` : `/lessons/${courseKey}`;
  const defaultHrefs: Record<CurriculumSectionId, string> = {
    topics: `${basePath}/topics`,
    calculations: `${basePath}/calculations`,
    formulas: `${basePath}/formulas`,
    rules: `${basePath}/rules`,
    quiz: `${basePath}/quiz`,
  };

  const resolveHref = (id: CurriculumSectionId) => {
    if (hrefs && Object.prototype.hasOwnProperty.call(hrefs, id)) return hrefs[id];
    return defaultHrefs[id];
  };

  return (
    <nav
      aria-label="Ders bölümleri"
      className="overflow-x-auto rounded-2xl border border-border/60 bg-card/80 p-1.5 shadow-sm backdrop-blur"
    >
      <div className="flex min-w-max gap-1.5">
        {tabDefinitions.map((tab) => {
          const href = resolveHref(tab.id);
          if (!href) return null;
          const TabIcon = tab.icon;
          const isActive = active === tab.id;

          return (
            <Link
              key={tab.id}
              to={href}
              aria-current={isActive ? "page" : undefined}
              className={`inline-flex min-h-10 items-center justify-center gap-2 rounded-xl px-3.5 text-xs font-semibold transition sm:text-sm ${
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-muted/70 hover:text-foreground"
              }`}
            >
              <TabIcon className="h-4 w-4 shrink-0" />
              {tab.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
