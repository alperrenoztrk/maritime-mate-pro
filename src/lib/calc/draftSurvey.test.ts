/**
 * Draft survey engine tests. Expected values are worked by hand from the UNECE
 * 1992 draught survey procedure (independent arithmetic, not taken from the
 * engine), rounded where noted.
 */
import test from "node:test";
import assert from "node:assert/strict";
import {
  cargoBetweenSurveys,
  computeDraftSurvey,
  densitySinkageCm,
  displacementInDensity,
  correctToPerpendiculars,
  firstTrimCorrection,
  interpolateHydrostatics,
  lcfAftOfMidships,
  meanOfMeans,
  secondTrimCorrection,
  shipsConstant,
  type DraftSurveyShip,
  type DraftSurveyStageInput,
} from "./draftSurvey";

const near = (actual: number, expected: number, tol: number, what: string) =>
  assert.ok(Math.abs(actual - expected) <= tol, `${what}: expected ${expected}, got ${actual}`);

const ship: DraftSurveyShip = {
  lbp: 180,
  forwardMarkAftOfFP: 2.0,
  aftMarkForwardOfAP: 6.0,
  midMarkAftOfMidships: 0.5,
  tableDensity: 1.025,
};

const stage: DraftSurveyStageInput = {
  readings: {
    forward: { port: 7.0, starboard: 7.02 },
    midship: { port: 7.52, starboard: 7.48 },
    aft: { port: 8.04, starboard: 7.96 },
  },
  dockDensity: 1.018,
  hydrostatics: [
    { draft: 7.5, displacement: 30000, tpc: 40.0, lcf: 2.0 },
    { draft: 7.6, displacement: 30400, tpc: 40.2, lcf: 1.9 },
  ],
  mtcPlus50: 420,
  mtcMinus50: 405,
  deductibles: { ballast: 1200, freshWater: 250, fuelOil: 800, dieselOil: 60, lubOil: 15, bilges: 5, other: 10 },
};

test("mark readings are corrected to the perpendiculars over the length between marks", () => {
  // LBM = 180 − 2 − 6 = 172; observed trim = 8.00 − 7.01 = 0.99 m by the stern.
  // F = 7.01 − 0.99×2/172, A = 8.00 + 0.99×6/172, M = 7.50 − 0.99×0.5/172
  const r = correctToPerpendiculars(ship, stage.readings);
  assert.equal(r.lengthBetweenMarks, 172);
  near(r.observed.trim, 0.99, 1e-12, "observed trim");
  near(r.corrected.forward, 6.998488, 1e-6, "forward");
  near(r.corrected.aft, 8.034535, 1e-6, "aft");
  near(r.corrected.midship, 7.497122, 1e-6, "midship");
});

test("mean of means is the quarter mean (F + A + 6M)/8", () => {
  assert.equal(meanOfMeans(6.0, 7.0, 8.0), 7.0);
  near(meanOfMeans(6.998488, 7.497122, 8.034535), 7.501969, 1e-6, "MMM");
});

test("trim corrections", () => {
  // FTC = 1.0 m × 2.0 m × 40 t/cm × 100 / 200 m = 40 t; by the head it is subtracted.
  assert.equal(firstTrimCorrection(1.0, 2.0, 40, 200), 40);
  assert.equal(firstTrimCorrection(-1.0, 2.0, 40, 200), -40);
  // STC = 50 × 2² × (420 − 400) / 200 = 20 t, positive for either trim sign.
  assert.equal(secondTrimCorrection(2, 420, 400, 200), 20);
  assert.equal(secondTrimCorrection(-2, 420, 400, 200), 20);
});

test("hydrostatic interpolation and LCF conventions", () => {
  const h = interpolateHydrostatics(stage.hydrostatics, 7.55);
  near(h.displacement, 30200, 1e-9, "displacement");
  near(h.tpc, 40.1, 1e-9, "tpc");
  assert.equal(h.extrapolated, false);
  assert.equal(interpolateHydrostatics(stage.hydrostatics, 7.7).extrapolated, true);
  assert.equal(lcfAftOfMidships(3, "midships-forward-positive", 180), -3);
  assert.equal(lcfAftOfMidships(88, "from-aft-perpendicular", 180), 2);
});

test("full stage computation", () => {
  const r = computeDraftSurvey(ship, stage);
  near(r.trim, 1.036047, 1e-6, "trim");
  near(r.deflection, -0.019390, 1e-6, "hog (−)");
  near(r.hydrostatics.displacement, 30007.878, 1e-3, "table displacement");
  near(r.firstTrimCorrection, 46.006, 1e-3, "FTC");
  near(r.secondTrimCorrection, 4.472, 1e-3, "STC");
  near(r.displacementCorrectedForTrim, 30058.356, 1e-3, "Δ trim corrected");
  near(r.displacementInDockWater, 29853.079, 1e-3, "Δ in dock water");
  assert.equal(r.totalDeductibles, 2340);
  near(r.netDisplacement, 27513.079, 1e-3, "net displacement");
});

test("keel correction lowers the draft used for the tables", () => {
  const r = computeDraftSurvey({ ...ship, keelCorrection: 0.02 }, stage);
  near(r.tableDraft, r.meanOfMeans - 0.02, 1e-12, "table draft");
});

test("cargo and constant", () => {
  assert.equal(cargoBetweenSurveys(12000, 47000), 35000);
  assert.equal(cargoBetweenSurveys(47000, 12000), 35000);
  assert.equal(shipsConstant(12350, 12000), 350);
});

test("rejects impossible geometry", () => {
  assert.throws(() => computeDraftSurvey({ ...ship, forwardMarkAftOfFP: 100, aftMarkForwardOfAP: 90 }, stage));
});

test("density correction and sinkage between densities", () => {
  near(displacementInDensity(20500, 1.025, 1.0), 20000, 1e-9, "Δ in fresh water");
  // FWA identity: Δ/(40·TPC) = 20000/(40·25) = 20 cm
  near(densitySinkageCm(20000, 25, 1.025, 1.0), 20, 1e-9, "FWA");
  // Back into sea water the ship rises: negative
  assert.ok(densitySinkageCm(20000, 25, 1.0, 1.025) < 0);
});
