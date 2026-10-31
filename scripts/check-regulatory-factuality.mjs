#!/usr/bin/env node
/**
 * Regression gate for known false vessel-safety and compliance claims.
 * Passing this is not a survey, LSA audit or independent regulatory review.
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (name) => readFileSync(name, "utf8");
const pages = [
  "src/pages/SOLASRegulations.tsx",
  "src/pages/SOLASSafetyEquipment.tsx",
  "src/pages/SOLASShipRequirements.tsx",
];
for (const path of pages) {
  const text = read(path);
  assert.match(text, /PagedReadingSurface/, `${path}: missing book-reader integration`);
  assert.doesNotMatch(text, /(?:complement|lifeboat capacity|persons-per-lifeboat).{0,40}(?:1\.25|125%)/i,
    `${path}: a vessel-specific survival craft capacity cannot be invented`);
  assert.doesNotMatch(text, /readiness\s*:\s*\d+|Preparation:\s*%|100% charged|Test 2024-11|Battery due 2027|Drill 2025-01/i,
    `${path}: fictitious equipment/inspection status must not masquerade as live vessel evidence`);
}
assert.match(read(pages[0]), /SOLAS III\/21 or III\/31/,
  "The life-saving rule must distinguish passenger/cargo carriage and approved alternatives.");
assert.match(read(pages[1]), /www\.imo\.org\/en\/ourwork\/safety\/pages\/lifesavingappliances/,
  "LSA study material must preserve an official source link.");
assert.doesNotMatch(read(pages[2]), /<Progress\s+value=\{group\.readiness\}/,
  "No calculated compliance readiness without ship documents or observations.");
console.log("SOLAS false-compliance regression checks passed; professional/legal source verification remains required.");
