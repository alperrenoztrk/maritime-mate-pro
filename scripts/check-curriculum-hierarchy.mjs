import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const failures = [];

const hierarchy = read("src/data/curriculumHierarchy.ts");
const beta = read("src/data/betaLessons.ts");
const categories = read("src/data/calculationCenterConfig.ts");
const machine = read("src/data/machineTopicData.ts");
const lessonTopics = read("src/pages/LessonTopicsPage.tsx");
const exerciseTopics = read("src/pages/ExerciseTopicsPage.tsx");
const machineTopics = read("src/pages/MachineTopicLessonsPage.tsx");
const deckDetail = read("src/pages/LessonTopicDetailPage.tsx");
const machineDetail = read("src/pages/MachineTopicDetailPage.tsx");

const requireText = (source, text, label) => {
  if (!source.includes(text)) failures.push(`${label}: eksik ifade veya entegrasyon: ${text}`);
};

const forbidText = (source, text, label) => {
  if (source.includes(text)) failures.push(`${label}: kaldırılması gereken ifade hâlâ mevcut: ${text}`);
};

const requiredCourses = [
  "Seyir ve Sefer Planlama",
  "Deniz Meteorolojisi ve Hava Yönetimi",
  "GMDSS ve Denizcilik İletişimi",
  "Stabilite ve Yükleme Durumu",
  "Yük Operasyonları ve İstif",
  "Deniz Emniyeti ve Acil Durumlar",
  "MARPOL ve Deniz Çevresinin Korunması",
  "Gemicilik ve Güverte Operasyonları",
  "Ticari Gemi Operasyonları",
];
for (const title of requiredCourses) {
  requireText(hierarchy, title, "curriculumHierarchy");
  requireText(categories, title, "calculationCenterConfig");
}

const requiredTracks = [
  "Çatışmayı Önleme Kuralları — COLREG",
  "Köprüüstü Vardiyası ve BRM",
  "Gemi Manevrası, Pilotaj ve Römorkör",
  "Gemi Yapısı ve Hasar Kontrolü",
  "Gemi Güvenliği, ISPS ve Siber Riskler",
  "Gemide Tıbbi İlk Yardım",
  "GMDSS ve Radyo Haberleşmesi",
  "Denizcilik İngilizcesi ve Operasyonel İletişim",
  "Mevzuat, Sertifikalar ve Denetimler",
];
for (const title of requiredTracks) requireText(hierarchy, title, "yeterlilik parkurları");

forbidText(categories, 'subtitle: ""', "kategori alt başlıkları");
forbidText(categories, 'title: "Cargo Handling and Stowage"', "başlık dil standardı");
forbidText(categories, 'title: "Denizde Güvenlik"', "safety/security ayrımı");
forbidText(machine, 'title: "Bakım ve Tutum"', "makine başlıkları");
forbidText(machine, 'title: "Engine Resource Management"', "makine başlıkları");
forbidText(machine, 'title: "Çevre ve MARPOL – Makine"', "makine başlıkları");

requireText(hierarchy, "RUNNING_FIX_CANONICAL", "Running Fix kanonikleştirme");
requireText(hierarchy, "RUNNING_FIX_DEPRECATED", "Running Fix geriye dönük alias");
requireText(hierarchy, "curriculumTopicAliases", "başlık alias sistemi");
requireText(beta, "getBetaModules", "Beta modül API'si");
requireText(beta, "getBetaTopicIds", "sabit konu kimliği API'si");
requireText(beta, "getBetaTopicById", "kimlikten konu çözümleme");
requireText(beta, "sourceTitle", "başlık geriye dönük uyumluluğu");
requireText(beta, "Yöntem, Uygulama ve Operasyonel Değerlendirme", "genel section başlığı düzeltmesi");

for (const [file, source] of [
  ["LessonTopicsPage", lessonTopics],
  ["ExerciseTopicsPage", exerciseTopics],
  ["MachineTopicLessonsPage", machineTopics],
]) {
  requireText(source, "getBetaModules", `${file} modül entegrasyonu`);
  forbidText(source, "topicsData", `${file} eski sabit konu listesi`);
}
requireText(deckDetail, "getBetaTopic", "güverte detay kimlik çözümleme");
requireText(machineDetail, "getBetaTopic", "makine detay kimlik çözümleme");

const literalIds = [...hierarchy.matchAll(/\bid:\s*"([a-z0-9-]+)"/g)].map((match) => match[1]);
const duplicates = [...new Set(literalIds.filter((id, index) => literalIds.indexOf(id) !== index))];
if (duplicates.length) failures.push(`curriculumHierarchy: yinelenen sabit id: ${duplicates.join(", ")}`);

const genericDisplayHeadings = ["Detaylı Anlatım", "Formül 1", "Çözümlü Örnek 1"];
for (const heading of genericDisplayHeadings) {
  if (lessonTopics.includes(`>${heading}<`) || machineTopics.includes(`>${heading}<`)) {
    failures.push(`kullanıcı arayüzü: genel/anlamsız başlık gösteriliyor: ${heading}`);
  }
}

if (failures.length) {
  console.error("❌ Müfredat hiyerarşisi kontrolü başarısız:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(
  `✅ Müfredat hiyerarşisi doğrulandı: ${requiredCourses.length} ana ders, ${requiredTracks.length} yeterlilik parkuru, sabit kimlikler, alias'lar ve modül tabanlı ekranlar.`,
);
