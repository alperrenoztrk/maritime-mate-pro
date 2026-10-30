/**
 * Course calculators (Learn → Navigation, /navigation/formulas) with expected
 * values worked by hand from the source formula.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { navigation } from "@/data/courseContent/navigation";

const run = (id: string, vals: Record<string, number>) => {
  const entry = navigation.entries.find((e) => e.id === id);
  assert.ok(entry?.calculate, `navigation/${id} exists`);
  return entry.calculate(vals);
};
const value = (results: { label: string; value: string }[], label: string) => {
  const r = results.find((x) => x.label === label);
  assert.ok(r, `result "${label}" in ${JSON.stringify(results)}`);
  return Number.parseFloat(r.value.replace(/,/g, ""));
};
const rad = (d: number) => (d * Math.PI) / 180;

test("current triangle heads up into the current: TR 090°, set 180° 2 kn, 12 kn → CTS 080.4°", () => {
  // sin(CTS − 090°) = (2/12)·sin(090° − 180°) = −0.1667 → CTS = 080.4°; SOG = √(12² − 2²) = 11.83 kn
  const r = run("current-triangle", { tr: 90, v: 12, set: 180, c: 2 });
  assert.equal(value(r, "CTS (Course To Steer)"), 80.4);
  assert.equal(value(r, "SOG"), 11.83);
});

test("rate of turn = V/R: 12 kn on a 600 m radius → 35.4 °/min", () => {
  // 12 × 0.514444 / 600 = 0.0102889 rad/s × 3437.75 = 35.37 °/min
  assert.equal(value(run("rate-of-turn", { v: 12, r: 600 }), "Rate of Turn (ROT)"), 35.4);
});

test("Barrass squat: Cb 0.80, 10 kn → 0.80 m open water, 1.60 m confined", () => {
  const r = run("squat", { cb: 0.8, v: 10 });
  assert.equal(value(r, "Squat, open water"), 0.8);
  assert.equal(value(r, "Squat, confined channel"), 1.6);
});

test("rule of twelfths at 1.5 h: LW 1.2 m + 4.0 m × 2/12 = 1.87 m", () => {
  assert.equal(value(run("height-of-tide", { low: 1.2, range: 4, t: 1.5 }), "Height of Tide (H)"), 1.87);
});

test("meridian altitude: Ho 68.5°, body bears south, δ 20° N → 41.5° N", () => {
  const r = run("meridian-passage-lat", { ho: 68.5, dec: 20, bearing: 1 });
  assert.equal(value(r, "Latitude (φ)"), 41.5);
  assert.match(r.find((x) => x.label === "Latitude (φ)")!.value, /N$/);
});

test("amplitude: φ 40°, δ 15° N → A 19.75°, rising 070.3°, setting 289.7°", () => {
  // sin A = sin 15° / cos 40° = 0.33787 → A = 19.746°
  const r = run("amplitude", { dec: 15, lat: 40 });
  assert.equal(value(r, "Amplitude (A)"), 19.75);
  assert.equal(value(r, "True bearing rising"), 70.3);
  assert.equal(value(r, "True bearing setting"), 289.7);
});

test("two bearings on the bow: doubling 30° → 60° with a 5 nm run", () => {
  const r = run("doubling-angle", { a1: 30, a2: 60, run: 5 });
  assert.equal(value(r, "Distance off at the second bearing"), 5);
  assert.equal(value(r, "Distance off when abeam"), 4.33);
});

test("vertical danger angle: 60 m object, 1 nm clearing distance → 1.86°", () => {
  // tan α = 60 / 1852 → α = 1.8556°
  assert.equal(value(run("danger-angle", { h: 60, d: 1 }), "Danger Angle (α)"), 1.86);
});

test("turn on a 300 m radius, 60° alteration", () => {
  // advance 300 sin 60° = 259.8, transfer 300 (1 − cos 60°) = 150, wheel-over 300 tan 30° = 173.2
  const r = run("turning-geometry", { r: 300, d: 60 });
  assert.equal(value(r, "Advance"), 260);
  assert.equal(value(r, "Transfer"), 150);
  assert.equal(value(r, "Wheel-over before the intersection"), 173);
});

test("light range 2.08(√H + √h): 45 m light, 16 m eye → 22.3 nm", () => {
  assert.equal(value(run("light-range", { H: 45, h: 16 }), "Geographical Range"), 22.3);
});

test("rhumb line uses meridional parts: 0°→10° N, 0°→10° E", () => {
  // Bowditch: MP(10°) = 7915.7045 log tan 50° − 23.0133 sin 10° − 0.0510 sin³ 10° = 599.01′
  const mp10 = 7915.7045 * Math.log10(Math.tan(rad(50))) - 23.0133 * Math.sin(rad(10)) - 0.051 * Math.sin(rad(10)) ** 3;
  const c = (Math.atan2(600, mp10) * 180) / Math.PI;
  const r = run("rhumb-line", { lat1: 0, lon1: 0, lat2: 10, lon2: 10 });
  assert.equal(value(r, "Course"), Number(c.toFixed(1)));
  assert.equal(value(r, "Rhumb Line Distance"), Number((600 / Math.cos(rad(c))).toFixed(1)));
});
