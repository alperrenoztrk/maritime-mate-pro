import { useParams, useSearchParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { shipSystemsData } from "@/data/shipSystemsData";
import { MobileLayout } from "@/components/MobileLayout";
import { BookOpen, ChevronRight } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";


export default function ShipSystemDetailPage() {
  const { sectionId } = useParams<{ sectionId: string }>();
  const [searchParams] = useSearchParams();
  const initialTopic = (() => {
    const t = parseInt(searchParams.get("topic") ?? "", 10);
    return Number.isFinite(t) && t >= 0 ? t : 0;
  })();

  useEffect(() => {
    // A deep link only positions the requested topic in the list; the narration
    // itself opens on its own page when the reader taps the title.
    const id = requestAnimationFrame(() => {
      const el = document.getElementById(`ship-topic-${initialTopic}`);
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    return () => cancelAnimationFrame(id);
  }, [initialTopic, sectionId]);

  const section = sectionId ? shipSystemsData[sectionId] : null;

  if (!section) {
    return (
      <MobileLayout>
        <div className="flex min-h-screen items-center justify-center bg-background">
          <p className="text-muted-foreground">İçerik bulunamadı.</p>
        </div>
      </MobileLayout>
    );
  }

  return (
    <MobileLayout>
      <div className="mx-auto min-h-screen max-w-2xl space-y-4 pb-24">
        <PageHeader title={section.title} icon={BookOpen} />
        <div className="space-y-3">
          {/* Liste yalnız başlık taşır: tanım, sistem zinciri, izleme, arıza ve
              kayıt blokları konunun detaylı anlatımındaki "Summary" bölümünde
              tek kaynaktan okunur. */}
          {section.topics.map((topic, idx) => (
            <Link
              key={idx}
              id={`ship-topic-${idx}`}
              to={`/ship-systems/${sectionId}/${idx}`}
              className="surface-2 flex min-h-14 w-full scroll-mt-20 items-center gap-3 rounded-xl border p-4 text-left transition-[background-color,border-color,transform] duration-control ease-out-ios hover:border-primary/30 active:scale-[0.99]"
            >
              <BookOpen className="h-4 w-4 shrink-0 text-primary" />
              <span className="flex-1 text-sm font-semibold text-foreground">{topic.title}</span>
              <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
            </Link>
          ))}
        </div>
      </div>
    </MobileLayout>
  );
}
