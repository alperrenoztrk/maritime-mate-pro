import { Navigate, useLocation, useParams } from "react-router-dom";
import { calculationCategories } from "@/data/calculationCenterConfig";
import { hasCourseTopic } from "@/data/courseContent";

/** Old bookmarks resolve to the working module, never a placeholder page. */
export default function CalculationSectionPage() {
  const { categoryId, sectionId } = useParams();
  const { search, hash } = useLocation();
  const category = calculationCategories.find((item) => item.id === categoryId);
  const section = category?.sections.find((item) => item.id === sectionId);
  let target = "/calculations";

  if (category && section) {
    if (category.id.startsWith("machine-")) {
      const slug = category.id.slice("machine-".length);
      target = `/machine/${slug}/${section.id === "rules" ? "topics" : section.id}`;
    } else if (section.id === "rules") {
      target = `/lessons/${category.id}/topics`;
    } else if (hasCourseTopic(category.id) && ["calculations", "formulas", "quiz"].includes(section.id)) {
      target = `/lessons/${category.id}/${section.id}`;
    } else {
      target = section.href ?? `/lessons/${category.id}/topics`;
    }
  }

  return <Navigate to={{ pathname: target, search, hash }} replace />;
}
