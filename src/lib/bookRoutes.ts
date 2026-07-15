import type { BookVolumeId } from "@/data/bookVolumes";

/**
 * Routes that belong to the Mariner's Book experience. The home screen,
 * settings, authentication, news and beta tools deliberately stay outside
 * the book; every educational/reference/tool route stays on a book sheet.
 */
export const BOOK_ROUTE_PREFIXES = [
  "/calculations",
  "/lessons",
  "/exercises",
  "/crew",
  "/glossary",
  "/bridge",
  "/machinery",
  "/ship-tasks",
  "/ship-operations",
  "/passage-plan",
  "/ship-systems",
  "/stability",
  "/safety",
  "/meteorology",
  "/tank",
  "/cargo",
  "/communication",
  "/ballast",
  "/engine",
  "/hydrodynamics",
  "/structural",
  "/special-ships",
  "/emissions",
  "/environment",
  "/solas",
  "/seamanship",
  "/machine",
  "/navigation",
  "/economics",
  "/formulas",
  "/regulations",
  "/exam-preparation",
  "/converter",
  "/machine-calculations",
] as const;

const matchesPrefix = (pathname: string, prefix: string) =>
  pathname === prefix || pathname.startsWith(`${prefix}/`);

export function isBookContentPath(pathname: string): boolean {
  return BOOK_ROUTE_PREFIXES.some((prefix) => matchesPrefix(pathname, prefix));
}

export type BookInteractionMode = "reading" | "calculator" | "quiz" | "assistant";

export function getBookInteractionMode(pathname: string): BookInteractionMode {
  if (pathname.includes("/assistant")) return "assistant";
  if (
    pathname.includes("/quiz") ||
    pathname.includes("/scenarios") ||
    matchesPrefix(pathname, "/exercises") ||
    matchesPrefix(pathname, "/exam-preparation")
  ) return "quiz";
  if (
    pathname.includes("/calculations") ||
    pathname.includes("/calc/") ||
    matchesPrefix(pathname, "/calculations") ||
    matchesPrefix(pathname, "/tank") ||
    matchesPrefix(pathname, "/ballast") ||
    matchesPrefix(pathname, "/hydrodynamics") ||
    matchesPrefix(pathname, "/structural") ||
    matchesPrefix(pathname, "/special-ships") ||
    matchesPrefix(pathname, "/emissions") ||
    matchesPrefix(pathname, "/converter") ||
    matchesPrefix(pathname, "/machine-calculations") ||
    pathname === "/navigation" ||
    pathname === "/safety" ||
    pathname === "/economics"
  ) return "calculator";
  return "reading";
}

type VolumeRouteRule = {
  volumeId: BookVolumeId;
  prefixes: readonly string[];
};

export const BOOK_VOLUME_ROUTE_RULES: readonly VolumeRouteRule[] = [
  {
    volumeId: "navigation-bridge",
    prefixes: [
      "/lessons/navigation", "/lessons/meteorology", "/lessons/communication",
      "/ship-systems/nav-systems", "/ship-systems/gmdss-lsa",
      "/navigation", "/meteorology", "/communication", "/bridge", "/passage-plan",
    ],
  },
  {
    volumeId: "stability-cargo",
    prefixes: [
      "/lessons/stability", "/lessons/cargo", "/lessons/economics",
      "/ship-systems/cargo-systems", "/ship-operations",
      "/stability", "/cargo", "/tank", "/ballast", "/special-ships", "/economics",
    ],
  },
  {
    volumeId: "seamanship-deck",
    prefixes: [
      "/lessons/seamanship", "/ship-systems/deck-machinery",
      "/seamanship", "/ship-tasks",
    ],
  },
  {
    volumeId: "safety-regulations",
    prefixes: [
      "/lessons/safety", "/lessons/environment", "/ship-systems/fire-safety",
      "/safety", "/environment", "/emissions", "/regulations", "/solas",
    ],
  },
  {
    volumeId: "marine-engineering",
    prefixes: [
      "/machine", "/engine", "/machinery", "/hydrodynamics", "/structural",
      "/ship-systems/main-engine", "/ship-systems/auxiliary",
      "/ship-systems/environmental-auxiliary",
    ],
  },
  {
    volumeId: "crew-organization",
    prefixes: ["/crew"],
  },
  {
    volumeId: "workbook-reference",
    prefixes: [
      "/calculations", "/formulas", "/exercises", "/exam-preparation",
      "/converter", "/machine-calculations", "/glossary", "/lessons", "/ship-systems",
    ],
  },
];

export function getBookVolumeForPath(pathname: string): BookVolumeId {
  for (const rule of BOOK_VOLUME_ROUTE_RULES) {
    if (rule.prefixes.some((prefix) => matchesPrefix(pathname, prefix))) return rule.volumeId;
  }
  return "workbook-reference";
}

/**
 * Every physical volume restarts its folios. Route pages remain deterministic
 * while no longer inheriting a single 600+ page global book number.
 */
export function getBookRoutePage(pathname: string): number {
  const volumeId = getBookVolumeForPath(pathname);
  const volumeRule = BOOK_VOLUME_ROUTE_RULES.find((rule) => rule.volumeId === volumeId);
  const sectionIndex = Math.max(
    0,
    volumeRule?.prefixes.findIndex((prefix) => matchesPrefix(pathname, prefix)) ?? 0,
  );
  const sectionStart = 2 + sectionIndex * 32;
  if (volumeRule?.prefixes.some((prefix) => pathname === prefix)) return sectionStart;

  let hash = 0;
  for (const character of pathname) hash = (hash * 31 + character.charCodeAt(0)) >>> 0;
  return sectionStart + (hash % 15) * 2;
}

export function getBookRouteTitle(pathname: string): string {
  if (pathname === "/crew/muster-list") return "ROLE CETVELİ";
  if (pathname.includes("/formulas") || pathname === "/formulas") return "FORMÜLLER";
  if (
    pathname.includes("/calculations") ||
    pathname.includes("/calc/") ||
    matchesPrefix(pathname, "/calculations") ||
    matchesPrefix(pathname, "/tank") ||
    matchesPrefix(pathname, "/ballast") ||
    matchesPrefix(pathname, "/hydrodynamics") ||
    matchesPrefix(pathname, "/structural") ||
    matchesPrefix(pathname, "/special-ships") ||
    matchesPrefix(pathname, "/emissions") ||
    pathname === "/navigation" ||
    pathname === "/safety" ||
    pathname === "/economics"
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
  if (matchesPrefix(pathname, "/navigation") || matchesPrefix(pathname, "/passage-plan") || matchesPrefix(pathname, "/bridge")) {
    return "SEYİR";
  }
  if (matchesPrefix(pathname, "/stability")) return "GEMİ STABİLİTESİ";
  if (matchesPrefix(pathname, "/cargo")) return "YÜK İŞLEMLERİ";
  if (matchesPrefix(pathname, "/seamanship")) return "GEMİCİLİK";
  if (matchesPrefix(pathname, "/safety")) return "DENİZDE GÜVENLİK";
  if (matchesPrefix(pathname, "/environment")) return "ÇEVRE KORUMA";
  if (matchesPrefix(pathname, "/meteorology")) return "METEOROLOJİ";
  if (matchesPrefix(pathname, "/economics")) return "TİCARİ OPERASYONLAR";
  if (matchesPrefix(pathname, "/communication")) return "DENİZDE HABERLEŞME";
  return "MARINER'S BOOK";
}
