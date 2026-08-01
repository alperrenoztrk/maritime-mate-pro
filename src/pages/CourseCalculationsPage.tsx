import { useParams } from "react-router-dom";
import { getCourseTopic } from "@/data/courseContent";
import { CourseTopicHeader } from "@/components/courseContent/CourseTopicHeader";
import { CalculatorList } from "@/components/courseContent/CalculatorList";
import { CalculationQualityBanner } from "@/components/courseContent/CalculationQualityBanner";

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

        <CalculationQualityBanner />

        <CalculatorList topic={topic} />
      </div>
    </div>
  );
}
