/**
 * Table 54B checks. Expected values are evaluated independently from the
 * published ASTM D1250-80 Table 54B formula and agree with the printed table.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { alpha15, oilQuantity, vcf54B, wcf56 } from "./petroleum";

test("Table 54B VCF for fuel oils", () => {
  assert.equal(vcf54B(985.0, 50), 0.9758);
  assert.equal(vcf54B(850.0, 40), 0.9791);
  assert.equal(vcf54B(991.0, 10), 1.0034);
  assert.equal(vcf54B(991.0, 15), 1);
  assert.ok(Math.abs(alpha15(985.0) - 0.00068631) < 1e-8);
});

test("density outside Table 54B range is rejected", () => {
  assert.throws(() => vcf54B(600, 20));
  assert.throws(() => vcf54B(1100, 20));
});

test("standard volume and weight in air", () => {
  // 1000 m³ observed at 50 °C, ρ15 = 985.0 → V15 = 975.8 m³; WCF = 0.9839 → 960.09 t
  const q = oilQuantity(1000, 985.0, 50);
  assert.ok(Math.abs(q.volume15 - 975.8) < 1e-9);
  assert.ok(Math.abs(wcf56(985.0) - 0.9839) < 1e-12);
  assert.ok(Math.abs(q.tonnesInAir - 960.08962) < 1e-5);
  assert.ok(Math.abs(q.tonnesInVacuum - 961.163) < 1e-6);
});
