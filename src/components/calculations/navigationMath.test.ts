import { test } from "node:test";
import assert from "node:assert/strict";
import { calculateSightReduction, computeSunAlmanac, computeSunInterceptSight } from "./navigationMath";

const rad = (deg: number) => (deg * Math.PI) / 180;
const deg = (r: number) => (r * 180) / Math.PI;
const norm = (x: number) => ((x % 360) + 360) % 360;
const angleDiff = (a: number, b: number) => Math.abs(((a - b + 540) % 360) - 180);

// Independent true azimuth: Zn = atan2(−cosδ·sinLHA, cosφ·sinδ − sinφ·cosδ·cosLHA)
const referenceZn = (latDeg: number, decDeg: number, lhaDeg: number) =>
  norm(
    deg(
      Math.atan2(
        -Math.cos(rad(decDeg)) * Math.sin(rad(lhaDeg)),
        Math.cos(rad(latDeg)) * Math.sin(rad(decDeg)) - Math.sin(rad(latDeg)) * Math.cos(rad(decDeg)) * Math.cos(rad(lhaDeg)),
      ),
    ),
  );

test("sight reduction: body west of the meridian gives Zn = 360° − Z", () => {
  const r = calculateSightReduction({ latDeg: 36, decDeg: 0, lhaDeg: 39 });
  assert.ok(Math.abs(r.hcDeg - 38.95) < 0.05, `Hc ${r.hcDeg}`);
  assert.ok(Math.abs(r.azimuthDeg - 234.0) < 0.1, `Zn ${r.azimuthDeg}`);
});

test("sight reduction: body east of the meridian gives Zn = Z (lat 36° N, dec 12° S, LHA 300° → Zn 118°)", () => {
  const r = calculateSightReduction({ latDeg: 36, decDeg: -12, lhaDeg: 300 });
  assert.ok(Math.abs(r.hcDeg - 15.87) < 0.05, `Hc ${r.hcDeg}`);
  assert.ok(Math.abs(r.azimuthDeg - 118.3) < 0.1, `Zn ${r.azimuthDeg}`);
});

test("sight reduction: meridian passage bears 180° in north latitude and 000° in south latitude", () => {
  assert.ok(angleDiff(calculateSightReduction({ latDeg: 36, decDeg: 0, lhaDeg: 0 }).azimuthDeg, 180) < 0.01);
  assert.ok(angleDiff(calculateSightReduction({ latDeg: -20, decDeg: 10, lhaDeg: 0 }).azimuthDeg, 0) < 0.01);
});

test("sight reduction: Zn matches the atan2 reference in both hemispheres", () => {
  for (const latDeg of [-50, -20, 10, 36, 60]) {
    for (const decDeg of [-23, -5, 0, 12, 23]) {
      for (let lhaDeg = 5; lhaDeg < 360; lhaDeg += 25) {
        const r = calculateSightReduction({ latDeg, decDeg, lhaDeg });
        const expected = referenceZn(latDeg, decDeg, lhaDeg);
        assert.ok(angleDiff(r.azimuthDeg, expected) < 0.01, `φ ${latDeg} δ ${decDeg} LHA ${lhaDeg}: Zn ${r.azimuthDeg} ≠ ${expected}`);
      }
    }
  }
});

test("intercept sight: LHA = GHA + east longitude − west longitude", () => {
  const dateUtc = new Date("2025-06-21T12:00:00Z");
  const { ghaSunDeg } = computeSunAlmanac(dateUtc);
  const east = computeSunInterceptSight({ assumedPosition: { latDeg: 36, lonDeg: 29 }, dateUtc, hoDeg: 60, body: "sun" });
  const west = computeSunInterceptSight({ assumedPosition: { latDeg: 36, lonDeg: -45 }, dateUtc, hoDeg: 60, body: "sun" });
  assert.ok(angleDiff(east.lhaDeg, norm(ghaSunDeg + 29)) < 1e-9, `east LHA ${east.lhaDeg}`);
  assert.ok(angleDiff(west.lhaDeg, norm(ghaSunDeg - 45)) < 1e-9, `west LHA ${west.lhaDeg}`);
});

test("intercept sight: afternoon Sun at 029° E bears west of south", () => {
  // 12:00 UTC is about 14:00 local mean time at 029° E, so the Sun is past the meridian.
  const r = computeSunInterceptSight({
    assumedPosition: { latDeg: 36, lonDeg: 29 },
    dateUtc: new Date("2025-06-21T12:00:00Z"),
    hoDeg: 60,
    body: "sun",
  });
  assert.ok(r.lhaDeg > 20 && r.lhaDeg < 40, `LHA ${r.lhaDeg}`);
  assert.ok(r.znDeg > 180 && r.znDeg < 270, `Zn ${r.znDeg}`);
  assert.ok(angleDiff(r.znDeg, referenceZn(36, r.decDeg, r.lhaDeg)) < 0.01);
});
