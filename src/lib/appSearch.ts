import type { SearchItem } from "@/data/searchIndex";

export type SearchScopeId = "all" | "learn" | "tools" | "reference" | "operations";

export const SEARCH_SCOPES: ReadonlyArray<{ id: SearchScopeId; label: string }> = [
  { id: "all", label: "All" },
  { id: "learn", label: "Dersler" },
  { id: "tools", label: "tools" },
  { id: "reference", label: "Resources" },
  { id: "operations", label: "Operations" },
];

const startsWithAny = (path: string, roots: string[]) =>
  roots.some((root) => path === root || path.startsWith(`${root}/`));

const TOOL_DESTINATIONS = new Set([
  "/navigation",
  "/navigation/tide-tutorial",
  "/passage-plan",
  "/safety",
  "/engine",
  "/emissions",
  "/tank",
  "/ballast",
  "/hydrodynamics",
  "/structural",
  "/special-ships",
  "/stability/gm",
  "/stability/gz-curve",
  "/stability/gz-imo",
  "/stability/weight-shift",
  "/stability/free-surface",
  "/stability/grain",
  "/stability/grain-calculation",
  "/stability/wind-weather",
  "/stability/shearing-bending",
  "/stability/imo-criteria",
  "/stability/practical",
  "/stability/practical/fwa",
  "/stability/practical/tank",
  "/stability/analysis",
]);

export const searchItemScope = (item: SearchItem): Exclude<SearchScopeId, "all"> => {
  const { path, category } = item;
  if (
    startsWithAny(path, ["/lessons", "/exercises", "/exam-preparation"]) ||
    /\/(quiz|topics)(\/|$)/.test(path) ||
    item.title.includes("Konu Anlatım") ||
    category === "Dersler"
  ) {
    return "learn";
  }
  if (
    /\/(calculations?|formulas?|converter|assistant)(\/|$)/.test(path) ||
    TOOL_DESTINATIONS.has(path) ||
    startsWithAny(path, ["/calculations", "/converter", "/tank", "/emissions"]) ||
    category === "Hesaplamalar"
  ) {
    return "tools";
  }
  if (
    startsWithAny(path, ["/ship-operations", "/ship-tasks"]) ||
    category === "Operasyonlar"
  ) {
    return "operations";
  }
  return "reference";
};

export const matchesSearchScope = (item: SearchItem, scope: SearchScopeId) =>
  scope === "all" || (item.path !== "/" && searchItemScope(item) === scope);

export const displaySearchCategory = (item: SearchItem): string => {
  // The category on the item comes from the lesson data, which is authored in
  // Turkish and translated at render time; the labels returned below are the
  // app's own copy and are therefore written in English.
  if (item.category !== "Genel") return item.category;
  if (item.path === "/") return "Home";
  const scope = searchItemScope(item);
  if (scope === "learn") return "Lessons";
  if (scope === "tools") return "Tools";
  if (startsWithAny(item.path, ["/ship-operations", "/ship-tasks"])) return "Operations";
  if (startsWithAny(item.path, ["/crew"])) return "Personnel";
  if (startsWithAny(item.path, ["/ship-systems", "/bridge", "/glossary", "/regulations"])) {
    return "Resources";
  }
  return "General";
};

export const dedupeSearchItems = (items: SearchItem[]): SearchItem[] => {
  const seen = new Set<string>();
  return items.filter((item) => {
    const key = `${item.path}\u0000${item.title}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};
