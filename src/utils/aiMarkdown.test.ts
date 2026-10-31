import assert from "node:assert/strict";
import test from "node:test";
import { normalizeAiMarkdown } from "./aiMarkdown";

test("spaces inside bold marks are removed so the text renders bold", () => {
  assert.equal(normalizeAiMarkdown("** Metacentric height**"), "**Metacentric height**");
  assert.equal(normalizeAiMarkdown("**GM **= KM − KG"), "**GM**= KM − KG");
});
test("the closing mark of one bold part is not taken as the next opening", () => {
  assert.equal(normalizeAiMarkdown("**KM** and ** KG**"), "**KM** and **KG**");
});
test("lines with an odd number of marks and plain text are left unchanged", () => {
  assert.equal(normalizeAiMarkdown("V ≈ 1.625 × B**1.5 knots"), "V ≈ 1.625 × B**1.5 knots");
  assert.equal(normalizeAiMarkdown("Plain answer\n- item"), "Plain answer\n- item");
});
test("LaTeX dollar signs are dropped", () => {
  assert.equal(normalizeAiMarkdown("$GM = KM - KG$"), "GM = KM - KG");
});
