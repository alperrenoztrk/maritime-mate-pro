import { getCalculatorEntries } from "@/data/courseContent";
import type { CourseTopic } from "@/data/courseContent/types";
import { CalculatorCard } from "./CalculatorCard";

/**
 * Lists the topic entries that carry a calculator. Fed from the same source as
 * the Formulas page (one to one); each tool's `id` is used as an anchor, so the
 * "Calculate" link on the Formulas page jumps straight to it.
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
