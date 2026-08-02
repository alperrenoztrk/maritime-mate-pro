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
  let groupCount = 0;
  let sectionCount = 0;
  let itemCount = 0;

  for (const category of lessons.getBetaCategories().filter((item) => item.enabled)) {
    const registryKey =
      category.group === "machine"
        ? category.key.replace(/^machine-/, "")
        : category.key;
    const groups = rules.getTopicRules(registryKey);
    const assignments = lessons.getRuleIntegrationAssignments(category.key);

    assert(
      assignments.length === groups.length,
      `${category.key}: ${groups.length} kural grubundan ${assignments.length} tanesi konuya bağlandı`,
    );
    assert(
      new Set(assignments.map((assignment) => assignment.group.title)).size === groups.length,
      `${category.key}: aynı kural grubu birden fazla konuya bağlandı`,
    );

    for (const assignment of assignments) {
      const topic = lessons.getBetaTopic(category.key, assignment.topicId);
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
        for (const item of rule.content) {
          assert(
            integrated.content.includes(item.trim()),
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
