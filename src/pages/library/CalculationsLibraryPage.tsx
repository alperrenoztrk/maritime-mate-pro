import { useMemo, useState } from "react";
import {
  Anchor,
  BarChart3,
  ChevronRight,
  Compass,
  Droplets,
  Flame,
  Gauge,
  Layers,
  LifeBuoy,
  Navigation,
  Ruler,
  Scale,
  Ship,
  Star,
  Thermometer,
  Timer,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import { AppSymbol } from "@/components/ui/AppSymbol";
import { InsetGroupedList } from "@/components/ui/InsetGroupedList";
import { hapticImpact, hapticSelection } from "@/lib/haptics";
import {
  LibraryCompactCard,
  LibraryEntryCard,
  LibraryPageShell,
  LibrarySearchField,
  LibrarySectionHeading,
} from "@/components/library/LibraryInterface";
import { accentTone } from "@/components/library/libraryAccent";

interface CalcTool {
  id: string;
  title: string;
  icon: LucideIcon;
  to: string;
  category: Category;
}

type Category = "navigation" | "stability" | "machine" | "ship-systems" | "converter";

const CATEGORY_META: Record<Category, { title: string; icon: LucideIcon; accent: string }> = {
  navigation: { title: "Navigasyon ve Seyir", icon: Compass, accent: "accent-ocean" },
  stability: { title: "Yük ve Stabilite", icon: Scale, accent: "accent-teal" },
  machine: { title: "Makine ve Tüketim", icon: Wrench, accent: "accent-slate" },
  "ship-systems": { title: "Gemi Sistemleri", icon: Anchor, accent: "accent-amber" },
  converter: { title: "Formüller ve Dönüştürücüler", icon: Zap, accent: "accent-deep" },
};

const QUICK_TOOLS: CalcTool[] = [
  { id: "draft", title: "Draft Hesabı", icon: Ruler, to: "/cargo/calculations/draft-survey", category: "stability" },
  { id: "trim", title: "Stabilite / Trim", icon: Scale, to: "/stability/calculations", category: "stability" },
  { id: "fuel", title: "Yakıt Tüketimi", icon: Flame, to: "/machine/fuel-technology/calculations", category: "machine" },
  { id: "voyage", title: "Sefer Süresi", icon: Timer, to: "/lessons/navigation/calculations", category: "navigation" },
  { id: "cargo", title: "Yük Dağılımı", icon: Layers, to: "/cargo/calculations", category: "stability" },
  { id: "converter", title: "Birim Dönüştürücü", icon: Zap, to: "/converter", category: "converter" },
];

const TOOLS: CalcTool[] = [
  { id: "draft-survey", title: "Draft Survey", icon: Ruler, to: "/cargo/calculations/draft-survey", category: "stability" },
  { id: "preloading", title: "Ön Yükleme", icon: Ship, to: "/cargo/calculations/preloading", category: "stability" },
  { id: "ballast", title: "Balast Hesabı", icon: Droplets, to: "/cargo/calculations/ballast", category: "stability" },
  { id: "density", title: "Yoğunluk Düzeltme", icon: Thermometer, to: "/cargo/calculations/density", category: "stability" },
  { id: "bunker", title: "Bunker Survey", icon: Gauge, to: "/cargo/calculations/bunker", category: "stability" },
  { id: "stability-calc", title: "Stabilite Hesapları", icon: Scale, to: "/stability/calculations", category: "stability" },
  { id: "tank", title: "Tank Hesapları", icon: Anchor, to: "/tank", category: "stability" },
  { id: "imo-criteria", title: "IMO Kriterleri", icon: LifeBuoy, to: "/stability/imo-criteria", category: "stability" },
  { id: "nav-calc", title: "Seyir Hesapları", icon: Navigation, to: "/lessons/navigation/calculations", category: "navigation" },
  { id: "passage", title: "Passage Plan", icon: Compass, to: "/passage-plan", category: "navigation" },
  { id: "tides", title: "Gelgit Hesabı", icon: BarChart3, to: "/navigation/tide-tutorial", category: "navigation" },
  { id: "seamanship-calc", title: "Gemicilik Hesapları", icon: Droplets, to: "/seamanship/calculations", category: "navigation" },
  { id: "diesel-engines", title: "Dizel Motorlar", icon: Wrench, to: "/machine/diesel-engines/calculations", category: "machine" },
  { id: "thermodynamics", title: "Termodinamik", icon: Thermometer, to: "/machine/thermodynamics/calculations", category: "machine" },
  { id: "fuel-technology", title: "Yakıt Teknolojisi", icon: Flame, to: "/machine/fuel-technology/calculations", category: "machine" },
  { id: "cooling-hvac", title: "Soğutma ve HVAC", icon: Gauge, to: "/machine/cooling-hvac/calculations", category: "machine" },
  { id: "machine-elements", title: "Makine Elemanları", icon: Layers, to: "/machine/machine-elements/calculations", category: "machine" },
  { id: "emissions-machine", title: "Emisyon ve Çevre", icon: Flame, to: "/machine/environment-machine/calculations", category: "machine" },
  { id: "deck-machinery", title: "Güverte Makineleri", icon: Anchor, to: "/ship-systems/deck-machinery", category: "ship-systems" },
  { id: "nav-systems", title: "Seyir Sistemleri ve Cihazları", icon: Compass, to: "/ship-systems/nav-systems", category: "ship-systems" },
  { id: "main-engine", title: "Ana Makine / Tahrik Sistemi", icon: Wrench, to: "/ship-systems/main-engine", category: "ship-systems" },
  { id: "auxiliary", title: "Yardımcı Makineler", icon: Gauge, to: "/ship-systems/auxiliary", category: "ship-systems" },
  { id: "unit-conv", title: "Birim Dönüştürücü", icon: Zap, to: "/converter", category: "converter" },
  { id: "nav-formulas", title: "Navigasyon Formülleri", icon: Compass, to: "/navigation/formulas", category: "converter" },
  { id: "stab-formulas", title: "Stabilite Formülleri", icon: Scale, to: "/stability/formulas", category: "converter" },
  { id: "cargo-formulas", title: "Draft Survey Standartları", icon: Ruler, to: "/cargo/formulas", category: "converter" },
];

const ALL_TOOLS = [...QUICK_TOOLS, ...TOOLS].filter(
  (tool, index, tools) => tools.findIndex((candidate) => candidate.id === tool.id) === index,
);
const RECENT_STORAGE_KEY = "marine-expert-recent-calcs";
const FAVORITES_STORAGE_KEY = "marine-expert-fav-calcs";

const readStoredList = (key: string) => {
  try {
    return JSON.parse(localStorage.getItem(key) || "[]") as string[];
  } catch {
    return [];
  }
};

const writeRecent = (id: string) => {
  const next = [id, ...readStoredList(RECENT_STORAGE_KEY).filter((item) => item !== id)].slice(0, 6);
  localStorage.setItem(RECENT_STORAGE_KEY, JSON.stringify(next));
};

function ToolCard({
  tool,
  favorite,
  onFavorite,
}: {
  tool: CalcTool;
  favorite: boolean;
  onFavorite: () => void;
}) {
  const meta = CATEGORY_META[tool.category];
  return (
    <div className="ios-list-row calculation-tool-row surface-2 group flex min-h-[4.75rem] items-stretch overflow-hidden rounded-xl border transition-[background-color,border-color,transform] duration-control hover:border-primary/20 active:scale-[0.99]">
      <Link
        to={tool.to}
        onClick={() => {
          writeRecent(tool.id);
          hapticImpact("light");
        }}
        className="calculation-tool-link flex min-w-0 flex-1 items-center gap-3 px-3.5 py-3"
      >
        <span
          className="library-symbol-tile flex h-10 w-10 shrink-0 items-center justify-center rounded-[0.625rem]"
          style={accentTone(meta.accent)}
        >
          <tool.icon className="h-5 w-5" aria-hidden />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-sm font-semibold leading-snug text-foreground">{tool.title}</span>
          <span className="mt-0.5 block truncate text-caption text-muted-foreground">{meta.title}</span>
        </span>
        <AppSymbol name="chevron.right" fallback={ChevronRight} className="library-row-chevron h-4 w-4 shrink-0 text-muted-foreground" />
      </Link>
      <button
        type="button"
        aria-label={favorite ? "Favorilerden çıkar" : "Favorilere ekle"}
        aria-pressed={favorite}
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          hapticSelection();
          onFavorite();
        }}
        className="calculation-favorite-button flex w-12 shrink-0 items-center justify-center border-l border-border/60 text-muted-foreground transition-colors duration-control hover:bg-muted/70 hover:text-foreground"
      >
        <AppSymbol
          name="star"
          selectedName="star.fill"
          selected={favorite}
          fallback={Star}
          className={`h-4 w-4 ${favorite ? "fill-warning text-warning" : ""}`}
        />
      </button>
    </div>
  );
}

export default function CalculationsLibraryPage() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  const [favorites, setFavorites] = useState<string[]>(() => readStoredList(FAVORITES_STORAGE_KEY));
  const [recents] = useState<string[]>(() => readStoredList(RECENT_STORAGE_KEY));

  const normalizedQuery = query.trim().toLocaleLowerCase("tr-TR");
  const visibleTools = useMemo(() => {
    if (normalizedQuery) {
      return ALL_TOOLS.filter((tool) => tool.title.toLocaleLowerCase("tr-TR").includes(normalizedQuery));
    }
    if (activeCategory) return ALL_TOOLS.filter((tool) => tool.category === activeCategory);
    return QUICK_TOOLS;
  }, [activeCategory, normalizedQuery]);

  const favoriteTools = favorites
    .map((id) => ALL_TOOLS.find((tool) => tool.id === id))
    .filter((tool): tool is CalcTool => Boolean(tool));
  const recentTools = recents
    .map((id) => ALL_TOOLS.find((tool) => tool.id === id))
    .filter((tool): tool is CalcTool => Boolean(tool))
    .slice(0, 4);

  const toggleFavorite = (id: string) => {
    const next = favorites.includes(id)
      ? favorites.filter((item) => item !== id)
      : [id, ...favorites].slice(0, 8);
    setFavorites(next);
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(next));
  };

  const activeMeta = activeCategory ? CATEGORY_META[activeCategory] : null;

  return (
    <LibraryPageShell
      title={activeMeta?.title ?? "Hesaplamalar"}
      icon={activeMeta?.icon ?? BarChart3}
      onBack={activeCategory ? () => setActiveCategory(null) : undefined}
      backLabel="Hesaplama kategorilerine dön"
    >
      <LibrarySearchField
        value={query}
        onChange={setQuery}
        placeholder="Hesaplama ara…"
        ariaLabel="Hesaplamalarda ara"
      />

      {!activeCategory && !normalizedQuery && (
        <>
          <InsetGroupedList columns={2}>
            {(Object.entries(CATEGORY_META) as Array<[Category, (typeof CATEGORY_META)[Category]]>).map(
              ([category, meta]) => (
                <LibraryEntryCard
                  key={category}
                  title={meta.title}
                  icon={meta.icon}
                  accent={meta.accent}
                  badge={ALL_TOOLS.filter((tool) => tool.category === category).length}
                  onClick={() => setActiveCategory(category)}
                />
              ),
            )}
          </InsetGroupedList>

          {favoriteTools.length > 0 && (
            <section className="space-y-3">
              <LibrarySectionHeading badge={favoriteTools.length}>Favoriler</LibrarySectionHeading>
              <InsetGroupedList columns={2}>
                {favoriteTools.map((tool) => (
                  <LibraryCompactCard
                    key={tool.id}
                    to={tool.to}
                    title={tool.title}
                    icon={tool.icon}
                    accent={CATEGORY_META[tool.category].accent}
                  />
                ))}
              </InsetGroupedList>
            </section>
          )}

          {recentTools.length > 0 && (
            <section className="space-y-3">
              <LibrarySectionHeading>Son Kullanılan</LibrarySectionHeading>
              <InsetGroupedList columns={2}>
                {recentTools.map((tool) => (
                  <LibraryCompactCard
                    key={tool.id}
                    to={tool.to}
                    title={tool.title}
                    icon={tool.icon}
                    accent={CATEGORY_META[tool.category].accent}
                  />
                ))}
              </InsetGroupedList>
            </section>
          )}
        </>
      )}

      <section className="space-y-4">
        <LibrarySectionHeading badge={visibleTools.length}>
          {normalizedQuery ? "Arama Sonuçları" : activeMeta?.title ?? "Hızlı Araçlar"}
        </LibrarySectionHeading>
        {visibleTools.length > 0 ? (
          <InsetGroupedList columns={2}>
            {visibleTools.map((tool) => (
              <ToolCard
                key={tool.id}
                tool={tool}
                favorite={favorites.includes(tool.id)}
                onFavorite={() => toggleFavorite(tool.id)}
              />
            ))}
          </InsetGroupedList>
        ) : (
          <div className="rounded-2xl border border-dashed border-border bg-card/60 px-5 py-12 text-center text-sm text-muted-foreground">
            Aramanızla eşleşen hesaplama bulunamadı.
          </div>
        )}
      </section>
    </LibraryPageShell>
  );
}
