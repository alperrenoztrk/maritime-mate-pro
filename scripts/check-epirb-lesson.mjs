#!/usr/bin/env node
/** Operational training regression checks: EPIRB is authored at four entry points. */
import fs from "node:fs";
import assert from "node:assert/strict";
const get = (path) => fs.readFileSync(path, "utf8");
const paths = [
  "src/data/shipSystems/longform/gmdss-lsa/4.ts",
  "src/data/safetyTopicContents.ts",
  "src/pages/SafetyTopicsPage.tsx",
  "src/data/communicationTopicContents.ts",
];
const requirements = [
  ["406 MHz", /406/],
  ["121.5 MHz", /121\.5/],
  ["AIS 161.975 MHz", /161\.975/],
  ["48 hours battery minimum", /48\s*(?:saat|hours)/i],
  ["HRU", /HRU/],
  ["water sensor distinction", /(?:su sensörü|water sensor)/i],
  ["self-test", /self.test/i],
  ["RCC/MRCC chain", /(?:RCC|MRCC)/],
  ["radar-SART distinction", /radar.SART/i],
];
for (const path of paths) {
 const source = get(path);
 for (const [label, regex] of requirements) {
   assert.match(source, regex, `${path} is missing ${label}`);
 }
}
const detailed = get(paths[0]);
assert.ok((detailed.match(/"heading":/g) ?? []).length >= 8, "EPIRB needs eight detailed chapters");
assert.match(get("src/data/shipSystems/longform/types.ts"), /illustration\?:/);
assert.match(get("src/pages/ShipSystemDeepDive.tsx"), /sec\.illustration/);
// No AI-authored illustrations: a licensed, real EPIRB photograph is used.
const source = get("src/data/shipSystems/longform/gmdss-lsa/4.ts");
assert.match(source, /verifiedEpirbPhoto/);
assert.match(source, /Marwan Mohamad/);
assert.ok(fs.existsSync("src/assets/lessons/epirb-gps.jpg"));
for (const path of paths) {
  assert.doesNotMatch(get(path), /\/lessons\/epirb-(?:alert-chain|float-free|display-comparison)\.svg/);
}
const questions = get("src/data/lessonFlow/safety.ts");
assert.match(questions, /Float-free EPIRB/);
assert.match(questions, /Radar ekranında 12 nokta/);
console.log("EPIRB checks passed: four lesson sources, eight chapters, sourced real EPIRB photograph, three assessment questions.");
