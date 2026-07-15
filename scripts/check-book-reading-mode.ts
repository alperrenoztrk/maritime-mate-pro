import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const read = (path: string) => readFileSync(resolve(process.cwd(), path), "utf8");
const failures: string[] = [];
const bookPage = read("src/pages/BookPage.tsx");
const bookSheet = read("src/components/book/BookSheet.tsx");
const topicReader = read("src/components/book/BookTopicReader.tsx");

if (bookPage.includes("<button")) failures.push("İçindekiler kitabında görsel buton kaldı.");
if (!bookPage.includes("grid-template-columns:1fr 1fr")) failures.push("İçindekiler iki yapraklı değil.");
if (!bookPage.includes("bk-turn-leaf")) failures.push("İçindekiler yaprak çevirme animasyonu eksik.");
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
