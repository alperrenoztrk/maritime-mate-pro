import assert from "node:assert/strict";
import {
  getBookPageLayout,
  getBookTurnFrame,
  getBookTurnProgress,
  getBookTurnProgressFromContact,
  getBookTurnSettleProgress,
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

assert.equal(getBookTurnProgressFromContact(0, 200, "forward"), 0);
assert.equal(getBookTurnProgressFromContact(-200, 200, "forward"), 0.5);
assert.equal(getBookTurnProgressFromContact(-400, 200, "forward"), 1);
assert.equal(getBookTurnProgressFromContact(200, 200, "backward"), 0.5);

assert.equal(shouldCompleteBookTurn(0.35, 0, "forward"), true);
assert.equal(shouldCompleteBookTurn(0.12, -0.5, "forward"), true);
assert.equal(shouldCompleteBookTurn(0.12, 0.5, "forward"), false);
assert.equal(shouldCompleteBookTurn(0.2, 0.1, "backward"), false);

const centredStart = getBookTurnFrame(0, "forward", 0.5, 240, 360);
const centredMid = getBookTurnFrame(0.5, "forward", 0.5, 240, 360);
const centredEnd = getBookTurnFrame(1, "forward", 0.5, 240, 360);
assert.equal(centredStart.angleDeg, 0);
assert.equal(centredEnd.angleDeg, -180);
assert.ok(centredMid.liftPx > 18, "A half-turned leaf must rise visibly above the spread.");
assert.ok(centredMid.shade > 0.95, "Paper shade must peak around the spine crossing.");
assert.equal(centredStart.topInsetPercent, 0);
assert.ok(centredMid.topInsetPercent > 0);

const highGrab = getBookTurnFrame(0.5, "forward", 0.12, 240, 360);
const lowGrab = getBookTurnFrame(0.5, "forward", 0.88, 240, 360);
assert.ok(highGrab.bottomInsetPercent > highGrab.topInsetPercent);
assert.ok(lowGrab.topInsetPercent > lowGrab.bottomInsetPercent);
assert.ok(highGrab.translateYPx < 0 && lowGrab.translateYPx > 0);

assert.equal(getBookTurnSettleProgress(0, 0.28, true), 0.28);
assert.equal(getBookTurnSettleProgress(1, 0.28, true), 1);
assert.equal(getBookTurnSettleProgress(1, 0.72, false), 0);
for (let index = 0; index <= 20; index += 1) {
  const value = getBookTurnSettleProgress(index / 20, 0.2, true, -0.8);
  assert.ok(value >= 0.2 && value <= 1, "Settle physics must remain inside the physical turn range.");
}

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

console.log("Book turn check passed: curl geometry, momentum, drag thresholds and overflow-safe pagination.");
