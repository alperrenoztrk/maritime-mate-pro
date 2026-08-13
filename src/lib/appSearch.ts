import type { SearchItem } from "@/data/searchIndex";

export type SearchScopeId = "all" | "learn" | "tools" | "reference" | "operations";

export const SEARCH_SCOPES: ReadonlyArray<{ id: SearchScopeId; label: string }> = [
  { id: "all", label: "All" },
  { id: "learn", label: "Dersler" },
  { id: "tools", label: "Tools" },
  { id: "reference", label: "Kaynaklar" },
  { id: "operations", label: "Operasyonlar" },
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
  if (item.category !== "Genel") return item.category;
  if (item.path === "/") return "Home Page";
  const scope = searchItemScope(item);
  if (scope === "learn") return "Dersler";
  if (scope === "tools") return "Tools";
  if (startsWithAny(item.path, ["/ship-operations", "/ship-tasks"])) return "Operasyonlar";
  if (startsWithAny(item.path, ["/crew"])) return "Personel";
  if (startsWithAny(item.path, ["/ship-systems", "/bridge", "/glossary", "/regulations"])) {
    return "Kaynaklar";
  }
  return "Genel";
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
