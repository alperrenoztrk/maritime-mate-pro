/** Inventory actual teaching; counts flag editorial work, not competence or expert approval. */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { createServer } from 'vite';
const server = await createServer({ configFile: false, logLevel: 'error', server: { middlewareMode: true }, resolve: { alias: { '@': path.resolve('src') } } });
try {
  const { getCurriculumCourses } = await server.ssrLoadModule('/src/data/curriculumHierarchy.ts');
  const { getBetaModules, getBetaTopic } = await server.ssrLoadModule('/src/data/betaLessons.ts');
  const { getLessonFlow } = await server.ssrLoadModule('/src/data/lessonFlow/index.ts');
  const { withGuidedEnhancements } = await server.ssrLoadModule('/src/utils/guidedEnhancements.ts');
  const { buildLessonSequence, buildReviewSequence, getReviewSections } = await server.ssrLoadModule('/src/utils/lessonSequence.ts');
  const { shuffleAnswerOptions } = await server.ssrLoadModule('/src/utils/practiceQuestion.ts');
  const cases = JSON.parse(fs.readFileSync('src/data/learningCaseStudies.json', 'utf8'));
  const words = (strings) => strings.filter(Boolean).join(' ').replace(/!\[[^\]]*\]\([^)]*\)/g, '').match(/[\p{L}\p{N}]+(?:['’−-][\p{L}\p{N}]+)*/gu)?.length ?? 0;
  const topics = [];
  for (const course of getCurriculumCourses()) for (const module of getBetaModules(course.key)) for (const metadata of module.topics) {
    const reader = getBetaTopic(course.key, metadata.id);
    const topic = withGuidedEnhancements(course.key, reader);
    const flow = getLessonFlow(course.key, metadata.sourceTitle);
    assert(flow.questions.length >= 2, `${metadata.id}: fewer than two checks`);
    const teaching = topic.sections.filter(section => !section.id?.includes('-integrated-standard-'));
    const wordCount = words([topic.introduction, ...(topic.keyPoints ?? []), ...teaching.flatMap(s => [s.content, ...(s.bulletPoints ?? []), s.formula?.text, s.formula?.description, ...(s.table?.headers ?? []), ...(s.table?.rows.flat() ?? []), s.example?.problem, ...(s.example?.steps ?? []), s.example?.solution, s.example?.result])]);
    for (const question of flow.questions) {
      const review = buildReviewSequence(topic, [question]);
      assert.equal(review.at(-1).kind, 'quiz');
      assert.deepEqual(review.slice(0, -1).map(item => item.section), getReviewSections(topic, question.sectionRef));
      if (question.optionExplanations) {
        assert.equal(question.optionExplanations.length, question.options.length);
        const shuffled = shuffleAnswerOptions(question, () => 0);
        assert.equal(shuffled.options[shuffled.correctAnswer], question.options[question.correctAnswer]);
        assert.equal(shuffled.optionExplanations[shuffled.correctAnswer], question.optionExplanations[question.correctAnswer]);
      }
    }
    const workedCase = cases.find(entry => entry.topicId === metadata.id);
    if (workedCase) {
      assert(reader.sections.some(section => section.id === workedCase.section.id && section.example?.steps?.length));
      const sequence = buildLessonSequence(topic, flow);
      assert(sequence.findIndex(item => item.kind === 'teach' && item.section.id === workedCase.section.id) < sequence.findIndex(item => item.kind === 'quiz' && item.question.id === 9001));
    }
    topics.push({ id: metadata.id, course: course.key, module: module.id, title: metadata.sourceTitle, teachingWords: wordCount, authoredChecks: flow.questions.length, workedExamples: teaching.filter(s => s.example).length, shortTeaching: wordCount < 150 });
  }
  const report = {
    methodology: 'Counts visible teaching text, examples, formulas and tables, including existing guided enhancements. Excludes identifiers, headings and integrated rule appendices. Fewer than 150 words is an editorial triage flag, not a quality score. Checks verify wiring and answer metadata, not independent professional certification of the complete corpus.',
    totals: { courses: getCurriculumCourses().length, topics: topics.length, authoredChecks: topics.reduce((sum,t) => sum+t.authoredChecks,0), newWorkedCases: cases.length, shortTeachingTopics: topics.filter(t => t.shortTeaching).length }, topics,
  };
  const output = 'docs/learning/content-audit.json'; const text = JSON.stringify(report, null, 2)+'\n';
  if (process.argv.includes('--check')) assert.equal(fs.readFileSync(output, 'utf8'), text, 'Learning inventory is stale');
  else { fs.mkdirSync(path.dirname(output), { recursive: true }); fs.writeFileSync(output, text); }
  console.log('Learning content OK:', JSON.stringify(report.totals));
} finally { await server.close(); }
