/**
 * Reference-oriented calculation kernels for the next phase of Tools.
 * Pure and independently testable; never substitute for vessel-approved data.
 */
function finite(value: number, name: string): number {
  if (!Number.isFinite(value)) throw new RangeError(`${name} must be a finite number.`);
  return value;
}
function positive(value: number, name: string) {
  if (finite(value, name) <= 0) throw new RangeError(`${name} must be greater than zero.`);
  return value;
}
function nonNegative(value: number, name: string) {
  if (finite(value, name) < 0) throw new RangeError(`${name} must not be negative.`);
  return value;
}
function finiteResult(value: number) {
  if (!Number.isFinite(value)) throw new RangeError("Calculated result is outside the supported range.");
  return value;
}

/** Time and distance at a constant speed over ground, no dates inferred. */
export function calculateVoyageEta(distanceNm: number, sogKn: number, etdUtcDecimalHour: number) {
  const distance = nonNegative(distanceNm, "Distance");
  const speed = positive(sogKn, "Speed over ground");
  const etd = finite(etdUtcDecimalHour, "Departure UTC decimal hour");
  if (etd < 0 || etd >= 24) throw new RangeError("Departure UTC must be between 0 and less than 24 hours.");
  const passageHours = finiteResult(distance / speed);
  const minutes = Math.round(finiteResult((etd + passageHours) * 60));
  if (!Number.isSafeInteger(minutes)) throw new RangeError("Voyage duration is too large.");
  const dayOffset = Math.floor(minutes / 1440);
  const clockMinutes = minutes % 1440;
  const hh = String(Math.floor(clockMinutes / 60)).padStart(2, "0");
  const mm = String(clockMinutes % 60).padStart(2, "0");
  return { passageHours, etaUtcClock: `${hh}:${mm}`, dayOffset };
}

/** Small-angle, transverse, freely communicating rectangular slack tank. */
export function calculateRectangularFreeSurface(
  tankLengthM: number,
  tankBreadthM: number,
  liquidDensityTonnesM3: number,
  displacementTonnes: number,
  uncorrectedGmM: number,
) {
  const L = positive(tankLengthM, "Tank length");
  const B = positive(tankBreadthM, "Tank breadth");
  const rho = positive(liquidDensityTonnesM3, "Tank liquid density");
  const delta = positive(displacementTonnes, "Ship displacement");
  const gm = finite(uncorrectedGmM, "Uncorrected GM");
  const transverseSecondMomentM4 = finiteResult(L * B ** 3 / 12);
  const freeSurfaceMomentTonneMetres = finiteResult(rho * transverseSecondMomentM4);
  const freeSurfaceCorrectionM = finiteResult(freeSurfaceMomentTonneMetres / delta);
  return {
    transverseSecondMomentM4,
    freeSurfaceMomentTonneMetres,
    freeSurfaceCorrectionM,
    correctedGmM: finiteResult(gm - freeSurfaceCorrectionM),
  };
}

/** TPC estimated from waterplane area at a specified draft and local water density. */
export function calculateTpcFromWaterplaneArea(waterplaneAreaM2: number, waterDensityTonnesM3: number) {
  const a = positive(waterplaneAreaM2, "Waterplane area");
  const rho = positive(waterDensityTonnesM3, "Water density");
  return { tonnesPerCm: finiteResult(a * rho / 100) };
}

/** Engine mass consumption from average actual delivered power and representative SFOC. */
export function calculateEngineFuelConsumption(
  deliveredPowerKw: number, sfocGramsKwh: number, runningHours: number,
) {
  const power = nonNegative(deliveredPowerKw, "Delivered power");
  const sfoc = positive(sfocGramsKwh, "SFOC");
  const hours = nonNegative(runningHours, "Running hours");
  const tonnes = finiteResult(power * sfoc * hours / 1_000_000);
  return { tonnes, kilograms: finiteResult(tonnes * 1000), hourlyKg: finiteResult(power * sfoc / 1000) };
}

/** Fuel reserve must be excluded before calculating available endurance. */
export function calculateFuelEndurance(
  fuelRobTonnes: number, reserveTonnes: number, consumptionTonnesDay: number,
) {
  const rob = nonNegative(fuelRobTonnes, "Fuel remaining on board");
  const reserve = nonNegative(reserveTonnes, "Fuel reserve");
  const daily = positive(consumptionTonnesDay, "Daily consumption");
  if (reserve > rob) throw new RangeError("Reserve cannot exceed fuel remaining on board.");
  const availableTonnes = rob - reserve;
  const days = finiteResult(availableTonnes / daily);
  return { availableTonnes, days, hours: finiteResult(days * 24) };
}
