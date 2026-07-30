import { Link, useParams } from "react-router-dom";
import { Lightbulb, Play } from "lucide-react";
import { stripMarkdown } from "@/utils/cleanText";
import { getBetaTopic } from "@/data/betaLessons";
import { getExerciseQuestionsForTopic } from "@/data/exerciseQuestionDistribution";
import { getLessonTopicEnhancement } from "@/data/lessonTopicEnhancements";
import { getLessonFlow } from "@/data/lessonFlow";
import type { QuizQuestion } from "@/types/quiz";
import { LessonEnhancementBlock } from "@/components/lessons/LessonEnhancementBlock";
import { LessonTeachCard } from "@/components/lessons/LessonTeachCard";
import { KnowledgeCheck } from "@/components/lessons/KnowledgeCheck";
import { LessonAITutor } from "@/components/lessons/LessonAITutor";
import { TopicExerciseQuestionSet } from "@/components/lessons/TopicExerciseQuestionSet";

/**
 * Alıştırmalar konu detayı.
 * URL sabit topic id veya eski başlık içerebilir; rehberli akış, enhancement ve
 * eski quiz sorusu eşleşmeleri her zaman kanonik konu kimliği üzerinden çözülür.
 */
export default function ExerciseTopicDetailPage() {
  const { categoryId, topicTitle } = useParams<{
    categoryId: string;
    topicTitle: string;
  }>();
  const decodedTitleOrId = topicTitle ? decodeURIComponent(topicTitle) : "";
  const content = getBetaTopic(categoryId, decodedTitleOrId);
  const sourceTopicTitle = content?.sourceTitle ?? content?.title ?? decodedTitleOrId;
  const enhancement = content
    ? getLessonTopicEnhancement(categoryId, sourceTopicTitle)
    : undefined;
  const flow = content ? getLessonFlow(categoryId, sourceTopicTitle) : undefined;

  if (!categoryId || !decodedTitleOrId || !content) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-muted-foreground">Konu bulunamadı</p>
      </div>
    );
  }

  const topicQuestions = getExerciseQuestionsForTopic(
    categoryId,
    content.id ?? decodedTitleOrId,
  );
  const checkAfter = new Map<string, QuizQuestion>();
  if (flow) {
    for (const block of flow.blocks) {
      const last = block.sectionTitles[block.sectionTitles.length - 1];
      const question = flow.questions.find((item) =>
        block.sectionTitles.includes(item.sectionRef),
      );
      if (last && question) checkAfter.set(last, question);
    }
  }

  const lessonText = [
    content.introduction ?? "",
    ...content.sections.map((section) =>
      [
        section.title,
        section.content,
        ...(section.bulletPoints ?? []),
        section.formula?.text,
        section.example?.problem,
        section.example?.result,
      ]
        .filter(Boolean)
        .join(" "),
    ),
  ].join("\n");

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-10 border-b border-border/40 bg-card/90 px-4 py-3 backdrop-blur sm:px-6 sm:py-4">
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-violet-500/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-violet-600 dark:text-violet-300">
            Beta
          </span>
          <h1 className="text-base font-bold text-foreground sm:text-lg">{content.title}</h1>
          {topicQuestions.length > 0 && (
            <span className="ml-auto rounded-full bg-violet-500/15 px-2.5 py-1 text-[10px] font-semibold text-violet-700 dark:text-violet-300">
              {topicQuestions.length} soru
            </span>
          )}
        </div>
      </div>

      <div className="mx-auto flex max-w-4xl flex-col gap-8 p-4 sm:p-6">
        {content.introduction && (
          <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
            <p className="text-sm leading-relaxed text-foreground/90">
              {stripMarkdown(content.introduction)}
            </p>
          </div>
        )}

        <Link
          to={`/exercises/${categoryId}/topics/${encodeURIComponent(sourceTopicTitle)}/learn`}
          className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-500 to-indigo-600 px-5 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:opacity-90"
        >
          <Play className="h-4 w-4" />
          {flow ? "Öğrenmeye Başla (önce anlat → karışık sor)" : "Rehberli Okumayı Başlat"}
        </Link>

        {content.sections.map((section, index) => {
          const sourceSectionTitle = section.sourceTitle ?? section.title;
          return (
            <div key={section.id ?? `${sourceSectionTitle}-${index}`} className="space-y-6">
              <LessonTeachCard
                section={section}
                categoryId={categoryId}
                topicTitle={content.title}
              />
              {checkAfter.has(sourceSectionTitle) && (
                <KnowledgeCheck question={checkAfter.get(sourceSectionTitle)!} />
              )}
            </div>
          );
        })}

        {enhancement && <LessonEnhancementBlock data={enhancement} />}

        {content.keyPoints && content.keyPoints.length > 0 && (
          <section className="rounded-xl border border-border/40 bg-card/60 p-5">
            <div className="mb-4 flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-amber-500" />
              <h2 className="font-semibold text-foreground">Önemli Noktalar</h2>
            </div>
            <ul className="space-y-2">
              {content.keyPoints.map((point, index) => (
                <li
                  key={`key-point-${index}`}
                  className="flex items-start gap-3 text-sm text-foreground/80"
                >
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">
                    {index + 1}
                  </span>
                  <span>{stripMarkdown(point)}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        <TopicExerciseQuestionSet questions={topicQuestions} />

        <LessonAITutor topicTitle={content.title} lessonText={lessonText} />
      </div>
    </div>
  );
}
