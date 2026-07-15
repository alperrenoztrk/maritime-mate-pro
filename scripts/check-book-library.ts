import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { bookVolumes, getBookPagesForVolume } from "../src/data/bookContents";
import { bookVolumeDescriptors } from "../src/data/bookVolumes";
import { getBookVolumeForPath } from "../src/lib/bookRoutes";

const read = (path: string) => readFileSync(resolve(process.cwd(), path), "utf8");
const failures: string[] = [];
const ids = bookVolumes.map((volume) => volume.id);

if (bookVolumes.length !== 7) failures.push(`Beklenen 7 cilt yerine ${bookVolumes.length} cilt var.`);
if (bookVolumeDescriptors.length !== bookVolumes.length) failures.push("Hafif kapak kataloğu ile içerik ciltleri eşleşmiyor.");
if (new Set(ids).size !== ids.length) failures.push("Cilt kimlikleri benzersiz değil.");
for (const volume of bookVolumes) {
  if (volume.chapters.length < 2) failures.push(`${volume.title} en az iki bölüm içermiyor.`);
  if (getBookPagesForVolume(volume.id).length !== volume.chapters.length) {
    failures.push(`${volume.title} sayfa üretimi bölüm sayısıyla eşleşmiyor.`);
  }
}

const expectedRoutes = new Map([
  ["/navigation", "navigation-bridge"],
  ["/stability/calculations", "stability-cargo"],
  ["/seamanship/formulas", "seamanship-deck"],
  ["/regulations/solas", "safety-regulations"],
  ["/machine/diesel-engines/topics", "marine-engineering"],
  ["/crew/muster-list", "crew-organization"],
  ["/calculations", "workbook-reference"],
]);
for (const [route, expected] of expectedRoutes) {
  const actual = getBookVolumeForPath(route);
  if (actual !== expected) failures.push(`${route} yanlış cilde bağlı: ${actual}`);
}

const launcher = read("src/components/home/BookLauncher.tsx");
const bookPage = read("src/pages/BookPage.tsx");
const routeFrame = read("src/components/book/BookRouteFrame.tsx");
const bookSheet = read("src/components/book/BookSheet.tsx");
if (!launcher.includes("<BookVolumeLibrary")) failures.push("Ana sayfada cilt seçici yok.");
if (!launcher.includes("<OpenBook embedded volumeId={activeVolumeId}")) failures.push("Seçilen cilt yerinde açılmıyor.");
if (!bookPage.includes("getBookPagesForVolume(volumeId)")) failures.push("İçindekiler seçilen cilde göre üretilmiyor.");
if (!bookPage.includes("activeVolume.title.toLocaleUpperCase")) failures.push("Açılış kapağı cilt başlığını göstermiyor.");
if (!routeFrame.includes("document.body.dataset.bookVolume = volumeId")) failures.push("Derin içerik rotası cilt kimliğini korumuyor.");
if (!routeFrame.includes("volumeId={volumeId}") || !bookSheet.includes("--bs-volume-cover")) {
  failures.push("Derin içerik cildinin kapağı seçilen kitaba göre renklendirilmiyor.");
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}
console.log("Book library check passed: 7 volumes, route ownership, selection and opening behavior verified.");
