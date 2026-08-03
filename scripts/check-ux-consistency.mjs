import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (relativePath) =>
  fs.readFileSync(path.join(root, relativePath), "utf8");

const failures = [];
const assert = (condition, message) => {
  if (!condition) failures.push(message);
};

const pageFiles = [
  "src/pages/CalculationSectionPage.tsx",
  "src/pages/NavigationCalculation.tsx",
  "src/pages/MoonPhases.tsx",
  "src/pages/MachineTopicCalculationsPage.tsx",
  "src/pages/MachineTopicFormulasPage.tsx",
  "src/pages/CourseFormulasPage.tsx",
  "src/pages/CourseCalculationsPage.tsx",
  "src/pages/CourseRulesPage.tsx",
  "src/pages/MachineTopicRulesPage.tsx",
  "src/pages/MachineTopicLessonsPage.tsx",
  "src/pages/MachineTopicDetailPage.tsx",
  "src/pages/RegulationDetailPage.tsx",
  "src/pages/MusterListPage.tsx",
  "src/pages/LessonTopicsPage.tsx",
  "src/pages/ExercisesPage.tsx",
  "src/pages/ExerciseTopicsPage.tsx",
  "src/pages/CourseBetaScenariosPage.tsx",
  "src/pages/StabilityTopicsPage.tsx",
  "src/pages/CargoTopicsPage.tsx",
  "src/pages/SeamanshipTopicsPage.tsx",
  "src/pages/SafetyTopicsPage.tsx",
  "src/pages/EnvironmentTopicsPage.tsx",
  "src/pages/EconomicsTopicsPage.tsx",
];

const redundantReturnLabels = [
  "Hesaplamalara Dön",
  "Listeye Dön",
  "Tüm Derslere Dön",
  "Klasik Derslere Dön",
  "Tüm Konulara Dön",
  "Konulara Dön",
  "Regülasyon listesine dön",
];

for (const file of pageFiles) {
  const source = read(file);
  for (const label of redundantReturnLabels) {
    assert(!source.includes(label), `${file}: redundant return control remains: ${label}`);
  }
}

const collapsedOnEntry = [
  ["src/pages/ExerciseTopicsPage.tsx", "useState<string[]>([])", "exercise modules"],
  ["src/pages/curriculum/DeckCurriculumCoursePage.tsx", "useState<string | null>(null)", "deck curriculum modules"],
  ["src/pages/curriculum/MachineCurriculumCoursePage.tsx", "useState<string | null>(null)", "machine curriculum modules"],
  ["src/pages/NavigationRules.tsx", "useState<number | null>(null)", "navigation rules"],
  ["src/pages/library/ShipTasksLibraryPage.tsx", "useState<string | null>(null)", "ship-task categories"],
  ["src/components/ui/calculation-steps.tsx", "useState(false)", "calculation steps"],
];

for (const [file, closedInitializer, label] of collapsedOnEntry) {
  assert(
    read(file).includes(closedInitializer),
    `${file}: ${label} must be collapsed on initial page entry`,
  );
}

// Operasyon ve sistem listeleri artık satır içi açılmaz: başlığa dokunmak
// doğrudan detaylı anlatımı açar, özet bloklar orada tek kaynaktan okunur.
const shipOperations = read("src/pages/ShipOperationsDetail.tsx");
assert(
  !shipOperations.includes("expandedOperation"),
  "ShipOperationsDetail: operations must open the detailed narration instead of expanding inline",
);
assert(
  shipOperations.includes("to={`/ship-operations/${shipType}/${activeDepartment}/${index}`}"),
  "ShipOperationsDetail: the operation title must link to the detailed narration",
);
assert(
  !shipOperations.includes("Detaylı Anlatımı Aç"),
  "ShipOperationsDetail: the separate detailed-narration button must stay removed",
);

const shipSystems = read("src/pages/ShipSystemDetailPage.tsx");
assert(
  !shipSystems.includes("expandedTopic"),
  "ShipSystemDetailPage: topics must open the detailed narration instead of expanding inline",
);
assert(
  shipSystems.includes("to={`/ship-systems/${sectionId}/${idx}`}"),
  "ShipSystemDetailPage: the topic title must link to the detailed narration",
);
assert(
  !shipSystems.includes("anlatımını aç"),
  "ShipSystemDetailPage: the separate detailed-narration button must stay removed",
);

// Listeden kaldırılan özet bloklar kaybolmadı; anlatımın ilk sayfasında duruyor.
const operationDeepDive = read("src/pages/ShipOperationDeepDive.tsx");
assert(
  operationDeepDive.includes("Operasyon Özeti"),
  "ShipOperationDeepDive: the operation summary moved from the list must remain",
);
const systemDeepDive = read("src/pages/ShipSystemDeepDive.tsx");
assert(
  systemDeepDive.includes("Konu Özeti"),
  "ShipSystemDeepDive: the topic summary moved from the list must remain",
);

const notesPage = read("src/pages/Notes.tsx");
assert(
  !notesPage.includes("defaultValue={groups.map"),
  "Notes: note categories must be collapsed on initial page entry",
);

const regulationDetailPage = read("src/pages/RegulationDetailPage.tsx");
assert(
  !regulationDetailPage.includes("open={chapterIndex === 0}"),
  "RegulationDetailPage: the first chapter must be collapsed on initial page entry",
);

const moonPage = read("src/pages/MoonPhases.tsx");
assert(!moonPage.includes('title="Ana Sayfa"'), "MoonPhases: home shortcut remains");

const musterPage = read("src/pages/MusterListPage.tsx");
for (const removedCopy of [
  "Gerçekçi Acil Durum Organizasyonu",
  "Gemiye özel onay zorunludur",
  "İlk istasyon kuralı:",
]) {
  assert(!musterPage.includes(removedCopy), `MusterListPage: removed copy remains: ${removedCopy}`);
}
assert(!musterPage.includes('to="/crew"'), "MusterListPage: inline Personel return link remains");

for (const [file, incorrectTerm] of [
  ["src/pages/MusterListPage.tsx", /\b[Rr]ol [Cc]etvel/],
  ["src/pages/CrewHierarchyPage.tsx", /\b[Rr]ol [Cc]etvel/],
  ["src/data/musterList.ts", /\b[Rr]ol [Cc]etvel/],
]) {
  assert(!incorrectTerm.test(read(file)), `${file}: "rol cetveli" terminology remains`);
}

const drillSource = read("src/data/solasDrills.ts");
for (const title of [
  "Yangın Talimi",
  "Gemiyi Terk Talimi",
  "Kapalı Mahal Giriş ve Kurtarma Talimi",
  "Acil Dümen Talimi",
  "Gemi Güvenlik Talimi",
  "Hasar Kontrol Talimi",
]) {
  assert(drillSource.includes(`title: "${title}"`), `SOLAS drill missing: ${title}`);
}
assert(!drillSource.includes('title: "Genel Talim"'), 'Invalid "Genel Talim" heading exists');

// Operasyon ekranları gemi görselleriyle değil sade cilt kapaklarıyla çalışıyor:
// her gemi tipi yalnızca kapak rengini (Tailwind gradyan durakları) taşımalı.
const shipModules = [
  "src/data/shipOperations/konteyner.ts",
  "src/data/shipOperations/roRo.ts",
  "src/data/shipOperations/tanker.ts",
  "src/data/shipOperations/dokme.ts",
  "src/data/shipOperations/yolcu.ts",
  "src/data/shipOperations/offshore.ts",
];
for (const file of shipModules) {
  const source = read(file);
  assert(!source.includes("@/assets/ships"), `${file}: ship illustration must stay removed`);
  assert(/color: "from-/.test(source), `${file}: book cover colour is not wired`);
}
assert(
  fs.readdirSync(path.join(root, "src/assets/ships")).every((file) => !file.startsWith("operation-")),
  "Unused operation ship illustrations are still bundled",
);

const floatingBack = read("src/components/FloatingNavButtons.tsx");
assert(floatingBack.includes('aria-label="Geri"'), "Global Geri control must remain available");

if (failures.length) {
  console.error(failures.map((failure) => `- ${failure}`).join("\n"));
  process.exit(1);
}

console.log(
  `UX consistency checks passed: ${pageFiles.length} pages, 6 SOLAS/ISPS drill headings, 6 ship book covers.`,
);
