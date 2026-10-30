import assert from "node:assert/strict";
import test from "node:test";
import {
  buildProfessionalReport, parseProfessionalFields, type ProfessionalGroup,
} from "./professionalCalculatorCore";

const groups: ProfessionalGroup[] = [
  { title: "Own Ship", fields: [
    { key: "course", label: "Course", unit: "°T", min: 0, max: 360 },
    { key: "speed", label: "Speed", unit: "kn", min: 0 },
  ] },
];

test("parse complete numeric inputs, including comma decimal and zero", () => {
  const actual = parseProfessionalFields(groups, { course: "090", speed: "0,5" });
  assert.deepEqual(actual.errors, {});
  assert.deepEqual(actual.values, { course: 90, speed: 0.5 });
});
test("reject invalid, empty, out-of-bound and partially numeric inputs", () => {
  assert.ok(parseProfessionalFields(groups, { course: "", speed: "12" }).errors.course);
  assert.ok(parseProfessionalFields(groups, { course: "361", speed: "12" }).errors.course);
  assert.ok(parseProfessionalFields(groups, { course: "90", speed: "-1" }).errors.speed);
  assert.ok(parseProfessionalFields(groups, { course: "90abc", speed: "1" }).errors.course);
  assert.ok(parseProfessionalFields(groups, { course: "90", speed: "Infinity" }).errors.speed);
  assert.ok(parseProfessionalFields(groups, { course: "90", speed: " " }).errors.speed);
});
test("report exposes inputs, timestamp, results, steps and limitations", () => {
  const report = buildProfessionalReport("Test CPA", groups, { course: 90, speed: 12 },
    { results: [{ label: "CPA", value: "1.5 NM" }], steps: ["Compute relative velocity."],
      notices: ["For cross-check only."] },
    "R + Vt", "2026-10-30T12:00:00.000Z");
  for (const fragment of ["Test CPA", "NOT VESSEL-APPROVED", "Course: 90 °T", "CPA: 1.5 NM", "Compute relative velocity", "For cross-check only", "R + Vt"]) {
    assert.ok(report.includes(fragment), `Missing ${fragment}`);
  }
});
