import test from "node:test";
import assert from "node:assert/strict";
import { emptyAssessment } from "@/data/learningAssessment";
import { PLACEMENT_DONE_KEY, isPlacementDone, needsPlacementBackfill, placementDoneAt, placementDoneUpdate, readPlacement, shouldRequirePlacement } from "./learningPlacementGate";

const done = { ...emptyAssessment(), completed: true };
const at = "2026-10-31T09:00:00.000Z";
const gate = { signedIn: true, loading: false, mfaChallengeRequired: false, publicRoute: false, done: false };

test("either the device or the account can mark the placement as finished", () => {
  assert.equal(isPlacementDone(emptyAssessment(), {}), false);
  assert.equal(isPlacementDone(emptyAssessment(), undefined), false);
  assert.equal(isPlacementDone(done, {}), true);
  assert.equal(isPlacementDone(emptyAssessment(), { [PLACEMENT_DONE_KEY]: at }), true);
});
test("only a valid timestamp counts as an account record", () => {
  assert.equal(placementDoneAt({ [PLACEMENT_DONE_KEY]: at }), at);
  for (const value of [true, 1, "", "yesterday", null]) assert.equal(placementDoneAt({ [PLACEMENT_DONE_KEY]: value }), null);
  assert.equal(placementDoneAt(null), null);
  assert.equal(placementDoneAt("text"), null);
});
test("an offline completion is copied to the account exactly once", () => {
  assert.equal(needsPlacementBackfill(done, {}), true);
  assert.equal(needsPlacementBackfill(done, { [PLACEMENT_DONE_KEY]: at }), false);
  assert.equal(needsPlacementBackfill(emptyAssessment(), {}), false);
});
test("the placement is required only for a usable, signed-in account that has not finished it", () => {
  assert.equal(shouldRequirePlacement(gate), true);
  assert.equal(shouldRequirePlacement({ ...gate, signedIn: false }), false);
  assert.equal(shouldRequirePlacement({ ...gate, loading: true }), false);
  assert.equal(shouldRequirePlacement({ ...gate, mfaChallengeRequired: true }), false);
  assert.equal(shouldRequirePlacement({ ...gate, publicRoute: true }), false);
  assert.equal(shouldRequirePlacement({ ...gate, done: true }), false);
});
test("the account patch holds only the completion time", () => {
  assert.deepEqual(placementDoneUpdate(new Date(at)), { [PLACEMENT_DONE_KEY]: at });
});
test("unreadable storage starts an empty placement", () => {
  assert.deepEqual(readPlacement("missing"), emptyAssessment());
});
