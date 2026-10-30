import { test } from "node:test";
import assert from "node:assert/strict";
import {
  assessColregSituation,
  beaufortForKnots,
  calculateAmplitude,
  calculateDeadReckoning,
  calculateDistance,
  calculateGreatCircle,
  calculateHeightOfTideAtTime,
  calculateMiddleLatitudeSailing,
  calculateRhumbLine,
  calculateSightReduction,
  calculateTidalStream,
  calculateTide,
  calculateTurning,
  calculateTwoBearingsOnBow,
  computeArpaCpaTcpa,
  computeSunAlmanac,
  computeSunInterceptSight,
  correctSextantAltitude,
  expandingSquareSearch,
  latitudeByMeridianAltitude,
  meridionalParts,
  parallelSweepSearch,
  planeSailingFromCourse,
  ruleOfTwelfthsTable,
  sectorSearch,
  solveCurrentTriangle,
} from "./navigationMath";

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

test("2025 almanac: Sun GHA and Dec are referred to the equinox of date (not J2000)", () => {
  // Reference values: JPL DE421, apparent place, true equator and equinox of date.
  const cases = [
    { iso: "2025-01-01T00:00:00Z", gha: 179 + 8.4 / 60, dec: -(22 + 59.9 / 60) },
    { iso: "2025-03-20T12:00:00Z", gha: 358 + 9.6 / 60, dec: 2.9 / 60 },
    { iso: "2025-06-21T12:00:00Z", gha: 359 + 32.1 / 60, dec: 23 + 26.3 / 60 },
  ];
  for (const c of cases) {
    const a = computeSunAlmanac(new Date(c.iso));
    assert.ok(angleDiff(a.ghaSunDeg, c.gha) * 60 < 0.5, `${c.iso} GHA ${a.ghaSunDeg}`);
    assert.ok(Math.abs(a.decSunDeg - c.dec) * 60 < 0.5, `${c.iso} Dec ${a.decSunDeg}`);
  }
});

// Expected values below are worked by hand from the source formula (Bowditch, Nautical Almanac,
// Admiralty Manual of Navigation, IAMSAR Vol. III, COLREG, Met Office Beaufort table).
const near = (actual: number, expected: number, tol: number, label = "") =>
  assert.ok(Math.abs(actual - expected) <= tol, `${label} ${actual} ≠ ${expected} (±${tol})`);

test("turning: advance R·sinΔ and transfer R(1 − cosΔ) on the full angle", () => {
  const r90 = calculateTurning({ shipLengthM: 0, courseChangeDeg: 90, speedKn: 12, tacticalDiameterM: 350 });
  near(r90.advanceM, 175, 1e-9, "advance 90°");
  near(r90.transferM, 175, 1e-9, "transfer 90°");
  near(r90.wheelOverDistanceM, 175, 1e-9, "wheel-over 90°");
  const r60 = calculateTurning({ shipLengthM: 0, courseChangeDeg: 60, speedKn: 12, tacticalDiameterM: 350 });
  near(r60.advanceM, 151.554, 0.001, "advance 60°");
  near(r60.transferM, 87.5, 1e-9, "transfer 60°");
  near(r60.wheelOverDistanceM, 101.036, 0.001, "wheel-over 60°");
  // ROT = V/R rad/s: 12 kn = 6.17333 m/s, /175 m = 0.0352762 rad/s = 121.27 °/min
  near(r60.rotDegPerMin, 121.27, 0.01, "ROT");
  const est = calculateTurning({ shipLengthM: 100, courseChangeDeg: 90, speedKn: 10 });
  assert.equal(est.tacticalDiameterEstimated, true);
  near(est.tacticalDiameterM, 350, 1e-9);
});

// Independent direct (forward) problem on the sphere.
const destination = (latDeg: number, lonDeg: number, courseDeg: number, distNm: number) => {
  const d = distNm / 3440.065;
  const p1 = rad(latDeg);
  const c = rad(courseDeg);
  const p2 = Math.asin(Math.sin(p1) * Math.cos(d) + Math.cos(p1) * Math.sin(d) * Math.cos(c));
  const l2 = rad(lonDeg) + Math.atan2(Math.sin(c) * Math.sin(d) * Math.cos(p1), Math.cos(d) - Math.sin(p1) * Math.sin(p2));
  return { lat: deg(p2), lon: deg(l2) };
};

test("great circle: final course is the course on arrival", () => {
  const r = calculateGreatCircle(0, 0, 0, 90);
  near(r.initialCourse, 90, 1e-9, "initial");
  near(r.finalCourse, 90, 1e-9, "final");
  near(r.distance, 3440.065 * Math.PI / 2, 1e-6, "distance");
});

test("great circle: vertex cos φv = cos φ₁·sin C, d.long tan = 1/(sin φ₁·tan C)", () => {
  // φ₁ 40° N, C 060°: φv = 48.4392° N, d.long to the vertex = 41.930° E
  const east = destination(40, 0, 60, 4000);
  const r = calculateGreatCircle(40, 0, east.lat, east.lon);
  near(r.initialCourse, 60, 1e-6, "C");
  assert.ok(r.vertex, "vertex");
  near(r.vertex!.latDeg, 48.4392, 0.0001, "vertex lat");
  near(r.vertex!.lonDeg, 41.9301, 0.0001, "vertex lon");
  assert.equal(r.vertex!.onRoute, true);
  // Westbound with a northerly course (300°) has its vertex to the north-west.
  const west = destination(40, 0, 300, 4000);
  const w = calculateGreatCircle(40, 0, west.lat, west.lon);
  near(w.vertex!.latDeg, 48.4392, 0.0001, "west vertex lat");
  near(w.vertex!.lonDeg, -41.9301, 0.0001, "west vertex lon");
  // Southerly course: the southern vertex lies ahead.
  const south = destination(-10, 20, 120, 5000);
  const s = calculateGreatCircle(-10, 20, south.lat, south.lon);
  near(s.vertex!.latDeg, -deg(Math.acos(Math.cos(rad(10)) * Math.sin(rad(120)))), 0.0005, "south vertex lat");
});

test("Mercator sailing: WGS 84 meridional parts and course/distance", () => {
  // Bowditch series: MP = 7915.7045 log tan(45° + φ/2) − 23.0133 sin φ − 0.0510 sin³ φ
  const series = (p: number) => 7915.7045 * Math.log10(Math.tan(rad(45 + p / 2))) - 23.0133 * Math.sin(rad(p)) - 0.051 * Math.sin(rad(p)) ** 3;
  for (const p of [10, 30, 45, 60]) near(meridionalParts(p), series(p), 0.05, `MP ${p}`);
  near(meridionalParts(45), 3013.65, 0.05, "MP 45");
  const r = calculateRhumbLine(0, 0, 10, 10);
  const c = deg(Math.atan2(600, series(10)));
  near(r.course, c, 0.01, "course");
  near(r.distance, 600 / Math.cos(rad(c)), 0.1, "distance");
  // East–west across the 180th meridian: d.long +2°, distance = 120·cos 0°
  const ew = calculateRhumbLine(0, 179, 0, -179);
  near(ew.course, 90, 1e-9, "EW course");
  near(ew.distance, 120, 1e-9, "EW distance");
});

test("mid-latitude sailing and DR wrap across the 180th meridian", () => {
  const m = calculateMiddleLatitudeSailing({ lat1Deg: 0, lon1Deg: 179, lat2Deg: 0, lon2Deg: -179 });
  near(m.courseDeg, 90, 1e-9);
  near(m.distanceNm, 120, 1e-9);
  const dr = calculateDeadReckoning({ start: { latDeg: 0, lonDeg: 179.5 }, courseTrueDeg: 90, distanceNm: 60 });
  near(dr.lonDeg, -179.5, 1e-9);
  const ps = planeSailingFromCourse(30, 10);
  near(ps.dLatMin, 8.660, 0.001);
  near(ps.depMin, 5, 1e-9);
});

test("ranges: horizon 2.08√h, radar 2.23√h, light 2.08(√H + √h)", () => {
  near(calculateDistance({ type: "horizon", heightM: 16 }).distanceNm, 8.32, 1e-9);
  near(calculateDistance({ type: "radar", heightM: 25 }).distanceNm, 11.15, 1e-9);
  near(calculateDistance({ type: "light", heightM: 9, lightHeightM: 16 }).distanceNm, 14.56, 1e-9);
});

test("current triangle: TR 090°, set 180° 2 kn, 12 kn → CTS 080.4°, SOG 11.83 kn", () => {
  const r = solveCurrentTriangle({ courseDeg: 90, speedKn: 12, setDeg: 180, driftKn: 2 });
  near(r.courseToSteerDeg, 90 - deg(Math.asin(2 / 12)), 1e-9, "CTS");
  near(r.groundSpeedKn, Math.sqrt(140), 1e-9, "SOG");
  near(r.madeGoodCourseDeg, 90, 1e-9, "CMG");
  near(r.correctionDeg, -9.594, 0.001, "correction");
  assert.equal(r.feasible, true);
  // Wind on the port side pushes 3° to starboard: steer 3° further to port.
  near(solveCurrentTriangle({ courseDeg: 90, speedKn: 12, setDeg: 180, driftKn: 2, leewayDeg: 3 }).courseToSteerDeg, 77.406, 0.001);
  assert.equal(solveCurrentTriangle({ courseDeg: 0, speedKn: 3, setDeg: 90, driftKn: 4 }).feasible, false);
});

test("CPA/TCPA: crossing target meets at the origin; opening target has negative TCPA", () => {
  const r = computeArpaCpaTcpa({ targetBearingDeg: 45, targetDistanceNm: 10, targetCourseDeg: 270, targetSpeedKn: 10, ownCourseDeg: 0, ownSpeedKn: 10 });
  near(r.tcpaMin, 60 * Math.SQRT1_2, 1e-9, "TCPA");
  near(r.cpaNm, 0, 1e-9, "CPA");
  assert.equal(r.opening, false);
  const o = computeArpaCpaTcpa({ targetBearingDeg: 180, targetDistanceNm: 2, targetCourseDeg: 180, targetSpeedKn: 15, ownCourseDeg: 0, ownSpeedKn: 10 });
  near(o.tcpaMin, -4.8, 1e-9, "opening TCPA");
  assert.equal(o.opening, true);
});

test("two bearings on the bow: doubling the angle and the special pairs", () => {
  const d = calculateTwoBearingsOnBow(30, 60, 5);
  near(d.distanceAtSecondBearingNm, 5, 1e-9);
  near(d.distanceAbeamNm, 4.330, 0.001);
  const fp = calculateTwoBearingsOnBow(45, 90, 4);
  near(fp.distanceAbeamNm, 4, 1e-9);
  const s = calculateTwoBearingsOnBow(22.5, 45, 3);
  near(s.distanceAtSecondBearingNm, 3, 1e-9);
  near(s.distanceAbeamNm, 2.121, 0.001);
});

test("rule of twelfths: fractional hours and height at a time", () => {
  near(calculateTide({ hour: 1.5, tidalRangeM: 6 }).heightM, 1, 1e-9);
  near(calculateTide({ hour: 3, tidalRangeM: 6, phase: "falling" }).heightM, 3, 1e-9);
  const lw = new Date("2026-01-01T00:00:00Z");
  const hw = new Date("2026-01-01T06:00:00Z");
  near(calculateHeightOfTideAtTime({ lowWaterTimeUtc: lw, lowWaterHeightM: 1, highWaterTimeUtc: hw, highWaterHeightM: 5.5, queryTimeUtc: new Date("2026-01-01T03:00:00Z") }).heightM, 3.25, 1e-9);
  const lw2 = new Date("2026-01-01T12:00:00Z");
  const f = calculateHeightOfTideAtTime({ lowWaterTimeUtc: lw2, lowWaterHeightM: 1, highWaterTimeUtc: hw, highWaterHeightM: 5.5, queryTimeUtc: new Date("2026-01-01T07:00:00Z") });
  near(f.heightM, 5.125, 1e-9, "falling");
  assert.equal(f.stage, "falling");
  assert.throws(() => calculateHeightOfTideAtTime({ lowWaterTimeUtc: lw, lowWaterHeightM: 1, highWaterTimeUtc: hw, highWaterHeightM: 5.5, queryTimeUtc: new Date("2026-01-01T08:00:00Z") }));
  const table = ruleOfTwelfthsTable(lw, 1, hw, 5.5);
  assert.equal(table.length, 7);
  near(table[3].heightM, 3.25, 1e-9);
  near(table[6].heightM, 5.5, 1e-9);
  assert.equal(table[6].timeUtc.getTime(), hw.getTime());
});

test("tidal stream: interpolation between neap and spring rates by the range", () => {
  const r = calculateTidalStream({ springRateKn: 2.4, neapRateKn: 1.2, springRangeM: 4.8, neapRangeM: 2.2, rangeM: 3.5 });
  near(r.rateKn, 1.8, 1e-9);
  assert.equal(r.extrapolated, false);
  assert.equal(calculateTidalStream({ springRateKn: 2.4, neapRateKn: 1.2, springRangeM: 4.8, neapRangeM: 2.2, rangeM: 5.5 }).extrapolated, true);
});

test("sextant: dip 1.76√h, Bennett refraction matches the Nautical Almanac table", () => {
  // Almanac mean refraction: 10° → 5.3′, 30° → 1.7′, 45° → 1.0′
  const at = (hs: number) => correctSextantAltitude({ hsDeg: hs }).refractionMin;
  near(at(10), 5.3, 0.15, "R 10°");
  near(at(30), 1.7, 0.05, "R 30°");
  near(at(45), 1.0, 0.05, "R 45°");
  const r = correctSextantAltitude({ hsDeg: 30, indexErrorMin: 2, heightOfEyeM: 16, limb: "lower", semiDiameterMin: 16, horizontalParallaxMin: 0.15 });
  near(r.dipMin, 7.04, 1e-9, "dip");
  const ha = 30 - 2 / 60 - 7.04 / 60;
  near(r.haDeg, ha, 1e-9, "Ha");
  const R = 1 / Math.tan(rad(ha + 7.31 / (ha + 4.4)));
  near(r.hoDeg, ha + (-R + 16 + 0.15 * Math.cos(rad(ha))) / 60, 1e-9, "Ho");
  near(r.hoDeg, 30.0894, 0.0002, "Ho value");
});

test("amplitude: south declination rising bears 090° + A", () => {
  const r = calculateAmplitude({ latDeg: 40, decDeg: -20, riseOrSet: "rising", compassBearingDeg: 118 });
  near(r.amplitudeDeg, 26.52, 0.01);
  near(r.azimuthDeg, 116.52, 0.01);
  assert.equal(r.amplitudeName, "E 26.5° S");
  near(r.compassErrorDeg!, -1.48, 0.01, "error (W)");
  near(calculateAmplitude({ latDeg: 40, decDeg: 20, riseOrSet: "setting" }).azimuthDeg, 296.52, 0.01);
  near(calculateAmplitude({ latDeg: -30, decDeg: 10, riseOrSet: "rising" }).azimuthDeg, 90 - deg(Math.asin(Math.sin(rad(10)) / Math.cos(rad(30)))), 1e-9);
});

test("latitude by meridian altitude: φ = ZD ± δ", () => {
  near(latitudeByMeridianAltitude(50, 10, "S"), 50, 1e-9);
  near(latitudeByMeridianAltitude(60, 20, "N"), -10, 1e-9);
});

test("Beaufort force from the Met Office limits", () => {
  assert.equal(beaufortForKnots(0.4).force, 0);
  assert.equal(beaufortForKnots(25).force, 6);
  assert.equal(beaufortForKnots(33.4).force, 7);
  assert.equal(beaufortForKnots(33.6).force, 8);
  assert.equal(beaufortForKnots(70).force, 12);
  assert.equal(beaufortForKnots(25).probableWaveM, 3);
});

test("IAMSAR search patterns: expanding square, sector, parallel sweep", () => {
  const ss = expandingSquareSearch(1, 5, 10);
  assert.deepEqual(ss.legsNm, [1, 1, 2, 2, 3]);
  near(ss.totalTrackNm, 9, 1e-9);
  const vs = sectorSearch(2, 10);
  near(vs.totalTrackNm, 18, 1e-9);
  near(vs.legsNm.reduce((a, b) => a + b, 0), 18, 1e-9);
  near(vs.timeHours, 1.8, 1e-9);
  const ps = parallelSweepSearch(10, 6, 2, 10);
  assert.equal(ps.legCount, 3);
  near(ps.totalTrackNm, 34, 1e-9);
});

test("COLREG: overtaking from astern is not head-on", () => {
  assert.equal(assessColregSituation({ ownCourseDeg: 0, targetRelativeBearingDeg: 0, targetCourseDeg: 0 }).situation, "overtaking");
  assert.equal(assessColregSituation({ ownCourseDeg: 0, targetRelativeBearingDeg: 2, targetCourseDeg: 180 }).situation, "head-on");
  const c = assessColregSituation({ ownCourseDeg: 0, targetRelativeBearingDeg: 45, targetCourseDeg: 270 });
  assert.equal(c.situation, "crossing-starboard");
  assert.equal(c.role, "give-way");
  assert.equal(assessColregSituation({ ownCourseDeg: 0, targetRelativeBearingDeg: 315, targetCourseDeg: 90 }).role, "stand-on");
  assert.equal(assessColregSituation({ ownCourseDeg: 0, targetRelativeBearingDeg: 180, targetCourseDeg: 0 }).situation, "being-overtaken");
});
