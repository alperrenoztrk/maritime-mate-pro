import assert from "node:assert/strict";
import test from "node:test";
import {
  correctReferenceDisplacement, estimateDisplacementChange, estimateRectangularTank, estimateBunkerMass,
} from "./toolCalculations";

test("rectangular tank: volume, mass and mass-based vertical moment", () => {
  const result = estimateRectangularTank(50, 2.5, 1025);
  assert.equal(result.volumeM3, 125);
  assert.equal(result.massTonnes, 128.125);
  assert.equal(result.verticalMomentTonneMetres, 160.15625);
});
test("empty rectangular tank has zero quantities", () => {
  assert.deepEqual(estimateRectangularTank(50, 0, 1025),
    { volumeM3: 0, massTonnes: 0, verticalMomentTonneMetres: 0 });
});
test("tank inputs must be physically valid", () => {
  assert.throws(() => estimateRectangularTank(-1, 2, 1025));
  assert.throws(() => estimateRectangularTank(1, 2, 0));
  assert.throws(() => estimateRectangularTank(1, Number.NaN, 1025));
});
test("reference hydrostatic displacement is corrected using actual density", () => {
  const result = correctReferenceDisplacement(10000, 1, 1.025);
  assert.ok(Math.abs(result.correctedDisplacementTonnes - 9756.09756097561) < 1e-8);
  assert.ok(result.correctionTonnes < 0);
  assert.deepEqual(correctReferenceDisplacement(10000, 1.025, 1.025),
    { correctionTonnes: 0, correctedDisplacementTonnes: 10000 });
  assert.throws(() => correctReferenceDisplacement(1000, 1.025, 0));
});
test("draft based displacement changes retain correct sign", () => {
  const before = { forward: 5, midship: 5, aft: 5 };
  const after = { forward: 5.1, midship: 5.1, aft: 5.1 };
  const result = estimateDisplacementChange(before, after, 20);
  assert.ok(Math.abs(result.displacementChangeTonnes - 200) < 1e-8);
  assert.ok(Math.abs(estimateDisplacementChange(after, before, 20).displacementChangeTonnes + 200) < 1e-8);
  assert.throws(() => estimateDisplacementChange(before, after, -20));
});

test("bunker quantity uses tabulated VCF rather than an assumed temperature coefficient", () => {
  const result = estimateBunkerMass(100, 0.99, 0.95);
  assert.ok(Math.abs(result.standardVolumeM3 - 99) < 1e-9);
  assert.ok(Math.abs(result.massTonnes - 94.05) < 1e-9);
  assert.throws(() => estimateBunkerMass(100, 0, 0.95));
});
