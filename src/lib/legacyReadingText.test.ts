import assert from "node:assert/strict";
import test from "node:test";
import { splitLegacyReadingText } from "./legacyReadingText";

test("paged sections preserve all original paragraphs exactly", () => {
  const original = ["A heading:\nMore details.", "1. First entry\n2. Second entry", "Formula Q = A × V", "Final note."].join("\n\n");
  const pages = splitLegacyReadingText(original, 35);
  assert.ok(pages.length > 1);
  assert.equal(pages.join("\n\n"), original);
});
test("long, unbreakable paragraphs remain intact instead of being truncated", () => {
  const long = "Stability".repeat(400);
  assert.deepEqual(splitLegacyReadingText(long, 100), [long]);
});
test("empty text and invalid page sizes", () => {
  assert.deepEqual(splitLegacyReadingText(" "), []);
  assert.throws(() => splitLegacyReadingText("A", 0));
});
