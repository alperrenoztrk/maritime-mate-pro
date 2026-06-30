import { Lightbulb } from "lucide-react";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SAILOR_KNOTS_BY_ID, type SailorKnot } from "@/data/sailorKnots";

interface KnotCardProps {
  knotId: string;
}

const DIFFICULTY_BADGE: Record<SailorKnot["difficulty"], string> = {
  Kolay: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
  Orta: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
  Zor: "bg-rose-500/15 text-rose-600 dark:text-rose-400",
};

/**
 * One maritime knot rendered as a collapsible accordion item. Fully text-based
 * — names, difficulty, step-by-step instructions, usage, strength loss and a
 * practical tip. No imagery, so every knot looks identical and consistent.
 * Must be rendered inside an <Accordion>.
 */
export default function KnotCard({ knotId }: KnotCardProps) {
  const def = SAILOR_KNOTS_BY_ID[knotId];
  if (!def) return null;

  return (
    <AccordionItem value={def.id} className="border-b border-border/40 last:border-b-0" data-no-translate>
      <AccordionTrigger className="px-3 py-3 hover:no-underline">
        <div className="flex flex-1 flex-wrap items-center gap-x-2 gap-y-1 pr-2 text-left">
          <span className="text-sm font-semibold text-foreground">{def.name}</span>
          <span className="text-[11px] text-muted-foreground">{def.nameEn}</span>
          <span
            className={`ml-auto text-[10px] font-medium px-2 py-0.5 rounded-full ${DIFFICULTY_BADGE[def.difficulty]}`}
          >
            {def.difficulty}
          </span>
        </div>
      </AccordionTrigger>

      <AccordionContent className="px-3">
        {/* Alternate names */}
        {def.aka && def.aka.length > 0 && (
          <div className="mb-3 flex flex-wrap items-center gap-1.5">
            <span className="text-[10px] uppercase tracking-wide text-muted-foreground/70">Diğer adı</span>
            {def.aka.map((name) => (
              <span
                key={name}
                className="rounded-full bg-muted/50 px-2 py-0.5 text-[11px] text-muted-foreground"
              >
                {name}
              </span>
            ))}
          </div>
        )}

        {/* Steps */}
        <ol className="space-y-2.5">
          {def.steps.map((step, i) => (
            <li key={i} className="flex gap-3">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-500/15 text-xs font-semibold text-amber-600 dark:text-amber-400">
                {i + 1}
              </span>
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground">{step.title}</p>
                <p className="text-xs leading-relaxed text-muted-foreground">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>

        {/* Usage note */}
        <div className="mt-3 rounded-lg border border-border/40 bg-muted/20 px-3 py-2">
          <p className="text-xs leading-relaxed text-muted-foreground">
            <span className="font-medium text-foreground">Kullanım: </span>
            {def.use}
            {def.strengthLoss && (
              <span className="ml-1 text-amber-600 dark:text-amber-400">({def.strengthLoss})</span>
            )}
          </p>
        </div>

        {/* Practical tip */}
        {def.tip && (
          <div className="mt-2 flex gap-2 rounded-lg border border-sky-500/30 bg-sky-500/5 px-3 py-2">
            <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-sky-500" />
            <p className="text-xs leading-relaxed text-muted-foreground">
              <span className="font-medium text-foreground">İpucu: </span>
              {def.tip}
            </p>
          </div>
        )}
      </AccordionContent>
    </AccordionItem>
  );
}
