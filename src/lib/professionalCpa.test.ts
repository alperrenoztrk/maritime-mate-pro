import assert from "node:assert/strict";
import test from "node:test";
import { solveProfessionalCpa } from "./professionalCpa";

const get = (out: ReturnType<typeof solveProfessionalCpa>, label: string) =>
  out.results.find((item) => item.label === label)?.value ?? "";

test("head-on true-motion approach, 6 NM at 20 kn closing, gives 18 min", () => {
  const result = solveProfessionalCpa({
    ownCourse: 0, ownSpeed: 10,
    targetCourse: 180, targetSpeed: 10,
    bearing: 0, range: 6,
  });
  assert.equal(get(result, "Closest point of approach (CPA)"), "0.000 NM");
  assert.equal(get(result, "Time to CPA (TCPA)"), "18.0 min");
  assert.equal(get(result, "Relative speed"), "20.00 kn");
});
test("identical ground motions yield undefined TCPA, not an invented ETA", () => {
  const result = solveProfessionalCpa({
    ownCourse: 90, ownSpeed: 12,
    targetCourse: 90, targetSpeed: 12,
    bearing: 45, range: 6,
  });
  assert.equal(get(result, "Closest point of approach (CPA)"), "6.000 NM");
  assert.match(get(result, "Time to CPA (TCPA)"), /Undefined/);
  assert.ok(result.notices?.some((line) => line.includes("no unique")));
});
test("receding target returns present distance and warning, not negative TCPA", () => {
  const result = solveProfessionalCpa({
    ownCourse: 0, ownSpeed: 0,
    targetCourse: 0, targetSpeed: 10,
    bearing: 0, range: 3,
  });
  assert.equal(get(result, "Closest point of approach (CPA)"), "3.000 NM");
  assert.equal(get(result, "Time to CPA (TCPA)"), "0.0 min");
  assert.ok(result.notices?.some((line) => line.includes("past")));
});
test("crossing case has finite non-negative CPA and TCPA", () => {
  const result = solveProfessionalCpa({
    ownCourse: 90, ownSpeed: 10,
    targetCourse: 180, targetSpeed: 10,
    bearing: 45, range: 6,
  });
  const cpa = Number.parseFloat(get(result, "Closest point of approach (CPA)"));
  const tcpa = Number.parseFloat(get(result, "Time to CPA (TCPA)"));
  assert.ok(Number.isFinite(cpa) && cpa >= 0 && cpa <= 6);
  assert.ok(Number.isFinite(tcpa) && tcpa >= 0);
});
