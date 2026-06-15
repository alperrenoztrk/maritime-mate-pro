import { useParams, Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { getCourseTopic } from "@/data/courseContent";
import { CourseTopicHeader } from "@/components/courseContent/CourseTopicHeader";
import { CalculatorList } from "@/components/courseContent/CalculatorList";

/**
 * Birleşik Hesaplamalar sayfası — tüm güverte ve makine konuları için tek
 * tasarım. Formüller sayfasıyla AYNI kaynaktan beslenir (formül-hesaplama bağı).
 */
export default function CourseCalculationsPage() {
  const { topicKey } = useParams<{ topicKey: string }>();
  const topic = getCourseTopic(topicKey);

  if (!topic) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-muted-foreground">Konu bulunamadı</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 dark:from-[hsl(220,50%,6%)] dark:via-[hsl(220,50%,8%)] dark:to-[hsl(220,50%,10%)]">
      <div className="container mx-auto max-w-4xl space-y-6 p-4">
        <CourseTopicHeader topic={topic} section="calculations" />

        {topic.advancedTool && (
          <Link
            to={topic.advancedTool.href}
            className="flex items-center justify-between rounded-xl border border-primary/30 bg-primary/5 px-4 py-3 text-sm transition-colors hover:bg-primary/10"
          >
            <span className="font-medium text-foreground">{topic.advancedTool.label}</span>
            <ArrowRight className="h-4 w-4 text-primary" />
          </Link>
        )}

        <CalculatorList topic={topic} />

        <div className="flex justify-center pt-4">
          <Link
            to="/lessons"
            className="inline-flex items-center gap-2 rounded-full bg-card/60 px-4 py-2 text-xs text-muted-foreground backdrop-blur transition-colors hover:bg-card hover:text-foreground"
          >
            Tüm Derslere Dön
          </Link>
        </div>
      </div>
    </div>
  );
}
