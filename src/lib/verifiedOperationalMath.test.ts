import assert from "node:assert/strict";
import test from "node:test";
import {
  calculateVoyageEta, calculateRectangularFreeSurface, calculateTpcFromWaterplaneArea,
  calculateEngineFuelConsumption, calculateFuelEndurance,
} from "./verifiedOperationalMath";

const near = (actual: number, expected: number, tolerance = 1e-8) =>
  assert.ok(Math.abs(actual - expected) <= tolerance, `${actual} != ${expected}`);

test("ETA: 120 NM at 10 kn departing 20:30 UTC arrives next day at 08:30 UTC", () => {
  const r = calculateVoyageEta(120, 10, 20.5);
  near(r.passageHours, 12);
  assert.equal(r.etaUtcClock, "08:30");
  assert.equal(r.dayOffset, 1);
});
test("ETA: zero distance and exact day rollover, nonzero day offsets", () => {
  assert.deepEqual(calculateVoyageEta(0, 12, 0), { passageHours: 0, etaUtcClock: "00:00", dayOffset: 0 });
  const r = calculateVoyageEta(1000, 10, 23.5);
  assert.equal(r.etaUtcClock, "03:30");
  assert.equal(r.dayOffset, 5);
});
test("ETA invalid speed, departure clock and inputs fail", () => {
  assert.throws(() => calculateVoyageEta(100, 0, 8));
  assert.throws(() => calculateVoyageEta(100, 10, 24));
  assert.throws(() => calculateVoyageEta(-10, 10, 8));
  assert.throws(() => calculateVoyageEta(Infinity, 10, 8));
});
test("FSE: rectangular free surface moment and corrected GM in metric units", () => {
  const r = calculateRectangularFreeSurface(10, 5, 1.025, 10000, 0.8);
  near(r.transverseSecondMomentM4, 104.16666666666667);
  near(r.freeSurfaceMomentTonneMetres, 106.77083333333334);
  near(r.freeSurfaceCorrectionM, 0.010677083333333334);
  near(r.correctedGmM, 0.7893229166666667);
});
test("FSE: nonpositive dimensions or displacement fail; unstable corrected GM is not masked", () => {
  assert.throws(() => calculateRectangularFreeSurface(0, 5, 1.025, 10000, 1));
  assert.throws(() => calculateRectangularFreeSurface(10, 5, 1.025, 0, 1));
  assert.ok(calculateRectangularFreeSurface(10, 10, 1, 100, 0.01).correctedGmM < 0);
});
test("TPC: waterplane area × water density ÷ 100", () => {
  near(calculateTpcFromWaterplaneArea(2500, 1.025).tonnesPerCm, 25.625);
  assert.throws(() => calculateTpcFromWaterplaneArea(-1, 1.025));
});
test("Engine SFOC: 8000 kW × 180 g/kWh × 24 h = 34.56 t", () => {
  const r = calculateEngineFuelConsumption(8000, 180, 24);
  near(r.tonnes, 34.56);
  near(r.kilograms, 34560);
  near(r.hourlyKg, 1440);
});
test("Engine zero runtime and invalid SFOC", () => {
  near(calculateEngineFuelConsumption(8000, 180, 0).tonnes, 0);
  assert.throws(() => calculateEngineFuelConsumption(8000, 0, 12));
  assert.throws(() => calculateEngineFuelConsumption(8000, 180, -1));
});
test("Endurance excludes reserve and rejects impossible reserve or zero daily use", () => {
  const r = calculateFuelEndurance(120, 20, 25);
  near(r.availableTonnes, 100);
  near(r.days, 4);
  near(r.hours, 96);
  assert.throws(() => calculateFuelEndurance(100, 120, 10));
  assert.throws(() => calculateFuelEndurance(100, 0, 0));
});
