import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Anchor,
  ArrowRight,
  BarChart3,
  Clock,
  Compass,
  Droplets,
  Flame,
  Gauge,
  History,
  Layers,
  LifeBuoy,
  Navigation,
  Ruler,
  Scale,
  Search,
  Ship,
  Star,
  Thermometer,
  Timer,
  Wrench,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { MobileLayout } from "@/components/MobileLayout";
import { BottomNavigation } from "@/components/BottomNavigation";

/* ─── Types ─── */
type CalcTool = {
  id: string;
  title: string;
  desc: string;
  icon: React.ElementType;
  to: string;
  category: Category;
};

type Category = "all" | "navigation" | "stability" | "machine" | "converter";

/* ─── Data ─── */
const FILTERS: { key: Category; label: string }[] = [
  { key: "all", label: "Tümü" },
  { key: "navigation", label: "Navigasyon" },
  { key: "stability", label: "Stabilite" },
  { key: "machine", label: "Makine" },
  { key: "converter", label: "Dönüştürücüler" },
];

const QUICK_TOOLS: CalcTool[] = [
  { id: "draft", title: "Draft Hesabı", desc: "Draft survey hesapları", icon: Ruler, to: "/cargo/calculations/draft-survey", category: "stability" },
  { id: "trim", title: "Stabilite / Trim", desc: "Trim ve stabilite analizi", icon: Scale, to: "/stability", category: "stability" },
  { id: "fuel", title: "Yakıt Tüketimi", desc: "Sefer yakıt hesaplama", icon: Flame, to: "/machine-calculations", category: "machine" },
  { id: "voyage", title: "Sefer Süresi", desc: "ETA ve süre hesabı", icon: Timer, to: "/navigation", category: "navigation" },
  { id: "cargo", title: "Yük Dağılımı", desc: "Yük planı ve dağılım", icon: Layers, to: "/cargo/calculations", category: "stability" },
  { id: "converter", title: "Birim Dönüştürücü", desc: "Denizcilik birimleri", icon: Zap, to: "/converter", category: "converter" },
];

const CATEGORIZED: { title: string; cat: Category; items: CalcTool[] }[] = [
  {
    title: "Yük ve Stabilite",
    cat: "stability",
    items: [
      { id: "draft-survey", title: "Draft Survey", desc: "Yükleme/tahliye draft ölçümü", icon: Ruler, to: "/cargo/calculations/draft-survey", category: "stability" },
      { id: "preloading", title: "Ön Yükleme", desc: "Yükleme öncesi hesaplar", icon: Ship, to: "/cargo/calculations/preloading", category: "stability" },
      { id: "ballast", title: "Balast Hesabı", desc: "Balast tankı hesaplamaları", icon: Droplets, to: "/cargo/calculations/ballast", category: "stability" },
      { id: "density", title: "Yoğunluk Düzeltme", desc: "Su yoğunluğu düzeltmeleri", icon: Thermometer, to: "/cargo/calculations/density", category: "stability" },
      { id: "bunker", title: "Bunker Survey", desc: "Yakıt alım ölçümleri", icon: Gauge, to: "/cargo/calculations/bunker", category: "stability" },
      { id: "stability-calc", title: "Stabilite Hesapları", desc: "GM, KG, meyil açısı", icon: Scale, to: "/stability/calculations", category: "stability" },
      { id: "tank", title: "Tank Hesapları", desc: "Tank kapasiteleri ve hacim", icon: Anchor, to: "/tank", category: "stability" },
      { id: "imo-criteria", title: "IMO Kriterleri", desc: "Stabilite onay kriterleri", icon: LifeBuoy, to: "/stability/imo-criteria", category: "stability" },
    ],
  },
  {
    title: "Navigasyon ve Seyir",
    cat: "navigation",
    items: [
      { id: "nav-calc", title: "Seyir Hesapları", desc: "Rota, mesafe, mevki", icon: Navigation, to: "/navigation", category: "navigation" },
      { id: "passage", title: "Passage Plan", desc: "Seyir planı oluşturma", icon: Compass, to: "/passage-plan", category: "navigation" },
      { id: "tides", title: "Gelgit Hesabı", desc: "Gelgit yükseklik tahminleri", icon: BarChart3, to: "/navigation", category: "navigation" },
      { id: "hydrodynamics", title: "Hidrodinamik", desc: "Squat, UKC, hız kaybı", icon: Droplets, to: "/hydrodynamics", category: "navigation" },
    ],
  },
  {
    title: "Makine ve Tüketim",
    cat: "machine",
    items: [
      { id: "engine", title: "Motor Hesapları", desc: "Güç, devir, performans", icon: Wrench, to: "/engine", category: "machine" },
      { id: "machine-calc", title: "Makine Hesaplamaları", desc: "Yakıt, yağ, soğutma", icon: Gauge, to: "/machine-calculations", category: "machine" },
      { id: "emissions", title: "Emisyon Hesabı", desc: "CO₂, SOx, NOx hesapları", icon: Flame, to: "/emissions", category: "machine" },
      { id: "structural", title: "Yapısal Hesaplar", desc: "Gemi yapısı dayanım", icon: Layers, to: "/structural", category: "machine" },
    ],
  },
  {
    title: "Dönüştürücüler",
    cat: "converter",
    items: [
      { id: "unit-conv", title: "Birim Dönüştürücü", desc: "Uzunluk, ağırlık, hacim", icon: Zap, to: "/converter", category: "converter" },
      { id: "nav-formulas", title: "Navigasyon Formülleri", desc: "Seyir formül referansları", icon: Compass, to: "/navigation/formulas", category: "converter" },
      { id: "stab-formulas", title: "Stabilite Formülleri", desc: "Stabilite formül referansları", icon: Scale, to: "/stability/formulas", category: "converter" },
      { id: "cargo-formulas", title: "Draft Survey Std.", desc: "Draft survey standart formüller", icon: Ruler, to: "/cargo/formulas", category: "converter" },
    ],
  },
];

const RECENT_STORAGE_KEY = "marine-expert-recent-calcs";
const FAVORITES_STORAGE_KEY = "marine-expert-fav-calcs";

function getStoredList(key: string): string[] {
  try {
    return JSON.parse(localStorage.getItem(key) || "[]");
  } catch {
    return [];
  }
}

function toggleFavorite(id: string) {
  const favs = getStoredList(FAVORITES_STORAGE_KEY);
  const next = favs.includes(id) ? favs.filter((f) => f !== id) : [id, ...favs].slice(0, 8);
  localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(next));
  return next;
}

function addRecent(id: string) {
  const list = getStoredList(RECENT_STORAGE_KEY).filter((r) => r !== id);
  const next = [id, ...list].slice(0, 6);
  localStorage.setItem(RECENT_STORAGE_KEY, JSON.stringify(next));
}

/* All tools flat */
const ALL_TOOLS: CalcTool[] = [
  ...QUICK_TOOLS,
  ...CATEGORIZED.flatMap((c) => c.items),
].filter((t, i, a) => a.findIndex((x) => x.id === t.id) === i);

function findTool(id: string) {
  return ALL_TOOLS.find((t) => t.id === id);
}

/* ─── Components ─── */
function QuickToolCard({ tool, isFav, onFav }: { tool: CalcTool; isFav: boolean; onFav: () => void }) {
  return (
    <div className="relative">
      <Link
        to={tool.to}
        onClick={() => addRecent(tool.id)}
        className="flex flex-col gap-1.5 rounded-2xl border border-border/30 bg-card/60 p-3.5 backdrop-blur-sm transition-all duration-200 hover:border-primary/30 hover:bg-card/80 active:scale-[0.98]"
      >
        <div className="flex items-center justify-between">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <tool.icon className="h-[18px] w-[18px]" strokeWidth={1.8} />
          </div>
          <ArrowRight className="h-3.5 w-3.5 text-muted-foreground/50" />
        </div>
        <p className="text-[13px] font-semibold leading-tight text-foreground">{tool.title}</p>
        <p className="text-[11px] leading-snug text-muted-foreground">{tool.desc}</p>
      </Link>
      <button
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); onFav(); }}
        className="absolute top-2.5 right-2.5 z-10 rounded-full p-1 transition hover:bg-accent/20"
        aria-label="Favori"
      >
        <Star className={cn("h-3.5 w-3.5", isFav ? "fill-amber-400 text-amber-400" : "text-muted-foreground/40")} />
      </button>
    </div>
  );
}

function ToolRow({ tool, isFav, onFav }: { tool: CalcTool; isFav: boolean; onFav: () => void }) {
  return (
    <div className="relative">
      <Link
        to={tool.to}
        onClick={() => addRecent(tool.id)}
        className="flex items-center gap-3 rounded-xl border border-border/20 bg-card/40 px-3 py-2.5 backdrop-blur-sm transition-all duration-200 hover:border-primary/20 hover:bg-card/60 active:scale-[0.99]"
      >
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <tool.icon className="h-4 w-4" strokeWidth={1.8} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-medium leading-tight text-foreground truncate">{tool.title}</p>
          <p className="text-[11px] leading-snug text-muted-foreground truncate">{tool.desc}</p>
        </div>
        <ArrowRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground/40" />
      </Link>
      <button
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); onFav(); }}
        className="absolute top-1/2 right-8 z-10 -translate-y-1/2 rounded-full p-1 transition hover:bg-accent/20"
        aria-label="Favori"
      >
        <Star className={cn("h-3 w-3", isFav ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30")} />
      </button>
    </div>
  );
}

/* ─── Page ─── */
export default function CalculationsMenu() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<Category>("all");
  const [favorites, setFavorites] = useState<string[]>(() => getStoredList(FAVORITES_STORAGE_KEY));
  const [recents] = useState<string[]>(() => getStoredList(RECENT_STORAGE_KEY));

  const handleFav = (id: string) => setFavorites(toggleFavorite(id));

  const filteredCategories = useMemo(() => {
    const q = search.toLowerCase().trim();
    return CATEGORIZED.map((cat) => ({
      ...cat,
      items: cat.items.filter((item) => {
        const matchCat = filter === "all" || item.category === filter;
        const matchSearch = !q || item.title.toLowerCase().includes(q) || item.desc.toLowerCase().includes(q);
        return matchCat && matchSearch;
      }),
    })).filter((cat) => cat.items.length > 0);
  }, [search, filter]);

  const filteredQuick = useMemo(() => {
    const q = search.toLowerCase().trim();
    return QUICK_TOOLS.filter((item) => {
      const matchCat = filter === "all" || item.category === filter;
      const matchSearch = !q || item.title.toLowerCase().includes(q) || item.desc.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [search, filter]);

  const favTools = favorites.map(findTool).filter(Boolean) as CalcTool[];
  const recentTools = recents.map(findTool).filter(Boolean).slice(0, 4) as CalcTool[];

  return (
    <MobileLayout>
      <div className="relative min-h-screen bg-background px-4 pb-24 pt-6" data-no-translate>
        {/* Subtle ambient */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 left-1/4 h-40 w-40 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute top-32 right-0 h-48 w-48 rounded-full bg-accent/5 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto flex max-w-lg flex-col gap-5">
          {/* Header */}
          <header className="space-y-1">
            <h1 className="text-xl font-bold tracking-tight text-foreground">Hesaplama Merkezi</h1>
            <p className="text-xs text-muted-foreground">Draft, stabilite, yük, rota, zaman ve tüketim hesapları</p>
          </header>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/60" />
            <input
              type="text"
              placeholder="Hesaplama ara…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-border/40 bg-card/60 py-2.5 pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground/50 backdrop-blur-sm transition focus:border-primary/40 focus:outline-none focus:ring-1 focus:ring-primary/20"
            />
          </div>

          {/* Filter chips */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={cn(
                  "shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium transition-all",
                  filter === f.key
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-card/50 text-muted-foreground hover:bg-card/80 border border-border/30"
                )}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Favorites */}
          {favTools.length > 0 && !search && filter === "all" && (
            <section className="space-y-2">
              <div className="flex items-center gap-1.5">
                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Favoriler</h2>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {favTools.slice(0, 4).map((t) => (
                  <QuickToolCard key={t.id} tool={t} isFav onFav={() => handleFav(t.id)} />
                ))}
              </div>
            </section>
          )}

          {/* Recents */}
          {recentTools.length > 0 && !search && filter === "all" && (
            <section className="space-y-2">
              <div className="flex items-center gap-1.5">
                <History className="h-3.5 w-3.5 text-muted-foreground" />
                <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Son Kullanılan</h2>
              </div>
              <div className="space-y-1.5">
                {recentTools.map((t) => (
                  <ToolRow key={t.id} tool={t} isFav={favorites.includes(t.id)} onFav={() => handleFav(t.id)} />
                ))}
              </div>
            </section>
          )}

          {/* Quick tools */}
          {filteredQuick.length > 0 && (
            <section className="space-y-2">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Hızlı Araçlar</h2>
              <div className="grid grid-cols-2 gap-2">
                {filteredQuick.map((t) => (
                  <QuickToolCard key={t.id} tool={t} isFav={favorites.includes(t.id)} onFav={() => handleFav(t.id)} />
                ))}
              </div>
            </section>
          )}

          {/* Categorized sections */}
          {filteredCategories.map((cat) => (
            <section key={cat.title} className="space-y-2">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{cat.title}</h2>
              <div className="space-y-1.5">
                {cat.items.map((t) => (
                  <ToolRow key={t.id} tool={t} isFav={favorites.includes(t.id)} onFav={() => handleFav(t.id)} />
                ))}
              </div>
            </section>
          ))}

          {filteredCategories.length === 0 && filteredQuick.length === 0 && (
            <div className="py-12 text-center text-sm text-muted-foreground">
              Aramanızla eşleşen hesaplama bulunamadı.
            </div>
          )}
        </div>
      </div>
      <BottomNavigation />
    </MobileLayout>
  );
}
