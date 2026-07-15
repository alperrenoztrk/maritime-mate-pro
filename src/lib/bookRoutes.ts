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

/** Running head printed at the top of the persistent paper sheet. */
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
