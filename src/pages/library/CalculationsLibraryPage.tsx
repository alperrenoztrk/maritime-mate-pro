import { useMemo, useState } from "react";
import {
  Activity,
  Anchor,
  ArrowLeftRight,
  BarChart3,
  ClipboardList,
  Container,
  FileCheck2,
  LineChart,
  ShieldCheck,
  Waves,
  Wheat,
  Wind,
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
  Globe2,
  Megaphone,
  Radar,
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

type Category = "navigation" | "cargo" | "stability" | "machine" | "ship-systems" | "converter";

const CATEGORY_META: Record<Category, { title: string; icon: LucideIcon; accent: string }> = {
  navigation: { title: "Navigation", icon: Compass, accent: "accent-ocean" },
  cargo: { title: "Cargo and Draft Survey", icon: Layers, accent: "accent-teal" },
  stability: { title: "Stability", icon: Scale, accent: "accent-ocean" },
  machine: { title: "Machinery and Consumption", icon: Wrench, accent: "accent-slate" },
  "ship-systems": { title: "Ship Systems", icon: Anchor, accent: "accent-amber" },
  converter: { title: "Formulas and Converters", icon: Zap, accent: "accent-deep" },
};

const QUICK_TOOLS: CalcTool[] = [
  { id: "draft", title: "Draft Survey", icon: Ruler, to: "/cargo/calculations/draft-survey", category: "cargo" },
  { id: "trim", title: "Stability / Trim", icon: Scale, to: "/stability/calculations", category: "stability" },
  { id: "fuel", title: "Fuel Consumption", icon: Flame, to: "/machine/fuel-technology/calculations", category: "machine" },
  { id: "voyage", title: "Voyage Time and ETA", icon: Timer, to: "/navigation/calc/eta", category: "navigation" },
  { id: "cargo", title: "Cargo Calculations", icon: Layers, to: "/cargo/calculations", category: "cargo" },
  { id: "converter", title: "Unit Converter", icon: Zap, to: "/converter", category: "converter" },
];

const TOOLS: CalcTool[] = [
  { id: "draft-survey", title: "Draft Survey", icon: Ruler, to: "/cargo/calculations/draft-survey", category: "cargo" },
  { id: "preloading", title: "Initial (Light) Survey", icon: Ship, to: "/cargo/calculations/preloading", category: "cargo" },
  { id: "intermediate", title: "Intermediate Survey", icon: Gauge, to: "/cargo/calculations/intermediate", category: "cargo" },
  { id: "postdischarge", title: "Post-Discharge Survey", icon: Layers, to: "/cargo/calculations/postdischarge", category: "cargo" },
  { id: "comparative", title: "Survey Comparison", icon: BarChart3, to: "/cargo/calculations/comparative", category: "cargo" },
  { id: "ballast", title: "Ballast Quantity", icon: Droplets, to: "/cargo/calculations/ballast", category: "cargo" },
  { id: "density", title: "Density Correction", icon: Thermometer, to: "/cargo/calculations/density", category: "cargo" },
  { id: "bunker", title: "Bunker Quantity", icon: Gauge, to: "/cargo/calculations/bunker", category: "cargo" },
  { id: "stability-calc", title: "Stability Calculations", icon: Scale, to: "/stability/calculations", category: "stability" },
  { id: "tank", title: "Tank Sounding", icon: Anchor, to: "/tank", category: "cargo" },
  { id: "ballast-ops", title: "Ballast Operations", icon: Droplets, to: "/ballast", category: "cargo" },
  { id: "loading-condition", title: "Loading Condition and GM", icon: ClipboardList, to: "/stability/gm", category: "stability" },
  { id: "weight-changes", title: "Weight Changes", icon: ArrowLeftRight, to: "/stability/weight-shift", category: "stability" },
  { id: "free-surface", title: "Free Surface Effect", icon: Waves, to: "/stability/free-surface", category: "stability" },
  { id: "righting-lever", title: "Righting Lever (GZ)", icon: Activity, to: "/stability/gz", category: "stability" },
  { id: "gz-curve", title: "GZ Curve", icon: LineChart, to: "/stability/gz-curve", category: "stability" },
  { id: "gz-imo", title: "IS Code Check from KN", icon: ShieldCheck, to: "/stability/gz-imo", category: "stability" },
  { id: "imo-criteria", title: "IMO Stability Criteria", icon: LifeBuoy, to: "/stability/imo-criteria", category: "stability" },
  { id: "weather-criterion", title: "Weather Criterion", icon: Wind, to: "/stability/wind-weather", category: "stability" },
  { id: "condition-report", title: "Stability Condition Report", icon: FileCheck2, to: "/stability/analysis", category: "stability" },
  { id: "grain-moment", title: "Grain Heeling Moment", icon: Wheat, to: "/stability/practical/ghm", category: "stability" },
  { id: "grain-permissible", title: "Permissible Grain Moment", icon: Wheat, to: "/stability/grain", category: "stability" },
  { id: "grain-criteria", title: "Grain Stability Criteria", icon: Wheat, to: "/stability/grain-calculation", category: "stability" },
  { id: "practical-stability", title: "Practical Stability", icon: Wrench, to: "/stability/practical", category: "stability" },
  { id: "tank-geometry", title: "Tank Volume and Mass", icon: Container, to: "/stability/practical/tank", category: "stability" },
  { id: "fwa", title: "FWA and Dock Water Allowance", icon: Droplets, to: "/stability/practical/fwa", category: "stability" },
  { id: "stability-toolbox", title: "Stability Toolbox", icon: Wrench, to: "/stability/stable-tales", category: "stability" },
  { id: "shear-bending", title: "Shear Force and Bending Moment", icon: BarChart3, to: "/stability/shearing-bending", category: "stability" },
  { id: "nav-calc", title: "Navigation Calculations", icon: Navigation, to: "/navigation", category: "navigation" },
  { id: "great-circle", title: "Great Circle", icon: Globe2, to: "/navigation/calc/gc", category: "navigation" },
  { id: "cpa", title: "CPA / TCPA", icon: Radar, to: "/navigation/calc/cpa", category: "navigation" },
  { id: "tides", title: "Tides and Tidal Streams", icon: BarChart3, to: "/navigation/calc/tides", category: "navigation" },
  { id: "squat-ukc", title: "Squat and UKC", icon: Anchor, to: "/navigation/calc/safety", category: "navigation" },
  { id: "buoyage", title: "IALA Buoyage", icon: LifeBuoy, to: "/navigation/buoyage", category: "navigation" },
  { id: "sound-signals", title: "Sound Signals", icon: Megaphone, to: "/navigation/sound-signals", category: "navigation" },
  { id: "passage", title: "Passage Plan", icon: Compass, to: "/passage-plan", category: "navigation" },
  { id: "nav-course-calc", title: "Navigation Course Calculators", icon: Navigation, to: "/lessons/navigation/calculations", category: "navigation" },
  { id: "seamanship-calc", title: "Seamanship Calculations", icon: Droplets, to: "/seamanship/calculations", category: "navigation" },
  { id: "diesel-engines", title: "Diesel Engines", icon: Wrench, to: "/machine/diesel-engines/calculations", category: "machine" },
  { id: "thermodynamics", title: "Thermodynamics", icon: Thermometer, to: "/machine/thermodynamics/calculations", category: "machine" },
  { id: "fuel-technology", title: "Fuel technology", icon: Flame, to: "/machine/fuel-technology/calculations", category: "machine" },
  { id: "cooling-hvac", title: "Cooling and HVAC", icon: Gauge, to: "/machine/cooling-hvac/calculations", category: "machine" },
  { id: "machine-elements", title: "Machine Elements", icon: Layers, to: "/machine/machine-elements/calculations", category: "machine" },
  { id: "emissions-machine", title: "Emission and Environment", icon: Flame, to: "/machine/environment-machine/calculations", category: "machine" },
  { id: "deck-machinery", title: "Deck Machines", icon: Anchor, to: "/ship-systems/deck-machinery", category: "ship-systems" },
  { id: "nav-systems", title: "Navigational Systems and Devices", icon: Compass, to: "/ship-systems/nav-systems", category: "ship-systems" },
  { id: "main-engine", title: "Main engine / Drive System", icon: Wrench, to: "/ship-systems/main-engine", category: "ship-systems" },
  { id: "auxiliary", title: "Auxiliary machinery", icon: Gauge, to: "/ship-systems/auxiliary", category: "ship-systems" },
  { id: "unit-conv", title: "Unit Converter", icon: Zap, to: "/converter", category: "converter" },
  { id: "nav-formulas", title: "Navigation Formulas", icon: Compass, to: "/navigation/formulas", category: "converter" },
  { id: "stab-formulas", title: "Stability Formulas", icon: Scale, to: "/stability/formulas", category: "converter" },
  { id: "cargo-formulas", title: "Draft Survey Procedure", icon: Ruler, to: "/cargo/formulas", category: "converter" },
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
        aria-label={favorite ? "Remove from favourites" : "Add to favorites"}
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
      backLabel="Back to calculation categories"
    >
      <LibrarySearchField
        value={query}
        onChange={setQuery}
        placeholder="Search for calculations…"
        ariaLabel="Search calculations"
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
              <LibrarySectionHeading badge={favoriteTools.length}>Favorites</LibrarySectionHeading>
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
              <LibrarySectionHeading>Recently Used</LibrarySectionHeading>
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
          {normalizedQuery ? "Search Results" : activeMeta?.title ?? "Quick Tools"}
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
            No calculations were found matching your search.
          </div>
        )}
      </section>
    </LibraryPageShell>
  );
}
