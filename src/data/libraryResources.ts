import { getBetaCategories } from "@/data/betaLessons";
import { categoryHref, STATIC_SECTIONS, type LibraryResource, type LibrarySection } from "./libraryResourceLinks";

export type { LibraryResource, LibrarySection };

/** Every resource in the app, grouped for the Library hub. Single source of truth. */
export function getLibrarySections(): LibrarySection[] {
  const categories = getBetaCategories().filter((c) => c.enabled !== false);
  const toItem = (accent: string) => (c: (typeof categories)[number]): LibraryResource => ({
    title: c.title,
    to: categoryHref(c.key),
    icon: c.icon,
    accent,
  });
  return [
    { id: "deck", title: "Deck Library", items: categories.filter((c) => c.group === "deck").map(toItem("accent-ocean")) },
    { id: "engine", title: "Engine Library", items: categories.filter((c) => c.group === "machine").map(toItem("accent-slate")) },
    ...STATIC_SECTIONS,
  ].filter((s) => s.items.length > 0);
}
