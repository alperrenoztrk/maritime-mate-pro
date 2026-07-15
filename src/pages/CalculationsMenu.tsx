import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Anchor,
  ArrowRight,
  BarChart3,
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
import { BookSheet } from "@/components/book/BookSheet";

/* ─── Types ─── */
type CalcTool = {
  id: string;
  title: string;
  desc: string;
  icon: React.ElementType;
  to: string;
  category: Category;
};

type Category = "all" | "navigation" | "stability" | "machine" | "ship-systems" | "converter";

/* ─── Data ─── */
const FILTERS: { key: Category; label: string }[] = [
  { key: "all", label: "Tümü" },
  { key: "navigation", label: "Navigasyon" },
  { key: "stability", label: "Stabilite" },
  { key: "machine", label: "Makine" },
  { key: "ship-systems", label: "Gemi Sistemleri" },
  { key: "converter", label: "Dönüştürücüler" },
];

const QUICK_TOOLS: CalcTool[] = [
  { id: "draft", title: "Draft Hesabı", desc: "Draft survey hesapları", icon: Ruler, to: "/cargo/calculations/draft-survey", category: "stability" },
  { id: "trim", title: "Stabilite / Trim", desc: "Trim ve stabilite analizi", icon: Scale, to: "/stability/calculations", category: "stability" },
  { id: "fuel", title: "Yakıt Tüketimi", desc: "Sefer yakıt hesaplama", icon: Flame, to: "/machine/fuel-technology/calculations", category: "machine" },
  { id: "voyage", title: "Sefer Süresi", desc: "ETA ve süre hesabı", icon: Timer, to: "/lessons/navigation/calculations", category: "navigation" },
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
      { id: "nav-calc", title: "Seyir Hesapları", desc: "Rota, mesafe, mevki, ETA", icon: Navigation, to: "/lessons/navigation/calculations", category: "navigation" },
      { id: "passage", title: "Passage Plan", desc: "Seyir planı oluşturma", icon: Compass, to: "/passage-plan", category: "navigation" },
      { id: "tides", title: "Gelgit Hesabı", desc: "Gelgit ve onikiler kuralı", icon: BarChart3, to: "/navigation/tide-tutorial", category: "navigation" },
      { id: "seamanship-calc", title: "Gemicilik Hesapları", desc: "UKC, squat, donme dairesi", icon: Droplets, to: "/seamanship/calculations", category: "navigation" },
    ],
  },
  {
    title: "Makine ve Tüketim",
    cat: "machine",
    items: [
      { id: "diesel-engines", title: "Dizel Motorlar", desc: "Güç, devir, performans", icon: Wrench, to: "/machine/diesel-engines/calculations", category: "machine" },
      { id: "thermodynamics", title: "Termodinamik", desc: "Çevrim ve ısı hesapları", icon: Thermometer, to: "/machine/thermodynamics/calculations", category: "machine" },
      { id: "fuel-technology", title: "Yakıt Teknolojisi", desc: "Yakıt tüketim hesapları", icon: Flame, to: "/machine/fuel-technology/calculations", category: "machine" },
      { id: "cooling-hvac", title: "Soğutma & HVAC", desc: "Soğutma ve iklimlendirme", icon: Gauge, to: "/machine/cooling-hvac/calculations", category: "machine" },
      { id: "machine-elements", title: "Makine Elemanları", desc: "Şaft, dişli, kayış", icon: Layers, to: "/machine/machine-elements/calculations", category: "machine" },
      { id: "emissions-machine", title: "Emisyon & Çevre", desc: "CO₂, SOx, NOx hesapları", icon: Flame, to: "/machine/environment-machine/calculations", category: "machine" },
    ],
  },
  {
    title: "Gemi Sistemleri ve Ekipmanları",
    cat: "ship-systems" as Category,
    items: [
      { id: "deck-machinery", title: "Güverte Makineleri", desc: "Vinç, ırgat, mooring winch", icon: Anchor, to: "/ship-systems/deck-machinery", category: "ship-systems" as Category },
      { id: "nav-systems", title: "Seyir Sistemleri ve Cihazları", desc: "Radar, ECDIS, AIS, GPS", icon: Compass, to: "/ship-systems/nav-systems", category: "ship-systems" as Category },
      { id: "main-engine", title: "Ana Makine / Tahrik Sistemi", desc: "Ana motor, şaft, pervane", icon: Wrench, to: "/ship-systems/main-engine", category: "ship-systems" as Category },
      { id: "auxiliary", title: "Yardımcı Makineler", desc: "Jeneratör, kompresör, pompa", icon: Gauge, to: "/ship-systems/auxiliary", category: "ship-systems" as Category },
    ],
  },
  {
    title: "Formüller ve Dönüştürücüler",
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
    <div className="relative border-b border-dotted border-[rgba(120,80,20,.35)]">
      <Link
        to={tool.to}
        onClick={() => addRecent(tool.id)}
        className="bs-entry items-center gap-2 pr-10"
      >
        <tool.icon className="h-4 w-4 shrink-0 text-[#7a5c1a]" strokeWidth={1.8} />
        <span className="bs-entry-label font-semibold">{tool.title}</span>
        <span className="bs-leader" aria-hidden="true" />
        <ArrowRight className="h-3.5 w-3.5 shrink-0 opacity-50" aria-hidden="true" />
      </Link>
      <button
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); onFav(); }}
        className="absolute right-0 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full"
        aria-label={isFav ? `${tool.title} favorilerden çıkar` : `${tool.title} favorilere ekle`}
      >
        <Star className={cn("h-3.5 w-3.5", isFav ? "fill-[#9b6b17] text-[#9b6b17]" : "text-[rgba(90,61,20,.45)]")} />
      </button>
    </div>
  );
}

function ToolRow({ tool, isFav, onFav }: { tool: CalcTool; isFav: boolean; onFav: () => void }) {
  return (
    <div className="relative border-b border-dotted border-[rgba(120,80,20,.3)]">
      <Link
        to={tool.to}
        onClick={() => addRecent(tool.id)}
        className="bs-entry items-center gap-2 pr-16"
      >
        <tool.icon className="h-4 w-4 shrink-0 text-[#7a5c1a]" strokeWidth={1.8} />
        <span className="bs-entry-label font-medium">{tool.title}</span>
        <span className="bs-leader" aria-hidden="true" />
        <ArrowRight className="h-3.5 w-3.5 shrink-0 opacity-45" aria-hidden="true" />
      </Link>
      <button
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); onFav(); }}
        className="absolute right-5 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full"
        aria-label={isFav ? `${tool.title} favorilerden çıkar` : `${tool.title} favorilere ekle`}
      >
        <Star className={cn("h-3 w-3", isFav ? "fill-[#9b6b17] text-[#9b6b17]" : "text-[rgba(90,61,20,.4)]")} />
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
    <BookSheet title="HESAPLAMALAR">
        <div className="mx-auto flex max-w-2xl flex-col gap-5">
          {/* Header */}
          <header className="text-center">
            <h1 className="bs-h2" style={{ borderBottom: "none" }}>Hesaplamalar ve Formüller</h1>
            <div className="bs-fleuron" aria-hidden="true">❦</div>
            <p className="bs-muted text-sm">Araç seçildiğinde kitap açık kalır; sonuçlar yeni bir yaprakta gösterilir.</p>
          </header>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/60" />
            <input
              type="text"
              placeholder="Hesaplama ara…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bs-input"
            />
          </div>

          {/* Filter chips */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={cn("bs-chip shrink-0", filter === f.key && "bs-chip--on")}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Favorites */}
          {favTools.length > 0 && !search && filter === "all" && (
            <section className="space-y-2">
              <div className="flex items-center gap-1.5">
                <Star className="h-3.5 w-3.5 fill-[#9b6b17] text-[#9b6b17]" />
                <h2 className="bs-section mt-0">Favoriler</h2>
              </div>
              <div className="grid gap-x-5 sm:grid-cols-2">
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
                <History className="h-3.5 w-3.5 text-[#7a5c1a]" />
                <h2 className="bs-section mt-0">Son Kullanılan</h2>
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
              <h2 className="bs-section">Hızlı Araçlar</h2>
              <div className="grid gap-x-5 sm:grid-cols-2">
                {filteredQuick.map((t) => (
                  <QuickToolCard key={t.id} tool={t} isFav={favorites.includes(t.id)} onFav={() => handleFav(t.id)} />
                ))}
              </div>
            </section>
          )}

          {/* Categorized sections */}
          {filteredCategories.map((cat) => (
            <section key={cat.title} className="space-y-2">
              <h2 className="bs-section">{cat.title}</h2>
              <div className="space-y-1.5">
                {cat.items.map((t) => (
                  <ToolRow key={t.id} tool={t} isFav={favorites.includes(t.id)} onFav={() => handleFav(t.id)} />
                ))}
              </div>
            </section>
          ))}

          {filteredCategories.length === 0 && filteredQuick.length === 0 && (
            <div className="bs-muted py-12 text-center text-sm">
              Aramanızla eşleşen hesaplama bulunamadı.
            </div>
          )}
        </div>
    </BookSheet>
  );
}
