import { useMemo, useState } from "react";
import {
  Anchor, BarChart3, ChevronRight, Compass, Droplets, Flame, Fuel, Gauge,
  Layers, LifeBuoy, Navigation, Ruler, Scale, Ship, Star, Thermometer,
  Wrench, Zap, type LucideIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import { AppSymbol } from "@/components/ui/AppSymbol";
import { hapticImpact, hapticSelection } from "@/lib/haptics";
import {
  LibraryEntryCard, LibraryPageShell, LibrarySearchField, LibrarySectionHeading,
} from "@/components/library/LibraryInterface";
import { accentTone } from "@/components/library/libraryAccent";

type Category = "navigation" | "cargo" | "stability" | "machinery" | "deck" | "utilities";
interface CalcTool {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  to: string;
  category: Category;
}

const CATEGORY_META: Record<Category, { title: string; description: string; icon: LucideIcon; accent: string }> = {
  navigation: { title: "Navigation", description: "Passage and position calculations", icon: Compass, accent: "accent-ocean" },
  cargo: { title: "Cargo & Draft Survey", description: "Displacement, draft and quantities", icon: Ship, accent: "accent-teal" },
  stability: { title: "Stability", description: "Hydrostatics and stability criteria", icon: Scale, accent: "accent-deep" },
  machinery: { title: "Marine Engineering", description: "Engines, energy and machinery", icon: Wrench, accent: "accent-slate" },
  deck: { title: "Seamanship", description: "Deck-operation calculations", icon: Anchor, accent: "accent-amber" },
  utilities: { title: "Converters", description: "Maritime unit conversions", icon: Zap, accent: "accent-ocean" },
};

// Only calculation pages or calculation collections belong in Tools.
// Ship-system articles, tide tutorials and static formula references live in Learn/Library.
const TOOLS: CalcTool[] = [
  { id: "nav-calc", title: "Navigation Calculations", description: "Courses, distances and navigational problems", icon: Navigation, to: "/lessons/navigation/calculations", category: "navigation" },
  { id: "static-ukc", title: "Under Keel Clearance (UKC)", description: "Charted depth, tide, draft and allowances", icon: Anchor, to: "/tools/verified/static-ukc", category: "navigation" },
  { id: "weight-shift", title: "Transverse Weight Shift", description: "Initial heel from cargo or weight movement", icon: Scale, to: "/tools/verified/transverse-weight-shift", category: "stability" },
  { id: "counterflow-lmtd", title: "Counterflow LMTD", description: "Heat exchanger temperature differences", icon: Thermometer, to: "/tools/verified/counterflow-lmtd", category: "machinery" },
  { id: "voyage-eta", title: "Voyage ETA (UTC)", description: "UTC time and passage duration", icon: Compass, to: "/tools/verified/voyage-eta", category: "navigation" },
  { id: "free-surface-verified", title: "Free Surface Correction", description: "GM reduction for one slack rectangular tank", icon: Droplets, to: "/tools/verified/free-surface", category: "stability" },
  { id: "waterplane-tpc", title: "TPC from Waterplane Area", description: "Hydrostatic TPC at a defined draft", icon: Scale, to: "/tools/verified/waterplane-tpc", category: "stability" },
  { id: "engine-sfoc", title: "Engine Fuel Consumption", description: "Power × SFOC × operating hours", icon: Fuel, to: "/tools/verified/engine-sfoc", category: "machinery" },
  { id: "fuel-endurance", title: "Fuel Endurance", description: "Fuel ROB excluding protected reserve", icon: Gauge, to: "/tools/verified/fuel-endurance", category: "machinery" },
  { id: "cpa", title: "CPA / TCPA", description: "Relative motion and closest approach", icon: Compass, to: "/navigation/calc/cpa", category: "navigation" },
  { id: "draft-survey", title: "Draft Survey", description: "Draft and displacement survey worksheet", icon: Ruler, to: "/cargo/calculations/draft-survey", category: "cargo" },
  { id: "preloading", title: "Preloading", description: "Draft survey before cargo operations", icon: Ship, to: "/cargo/calculations/preloading", category: "cargo" },
  { id: "ballast", title: "Draft Change Estimate", description: "Approximate displacement change from drafts and TPC", icon: Droplets, to: "/cargo/calculations/ballast", category: "cargo" },
  { id: "density", title: "Density Correction", description: "Displacement correction for measured water density", icon: Thermometer, to: "/cargo/calculations/density", category: "cargo" },
  { id: "bunker", title: "Bunker Quantity Estimate", description: "Fuel volume and density calculations", icon: Gauge, to: "/cargo/calculations/bunker", category: "cargo" },
  { id: "cargo", title: "Cargo Calculations", description: "Browse cargo calculation worksheets", icon: Layers, to: "/cargo/calculations", category: "cargo" },
  { id: "stability-calc", title: "Stability Calculations", description: "GM, GZ and related stability worksheets", icon: Scale, to: "/stability/calculations", category: "stability" },
  { id: "tank", title: "Rectangular Tank Estimate", description: "Volume, mass and vertical moment; not a sounding table", icon: Anchor, to: "/tank", category: "stability" },
  { id: "imo-criteria", title: "IMO Stability Criteria", description: "Evaluate intact-stability criteria", icon: LifeBuoy, to: "/stability/imo-criteria", category: "stability" },
  { id: "seamanship-calc", title: "Seamanship Calculations", description: "Anchoring and deck operations", icon: Anchor, to: "/seamanship/calculations", category: "deck" },
  { id: "diesel-engines", title: "Diesel Engines", description: "Engine performance calculations", icon: Wrench, to: "/machine/diesel-engines/calculations", category: "machinery" },
  { id: "thermodynamics", title: "Thermodynamics", description: "Heat, cycles and efficiency", icon: Thermometer, to: "/machine/thermodynamics/calculations", category: "machinery" },
  { id: "fuel-technology", title: "Fuel Technology", description: "Fuel properties and consumption", icon: Flame, to: "/machine/fuel-technology/calculations", category: "machinery" },
  { id: "cooling-hvac", title: "Cooling & HVAC", description: "Refrigeration and ventilation calculations", icon: Gauge, to: "/machine/cooling-hvac/calculations", category: "machinery" },
  { id: "machine-elements", title: "Machine Elements", description: "Mechanical design calculations", icon: Layers, to: "/machine/machine-elements/calculations", category: "machinery" },
  { id: "emissions-machine", title: "Emissions & Environment", description: "Machinery environmental calculations", icon: Flame, to: "/machine/environment-machine/calculations", category: "machinery" },
  { id: "unit-conv", title: "Unit Converter", description: "Distance, speed, mass, volume and more", icon: Zap, to: "/converter", category: "utilities" },
];

const TOOL_BY_ID = new Map(TOOLS.map((tool) => [tool.id, tool]));
const LEGACY_TOOL_IDS: Record<string, string> = {
  draft: "draft-survey", trim: "stability-calc", fuel: "fuel-technology",
  voyage: "nav-calc", converter: "unit-conv",
};
const RECENT_STORAGE_KEY = "marine-expert-recent-calcs";
const FAVORITES_STORAGE_KEY = "marine-expert-fav-calcs";
const QUICK_IDS = ["draft-survey", "static-ukc", "voyage-eta", "free-surface-verified", "engine-sfoc", "cpa", "nav-calc", "stability-calc", "unit-conv", "cargo", "thermodynamics"];

function readStoredList(key: string): string[] {
  try {
    const value: unknown = JSON.parse(window.localStorage.getItem(key) ?? "[]");
    if (!Array.isArray(value)) return [];
    return [...new Set(value
      .filter((id): id is string => typeof id === "string")
      .map((id) => LEGACY_TOOL_IDS[id] ?? id)
      .filter((id) => TOOL_BY_ID.has(id)))];
  } catch {
    return [];
  }
}
function storeList(key: string, ids: string[]) {
  try { window.localStorage.setItem(key, JSON.stringify(ids)); } catch { /* private browsing */ }
}

function ToolCard({ tool, favorite, onFavorite, onVisit }: {
  tool: CalcTool;
  favorite: boolean;
  onFavorite: () => void;
  onVisit: () => void;
}) {
  const meta = CATEGORY_META[tool.category];
  return (
    <div className="ios-list-row surface-2 group flex min-h-[5.5rem] items-stretch overflow-hidden rounded-xl border border-border/60 transition-[background-color,border-color,transform] duration-control hover:border-primary/25 active:scale-[0.99]">
      <Link
        to={tool.to}
        onClick={() => { onVisit(); hapticImpact("light"); }}
        className="flex min-w-0 flex-1 items-center gap-3 px-3.5 py-3 focus-visible:outline-2 focus-visible:outline-primary"
      >
        <span className="library-symbol-tile flex h-10 w-10 shrink-0 items-center justify-center rounded-xl" style={accentTone(meta.accent)}>
          <tool.icon className="h-5 w-5" aria-hidden />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-sm font-semibold leading-snug text-foreground">{tool.title}</span>
          <span className="mt-1 block text-xs leading-snug text-muted-foreground">{tool.description}</span>
        </span>
        <AppSymbol name="chevron.right" fallback={ChevronRight} className="h-4 w-4 shrink-0 text-muted-foreground" />
      </Link>
      <button
        type="button"
        aria-label={favorite ? `Remove ${tool.title} from favorites` : `Add ${tool.title} to favorites`}
        aria-pressed={favorite}
        onClick={() => { hapticSelection(); onFavorite(); }}
        className="flex w-11 shrink-0 items-center justify-center border-l border-border/60 text-muted-foreground hover:bg-muted/70 focus-visible:outline-2 focus-visible:outline-primary"
      >
        <AppSymbol name="star" selectedName="star.fill" selected={favorite} fallback={Star}
          className={`h-4 w-4 ${favorite ? "fill-warning text-warning" : ""}`} />
      </button>
    </div>
  );
}

export default function CalculationsLibraryPage() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  const [favorites, setFavorites] = useState<string[]>(() => readStoredList(FAVORITES_STORAGE_KEY));
  const [recents, setRecents] = useState<string[]>(() => readStoredList(RECENT_STORAGE_KEY));

  const normalizedQuery = query.trim().toLocaleLowerCase();
  const visibleTools = useMemo(() => {
    if (normalizedQuery) {
      return TOOLS.filter((tool) =>
        [tool.title, tool.description, CATEGORY_META[tool.category].title]
          .some((value) => value.toLocaleLowerCase().includes(normalizedQuery)));
    }
    if (activeCategory) return TOOLS.filter((tool) => tool.category === activeCategory);
    return QUICK_IDS.flatMap((id) => TOOL_BY_ID.get(id) ? [TOOL_BY_ID.get(id)!] : []);
  }, [activeCategory, normalizedQuery]);

  const recordVisit = (id: string) => {
    const next = [id, ...recents.filter((item) => item !== id)].slice(0, 6);
    setRecents(next);
    storeList(RECENT_STORAGE_KEY, next);
  };
  const toggleFavorite = (id: string) => {
    const next = favorites.includes(id)
      ? favorites.filter((item) => item !== id)
      : [id, ...favorites].slice(0, 8);
    setFavorites(next);
    storeList(FAVORITES_STORAGE_KEY, next);
  };
  const renderTools = (tools: CalcTool[]) => (
    <div className="grid gap-2 sm:grid-cols-2">
      {tools.map((tool) => <ToolCard key={tool.id} tool={tool}
        favorite={favorites.includes(tool.id)}
        onFavorite={() => toggleFavorite(tool.id)}
        onVisit={() => recordVisit(tool.id)} />)}
    </div>
  );
  const atRoot = !activeCategory && !normalizedQuery;
  const activeMeta = activeCategory ? CATEGORY_META[activeCategory] : null;
  return (
    <LibraryPageShell
      title={activeMeta?.title ?? "Tools"}
      icon={activeMeta?.icon ?? BarChart3}
      onBack={activeCategory ? () => { setActiveCategory(null); setQuery(""); } : undefined}
      backLabel="Back to tool categories"
    >
      <LibrarySearchField value={query} onChange={setQuery}
        placeholder="Search maritime calculations…" ariaLabel="Search tools" />
      {atRoot && (
        <>
          <div className="grid gap-2 sm:grid-cols-2">
            {(Object.entries(CATEGORY_META) as Array<[Category, (typeof CATEGORY_META)[Category]]>).map(([id, meta]) => (
              <LibraryEntryCard key={id} title={meta.title} description={meta.description}
                icon={meta.icon} accent={meta.accent}
                badge={TOOLS.filter((tool) => tool.category === id).length}
                onClick={() => setActiveCategory(id)} />
            ))}
          </div>
          {favorites.length > 0 && (
            <section className="space-y-3">
              <LibrarySectionHeading badge={favorites.length}>Favorites</LibrarySectionHeading>
              {renderTools(favorites.flatMap((id) => TOOL_BY_ID.get(id) ? [TOOL_BY_ID.get(id)!] : []))}
            </section>
          )}
          {recents.length > 0 && (
            <section className="space-y-3">
              <LibrarySectionHeading>Recently Used</LibrarySectionHeading>
              {renderTools(recents.slice(0, 4).flatMap((id) => TOOL_BY_ID.get(id) ? [TOOL_BY_ID.get(id)!] : []))}
            </section>
          )}
        </>
      )}
      <section className="space-y-3">
        <LibrarySectionHeading badge={visibleTools.length}>
          {normalizedQuery ? "Search Results" : activeMeta?.title ?? "Frequently Used"}
        </LibrarySectionHeading>
        {visibleTools.length ? renderTools(visibleTools) : (
          <div className="rounded-xl border border-dashed border-border bg-card/60 px-5 py-10 text-center text-sm text-muted-foreground">
            No matching calculator found. Try a category or another search term.
          </div>
        )}
      </section>
      <p className="px-1 text-xs leading-relaxed text-muted-foreground">
        These calculators support training and cross-checks. Use vessel-approved hydrostatic
        data, sounding tables and official publications for operational decisions.
      </p>
    </LibraryPageShell>
  );
}
