#!/usr/bin/env node
/**
 * Curriculum-wide evidence inventory. Coverage metrics are NOT a professional
 * quality score. Editorial and ship-specific technical review remain mandatory.
 *
 * npm run audit:lesson-quality
 * npm run audit:lesson-quality -- --json
 */
import { createServer } from "vite";
import path from "node:path";

const server = await createServer({
  configFile: false, logLevel: "error", server: { middlewareMode: true },
  resolve: { alias: { "@": path.resolve("src") } }
});

try {
  const { getCurriculumCourses } = await server.ssrLoadModule("/src/data/curriculumHierarchy.ts");
  const { getBetaModules, getBetaTopic } = await server.ssrLoadModule("/src/data/betaLessons.ts");
  const { withGuidedEnhancements } = await server.ssrLoadModule("/src/utils/guidedEnhancements.ts");
  const { getLessonFlow } = await server.ssrLoadModule("/src/data/lessonFlow/index.ts");
  const { resolveLessonImage } = await server.ssrLoadModule("/src/utils/lessonImageFallbacks.ts");
  const topics = [];
  for (const course of getCurriculumCourses()) {
    for (const module of getBetaModules(course.key)) {
      for (const metadata of module.topics) {
        const base = getBetaTopic(course.key, metadata.id);
        if (!base) throw new Error("Missing reader lesson: " + metadata.id);
        const topic = withGuidedEnhancements(course.key, base);
        const sections = topic.sections.filter(s => !s.id?.includes("-integrated-standard-"));
        const checks = getLessonFlow(course.key, metadata.sourceTitle)?.questions?.length ?? 0;
        const worked = sections.filter(s => s.example?.problem && (s.example?.steps?.length ?? 0) >= 2).length;
        const visuals = sections.filter(s => {
          if (s.figure) return true; // standards-based procedural figure
          if (resolveLessonImage(course.key, s.image, s.sourceTitle ?? s.title, topic.sourceTitle ?? topic.title, s.imageAlt)) return true;
          return [...(s.content ?? "").matchAll(/!\\[([^\\]]*)\\]\\(([^)\\s]+)\\)/g)]
            .some(m => resolveLessonImage(course.key, m[2], s.sourceTitle ?? s.title, topic.sourceTitle ?? topic.title, m[1]));
        }).length;
        const references = sections.filter(s => s.references?.some(r => /^https:\/\//.test(r.url))).length;
        const mathOrTables = sections.filter(s => s.formula || s.table).length;
        const cautions = sections.filter(s => /common error|common mistake|limitation|warning|never |do not |risk|safety|caution|yanl[ıi]ş|dikkat|tehlike/i.test((s.content??"")+" "+(s.bulletPoints??[]).join(" "))).length;
        topics.push({
          id: metadata.id, course: course.key, module: module.id, title: metadata.sourceTitle,
          sections: sections.length, worked, visuals, references, mathOrTables, cautions, checks,
          gaps: [...(worked ? [] : ["no-worked-case"]), ...(visuals ? [] : ["no-visual"]), ...(references ? [] : ["no-source-link"]), ...(checks ? [] : ["no-recall-check"])]
        });
      }
    }
  }
  const summarize = rows => ({
    topics: rows.length,
    noWorkedCase: rows.filter(t => !t.worked).length,
    noVisual: rows.filter(t => !t.visuals).length,
    noReferenceLink: rows.filter(t => !t.references).length,
    noRecallCheck: rows.filter(t => !t.checks).length,
    hasAllFour: rows.filter(t => t.worked && t.visuals && t.references && t.checks).length
  });
  const result = {
    methodology: "Live reader coverage inventory: worked two-step examples, verified original visuals and standards-based figures, linked reading and authored recall checks. Not a verification of correctness, equipment relevance, translation, or regulatory currency. No universal requirement that every topic contain a formula.",
    summary: summarize(topics),
    courses: [...new Set(topics.map(t=>t.course))].map(course => ({ course, ...summarize(topics.filter(t=>t.course===course)) })),
    ...(process.argv.includes("--json") ? { topics } : {})
  };
  if (process.argv.includes("--json")) console.log(JSON.stringify(result, null, 2));
  else {
    console.log(result.methodology);
    console.log(JSON.stringify(result.summary, null, 2));
    console.table(result.courses);
  }
} finally {
  await server.close();
}
