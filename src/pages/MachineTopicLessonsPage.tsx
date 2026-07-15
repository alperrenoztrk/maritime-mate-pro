import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { machineTopicBySlug } from "@/data/machineTopicData";
import { hasSubTopicContent } from "@/data/machineTopicDetailContent";
import { machineTopicLessons } from "@/data/machineTopicLessonData";
import { ChevronDown } from "lucide-react";
import { BookSheet } from "@/components/book/BookSheet";

export default function MachineTopicLessonsPage() {
  const { topicSlug } = useParams<{ topicSlug: string }>();
  const topicConfig = topicSlug ? machineTopicBySlug[topicSlug] : null;
  const lessonData = topicSlug ? machineTopicLessons[topicSlug] : null;
  const [expandedTopics, setExpandedTopics] = useState<number[]>([]);

  const toggleTopic = (index: number) => {
    setExpandedTopics((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  if (!topicConfig || !lessonData) {
    return (
      <BookSheet title="DERSLER">
        <p className="bs-muted py-10 text-center text-sm italic">Konu bulunamadı</p>
      </BookSheet>
    );
  }

  return (
    <BookSheet title="DERSLER">
      <h1 className="bs-h2 text-center" style={{ borderBottom: "none" }}>{lessonData.title}</h1>
      <div className="bs-fleuron" aria-hidden="true">❦</div>

      <p className="bs-muted mb-1 text-[11px] italic">
        Ana Konular — {lessonData.keyTopics.length} başlık
      </p>

      {lessonData.keyTopics.map((topic, index) => {
        const isExpanded = expandedTopics.includes(index);
        return (
          <section key={index}>
            <button onClick={() => toggleTopic(index)} className="bs-chapter" aria-expanded={isExpanded}>
              <span className="flex-1">
                {index + 1}. {topic.title}
              </span>
              <ChevronDown
                className={`h-4 w-4 shrink-0 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
              />
            </button>
            <div className="bs-chapter-rule" />

            {isExpanded && (
              <div className="pb-2">
                <p className="bs-muted pl-3 text-[11px] italic">{topic.description}</p>
                {topic.subTopics.map((sub, subIndex) => {
                  const hasContent = topicSlug ? hasSubTopicContent(topicSlug, sub.title) : false;
                  return hasContent ? (
                    <Link
                      key={subIndex}
                      to={`/machine/${topicSlug}/topics/${encodeURIComponent(sub.title)}`}
                      className="bs-entry"
                    >
                      <span className="bs-entry-label">{sub.title}</span>
                      <span className="bs-leader" aria-hidden="true" />
                      <span className="bs-anchor" aria-hidden="true">⚓</span>
                    </Link>
                  ) : (
                    <div key={subIndex} className="bs-entry opacity-50">
                      <span className="bs-entry-label">{sub.title}</span>
                      <span className="bs-leader" aria-hidden="true" />
                      <span className="bs-note">yakında</span>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        );
      })}

      <div className="bs-section">Hızlı Erişim</div>
      {lessonData.resources.map((resource, index) => (
        <Link key={index} to={resource.href} className="bs-entry">
          <span className="bs-entry-label">{resource.title}</span>
          <span className="bs-leader" aria-hidden="true" />
          <span className="bs-anchor" aria-hidden="true">⚓</span>
        </Link>
      ))}
    </BookSheet>
  );
}
