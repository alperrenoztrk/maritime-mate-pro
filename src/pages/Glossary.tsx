import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, X } from "lucide-react";
import { glossaryCategories, glossaryTerms } from "@/data/glossaryTerms";
import { BookSheet } from "@/components/book/BookSheet";

const Glossary = () => {
  // Global search deep-links to a specific term via /glossary?q=<term>;
  // the book's table of contents deep-links to a category via /glossary?cat=<category>
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(() => searchParams.get("q") ?? "");
  const [activeCategory, setActiveCategory] = useState<string | null>(() => {
    const cat = searchParams.get("cat");
    return cat && glossaryCategories.includes(cat) ? cat : null;
  });

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
    <BookSheet title="SÖZLÜK">
      <p className="bs-muted mb-3 text-center text-[11px] italic">
        {glossaryTerms.length} terim · {glossaryCategories.length} kategori
      </p>

      {/* Arama */}
      <div className="relative mb-3">
        <Search className="pointer-events-none absolute left-1 top-1/2 h-4 w-4 -translate-y-1/2 text-[rgba(90,61,20,.6)]" />
        <input
          type="text"
          placeholder="Terim ara…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bs-input"
          aria-label="Sözlükte ara"
        />
        {search && (
          <button
            onClick={() => setSearch("")}
            aria-label="Aramayı temizle"
            className="absolute right-1 top-1/2 -translate-y-1/2 p-1 text-[rgba(90,61,20,.6)] hover:opacity-70"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Kategori çipleri */}
      <div className="mb-3 flex flex-wrap gap-1.5">
        <button
          onClick={() => setActiveCategory(null)}
          className={!activeCategory ? "bs-chip bs-chip--on" : "bs-chip"}
        >
          Tümü ({glossaryTerms.length})
        </button>
        {glossaryCategories.map((cat) => {
          const count = glossaryTerms.filter((t) => t.category === cat).length;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
              className={activeCategory === cat ? "bs-chip bs-chip--on" : "bs-chip"}
            >
              {cat} ({count})
            </button>
          );
        })}
      </div>

      <p className="bs-muted text-[11px] italic">{filteredTerms.length} sonuç gösteriliyor</p>

      {/* Sözlük maddeleri */}
      <dl>
        {filteredTerms.map((term) => (
          <div key={term.title} className="border-b border-dotted border-[rgba(120,80,20,.35)] py-2.5 last:border-b-0">
            <dt className="flex flex-wrap items-baseline gap-x-2">
              <span className="text-sm font-bold">{term.title}</span>
              <span className="bs-muted text-[10px] italic">{term.category}</span>
            </dt>
            <dd className="bs-muted mt-1 text-xs leading-relaxed">{term.description}</dd>
          </div>
        ))}
      </dl>
      {filteredTerms.length === 0 && (
        <p className="bs-muted py-8 text-center text-sm italic">Aradığınız terim bulunamadı.</p>
      )}
    </BookSheet>
  );
};

export default Glossary;
