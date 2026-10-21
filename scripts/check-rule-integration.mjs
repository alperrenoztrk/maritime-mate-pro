import { readFileSync } from "node:fs";
import { createServer } from "vite";

const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

const vite = await createServer({
  appType: "custom",
  logLevel: "error",
  server: { middlewareMode: true },
});

try {
  const lessons = await vite.ssrLoadModule("/src/data/betaLessons.ts");
  const rules = await vite.ssrLoadModule("/src/data/courseContent/rules/index.ts");
  const allAssignments = lessons.getBetaCategories().flatMap((category) => lessons.getRuleIntegrationAssignments(category.key));
  let groupCount = 0;
  let sectionCount = 0;
  let itemCount = 0;

  for (const category of lessons.getBetaCategories().filter((item) => item.enabled)) {
    const registryKey =
      category.group === "machine"
        ? category.key.replace(/^machine-/, "")
        : category.key;
    const groups = rules.getTopicRules(registryKey);
    const assignments = allAssignments.filter((assignment) => groups.includes(assignment.group));
    assert(assignments.length === groups.length, `${category.key}: each rule group must have one authored destination`);
    for (const group of groups) assert(assignments.filter((assignment) => assignment.group === group).length === 1, `${category.key}/${group.title}: missing or duplicate rule ownership`);

    for (const assignment of assignments) {
      const topic = lessons.getBetaTopic(assignment.categoryKey, assignment.topicId);
      assert(topic, `${category.key}: ${assignment.topicTitle} konusu çözülemedi`);
      const topicById = lessons.getBetaTopicById(assignment.topicId);
      assert(topicById, `${category.key}: ${assignment.topicTitle} kimlikten çözülemedi`);

      const integratedSections = topic.sections.filter((section) =>
        section.title.startsWith(`${assignment.group.title} — `),
      );
      const integratedSectionsById = topicById.sections.filter((section) =>
        section.title.startsWith(`${assignment.group.title} — `),
      );
      assert(
        integratedSections.length === assignment.group.rules.length,
        `${category.key}/${assignment.group.title}: anlatıma aktarılan bölüm sayısı eksik`,
      );
      assert(
        integratedSectionsById.length === assignment.group.rules.length,
        `${category.key}/${assignment.group.title}: kimlikten açılan anlatım bölümleri eksik`,
      );

      assignment.group.rules.forEach((rule, index) => {
        const integrated = integratedSections[index];
        // Maddeler madde listesi olarak aktarılır; eski düz metin biçimi de kabul edilir.
        const integratedText = [
          integrated.content ?? "",
          ...(integrated.bulletPoints ?? []),
        ].join("\n");
        for (const item of rule.content) {
          assert(
            integratedText.includes(item.trim()),
            `${category.key}/${assignment.group.title}/${rule.subtitle}: madde anlatımda bulunamadı`,
          );
          itemCount += 1;
        }
        sectionCount += 1;
      });
      groupCount += 1;
    }
  }

  const tabs = readFileSync("src/components/curriculum/CourseSectionTabs.tsx", "utf8");
  assert(!tabs.includes('id: "rules", label: "Kurallar"'), "Kurallar sekmesi hâlâ görünür");

  const musterList = readFileSync("src/pages/MusterListPage.tsx", "utf8");
  assert(!musterList.includes("Yazdır"), "Role cetvelinde Yazdır eylemi hâlâ bulunuyor");

  console.log(
    `Rule integration OK: ${groupCount} grup, ${sectionCount} anlatım bölümü, ${itemCount} madde.`,
  );
} finally {
  await vite.close();
}
