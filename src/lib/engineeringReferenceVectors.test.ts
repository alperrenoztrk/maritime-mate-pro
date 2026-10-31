import assert from "node:assert/strict";
import test from "node:test";
import { calculateRectangularFreeSurface, calculateCounterflowLmtd, calculateStaticUkc,
  calculateTpcFromWaterplaneArea, calculateEngineFuelConsumption, calculateFouledHeatExchangerArea,
  calculateFuelEndurance, calculateVoyageEta } from "./verifiedOperationalMath";

const near = (a: number, b: number, tol = 1e-9) =>
  assert.ok(Number.isFinite(a) && Math.abs(a - b) <= tol, `${a} is not ${b}`);

test("rectangular free-surface correction scales with tank breadth cubed and inversely with displacement", () => {
  const base = calculateRectangularFreeSurface(10, 2, 1, 10000, 1);
  const wide = calculateRectangularFreeSurface(10, 4, 1, 10000, 1);
  const heavy = calculateRectangularFreeSurface(10, 2, 1, 20000, 1);
  near(wide.freeSurfaceCorrectionM / base.freeSurfaceCorrectionM, 8);
  near(heavy.freeSurfaceCorrectionM / base.freeSurfaceCorrectionM, 0.5);
});
test("LMTD agrees with DOE textbook counterflow example (temperature differences 280F and 190F)", () => {
  const result = calculateCounterflowLmtd(500,400,120,310);
  near(result.hotEndDeltaK,190);
  near(result.coldEndDeltaK,280);
  near(result.lmtdK, (280 - 190) / Math.log(280 / 190), 1e-10);
  assert.ok(Math.abs(result.lmtdK - 232) < 1);
});
test("LMTD rejects hot-stream heating or cold-stream cooling even when both end differences stay positive", () => {
  assert.throws(() => calculateCounterflowLmtd(100,120,10,20), RangeError);
  assert.throws(() => calculateCounterflowLmtd(100,80,40,20), RangeError);
});
test("UKC identity preserves negative clearances and signed tide/chart depths", () => {
  const r = calculateStaticUkc(-0.5,1.5,1.25,0.25,0.125);
  near(r.adjustedUkcM,-0.625);
});
test("TPC is density-linear and SFOC zero-power yields zero fuel, never NaN", () => {
  near(calculateTpcFromWaterplaneArea(500,1.025).tonnesPerCm,5.125);
  near(calculateTpcFromWaterplaneArea(500,1).tonnesPerCm,5);
  near(calculateEngineFuelConsumption(0,200,24).tonnes,0);
});
test("fouling cannot reduce required heat-transfer area for fixed load and LMTD", () => {
  const clean = calculateFouledHeatExchangerArea(500,1000,0,20);
  const fouled = calculateFouledHeatExchangerArea(500,1000,0.001,20);
  near(clean.requiredAreaM2,25);
  near(fouled.requiredAreaM2,50);
});
test("reserve and day rollover boundaries", () => {
  near(calculateFuelEndurance(100,100,20).days,0);
  assert.equal(calculateVoyageEta(24,12,23.5).dayOffset,1);
});
