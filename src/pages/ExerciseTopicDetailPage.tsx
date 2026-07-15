import { Link, useParams } from "react-router-dom";
import { Play } from "lucide-react";
import { stripMarkdown } from "@/utils/cleanText";
import { getBetaTopic } from "@/data/betaLessons";
import { getLessonTopicEnhancement } from "@/data/lessonTopicEnhancements";
import { getLessonFlow } from "@/data/lessonFlow";
import type { QuizQuestion } from "@/types/quiz";
import { LessonEnhancementBlock } from "@/components/lessons/LessonEnhancementBlock";
import { LessonTeachCard } from "@/components/lessons/LessonTeachCard";
import { KnowledgeCheck } from "@/components/lessons/KnowledgeCheck";
import { LessonAITutor } from "@/components/lessons/LessonAITutor";
import { BookSheet } from "@/components/book/BookSheet";

/**
 * "Alıştırmalar" — konu detayı (güverte + makine, tüm konular).
 * Mevcut anlatım (normalize edilmiş) + bölüm-arası bilgi kontrolü + AI eğitmen.
 * Akış yazılmış konularda "Öğrenmeye Başla" (Duolingo) butonu görünür.
 */
export default function ExerciseTopicDetailPage() {
  const { categoryId, topicTitle } = useParams<{ categoryId: string; topicTitle: string }>();
  const decodedTitle = topicTitle ? decodeURIComponent(topicTitle) : "";
  const content = getBetaTopic(categoryId, decodedTitle);
  const enhancement = getLessonTopicEnhancement(categoryId, decodedTitle);
  const flow = getLessonFlow(categoryId, decodedTitle);

  if (!categoryId || !decodedTitle || !content) {
    return (
      <BookSheet title="ALIŞTIRMALAR">
        <p className="bs-muted py-10 text-center text-sm italic">Konu bulunamadı</p>
      </BookSheet>
    );
  }

  // Bölüm-arası bilgi kontrolü: her bloğun son bölümünden sonra bir soru.
  const checkAfter = new Map<string, QuizQuestion>();
  if (flow) {
    for (const block of flow.blocks) {
      const last = block.sectionTitles[block.sectionTitles.length - 1];
      const q = flow.questions.find((question) => block.sectionTitles.includes(question.sectionRef));
      if (last && q) checkAfter.set(last, q);
    }
  }

  // AI eğitmeni için ders metni (read-only anlatımdan üretilir).
  const lessonText = [
    content.introduction ?? "",
    ...content.sections.map((s) =>
      [s.title, s.content, ...(s.bulletPoints ?? []), s.formula?.text, s.example?.problem, s.example?.result]
        .filter(Boolean)
        .join(" "),
    ),
  ].join("\n");

  return (
    <BookSheet title="ALIŞTIRMALAR">
      <h1 className="bs-h2 text-center" style={{ borderBottom: "none" }}>{content.title}</h1>
      <p className="bs-muted mb-1 text-center text-[10px] italic">Beta</p>
      <div className="bs-fleuron" aria-hidden="true">❦</div>

      <div className="flex flex-col gap-6">
        {content.introduction && (
          <p className="bs-prose italic">{stripMarkdown(content.introduction)}</p>
        )}

        <div className="text-center">
          <Link
            to={`/exercises/${categoryId}/topics/${encodeURIComponent(decodedTitle)}/learn`}
            className="bs-btn"
          >
            <Play className="h-4 w-4" />
            {flow ? "Öğrenmeye Başla (önce anlat → karışık sor)" : "Rehberli Okumayı Başlat"}
          </Link>
        </div>

        {content.sections.map((section, index) => (
          <div key={`${section.title}-${index}`} className="space-y-6">
            <LessonTeachCard section={section} categoryId={categoryId} topicTitle={content.title} />
            {checkAfter.has(section.title) && (
              <KnowledgeCheck question={checkAfter.get(section.title)!} />
            )}
          </div>
        ))}

        {enhancement && <LessonEnhancementBlock data={enhancement} />}

        {content.keyPoints && content.keyPoints.length > 0 && (
          <div className="bs-callout">
            <span className="bs-callout-label">Önemli Noktalar</span>
            <ol className="ml-4 list-decimal">
              {content.keyPoints.map((point, index) => (
                <li key={`key-point-${index}`} className="my-1">{stripMarkdown(point)}</li>
              ))}
            </ol>
          </div>
        )}

        <LessonAITutor topicTitle={content.title} lessonText={lessonText} />
      </div>
    </BookSheet>
  );
}
