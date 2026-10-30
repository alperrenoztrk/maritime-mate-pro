/**
 * Small training estimators for the Tools section.
 * These are not substitutes for vessel-specific hydrostatic/sounding tables.
 */
function positive(value: number, name: string): number {
  if (!Number.isFinite(value) || value <= 0) {
    throw new RangeError(`${name} must be a finite number greater than zero.`);
  }
  return value;
}
function nonNegative(value: number, name: string): number {
  if (!Number.isFinite(value) || value < 0) {
    throw new RangeError(`${name} must be a finite non-negative number.`);
  }
  return value;
}

export function estimateRectangularTank(
  areaM2: number, heightM: number, densityKgM3: number,
) {
  const area = positive(areaM2, "Tank area");
  const height = nonNegative(heightM, "Liquid height");
  const density = positive(densityKgM3, "Liquid density");
  const volumeM3 = area * height;
  const massTonnes = volumeM3 * density / 1000;
  // Assumes a constant cross-section and homogeneous liquid, datum at tank bottom.
  const verticalMomentTonneMetres = massTonnes * height / 2;
  return { volumeM3, massTonnes, verticalMomentTonneMetres };
}

export function correctReferenceDisplacement(
  displacementAtReferenceDensityTonnes: number,
  actualDensityTonnesM3: number,
  referenceDensityTonnesM3: number,
) {
  const referenceDisplacement = nonNegative(displacementAtReferenceDensityTonnes, "Reference displacement");
  const actual = positive(actualDensityTonnesM3, "Observed water density");
  const reference = positive(referenceDensityTonnesM3, "Reference water density");
  const correctedDisplacementTonnes = referenceDisplacement * actual / reference;
  return {
    correctionTonnes: correctedDisplacementTonnes - referenceDisplacement,
    correctedDisplacementTonnes,
  };
}

export interface DraftReadings { forward: number; midship: number; aft: number }

function approximateMeanDraft(drafts: DraftReadings): number {
  return (
    nonNegative(drafts.forward, "Forward draft") +
    4 * nonNegative(drafts.midship, "Midship draft") +
    nonNegative(drafts.aft, "Aft draft")
  ) / 6;
}

export function estimateDisplacementChange(
  before: DraftReadings, after: DraftReadings, tpcTonnesPerCm: number,
) {
  const tpc = positive(tpcTonnesPerCm, "TPC");
  const beforeMeanM = approximateMeanDraft(before);
  const afterMeanM = approximateMeanDraft(after);
  const draftChangeM = afterMeanM - beforeMeanM;
  return {
    beforeMeanM, afterMeanM, draftChangeM,
    displacementChangeTonnes: draftChangeM * 100 * tpc,
  };
}
