import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import {
  bookVolumes,
  getBookPagesForVolume,
  getBookVolumesForCollection,
} from "../src/data/bookContents";
import { bookCollections } from "../src/data/bookVolumes";
import { getBookVolumeForPath } from "../src/lib/bookRoutes";

const read = (path: string) => readFileSync(resolve(process.cwd(), path), "utf8");
const failures: string[] = [];
const ids = bookVolumes.map((volume) => volume.id);

if (bookCollections.length !== 6) failures.push(`Beklenen 6 ana kitap yerine ${bookCollections.length} kitap var.`);
if (new Set(ids).size !== ids.length) failures.push("Alt kitap kimlikleri benzersiz değil.");

const lessons = getBookVolumesForCollection("lessons");
const exercises = getBookVolumesForCollection("exercises");
const systems = getBookVolumesForCollection("systems");
const operations = getBookVolumesForCollection("operations");
const crew = getBookVolumesForCollection("crew");
const glossary = getBookVolumesForCollection("glossary");

if (lessons.length < 20) failures.push("Her güverte ve makine dersi ayrı kitaba dönüşmemiş.");
if (!lessons.some((volume) => volume.id === "lesson-stability")) failures.push("Stabilite kitabı eksik.");
if (!lessons.some((volume) => volume.id === "lesson-navigation")) failures.push("Seyir kitabı eksik.");
if (!lessons.some((volume) => volume.id.startsWith("lesson-machine-"))) failures.push("Makine ders kitapları eksik.");
if (exercises.length !== lessons.length || !exercises.every((volume) => volume.id.startsWith("exercise-"))) {
  failures.push("Alıştırmalar konu bazında ayrı kitaplara dönüşmemiş.");
}
if (!exercises.some((volume) => volume.id === "exercise-stability")) failures.push("Stabilite alıştırma kitabı eksik.");
if (!exercises.some((volume) => volume.id === "exercise-navigation")) failures.push("Seyir alıştırma kitabı eksik.");
if (!exercises.some((volume) => volume.id.startsWith("exercise-machine-"))) failures.push("Makine alıştırma kitapları eksik.");
if (systems.length < 5 || !systems.every((volume) => volume.id.startsWith("system-"))) {
  failures.push("Her gemi sistemi ayrı kitap değil.");
}
if (operations.length < 1 || !operations.every((volume) => volume.id.startsWith("operation-"))) {
  failures.push("Her gemi tipi ayrı operasyon kitabı değil.");
}
if (crew.length !== 1 || crew[0].id !== "crew") failures.push("Personel tek kitap değil.");
if (glossary.length !== 1 || glossary[0].id !== "glossary") failures.push("Sözlük tek kitap değil.");

for (const volume of bookVolumes) {
  if (volume.chapters.length < 1) failures.push(`${volume.title} içinde bölüm yok.`);
  if (getBookPagesForVolume(volume.id).length !== volume.chapters.length) {
    failures.push(`${volume.title} sayfa üretimi bölüm sayısıyla eşleşmiyor.`);
  }
}

const expectedRoutes = new Map([
  ["/lessons/stability/topics", "lesson-stability"],
  ["/lessons/navigation/topics", "lesson-navigation"],
  ["/machine/diesel-engines/topics", "lesson-machine-diesel-engines"],
  ["/stability/quiz", "exercise-stability"],
  ["/exercises/stability/topics", "exercise-stability"],
  ["/ship-systems/nav-systems/0", "system-nav-systems"],
  ["/ship-operations/dokme/guverte/0", "operation-dokme"],
  ["/crew/muster-list", "crew"],
  ["/glossary", "glossary"],
]);
for (const [route, expected] of expectedRoutes) {
  const actual = getBookVolumeForPath(route);
  if (actual !== expected) failures.push(`${route} yanlış kitaba bağlı: ${actual}`);
}

const launcher = read("src/components/home/BookLauncher.tsx");
const bookPage = read("src/pages/BookPage.tsx");
const library = read("src/components/book/BookVolumeLibrary.tsx");
const routeFrame = read("src/components/book/BookRouteFrame.tsx");
const bookSheet = read("src/components/book/BookSheet.tsx");

if (!launcher.includes("<BookCollectionLibrary")) failures.push("Ana sayfada altı ana kitap yok.");
if (!launcher.includes("<OpenBook embedded collectionId={activeCollectionId}")) failures.push("Seçilen ana kitap yerinde açılmıyor.");
if (!bookPage.includes("getBookVolumesForCollection")) failures.push("Ana kitaptan konu kitaplığına geçiş yok.");
if (!library.includes('group ?? collection.title')) failures.push("Güverte ve makine raf ayrımı yok.");
if (!routeFrame.includes("getBookRouteVolume(pathname)")) failures.push("Derin rota kendi kitap kimliğini çözmüyor.");
if (!bookSheet.includes("--bs-volume-cover")) failures.push("Derin içerik kitap kapağının rengini korumuyor.");

for (const file of [
  "src/components/home/BookLauncher.tsx",
  "src/components/book/BookVolumeLibrary.tsx",
  "src/components/book/BookSheet.tsx",
]) {
  const source = read(file);
  if (source.includes("@/data/bookContents")) failures.push(`${file} tüm müfredatı başlangıçta yüklüyor.`);
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}
console.log(`Book library check passed: 6 main books and ${bookVolumes.length} independently opening sub-books.`);
