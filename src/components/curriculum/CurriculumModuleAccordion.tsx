import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronRight } from "lucide-react";
import type { BetaModule } from "@/data/betaLessons";

type CurriculumTopic = BetaModule["topics"][number];

interface CurriculumModuleAccordionProps {
  modules: BetaModule[];
  topicHref: (topic: CurriculumTopic) => string;
}

/**
 * Ders ve alıştırma ekranlarının ortak konu listesi.
 * Modüller girişte kapalıdır, aynı anda tek modül açılır ve konu satırına
 * dokunmak ek buton olmadan doğrudan konu detayını açar.
 */
export function CurriculumModuleAccordion({
  modules,
  topicHref,
}: CurriculumModuleAccordionProps) {
  const [expandedModule, setExpandedModule] = useState<string | null>(null);

  return (
    <section className="space-y-2">
      {modules.map((module, moduleIndex) => {
        const expanded = expandedModule === module.id;
        return (
          <article
            key={module.id}
            className="overflow-hidden rounded-2xl border border-border/60 bg-card/80 shadow-sm backdrop-blur"
          >
            <button
              type="button"
              onClick={() => setExpandedModule(expanded ? null : module.id)}
              className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition hover:bg-muted/40"
              aria-expanded={expanded}
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-xs font-bold text-primary">
                {moduleIndex + 1}
              </span>
              <span className="min-w-0 flex-1 font-semibold text-foreground">{module.title}</span>
              <span className="text-xs font-medium text-muted-foreground">{module.topicCount}</span>
              <ChevronDown
                className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${expanded ? "rotate-180" : ""}`}
              />
            </button>

            {expanded && (
              <div className="grid gap-1 border-t border-border/40 bg-background/30 p-2 sm:grid-cols-2">
                {module.topics.map((topic) => (
                  <Link
                    key={topic.id}
                    to={topicHref(topic)}
                    className="group flex items-center gap-3 rounded-xl px-3 py-3 transition hover:bg-card"
                  >
                    <span className="min-w-0 flex-1 text-sm font-medium leading-snug text-foreground">
                      {topic.title}
                    </span>
                    <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
                  </Link>
                ))}
              </div>
            )}
          </article>
        );
      })}
    </section>
  );
}
