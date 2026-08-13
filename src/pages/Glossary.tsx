import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { BookOpenText, SearchX } from "lucide-react";
import { glossaryCategories, glossaryTerms } from "@/data/glossaryTerms";
import { SEO } from "@/components/SEO";
import { EmptyState } from "@/components/state/AppState";
import {
  LibraryEntryCard,
  LibraryPageShell,
  LibrarySearchField,
  LibrarySectionHeading,
} from "@/components/library/LibraryInterface";
import { InsetGroupedList } from "@/components/ui/InsetGroupedList";

const CATEGORY_ACCENTS = [
  "accent-ocean",
  "accent-deep",
  "accent-teal",
  "accent-slate",
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
        description="Maritime glossary: learn maritime concepts quickly with category filters and search."
        path="/glossary"
      />

      <LibrarySearchField
        value={search}
        onChange={updateSearch}
        placeholder="Terim ara…"
        ariaLabel="Denizcilik terimlerinde ara"
      />

      {showCategoryLibrary ? (
        <InsetGroupedList columns={2}>
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
        </InsetGroupedList>
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
                className="surface-1 min-h-11 rounded-xl border px-3 py-2 text-sm font-semibold text-muted-foreground transition-colors duration-control hover:text-foreground"
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
                  className="surface-2 rounded-2xl border p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h2 className="text-sm font-bold text-foreground">{term.title}</h2>
                    <span className="rounded-full bg-muted px-2 py-0.5 text-micro font-semibold text-muted-foreground">
                      {term.category}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-foreground/75">{term.description}</p>
                </article>
              ))}
            </div>
          ) : (
            <EmptyState icon={SearchX} title="Aradığınız terim bulunamadı." />
          )}
        </section>
      )}
    </LibraryPageShell>
  );
};

export default Glossary;
