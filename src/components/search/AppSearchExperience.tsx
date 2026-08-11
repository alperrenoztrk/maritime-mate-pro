import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Clock, Loader2, Search, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AppSymbol } from "@/components/ui/AppSymbol";
import { searchIndex, type SearchItem } from "@/data/searchIndex";
import { getDeepSearchIndex, loadDeepSearchIndex } from "@/data/deepSearchIndex";
import {
  dedupeSearchItems,
  displaySearchCategory,
  matchesSearchScope,
  SEARCH_SCOPES,
  type SearchScopeId,
} from "@/lib/appSearch";
import { hapticImpact, hapticSelection } from "@/lib/haptics";
import { cn } from "@/lib/utils";

const RECENT_KEY = "maritime-global-search-recent";
const RECENT_LIMIT = 6;
const RESULT_LIMIT = 20;

function normalize(value: string) {
  return value
    .replace(/İ/g, "i")
    .replace(/I/g, "i")
    .toLowerCase()
    .replace(/ç/g, "c")
    .replace(/ğ/g, "g")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ş/g, "s")
    .replace(/ü/g, "u")
    .replace(/â/g, "a")
    .replace(/î/g, "i")
    .replace(/û/g, "u");
}

function tokenize(query: string) {
  return normalize(query).split(/\s+/).filter(Boolean);
}

function matchScore(item: SearchItem, tokens: string[]) {
  const title = normalize(item.title);
  const description = normalize(item.description || "");
  const category = normalize(item.category);
  const keywords = (item.keywords || []).map(normalize).join(" ");

  let total = 0;
  for (const token of tokens) {
    let score = 0;
    if (title === token) score = 100;
    else if (title.startsWith(token)) score = 80;
    else if (title.includes(` ${token}`)) score = 65;
    else if (title.includes(token)) score = 55;
    else if (keywords.includes(token)) score = 35;
    else if (category.includes(token)) score = 25;
    else if (description.includes(token)) score = 15;
    if (score === 0) return 0;
    total += score;
  }

  return total - Math.min(title.length, 40) / 40;
}

function matchRanges(title: string, tokens: string[]): Array<[number, number]> {
  const normalized = normalize(title);
  const ranges: Array<[number, number]> = [];

  for (const token of tokens) {
    const start = normalized.indexOf(token);
    if (start >= 0) ranges.push([start, start + token.length]);
  }

  ranges.sort((left, right) => left[0] - right[0]);
  return ranges.reduce<Array<[number, number]>>((merged, range) => {
    const last = merged[merged.length - 1];
    if (last && range[0] <= last[1]) last[1] = Math.max(last[1], range[1]);
    else merged.push([...range]);
    return merged;
  }, []);
}

function HighlightedTitle({ title, tokens }: { title: string; tokens: string[] }) {
  const ranges = useMemo(() => matchRanges(title, tokens), [title, tokens]);
  if (ranges.length === 0) return <>{title}</>;

  const parts: React.ReactNode[] = [];
  let cursor = 0;
  ranges.forEach(([start, end], index) => {
    if (start > cursor) parts.push(title.slice(cursor, start));
    parts.push(
      <mark key={index} className="bg-transparent font-semibold text-primary">
        {title.slice(start, end)}
      </mark>,
    );
    cursor = end;
  });
  if (cursor < title.length) parts.push(title.slice(cursor));
  return <>{parts}</>;
}

function readRecent(): SearchItem[] {
  try {
    const parsed = JSON.parse(localStorage.getItem(RECENT_KEY) || "[]");
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item): item is SearchItem =>
        item && typeof item.title === "string" && typeof item.path === "string",
    );
  } catch {
    return [];
  }
}

function saveRecent(items: SearchItem[]) {
  try {
    localStorage.setItem(RECENT_KEY, JSON.stringify(items));
  } catch {
    // Search remains fully functional when storage is unavailable.
  }
}

export function AppSearchExperience({
  variant = "page",
  autoFocus = true,
  onNavigate,
}: {
  variant?: "page" | "sheet";
  autoFocus?: boolean;
  onNavigate?: () => void;
}) {
  const [query, setQuery] = useState("");
  const [activeScope, setActiveScope] = useState<SearchScopeId>("all");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [keyboardNavigation, setKeyboardNavigation] = useState(false);
  const [deepIndex, setDeepIndex] = useState<SearchItem[] | null>(getDeepSearchIndex);
  const [recent, setRecent] = useState<SearchItem[]>(() => readRecent());
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;
    if (!deepIndex) {
      void loadDeepSearchIndex().then((items) => {
        if (!cancelled) setDeepIndex(items);
      });
    }
    return () => {
      cancelled = true;
    };
  }, [deepIndex]);

  useEffect(() => {
    if (autoFocus) window.requestAnimationFrame(() => inputRef.current?.focus());
    const focus = () => inputRef.current?.focus();
    window.addEventListener("focus-app-search", focus);
    return () => window.removeEventListener("focus-app-search", focus);
  }, [autoFocus]);

  const tokens = useMemo(() => tokenize(query), [query]);
  const results = useMemo(() => {
    const pool = deepIndex ? [...searchIndex, ...deepIndex] : searchIndex;
    const ranked = tokens.length === 0
      ? pool.map((item, index) => ({ item, score: pool.length - index }))
      : pool
          .map((item) => ({ item, score: matchScore(item, tokens) }))
          .filter(({ score }) => score > 0)
          .sort((left, right) => right.score - left.score);
    return dedupeSearchItems(ranked.map(({ item }) => item))
      .filter((item) => matchesSearchScope(item, activeScope))
      .slice(0, tokens.length === 0 ? 8 : RESULT_LIMIT);
  }, [activeScope, deepIndex, tokens]);

  const scopedRecent = useMemo(
    () => recent.filter((item) => matchesSearchScope(item, activeScope)),
    [activeScope, recent],
  );
  const showRecent = tokens.length === 0 && scopedRecent.length > 0;
  const recentKeys = useMemo(
    () => new Set(scopedRecent.map((item) => `${item.path}\u0000${item.title}`)),
    [scopedRecent],
  );
  const suggestedResults = showRecent
    ? results.filter((item) => !recentKeys.has(`${item.path}\u0000${item.title}`))
    : results;
  const navigableItems = showRecent ? [...scopedRecent, ...suggestedResults] : suggestedResults;

  useEffect(() => {
    setSelectedIndex(0);
    setKeyboardNavigation(false);
  }, [activeScope, query]);

  useEffect(() => {
    if (!keyboardNavigation) return;
    listRef.current
      ?.querySelector(`[data-search-index="${selectedIndex}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [keyboardNavigation, selectedIndex]);

  const handleSelect = useCallback(
    (item: SearchItem) => {
      const entry: SearchItem = {
        title: item.title,
        path: item.path,
        category: item.category,
        description: item.description,
      };
      const updated = [entry, ...readRecent().filter((recentItem) => recentItem.path !== item.path)]
        .slice(0, RECENT_LIMIT);
      saveRecent(updated);
      setRecent(updated);
      hapticImpact("light");
      onNavigate?.();
      navigate(item.path);
    },
    [navigate, onNavigate],
  );

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setKeyboardNavigation(true);
      setSelectedIndex((index) => Math.min(index + 1, Math.max(0, navigableItems.length - 1)));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setKeyboardNavigation(true);
      setSelectedIndex((index) => Math.max(index - 1, 0));
    } else if (event.key === "Enter" && navigableItems[selectedIndex]) {
      setKeyboardNavigation(true);
      handleSelect(navigableItems[selectedIndex]);
    } else if (event.key === "Escape" && query) {
      setQuery("");
    }
  };

  const renderRow = (item: SearchItem, index: number, isRecent = false) => {
    const selected = keyboardNavigation && index === selectedIndex;
    return (
      <button
        type="button"
        key={`${isRecent ? "recent-" : ""}${item.path}`}
        data-search-index={index}
        onClick={() => handleSelect(item)}
        onMouseEnter={() => {
          setKeyboardNavigation(true);
          setSelectedIndex(index);
        }}
        className={cn(
          "search-result-row group flex min-h-[3.75rem] w-full items-center gap-3 px-3 py-2.5 text-left text-sm transition-colors duration-control",
          selected ? "bg-primary/10" : "hover:bg-foreground/[0.045] active:bg-foreground/[0.07]",
        )}
      >
        <span className="search-result-content flex min-w-0 flex-1 items-center gap-3">
          {isRecent && (
            <AppSymbol name="clock" fallback={Clock} className="h-4 w-4 shrink-0 text-muted-foreground" />
          )}
          <span className="min-w-0 flex-1">
            <span className="block truncate font-medium text-foreground">
              {tokens.length > 0 && !isRecent ? (
                <HighlightedTitle title={item.title} tokens={tokens} />
              ) : (
                item.title
              )}
            </span>
            {item.description && (
              <span className="mt-0.5 block truncate text-caption text-muted-foreground">
                {item.description}
              </span>
            )}
          </span>
        </span>
        <span className="search-result-category shrink-0 rounded-full bg-foreground/[0.055] px-2 py-1 text-micro font-medium text-muted-foreground">
          {displaySearchCategory(item)}
        </span>
      </button>
    );
  };

  return (
    <div
      className={cn(
        "overflow-hidden",
        variant === "page" && "surface-3 rounded-2xl border shadow-elev-1",
      )}
    >
      <div className="flex min-h-14 items-center border-b border-border/60 px-3">
        <AppSymbol name="magnifyingglass" fallback={Search} className="h-5 w-5 shrink-0 text-muted-foreground" />
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ara"
          aria-label="Uygulamada ara"
          autoComplete="off"
          enterKeyHint="search"
          className="h-14 min-w-0 flex-1 border-0 bg-transparent px-3 text-base text-foreground outline-none placeholder:text-muted-foreground focus-visible:outline-none"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            aria-label="Arama metnini temizle"
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors duration-control hover:bg-muted hover:text-foreground"
          >
            <AppSymbol name="xmark" fallback={X} className="h-4 w-4" />
          </button>
        )}
      </div>

      <div
        role="group"
        aria-label="Arama kapsamı"
        className="search-scope-strip flex gap-1 overflow-x-auto border-b border-border/60 px-2 py-1.5"
      >
        {SEARCH_SCOPES.map((scope) => {
          const selected = activeScope === scope.id;
          return (
            <button
              key={scope.id}
              type="button"
              aria-pressed={selected}
              onClick={() => {
                if (!selected) hapticSelection();
                setActiveScope(scope.id);
              }}
              className={cn(
                "min-h-11 shrink-0 rounded-full px-3 text-caption font-semibold transition-[background-color,color] duration-control",
                selected
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-foreground/[0.055] hover:text-foreground",
              )}
            >
              {scope.label}
            </button>
          );
        })}
      </div>

      <div
        ref={listRef}
        className={cn(
          "overflow-y-auto p-2",
          variant === "sheet" ? "max-h-[62svh]" : "max-h-[62svh] sm:max-h-[68svh]",
        )}
      >
        {showRecent && (
          <>
            <div className="flex min-h-9 items-center px-3 pb-1 pt-1">
              <p className="min-w-0 flex-1 text-micro font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                Son kullanılanlar
              </p>
              <button
                type="button"
                onClick={() => {
                  saveRecent([]);
                  setRecent([]);
                  hapticSelection();
                }}
                className="min-h-11 rounded-lg px-2 text-caption font-semibold text-primary"
              >
                Temizle
              </button>
            </div>
            <div className="search-result-group">
              {scopedRecent.map((item, index) => renderRow(item, index, true))}
            </div>
            {suggestedResults.length > 0 && (
              <p className="px-3 pb-1.5 pt-4 text-micro font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                Öneriler
              </p>
            )}
          </>
        )}

        {results.length === 0 && !showRecent ? (
          <div className="flex min-h-48 items-center justify-center px-6 text-center text-sm text-muted-foreground">
            {tokens.length > 0 && !deepIndex
              ? "İçerik dizini yükleniyor…"
              : "Sonuç bulunamadı"}
          </div>
        ) : (
          <div className="search-result-group">
            {suggestedResults.map((item, index) =>
              renderRow(item, showRecent ? scopedRecent.length + index : index),
            )}
          </div>
        )}
      </div>

      <div className="flex min-h-10 items-center border-t border-border/60 px-4 text-micro text-muted-foreground">
        <div className="search-keyboard-hints items-center gap-4" aria-hidden>
          <span>↑↓ gezin</span>
          <span>↵ aç</span>
          <span>esc temizle</span>
        </div>
        {!deepIndex && (
          <span className="ml-auto flex items-center gap-1.5">
            <Loader2 className="h-3 w-3 animate-spin" aria-hidden />
            İçerik dizini yükleniyor
          </span>
        )}
        {deepIndex && (
          <span className="ml-auto" aria-live="polite">
            {navigableItems.length} sonuç
          </span>
        )}
      </div>
    </div>
  );
}
