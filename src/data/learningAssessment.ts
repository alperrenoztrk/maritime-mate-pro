/** A short placement sample, never a professional competency assessment. */
export const profileQuestions = [
  { id: "experience", title: "Where are you in your maritime journey?", hint: "Your experience helps us choose a comfortable starting point.", options: ["I'm exploring maritime life", "I'm a maritime student or cadet", "I work at sea"] },
  { id: "track", title: "What would you like to explore?", hint: "Your knowledge questions will follow this choice.", options: ["The whole ship", "Deck and navigation", "Engine and machinery"] },
  { id: "goal", title: "What brings you here?", hint: "We'll use this to shape your reading sequence.", options: ["Build a solid foundation", "Prepare for lessons and exams", "Refresh knowledge for shipboard work"] },
  { id: "pace", title: "How much time suits your day?", hint: "Choose a pace you can return to regularly.", options: ["5 minutes — one idea", "10 minutes — a lesson and a check", "20 minutes — read, practise and review"] },
] as const;
export type ProfileId = typeof profileQuestions[number]["id"];
export interface PlacementQuestion { id: string; course: string; title: string; options: string[]; correct: number; explanation: string }
const q = (id: string, course: string, title: string, options: string[], correct: number, explanation: string): PlacementQuestion => ({ id, course, title, options, correct, explanation });
const common = [
  q("port", "seamanship", "Facing the bow, which side is port?", ["The right side", "The left side", "The stern"], 1, "Port is the left side when facing forward towards the bow."),
  q("buoyancy", "stability", "A ship floats at rest. What balances its weight?", ["The engine's thrust", "The wind force", "The buoyant force"], 2, "At floating equilibrium, the upward buoyant force balances the ship's weight."),
];
const deck = [
  q("latitude", "navigation", "What does latitude describe?", ["Distance east or west of Greenwich", "Angular distance north or south of the equator", "Distance travelled through water"], 1, "Latitude is angular distance north or south of the equator; longitude is measured east or west of Greenwich."),
  q("knots", "navigation", "At a constant speed of 12 knots, how far do you travel in 30 minutes?", ["6 nautical miles", "12 nautical miles", "24 nautical miles"], 0, "A knot is one nautical mile per hour: 12 × 0.5 = 6 nautical miles."),
  q("free-surface", "stability", "What is the usual effect of liquid moving in a slack tank on initial stability?", ["It always increases GM", "It has no effect", "It reduces effective GM"], 2, "The free-surface effect reduces effective GM. Its magnitude depends on the liquid and the tank's geometry."),
  q("swell", "meteorology", "How can swell differ from the local wind sea?", ["Swell must travel in the local wind direction", "Swell can arrive from a distant weather system", "Swell only exists in shallow water"], 1, "Swell can travel away from its generating weather system, so its direction can differ from the local wind sea."),
];
const engine = [
  q("heat", "machine-thermodynamics", "Across a heat exchanger wall, heat naturally flows…", ["From the hotter fluid to the colder fluid", "From the colder fluid to the hotter fluid", "Only if both fluids have equal temperatures"], 0, "A temperature difference drives heat transfer from the hotter side to the colder side."),
  q("pressure", "machine-fluid-mechanics", "In a stationary liquid of uniform density, pressure…", ["Decreases with depth", "Is always zero", "Increases with depth"], 2, "Hydrostatic pressure increases with liquid depth: the pressure difference is density × gravity × depth."),
  q("power", "machine-electrical", "A DC load draws 5 A at 24 V. What power does it use?", ["4.8 W", "120 W", "29 W"], 1, "For this DC load, power = voltage × current = 24 × 5 = 120 W."),
  q("feedback", "machine-automation", "In a feedback control loop, what is compared with the set point?", ["The measured process value", "Only the motor's nameplate", "Only elapsed running time"], 0, "Feedback compares the measured process value with the set point to determine the control error."),
];
export const placementQuestions = [...common, ...deck, ...engine];
export type AssessmentAnswers = Record<string, number>;
export interface AssessmentState { version: 1; step: number; answers: AssessmentAnswers; completed: boolean }
export const emptyAssessment = (): AssessmentState => ({ version: 1, step: 0, answers: {}, completed: false });
export function questionsFor(answers: AssessmentAnswers): PlacementQuestion[] {
  if (answers.track === 1) return [...common, ...deck];
  if (answers.track === 2) return [...common, ...engine];
  return [...common, deck[0], deck[3], engine[0], engine[1]];
}
export function assessmentSteps(answers: AssessmentAnswers) { return [...profileQuestions, ...questionsFor(answers)]; }
export function answerAssessment(state: AssessmentState, id: string, answer: number): AssessmentState {
  const answers = { ...state.answers, [id]: answer };
  // Changing a branch invalidates its diagnostic answers, including shared items.
  if (id === "track" && state.answers.track !== answer) for (const question of placementQuestions) delete answers[question.id];
  return { ...state, answers, completed: false };
}
export function parseAssessment(raw: string | null): AssessmentState {
  try {
    const value = JSON.parse(raw ?? "null");
    if (value?.version !== 1 || !value.answers || typeof value.answers !== "object" || Array.isArray(value.answers)) return emptyAssessment();
    const answers: AssessmentAnswers = {};
    for (const question of [...profileQuestions, ...placementQuestions]) {
      const answer = value.answers[question.id];
      const max = "correct" in question ? question.options.length : question.options.length - 1;
      if (Number.isInteger(answer) && answer >= 0 && answer <= max) answers[question.id] = answer;
    }
    const steps = assessmentSteps(answers);
    const firstMissing = steps.findIndex((question) => answers[question.id] === undefined);
    const step = Number.isInteger(value.step) ? Math.max(0, Math.min(value.step, firstMissing < 0 ? steps.length - 1 : firstMissing)) : 0;
    return { version: 1, answers, step, completed: value.completed === true && firstMissing < 0 };
  } catch { return emptyAssessment(); }
}
export function assessmentResult(answers: AssessmentAnswers) {
  const questions = questionsFor(answers);
  const correct = questions.filter((question) => answers[question.id] === question.correct).length;
  const level = correct <= 2 ? "Build your foundations" : correct <= 4 ? "Develop your understanding" : "Ready for deeper study";
  const courses = [...new Set(questions.map((question) => question.course))].map((course) => {
    const sample = questions.filter((question) => question.course === course);
    const score = sample.filter((question) => answers[question.id] === question.correct).length;
    return { course, correct: score, total: sample.length };
  });
  // Address observed gaps first. Self-reported experience never increases the score.
  const gaps = courses.filter((course) => course.correct < course.total).map((course) => course.course);
  const focus = answers.track === 2
    ? answers.goal === 2 ? ["machine-engine-room-safety", "machine-engine-room-ops", "machine-maintenance"] : ["machine-thermodynamics", "machine-fluid-mechanics", "machine-electrical"]
    : answers.track === 1
      ? answers.goal === 2 ? ["safety", "navigation", "communication", "cargo"] : ["seamanship", "stability", "navigation", "meteorology"]
      : ["seamanship", "stability", "navigation", "machine-thermodynamics"];
  const foundation = answers.experience === 0 || answers.goal === 0 || correct <= 2;
  const recommendations = [...new Set([...(foundation ? ["safety", "seamanship"] : []), ...gaps, ...focus])].slice(0, 6);
  return { correct, total: questions.length, level, courses, recommendations, gaps };
}
export const assessmentStorageKey = (account: string | null) => `mariners-book.placement.v1:${account ?? "guest"}`;
