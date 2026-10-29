/**
 * Stability engine tests. GZ curves are analytic (a·sin θ, 0.5·sin 2θ) so the
 * areas, intersections and criteria have closed-form answers worked out
 * independently of the engine; table factors come from the IS Code 2008
 * tables 2.3.4-1…4 and the Grain Code A 7.
 */
import test from "node:test";
import assert from "node:assert/strict";
import {
  angleOfLoll,
  dockingGmLoss,
  dockingGmLossByKg,
  dockingUpthrust,
  gmFromInclining,
  heelFromPendulum,
  maxTrimForDocking,
  area,
  fromAftPerpendicular,
  fsmRectangular,
  grainCriteria,
  grainHeelingMoment,
  gzFromKn,
  gzWallSided,
  heelFromShift,
  isCodeGeneralCriteria,
  kgAfterWeight,
  metacentricHeight,
  rollingPeriodIsCode,
  smoothCurve,
  summariseLoading,
  suspendedWeightRise,
  tableLookup,
  TABLE_S,
  TABLE_X1,
  trimAndDrafts,
  weatherCriterion,
  type CurvePoint,
} from "./stability";

const near = (actual: number, expected: number, tol: number, what: string) =>
  assert.ok(Math.abs(actual - expected) <= tol, `${what}: expected ${expected}, got ${actual}`);

const RAD = Math.PI / 180;
const sample = (f: (deg: number) => number, step = 2.5, to = 90): CurvePoint[] =>
  Array.from({ length: Math.round(to / step) + 1 }, (_, i) => ({ angle: i * step, value: f(i * step) }));

test("loading table, GM fluid, list, trim and drafts", () => {
  const s = summariseLoading([
    { weight: 9300, vcg: 10.2, lcg: 80.0, tcg: 0 },
    { weight: 18000, vcg: 7.5, lcg: 85.0, tcg: 0.05 },
    { weight: 800, vcg: 4.0, lcg: 20.0, fsm: 700 },
    { weight: 250, vcg: 9.0, lcg: 10.0, fsm: 500 },
  ]);
  assert.equal(s.displacement, 28350);
  near(s.kg, 8.300176, 1e-6, "KG");
  near(s.lcg, 80.864198, 1e-6, "LCG");
  near(s.tcg, 0.031746, 1e-6, "TCG");
  assert.equal(s.totalFsm, 1200);
  const gm = metacentricHeight(11.0, s.kg, s.totalFsm, s.displacement);
  near(gm.fsc, 0.042328, 1e-6, "FSC");
  near(gm.gmFluid, 2.657496, 1e-6, "GM fluid");
  const t = trimAndDrafts({ displacement: s.displacement, lcg: s.lcg, lcb: 84.5, lcf: 82.0, mctc: 380, tableDraft: 9.0, lbp: 170 });
  near(t.trim, 2.7125, 1e-6, "trim by stern");
  near(t.aft, 10.308382, 1e-6, "aft draft");
  near(t.forward, 7.595882, 1e-6, "forward draft");
});

test("longitudinal conventions", () => {
  assert.equal(fromAftPerpendicular(5, "midships-forward-positive", 180), 95);
  assert.equal(fromAftPerpendicular(5, "midships-aft-positive", 180), 85);
});

test("weight changes", () => {
  // KG after loading 500 t at 12 m on 10 000 t at KG 8 m: (80 000 + 6000)/10 500
  const r = kgAfterWeight(10000, 8, 500, 12);
  near(r.kg, 86000 / 10500, 1e-12, "KG after loading");
  // Discharging is a negative weight
  near(kgAfterWeight(10000, 8, -500, 12).kg, 74000 / 9500, 1e-12, "KG after discharging");
  // Heel: GG1 = 100·10/10 000 = 0.1 m; tan θ = 0.1/1.0 → 5.7106°
  near(heelFromShift(100, 10, 10000, 1.0), Math.atan(0.1) / RAD, 1e-9, "heel");
  // Derrick: 50 t on the hook, head 25 m, cargo KG 5 m: 50·20/10 000 = 0.1 m
  near(suspendedWeightRise(50, 25, 5, 10000), 0.1, 1e-12, "rise of G");
  // FSM: 1.025·20·10³/12
  near(fsmRectangular(20, 10, 1.025), 1708.333333, 1e-6, "FSM");
});

test("angle of loll, wall-sided GZ and rolling period", () => {
  near(angleOfLoll(-0.1, 4.0), 12.604383, 1e-6, "loll");
  assert.equal(angleOfLoll(0.5, 4.0), 0);
  // At the angle of loll the wall-sided GZ is zero
  near(gzWallSided(-0.1, 4.0, angleOfLoll(-0.1, 4.0)), 0, 1e-12, "GZ at loll");
  const p = rollingPeriodIsCode(32, 12, 220, 2);
  near(p.c, 0.339733, 1e-6, "C");
  near(p.period, 15.374576, 1e-6, "T");
});

test("GZ from KN", () => {
  // KN 5.0 m at 30°, KG 8 m: 5 − 8·0.5 = 1.0 m
  near(gzFromKn(5.0, 8.0, 30), 1.0, 1e-12, "GZ");
  near(gzFromKn(5.0, 8.0, 30, 0.1), 1.0 - 0.1 * Math.cos(30 * RAD), 1e-12, "GZ with TCG");
});

test("curve interpolation reproduces table points and integrates analytic curves", () => {
  const pts = sample((a) => 0.6 * Math.sin(a * RAD));
  const f = smoothCurve(pts);
  for (const p of pts) near(f(p.angle), p.value, 1e-12, `node ${p.angle}`);
  near(area(f, 0, 30), 0.6 * (1 - Math.cos(30 * RAD)), 2e-5, "area 0-30");
});

test("IS Code 2.2 general criteria on GZ = 0.6 sin θ", () => {
  const r = isCodeGeneralCriteria(sample((a) => 0.6 * Math.sin(a * RAD)), 0.6);
  near(r.area0to30, 0.080385, 5e-5, "A30");
  near(r.area0to40, 0.140373, 5e-5, "A40");
  near(r.area30to40, 0.059989, 5e-5, "A30-40");
  near(r.maxGz.angle, 90, 0.2, "max GZ angle");
  assert.ok(r.criteria.every((c) => c.pass));
  // Downflooding at 35°: areas stop at 35°
  const d = isCodeGeneralCriteria(sample((a) => 0.6 * Math.sin(a * RAD)), 0.6, 35);
  near(d.area0to40, 0.6 * (1 - Math.cos(35 * RAD)), 5e-5, "A0-θf");
  // A low curve fails: GZ = 0.1 sin θ
  const low = isCodeGeneralCriteria(sample((a) => 0.1 * Math.sin(a * RAD)), 0.1);
  assert.equal(low.criteria.find((c) => c.id === "gz30")!.pass, false);
  assert.equal(low.criteria.find((c) => c.id === "gm0")!.pass, false);
});

test("IS Code tables", () => {
  near(tableLookup(TABLE_X1, 2.0), 1.0, 0, "X1 ≤ 2.4");
  near(tableLookup(TABLE_X1, 32 / 12), 0.953333, 1e-6, "X1 interpolated");
  near(tableLookup(TABLE_X1, 4.0), 0.8, 0, "X1 ≥ 3.5");
  near(tableLookup(TABLE_S, 15.374576), 0.046814, 1e-6, "s");
});

test("weather criterion on GZ = 0.5 sin 2θ", () => {
  // lw1 = 504·A·Z/(1000·9.81·Δ); choose A·Z so that lw1 = 0.05 m exactly
  const displacement = 40000;
  const windArea = (0.05 * 1000 * 9.81 * displacement) / (504 * 10);
  const r = weatherCriterion({
    gz: sample((a) => 0.5 * Math.sin(2 * a * RAD)),
    displacement,
    windArea,
    windLever: 10,
    breadth: 32,
    meanDraft: 12,
    lwl: 220,
    blockCoefficient: 0.8,
    kg: 10,
    gmFluid: 2,
    bilge: "round-no-keels",
  });
  near(r.lw1, 0.05, 1e-12, "lw1");
  near(r.theta0, 2.869585, 2e-3, "θ0");
  near(r.factors.r, 0.63, 1e-12, "r");
  near(r.theta1, 17.845607, 1e-5, "θ1");
  near(r.thetaA, 4.313463, 2e-3, "θ at lw2");
  assert.equal(r.theta2, 50);
  near(r.areaA, 0.05581, 3e-4, "area a");
  near(r.areaB, 0.23078, 3e-4, "area b");
  assert.ok(r.criteria.every((c) => c.pass));
});

test("grain heeling moment and Grain Code A 7 criteria", () => {
  const m = grainHeelingMoment([{ volumetricMoment: 1000, factor: 1.0 }, { volumetricMoment: 500, factor: 1.12 }], 1.25);
  near(m.volumetric, 1560, 1e-9, "Σ Mv × factor");
  near(m.tonneMetres, 1248, 1e-9, "GHM");
  const r = grainCriteria({
    gz: sample((a) => 0.5 * Math.sin(2 * a * RAD)),
    displacement: 10000,
    gmFluid: 1.0,
    volumetricMoment: 0.06 * 1.5 * 10000, // λ0 = 0.06 m
    stowageFactor: 1.5,
  });
  near(r.lambda0, 0.06, 1e-12, "λ0");
  near(r.lambda40, 0.048, 1e-12, "λ40");
  near(r.heelAngle, 3.387409, 2e-3, "heel");
  assert.equal(r.residualUpper, 40);
  near(r.residualArea, 0.17066, 3e-4, "residual area");
  assert.ok(r.criteria.every((c) => c.pass));
  // Deck edge immersion at 3° → heel limit 3° → fails
  const tight = grainCriteria({ ...{ gz: sample((a) => 0.5 * Math.sin(2 * a * RAD)), displacement: 10000, gmFluid: 1.0, volumetricMoment: 900, stowageFactor: 1.5 }, deckEdgeAngle: 3 });
  assert.equal(tight.heelLimit, 3);
  assert.equal(tight.criteria.find((c) => c.id === "heel")!.pass, false);
});

test("dry-docking upthrust, GM loss and maximum trim", () => {
  // P = 420 × 80 / 85 = 395.29 t
  const p = dockingUpthrust(420, 80, 85);
  near(p, 395.294118, 1e-6, "P");
  // KM method: 395.29 × 11 / 28 350 = 0.15338 m ; KG method: 395.29 × 8.3 / (28 350 − 395.29) = 0.117366 m
  near(dockingGmLoss(p, 11, 28350), 0.153376, 1e-6, "loss KM");
  near(dockingGmLossByKg(p, 8.3, 28350), 0.117366, 1e-6, "loss KG");
  // GM 0.5, min 0.15: Pmax = 28 350 × 0.35 / 11 = 902.05 t → trim = 902.05 × 85 / 420 = 182.6 cm
  const m = maxTrimForDocking(28350, 0.5, 11, 420, 85, 0.15);
  near(m.pMax, 902.045455, 1e-6, "Pmax");
  near(m.trimCm, 182.556818, 1e-6, "max trim");
});

test("pendulum and inclining test", () => {
  // deflection 0.15 m on a 6 m pendulum: tan θ = 0.025 → 1.4321°
  near(heelFromPendulum(0.15, 6), Math.atan(0.025) / RAD, 1e-12, "heel");
  // 10 t moved 12 m on 5 000 t, deflection 0.15 m / 6 m: GM = 120 / (5000 × 0.025) = 0.96 m
  near(gmFromInclining(10, 12, 5000, 0.15, 6), 0.96, 1e-12, "GM");
});
