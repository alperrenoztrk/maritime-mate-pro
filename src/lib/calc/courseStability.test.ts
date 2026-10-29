/**
 * Course calculators (Learn → Stability / Cargo) with expected values worked by
 * hand, so a wrong formula in the cards is caught, not only NaN/exceptions.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { stability } from "@/data/courseContent/stability";
import { cargo } from "@/data/courseContent/cargo";
import type { CourseTopic } from "@/data/courseContent/types";

const run = (topic: CourseTopic, id: string, vals: Record<string, number>) => {
  const entry = topic.entries.find((e) => e.id === id);
  assert.ok(entry?.calculate, `${topic.key}/${id} exists`);
  return entry.calculate(vals);
};
const value = (results: { label: string; value: string }[], label: string) => {
  const r = results.find((x) => x.label === label);
  assert.ok(r, `result "${label}" in ${JSON.stringify(results)}`);
  return Number.parseFloat(r.value.replace(/,/g, ""));
};

test("trim change is shared about the LCF: aft part = trim × (LCF→AP)/L", () => {
  // 30 cm, LCF 78 m from AP and 72 m from FP, L 150 m → aft 15.6 cm, forward 14.4 cm
  const r = run(stability, "trim-distribution", { dtrim: 30, df: 72, da: 78, l: 150 });
  assert.equal(value(r, "Aft Draft Change (ΔTA)"), 15.6);
  assert.equal(value(r, "Forward Draft Change (ΔTF)"), 14.4);
});

test("displacement at the same draft in fresh water is smaller", () => {
  // 12 000 × 1.000 / 1.025 = 11 707.3 t
  const r = run(stability, "fresh-water-disp", { disp: 12000, rhosea: 1.025, rhofresh: 1.0 });
  assert.equal(value(r, "Fresh Water Displacement"), 11707);
});

test("angle of loll uses the wall-sided relation", () => {
  // tan φ = √(2 × 0.10 / 4.0) → 12.60°
  const r = run(stability, "angle-of-loll", { gm: -0.1, bm: 4.0 });
  assert.equal(value(r, "Angle of Loll"), 12.6);
});

test("rolling period uses the IS Code coefficient", () => {
  // C = 0.373 + 0.023×(32/12) − 0.043×2.2 = 0.3397; T = 2×0.3397×32/√2 = 15.4 s
  const r = run(stability, "roll-period", { b: 32, d: 12, lwl: 220, gm: 2 });
  assert.equal(value(r, "Rolling Period (T)"), 15.4);
});

test("GM status follows IS Code GM0 ≥ 0.15 m", () => {
  const r = run(stability, "gm", { km: 8.35, kg: 8.2 });
  assert.match(r.find((x) => x.label === "Status")!.value, /Meets/);
});

test("first trim correction sign", () => {
  // 0.40 × 2.5 × 25 × 100 / 150 = 16.7 t
  assert.equal(value(run(cargo, "trim-correction-1", { trim: 0.4, lcf: 2.5, tpc: 25, lbp: 150 }), "Δ₁"), 16.7);
});
