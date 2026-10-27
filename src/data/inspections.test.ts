import test from "node:test";
import assert from "node:assert/strict";
import { INSPECTIONS } from "./inspections.ts";

test("all ten inspection types exist with unique storage keys", () => {
  assert.deepEqual(INSPECTIONS.map((i) => i.id), ["psc","sire","cdi","flag","class","ism","isps","mlc","rightship","terminal"]);
  assert.equal(new Set(INSPECTIONS.map((i) => i.storageKey)).size, INSPECTIONS.length);
  assert.equal(INSPECTIONS[0].storageKey, "beta-psc-checklist-v1");
});

test("every item has a unique id within its inspection and a reference", () => {
  for (const insp of INSPECTIONS) {
    const ids = insp.categories.flatMap((c) => c.items.map((i) => i.id));
    assert.equal(new Set(ids).size, ids.length, insp.id);
    for (const c of insp.categories) for (const i of c.items) assert.ok(i.ref.trim(), i.id);
  }
});
