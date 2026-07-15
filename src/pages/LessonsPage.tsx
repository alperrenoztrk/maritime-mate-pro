import { useState } from "react";
import { Link } from "react-router-dom";
import { calculationCategories } from "@/data/calculationCenterConfig";
import { hasCourseTopic } from "@/data/courseContent";
import { ChevronDown } from "lucide-react";
import { BookSheet } from "@/components/book/BookSheet";

export default function LessonsPage() {
  const [expandedGroup, setExpandedGroup] = useState<"deck" | "machine" | null>(null);

  const deckCategories = calculationCategories.filter(
    (category) => !category.group || category.group === "deck"
  ).filter((category) => !(category.id as string).startsWith("machine-"));

  const machineCategories = calculationCategories.filter(
    (category) => category.group === "machine" || (category.id as string).startsWith("machine-")
  );

  const groups = [
    { id: "deck" as const, title: "Güverte", categories: deckCategories },
    { id: "machine" as const, title: "Makine", categories: machineCategories },
  ];

  return (
    <BookSheet title="DERSLER">
      {groups.map((group) => {
        const isExpanded = expandedGroup === group.id;
        return (
          <section key={group.id}>
            <button
              type="button"
              onClick={() => setExpandedGroup(isExpanded ? null : group.id)}
              className="bs-chapter"
              aria-expanded={isExpanded}
            >
              <span className="flex-1">{group.title.toLocaleUpperCase("tr")}</span>
              <ChevronDown
                className={`h-4 w-4 shrink-0 transition-transform ${isExpanded ? "rotate-180" : ""}`}
              />
            </button>
            <div className="bs-chapter-rule" />

            {isExpanded && (
              <div className="pb-2">
                {group.categories.map((category) => {
                  const isMachineTopic = (category.id as string).startsWith("machine-");
                  const machineSlug = isMachineTopic ? (category.id as string).replace("machine-", "") : null;
                  // Birleşik tek-kaynak registry anahtarı (makine = slug, güverte = id)
                  const topicKey = isMachineTopic ? machineSlug : (category.id as string);

                  return (
                    <div key={category.id}>
                      <div className="bs-section">{category.title}</div>

                      <Link
                        to={isMachineTopic ? `/machine/${machineSlug}/topics` : `/lessons/${category.id}/topics`}
                        className="bs-entry"
                      >
                        <span className="bs-entry-label">Konu Anlatımı</span>
                        <span className="bs-leader" aria-hidden="true" />
                        <span className="bs-anchor" aria-hidden="true">⚓</span>
                      </Link>

                      {category.sections.map((section) => {
                        // Konu tek kaynak registry'de ise Formüller/Hesaplamalar
                        // birleşik sayfalara yönlendirilir (tek tasarım + bağlı içerik).
                        const useUnified =
                          hasCourseTopic(topicKey ?? undefined) &&
                          (section.id === "formulas" ||
                            section.id === "calculations" ||
                            section.id === "rules" ||
                            section.id === "quiz");
                        const sectionHref = useUnified
                          ? `/lessons/${topicKey}/${section.id}`
                          : section.href || "#";
                        return (
                          <Link
                            key={`${category.id}-${section.id}`}
                            to={sectionHref}
                            className="bs-entry"
                          >
                            <span className="bs-entry-label">{section.label}</span>
                            <span className="bs-leader" aria-hidden="true" />
                            <span className="bs-anchor" aria-hidden="true">⚓</span>
                          </Link>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        );
      })}
    </BookSheet>
  );
}
