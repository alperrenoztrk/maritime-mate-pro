import { CheckCircle2, XCircle } from "lucide-react";
import type { Criterion } from "@/lib/calc/stability";

/** Pass/fail list; state is shown with an icon and a word, never by colour alone. */
export function CriteriaTable({ title, criteria }: { title: string; criteria: Criterion[] }) {
  const allPass = criteria.every((c) => c.pass);
  return (
    <section className="space-y-2 rounded-xl border border-primary/20 bg-primary/[0.035] p-3" aria-label={title}>
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm font-semibold">{title}</p>
        <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-micro font-semibold ${allPass ? "bg-success/15 text-success" : "bg-destructive/10 text-destructive"}`}>
          {allPass ? <CheckCircle2 className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
          {allPass ? "All criteria met" : "Not met"}
        </span>
      </div>
      <div className="divide-y divide-border/40 rounded-lg border border-border/40 bg-background/65">
        {criteria.map((c) => (
          <div key={c.id} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-3 py-2 text-xs">
            <div>
              <p className="font-medium text-foreground">{c.label}</p>
              <p className="text-micro text-muted-foreground">Required {c.required}</p>
            </div>
            <div className="text-right">
              <p translate="no" className="notranslate font-mono font-semibold text-foreground">{c.actual}</p>
              <p className={`inline-flex items-center gap-1 text-micro font-semibold ${c.pass ? "text-success" : "text-destructive"}`}>
                {c.pass ? <CheckCircle2 className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
                {c.pass ? "Pass" : "Fail"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
