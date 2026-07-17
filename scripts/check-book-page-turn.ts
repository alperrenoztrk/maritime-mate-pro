import assert from "node:assert/strict";
import {
  getBookPageLayout,
  getBookTurnProgress,
  paginateBookPages,
  shouldCompleteBookTurn,
  type BookPageLike,
} from "../src/lib/bookMotion";
import { mapBookDelta, mapBookPointToLocal } from "../src/lib/bookOrientation";

// Natural mode is the identity; rotated maps screen (dx,dy) -> book (dy,-dx),
// the inverse of the gate's rotate(90deg) drawing transform.
assert.deepEqual(mapBookDelta(-100, 30, "natural"), { deltaX: -100, deltaY: 30 });
assert.deepEqual(mapBookDelta(-100, 30, "rotated"), { deltaX: 30, deltaY: 100 });
assert.deepEqual(mapBookDelta(10, -80, "rotated"), { deltaX: -80, deltaY: -10 });

const rect = { top: 100, left: 20, right: 410 };
assert.deepEqual(mapBookPointToLocal(120, 250, rect, "natural"), { x: 100, y: 150 });
assert.deepEqual(mapBookPointToLocal(120, 250, rect, "rotated"), { x: 150, y: 290 });

assert.equal(getBookTurnProgress(-100, 200, "forward"), 0.5);
assert.equal(getBookTurnProgress(100, 200, "backward"), 0.5);
assert.equal(getBookTurnProgress(80, 200, "forward"), 0);
assert.equal(getBookTurnProgress(-300, 200, "forward"), 1);

assert.equal(shouldCompleteBookTurn(0.35, 0, "forward"), true);
assert.equal(shouldCompleteBookTurn(0.12, -0.5, "forward"), true);
assert.equal(shouldCompleteBookTurn(0.12, 0.5, "forward"), false);
assert.equal(shouldCompleteBookTurn(0.2, 0.1, "backward"), false);

const mobileLayout = getBookPageLayout(390, 320, 1);
const largeTextLayout = getBookPageLayout(390, 320, 1.3);
assert.ok(mobileLayout.rowBudget >= 6);
assert.ok(mobileLayout.charactersPerLine >= 14);
assert.ok(largeTextLayout.rowBudget <= mobileLayout.rowBudget);
assert.ok(largeTextLayout.charactersPerLine <= mobileLayout.charactersPerLine);

const labels = [
  "Temel seyir",
  "Harita projeksiyonları ve elektronik seyir haritaları",
  "Manyetik pusula",
  "Cayro pusula",
  "Radar ve ARPA",
  "ECDIS rota planlama ve izleme",
  "Köprüüstü vardiya standartları",
  "Gelgit hesabı",
  "Göksel seyir",
  "Meteoroloji",
  "Pilotaj",
  "Kıyı seyri",
];
const pages: Array<BookPageLike & { numeral: string; title: string; to: string }> = [{
  id: "navigation",
  numeral: "I",
  title: "Seyir",
  to: "/navigation",
  sections: [{
    heading: "Güverte",
    entries: labels.map((label, index) => ({ label, to: `/navigation/${index}` })),
  }],
}];

const paginated = paginateBookPages(pages, mobileLayout);
assert.ok(paginated.length > 1, "Dense contents should become multiple physical leaves.");
assert.equal(paginated[0].continuation, false);
assert.equal(paginated[1].continuation, true);
assert.equal(new Set(paginated.map((page) => page.id)).size, paginated.length);
assert.deepEqual(
  paginated.flatMap((page) => page.sections.flatMap((section) => section.entries.map((entry) => entry.label))),
  labels,
  "Pagination must preserve every entry exactly once and in order.",
);

console.log("Book turn check passed: drag physics, flick threshold and overflow-safe leaf pagination.");
