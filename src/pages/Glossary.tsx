import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { BookOpenText } from "lucide-react";
import { glossaryCategories, glossaryTerms } from "@/data/glossaryTerms";
import { SEO } from "@/components/SEO";
import {
  LibraryEntryCard,
  LibraryPageShell,
  LibrarySearchField,
  LibrarySectionHeading,
} from "@/components/library/LibraryInterface";

const CATEGORY_ACCENTS = [
  "from-cyan-500 via-blue-600 to-indigo-700",
  "from-blue-500 via-indigo-500 to-violet-700",
  "from-teal-500 via-cyan-600 to-blue-700",
  "from-slate-600 via-blue-700 to-indigo-900",
  "from-violet-500 via-purple-600 to-indigo-800",
  "from-emerald-500 via-teal-600 to-cyan-800",
];

const Glossary = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(() => searchParams.get("q") ?? "");
  const [activeCategory, setActiveCategory] = useState<string | null>(() => {
    const category = searchParams.get("cat");
    return category && glossaryCategories.includes(category) ? category : null;
  });

  const updateSearch = (value: string) => {
    setSearch(value);
    const next = new URLSearchParams(searchParams);
    if (value.trim()) next.set("q", value);
    else next.delete("q");
    setSearchParams(next, { replace: true });
  };

  const updateCategory = (category: string | null) => {
    setActiveCategory(category);
    const next = new URLSearchParams(searchParams);
    if (category) next.set("cat", category);
    else next.delete("cat");
    setSearchParams(next, { replace: true });
  };

  const filteredTerms = useMemo(() => {
    let terms = glossaryTerms;
    if (activeCategory) terms = terms.filter((term) => term.category === activeCategory);
    const query = search.trim().toLocaleLowerCase("tr-TR");
    if (query) {
      terms = terms.filter(
        (term) =>
          term.title.toLocaleLowerCase("tr-TR").includes(query) ||
          term.description.toLocaleLowerCase("tr-TR").includes(query),
      );
    }
    return terms;
  }, [activeCategory, search]);

  const showCategoryLibrary = !activeCategory && !search.trim();

  return (
    <LibraryPageShell title="Denizcilik Terimleri Sözlüğü" icon={BookOpenText}>
      <SEO
        title="Mariner's Book — Denizcilik Terimleri Sözlüğü"
        description="Denizcilik terimleri sözlüğü: kategori filtreleri ve arama ile denizcilik kavramlarını hızlıca öğrenin."
        path="/glossary"
      />

      <LibrarySearchField
        value={search}
        onChange={updateSearch}
        placeholder="Terim ara…"
        ariaLabel="Denizcilik terimlerinde ara"
      />

      {showCategoryLibrary ? (
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {glossaryCategories.map((category, index) => (
            <LibraryEntryCard
              key={category}
              title={category}
              icon={BookOpenText}
              accent={CATEGORY_ACCENTS[index % CATEGORY_ACCENTS.length]}
              badge={glossaryTerms.filter((term) => term.category === category).length}
              onClick={() => updateCategory(category)}
            />
          ))}
        </section>
      ) : (
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <LibrarySectionHeading badge={filteredTerms.length}>
              {activeCategory ?? "Arama Sonuçları"}
            </LibrarySectionHeading>
            {activeCategory && (
              <button
                type="button"
                onClick={() => updateCategory(null)}
                className="rounded-xl border border-border/60 bg-card/80 px-3 py-2 text-xs font-semibold text-muted-foreground transition hover:border-primary/40 hover:text-foreground"
              >
                Kategoriler
              </button>
            )}
          </div>

          {filteredTerms.length > 0 ? (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {filteredTerms.map((term) => (
                <article
                  key={term.title}
                  className="rounded-2xl border border-border/50 bg-card/75 p-4 shadow-sm backdrop-blur"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h2 className="text-sm font-bold text-foreground">{term.title}</h2>
                    <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">
                      {term.category}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-foreground/75">{term.description}</p>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-border bg-card/60 px-5 py-12 text-center text-sm text-muted-foreground">
              Aradığınız terim bulunamadı.
            </div>
          )}
        </section>
      )}
    </LibraryPageShell>
  );
};

export default Glossary;
