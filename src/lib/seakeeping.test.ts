import { test } from "node:test";
import assert from "node:assert/strict";
import { deepWaterWavelength, encounterPeriod, representativeHs, resonanceRisk } from "./seakeeping";

test("deep-water wavelength for 10 s wave is ~156 m", () => {
  assert.ok(Math.abs(deepWaterWavelength(10) - 156.1) < 0.5);
});

test("encounter period: beam seas equal wave period", () => {
  assert.ok(Math.abs(encounterPeriod(10, 15, 90) - 10) < 1e-6);
});

test("encounter period: head seas at 15 kn shorten a 10 s wave to ~6.8 s", () => {
  const te = encounterPeriod(10, 15, 180);
  assert.ok(te > 6.6 && te < 7.0, `got ${te}`);
});

test("encounter period: following seas lengthen the period", () => {
  assert.ok(encounterPeriod(10, 10, 0) > 10);
});

test("Douglas 4 (moderate) representative Hs is 1.875 m", () => {
  assert.equal(representativeHs(4), 1.875);
});

test("resonance: Te equal to Tr is synchronous, Te = Tr/2 is parametric", () => {
  assert.equal(resonanceRisk(20, 20), "synchronous");
  assert.equal(resonanceRisk(20, 10), "parametric");
  assert.equal(resonanceRisk(20, 14), "none");
});
