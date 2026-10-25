import test from "node:test";
import assert from "node:assert/strict";
import { STCW_STUDY_PATHS, stcwStudyHref } from "./stcwStudyPaths";
import { SIRE_PREP_GROUPS, SIRE_PREP_ITEMS } from "./sireReadiness";

test("STCW study paths have unique, useful module links", () => {
  assert.deepEqual(STCW_STUDY_PATHS.map((path) => path.standard), [
    "STCW Code Table A-II/1", "STCW Code Table A-III/1"
  ]);
  for (const path of STCW_STUDY_PATHS) {
    assert.ok(path.steps.length >= 5);
    assert.equal(new Set(path.steps.map((step) => step.id)).size, path.steps.length);
    for (const step of path.steps) {
      assert.ok(step.reason.length > 30);
      const href = stcwStudyHref(step.courseKey);
      assert.match(href, /^\/(lessons|machine)\/[^/]+\/topics$/);
    }
  }
});
test("SIRE readiness prompts are independent with distinct stable identities", () => {
  assert.equal(new Set(SIRE_PREP_ITEMS.map((item) => item.id)).size, SIRE_PREP_ITEMS.length);
  assert.equal(SIRE_PREP_GROUPS.flatMap((group) => group.items).length, SIRE_PREP_ITEMS.length);
  assert.ok(SIRE_PREP_ITEMS.every((item) => item.guidance.length > 20));
});
