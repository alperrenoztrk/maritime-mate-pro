import * as THREE from "three";

/** Ship physical parameters derived from user inputs */
export interface ShipState {
  /** KG - height of center of gravity above keel (m) */
  kg: number;
  /** Draft (m) */
  draft: number;
  /** Block coefficient Cb */
  cb: number;
  /** Ship breadth (m) */
  breadth: number;
  /** Ship length (m) */
  length: number;
  /** Ship depth (m) */
  depth: number;
}

export interface StabilityResult {
  /** KB - height of center of buoyancy above keel */
  kb: number;
  /** BM - distance from B to metacenter */
  bm: number;
  /** KM = KB + BM */
  km: number;
  /** GM = KM - KG (corrected) */
  gm: number;
  /** Displacement (tonnes) */
  displacement: number;
  /** Volume displacement (m³) */
  volumeDisplacement: number;
  /** Waterplane area (m²) */
  waterplaneArea: number;
  /** Second moment of waterplane area */
  itransverse: number;
}

/**
 * Calculate KB using Morrish's formula:
 * KB = (1/3) * (5T/2 - V/Awp)
 * More accurate than simple T/2
 */
export function calculateKB(draft: number, volumeDisplacement: number, waterplaneArea: number): number {
  if (waterplaneArea <= 0) return draft * 0.5;
  return (1 / 3) * (5 * draft / 2 - volumeDisplacement / waterplaneArea);
}

/**
 * Calculate waterplane coefficient from block coefficient
 * Empirical: Cwp ≈ 0.18 + 0.86 * Cb  (for conventional hull forms)
 */
export function estimateCwp(cb: number): number {
  return 0.18 + 0.86 * cb;
}

/**
 * Calculate BM (transverse metacentric radius)
 * BM = I_T / ∇
 * where I_T = Cwp * L * B³ / 12
 */
export function calculateBM(ship: ShipState): number {
  const cwp = estimateCwp(ship.cb);
  const it = cwp * ship.length * Math.pow(ship.breadth, 3) / 12;
  const vol = ship.length * ship.breadth * ship.draft * ship.cb;
  return vol > 0 ? it / vol : 0;
}

/**
 * Full hydrostatic calculation
 */
export function calculateStability(ship: ShipState): StabilityResult {
  const cwp = estimateCwp(ship.cb);
  const volumeDisplacement = ship.length * ship.breadth * ship.draft * ship.cb;
  const waterplaneArea = cwp * ship.length * ship.breadth;
  const itransverse = cwp * ship.length * Math.pow(ship.breadth, 3) / 12;

  const kb = calculateKB(ship.draft, volumeDisplacement, waterplaneArea);
  const bm = volumeDisplacement > 0 ? itransverse / volumeDisplacement : 0;
  const km = kb + bm;
  const gm = km - ship.kg;
  const displacement = volumeDisplacement * 1.025; // seawater density

  return { kb, bm, km, gm, displacement, volumeDisplacement, waterplaneArea, itransverse };
}

/**
 * Wall-sided formula for GZ at any angle:
 * GZ = sinφ * [GM + ½ * BM * tan²φ]
 * Valid for wall-sided vessels; more accurate than GM*sinφ at large angles
 */
export function calculateGZ(gm: number, bm: number, angleRad: number): number {
  const sinA = Math.sin(angleRad);
  const tanA = Math.tan(angleRad);
  // Wall-sided formula
  return sinA * (gm + 0.5 * bm * tanA * tanA);
}

/**
 * Generate GZ curve data points (0–90°)
 */
export function generateGZCurve(gm: number, bm: number, steps = 90): { angle: number; gz: number }[] {
  const data: { angle: number; gz: number }[] = [];
  for (let deg = 0; deg <= steps; deg++) {
    const rad = THREE.MathUtils.degToRad(deg);
    data.push({ angle: deg, gz: calculateGZ(gm, bm, rad) });
  }
  return data;
}

/**
 * Calculate deck edge immersion angle
 * φ_deck = arctan(2 * freeboard / B)
 */
export function calculateDeckImmersionAngle(breadth: number, depth: number, draft: number): number {
  const freeboard = depth - draft;
  if (freeboard <= 0) return 0;
  return THREE.MathUtils.radToDeg(Math.atan(2 * freeboard / breadth));
}

/**
 * IMO A.749 intact stability criteria check
 */
export interface IMOCompliance {
  gmOk: boolean;       // GM ≥ 0.15 m
  gzAt30Ok: boolean;   // GZ at 30° ≥ 0.20 m
  maxGzAngleOk: boolean; // angle of max GZ ≥ 25°
  areaTo30Ok: boolean; // area under GZ curve 0–30° ≥ 0.055 m·rad
  areaTo40Ok: boolean; // area under GZ curve 0–40° ≥ 0.090 m·rad
  area30to40Ok: boolean; // area 30–40° ≥ 0.030 m·rad
  overallPass: boolean;
}

export function checkIMOCriteria(gm: number, bm: number): IMOCompliance {
  const curve = generateGZCurve(gm, bm);

  const gzAt30 = calculateGZ(gm, bm, THREE.MathUtils.degToRad(30));

  // Find max GZ and its angle
  let maxGz = 0, maxGzAngle = 0;
  curve.forEach(p => {
    if (p.gz > maxGz) { maxGz = p.gz; maxGzAngle = p.angle; }
  });

  // Trapezoidal integration for area under curve (in m·rad)
  const areaTo = (endDeg: number) => {
    let area = 0;
    for (let i = 0; i < endDeg && i < curve.length - 1; i++) {
      const dRad = THREE.MathUtils.degToRad(1);
      area += (curve[i].gz + curve[i + 1].gz) / 2 * dRad;
    }
    return Math.max(0, area);
  };

  const areaTo30 = areaTo(30);
  const areaTo40 = areaTo(40);
  const area30to40 = areaTo40 - areaTo30;

  const gmOk = gm >= 0.15;
  const gzAt30Ok = gzAt30 >= 0.20;
  const maxGzAngleOk = maxGzAngle >= 25;
  const areaTo30Ok = areaTo30 >= 0.055;
  const areaTo40Ok = areaTo40 >= 0.090;
  const area30to40Ok = area30to40 >= 0.030;

  return {
    gmOk, gzAt30Ok, maxGzAngleOk, areaTo30Ok, areaTo40Ok, area30to40Ok,
    overallPass: gmOk && gzAt30Ok && maxGzAngleOk && areaTo30Ok && areaTo40Ok && area30to40Ok
  };
}

/**
 * Calculate natural rolling period using:
 * T = 2 * C * B / √GM
 * where C ≈ 0.373 + 0.023*(B/d) - 0.043*(L/100)
 * (simplified Weiss formula)
 */
export function calculateRollingPeriod(ship: ShipState, gm: number): number {
  if (gm <= 0) return Infinity;
  const c = 0.373 + 0.023 * (ship.breadth / ship.draft) - 0.043 * (ship.length / 100);
  return 2 * c * ship.breadth / Math.sqrt(gm);
}
