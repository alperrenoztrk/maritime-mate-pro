import { useParams } from "react-router-dom";
import { getCourseTopic } from "@/data/courseContent";
import { CourseTopicHeader } from "@/components/courseContent/CourseTopicHeader";
import { FormulaList } from "@/components/courseContent/FormulaList";

/**
 * Birleşik Formüller sayfası — tüm güverte ve makine konuları için tek tasarım.
 * Tek kaynak registry'den beslenir; her formülün hesaplayıcısı varsa
 * Hesaplamalar sayfasındaki ilgili araca link verir.
 */
export default function CourseFormulasPage() {
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
    <div className="min-h-screen">
      <div className="container mx-auto max-w-4xl space-y-6 p-4">
        <CourseTopicHeader topic={topic} section="formulas" />

        <FormulaList entries={topic.entries} calcHref={`/lessons/${topic.key}/calculations`} />
      </div>
    </div>
  );
}
