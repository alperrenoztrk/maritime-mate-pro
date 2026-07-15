import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import {
  getBookInteractionMode,
  getBookRoutePage,
  getBookRouteTitle,
  isBookContentPath,
} from "../src/lib/bookRoutes";

const appSource = readFileSync(resolve(process.cwd(), "src/App.tsx"), "utf8");
const contentsSource = readFileSync(resolve(process.cwd(), "src/data/bookContents.ts"), "utf8");
const hierarchySource = readFileSync(resolve(process.cwd(), "src/hooks/useNavigationHierarchy.ts"), "utf8");
const routePatterns = [...appSource.matchAll(/\bpath="([^"]+)"/g)].map((match) => match[1]);

const intentionallyOutsideBook = new Set([
  "/",
  "/book",
  "/maritime-news",
  "/beta",
  "/beta/work-hours",
  "/beta/psc-checklist",
  "/beta/ship-simulator",
  "/settings",
  "/auth",
  "/auth/callback",
  "/.lovable/oauth/consent",
  "/empty-page",
  "/moon-phases",
  "/clock",
  "/weather-forecast",
  "/sunset-times",
  "/sunrise-times",
  "/location-selector",
  "/widgets",
  "*",
]);

const concretePath = (pattern: string) => pattern.replace(/:[^/]+/g, "sample");
const uncovered = routePatterns.filter(
  (pattern) => !intentionallyOutsideBook.has(pattern) && !isBookContentPath(concretePath(pattern)),
);

const requiredInside = [
  "/lessons/stability/topics",
  "/lessons/stability/formulas",
  "/lessons/navigation/calculations",
  "/stability/formulas/moment-kg",
  "/navigation/calc/gc",
  "/machine/diesel-engines/calculations",
  "/ship-systems/nav-systems/0",
  "/cargo/calculations/draft-survey",
  "/converter",
];
const requiredOutside = ["/", "/book", "/maritime-news", "/settings", "/auth", "/beta/ship-simulator"];

const failures = [
  ...uncovered.map((route) => `Book frame kapsamı dışında kalan içerik rotası: ${route}`),
  ...requiredInside.filter((route) => !isBookContentPath(route)).map((route) => `Kitap rotası eşleşmedi: ${route}`),
  ...requiredOutside.filter((route) => isBookContentPath(route)).map((route) => `Kitap dışında kalması gereken rota eşleşti: ${route}`),
];

if (!appSource.includes("<BookRouteFrame pathname={location.pathname}>")) {
  failures.push("AnimatedRoutes kalıcı BookRouteFrame ile sarılmamış.");
}
if (!hierarchySource.includes("isBookContentPath(pathname) ? '/book' : '/'")) {
  failures.push("Yeni kitap rotaları için güvenli /book geri dönüşü eksik.");
}
for (const href of ["/calculations", "/formulas", "/regulations"]) {
  if (!contentsSource.includes(`to: "${href}"`)) failures.push(`İçindekiler referans bağlantısı eksik: ${href}`);
}
if (getBookRouteTitle("/stability/formulas/gm") !== "FORMÜLLER") failures.push("Formül yaprağı başlığı yanlış.");
if (getBookRouteTitle("/navigation/calc/gc") !== "HESAPLAMALAR") failures.push("Hesaplama yaprağı başlığı yanlış.");
if (getBookInteractionMode("/crew/chief-officer") !== "reading") failures.push("Personel yaprağı salt okunur değil.");
if (getBookInteractionMode("/navigation/calc/gc") !== "calculator") failures.push("Hesaplama girdileri etkin değil.");
if (getBookInteractionMode("/safety") !== "calculator") failures.push("Güvenlik hesaplama girdileri etkin değil.");
if (getBookInteractionMode("/economics") !== "calculator") failures.push("Ekonomi hesaplama girdileri etkin değil.");
if (getBookInteractionMode("/lessons/stability/quiz") !== "quiz") failures.push("Quiz girdileri etkin değil.");
if (getBookInteractionMode("/lessons/stability/assistant") !== "assistant") failures.push("Asistan girdileri etkin değil.");
if (getBookRoutePage("/lessons") % 2 !== 0) failures.push("Sol yaprak numarası çift değil.");

if (failures.length > 0) {
  console.error(failures.join("\n"));
  process.exit(1);
}

const covered = routePatterns.length - intentionallyOutsideBook.size;
console.log(`Book route check passed: ${covered} content route patterns share the persistent book frame.`);
