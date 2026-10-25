/**
 * Device-local study activity: recently opened study pages ("Continue") and
 * user bookmarks ("Saved"). Kept in localStorage so it works offline on board.
 */
export interface StudyItem {
  path: string;
  title: string;
  kind: StudyKind;
  at: number;
}

export type StudyKind = "Lesson" | "Exercise" | "Reference" | "Ship systems" | "Personnel" | "Operations" | "Formulas" | "Calculations";

const RECENT_KEY = "mb.study.recent.v1";
const SAVED_KEY = "mb.study.saved.v1";
export const RECENT_LIMIT = 6;
export const STUDY_EVENT = "mb:study-activity";

const RULES: Array<[RegExp, StudyKind]> = [
  [/^\/exercises\/[^/]+\/topics\/[^/]+/, "Exercise"],
  [/^\/stcw-study-paths$/, "Reference"],
  [/^\/inspections\/sire-readiness$/, "Reference"],
  [/^\/lessons\/[^/]+\/topics\/[^/]+/, "Lesson"],
  [/^\/lessons\/[^/]+\/reference$/, "Reference"],
  [/^\/lessons\/[^/]+\/formulas$/, "Formulas"],
  [/^\/lessons\/[^/]+\/calculations$/, "Calculations"],
  [/^\/ship-systems\/.+/, "Ship systems"],
  [/^\/crew\/.+/, "Personnel"],
  [/^\/ship-operations\/.+/, "Operations"],
];

/** Returns the study kind for a route, or null when it is not a study page. */
export function studyKindFor(pathname: string): StudyKind | null {
  return RULES.find(([re]) => re.test(pathname))?.[1] ?? null;
}

function read(key: string): StudyItem[] {
  try {
    const parsed = JSON.parse(localStorage.getItem(key) ?? "[]");
    return Array.isArray(parsed) ? parsed.filter((i) => i && typeof i.path === "string") : [];
  } catch {
    return [];
  }
}

function write(key: string, items: StudyItem[]) {
  try {
    localStorage.setItem(key, JSON.stringify(items));
    window.dispatchEvent(new Event(STUDY_EVENT));
  } catch {
    /* storage full or unavailable */
  }
}

export const getRecent = () => read(RECENT_KEY);
export const getSaved = () => read(SAVED_KEY);

/** Adds a page to the front of the recent list (deduplicated, capped). */
export function recordVisit(item: Omit<StudyItem, "at">, now = Date.now()): StudyItem[] {
  const next = [{ ...item, at: now }, ...getRecent().filter((i) => i.path !== item.path)].slice(0, RECENT_LIMIT);
  write(RECENT_KEY, next);
  return next;
}

export const isSaved = (path: string) => getSaved().some((i) => i.path === path);

/** Toggles a bookmark; returns true when the page is now saved. */
export function toggleSaved(item: Omit<StudyItem, "at">, now = Date.now()): boolean {
  const saved = getSaved();
  if (saved.some((i) => i.path === item.path)) {
    write(SAVED_KEY, saved.filter((i) => i.path !== item.path));
    return false;
  }
  write(SAVED_KEY, [{ ...item, at: now }, ...saved]);
  return true;
}

export function removeSaved(path: string) {
  write(SAVED_KEY, getSaved().filter((i) => i.path !== path));
}
