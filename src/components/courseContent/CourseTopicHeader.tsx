import { Link } from "react-router-dom";
import { ArrowLeft, Calculator, Sigma } from "lucide-react";
import type { CourseTopic } from "@/data/courseContent/types";

/**
 * Tüm ders sayfalarında ortak başlık (makine şablonundan korunmuştur).
 * Güverte ve makine konuları birebir aynı görünümü kullanır.
 */
export function CourseTopicHeader({
  topic,
  section,
}: {
  topic: CourseTopic;
  section: "formulas" | "calculations";
}) {
  const TopicIcon = topic.icon;
  const SectionIcon = section === "formulas" ? Sigma : Calculator;
  const sectionLabel = section === "formulas" ? "Formüller" : "Hesaplamalar";

  return (
    <header className="space-y-3">
      <Link
        to="/lessons"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Derslere Dön
      </Link>
      <div className="flex items-center gap-3">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${topic.accent} text-white shadow-lg`}
        >
          <TopicIcon className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-foreground">{topic.title}</h1>
          <p className="flex items-center gap-1 text-sm text-muted-foreground">
            <SectionIcon className="h-3.5 w-3.5" /> {sectionLabel}
          </p>
        </div>
      </div>
      {topic.intro && <p className="text-sm text-muted-foreground">{topic.intro}</p>}
    </header>
  );
}
