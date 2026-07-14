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

const shipModules = {
  "src/data/shipOperations/konteyner.ts": "operation-container.svg",
  "src/data/shipOperations/roRo.ts": "operation-roro.svg",
  "src/data/shipOperations/tanker.ts": "operation-tanker.svg",
  "src/data/shipOperations/dokme.ts": "operation-bulk.svg",
  "src/data/shipOperations/yolcu.ts": "operation-passenger.svg",
  "src/data/shipOperations/offshore.ts": "operation-offshore.svg",
};
for (const [file, asset] of Object.entries(shipModules)) {
  assert(read(file).includes(asset), `${file}: clear ship illustration is not wired`);
  assert(
    fs.existsSync(path.join(root, "src/assets/ships", asset)),
    `Ship illustration asset missing: ${asset}`,
  );
}

const floatingBack = read("src/components/FloatingNavButtons.tsx");
assert(floatingBack.includes('aria-label="Geri"'), "Global Geri control must remain available");

if (failures.length) {
  console.error(failures.map((failure) => `- ${failure}`).join("\n"));
  process.exit(1);
}

console.log(
  `UX consistency checks passed: ${pageFiles.length} pages, 6 SOLAS/ISPS drill headings, 6 ship illustrations.`,
);
