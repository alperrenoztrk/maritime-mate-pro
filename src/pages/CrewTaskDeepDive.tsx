import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BookOpen, Loader2 } from "lucide-react";
import { crewRoleMap } from "@/data/crewHierarchy";
import { crewRoleDetails } from "@/data/crewRoleDetails";
import { loadCrewTaskLongForm, type CrewTaskLongForm } from "@/data/crewTasks/types";
import { BookSheet } from "@/components/book/BookSheet";
import { BookLongFormChapters } from "@/components/book/BookLongFormChapters";

export default function CrewTaskDeepDive() {
  const { roleSlug, taskIndex } = useParams<{ roleSlug: string; taskIndex: string }>();
  const index = Number(taskIndex);
  const role = roleSlug ? crewRoleMap[roleSlug] : undefined;
  const task = roleSlug ? crewRoleDetails[roleSlug]?.tasks[index] : undefined;
  const [content, setContent] = useState<CrewTaskLongForm | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!roleSlug || Number.isNaN(index)) return;
    setLoading(true);
    loadCrewTaskLongForm(roleSlug, index)
      .then(setContent)
      .catch(() => setContent(null))
      .finally(() => setLoading(false));
  }, [roleSlug, index]);

  if (!role || !task) {
    return (
      <BookSheet title="GEMİ PERSONELİ">
        <p className="bs-muted py-10 text-center text-sm italic">Görev bulunamadı</p>
      </BookSheet>
    );
  }

  return (
    <BookSheet title="GEMİ PERSONELİ">
      <header>
        <p className="bs-topic-kicker inline-flex items-center gap-2">
          <BookOpen className="h-4 w-4" aria-hidden="true" /> Detaylı Anlatım
        </p>
        <h1 className="bs-h2">{task.title}</h1>
        {content && <p className="bs-muted text-right text-xs">Yaklaşık {content.estimatedPages} basılı sayfa</p>}
      </header>

      {loading && (
        <div className="bs-muted flex items-center justify-center gap-2 p-8 text-sm italic">
          <Loader2 className="h-4 w-4 animate-spin" /> İçerik yükleniyor…
        </div>
      )}

      {!loading && !content && (
        <section className="bs-callout">
          <span className="bs-callout-label">Özet</span>
          <p>{task.description}</p>
        </section>
      )}

      {content && <BookLongFormChapters content={content} />}
    </BookSheet>
  );
}
