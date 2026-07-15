import { useParams, Link } from "react-router-dom";
import { calculationCategories } from "@/data/calculationCenterConfig";
import { getBetaTopicTitles } from "@/data/betaLessons";
import { getLessonFlowsByTopic } from "@/data/lessonFlow";
import { getScenariosByTopic } from "@/data/scenarios";
import { BookOpen, Play } from "lucide-react";
import { BookSheet } from "@/components/book/BookSheet";

/**
 * "Alıştırmalar" — bir kategorinin (güverte veya makine) konu listesi.
 * Rehberli (Duolingo) dersleri, senaryoları ve tüm konu anlatımlarını sunar.
 * İçerik mevcut veri kaynağından (read-only, normalize) gelir.
 */
export default function ExerciseTopicsPage() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const category = calculationCategories.find((c) => c.id === categoryId);
  const readingTitles = getBetaTopicTitles(categoryId);
  const flows = getLessonFlowsByTopic(categoryId);
  const flowTitles = new Set(flows.map((f) => f.topicTitle));
  const scenarios = getScenariosByTopic(categoryId);

  if (!category) {
    return (
      <BookSheet title="ALIŞTIRMALAR">
        <p className="bs-muted py-10 text-center text-sm italic">Kategori bulunamadı</p>
      </BookSheet>
    );
  }

  const detailLink = (title: string) =>
    `/exercises/${categoryId}/topics/${encodeURIComponent(title)}`;
  const learnLink = (title: string) =>
    `/exercises/${categoryId}/topics/${encodeURIComponent(title)}/learn`;

  return (
    <BookSheet title="ALIŞTIRMALAR">
      <h1 className="bs-h2 text-center" style={{ borderBottom: "none" }}>{category.title}</h1>
      <div className="bs-fleuron" aria-hidden="true">❦</div>

      {/* Senaryolar */}
      {scenarios.length > 0 && (
        <Link to={`/exercises/${categoryId}/scenarios`} className="bs-entry">
          <span className="bs-entry-label font-semibold">Vardiya Senaryoları</span>
          <span className="bs-leader" aria-hidden="true" />
          <span className="bs-anchor" aria-hidden="true">⚓</span>
        </Link>
      )}

      {/* Rehberli dersler (Duolingo akışı yazılmış konular) */}
      {flows.length > 0 && (
        <section>
          <div className="bs-section">Rehberli Dersler</div>
          {flows.map((flow) => (
            <div key={flow.topicTitle} className="border-b border-dotted border-[rgba(120,80,20,.35)] py-2.5 pl-3 last:border-b-0">
              <p className="font-semibold">{flow.topicTitle}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                <Link to={learnLink(flow.topicTitle)} className="bs-btn">
                  <Play className="h-3.5 w-3.5" /> Öğrenmeye Başla
                </Link>
                <Link to={detailLink(flow.topicTitle)} className="bs-btn--ghost">
                  <BookOpen className="h-3.5 w-3.5" /> Oku
                </Link>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Tüm konu anlatımları (read-only içerik) */}
      {readingTitles.length > 0 ? (
        <section>
          <div className="bs-section">Tüm Konu Anlatımları ({readingTitles.length})</div>
          {readingTitles.map((title) => (
            <Link key={title} to={detailLink(title)} className="bs-entry">
              <span className="bs-entry-label">{title}</span>
              <span className="bs-leader" aria-hidden="true" />
              {flowTitles.has(title) ? (
                <span className="bs-note">rehberli</span>
              ) : (
                <span className="bs-anchor" aria-hidden="true">⚓</span>
              )}
            </Link>
          ))}
        </section>
      ) : (
        <p className="bs-muted py-6 text-center text-sm italic">
          Bu kategori için konu anlatımı içeriği yakında eklenecek. Şimdilik klasik Dersler
          bölümündeki formül, hesaplama, kural ve quizleri kullanabilirsiniz.
        </p>
      )}
    </BookSheet>
  );
}
