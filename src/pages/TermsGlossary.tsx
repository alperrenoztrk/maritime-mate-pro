import type { CSSProperties } from "react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, BookMarked, Search } from "lucide-react";
import glossaryData from "@/data/termsGlossary/core_pack_batch_1.json";

type GlossaryCategory = {
  id: string;
  name_tr: string;
  description_tr: string;
};

type GlossaryTerm = {
  id: string;
  term_tr: string;
  term_en?: string;
  category_id: string;
  subtopic_tr: string;
  short_definition_tr: string;
  long_definition_tr: string;
};

const categories = glossaryData.categories as GlossaryCategory[];
const terms = glossaryData.terms as GlossaryTerm[];

export default function TermsGlossary() {
  const highRefreshRateStyles: CSSProperties = {
    ["--frame-rate" as string]: "120",
    ["--animation-duration" as string]: "8.33ms",
    ["--transition-duration" as string]: "16.67ms",
  };
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [query, setQuery] = useState("");

  const filteredTerms = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return terms.filter((term) => {
      if (activeCategory !== "all" && term.category_id !== activeCategory) {
        return false;
      }
      if (!normalizedQuery) {
        return true;
      }
      const searchPool = [
        term.term_tr,
        term.term_en,
        term.subtopic_tr,
        term.short_definition_tr,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return searchPool.includes(normalizedQuery);
    });
  }, [activeCategory, query]);

  return (
    <div
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 px-4 py-8 dark:from-[hsl(220,50%,6%)] dark:via-[hsl(220,50%,8%)] dark:to-[hsl(220,50%,10%)]"
      data-no-translate
      style={highRefreshRateStyles}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/4 h-48 w-48 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute top-10 right-10 h-56 w-56 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-sky-400/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col gap-6">
        <header className="space-y-3 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground backdrop-blur">
            Hesaplama Merkezi
          </div>
          <h1 className="text-2xl font-bold text-foreground">Terimler Sözlüğü</h1>
          <p className="text-sm text-muted-foreground">
            Denizcilik hesaplarında sık geçen temel terimleri hızlıca gözden geçirin.
          </p>
          <div className="flex justify-center">
            <Link
              to="/calculations"
              className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/80 px-4 py-2 text-xs font-semibold text-foreground shadow-sm transition hover:border-primary/40 hover:bg-card"
            >
              <ArrowLeft className="h-4 w-4" />
              Geri
            </Link>
          </div>
        </header>

        <section className="flex flex-col gap-4 rounded-2xl border border-border/60 bg-card/70 p-4 shadow-sm backdrop-blur">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setActiveCategory("all")}
                className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
                  activeCategory === "all"
                    ? "border-primary/40 bg-primary/10 text-primary"
                    : "border-border/60 bg-card/80 text-foreground"
                }`}
              >
                Tümü
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setActiveCategory(category.id)}
                  className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
                    activeCategory === category.id
                      ? "border-primary/40 bg-primary/10 text-primary"
                      : "border-border/60 bg-card/80 text-foreground"
                  }`}
                >
                  {category.name_tr}
                </button>
              ))}
            </div>
            <div className="relative w-full md:w-72">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Terim veya alt konu ara..."
                className="w-full rounded-full border border-border/60 bg-card/80 py-2 pl-9 pr-3 text-sm text-foreground shadow-sm transition focus:border-primary/50 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            {filteredTerms.map((term) => (
              <article
                key={term.id}
                className="rounded-2xl border border-border/60 bg-card/80 p-4 shadow-sm backdrop-blur transition hover:border-primary/30 hover:bg-card"
              >
                <div className="flex items-start gap-3">
                  <span className="mt-1 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 via-sky-500 to-blue-600 text-white shadow-lg">
                    <BookMarked className="h-5 w-5" />
                  </span>
                  <div className="space-y-2">
                    <div>
                      <h2 className="text-lg font-semibold text-foreground">{term.term_tr}</h2>
                      {term.term_en && (
                        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                          {term.term_en}
                        </p>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{term.short_definition_tr}</p>
                    <div className="rounded-xl border border-border/50 bg-card/60 px-3 py-2 text-xs text-muted-foreground">
                      <span className="font-semibold text-foreground">{term.subtopic_tr}</span> alt konusu
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
