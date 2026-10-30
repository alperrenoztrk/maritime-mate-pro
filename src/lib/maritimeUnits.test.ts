import assert from "node:assert/strict";
import test from "node:test";
import { convertMaritimeUnit } from "./maritimeUnits";

const near = (actual: number, expected: number, eps = 1e-9) =>
  assert.ok(Math.abs(actual - expected) < eps, `expected ${actual} ≈ ${expected}`);

test("international nautical mile and cable conversions", () => {
  near(convertMaritimeUnit("distance", "nm", "m", 1), 1852);
  near(convertMaritimeUnit("distance", "nm", "cable", 1), 10);
});
test("knots and km/h are speed, not km/s", () => {
  near(convertMaritimeUnit("speed", "kn", "kmh", 10), 18.52);
  near(convertMaritimeUnit("speed", "ms", "kn", 1), 3600 / 1852);
});
test("volume, mass and pressure reference values", () => {
  near(convertMaritimeUnit("mass", "tonne", "kg", 1), 1000);
  near(convertMaritimeUnit("volume", "usg", "l", 1), 3.785411784);
  near(convertMaritimeUnit("pressure", "bar", "kpa", 1), 100);
});
test("temperature endpoints and absolute-zero validation", () => {
  near(convertMaritimeUnit("temperature", "c", "f", 100), 212);
  near(convertMaritimeUnit("temperature", "k", "c", 273.15), 0);
  assert.throws(() => convertMaritimeUnit("temperature", "c", "k", -300));
});
test("invalid input is rejected instead of producing NaN output", () => {
  assert.throws(() => convertMaritimeUnit("speed", "kn", "ms", Number.NaN));
  assert.throws(() => convertMaritimeUnit("speed", "made-up", "ms", 1));
});
