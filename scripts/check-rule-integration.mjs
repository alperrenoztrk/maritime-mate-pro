import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { createServer } from "vite";

const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

const walkFiles = (dir) => {
  const files = [];
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) files.push(...walkFiles(path));
    else files.push(path);
  }
  return files;
};

const checkMaritimeSafetyRegressions = () => {
  const roots = ["src/data/courseContent", "src/data/compliance"];
  const files = roots.flatMap((root) => walkFiles(root)).filter((path) => /\.(ts|tsx)$/.test(path));
  const corpus = files.map((path) => ({ path, text: readFileSync(path, "utf8") }));

  const forbidden = [
    {
      pattern: /φloll\s*=\s*arccos\s*\(\s*KG\s*\/\s*KM\s*\)/i,
      reason: "invalid general angle-of-loll formula arccos(KG/KM)",
    },
    {
      pattern: /10\s*%\s*of\s*(?:the\s*)?draft\s*or\s*0\.6\s*m/i,
      reason: "universal UKC 10%/0.6 m threshold",
    },
    {
      pattern: /ENTRY\s+PERMITTED/i,
      reason: "calculator/content must not authorize enclosed-space entry",
    },
    {
      pattern: /SOLAS\s+COMPLIANT/i,
      reason: "incomplete calculator must not declare SOLAS compliance",
    },
    {
      pattern: /Adequate\s*\(\s*≥?\s*0\.15\s*m\s*\)/i,
      reason: "GM alone must not be labelled adequate",
    },
    {
      pattern: /Compliant\s*\(\s*≤\s*12°\s*\)/i,
      reason: "grain heel angle alone must not declare compliance",
    },
    {
      pattern: /mass\s*=\s*V\s*[×*]\s*0\.56\s*kg\s*\/\s*m(?:³|3)/i,
      reason: "0.56 m³/kg is specific volume, not a kg/m³ multiplier",
    },
    {
      pattern: /A3\s*:.*(?:70\s*°?\s*N|70N).*(?:70\s*°?\s*S|70S)/is,
      reason: "modern GMDSS A3 must not be defined solely by legacy Inmarsat latitude coverage",
    },
    {
      pattern: /NAVTEX[^\n]*(?:A[^\n]*B[^\n]*C[^\n]*D[^\n]*L|C[^\n]*(?:cannot|must not)[^\n]*(?:reject|deselect))/i,
      reason: "NAVTEX C is not one of the mandatory non-deselectable A/B/D/L subjects",
    },
  ];

  for (const { path, text } of corpus) {
    for (const { pattern, reason } of forbidden) {
      assert(!pattern.test(text), `Maritime safety regression in ${path}: ${reason}`);
    }
  }

  const regulationMatrix = readFileSync("src/data/compliance/regulationMatrix.ts", "utf8");
  assert(
    regulationMatrix.includes("IMDG Code 2024 Edition (Amdt 42-24)"),
    "Regulation matrix must retain the IMDG 2024 / Amendment 42-24 baseline",
  );
  assert(
    regulationMatrix.includes("IAMSAR Manual Vol. III, 2025 Edition"),
    "Regulation matrix must retain the IAMSAR 2025 baseline",
  );
  assert(
    regulationMatrix.includes("CO2_FREE_GAS_SPECIFIC_VOLUME_M3_KG: 0.56"),
    "Regulation matrix must identify 0.56 as CO₂ free-gas specific volume (m³/kg)",
  );

  const enclosedSpace = readFileSync("src/data/courseContent/engine-room-safety.ts", "utf8");
  assert(
    enclosedSpace.includes("does NOT authorize entry"),
    "Enclosed-space calculator must explicitly state that atmosphere screening does not authorize entry",
  );
  assert(
    enclosedSpace.includes("Entry Authorization"),
    "Enclosed-space calculator must direct authorization to vessel procedure/permit",
  );

  const safety = readFileSync("src/data/courseContent/safety.ts", "utf8");
  assert(
    safety.includes('value: "Not determined by nominal capacity sum alone"'),
    "LSA nominal capacity calculator must not claim SOLAS compliance",
  );

  console.log(`Maritime safety regression checks OK: ${files.length} content files scanned.`);
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

  checkMaritimeSafetyRegressions();

  console.log(
    `Rule integration OK: ${groupCount} grup, ${sectionCount} anlatım bölümü, ${itemCount} madde.`,
  );
} finally {
  await vite.close();
}
