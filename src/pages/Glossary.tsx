import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { BookOpenText, SearchX } from "lucide-react";
import { glossaryCategories, glossaryTerms } from "@/data/glossaryTerms";
import englishPack from "@/data/glossary-i18n/en.json";
import { useLanguage } from "@/contexts/useLanguage";
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

/**
 * Checked translations of the Dictionary, one file per language. Only terms
 * whose translation was verified are listed; anything missing falls back to the
 * checked English text. The term list is marked translate="no" so the runtime
 * machine translator never rewrites these entries.
 */
interface GlossaryPack {
  categories: Record<string, string>;
  terms: Record<string, [string, string]>;
}

const ENGLISH = englishPack as unknown as GlossaryPack;
const packLoaders = import.meta.glob<{ default: GlossaryPack }>("../data/glossary-i18n/*.json");

const loadPack = async (language: string): Promise<GlossaryPack | null> => {
  const loader = packLoaders[`../data/glossary-i18n/${language}.json`];
  if (!loader) return null;
  try {
    return (await loader()).default;
  } catch {
    return null;
  }
};

const Glossary = () => {
  const { currentLanguage } = useLanguage();
  const [pack, setPack] = useState<GlossaryPack>(ENGLISH);

  useEffect(() => {
    let cancelled = false;
    if (currentLanguage === "en") {
      setPack(ENGLISH);
      return;
    }
    void loadPack(currentLanguage).then((loaded) => {
      if (!cancelled) setPack(loaded ?? ENGLISH);
    });
    return () => {
      cancelled = true;
    };
  }, [currentLanguage]);

  const termText = (title: string, description: string): [string, string] =>
    pack.terms[title] ?? ENGLISH.terms[title] ?? [title, description];
  const categoryText = (category: string): string =>
    pack.categories[category] ?? ENGLISH.categories[category] ?? category;

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
    const query = search.trim().toLocaleLowerCase();
    if (query) {
      // Match the shown text, the English text and the Turkish source, so a
      // term can be found whichever of these the user types.
      terms = terms.filter((term) => {
        const [shownTitle, shownDescription] = termText(term.title, term.description);
        const english = ENGLISH.terms[term.title] ?? ["", ""];
        return [shownTitle, shownDescription, english[0], english[1], term.title, term.description].some((text) =>
          text.toLocaleLowerCase().includes(query),
        );
      });
    }
    return terms;
    // termText depends only on pack, which is listed.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCategory, search, pack]);

  const showCategoryLibrary = !activeCategory && !search.trim();

  return (
    <LibraryPageShell title="Glossary of Maritime Terms" icon={BookOpenText}>
      <SEO
        title="Mariner's Book — Glossary of Maritime Terms"
        description="Maritime glossary: learn maritime concepts quickly with category filters and search."
        path="/glossary"
      />

      <LibrarySearchField
        value={search}
        onChange={updateSearch}
        placeholder="Search term…"
        ariaLabel="Search maritime terms"
      />

      {showCategoryLibrary ? (
        <div translate="no" data-no-translate>
        <InsetGroupedList columns={2}>
          {glossaryCategories.map((category, index) => (
            <LibraryEntryCard
              key={category}
              title={categoryText(category)}
              icon={BookOpenText}
              accent={CATEGORY_ACCENTS[index % CATEGORY_ACCENTS.length]}
              badge={glossaryTerms.filter((term) => term.category === category).length}
              onClick={() => updateCategory(category)}
            />
          ))}
        </InsetGroupedList>
        </div>
      ) : (
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <LibrarySectionHeading badge={filteredTerms.length}>
              {activeCategory ? (
                <span translate="no" data-no-translate>
                  {categoryText(activeCategory)}
                </span>
              ) : (
                "Search Results"
              )}
            </LibrarySectionHeading>
            {activeCategory && (
              <button
                type="button"
                onClick={() => updateCategory(null)}
                className="surface-1 min-h-11 rounded-xl border px-3 py-2 text-sm font-semibold text-muted-foreground transition-colors duration-control hover:text-foreground"
              >
                Categories
              </button>
            )}
          </div>

          {filteredTerms.length > 0 ? (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3" translate="no" data-no-translate>
              {filteredTerms.map((term) => {
                const [shownTitle, shownDescription] = termText(term.title, term.description);
                return (
                  <article
                    key={term.title}
                    className="surface-2 rounded-2xl border p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h2 className="text-sm font-bold text-foreground">{shownTitle}</h2>
                      <span className="rounded-full bg-muted px-2 py-0.5 text-micro font-semibold text-muted-foreground">
                        {categoryText(term.category)}
                      </span>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-foreground/75">{shownDescription}</p>
                  </article>
                );
              })}
            </div>
          ) : (
            <EmptyState icon={SearchX} title="The term you were looking for was not found." />
          )}
        </section>
      )}
    </LibraryPageShell>
  );
};

export default Glossary;
