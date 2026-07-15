import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BookOpen, Loader2 } from "lucide-react";
import { shipTypeMap } from "@/data/shipOperationsData";
import type { DepartmentId } from "@/data/shipOperationsData";
import { loadShipOpLongForm, type ShipOpLongForm } from "@/data/shipOperations/longform/types";
import { BookSheet } from "@/components/book/BookSheet";
import { BookLongFormChapters } from "@/components/book/BookLongFormChapters";

export default function ShipOperationDeepDive() {
  const { shipType, dept, opIndex } = useParams<{ shipType: string; dept: string; opIndex: string }>();
  const index = Number(opIndex);
  const ship = shipType ? shipTypeMap[shipType] : undefined;
  const department = ship?.departments.find((item) => item.id === (dept as DepartmentId));
  const operation = department?.operations[index];
  const [content, setContent] = useState<ShipOpLongForm | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!shipType || !dept || Number.isNaN(index)) return;
    setLoading(true);
    loadShipOpLongForm(shipType, dept, index)
      .then(setContent)
      .catch(() => setContent(null))
      .finally(() => setLoading(false));
  }, [shipType, dept, index]);

  if (!ship || !operation) {
    return (
      <BookSheet title="OPERASYONLAR">
        <p className="bs-muted py-10 text-center text-sm italic">Operasyon bulunamadı</p>
      </BookSheet>
    );
  }

  return (
    <BookSheet title="OPERASYONLAR">
      <header>
        <p className="bs-topic-kicker inline-flex items-center gap-2">
          <BookOpen className="h-4 w-4" aria-hidden="true" /> Detaylı Anlatım
        </p>
        <p className="bs-muted text-xs">{ship.label} · {department?.label}</p>
        <h1 className="bs-h2">{operation.title}</h1>
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
          <p>{operation.purpose}</p>
          {operation.procedure.length > 0 && (
            <ol>{operation.procedure.map((step, stepIndex) => <li key={stepIndex}>{step}</li>)}</ol>
          )}
        </section>
      )}

      {content && <BookLongFormChapters content={content} />}
    </BookSheet>
  );
}
