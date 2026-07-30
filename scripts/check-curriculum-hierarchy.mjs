import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const failures = [];

const hierarchy = read("src/data/curriculumHierarchy.ts");
const beta = read("src/data/betaLessons.ts");
const categories = read("src/data/calculationCenterConfig.ts");
const machine = read("src/data/machineTopicData.ts");
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

requireText(lessonsRoute, "LessonsLibraryPage", "Dersler rota yönlendirmesi");
requireText(lessonTopicsRoute, "DeckCurriculumCoursePage", "güverte rota yönlendirmesi");
requireText(machineTopicsRoute, "MachineCurriculumCoursePage", "makine rota yönlendirmesi");
requireText(lessonsPage, "useSearchParams", "kitaplık görünüm seçimi");
requireText(lessonsPage, "Güverte Kitaplığı", "kitaplık girişleri");
requireText(lessonsPage, "Makine Kitaplığı", "kitaplık girişleri");
requireText(lessonsPage, "Mesleki Yeterlilikler", "kitaplık girişleri");
requireText(lessonsPage, "aspect-[3/4]", "kitap kapağı görünümü");
requireText(lessonsPage, "competencyTracks", "yeterlilik parkurları arayüzü");
forbidText(lessonsPage, "sectionIconMap", "ana ekrandaki araç butonları");
forbidText(lessonsPage, "config.sections.map", "ana ekrandaki araç butonları");

for (const [file, source] of [
  ["DeckCurriculumCoursePage", lessonTopics],
  ["ExerciseTopicsPage", exerciseTopics],
  ["MachineCurriculumCoursePage", machineTopics],
]) {
  requireText(source, "getBetaModules", `${file} modül entegrasyonu`);
  forbidText(source, "topicsData", `${file} eski sabit konu listesi`);
}

requireText(lessonTopics, "CourseSectionTabs", "güverte ders sekmeleri");
requireText(machineTopics, "CourseSectionTabs", "makine ders sekmeleri");
requireText(lessonTopics, "expandedModule", "güverte tek açık modül davranışı");
requireText(machineTopics, "expandedModule", "makine tek açık modül davranışı");
forbidText(lessonTopics, "expandedModules", "güverte çoklu açık modül davranışı");
forbidText(machineTopics, "expandedModules", "makine çoklu açık modül davranışı");
forbidText(lessonTopics, "Ders Araçları", "güverte ayrı araç kartı");
forbidText(machineTopics, "Ders Araçları", "makine ayrı araç kartı");

for (const tabLabel of ["Konular", "Hesaplamalar", "Formüller", "Kurallar", "Alıştırmalar"]) {
  requireText(courseTabs, tabLabel, "ortak ders sekmeleri");
}
requireText(courseTabs, "/exercises/${exerciseCategory}/topics", "Alıştırmalar konu listesi yönlendirmesi");
forbidText(courseTabs, "/exercises/${exerciseCategory}/quiz", "eski toplu quiz yönlendirmesi");
requireText(courseHeader, "CourseSectionTabs", "araç sayfalarında kalıcı sekme şeridi");
forbidText(courseHeader, "sectionMeta", "tekrarlanan bölüm alt başlığı");

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
  [lessonsPage, "track.subtitle", "yeterlilik parkuru açıklaması"],
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
  `✅ Müfredat doğrulandı: ${requiredCourses.length} ana ders, ${requiredTracks.length} yeterlilik parkuru, kitaplık ana ekranı, ortak ders sekmeleri, konu bazlı quiz dağılımı, tek açık modül ve açıklamasız başlık arayüzü.`,
);
