import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { BookOpenText, Search } from "lucide-react";
import { BackButton } from "@/components/BackButton";
import { glossaryCategories, glossaryTerms } from "@/data/glossaryTerms";

const Glossary = () => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredTerms = useMemo(() => {
    let terms = glossaryTerms;
    if (activeCategory) {
      terms = terms.filter((t) => t.category === activeCategory);
    }
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      terms = terms.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q)
      );
    }
    return terms;
  }, [search, activeCategory]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 px-4 pb-24 py-8 dark:from-[hsl(220,50%,6%)] dark:via-[hsl(220,50%,8%)] dark:to-[hsl(220,50%,10%)]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/4 h-48 w-48 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute top-10 right-10 h-56 w-56 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-sky-400/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-6">
        {/* Header */}
        <header className="space-y-3 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground backdrop-blur">
            Hesaplama Merkezi
          </div>
          <div className="flex items-center justify-center gap-2">
            <BookOpenText className="h-5 w-5 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">Denizcilik Terimleri Sözlüğü</h1>
          </div>
          <p className="text-xs text-muted-foreground">
            {glossaryTerms.length} terim · {glossaryCategories.length} kategori
          </p>
          <div className="flex justify-center">
            <BackButton to="/" variant="pill" label="Ana Sayfa" />
          </div>
        </header>

        {/* Search & Filter */}
        <section className="space-y-3 rounded-2xl border border-border/50 bg-card/60 p-4 backdrop-blur-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Terim ara…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-border/40 bg-background/70 py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCategory(null)}
              className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
                !activeCategory
                  ? "border-primary/40 bg-primary/10 text-primary"
                  : "border-border/50 bg-background/70 text-foreground/80 hover:border-primary/30"
              }`}
            >
              Tümü ({glossaryTerms.length})
            </button>
            {glossaryCategories.map((cat) => {
              const count = glossaryTerms.filter((t) => t.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
                  className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
                    activeCategory === cat
                      ? "border-primary/40 bg-primary/10 text-primary"
                      : "border-border/50 bg-background/70 text-foreground/80 hover:border-primary/30"
                  }`}
                >
                  {cat} ({count})
                </button>
              );
            })}
          </div>
        </section>

        {/* Results */}
        <section className="rounded-2xl border border-border/50 bg-card/60 p-4 backdrop-blur-md">
          <p className="mb-3 text-xs text-muted-foreground">
            {filteredTerms.length} sonuç gösteriliyor
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {filteredTerms.map((term) => (
              <div
                key={term.title}
                className="rounded-2xl border border-border/50 bg-background/80 p-4 shadow-sm"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-border/60 bg-muted/40 px-3 py-1 text-[10px] font-semibold text-muted-foreground">
                    {term.category}
                  </span>
                  <span className="text-sm font-semibold text-foreground">{term.title}</span>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{term.description}</p>
              </div>
            ))}
          </div>
          {filteredTerms.length === 0 && (
            <p className="py-8 text-center text-sm text-muted-foreground">
              Aradığınız terim bulunamadı.
            </p>
          )}
        </section>
      </div>
    </div>
  );
};

export default Glossary;
