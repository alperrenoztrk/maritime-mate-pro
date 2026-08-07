import { Link } from "react-router-dom";
import { Calculator } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { CourseEntry } from "@/data/courseContent/types";

/**
 * Formül listesi. Girdileri `group`'a göre gruplar ve mevcut makine formül
 * kartı düzeniyle render eder. Bir girdinin hesaplayıcısı varsa, küçük bir
 * "Hesapla" rozeti ile bağ görünür kılınır (calcHref verildiğinde linklenir).
 */
export function FormulaList({
  entries,
  calcHref,
}: {
  entries: CourseEntry[];
  calcHref?: string;
}) {
  const groups = entries.reduce<Record<string, CourseEntry[]>>((acc, e) => {
    (acc[e.group] ??= []).push(e);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      {Object.entries(groups).map(([groupTitle, items]) => (
        <section key={groupTitle} className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">{groupTitle}</h2>
          <div className="grid gap-3">
            {items.map((f) => {
              const hasCalc = typeof f.calculate === "function";
              return (
                <Card key={f.id} className="bg-card/80 backdrop-blur border-border/40">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between gap-2">
                      <CardTitle className="text-sm font-semibold">{f.name}</CardTitle>
                      {hasCalc &&
                        (calcHref ? (
                          <Link
                            to={`${calcHref}#${f.id}`}
                            className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary transition-colors hover:bg-primary/20"
                          >
                            <Calculator className="h-3 w-3" /> Hesapla
                          </Link>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary">
                            <Calculator className="h-3 w-3" /> Hesaplanabilir
                          </span>
                        ))}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="rounded-lg bg-background p-3 text-center font-mono text-base text-primary">
                      <span translate="no" className="notranslate">{f.formula}</span>
                    </div>
                    {f.variables.length > 0 && (
                      <p className="text-xs text-muted-foreground">
                        {f.variables
                          .map((v) => `${v.symbol}: ${v.label}${v.unit ? ` (${v.unit})` : ""}`)
                          .join(", ")}
                      </p>
                    )}
                    {f.note && <p className="text-xs text-muted-foreground italic">{f.note}</p>}
                    {f.source && (
                      <p className="text-[11px] text-muted-foreground">
                        Kaynak: {f.source.code}
                        {f.source.detail ? ` — ${f.source.detail}` : ""}
                      </p>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
