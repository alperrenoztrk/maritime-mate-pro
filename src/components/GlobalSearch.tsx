import { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { searchIndex, type SearchItem } from "@/data/searchIndex";
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
  "Genel": "bg-muted text-muted-foreground",
};

function normalize(str: string) {
  return str
    .toLowerCase()
    .replace(/ç/g, "c").replace(/ğ/g, "g").replace(/ı/g, "i")
    .replace(/ö/g, "o").replace(/ş/g, "s").replace(/ü/g, "u")
    .replace(/â/g, "a");
}

function matchScore(item: SearchItem, query: string): number {
  const q = normalize(query);
  const title = normalize(item.title);
  const desc = normalize(item.description || "");
  const cat = normalize(item.category);
  const kw = (item.keywords || []).map(normalize).join(" ");

  if (title === q) return 100;
  if (title.startsWith(q)) return 80;
  if (title.includes(q)) return 60;
  if (kw.includes(q)) return 40;
  if (cat.includes(q)) return 30;
  if (desc.includes(q)) return 20;
  return 0;
}

export function GlobalSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();

  // Keyboard shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const results = useMemo(() => {
    if (!query.trim()) return searchIndex.slice(0, 8);
    return searchIndex
      .map(item => ({ item, score: matchScore(item, query.trim()) }))
      .filter(r => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 12)
      .map(r => r.item);
  }, [query]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleSelect = useCallback((item: SearchItem) => {
    setOpen(false);
    setQuery("");
    navigate(item.path);
  }, [navigate]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex(i => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex(i => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && results[selectedIndex]) {
      handleSelect(results[selectedIndex]);
    }
  };

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
              placeholder="Ne arıyorsun?"
              className="border-0 bg-transparent focus-visible:ring-0 h-12 text-base"
              autoFocus
            />
            {query && (
              <button onClick={() => setQuery("")} className="text-muted-foreground hover:text-foreground">
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <div className="max-h-[60vh] overflow-y-auto p-2">
            {results.length === 0 ? (
              <div className="py-8 text-center text-sm text-muted-foreground">
                Sonuç bulunamadı
              </div>
            ) : (
              <div className="space-y-0.5">
                {results.map((item, i) => (
                  <button
                    key={item.path}
                    onClick={() => handleSelect(item)}
                    onMouseEnter={() => setSelectedIndex(i)}
                    className={cn(
                      "flex items-center gap-3 w-full rounded-lg px-3 py-2.5 text-left text-sm transition-colors",
                      i === selectedIndex
                        ? "bg-accent text-accent-foreground"
                        : "text-foreground hover:bg-accent/50"
                    )}
                  >
                    <span className="flex-1 font-medium truncate">{item.title}</span>
                    <span className={cn(
                      "shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium",
                      CATEGORY_COLORS[item.category] || CATEGORY_COLORS["Genel"]
                    )}>
                      {item.category}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="border-t border-border/30 px-3 py-2 flex items-center gap-4 text-[10px] text-muted-foreground">
            <span>↑↓ gezin</span>
            <span>↵ aç</span>
            <span>esc kapat</span>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
