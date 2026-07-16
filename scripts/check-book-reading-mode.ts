import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const read = (path: string) => readFileSync(resolve(process.cwd(), path), "utf8");
const failures: string[] = [];
const bookLauncher = read("src/components/home/BookLauncher.tsx");
const bookPage = read("src/pages/BookPage.tsx");
const bookSheet = read("src/components/book/BookSheet.tsx");
const topicReader = read("src/components/book/BookTopicReader.tsx");

if (bookPage.includes("<button")) failures.push("İçindekiler kitabında görsel buton kaldı.");
if (bookLauncher.includes("useNavigate") || bookLauncher.includes('navigate("/book")')) {
  failures.push("Ana sayfa kitabı açılmadan ayrı /book rotasına gönderiyor.");
}
if (!bookLauncher.includes("<OpenBook embedded")) failures.push("Kitap ana sayfa içinde açılmıyor.");
if (!bookPage.includes("bk-scene--embedded")) failures.push("Ana sayfa için kompakt açık kitap görünümü eksik.");
if (!bookPage.includes("grid-template-columns:1fr 1fr")) failures.push("İçindekiler iki yapraklı değil.");
if (!bookPage.includes("bk-turn-leaf")) failures.push("İçindekiler yaprak çevirme animasyonu eksik.");
if (!bookPage.includes("onPointerMove={onPointerMove}") || !bookPage.includes("setPointerCapture")) {
  failures.push("İçindekiler yaprağı parmak hareketini canlı izlemiyor.");
}
if (!bookPage.includes("bk-turn-face--front") || !bookPage.includes("bk-turn-face--back")) {
  failures.push("Çevrilen yaprağın gerçek ön ve arka yüzleri eksik.");
}
if (!bookPage.includes("paginateBookPages") || bookPage.includes("overflow-y:auto")) {
  failures.push("Yoğun içindekiler fiziksel yapraklara bölünmüyor veya iç kaydırmaya taşıyor.");
}
if (!bookPage.includes("bk-folio")) failures.push("İçindekiler sayfa numarası eksik.");
if (topicReader.includes("Accordion") || topicReader.includes("AnimatePresence")) {
  failures.push("Salt okunur konu okuyucusunda kapalı panel veya modal kaldı.");
}
if (!topicReader.includes("content-visibility") && !bookSheet.includes("content-visibility:auto")) {
  failures.push("Tam açık uzun içerik için paint optimizasyonu eksik.");
}
if (!bookSheet.includes('[data-book-mode="reading"] .bs-route-content button')) {
  failures.push("Salt okunur rota kontrol sözleşmesi eksik.");
}
if (!bookSheet.includes('[data-book-mode="reading"] .bs-route-content :where(input')) {
  failures.push("Okuma sayfasındaki form girdileri kapatılmıyor.");
}
if (!bookSheet.includes("overflow-wrap:anywhere") || !bookSheet.includes("overscroll-behavior: contain")) {
  failures.push("Uzun kitap içeriği sayfa sınırları içinde tutulmuyor.");
}
if (
  !bookSheet.includes('.bs-route-content :where(.break-inside-avoid') ||
  !bookSheet.includes('.bs-route-content :where(.grid') ||
  !bookSheet.includes('display:block!important') ||
  !bookSheet.includes('content-visibility:visible!important')
) {
  failures.push("Bölünemeyen grid ve break-inside blokları fiziksel yapraklara açılmıyor.");
}
if (
  !bookSheet.includes('--bs-page-height') ||
  !bookSheet.includes('max-height:max(48px,calc(var(--bs-page-height') ||
  !bookSheet.includes('white-space:normal!important')
) {
  failures.push("Medya, tablo veya tek satırlık metin için sayfa sınırı koruması eksik.");
}
if (
  !bookSheet.includes('attributeFilter: ["class", "open", "hidden", "aria-expanded", "data-state"]') ||
  !bookSheet.includes('fontSet?.addEventListener("loadingdone", onFontLoad)') ||
  !bookSheet.includes('Math.ceil((total + gap - 1) / stride)')
) {
  failures.push("Dinamik içerik ve geç yüklenen yazı tipleri sayfa sayısını yenilemiyor.");
}
if (!bookPage.includes("useLayoutEffect") || !bookPage.includes("page.scrollHeight > page.clientHeight + 1")) {
  failures.push("İçindekiler yapraklarında gerçek render taşma denetimi eksik.");
}

for (const page of [
  "CargoTopicsPage",
  "EconomicsTopicsPage",
  "EnvironmentTopicsPage",
  "SafetyTopicsPage",
  "SeamanshipTopicsPage",
  "StabilityTopicsPage",
]) {
  const source = read(`src/pages/${page}.tsx`);
  if (!source.includes("<BookTopicReader")) failures.push(`${page} tam açık okuyucuyu kullanmıyor.`);
}

for (const page of [
  "LessonsPage",
  "LessonTopicsPage",
  "MachineTopicLessonsPage",
  "CrewRoleDetail",
  "CrewTaskDeepDive",
  "ShipOperationsDetail",
  "ShipOperationDeepDive",
  "ShipSystemDetailPage",
  "MusterListPage",
]) {
  const source = read(`src/pages/${page}.tsx`);
  if (source.includes("<button")) failures.push(`${page} okuma yaprağında buton kaldı.`);
}

if (failures.length > 0) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log("Book reading check passed: two-page book, numbered leaves, open sections and no reading buttons.");
