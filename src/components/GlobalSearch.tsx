import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X, Clock, Loader2 } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { searchIndex, type SearchItem } from "@/data/searchIndex";
import { loadDeepSearchIndex, getDeepSearchIndex } from "@/data/deepSearchIndex";
import { cn } from "@/lib/utils";

const CATEGORY_COLORS: Record<string, string> = {
  "Seyir": "bg-blue-500/15 text-blue-400",
  "Stabilite": "bg-emerald-500/15 text-emerald-400",
  "Meteoroloji": "bg-amber-500/15 text-amber-400",
  "Kargo": "bg-orange-500/15 text-orange-400",
  "Güvenlik": "bg-red-500/15 text-red-400",
  "Makine": "bg-slate-500/15 text-slate-400",
  "Çevre": "bg-green-500/15 text-green-400",
  "Hesaplamalar": "bg-purple-500/15 text-purple-400",
  "Dersler": "bg-cyan-500/15 text-cyan-400",
  "Operasyonlar": "bg-pink-500/15 text-pink-400",
  "Sözlük": "bg-indigo-500/15 text-indigo-400",
  "Gemicilik": "bg-teal-500/15 text-teal-400",
  "Personel": "bg-rose-500/15 text-rose-400",
  "İletişim": "bg-sky-500/15 text-sky-400",
  "Ekonomi": "bg-lime-500/15 text-lime-400",
  "Genel": "bg-muted text-muted-foreground",
};

const RECENT_KEY = "maritime-global-search-recent";
const RECENT_LIMIT = 6;
const RESULT_LIMIT = 20;

// Single-character replacements only, so normalized strings keep the same
// length/indices as the original — this is what makes highlighting work.
// "İ"/"I" are folded before toLowerCase(): plain toLowerCase("İ") yields
// "i" + a combining dot (two code units), which would break both matching
// and the index mapping.
function normalize(str: string) {
  return str
    .replace(/İ/g, "i").replace(/I/g, "i")
    .toLowerCase()
    .replace(/ç/g, "c").replace(/ğ/g, "g").replace(/ı/g, "i")
    .replace(/ö/g, "o").replace(/ş/g, "s").replace(/ü/g, "u")
    .replace(/â/g, "a").replace(/î/g, "i").replace(/û/g, "u");
}

function tokenize(query: string): string[] {
  return normalize(query).split(/\s+/).filter(Boolean);
}

/**
 * Scores one item against the query tokens. Every token must match at least
 * one field, otherwise the item is discarded (score 0). Title matches weigh
 * the most, then keywords, category and description.
 */
function matchScore(item: SearchItem, tokens: string[]): number {
  const title = normalize(item.title);
  const desc = normalize(item.description || "");
  const cat = normalize(item.category);
  const kw = (item.keywords || []).map(normalize).join(" ");

  let total = 0;
  for (const token of tokens) {
    let score = 0;
    if (title === token) score = 100;
    else if (title.startsWith(token)) score = 80;
    else if (title.includes(` ${token}`)) score = 65;
    else if (title.includes(token)) score = 55;
    else if (kw.includes(token)) score = 35;
    else if (cat.includes(token)) score = 25;
    else if (desc.includes(token)) score = 15;
    if (score === 0) return 0;
    total += score;
  }
  // Prefer short titles when scores tie ("GM" over "GM Hesaplama Yöntemleri").
  return total - Math.min(title.length, 40) / 40;
}

/** Merges overlapping [start, end) ranges of the matched tokens. */
function matchRanges(title: string, tokens: string[]): Array<[number, number]> {
  const normalized = normalize(title);
  const ranges: Array<[number, number]> = [];
  for (const token of tokens) {
    const start = normalized.indexOf(token);
    if (start >= 0) ranges.push([start, start + token.length]);
  }
  ranges.sort((a, b) => a[0] - b[0]);
  const merged: Array<[number, number]> = [];
  for (const range of ranges) {
    const last = merged[merged.length - 1];
    if (last && range[0] <= last[1]) last[1] = Math.max(last[1], range[1]);
    else merged.push([...range] as [number, number]);
  }
  return merged;
}

function HighlightedTitle({ title, tokens }: { title: string; tokens: string[] }) {
  const ranges = useMemo(() => matchRanges(title, tokens), [title, tokens]);
  if (ranges.length === 0) return <>{title}</>;
  const parts: React.ReactNode[] = [];
  let cursor = 0;
  ranges.forEach(([start, end], i) => {
    if (start > cursor) parts.push(title.slice(cursor, start));
    parts.push(
      <span key={i} className="text-primary underline decoration-primary/40 underline-offset-2">
        {title.slice(start, end)}
      </span>
    );
    cursor = end;
  });
  if (cursor < title.length) parts.push(title.slice(cursor));
  return <>{parts}</>;
}

function readRecent(): SearchItem[] {
  try {
    const raw = localStorage.getItem(RECENT_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item): item is SearchItem =>
        item && typeof item.title === "string" && typeof item.path === "string"
    );
  } catch {
    return [];
  }
}

function saveRecent(items: SearchItem[]) {
  try {
    localStorage.setItem(RECENT_KEY, JSON.stringify(items));
  } catch {
    // localStorage unavailable (private mode etc.) — recents just won't persist
  }
}

export function GlobalSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [deepIndex, setDeepIndex] = useState<SearchItem[] | null>(getDeepSearchIndex);
  const [recent, setRecent] = useState<SearchItem[]>([]);
  const listRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Keyboard shortcut + global open event
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(true);
      }
    };
    const openHandler = () => setOpen(true);
    window.addEventListener("keydown", handler);
    window.addEventListener("open-global-search", openHandler);
    return () => {
      window.removeEventListener("keydown", handler);
      window.removeEventListener("open-global-search", openHandler);
    };
  }, []);

  // The content-level index is heavy, so it is only fetched the first time
  // the dialog opens; afterwards it stays cached for the whole session.
  useEffect(() => {
    if (!open) return;
    setRecent(readRecent());
    if (!deepIndex) {
      let cancelled = false;
      loadDeepSearchIndex().then(items => {
        if (!cancelled) setDeepIndex(items);
      });
      return () => {
        cancelled = true;
      };
    }
  }, [open, deepIndex]);

  const tokens = useMemo(() => tokenize(query), [query]);

  const results = useMemo(() => {
    if (tokens.length === 0) return searchIndex.slice(0, 8);
    const pool = deepIndex ? [...searchIndex, ...deepIndex] : searchIndex;
    return pool
      .map(item => ({ item, score: matchScore(item, tokens) }))
      .filter(r => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, RESULT_LIMIT)
      .map(r => r.item);
  }, [tokens, deepIndex]);

  const showRecent = tokens.length === 0 && recent.length > 0;

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Keep the keyboard-selected row visible while navigating with arrows.
  useEffect(() => {
    listRef.current
      ?.querySelector(`[data-index="${selectedIndex}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [selectedIndex]);

  const handleSelect = useCallback((item: SearchItem) => {
    setOpen(false);
    setQuery("");
    const entry: SearchItem = {
      title: item.title,
      path: item.path,
      category: item.category,
      description: item.description,
    };
    const updated = [entry, ...readRecent().filter(r => r.path !== item.path)].slice(0, RECENT_LIMIT);
    saveRecent(updated);
    setRecent(updated);
    navigate(item.path);
  }, [navigate]);

  // With recents visible, keyboard indices run through recents first, then results.
  const navigableItems = showRecent ? [...recent, ...results] : results;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex(i => Math.min(i + 1, navigableItems.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex(i => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && navigableItems[selectedIndex]) {
      handleSelect(navigableItems[selectedIndex]);
    }
  };

  const renderRow = (item: SearchItem, index: number, isRecent = false) => (
    <button
      key={`${isRecent ? "recent-" : ""}${item.path}`}
      data-index={index}
      onClick={() => handleSelect(item)}
      onMouseEnter={() => setSelectedIndex(index)}
      className={cn(
        "flex items-center gap-3 w-full rounded-lg px-3 py-2.5 text-left text-sm transition-colors",
        index === selectedIndex
          ? "bg-accent text-accent-foreground"
          : "text-foreground hover:bg-accent/50"
      )}
    >
      {isRecent && <Clock className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />}
      <span className="flex-1 min-w-0">
        <span className="block font-medium truncate">
          {tokens.length > 0 && !isRecent
            ? <HighlightedTitle title={item.title} tokens={tokens} />
            : item.title}
        </span>
        {item.description && (
          <span className="block text-xs text-muted-foreground truncate">
            {item.description}
          </span>
        )}
      </span>
      <span className={cn(
        "shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium",
        CATEGORY_COLORS[item.category] || CATEGORY_COLORS["Genel"]
      )}>
        {item.category}
      </span>
    </button>
  );

  return (
    <>
      {/* Search trigger button */}
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-xl border border-border/50 bg-card/60 backdrop-blur-sm px-3 py-2 text-sm text-muted-foreground hover:bg-accent/50 transition-colors w-full"
      >
        <Search className="h-4 w-4 shrink-0" />
        <span className="flex-1 text-left truncate">Sayfa, hesaplama veya konu ara…</span>
        <kbd className="hidden sm:inline-flex h-5 items-center rounded border border-border/50 bg-muted/50 px-1.5 text-[10px] font-mono text-muted-foreground">
          ⌘K
        </kbd>
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="p-0 gap-0 max-w-lg overflow-hidden bg-card/95 backdrop-blur-xl border-border/50">
          <div className="flex items-center border-b border-border/30 px-3">
            <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
            <Input
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Sayfa, konu, terim veya düğüm ara…"
              className="border-0 bg-transparent focus-visible:ring-0 h-12 text-base"
              autoFocus
            />
            {query && (
              <button onClick={() => setQuery("")} className="text-muted-foreground hover:text-foreground">
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <div ref={listRef} className="max-h-[60vh] overflow-y-auto p-2">
            {showRecent && (
              <>
                <p className="px-3 pt-1 pb-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Son aramalar
                </p>
                <div className="space-y-0.5">
                  {recent.map((item, i) => renderRow(item, i, true))}
                </div>
                <p className="px-3 pt-3 pb-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Öneriler
                </p>
              </>
            )}
            {results.length === 0 && !showRecent ? (
              <div className="py-8 text-center text-sm text-muted-foreground">
                {tokens.length > 0 && !deepIndex ? "İçerik dizini yükleniyor…" : "Sonuç bulunamadı"}
              </div>
            ) : (
              <div className="space-y-0.5">
                {results.map((item, i) => renderRow(item, showRecent ? recent.length + i : i))}
              </div>
            )}
          </div>
          <div className="border-t border-border/30 px-3 py-2 flex items-center gap-4 text-[10px] text-muted-foreground">
            <span>↑↓ gezin</span>
            <span>↵ aç</span>
            <span>esc kapat</span>
            {open && !deepIndex && (
              <span className="ml-auto flex items-center gap-1">
                <Loader2 className="h-3 w-3 animate-spin" />
                İçerik dizini yükleniyor
              </span>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
