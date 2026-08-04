import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const failures = [];

const hierarchy = read("src/data/curriculumHierarchy.ts");
const beta = read("src/data/betaLessons.ts");
const supplements = read("src/data/curriculumSupplementTopics.ts");
const categories = read("src/data/calculationCenterConfig.ts");
const machine = read("src/data/machineTopicData.ts");
const machineLessons = read("src/data/machineTopicLessonData.ts");
const lessonsRoute = read("src/pages/LessonsPage.tsx");
const lessonTopicsRoute = read("src/pages/LessonTopicsPage.tsx");
const machineTopicsRoute = read("src/pages/MachineTopicLessonsPage.tsx");
const lessonsPage = read("src/pages/curriculum/LessonsLibraryPage.tsx");
const lessonTopics = read("src/pages/curriculum/DeckCurriculumCoursePage.tsx");
const machineTopics = read("src/pages/curriculum/MachineCurriculumCoursePage.tsx");
const courseTabs = read("src/components/curriculum/CourseSectionTabs.tsx");
const courseHeader = read("src/components/courseContent/CourseTopicHeader.tsx");
const exerciseTopics = read("src/pages/ExerciseTopicsPage.tsx");
const exerciseDetail = read("src/pages/ExerciseTopicDetailPage.tsx");
const questionDistribution = read("src/data/exerciseQuestionDistribution.ts");
const topicQuestionSet = read("src/components/lessons/TopicExerciseQuestionSet.tsx");
const deckDetail = read("src/pages/LessonTopicDetailPage.tsx");
const machineDetail = read("src/pages/MachineTopicDetailPage.tsx");

const requireText = (source, text, label) => {
  if (!source.includes(text)) failures.push(`${label}: eksik ifade veya entegrasyon: ${text}`);
};

const forbidText = (source, text, label) => {
  if (source.includes(text)) failures.push(`${label}: kaldırılması gereken ifade hâlâ mevcut: ${text}`);
};

const requiredCourses = [
  "Seyir",
  "Meteoroloji",
  "Denizde Haberleşme",
  "Stabilite",
  "Cargo Handling and Stowage",
  "Denizde Güvenlik",
  "Denizcilik ve Çevre Koruma",
  "Gemicilik",
  "Deniz İşletmeciliğinde Ticari Operasyonlar",
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
for (const title of requiredTracks) requireText(hierarchy, title, "yeterlilik veri eşleştirmeleri");

forbidText(categories, 'subtitle: ""', "kategori alt başlıkları");
// Ders adları bilinçli olarak eski, kısa hâllerine döndürüldü ("Seyir",
// "Denizde Güvenlik", "Cargo Handling and Stowage"): uzun akademik başlıkların
// locale karşılığı yoktu ve İngilizce kullanımda makine çevirisine düşüyordu.
// Bu yüzden eski adları yasaklayan denetimler kaldırıldı.
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

requireText(lessonsRoute, "LessonsLibraryPage", "Dersler rota yönlendirmesi");
requireText(lessonTopicsRoute, "DeckCurriculumCoursePage", "güverte rota yönlendirmesi");
requireText(machineTopicsRoute, "MachineCurriculumCoursePage", "makine rota yönlendirmesi");
requireText(lessonsPage, "useSearchParams", "kitaplık görünüm seçimi");
requireText(lessonsPage, "Güverte Kitaplığı", "kitaplık girişleri");
requireText(lessonsPage, "Makine Kitaplığı", "kitaplık girişleri");
forbidText(lessonsPage, "Mesleki Yeterlilikler", "ayrı yeterlilik kitaplığı");
forbidText(lessonsPage, '"tracks"', "ayrı yeterlilik görünümü");
forbidText(lessonsPage, "competencyTracks", "yeterlilik parkurları arayüzü");
requireText(lessonsPage, "aspect-[3/4]", "kitap kapağı görünümü");
forbidText(lessonsPage, "sectionIconMap", "ana ekrandaki araç butonları");
forbidText(lessonsPage, "config.sections.map", "ana ekrandaki araç butonları");

for (const [file, source] of [
  ["DeckCurriculumCoursePage", lessonTopics],
  ["ExerciseTopicsPage", exerciseTopics],
  ["MachineCurriculumCoursePage", machineTopics],
]) {
  requireText(source, "getBetaModules", `${file} modül entegrasyonu`);
  forbidText(source, "topicsData", `${file} eski sabit konu listesi`);
  forbidText(source, "TopicCompetencyBadges", `${file} yeterlilik etiketi`);
}
forbidText(deckDetail, "TopicCompetencyBadges", "güverte konu detayı yeterlilik etiketi");
forbidText(machineDetail, "TopicCompetencyBadges", "makine konu detayı yeterlilik etiketi");

requireText(lessonTopics, "CourseSectionTabs", "güverte ders sekmeleri");
requireText(machineTopics, "CourseSectionTabs", "makine ders sekmeleri");
requireText(lessonTopics, "expandedModule", "güverte tek açık modül davranışı");
requireText(machineTopics, "expandedModule", "makine tek açık modül davranışı");
forbidText(lessonTopics, "expandedModules", "güverte çoklu açık modül davranışı");
forbidText(machineTopics, "expandedModules", "makine çoklu açık modül davranışı");
forbidText(lessonTopics, "Ders Araçları", "güverte ayrı araç kartı");
forbidText(machineTopics, "Ders Araçları", "makine ayrı araç kartı");

for (const tabLabel of ["Konular", "Hesaplamalar", "Formüller", "Alıştırmalar"]) {
  requireText(courseTabs, tabLabel, "ortak ders sekmeleri");
}
forbidText(courseTabs, 'id: "rules", label: "Kurallar"', "ayrı kurallar sekmesi");
requireText(courseTabs, "/exercises/${exerciseCategory}/topics", "Alıştırmalar konu listesi yönlendirmesi");
forbidText(courseTabs, "/exercises/${exerciseCategory}/quiz", "eski toplu quiz yönlendirmesi");
requireText(courseHeader, "CourseSectionTabs", "araç sayfalarında kalıcı sekme şeridi");
forbidText(courseHeader, "sectionMeta", "tekrarlanan bölüm alt başlığı");

const requiredSupplementTopics = [
  "IAMSAR ve Arama Kurtarma Koordinasyonu",
  "İş Emniyetinde Şiddet, Taciz ve Zorbalığın Önlenmesi",
  "Konteyner Kaybı, Tehlike Mesajı ve Olay Belgeleri",
  "Alternatif Yakıtların Operasyonel Emniyeti",
  "Yüksek Gerilim İzolasyonu ve Ark Parlaması Emniyeti",
  "Batarya Enerji Depolama ve Termal Kaçak",
  "Makine Otomasyonu ve OT Siber Güvenliği",
  "Psikolojik Güvenlik, Şiddet ve Tacize Müdahale",
  "Havuzlama ve Teknik Survey Hazırlığı",
];
for (const title of requiredSupplementTopics) {
  requireText(supplements, title, "mevcut modüllere eklenen konular");
}

const requiredExistingModuleTargets = [
  'moduleId: "com-distress"',
  'moduleId: "safety-occupational"',
  'moduleId: "cargo-documents"',
  'moduleId: "machine-fuel-technology-deniz-yakit-turleri"',
  'moduleId: "machine-electrical-elektrik-dagitim-sistemi"',
  'moduleId: "machine-electrical-aydinlatma-ve-aku-sistemleri"',
  'moduleId: "machine-automation-plc-ve-otomasyon-sistemleri"',
  'moduleId: "machine-erm-liderlik-ve-iletisim"',
  'moduleId: "machine-maintenance-planli-bakim-sistemi-pms"',
];
for (const target of requiredExistingModuleTargets) {
  requireText(supplements, target, "tamamlayıcı konu modül hedefi");
}

for (const existingModuleTitle of [
  "Deniz Yakıt Türleri",
  "Elektrik Dağıtım Sistemi",
  "Aydınlatma ve Akü Sistemleri",
  "PLC ve Otomasyon Sistemleri",
  "Liderlik ve İletişim",
  "Planlı Bakım Sistemi (PMS)",
]) {
  requireText(machineLessons, existingModuleTitle, "makine mevcut modül hedefi");
}
requireText(beta, "getCurriculumSupplementTopics", "tamamlayıcı konu veri bağlantısı");
requireText(beta, ".filter((topic) => topic.moduleId === module.id)", "yalnız mevcut modüle ekleme davranışı");
requireText(beta, "getCurriculumModules(key).map", "mevcut modül listesinin korunması");
forbidText(beta, "supplementModules", "yeni tamamlayıcı modül üretimi");
forbidText(beta, "modules.push", "yeni modül başlığı üretimi");

requireText(questionDistribution, "getTopicQuiz", "eski quiz bankası kaynağı");
requireText(questionDistribution, "getBetaTopic", "konu içeriğine göre soru eşleştirmesi");
requireText(questionDistribution, "preferredTopicByQuestionCategory", "soru kategorisi eşleştirmesi");
requireText(questionDistribution, "assignedQuestions !== questions.length", "tüm soruların atanma kontrolü");
requireText(exerciseTopics, "questionsByTopic.get(topic.id)", "konu kartlarında soru dağılımı");
requireText(exerciseTopics, "#konu-sorulari", "konu sorularına doğrudan bağlantı");
forbidText(exerciseTopics, "Quiz Soruları", "tek parça quiz kartı");
requireText(exerciseDetail, "getExerciseQuestionsForTopic", "konu detayında dağıtılmış sorular");
requireText(exerciseDetail, "TopicExerciseQuestionSet", "konu bazlı soru çözme bileşeni");
requireText(topicQuestionSet, "KnowledgeCheck", "mevcut soru-cevap davranışının korunması");
requireText(topicQuestionSet, "questions.length", "konu soru adedi");

requireText(deckDetail, "getBetaTopic", "güverte detay kimlik çözümleme");
requireText(machineDetail, "getBetaTopic", "makine detay kimlik çözümleme");
requireText(exerciseDetail, "sourceTopicTitle", "alıştırma detail kaynak başlık çözümleme");
requireText(exerciseDetail, "getLessonFlow(categoryId, sourceTopicTitle)", "lesson-flow geriye dönük uyumluluğu");
requireText(exerciseDetail, "section.sourceTitle", "sectionRef geriye dönük uyumluluğu");

const visibleDescriptionBindings = [
  [lessonsPage, "category.subtitle", "kitap kapağı açıklaması"],
  [lessonTopics, "category.subtitle", "güverte ders açıklaması"],
  [lessonTopics, "module.description", "güverte modül açıklaması"],
  [exerciseTopics, "category.subtitle", "alıştırma ders açıklaması"],
  [exerciseTopics, "module.description", "alıştırma modül açıklaması"],
  [machineTopics, "category.subtitle", "makine ders açıklaması"],
  [machineTopics, "module.description", "makine modül açıklaması"],
];
for (const [source, binding, label] of visibleDescriptionBindings) {
  forbidText(source, binding, label);
}

const literalIds = [...hierarchy.matchAll(/\bid:\s*"([a-z0-9-]+)"/g)].map((match) => match[1]);
const supplementIds = [...supplements.matchAll(/\bid:\s*"([a-z0-9-]+)"/g)].map((match) => match[1]);
const allIds = [...literalIds, ...supplementIds];
const duplicates = [...new Set(allIds.filter((id, index) => allIds.indexOf(id) !== index))];
if (duplicates.length) failures.push(`müfredat: yinelenen sabit id: ${duplicates.join(", ")}`);

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
  `✅ Müfredat doğrulandı: ${requiredCourses.length} ana ders, ${requiredSupplementTopics.length} mevcut modüle eklenen konu, ortak ders sekmeleri, konu bazlı quiz dağılımı, tek açık modül ve açıklamasız başlık arayüzü.`,
);
