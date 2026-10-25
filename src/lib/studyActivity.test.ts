import { beforeEach, describe, expect, it } from "vitest";
import { getRecent, isSaved, RECENT_LIMIT, recordVisit, studyKindFor, toggleSaved } from "./studyActivity";

beforeEach(() => localStorage.clear());

describe("studyActivity", () => {
  it("classifies study routes", () => {
    expect(studyKindFor("/exercises/stability/topics/GM")).toBe("Exercise");
    expect(studyKindFor("/lessons/navigation/topics/Lights")).toBe("Lesson");
    expect(studyKindFor("/settings")).toBeNull();
  });

  it("keeps recent visits deduplicated and capped", () => {
    for (let i = 0; i < RECENT_LIMIT + 3; i++) recordVisit({ path: `/p${i}`, title: `P${i}`, kind: "Lesson" }, i);
    recordVisit({ path: "/p5", title: "P5", kind: "Lesson" }, 100);
    const recent = getRecent();
    expect(recent).toHaveLength(RECENT_LIMIT);
    expect(recent[0].path).toBe("/p5");
    expect(recent.filter((r) => r.path === "/p5")).toHaveLength(1);
  });

  it("toggles bookmarks", () => {
    const item = { path: "/lessons/x/topics/y", title: "Y", kind: "Lesson" as const };
    expect(toggleSaved(item)).toBe(true);
    expect(isSaved(item.path)).toBe(true);
    expect(toggleSaved(item)).toBe(false);
    expect(isSaved(item.path)).toBe(false);
  });
});
