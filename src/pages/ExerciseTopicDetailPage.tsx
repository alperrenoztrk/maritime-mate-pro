import { Link, useParams } from "react-router-dom";
import { BookOpen, ListChecks } from "lucide-react";
import { getBetaTopic } from "@/data/betaLessons";
import { getExerciseQuestionsForTopic } from "@/data/exerciseQuestionDistribution";
import { topicHref } from "@/data/learningGuide";
import { TopicExerciseQuestionSet } from "@/components/lessons/TopicExerciseQuestionSet";
import { MobileLayout } from "@/components/MobileLayout";
import { PageHeader } from "@/components/layout/PageHeader";

/**
 * Alıştırmalar konu detayı: yalnız o konunun soruları.
 * Konu anlatımı, rehberli öğrenme ve AI eğitmen Konular (Topics) sayfasındadır;
 * burada sadece derse dönüş linki bulunur.
 * URL sabit topic id veya eski başlık içerebilir; sorular her zaman kanonik konu
 * kimliği üzerinden çözülür.
 */
export default function ExerciseTopicDetailPage() {
  const { categoryId, topicTitle } = useParams<{
    categoryId: string;
    topicTitle: string;
  }>();
  const decodedTitleOrId = topicTitle ? decodeURIComponent(topicTitle) : "";
  const content = getBetaTopic(categoryId, decodedTitleOrId);

  if (!categoryId || !decodedTitleOrId || !content) {
    return (
      <MobileLayout>
        <div className="flex min-h-[60svh] items-center justify-center">
          <p className="text-muted-foreground">Topic not found</p>
        </div>
      </MobileLayout>
    );
  }

  const topicQuestions = getExerciseQuestionsForTopic(
    categoryId,
    content.id ?? decodedTitleOrId,
  );
  const lessonHref = topicHref(categoryId, content.id ?? decodedTitleOrId);
  const courseKey = categoryId.replace(/^machine-/, "");
  const questionBankHref = categoryId.startsWith("machine-")
    ? `/machine/${courseKey}/quiz`
    : `/lessons/${courseKey}/quiz`;

  return (
    <MobileLayout>
      <div className="mx-auto flex max-w-4xl flex-col gap-6 pb-24">
        <PageHeader title={content.title} icon={ListChecks} />

        <Link
          to={lessonHref}
          className="inline-flex min-h-11 items-center gap-2 self-start rounded-xl border bg-card px-4 py-2 text-sm font-semibold text-primary"
        >
          <BookOpen className="h-4 w-4" />
          Read the lesson
        </Link>

        {topicQuestions.length > 0 ? (
          <TopicExerciseQuestionSet
            key={content.id}
            topicId={content.id}
            topic={content}
            categoryId={categoryId}
            questions={topicQuestions}
          />
        ) : (
          <section className="space-y-3 rounded-2xl border bg-card p-5 text-center">
            <p className="text-base text-foreground">No exercise questions for this topic yet.</p>
            <Link
              to={questionBankHref}
              className="inline-flex min-h-11 items-center text-sm font-semibold text-primary underline"
            >
              Open the complete course question bank
            </Link>
          </section>
        )}
      </div>
    </MobileLayout>
  );
}
