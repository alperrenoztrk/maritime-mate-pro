import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const failures = [];

const requireText = (source, text, label) => {
  if (!source.includes(text)) failures.push(`${label}: eksik entegrasyon: ${text}`);
};

const forbidText = (source, text, label) => {
  if (source.includes(text)) failures.push(`${label}: eski arayüz geri dönmüş: ${text}`);
};

const shared = read("src/components/library/LibraryInterface.tsx");
const operations = read("src/pages/ShipOperationsPage.tsx");
const operationDetail = read("src/pages/ShipOperationsDetail.tsx");
const crew = read("src/pages/CrewHierarchyPage.tsx");
const systems = read("src/pages/ShipSystemsPage.tsx");
const bridge = read("src/pages/BridgeDevicesPage.tsx");
const exercises = read("src/pages/ExercisesPage.tsx");
const glossary = read("src/pages/Glossary.tsx");
const beta = read("src/pages/BetaFeaturesPage.tsx");
const calculationsRoute = read("src/pages/CalculationsMenu.tsx");
const calculations = read("src/pages/library/CalculationsLibraryPage.tsx");
const regulationsRoute = read("src/pages/Regulations.tsx");
const regulations = read("src/pages/library/RegulationsLibraryPage.tsx");
const tasksRoute = read("src/pages/ShipTasksPage.tsx");
const tasks = read("src/pages/library/ShipTasksLibraryPage.tsx");

for (const primitive of [
  "LibraryPageShell",
  "LibraryEntryCard",
  "LibraryBookCard",
  "LibraryCompactCard",
  "LibrarySearchField",
]) {
  requireText(shared, `export function ${primitive}`, "ortak kitaplık bileşenleri");
}
requireText(shared, "safe-area-inset-top", "mobil güvenli alan");
requireText(shared, "--ad-banner-height", "reklam bandı güvenli alanı");

for (const [label, source] of [
  ["Operasyonlar", operations],
  ["Personel", crew],
  ["Gemi Sistemleri", systems],
  ["Köprüüstü", bridge],
  ["Alıştırmalar", exercises],
  ["Sözlük", glossary],
  ["Beta", beta],
  ["Hesaplamalar", calculations],
  ["Regülasyonlar", regulations],
  ["Gemi Görevleri", tasks],
]) {
  requireText(source, "LibraryPageShell", `${label} ortak sayfa kabuğu`);
}

for (const [label, source] of [
  ["Operasyonlar", operations],
  ["Personel", crew],
  ["Gemi Sistemleri", systems],
  ["Köprüüstü", bridge],
  ["Alıştırmalar", exercises],
  ["Hesaplamalar", calculations],
  ["Regülasyonlar", regulations],
]) {
  requireText(source, "LibraryBookCard", `${label} kitap kapağı görünümü`);
}

requireText(operationDetail, "expandedOperation", "operasyon tek açık bölüm davranışı");
forbidText(operationDetail, 'type="multiple"', "operasyon çoklu açık bölüm davranışı");
requireText(tasks, "expandedCategory", "gemi görevleri tek açık bölüm davranışı");
forbidText(tasks, "<table", "gemi görevleri yoğun tablo görünümü");
requireText(glossary, "useSearchParams", "sözlük derin bağlantıları");
requireText(glossary, 'searchParams.get("q")', "sözlük arama derin bağlantısı");
requireText(glossary, 'searchParams.get("cat")', "sözlük kategori derin bağlantısı");
requireText(calculationsRoute, "SEO", "hesaplamalar SEO koruması");
requireText(calculations, "FAVORITES_STORAGE_KEY", "hesaplama favorileri");
requireText(calculations, "RECENT_STORAGE_KEY", "son kullanılan hesaplamalar");
requireText(regulationsRoute, "RegulationsLibraryPage", "regülasyon rota yönlendirmesi");
requireText(tasksRoute, "ShipTasksLibraryPage", "gemi görevleri rota yönlendirmesi");
requireText(crew, "departmentParam === null", "personel varsayılan görünüm koruması");

if (failures.length) {
  console.error("❌ Kitaplık arayüzü kontrolü başarısız:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(
  "✅ Kitaplık arayüzü doğrulandı: ortak bileşenler, ana kataloglar, kitap kapakları, tek açık bölüm davranışı ve geriye dönük bağlantılar korunuyor.",
);
