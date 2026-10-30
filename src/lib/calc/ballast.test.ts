/** BWM Convention 2004 (B-4, D-1, D-2) and ballast transfer, hand-worked values. */
import test from "node:test";
import assert from "node:assert/strict";
import { ballastTransfer, d2Check, exchangeLocation, exchangePlan } from "./ballast";

const RAD = Math.PI / 180;

test("transfer: weight, time, trim, heel", () => {
  // 200 m³ × 1.025 = 205 t moved 40 m aft (LCG 120 → 80 from AP), 10 m to starboard
  const r = ballastTransfer({
    volume: 200,
    density: 1.025,
    pumpRate: 250,
    from: { lcg: 120, tcg: -5, vcg: 1.2 },
    to: { lcg: 80, tcg: 5, vcg: 1.2 },
    displacement: 30000,
    gmFluid: 2.0,
    mctc: 410,
  });
  assert.ok(Math.abs(r.weight - 205) < 1e-9);
  assert.equal(r.hours, 0.8);
  // Moving weight aft trims by the stern: 205 × 40 / 410 = +20 cm
  assert.ok(Math.abs(r.trimChangeCm - 20) < 1e-12);
  // tan θ = 205 × 10 / (30 000 × 2) = 0.0341667
  assert.ok(Math.abs(r.heelChange - Math.atan(0.0341666667) / RAD) < 1e-7);
  assert.equal(r.riseOfG, 0);
});

test("D-1 exchange", () => {
  const seq = exchangePlan("sequential", 500, 250);
  assert.equal(seq.volumePumped, 1000);
  assert.equal(seq.hours, 4);
  const ft = exchangePlan("flow-through", 500, 250);
  assert.equal(ft.volumePumped, 1500);
  assert.equal(ft.hours, 6);
  assert.equal(ft.deemedCompliant, true);
  const short = exchangePlan("flow-through", 500, 250, 1200);
  assert.equal(short.timesVolume, 2.4);
  assert.equal(short.deemedCompliant, false);
});

test("B-4 location", () => {
  assert.equal(exchangeLocation(210, 3500), "b4-1-1");
  assert.equal(exchangeLocation(120, 250), "b4-1-2");
  assert.equal(exchangeLocation(40, 3000), "not-met");
  assert.equal(exchangeLocation(250, 150), "not-met");
});

test("D-2 limits are strict 'less than'", () => {
  const r = d2Check({ large: 9, small: 10, ecoli: 249.9, enterococci: 100 });
  assert.deepEqual(r.map((x) => [x.key, x.pass]), [["large", true], ["small", false], ["ecoli", true], ["enterococci", false]]);
});
