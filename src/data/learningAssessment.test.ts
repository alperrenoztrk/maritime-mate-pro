import test from "node:test";
import assert from "node:assert/strict";
import { answerAssessment, assessmentResult, assessmentSteps, assessmentStorageKey, emptyAssessment, parseAssessment, placementQuestions, questionsFor } from "./learningAssessment";
import { courseLearningGuides, courseHref } from "./learningGuide";

const complete = (track = 0, correct = true) => {
  const answers = { experience: 1, track, goal: 1, pace: 1 };
  return { ...answers, ...Object.fromEntries(questionsFor(answers).map(q => [q.id, correct ? q.correct : q.options.length])) };
};
test("each pathway samples six valid questions and links to real courses", () => {
  assert.equal(new Set(placementQuestions.map(q => q.id)).size, placementQuestions.length);
  for (const track of [0, 1, 2]) {
    const questions = questionsFor({ track });
    assert.equal(questions.length, 6);
    assert.equal(new Set(questions.map(q => q.id)).size, 6);
    for (const q of questions) { assert(courseLearningGuides[q.course]); assert(q.options[q.correct]); }
    for (const experience of [0, 1, 2]) for (const goal of [0, 1, 2]) {
      const result = assessmentResult({ ...complete(track), experience, goal });
      for (const course of result.recommendations) { assert(courseLearningGuides[course]); assert.match(courseHref(course), /^\/(machine|lessons)\/.+\/topics$/); }
    }
  }
  assert(questionsFor({track: 1}).some(q => q.id === "knots"));
  assert(!questionsFor({track: 2}).some(q => q.id === "knots"));
});
test("placement score comes only from observed answers, with unknowns treated as gaps", () => {
  for (const experience of [0, 1, 2]) {
    assert.equal(assessmentResult({ ...complete(1, false), experience }).correct, 0);
    assert.equal(assessmentResult({ ...complete(1), experience }).correct, 6);
  }
  const result = assessmentResult({ ...complete(2), power: 3 });
  assert.equal(result.correct, 5);
  assert.equal(result.recommendations[0], "machine-electrical");
  assert(result.gaps.includes("machine-electrical"));
});
test("profile choices shape path and safety foundations without inventing mastery", () => {
  assert.equal(assessmentResult({...complete(), experience: 0}).recommendations[0], "safety");
  assert(assessmentResult({...complete(2), goal: 2}).recommendations.includes("machine-engine-room-ops"));
  assert.notDeepEqual(assessmentResult({...complete(1), goal: 1}).recommendations, assessmentResult({...complete(1), goal: 2}).recommendations);
});
test("branch changes clear stale diagnostic answers, other profile edits preserve them", () => {
  const state = { ...emptyAssessment(), answers: complete(1), completed: true };
  const changed = answerAssessment(state, "track", 2);
  assert.equal(changed.completed, false);
  assert.equal(changed.answers.port, undefined);
  assert.equal(changed.answers.knots, undefined);
  assert.equal(changed.answers.experience, 1);
  assert.equal(answerAssessment(state, "pace", 0).answers.knots, 0);
});
test("parsing resumes safely and rejects corrupt, obsolete, out-of-range and incomplete results", () => {
  for (const raw of [null, "{", "null", "[]", '{"version":2}', '{"version":1,"answers":[]}']) assert.deepEqual(parseAssessment(raw), emptyAssessment());
  const state = { version: 1, answers: complete(2), completed: true, step: 9 };
  assert.deepEqual(parseAssessment(JSON.stringify(state)), state);
  const incomplete = parseAssessment(JSON.stringify({...state, answers: {...state.answers, track: 99, heat: -1}}));
  assert.equal(incomplete.completed, false); assert.equal(incomplete.step, 1);
  assert.equal(incomplete.answers.track, undefined); assert.equal(incomplete.answers.heat, undefined);
  const draft = { ...emptyAssessment(), step: 2, answers: { experience: 1, track: 1 } };
  assert.deepEqual(parseAssessment(JSON.stringify(draft)), draft);
  assert.equal(assessmentSteps(draft.answers).length, 10);
});
test("storage is isolated per account, with an explicit guest scope", () => {
  assert.notEqual(assessmentStorageKey("a"), assessmentStorageKey("b"));
  assert.notEqual(assessmentStorageKey("a"), assessmentStorageKey(null));
});
