import { beforeEach, describe, it } from "node:test";
import assert from "node:assert/strict";

const store = new Map<string, string>();
Object.assign(globalThis, {
  localStorage: {
    getItem: (k: string) => store.get(k) ?? null,
    setItem: (k: string, v: string) => void store.set(k, v),
    clear: () => store.clear(),
  },
  window: { dispatchEvent: () => true },
});

const { getRecent, isSaved, RECENT_LIMIT, recordVisit, studyKindFor, toggleSaved } = await import("./studyActivity");

beforeEach(() => store.clear());

describe("studyActivity", () => {
  it("classifies study routes", () => {
    assert.equal(studyKindFor("/exercises/stability/topics/GM"), "Exercise");
    assert.equal(studyKindFor("/lessons/navigation/topics/Lights"), "Lesson");
    assert.equal(studyKindFor("/stcw-study-paths"), "Reference");
    assert.equal(studyKindFor("/inspections/sire-readiness"), "Reference");
    assert.equal(studyKindFor("/settings"), null);
  });

  it("keeps recent visits deduplicated and capped", () => {
    for (let i = 0; i < RECENT_LIMIT + 3; i++) recordVisit({ path: `/p${i}`, title: `P${i}`, kind: "Lesson" }, i);
    recordVisit({ path: "/p5", title: "P5", kind: "Lesson" }, 100);
    const recent = getRecent();
    assert.equal(recent.length, RECENT_LIMIT);
    assert.equal(recent[0].path, "/p5");
    assert.equal(recent.filter((r) => r.path === "/p5").length, 1);
  });

  it("toggles bookmarks", () => {
    const item = { path: "/lessons/x/topics/y", title: "Y", kind: "Lesson" as const };
    assert.equal(toggleSaved(item), true);
    assert.equal(isSaved(item.path), true);
    assert.equal(toggleSaved(item), false);
    assert.equal(isSaved(item.path), false);
  });
});
