/** Verify the actual data and teaching sequence, not incidental UI strings. */
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { createServer } from "vite";

const root = process.cwd();
const server = await createServer({ root, configFile: false, logLevel: "error", server: { middlewareMode: true }, resolve: { alias: { "@": path.join(root, "src") } } });
try {
  const { getCurriculumCourses } = await server.ssrLoadModule("/src/data/curriculumHierarchy.ts");
  const { getBetaModules, getBetaTopic, getBetaTopicById } = await server.ssrLoadModule("/src/data/betaLessons.ts");
  const { getLessonFlow } = await server.ssrLoadModule("/src/data/lessonFlow/index.ts");
  const { buildLessonSequence, sectionMatches } = await server.ssrLoadModule("/src/utils/lessonSequence.ts");
  const { courseLearningGuides, learningBranches } = await server.ssrLoadModule("/src/data/learningGuide.ts");
  const { getExerciseQuestionDistribution } = await server.ssrLoadModule("/src/data/exerciseQuestionDistribution.ts");
  const { getMachineSubTopicContent } = await server.ssrLoadModule("/src/data/machineTopicDetailContent.ts");
  const { parseLearningProgress } = await server.ssrLoadModule("/src/utils/learningProgress.ts");
  const { shuffleAnswerOptions } = await server.ssrLoadModule("/src/utils/practiceQuestion.ts");
  const sample = { id: 1, question: "Which option is correct?", options: ["wrong", "correct", "wrong"], correctAnswer: 1, category: "test", explanation: "test" };
  const shuffled = shuffleAnswerOptions(sample, () => 0);
  assert.equal(shuffled.options[shuffled.correctAnswer], "correct");
  assert.deepEqual(sample.options, ["wrong", "correct", "wrong"], "Practice must not mutate the authored answer order");
  const courses = getCurriculumCourses();
  const { getRuleIntegrationAssignments } = await server.ssrLoadModule("/src/data/betaLessons.ts");
  const rulePlacements = JSON.parse(fs.readFileSync("src/data/curriculumRulePlacement.json", "utf8"));
  assert.equal(courses.flatMap((course) => getRuleIntegrationAssignments(course.key)).length, rulePlacements.length, "Rule placement registry has unresolved entries");
  const allIds = new Set();
  const mappedCourses = learningBranches.flatMap((branch) => branch.courses);
  assert.equal(new Set(mappedCourses).size, courses.length, "The learning tree must include every course exactly once");
  assert.equal(mappedCourses.length, courses.length, "A course occurs in multiple primary branches");
  let modules = 0, topics = 0, questions = 0, bank = 0;
  for (const course of courses) {
    const guide = courseLearningGuides[course.key];
    assert(guide?.purpose && guide.outcomes.length === 3, `${course.key}: missing authored learning context`);
    for (const key of [...guide.before, ...guide.related]) assert(courses.some((entry) => entry.key === key), `${course.key}: broken course link ${key}`);
    const distribution = getExerciseQuestionDistribution(course.key);
    bank += distribution.courseBankQuestions;
    for (const module of getBetaModules(course.key)) {
      modules++;
      assert(module.description && module.topics.length, `${module.id}: empty module`);
      assert(!module.id.endsWith("additional-topics"), `${course.key}: unclassified topics`);
      for (const topic of module.topics) {
        topics++;
        assert(!allIds.has(topic.id), `Duplicate topic id: ${topic.id}`);
        allIds.add(topic.id);
        assert(["foundation", "operational", "advanced"].includes(topic.level), `${topic.id}: missing level`);
        const content = getBetaTopic(course.key, topic.id);
        assert(content?.sections.length > 0, `${topic.id}: empty lesson`);
        assert.equal(getBetaTopicById(topic.id)?.sourceTitle, content.sourceTitle, `${topic.id}: id resolver differs`);
        const flow = getLessonFlow(course.key, topic.sourceTitle);
        assert(flow?.questions.length > 0, `${topic.id}: no authored knowledge check`);
        const sequence = buildLessonSequence(content, flow);
        const taught = new Set();
        for (const item of sequence) {
          if (item.kind === "teach") {
            assert(!taught.has(item.section), `${topic.id}: repeated explanation`);
            taught.add(item.section);
          } else {
            assert([...taught].some((section) => sectionMatches(section, item.question.sectionRef)) || taught.size === content.sections.length, `${topic.id}: question before its explanation`);
            assert(item.question.correctAnswer >= 0 && item.question.correctAnswer < item.question.options.length, `${topic.id}: invalid answer key`);
            questions++;
          }
        }
        assert.equal(taught.size, content.sections.length, `${topic.id}: explanation lost`);
        assert.equal(sequence.filter((item) => item.kind === "quiz").length, flow.questions.length, `${topic.id}: question lost`);
        const owned = distribution.questionsByTopic.get(topic.id);
        assert(owned?.every((question) => flow.questions.includes(question)), `${topic.id}: unrelated question assigned`);
      }
    }
  }
  assert(topics >= 806, "Existing curriculum topics were lost");
  assert.equal(bank, 4353, "The complete course question banks must be preserved");
  const place = (course, title) => getBetaModules(course).find((module) => module.topics.some((topic) => topic.title === title))?.id;
  assert.equal(place("navigation", "Emniyetli hız (Kural 6)"), "navigation-colreg");
  assert.equal(place("navigation", "Appraisal"), "navigation-passage-planning");
  assert.equal(place("navigation", "Dünya'nın şekli ve hareketleri"), "navigation-foundations");
  assert.equal(place("communication", "Tehlike, Aciliyet ve Emniyet Haberleşmesi"), "com-distress");
  assert.equal(place("safety", "Çatışma Sonrası Acil Müdahale"), "safety-emergency-damage");
  assert.equal(place("seamanship", "İleri Mooring ve Halat Yönetimi"), "seamanship-mooring");
  assert(getMachineSubTopicContent("maintenance", "Kestirimci bakım (predictive)").sections.some((section) => section.heading === "Gemi Uygulamaları"), "Expanded maintenance lesson is shadowed");
  assert(getMachineSubTopicContent("electrical", "Motor yol verme yöntemleri (DOL, Y-Δ, VFD)").sections.some((section) => section.heading === "Y-Δ Yol Verme"), "Expanded motor lesson is shadowed");
  assert.deepEqual(parseLearningProgress("broken"), {});
  assert.deepEqual(parseLearningProgress("[]"), {});
  assert.deepEqual(parseLearningProgress(JSON.stringify({ sample: { practice: { correct: 5, total: 2, completedAt: "2026-10-21", weakSections: [] } } })).sample.practice, undefined);
  // Reject circular recommended prerequisites.
  const visit = (key, chain = []) => {
    assert(!chain.includes(key), `Prerequisite cycle: ${[...chain, key].join(" -> ")}`);
    for (const before of courseLearningGuides[key].before) visit(before, [...chain, key]);
  };
  courses.forEach((course) => visit(course.key));
  const routes = fs.readFileSync("src/App.tsx", "utf8");
  assert(routes.includes('path="/lessons/map"'), "Learning map is unreachable");
  for (const key of ["stability", "cargo", "seamanship", "safety", "environment", "economics"]) {
    assert(routes.includes(`path="/lessons/${key}/reference"`), `${key}: extended reference lost`);
    assert(!routes.includes(`path="/lessons/${key}/topics"`), `${key}: legacy screen still shadows the shared curriculum`);
  }
  console.log(`Curriculum OK: ${courses.length} courses, ${modules} modules, ${topics} topics; ${questions} authored checks follow teaching; ${bank} general-bank questions preserved.`);
} finally { await server.close(); }
