import { useParams, Link } from "react-router-dom";
import { machineTopicBySlug } from "@/data/machineTopicData";
import { hasSubTopicContent } from "@/data/machineTopicDetailContent";
import { machineTopicLessons } from "@/data/machineTopicLessonData";
import { BookSheet } from "@/components/book/BookSheet";

export default function MachineTopicLessonsPage() {
  const { topicSlug } = useParams<{ topicSlug: string }>();
  const topicConfig = topicSlug ? machineTopicBySlug[topicSlug] : null;
  const lessonData = topicSlug ? machineTopicLessons[topicSlug] : null;
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
        return (
          <section key={index} className="bs-reading-section">
            <h2 className="bs-chapter">{index + 1}. {topic.title}</h2>
            <div className="bs-chapter-rule" />

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
