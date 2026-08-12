import { getCalculatorEntries } from "@/data/courseContent";
import type { CourseTopic } from "@/data/courseContent/types";
import { CalculatorCard } from "./CalculatorCard";

/**
 * Konunun hesaplayıcı taşıyan girdilerini listeler. Aynı kaynaktan
 * (Formüller ile birebir) beslenir; her aracın `id`'si anchor olarak
 * kullanılır (Formüller'"Calculate" link from this anchor'a gider).
 */
export function CalculatorList({ topic }: { topic: CourseTopic }) {
  const entries = getCalculatorEntries(topic);

  if (entries.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        The linked calculator for this topic has not been added yet.
      </p>
    );
  }

  return (
    <div className="grid gap-4">
      {entries.map((entry) => (
        <div key={entry.id} id={entry.id} className="scroll-mt-24">
          <CalculatorCard entry={entry} />
        </div>
      ))}
    </div>
  );
}
