import {
  createBookVolumeDescriptor,
  getBookCollection,
  getCollectionIdFromVolumeId,
  type BookCollectionId,
  type BookVolumeDescriptor,
  type BookVolumeId,
} from "@/data/bookVolumes";

export const BOOK_ROUTE_PREFIXES = [
  "/calculations", "/lessons", "/exercises", "/crew", "/glossary", "/bridge",
  "/machinery", "/ship-tasks", "/ship-operations", "/passage-plan", "/ship-systems",
  "/stability", "/safety", "/meteorology", "/tank", "/cargo", "/communication",
  "/ballast", "/engine", "/hydrodynamics", "/structural", "/special-ships",
  "/emissions", "/environment", "/solas", "/seamanship", "/machine", "/navigation",
  "/economics", "/formulas", "/regulations", "/exam-preparation", "/converter",
  "/machine-calculations",
] as const;

const matchesPrefix = (pathname: string, prefix: string) =>
  pathname === prefix || pathname.startsWith(`${prefix}/`);
const segments = (pathname: string) => pathname.split("/").filter(Boolean);

export function isBookContentPath(pathname: string): boolean {
  return BOOK_ROUTE_PREFIXES.some((prefix) => matchesPrefix(pathname, prefix));
}

export type BookInteractionMode = "reading" | "calculator" | "quiz" | "assistant";

export function getBookInteractionMode(pathname: string): BookInteractionMode {
  if (pathname.includes("/assistant")) return "assistant";
  if (
    pathname.includes("/quiz") || pathname.includes("/scenarios") ||
    matchesPrefix(pathname, "/exercises") || matchesPrefix(pathname, "/exam-preparation")
  ) return "quiz";
  if (
    pathname.includes("/calculations") || pathname.includes("/calc/") ||
    matchesPrefix(pathname, "/calculations") || matchesPrefix(pathname, "/tank") ||
    matchesPrefix(pathname, "/ballast") || matchesPrefix(pathname, "/hydrodynamics") ||
    matchesPrefix(pathname, "/structural") || matchesPrefix(pathname, "/special-ships") ||
    matchesPrefix(pathname, "/emissions") || matchesPrefix(pathname, "/converter") ||
    matchesPrefix(pathname, "/machine-calculations") || pathname === "/navigation" ||
    pathname === "/safety" || pathname === "/economics"
  ) return "calculator";
  return "reading";
}

const SUBJECT_PREFIXES: readonly [string, string][] = [
  ["/stability", "stability"], ["/navigation", "navigation"], ["/cargo", "cargo"],
  ["/meteorology", "meteorology"], ["/seamanship", "seamanship"],
  ["/communication", "communication"], ["/safety", "safety"],
  ["/environment", "environment"], ["/economics", "economics"],
];

export function getBookVolumeForPath(pathname: string): BookVolumeId {
  const parts = segments(pathname);
  const first = parts[0];
  const second = parts[1];

  if (first === "lessons" && second) {
    return pathname.includes("/quiz") ? `exercise-${second}` : `lesson-${second}`;
  }
  if (first === "machine" && second) {
    const generic = new Set(["calculations", "formulas", "rules", "assistant", "quiz"]);
    if (!generic.has(second)) {
      return pathname.includes("/quiz")
        ? `exercise-machine-${second}`
        : `lesson-machine-${second}`;
    }
  }
  if (first === "exercises" && second) return `exercise-${second}`;
  if (first === "ship-systems" && second) return `system-${second}`;
  if (first === "ship-operations" && second) return `operation-${second}`;
  if (first === "crew") return "crew";
  if (first === "glossary") return "glossary";
  if (first === "calculations" && second) return `lesson-${second}`;

  const subject = SUBJECT_PREFIXES.find(([prefix]) => matchesPrefix(pathname, prefix));
  if (subject) return pathname.includes("/quiz")
    ? `exercise-${subject[1]}`
    : `lesson-${subject[1]}`;

  if (matchesPrefix(pathname, "/bridge") || matchesPrefix(pathname, "/passage-plan")) return "lesson-navigation";
  if (matchesPrefix(pathname, "/ballast")) return "lesson-stability";
  if (matchesPrefix(pathname, "/tank") || matchesPrefix(pathname, "/special-ships")) return "lesson-cargo";
  if (matchesPrefix(pathname, "/ship-tasks")) return "lesson-seamanship";
  if (matchesPrefix(pathname, "/regulations") || matchesPrefix(pathname, "/solas")) return "lesson-safety";
  if (matchesPrefix(pathname, "/hydrodynamics")) return "lesson-machine-fluid-mechanics";
  if (matchesPrefix(pathname, "/structural")) return "lesson-machine-machine-elements";
  if (matchesPrefix(pathname, "/emissions")) return "lesson-machine-environment-machine";
  if (matchesPrefix(pathname, "/engine") || matchesPrefix(pathname, "/machinery")) return "lesson-machine-ship-systems";
  if (matchesPrefix(pathname, "/exam-preparation")) return "exercise-general";
  if (matchesPrefix(pathname, "/ship-systems")) return "system-index";
  if (matchesPrefix(pathname, "/ship-operations")) return "operation-index";
  if (matchesPrefix(pathname, "/exercises")) return "exercise-index";
  return "lesson-general";
}

export function getBookCollectionForPath(pathname: string): BookCollectionId {
  return getCollectionIdFromVolumeId(getBookVolumeForPath(pathname));
}

const titleCase = (value: string) =>
  value
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toLocaleUpperCase("tr") + word.slice(1))
    .join(" ");

export function getBookRouteVolume(pathname: string): BookVolumeDescriptor {
  const volumeId = getBookVolumeForPath(pathname);
  const collectionId = getCollectionIdFromVolumeId(volumeId);
  const collection = getBookCollection(collectionId);
  const rawTitle = volumeId
    .replace(/^lesson-machine-/, "")
    .replace(/^(lesson|exercise|system|operation)-/, "");
  const topicTitle = rawTitle && !["general", "index"].includes(rawTitle)
    ? titleCase(rawTitle)
    : collection.title;
  return createBookVolumeDescriptor({
    id: volumeId,
    collectionId,
    title: topicTitle,
    shortTitle: topicTitle,
    subtitle: collection.subtitle,
    description: collection.description,
  });
}

export function getBookRoutePage(pathname: string): number {
  let hash = 0;
  for (const character of pathname) hash = (hash * 31 + character.charCodeAt(0)) >>> 0;
  return 2 + (hash % 120) * 2;
}

export function getBookRouteTitle(pathname: string): string {
  if (pathname === "/crew/muster-list") return "ROLE CETVELİ";
  if (pathname.includes("/formulas") || pathname === "/formulas") return "FORMÜLLER";
  if (
    pathname.includes("/calculations") || pathname.includes("/calc/") ||
    matchesPrefix(pathname, "/calculations") || matchesPrefix(pathname, "/tank") ||
    matchesPrefix(pathname, "/ballast") || matchesPrefix(pathname, "/hydrodynamics") ||
    matchesPrefix(pathname, "/structural") || matchesPrefix(pathname, "/special-ships") ||
    matchesPrefix(pathname, "/emissions") || matchesPrefix(pathname, "/converter") ||
    matchesPrefix(pathname, "/machine-calculations") || pathname === "/navigation" ||
    pathname === "/safety" || pathname === "/economics"
  ) return "HESAPLAMALAR";
  if (pathname.includes("/rules") || matchesPrefix(pathname, "/regulations") || matchesPrefix(pathname, "/solas")) {
    return "KURALLAR VE REGÜLASYONLAR";
  }
  if (pathname.includes("/quiz") || pathname.includes("/scenarios") || matchesPrefix(pathname, "/exam-preparation")) {
    return "ALIŞTIRMALAR";
  }
  if (pathname.includes("/assistant")) return "DERS ASİSTANI";
  if (matchesPrefix(pathname, "/lessons")) return "DERSLER";
  if (matchesPrefix(pathname, "/exercises")) return "ALIŞTIRMALAR";
  if (matchesPrefix(pathname, "/crew")) return "PERSONEL";
  if (matchesPrefix(pathname, "/ship-systems")) return "GEMİ SİSTEMLERİ";
  if (matchesPrefix(pathname, "/ship-operations")) return "GEMİ OPERASYONLARI";
  if (matchesPrefix(pathname, "/ship-tasks")) return "GEMİ GÖREVLERİ";
  if (matchesPrefix(pathname, "/glossary")) return "DENİZCİLİK SÖZLÜĞÜ";
  if (matchesPrefix(pathname, "/machine") || matchesPrefix(pathname, "/engine") || matchesPrefix(pathname, "/machinery")) {
    return "MAKİNE DERSLERİ";
  }
  if (matchesPrefix(pathname, "/navigation") || matchesPrefix(pathname, "/passage-plan") || matchesPrefix(pathname, "/bridge")) return "SEYİR";
  if (matchesPrefix(pathname, "/stability")) return "GEMİ STABİLİTESİ";
  if (matchesPrefix(pathname, "/cargo")) return "YÜK İŞLEMLERİ";
  if (matchesPrefix(pathname, "/seamanship")) return "GEMİCİLİK";
  if (matchesPrefix(pathname, "/safety")) return "DENİZDE GÜVENLİK";
  if (matchesPrefix(pathname, "/environment")) return "ÇEVRE KORUMA";
  if (matchesPrefix(pathname, "/meteorology")) return "METEOROLOJİ";
  if (matchesPrefix(pathname, "/economics")) return "TİCARİ OPERASYONLAR";
  if (matchesPrefix(pathname, "/communication")) return "DENİZDE HABERLEŞME";
  return "GENEL";
}
