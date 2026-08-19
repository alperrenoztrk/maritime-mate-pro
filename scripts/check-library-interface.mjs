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
const tokens = read("src/styles/tokens.css");
const lessons = read("src/pages/curriculum/LessonsLibraryPage.tsx");
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
// Top inset now comes through --floating-nav-reserve, which is itself defined
// as calc(max(0.75rem, env(safe-area-inset-top)) + 2.75rem) in index.css. It
// reserves the notch AND the global back control, which a bare
// env(safe-area-inset-top) did not — the "Geri" pill used to sit on this
// shell's header.
requireText(tokens, "--floating-nav-reserve", "mobil güvenli alan + navigasyon şeridi");
requireText(tokens, "--app-tabbar-reserve", "alt sekme çubuğu güvenli alanı");
requireText(tokens, "var(--ad-banner-height", "reklam bandı güvenli alanı");
requireText(shared, "repeating-linear-gradient", "kitap bez cilt dokusu");
requireText(shared, "[perspective:1200px]", "kitap derinlik görünümü");
requireText(shared, "[transform-style:preserve-3d]", "kitabın 3B gövdesi");
requireText(shared, "rotateY(-90deg)", "kitap sırtının ayrı yüz olarak konumlanması");
requireText(shared, "font-book", "kapak yazısının kitap yazı tipi");
// Genel `* { hyphens: auto }` kuralı dar kapak kutusunda kelimeleri tireyle
// bölüyordu; kapak yazısı tiresiz kalmalı ve punto başlığa göre seçilmeli.
requireText(shared, "[hyphens:none]", "kapak yazısında tirenin kapalı olması");
requireText(shared, "coverTitleSize", "kapak yazısının başlık uzunluğuna göre ölçeklenmesi");
requireText(shared, 'name="xmark.circle.fill"', "ortak arama alanında temizleme işlevi");
// Başlık cildin üstüne doğrudan basılıyor; arkasındaki koyu deri etiket plakası
// kaldırıldı, okunurluk harflerin kabartma gölgesinden geliyor.
forbidText(shared, "rgba(26,18,11,0.95)", "başlık arkasındaki koyu etiket zemini");
// `body.marine-global` sayfa kabuğunun içindeki `bg-gradient-to-*` sınıflarını
// `background: transparent !important` ile siliyor; kartlar bu yüzden gradyanı
// satır içi kurar. Sınıf kartlara geri gelirse cilt renkleri yeniden kaybolur
// (sayfa kabuğunun kendisi zaten kasıtlı olarak nötrleniyor, o hariç).
forbidText(
  shared.slice(shared.indexOf("export function LibraryEntryCard")),
  "bg-gradient-to-",
  "kitaplık kartlarında silinen gradyan sınıfı",
);
const bookCard = shared.slice(
  shared.indexOf("export function LibraryBookCard"),
  shared.indexOf("export function LibraryCompactCard"),
);
requireText(bookCard, "{title}", "kitap kapağında kitap ismi");
for (const [text, label] of [
  ["Nautical Leap", "yayıncı işareti"],
  ["Mariner&apos;s Book", "marka üst başlığı"],
  ["<Icon", "kapak ikonu"],
  ["badge", "kapak rozeti"],
]) {
  forbidText(bookCard, text, `kitap kapağında ${label}`);
}

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
  ["Dersler", lessons],
  ["Operasyonlar", operations],
  ["Personel", crew],
  ["Köprüüstü", bridge],
  ["Alıştırmalar", exercises],
]) {
  requireText(source, "LibraryBookCard", `${label} kitap kapağı görünümü`);
}

// Dense tool/reference indexes use the iOS inset-grouped pattern. Realistic
// covers remain on content that behaves like a book; systems and calculators
// need faster scanning, visible counts and calmer tonal symbols.
for (const [label, source] of [
  ["Gemi Sistemleri", systems],
  ["Hesaplamalar", calculations],
  ["Regülasyonlar", regulations],
]) {
  requireText(source, "InsetGroupedList", `${label} iOS gruplanmış liste görünümü`);
  requireText(source, "LibraryCompactCard", `${label} kompakt tarama satırları`);
}

forbidText(regulations, "LibraryBookCard", "regülasyonlarda dekoratif 3B kitap kartı");
forbidText(regulations, "badge={regulationItems.filter", "regülasyon kategori sayaç rozeti");
requireText(regulations, "useSearchParams", "regülasyon arama ve kategori derin bağlantıları");
requireText(regulations, "onBack={activeCategory ? closeCategory : undefined}", "regülasyon kategori içi geri davranışı");

forbidText(lessons, "category.subtitle", "ders kapaklarında gereksiz açıklama");
forbidText(lessons, "entry.description", "ders kitaplığı başlık altı açıklaması");
forbidText(operations, "ship.description", "operasyon kapaklarında gereksiz açıklama");
forbidText(operations, "badge={", "operasyon kapaklarında sayısal rozet");
requireText(systems, "badge={shipSystemsData", "sistem satırlarında konu sayısı");

// Operasyon ekranları gemi görselleriyle değil sade cilt kapaklarıyla çalışır.
forbidText(operations, "image", "operasyon kapaklarında gemi görseli");
forbidText(operationDetail, "<img", "operasyon detayında gemi görseli");
forbidText(read("src/data/shipOperations/types.ts"), "image", "operasyon verisinde görsel alanı");

for (const [label, source] of [
  ["Personel görev özeti", read("src/pages/CrewRoleDetail.tsx")],
  ["Personel detay anlatımı", read("src/pages/CrewTaskDeepDive.tsx")],
  ["Ders konu listesi", read("src/pages/LessonTopicsPage.tsx")],
  ["Operasyon detay anlatımı", read("src/pages/ShipOperationDeepDive.tsx")],
  ["Operasyon listesi", operationDetail],
  ["Sistem detay anlatımı", read("src/pages/ShipSystemDeepDive.tsx")],
]) {
  forbidText(source, "20-30 sayfa", `${label} sayfa sayısı metni`);
  forbidText(source, "20-30 sayfalık", `${label} sayfa sayısı metni`);
  forbidText(source, "estimatedPages}", `${label} tahmini sayfa rozeti`);
  forbidText(source, "minPagesPerTopic}", `${label} asgari sayfa açıklaması`);
}

// Operasyon listesi satır içi açılmaz: başlık doğrudan detaylı anlatıma gider,
// amaç/prosedür/mevzuat blokları orada "Operasyon Özeti" olarak okunur.
requireText(
  operationDetail,
  "/ship-operations/${shipType}/${activeDepartment}/${index}",
  "operasyon başlığından detaylı anlatıma geçiş",
);
forbidText(operationDetail, "expandedOperation", "operasyon listesinde satır içi açılır bölüm");
forbidText(operationDetail, "Detaylı Anlatımı Aç", "operasyon listesinde ayrı detaylı anlatım butonu");
forbidText(operationDetail, 'type="multiple"', "operasyon çoklu açık bölüm davranışı");
requireText(
  read("src/pages/ShipOperationDeepDive.tsx"),
  "Operasyon Özeti",
  "listeden taşınan operasyon özeti",
);
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
  "✅ Kitaplık arayüzü doğrulandı: gerçekçi kapaklar, iOS gruplanmış tarama listeleri, sade başlıklar ve ana kitaplık rotaları korunuyor.",
);
