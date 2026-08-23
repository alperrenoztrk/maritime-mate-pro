import { safeLocalStorage } from "@/lib/safeStorage";

export interface SavedNote {
  id: string;
  text: string;
  category: string;
  pathname: string;
  pageTitle: string;
  createdAt: number;
}

const STORAGE_KEY = "marine-expert-saved-notes";
const MAX_NOTES = 200;

export const NOTES_UPDATED_EVENT = "marine-notes-updated";

// Ordered list — first match wins. Exact segment match so "/machine"
// doesn't swallow "/machinery" or "/machine-calculations".
const CATEGORY_MAP: Array<[string, string]> = [
  ["/lessons", "Lessons"],
  ["/exercises", "Exercises"],
  ["/crew", "Personnel"],
  ["/ship-tasks", "Personnel"],
  ["/ship-systems", "Ship Systems"],
  ["/bridge", "Ship Systems"],
  ["/ship-operations", "Operations"],
  ["/glossary", "Dictionary"],
  ["/regulations", "Rules & Regulations"],
  ["/solas", "Rules & Regulations"],
  ["/stability", "Stability"],
  ["/navigation", "Navigation"],
  ["/cargo", "Cargo Operations"],
  ["/meteorology", "Meteorology"],
  ["/safety", "Safety"],
  ["/seamanship", "Seamanship"],
  ["/machine-calculations", "Engine"],
  ["/machine", "Engine"],
  ["/economics", "Economy"],
  ["/environment", "Environment"],
  ["/emissions", "Environment"],
  ["/calculations", "Calculations"],
  ["/converter", "Calculations"],
  ["/tank", "Calculations"],
  ["/ballast", "Calculations"],
  ["/engine", "Calculations"],
  ["/hydrodynamics", "Calculations"],
  ["/structural", "Calculations"],
  ["/special-ships", "Calculations"],
  ["/beta", "Beta"],
];

export const FALLBACK_CATEGORY = "Other";

// Legacy labels (Turkish or earlier English wording) stored on existing notes.
// Mapped on read so old notes merge into the current English headers instead of
// showing duplicate sections.
const LEGACY_CATEGORY_ALIASES: Record<string, string> = {
  Dersler: "Lessons",
  Personel: "Personnel",
  Operasyonlar: "Operations",
  "Gemi Sistemleri": "Ship Systems",
  Stabilite: "Stability",
  Seyir: "Navigation",
  "Yük İşlemleri": "Cargo Operations",
  "Freight Transactions": "Cargo Operations",
  Meteoroloji: "Meteorology",
  Güvenlik: "Safety",
  Gemicilik: "Seamanship",
  Makine: "Engine",
  Ekonomi: "Economy",
  Çevre: "Environment",
  Hesaplamalar: "Calculations",
  "Kurallar ve Mevzuat": "Rules & Regulations",
  Sözlük: "Dictionary",
  dictionary: "Dictionary",
  Alıştırmalar: "Exercises",
  Diğer: "Other",
  Others: "Other",
};

export function normalizeCategory(category: string): string {
  return LEGACY_CATEGORY_ALIASES[category] ?? category;
}

export function deriveCategory(pathname: string): string {
  for (const [prefix, label] of CATEGORY_MAP) {
    if (pathname === prefix || pathname.startsWith(prefix + "/")) {
      return label;
    }
  }
  return FALLBACK_CATEGORY;
}

function getPageTitle(): string {
  const h1 = document.querySelector("main h1, h1");
  const title = h1?.textContent?.trim();
  return title || document.title || "Note";
}

function generateId(): string {
  return (
    (typeof crypto !== "undefined" && crypto.randomUUID?.()) ||
    `${Date.now()}-${Math.random().toString(36).slice(2)}`
  );
}

function notifyChange() {
  window.dispatchEvent(new CustomEvent(NOTES_UPDATED_EVENT));
}

function writeNotes(notes: SavedNote[]) {
  safeLocalStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  notifyChange();
}

export function getNotes(): SavedNote[] {
  try {
    const raw = JSON.parse(safeLocalStorage.getItem(STORAGE_KEY) || "[]");
    if (!Array.isArray(raw)) return [];
    return raw
      .filter(
        (n): n is SavedNote =>
          n &&
          typeof n === "object" &&
          typeof n.id === "string" &&
          typeof n.text === "string" &&
          typeof n.category === "string"
      )
      .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
  } catch {
    return [];
  }
}

export function addNote(text: string): SavedNote {
  const pathname = window.location.pathname;
  const note: SavedNote = {
    id: generateId(),
    text: text.trim(),
    category: deriveCategory(pathname),
    pathname,
    pageTitle: getPageTitle(),
    createdAt: Date.now(),
  };
  const notes = [note, ...getNotes()].slice(0, MAX_NOTES);
  writeNotes(notes);
  return note;
}

export function deleteNote(id: string) {
  writeNotes(getNotes().filter((n) => n.id !== id));
}
