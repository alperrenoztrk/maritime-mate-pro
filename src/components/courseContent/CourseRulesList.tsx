import { ShieldCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { RuleGroup } from "@/data/courseContent/types";

/**
 * Rule list — the same card layout across all topics (carried over from the
 * machine rules page). Each category title + optional source badge + subtitled
 * bullet lists.
 */
export function CourseRulesList({ groups }: { groups: RuleGroup[] }) {
  if (!groups || groups.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        Rules for this topic have not been added yet.
      </p>
    );
  }

  return (
    <div className="space-y-6">
      {groups.map((category, catIdx) => (
        <section key={catIdx} className="space-y-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">{category.title}</h2>
          </div>
          {category.source && (
            <p className="text-micro text-muted-foreground">
              Kaynak: {category.source.code}
              {category.source.detail ? ` — ${category.source.detail}` : ""}
            </p>
          )}
          {category.rules.map((rule, rIdx) => (
            <Card key={rIdx} className="bg-card/80 border-border/40">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold">{rule.subtitle}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1.5">
                  {rule.content.map((item, iIdx) => (
                    <li key={iIdx} className="flex items-start gap-2 text-sm text-foreground">
                      <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </section>
      ))}
    </div>
  );
}
