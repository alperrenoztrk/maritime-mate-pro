// Core navigation calculation utilities extracted from assistant components.
// Keep these functions pure and UI-agnostic so multiple UIs can reuse them.

import { getSunAriesAlmanac2025Utc } from "@/utils/nauticalAlmanac2025";

export type CurrentTriangleInput = {
  courseDeg: number; // Intended track (course over ground) to make good (degrees true)
  speedKn: number;   // Ship speed through water (knots)
  setDeg: number;    // Direction towards which the current flows (degrees true)
  driftKn: number;   // Current rate (knots)
  leewayDeg?: number; // Leeway angle, + when the wind pushes the ship to starboard (wind on the port side)
};

export type CurrentTriangleResult = {
  courseToSteerDeg: number; // Heading to steer (water track corrected for leeway)
  waterTrackDeg: number;    // Course through the water needed to make good the track
  madeGoodCourseDeg: number; // Course made good over ground
  groundSpeedKn: number;    // Speed made good along the intended track
  correctionDeg: number;    // Heading − track, −180…+180 (+ = heading to starboard of the track)
  feasible: boolean;        // False when the current is too strong to hold the track
};

export type ARPAInput = {
  targetBearingDeg: number; // True bearing of the target from own ship (deg)
  targetDistanceNm: number; // Range to target (nm)
  targetCourseDeg: number;  // Target true course (deg)
  targetSpeedKn: number;    // Target speed (kn)
  ownCourseDeg?: number;    // Own ship true course (deg)
  ownSpeedKn?: number;      // Own ship speed (kn)
};

export type ARPAResult = {
  cpaNm: number;      // Closest point of approach (nm); when opening, the CPA that has already passed
  tcpaMin: number;    // Time to CPA (minutes); negative when the CPA has passed
  opening: boolean;   // True when the range is already increasing
  relativeSpeedKn: number; // Relative speed (kn)
  relativeBearingDeg: number; // Direction of relative motion (deg true)
};

export type PlaneSailingInput = {
  lat1Deg: number;
  lon1Deg: number;
  lat2Deg: number;
  lon2Deg: number;
};

export type PlaneSailingResult = {
  dLatMin: number;    // Difference of latitude (minutes, + north)
  depMin: number;     // Departure (nm, + east)
  courseDeg: number;  // True course
  distanceNm: number; // Distance (nm)
};

export type SightReductionInput = {
  latDeg: number;     // Observer latitude
  decDeg: number;     // Celestial body declination
  lhaDeg: number;     // Local hour angle
};

export type SightReductionResult = {
  hcDeg: number;      // Calculated altitude
  azimuthDeg: number; // True azimuth Zn (000–360°)
};

export type BearingCalculationResult = {
  distanceAtSecondBearingNm: number; // Distance off at the time of the second bearing
  distanceAbeamNm: number;           // Predicted distance off when abeam (course and speed unchanged)
};

export type TideInput = {
  hour: number;        // Hours after low water (rising) or high water (falling), 0…6
  tidalRangeM: number; // Range of the tide (m)
  phase?: 'rising' | 'falling';
};

export type TideResult = {
  heightM: number;        // Height above the starting low (rising) or below the starting high (falling) water, as a change from LW (m)
  fractionOfRange: number; // Fraction of the range above low water (0…1)
};

export type DistanceCalculationInput = {
  heightM: number;    // Height of eye or radar aerial (m)
  type: 'horizon' | 'radar' | 'light';
  lightHeightM?: number; // Elevation of the light (m) for the geographical range
};

export type DistanceCalculationResult = {
  distanceNm: number;
};

export type TurningCalculationInput = {
  shipLengthM: number;
  courseChangeDeg: number;
  speedKn: number;
  tacticalDiameterM?: number; // From the ship's manoeuvring data; if absent 3.5 × L is used as a rough estimate
};

export type TurningCalculationResult = {
  tacticalDiameterM: number;
  tacticalDiameterEstimated: boolean;
  radiusM: number;
  advanceM: number;   // Along the original course, from the start of the turn (circular arc)
  transferM: number;  // Perpendicular to the original course (circular arc)
  rotDegPerMin: number;
  wheelOverDistanceM: number; // From the intersection of the two course lines: R·tan(Δ/2)
};

const toRadians = (deg: number) => (deg * Math.PI) / 180;
const toDegrees = (rad: number) => (rad * 180) / Math.PI;
const normalizeAngle = (deg: number) => {
  const x = deg % 360;
  return x < 0 ? x + 360 : x;
};
/** Angle in −180…+180. */
export const signedAngle = (deg: number) => {
  const x = normalizeAngle(deg);
  return x > 180 ? x - 360 : x;
};
/** Longitude in −180…+180 (east positive). */
export const normalizeLongitude = (deg: number) => {
  const x = signedAngle(deg);
  return x === -180 ? 180 : x;
};

export function calculateEtaHours(distanceNm: number, speedKn: number): number {
  if (!isFinite(distanceNm) || !isFinite(speedKn) || speedKn <= 0) {
    throw new Error("Invalid distance or speed for ETA calculation");
  }
  return distanceNm / speedKn;
}

/** Gyro to true: True = gyro reading + gyro error (error east +, west −). */
export function gyroToTrue(gyroDeg: number, gyroErrorDeg: number): number {
  return normalizeAngle(gyroDeg + gyroErrorDeg);
}

/**
 * Course to steer to make good a track against a current (and leeway).
 * Water track h solves sin(h − D) = c·sin(D − set)/V; heading = h − leeway.
 */
export function solveCurrentTriangle(input: CurrentTriangleInput): CurrentTriangleResult {
  const { courseDeg, speedKn, setDeg, driftKn } = input;
  const leewayDeg = input.leewayDeg ?? 0;

  if (!(isFinite(courseDeg) && isFinite(speedKn) && isFinite(setDeg) && isFinite(driftKn) && isFinite(leewayDeg))) {
    throw new Error("Invalid inputs for current triangle");
  }
  if (speedKn <= 0) {
    throw new Error("Ship speed must be > 0");
  }

  const desiredDeg = normalizeAngle(courseDeg);
  const desiredRad = toRadians(desiredDeg);
  const Cx = driftKn * Math.sin(toRadians(setDeg));
  const Cy = driftKn * Math.cos(toRadians(setDeg));

  const rhs = (driftKn * Math.sin(toRadians(desiredDeg - setDeg))) / speedKn;
  const clamped = Math.max(-1, Math.min(1, rhs));
  const waterTrackDeg = normalizeAngle(desiredDeg + toDegrees(Math.asin(clamped)));
  const headingDeg = normalizeAngle(waterTrackDeg - leewayDeg);

  const groundX = speedKn * Math.sin(toRadians(waterTrackDeg)) + Cx;
  const groundY = speedKn * Math.cos(toRadians(waterTrackDeg)) + Cy;
  const groundSpeed = groundX * Math.sin(desiredRad) + groundY * Math.cos(desiredRad);
  const madeGoodCourseDeg = normalizeAngle(toDegrees(Math.atan2(groundX, groundY)));

  return {
    courseToSteerDeg: headingDeg,
    waterTrackDeg,
    madeGoodCourseDeg,
    groundSpeedKn: groundSpeed,
    correctionDeg: signedAngle(headingDeg - desiredDeg),
    feasible: Math.abs(rhs) <= 1 && groundSpeed > 0,
  };
}

/** CPA/TCPA from the relative motion: TCPA = −(R₀·Vr)/|Vr|². Bearings and courses are true. */
export function computeArpaCpaTcpa(input: ARPAInput): ARPAResult {
  const {
    targetBearingDeg,
    targetDistanceNm,
    targetCourseDeg,
    targetSpeedKn,
    ownCourseDeg = 0,
    ownSpeedKn = 0,
  } = input;

  if (!isFinite(targetBearingDeg) || !isFinite(targetDistanceNm) || targetDistanceNm < 0) {
    throw new Error("Invalid target bearing or distance");
  }
  if (!isFinite(targetCourseDeg) || !isFinite(targetSpeedKn) || targetSpeedKn < 0) {
    throw new Error("Invalid target course or speed");
  }

  // Initial relative position R0 in nm (X east, Y north)
  const R0x = targetDistanceNm * Math.sin(toRadians(targetBearingDeg));
  const R0y = targetDistanceNm * Math.cos(toRadians(targetBearingDeg));

  const Vrx = targetSpeedKn * Math.sin(toRadians(targetCourseDeg)) - ownSpeedKn * Math.sin(toRadians(ownCourseDeg));
  const Vry = targetSpeedKn * Math.cos(toRadians(targetCourseDeg)) - ownSpeedKn * Math.cos(toRadians(ownCourseDeg));
  const Vr2 = Vrx * Vrx + Vry * Vry;
  const relativeSpeedKn = Math.sqrt(Vr2);
  const relativeBearingDeg = normalizeAngle(toDegrees(Math.atan2(Vrx, Vry)));

  // No relative motion: the range stays as it is.
  const tcpaHours = Vr2 > 1e-9 ? -((R0x * Vrx + R0y * Vry) / Vr2) : 0;
  const cpaX = R0x + Vrx * tcpaHours;
  const cpaY = R0y + Vry * tcpaHours;

  return {
    cpaNm: Math.hypot(cpaX, cpaY),
    tcpaMin: tcpaHours * 60,
    opening: tcpaHours < 0,
    relativeSpeedKn,
    relativeBearingDeg,
  };
}

export type GreatCircleVertex = {
  latDeg: number;
  lonDeg: number;
  /** True when the vertex lies between the departure and the destination. */
  onRoute: boolean;
};

const toVector = (latDeg: number, lonDeg: number) => {
  const lat = toRadians(latDeg);
  const lon = toRadians(lonDeg);
  return { x: Math.cos(lat) * Math.cos(lon), y: Math.cos(lat) * Math.sin(lon), z: Math.sin(lat) };
};

const initialCourseDeg = (lat1Deg: number, lon1Deg: number, lat2Deg: number, lon2Deg: number) => {
  const lat1 = toRadians(lat1Deg);
  const lat2 = toRadians(lat2Deg);
  const dLon = toRadians(lon2Deg - lon1Deg);
  const y = Math.sin(dLon) * Math.cos(lat2);
  const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);
  return normalizeAngle(toDegrees(Math.atan2(y, x)));
};

/**
 * Great circle on the sphere (R = 3440.065 nm): haversine distance, initial and final course,
 * and the vertex towards which the ship is heading (cos φv = cos φ₁ · |sin C|).
 */
export function calculateGreatCircle(lat1Deg: number, lon1Deg: number, lat2Deg: number, lon2Deg: number) {
  if (!isFinite(lat1Deg) || !isFinite(lon1Deg) || !isFinite(lat2Deg) || !isFinite(lon2Deg)) {
    throw new Error("Invalid coordinates");
  }
  if (Math.abs(lat1Deg) > 90 || Math.abs(lat2Deg) > 90) {
    throw new Error("Latitude must be between -90° and +90°");
  }
  if (Math.abs(lon1Deg) > 180 || Math.abs(lon2Deg) > 180) {
    throw new Error("Longitude must be between -180° and +180°");
  }

  const R = 3440.065; // nautical miles (mean Earth radius)
  const lat1Rad = toRadians(lat1Deg);
  const lat2Rad = toRadians(lat2Deg);
  const deltaLatRad = toRadians(lat2Deg - lat1Deg);
  const deltaLonRad = toRadians(lon2Deg - lon1Deg);

  const a = Math.sin(deltaLatRad / 2) ** 2 + Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(deltaLonRad / 2) ** 2;
  const c = 2 * Math.asin(Math.min(1, Math.sqrt(a)));
  const distance = R * c;

  const initialCourse = initialCourseDeg(lat1Deg, lon1Deg, lat2Deg, lon2Deg);
  // Final course = course on arrival = reverse of the initial course from the destination back to the start.
  const finalCourse = normalizeAngle(initialCourseDeg(lat2Deg, lon2Deg, lat1Deg, lon1Deg) + 180);

  // Vertex: on the circle with unit normal n the highest latitude has cos φv = |n_z|.
  let vertex: GreatCircleVertex | null = null;
  const v1 = toVector(lat1Deg, lon1Deg);
  const v2 = toVector(lat2Deg, lon2Deg);
  const nx = v1.y * v2.z - v1.z * v2.y;
  const ny = v1.z * v2.x - v1.x * v2.z;
  const nz = v1.x * v2.y - v1.y * v2.x;
  const nLen = Math.hypot(nx, ny, nz);
  if (nLen > 1e-12 && Math.abs(nz / nLen) < 1 - 1e-12) {
    const n = { x: nx / nLen, y: ny / nLen, z: nz / nLen };
    // Northern vertex: z-axis projected onto the plane of the circle.
    const px = -n.z * n.x;
    const py = -n.z * n.y;
    const pz = 1 - n.z * n.z;
    const pLen = Math.hypot(px, py, pz);
    // Heading north (initial course in the northern half) → northern vertex ahead; else southern.
    const north = Math.cos(toRadians(initialCourse)) >= 0;
    const s = north ? 1 : -1;
    const vx = (s * px) / pLen;
    const vy = (s * py) / pLen;
    const vz = (s * pz) / pLen;
    const angle = (u: { x: number; y: number; z: number }, w: { x: number; y: number; z: number }) =>
      Math.acos(Math.max(-1, Math.min(1, u.x * w.x + u.y * w.y + u.z * w.z)));
    const vv = { x: vx, y: vy, z: vz };
    const onRoute = Math.abs(angle(v1, vv) + angle(vv, v2) - c) < 1e-9;
    vertex = { latDeg: toDegrees(Math.asin(vz)), lonDeg: toDegrees(Math.atan2(vy, vx)), onRoute };
  }

  return {
    distance,
    initialCourse,
    finalCourse,
    vertex,
    vertexLat: vertex ? vertex.latDeg : null,
    distanceDeg: toDegrees(c),
  };
}

export type GreatCircleWaypointInput = {
  start: LatLon;
  end: LatLon;
  // Either specify a fixed number of segments, or a step distance.
  segments?: number; // e.g. 10 => 11 points including endpoints
  stepNm?: number; // e.g. 60 => approximately 1° arc steps
};

export function generateGreatCircleWaypoints(input: GreatCircleWaypointInput): LatLon[] {
  const { start, end } = input;
  if (!isFinite(start.latDeg) || !isFinite(start.lonDeg) || !isFinite(end.latDeg) || !isFinite(end.lonDeg)) {
    throw new Error("Invalid waypoint coordinates");
  }
  const dist = calculateGreatCircle(start.latDeg, start.lonDeg, end.latDeg, end.lonDeg).distance;
  const seg = input.segments && input.segments > 0 ? Math.floor(input.segments) : input.stepNm && input.stepNm > 0 ? Math.max(1, Math.round(dist / input.stepNm)) : 10;

  const v1 = toVector(start.latDeg, start.lonDeg);
  const v2 = toVector(end.latDeg, end.lonDeg);
  const dot = Math.max(-1, Math.min(1, v1.x * v2.x + v1.y * v2.y + v1.z * v2.z));
  const omega = Math.acos(dot);
  if (!isFinite(omega) || omega < 1e-12) return [start, end];

  const waypoints: LatLon[] = [];
  for (let i = 0; i <= seg; i++) {
    const t = i / seg;
    const so = Math.sin(omega);
    const k1 = Math.sin((1 - t) * omega) / so;
    const k2 = Math.sin(t * omega) / so;
    const x = k1 * v1.x + k2 * v2.x;
    const y = k1 * v1.y + k2 * v2.y;
    const z = k1 * v1.z + k2 * v2.z;
    waypoints.push({ latDeg: toDegrees(Math.atan2(z, Math.hypot(x, y))), lonDeg: toDegrees(Math.atan2(y, x)) });
  }
  return waypoints;
}

/** WGS 84 first eccentricity. */
const WGS84_E = 0.0818191908426;

/** Meridional parts (minutes of arc) on the WGS 84 ellipsoid. */
export function meridionalParts(latDeg: number): number {
  if (!isFinite(latDeg) || Math.abs(latDeg) >= 90) throw new Error("Latitude must be between -90° and +90°");
  const phi = toRadians(latDeg);
  const es = WGS84_E * Math.sin(phi);
  const psi = Math.log(Math.tan(Math.PI / 4 + phi / 2) * Math.pow((1 - es) / (1 + es), WGS84_E / 2));
  return (10800 / Math.PI) * psi;
}

/**
 * Mercator sailing (rhumb line): tan C = d.long / DMP, distance = d.lat / cos C
 * (d.long · cos φ when sailing east–west). Meridional parts on the WGS 84 ellipsoid.
 */
export function calculateRhumbLine(lat1Deg: number, lon1Deg: number, lat2Deg: number, lon2Deg: number) {
  const dLatMin = 60 * (lat2Deg - lat1Deg);
  const dLongMin = 60 * signedAngle(lon2Deg - lon1Deg);
  const dmp = meridionalParts(lat2Deg) - meridionalParts(lat1Deg);
  const course = normalizeAngle(toDegrees(Math.atan2(dLongMin, dmp)));
  const distance =
    Math.abs(dLatMin) > 1e-9
      ? Math.abs(dLatMin / Math.cos(toRadians(course)))
      : Math.abs(dLongMin * Math.cos(toRadians(lat1Deg)));
  return { distance, course, dLatMin, dLongMin, dmp };
}

/** Plane sailing: d.lat = D·cos C, departure = D·sin C. */
export function planeSailingFromCourse(courseDeg: number, distanceNm: number) {
  if (!isFinite(courseDeg) || !isFinite(distanceNm) || distanceNm < 0) throw new Error("Invalid course or distance");
  return {
    dLatMin: distanceNm * Math.cos(toRadians(courseDeg)),
    depMin: distanceNm * Math.sin(toRadians(courseDeg)),
  };
}

/** Plane sailing: tan C = departure / d.lat, D = √(d.lat² + dep²). */
export function planeSailingFromDLatDep(dLatMin: number, depMin: number) {
  if (!isFinite(dLatMin) || !isFinite(depMin)) throw new Error("Invalid d.lat or departure");
  return {
    courseDeg: normalizeAngle(toDegrees(Math.atan2(depMin, dLatMin))),
    distanceNm: Math.hypot(dLatMin, depMin),
  };
}

// Sight Reduction calculations
export function calculateSightReduction(input: SightReductionInput): SightReductionResult {
  const { latDeg, decDeg, lhaDeg } = input;

  const latRad = toRadians(latDeg);
  const decRad = toRadians(decDeg);
  const lhaRad = toRadians(lhaDeg);

  const sinHc = Math.sin(latRad) * Math.sin(decRad) +
                Math.cos(latRad) * Math.cos(decRad) * Math.cos(lhaRad);
  const hcDeg = toDegrees(Math.asin(sinHc));

  const cosZ = (Math.sin(decRad) - Math.sin(latRad) * Math.sin(toRadians(hcDeg))) /
               (Math.cos(latRad) * Math.cos(toRadians(hcDeg)));
  const zDeg = toDegrees(Math.acos(Math.max(-1, Math.min(1, cosZ))));
  const azimuthDeg = azimuthAngleToZn(zDeg, lhaDeg);

  return { hcDeg, azimuthDeg };
}

// Z is measured from north (0–180°): body east of the meridian (LHA > 180°) → Zn = Z, west → Zn = 360° − Z.
export function azimuthAngleToZn(zDeg: number, lhaDeg: number): number {
  return normalizeAngle(normalizeAngle(lhaDeg) > 180 ? zDeg : 360 - zDeg);
}

/**
 * Two bearings of the same object on the bow (relative angles θ₁ < θ₂, same side) and the run between them.
 * Sine rule: distance at the second bearing = run · sin θ₁ / sin(θ₂ − θ₁);
 * distance abeam = that distance · sin θ₂. Doubling the angle on the bow gives distance = run.
 */
export function calculateTwoBearingsOnBow(firstAngleDeg: number, secondAngleDeg: number, runNm: number): BearingCalculationResult {
  if (![firstAngleDeg, secondAngleDeg, runNm].every(isFinite) || runNm <= 0) throw new Error("Invalid bearings or run");
  if (firstAngleDeg <= 0 || secondAngleDeg >= 180 || secondAngleDeg <= firstAngleDeg) {
    throw new Error("The second angle on the bow must be larger than the first (both between 0° and 180°)");
  }
  const distanceAtSecondBearingNm = (runNm * Math.sin(toRadians(firstAngleDeg))) / Math.sin(toRadians(secondAngleDeg - firstAngleDeg));
  return {
    distanceAtSecondBearingNm,
    distanceAbeamNm: distanceAtSecondBearingNm * Math.sin(toRadians(secondAngleDeg)),
  };
}

/**
 * Ranges with standard terrestrial refraction, heights in metres:
 * horizon 2.08√h, radar horizon 2.23√h (effective Earth radius 4/3),
 * geographical range of a light 2.08(√H + √h).
 */
export function calculateDistance(input: DistanceCalculationInput): DistanceCalculationResult {
  const { heightM, type, lightHeightM } = input;
  if (!isFinite(heightM) || heightM < 0) throw new Error("Height must be ≥ 0");

  switch (type) {
    case 'horizon':
      return { distanceNm: 2.08 * Math.sqrt(heightM) };
    case 'radar':
      return { distanceNm: 2.23 * Math.sqrt(heightM) };
    case 'light':
      if (lightHeightM === undefined || !isFinite(lightHeightM) || lightHeightM < 0) throw new Error("Light elevation must be ≥ 0");
      return { distanceNm: 2.08 * (Math.sqrt(heightM) + Math.sqrt(lightHeightM)) };
  }
}

/** Rule of twelfths: hours 0…6 after LW (rising) or HW (falling), interpolated between whole hours. */
export function calculateTide(input: TideInput): TideResult {
  const { hour, tidalRangeM, phase = 'rising' } = input;
  if (!isFinite(hour) || !isFinite(tidalRangeM) || hour < 0 || hour > 6) {
    throw new Error("Hour must be between 0 and 6");
  }
  const tw = twelfthsFraction(hour / 6);
  const fractionOfRange = phase === 'rising' ? tw : 1 - tw;
  return { heightM: fractionOfRange * tidalRangeM, fractionOfRange };
}

/**
 * Turning on a circular arc of radius R = TD/2 (geometric model; the ship's own
 * manoeuvring data take precedence): advance = R·sin Δ, transfer = R(1 − cos Δ),
 * rate of turn = V/R (3437.75·V[m/s]/R[m] °/min), wheel-over before the
 * intersection of the course lines = R·tan(Δ/2).
 */
export function calculateTurning(input: TurningCalculationInput): TurningCalculationResult {
  const { shipLengthM, courseChangeDeg, speedKn } = input;
  if (!isFinite(courseChangeDeg) || courseChangeDeg <= 0 || courseChangeDeg >= 180) {
    throw new Error("Alteration of course must be between 0° and 180°");
  }
  if (!isFinite(speedKn) || speedKn <= 0) throw new Error("Speed must be > 0");
  const tacticalDiameterEstimated = !(input.tacticalDiameterM && input.tacticalDiameterM > 0);
  if (tacticalDiameterEstimated && (!isFinite(shipLengthM) || shipLengthM <= 0)) throw new Error("Ship length must be > 0");
  const tacticalDiameterM = tacticalDiameterEstimated ? 3.5 * shipLengthM : (input.tacticalDiameterM as number);
  const radiusM = tacticalDiameterM / 2;

  const d = toRadians(courseChangeDeg);
  return {
    tacticalDiameterM,
    tacticalDiameterEstimated,
    radiusM,
    advanceM: radiusM * Math.sin(d),
    transferM: radiusM * (1 - Math.cos(d)),
    rotDegPerMin: (toDegrees(1) * 60 * knotsToMs(speedKn)) / radiusM,
    wheelOverDistanceM: radiusM * Math.tan(d / 2),
  };
}

export type BeaufortRow = {
  force: number;
  description: string;
  meanKn: number | null;
  minKn: number;
  maxKn: number | null;
  probableWaveM: number | null;
  probableMaxWaveM: number | null;
};

/** Beaufort scale with probable wave heights for the open sea (Met Office / WMO). */
export const BEAUFORT_TABLE: readonly BeaufortRow[] = [
  { force: 0, description: "Calm", meanKn: 0, minKn: 0, maxKn: 1, probableWaveM: null, probableMaxWaveM: null },
  { force: 1, description: "Light air", meanKn: 2, minKn: 1, maxKn: 3, probableWaveM: 0.1, probableMaxWaveM: 0.1 },
  { force: 2, description: "Light breeze", meanKn: 5, minKn: 4, maxKn: 6, probableWaveM: 0.2, probableMaxWaveM: 0.3 },
  { force: 3, description: "Gentle breeze", meanKn: 9, minKn: 7, maxKn: 10, probableWaveM: 0.6, probableMaxWaveM: 1.0 },
  { force: 4, description: "Moderate breeze", meanKn: 13, minKn: 11, maxKn: 16, probableWaveM: 1.0, probableMaxWaveM: 1.5 },
  { force: 5, description: "Fresh breeze", meanKn: 19, minKn: 17, maxKn: 21, probableWaveM: 2.0, probableMaxWaveM: 2.5 },
  { force: 6, description: "Strong breeze", meanKn: 24, minKn: 22, maxKn: 27, probableWaveM: 3.0, probableMaxWaveM: 4.0 },
  { force: 7, description: "Near gale", meanKn: 30, minKn: 28, maxKn: 33, probableWaveM: 4.0, probableMaxWaveM: 5.5 },
  { force: 8, description: "Gale", meanKn: 37, minKn: 34, maxKn: 40, probableWaveM: 5.5, probableMaxWaveM: 7.5 },
  { force: 9, description: "Strong gale", meanKn: 44, minKn: 41, maxKn: 47, probableWaveM: 7.0, probableMaxWaveM: 10.0 },
  { force: 10, description: "Storm", meanKn: 52, minKn: 48, maxKn: 55, probableWaveM: 9.0, probableMaxWaveM: 12.5 },
  { force: 11, description: "Violent storm", meanKn: 60, minKn: 56, maxKn: 63, probableWaveM: 11.5, probableMaxWaveM: 16.0 },
  { force: 12, description: "Hurricane", meanKn: null, minKn: 64, maxKn: null, probableWaveM: 14, probableMaxWaveM: null },
];

/** Beaufort force for a mean wind speed in knots (limits as in the table; values between limits round to the nearest knot). */
export function beaufortForKnots(speedKn: number): BeaufortRow {
  if (!isFinite(speedKn) || speedKn < 0) throw new Error("Wind speed must be ≥ 0");
  const kn = Math.round(speedKn);
  if (kn < 1) return BEAUFORT_TABLE[0];
  return BEAUFORT_TABLE.find((row) => row.force > 0 && kn >= row.minKn && (row.maxKn === null || kn <= row.maxKn)) ?? BEAUFORT_TABLE[12];
}

/** Latitude by meridian altitude: φ = ZD ± δ, ZD = 90° − Ho named opposite to the body's bearing. */
export function latitudeByMeridianAltitude(hoDeg: number, decDeg: number, bodyBears: "N" | "S"): number {
  if (!isFinite(hoDeg) || hoDeg <= 0 || hoDeg > 90) throw new Error("Observed altitude must be between 0° and 90°");
  if (!isFinite(decDeg) || Math.abs(decDeg) > 90) throw new Error("Invalid declination");
  const zd = 90 - hoDeg;
  return (bodyBears === "S" ? zd : -zd) + decDeg;
}

// IAMSAR Manual Vol. III search patterns (all distances in nm, speeds in kn).
export type SearchPatternResult = {
  legsNm: number[];
  totalTrackNm: number;
  timeHours: number;
};

/** Expanding square (SS): legs S, S, 2S, 2S, 3S, 3S…; all turns 90°. */
export function expandingSquareSearch(trackSpacingNm: number, legs: number, speedKn: number): SearchPatternResult {
  if (!(trackSpacingNm > 0) || !(speedKn > 0) || !Number.isInteger(legs) || legs < 1) throw new Error("Invalid search inputs");
  const legsNm = Array.from({ length: legs }, (_, i) => Math.ceil((i + 1) / 2) * trackSpacingNm);
  const totalTrackNm = legsNm.reduce((a, b) => a + b, 0);
  return { legsNm, totalTrackNm, timeHours: totalTrackNm / speedKn };
}

/** Sector search (VS): legs equal to the radius, turns 120°; one pattern of three triangles = 9 × radius. */
export function sectorSearch(radiusNm: number, speedKn: number): SearchPatternResult {
  if (!(radiusNm > 0) || !(speedKn > 0)) throw new Error("Invalid search inputs");
  const legsNm = [radiusNm, radiusNm, 2 * radiusNm, radiusNm, 2 * radiusNm, radiusNm, radiusNm];
  const totalTrackNm = 9 * radiusNm;
  return { legsNm, totalTrackNm, timeHours: totalTrackNm / speedKn };
}

/** Parallel sweep (PS): legs of the area length, spaced S apart across the width. */
export function parallelSweepSearch(lengthNm: number, widthNm: number, trackSpacingNm: number, speedKn: number): SearchPatternResult & { legCount: number } {
  if (!(lengthNm > 0) || !(widthNm > 0) || !(trackSpacingNm > 0) || !(speedKn > 0)) throw new Error("Invalid search inputs");
  const legCount = Math.max(1, Math.round(widthNm / trackSpacingNm));
  const legsNm: number[] = [];
  for (let i = 0; i < legCount; i++) {
    legsNm.push(lengthNm);
    if (i < legCount - 1) legsNm.push(trackSpacingNm);
  }
  const totalTrackNm = legsNm.reduce((a, b) => a + b, 0);
  return { legsNm, totalTrackNm, timeHours: totalTrackNm / speedKn, legCount };
}

// -----------------------------
// Extended navigation utilities
// -----------------------------

export type SpeedUnit = "kn" | "kmh" | "ms";
export type DistanceUnit = "nm" | "km" | "m";
export type AngleSignConvention = "east-positive" | "west-positive";

export type LatLon = { latDeg: number; lonDeg: number }; // lon: East positive, West negative

export function knotsToKmh(kn: number): number {
  return kn * 1.852;
}

export function kmhToKnots(kmh: number): number {
  return kmh / 1.852;
}

export function knotsToMs(kn: number): number {
  return kn * 0.514444;
}

export function msToKnots(ms: number): number {
  return ms / 0.514444;
}

export function nmToKm(nm: number): number {
  return nm * 1.852;
}

export function kmToNm(km: number): number {
  return km / 1.852;
}

export function hoursToHhMm(hours: number): { hh: number; mm: number } {
  if (!isFinite(hours)) return { hh: 0, mm: 0 };
  const hh = Math.trunc(hours);
  const mm = Math.round((hours - hh) * 60);
  if (mm === 60) return { hh: hh + 1, mm: 0 };
  return { hh, mm };
}

// ---- Time helpers (GMT/UTC, Zone Time, Local Mean Time)
export function longitudeDegToTimeMinutes(lonDegEastPositive: number): number {
  if (!isFinite(lonDegEastPositive)) throw new Error("Invalid longitude");
  // 360° -> 24h => 15°/h => 1° -> 4 minutes
  return lonDegEastPositive * 4;
}

export function utcToZoneTime(dateUtc: Date, zoneOffsetHours: number): Date {
  if (!isFinite(zoneOffsetHours)) throw new Error("Invalid zone offset");
  return new Date(dateUtc.getTime() + zoneOffsetHours * 60 * 60 * 1000);
}

export function zoneTimeToUtc(dateZone: Date, zoneOffsetHours: number): Date {
  if (!isFinite(zoneOffsetHours)) throw new Error("Invalid zone offset");
  return new Date(dateZone.getTime() - zoneOffsetHours * 60 * 60 * 1000);
}

export function utcToLocalMeanTime(dateUtc: Date, lonDegEastPositive: number): Date {
  const minutes = longitudeDegToTimeMinutes(lonDegEastPositive);
  return new Date(dateUtc.getTime() + minutes * 60 * 1000);
}

export type SpeedDistanceTimeInput = {
  distanceNm?: number;
  speedKn?: number;
  timeHours?: number;
};

export type SpeedDistanceTimeResult = {
  distanceNm: number;
  speedKn: number;
  timeHours: number;
};

export function solveSpeedDistanceTime(input: SpeedDistanceTimeInput): SpeedDistanceTimeResult {
  const { distanceNm, speedKn, timeHours } = input;
  const known = [distanceNm, speedKn, timeHours].filter((v) => v !== undefined && isFinite(v as number)).length;
  if (known < 2) throw new Error("At least two values are required");

  let d = distanceNm;
  let v = speedKn;
  let t = timeHours;

  if (d === undefined || !isFinite(d)) {
    if (v === undefined || !isFinite(v) || v <= 0) throw new Error("Speed must be > 0");
    if (t === undefined || !isFinite(t) || t < 0) throw new Error("Time must be >= 0");
    d = v * t;
  } else if (v === undefined || !isFinite(v)) {
    if (t === undefined || !isFinite(t) || t <= 0) throw new Error("Time must be > 0");
    v = d / t;
  } else if (t === undefined || !isFinite(t)) {
    if (v <= 0) throw new Error("Speed must be > 0");
    t = d / v;
  }

  return { distanceNm: d, speedKn: v, timeHours: t };
}

export type EtaEtdInput = {
  distanceNm: number;
  speedKn: number;
  etdUtc: Date;
};

export function calculateEtaUtc({ distanceNm, speedKn, etdUtc }: EtaEtdInput): Date {
  const hours = calculateEtaHours(distanceNm, speedKn);
  return new Date(etdUtc.getTime() + hours * 60 * 60 * 1000);
}

export type RemainingInput = {
  plannedTotalDistanceNm: number;
  distanceMadeGoodNm: number;
  currentSogKn: number;
};

export type RemainingResult = {
  remainingDistanceNm: number;
  remainingTimeHours: number;
};

export function calculateRemaining(input: RemainingInput): RemainingResult {
  const remainingDistanceNm = Math.max(0, input.plannedTotalDistanceNm - input.distanceMadeGoodNm);
  const remainingTimeHours = input.currentSogKn > 0 ? remainingDistanceNm / input.currentSogKn : Infinity;
  return { remainingDistanceNm, remainingTimeHours };
}

export function calculateAverageSpeed(totalDistanceNm: number, totalTimeHours: number): number {
  if (!isFinite(totalDistanceNm) || !isFinite(totalTimeHours) || totalTimeHours <= 0) {
    throw new Error("Invalid total distance or time");
  }
  return totalDistanceNm / totalTimeHours;
}

export type DLatDLongResult = {
  dLatMin: number;
  dLongMinAtMeanLat: number;
  dLatDir: "N" | "S";
  dLongDir: "E" | "W";
  meanLatDeg: number;
};

export function computeDLatDLong(lat1Deg: number, lon1Deg: number, lat2Deg: number, lon2Deg: number): DLatDLongResult {
  const dLatDeg = lat2Deg - lat1Deg;
  const dLonDeg = signedAngle(lon2Deg - lon1Deg);
  const meanLatDeg = (lat1Deg + lat2Deg) / 2;
  const dLatMin = Math.abs(dLatDeg * 60);
  const dLongMinAtMeanLat = Math.abs(dLonDeg * 60 * Math.cos(toRadians(meanLatDeg)));
  return {
    dLatMin,
    dLongMinAtMeanLat,
    dLatDir: dLatDeg >= 0 ? "N" : "S",
    dLongDir: dLonDeg >= 0 ? "E" : "W",
    meanLatDeg,
  };
}

export type MiddleLatitudeSailingResult = {
  meanLatDeg: number;
  dLatMin: number;
  dLongMin: number;
  departureMin: number;
  courseDeg: number;
  distanceNm: number;
};

/** Mid-latitude sailing: departure = d.long · cos φm; suitable for short distances, not across the equator. */
export function calculateMiddleLatitudeSailing(input: PlaneSailingInput): MiddleLatitudeSailingResult {
  const { lat1Deg, lon1Deg, lat2Deg, lon2Deg } = input;
  const dLatMinSigned = 60 * (lat2Deg - lat1Deg);
  const meanLatDeg = (lat1Deg + lat2Deg) / 2;
  const dLongMinSigned = 60 * signedAngle(lon2Deg - lon1Deg);
  const departureMinSigned = dLongMinSigned * Math.cos(toRadians(meanLatDeg));
  const courseDeg = normalizeAngle(toDegrees(Math.atan2(departureMinSigned, dLatMinSigned)));
  const distanceNm = Math.sqrt(dLatMinSigned * dLatMinSigned + departureMinSigned * departureMinSigned);
  return {
    meanLatDeg,
    dLatMin: dLatMinSigned,
    dLongMin: dLongMinSigned,
    departureMin: departureMinSigned,
    courseDeg,
    distanceNm,
  };
}

export type DeadReckoningInput = {
  start: LatLon;
  courseTrueDeg: number;
  distanceNm: number;
};

export function calculateDeadReckoning(input: DeadReckoningInput): LatLon {
  const { start, courseTrueDeg, distanceNm } = input;
  if (!isFinite(start.latDeg) || !isFinite(start.lonDeg) || !isFinite(courseTrueDeg) || !isFinite(distanceNm)) {
    throw new Error("Invalid DR inputs");
  }

  const dLatDeg = (distanceNm * Math.cos(toRadians(courseTrueDeg))) / 60;
  const meanLatDeg = start.latDeg + dLatDeg / 2;
  const dLonDeg = (distanceNm * Math.sin(toRadians(courseTrueDeg))) / (60 * Math.cos(toRadians(meanLatDeg)));
  return { latDeg: start.latDeg + dLatDeg, lonDeg: normalizeLongitude(start.lonDeg + dLonDeg) };
}

export function relativeToTrueBearing(headingTrueDeg: number, relativeBearingDeg: number): number {
  return normalizeAngle(headingTrueDeg + relativeBearingDeg);
}

export type TVMDCInput = {
  courseDeg: number;
  variationDeg?: number; // East positive, West negative
  deviationDeg?: number; // East positive, West negative
};

export type TVMDCResult = {
  trueDeg: number;
  magneticDeg: number;
  compassDeg: number;
  compassErrorDeg: number; // Var + Dev
};

export function convertTVMDCFromCompass(input: TVMDCInput): TVMDCResult {
  const variationDeg = input.variationDeg ?? 0;
  const deviationDeg = input.deviationDeg ?? 0;
  const compassDeg = normalizeAngle(input.courseDeg);
  const magneticDeg = normalizeAngle(compassDeg + deviationDeg);
  const trueDeg = normalizeAngle(magneticDeg + variationDeg);
  return {
    trueDeg,
    magneticDeg,
    compassDeg,
    compassErrorDeg: variationDeg + deviationDeg,
  };
}

export function convertTVMDCFromTrue(input: TVMDCInput): TVMDCResult {
  const variationDeg = input.variationDeg ?? 0;
  const deviationDeg = input.deviationDeg ?? 0;
  const trueDeg = normalizeAngle(input.courseDeg);
  const magneticDeg = normalizeAngle(trueDeg - variationDeg);
  const compassDeg = normalizeAngle(magneticDeg - deviationDeg);
  return {
    trueDeg,
    magneticDeg,
    compassDeg,
    compassErrorDeg: variationDeg + deviationDeg,
  };
}

// Chart scale: 1 : scaleDenominator (e.g., 1:50000). Input length in cm.
export function chartCmToNm(lengthCm: number, scaleDenominator: number): number {
  if (!isFinite(lengthCm) || !isFinite(scaleDenominator) || scaleDenominator <= 0) throw new Error("Invalid chart scale inputs");
  // 1 nm = 185200 cm
  return (lengthCm * scaleDenominator) / 185200;
}

export function chartNmToCm(distanceNm: number, scaleDenominator: number): number {
  if (!isFinite(distanceNm) || !isFinite(scaleDenominator) || scaleDenominator <= 0) throw new Error("Invalid chart scale inputs");
  return (distanceNm * 185200) / scaleDenominator;
}

// ---- Fixing / LOP (local-plane approximation; suitable for coastal distances)
type XY = { xNm: number; yNm: number };

function latLonToLocalNm(origin: LatLon, p: LatLon): XY {
  const meanLatRad = toRadians((origin.latDeg + p.latDeg) / 2);
  const xNm = (p.lonDeg - origin.lonDeg) * 60 * Math.cos(meanLatRad);
  const yNm = (p.latDeg - origin.latDeg) * 60;
  return { xNm, yNm };
}

function localNmToLatLon(origin: LatLon, xy: XY): LatLon {
  const latDeg = origin.latDeg + xy.yNm / 60;
  const meanLatRad = toRadians((origin.latDeg + latDeg) / 2);
  const lonDeg = origin.lonDeg + xy.xNm / (60 * Math.cos(meanLatRad));
  return { latDeg, lonDeg };
}

function bearingToUnitVectorNm(bearingDeg: number): XY {
  // Bearing degrees: 0=N, 90=E (navigation convention)
  return { xNm: Math.sin(toRadians(bearingDeg)), yNm: Math.cos(toRadians(bearingDeg)) };
}

export type TwoBearingFixInput = {
  object1: LatLon;
  bearingToObject1TrueDeg: number; // observed bearing from ship to object1 (true)
  object2: LatLon;
  bearingToObject2TrueDeg: number; // observed bearing from ship to object2 (true)
};

export type TwoBearingFixResult = {
  fix: LatLon;
  intersectionAngleDeg: number; // acute angle between LOPs (good: ~30-150)
};

export function calculateFixFromTwoBearings(input: TwoBearingFixInput): TwoBearingFixResult {
  const { object1, object2, bearingToObject1TrueDeg, bearingToObject2TrueDeg } = input;
  const origin: LatLon = { latDeg: (object1.latDeg + object2.latDeg) / 2, lonDeg: (object1.lonDeg + object2.lonDeg) / 2 };
  const p1 = latLonToLocalNm(origin, object1);
  const p2 = latLonToLocalNm(origin, object2);

  // Reciprocal bearings (from object to ship)
  const brg1 = normalizeAngle(bearingToObject1TrueDeg + 180);
  const brg2 = normalizeAngle(bearingToObject2TrueDeg + 180);
  const d1 = bearingToUnitVectorNm(brg1);
  const d2 = bearingToUnitVectorNm(brg2);

  // Solve p1 + t*d1 = p2 + u*d2
  const det = d1.xNm * (-d2.yNm) - d1.yNm * (-d2.xNm); // det([d1, -d2])
  if (Math.abs(det) < 1e-9) {
    throw new Error("Bearings are nearly parallel; fix is ill-conditioned");
  }

  const rhsX = p2.xNm - p1.xNm;
  const rhsY = p2.yNm - p1.yNm;
  const t = (rhsX * (-d2.yNm) - rhsY * (-d2.xNm)) / det;

  const ix = p1.xNm + t * d1.xNm;
  const iy = p1.yNm + t * d1.yNm;

  const angle = Math.acos(
    Math.max(
      -1,
      Math.min(1, (d1.xNm * d2.xNm + d1.yNm * d2.yNm) / (Math.hypot(d1.xNm, d1.yNm) * Math.hypot(d2.xNm, d2.yNm)))
    )
  );
  const intersectionAngleDeg = Math.min(toDegrees(angle), 180 - toDegrees(angle));

  return { fix: localNmToLatLon(origin, { xNm: ix, yNm: iy }), intersectionAngleDeg };
}

export type RunningFixInput = {
  objectOld: LatLon;
  bearing1TrueDeg: number; // first observed bearing (ship->object) at t1
  objectNew: LatLon;
  bearing2TrueDeg: number; // second observed bearing (ship->object) at t2
  runCourseTrueDeg: number; // DR run between t1 and t2
  runDistanceNm: number;
};

export function calculateRunningFix(input: RunningFixInput): TwoBearingFixResult {
  // Advance the first LOP by the run, then intersect with second LOP.
  const origin: LatLon = { latDeg: (input.objectOld.latDeg + input.objectNew.latDeg) / 2, lonDeg: (input.objectOld.lonDeg + input.objectNew.lonDeg) / 2 };
  const p1 = latLonToLocalNm(origin, input.objectOld);
  const p2 = latLonToLocalNm(origin, input.objectNew);

  const brg1Rec = normalizeAngle(input.bearing1TrueDeg + 180);
  const brg2Rec = normalizeAngle(input.bearing2TrueDeg + 180);

  const d1 = bearingToUnitVectorNm(brg1Rec);
  const d2 = bearingToUnitVectorNm(brg2Rec);

  // Advance the whole first line by the run vector
  const run = bearingToUnitVectorNm(input.runCourseTrueDeg);
  const adv: XY = { xNm: run.xNm * input.runDistanceNm, yNm: run.yNm * input.runDistanceNm };
  const p1a: XY = { xNm: p1.xNm + adv.xNm, yNm: p1.yNm + adv.yNm };

  const det = d1.xNm * (-d2.yNm) - d1.yNm * (-d2.xNm);
  if (Math.abs(det) < 1e-9) throw new Error("Bearings are nearly parallel; fix is ill-conditioned");

  const rhsX = p2.xNm - p1a.xNm;
  const rhsY = p2.yNm - p1a.yNm;
  const t = (rhsX * (-d2.yNm) - rhsY * (-d2.xNm)) / det;
  const ix = p1a.xNm + t * d1.xNm;
  const iy = p1a.yNm + t * d1.yNm;

  const angle = Math.acos(
    Math.max(
      -1,
      Math.min(1, (d1.xNm * d2.xNm + d1.yNm * d2.yNm) / (Math.hypot(d1.xNm, d1.yNm) * Math.hypot(d2.xNm, d2.yNm)))
    )
  );
  const intersectionAngleDeg = Math.min(toDegrees(angle), 180 - toDegrees(angle));

  return { fix: localNmToLatLon(origin, { xNm: ix, yNm: iy }), intersectionAngleDeg };
}

// ---- Fixing helpers: 3 bearings, bearing+distance, two distances (mevki dairesi)
export type ThreeBearingFixInput = {
  object1: LatLon;
  bearingToObject1TrueDeg: number;
  object2: LatLon;
  bearingToObject2TrueDeg: number;
  object3: LatLon;
  bearingToObject3TrueDeg: number;
};

export type ThreeBearingFixResult = {
  fix: LatLon;
  // Least-squares residual (nm): 0 means perfect common intersection.
  residualNm: number;
  // Best-case acute intersection angle among any pair of LOPs (deg).
  bestIntersectionAngleDeg: number;
};

function solveLeastSquaresIntersection(lines: Array<{ p: XY; dir: XY }>): { x: XY; residual: number; bestAngleDeg: number } {
  // Each line defined by point p and direction dir (unit-ish).
  // Use normal form: n·x = n·p, where n is perpendicular to dir.
  // Solve x that minimizes ||A x - b|| in least squares.
  let a11 = 0, a12 = 0, a22 = 0;
  let b1 = 0, b2 = 0;
  let bestAngleDeg = 0;

  for (let i = 0; i < lines.length; i++) {
    const d = lines[i].dir;
    const n = { xNm: -d.yNm, yNm: d.xNm }; // perpendicular
    const nn = n.xNm * n.xNm + n.yNm * n.yNm;
    if (nn < 1e-12) continue;

    a11 += n.xNm * n.xNm;
    a12 += n.xNm * n.yNm;
    a22 += n.yNm * n.yNm;

    const bi = n.xNm * lines[i].p.xNm + n.yNm * lines[i].p.yNm;
    b1 += n.xNm * bi;
    b2 += n.yNm * bi;

    for (let j = i + 1; j < lines.length; j++) {
      const d2 = lines[j].dir;
      const dot = (d.xNm * d2.xNm + d.yNm * d2.yNm) / (Math.hypot(d.xNm, d.yNm) * Math.hypot(d2.xNm, d2.yNm));
      const ang = Math.acos(Math.max(-1, Math.min(1, dot)));
      const acuteDeg = Math.min(toDegrees(ang), 180 - toDegrees(ang));
      bestAngleDeg = Math.max(bestAngleDeg, acuteDeg);
    }
  }

  const det = a11 * a22 - a12 * a12;
  if (Math.abs(det) < 1e-12) {
    throw new Error("LOP geometry is ill-conditioned (nearly parallel bearings)");
  }
  const xNm = (b1 * a22 - b2 * a12) / det;
  const yNm = (a11 * b2 - a12 * b1) / det;

  // Residual: sqrt(mean squared perpendicular distance)
  let sse = 0;
  let m = 0;
  for (const l of lines) {
    const d = l.dir;
    const n = { xNm: -d.yNm, yNm: d.xNm };
    const denom = Math.hypot(n.xNm, n.yNm);
    if (denom < 1e-12) continue;
    const dist = (n.xNm * (xNm - l.p.xNm) + n.yNm * (yNm - l.p.yNm)) / denom;
    sse += dist * dist;
    m += 1;
  }
  const residual = m > 0 ? Math.sqrt(sse / m) : 0;

  return { x: { xNm, yNm }, residual, bestAngleDeg };
}

export function calculateFixFromThreeBearings(input: ThreeBearingFixInput): ThreeBearingFixResult {
  const { object1, object2, object3, bearingToObject1TrueDeg, bearingToObject2TrueDeg, bearingToObject3TrueDeg } = input;
  const origin: LatLon = {
    latDeg: (object1.latDeg + object2.latDeg + object3.latDeg) / 3,
    lonDeg: (object1.lonDeg + object2.lonDeg + object3.lonDeg) / 3,
  };
  const p1 = latLonToLocalNm(origin, object1);
  const p2 = latLonToLocalNm(origin, object2);
  const p3 = latLonToLocalNm(origin, object3);

  const brg1Rec = normalizeAngle(bearingToObject1TrueDeg + 180);
  const brg2Rec = normalizeAngle(bearingToObject2TrueDeg + 180);
  const brg3Rec = normalizeAngle(bearingToObject3TrueDeg + 180);

  const d1 = bearingToUnitVectorNm(brg1Rec);
  const d2 = bearingToUnitVectorNm(brg2Rec);
  const d3 = bearingToUnitVectorNm(brg3Rec);

  const solved = solveLeastSquaresIntersection([
    { p: p1, dir: d1 },
    { p: p2, dir: d2 },
    { p: p3, dir: d3 },
  ]);

  return {
    fix: localNmToLatLon(origin, solved.x),
    residualNm: solved.residual,
    bestIntersectionAngleDeg: solved.bestAngleDeg,
  };
}

export type BearingDistanceFixInput = {
  object: LatLon;
  bearingToObjectTrueDeg: number; // ship -> object (true)
  distanceToObjectNm: number;
};

export type BearingDistanceFixResult = {
  fix: LatLon;
};

export function calculateFixFromBearingAndDistance(input: BearingDistanceFixInput): BearingDistanceFixResult {
  const { object, bearingToObjectTrueDeg, distanceToObjectNm } = input;
  if (!isFinite(bearingToObjectTrueDeg) || !isFinite(distanceToObjectNm) || distanceToObjectNm < 0) {
    throw new Error("Invalid bearing/distance inputs");
  }
  // Object -> ship is reciprocal bearing.
  const reciprocal = normalizeAngle(bearingToObjectTrueDeg + 180);
  const fix = calculateDeadReckoning({
    start: object,
    courseTrueDeg: reciprocal,
    distanceNm: distanceToObjectNm,
  });
  return { fix };
}

export type TwoDistanceFixInput = {
  object1: LatLon;
  distanceToObject1Nm: number;
  object2: LatLon;
  distanceToObject2Nm: number;
  // Optional approximate position to choose between the two intersections.
  approximate?: LatLon;
};

export type TwoDistanceFixResult = {
  // Chosen fix (closest to approximate if provided; otherwise the first solution).
  fix: LatLon;
  // Both candidates (can be 0/1/2 points depending on geometry).
  candidates: LatLon[];
};

export function calculateFixFromTwoDistances(input: TwoDistanceFixInput): TwoDistanceFixResult {
  const { object1, object2, distanceToObject1Nm: r1, distanceToObject2Nm: r2, approximate } = input;
  if (!isFinite(r1) || !isFinite(r2) || r1 < 0 || r2 < 0) throw new Error("Invalid distances");

  const origin: LatLon = { latDeg: (object1.latDeg + object2.latDeg) / 2, lonDeg: (object1.lonDeg + object2.lonDeg) / 2 };
  const c1 = latLonToLocalNm(origin, object1);
  const c2 = latLonToLocalNm(origin, object2);

  const dx = c2.xNm - c1.xNm;
  const dy = c2.yNm - c1.yNm;
  const d = Math.hypot(dx, dy);
  if (d < 1e-9) throw new Error("Objects too close (circle centers coincide)");

  // No intersection if circles are separate or one contains the other.
  if (d > r1 + r2 + 1e-9 || d < Math.abs(r1 - r2) - 1e-9) {
    return { fix: localNmToLatLon(origin, c1), candidates: [] };
  }

  // Compute intersection points in local plane.
  const a = (r1 * r1 - r2 * r2 + d * d) / (2 * d);
  const h2 = r1 * r1 - a * a;
  const h = h2 > 0 ? Math.sqrt(Math.max(0, h2)) : 0;

  const ux = dx / d;
  const uy = dy / d;
  const px = c1.xNm + a * ux;
  const py = c1.yNm + a * uy;

  const rx = -uy * h;
  const ry = ux * h;

  const pA: XY = { xNm: px + rx, yNm: py + ry };
  const pB: XY = { xNm: px - rx, yNm: py - ry };

  const cand = [localNmToLatLon(origin, pA)];
  if (h > 1e-9) cand.push(localNmToLatLon(origin, pB));

  let chosen = cand[0];
  if (approximate && cand.length > 1) {
    const axy = latLonToLocalNm(origin, approximate);
    const dA = Math.hypot(pA.xNm - axy.xNm, pA.yNm - axy.yNm);
    const dB = Math.hypot(pB.xNm - axy.xNm, pB.yNm - axy.yNm);
    chosen = dB < dA ? cand[1] : cand[0];
  }

  return { fix: chosen, candidates: cand };
}

// ---- Radar plotting (two plots -> target true course/speed)
export type RadarPlot = {
  bearingTrueDeg: number; // True bearing of target from own ship at plot time
  rangeNm: number;
  timeUtc: Date;
};

export type RadarTargetMotionInput = {
  plot1: RadarPlot;
  plot2: RadarPlot;
  ownCourseTrueDeg: number;
  ownSpeedKn: number;
};

export type RadarTargetMotionResult = {
  relativeCourseDeg: number;
  relativeSpeedKn: number;
  targetCourseTrueDeg: number;
  targetSpeedKn: number;
  cpaNm: number;
  tcpaMin: number;
};

export function computeTargetMotionFromTwoRadarPlots(input: RadarTargetMotionInput): RadarTargetMotionResult {
  const dtHours = (input.plot2.timeUtc.getTime() - input.plot1.timeUtc.getTime()) / (60 * 60 * 1000);
  if (!isFinite(dtHours) || dtHours <= 0) throw new Error("Plot2 time must be after Plot1 time");

  const r1x = input.plot1.rangeNm * Math.sin(toRadians(input.plot1.bearingTrueDeg));
  const r1y = input.plot1.rangeNm * Math.cos(toRadians(input.plot1.bearingTrueDeg));
  const r2x = input.plot2.rangeNm * Math.sin(toRadians(input.plot2.bearingTrueDeg));
  const r2y = input.plot2.rangeNm * Math.cos(toRadians(input.plot2.bearingTrueDeg));

  const vrx = (r2x - r1x) / dtHours;
  const vry = (r2y - r1y) / dtHours;
  const relativeSpeedKn = Math.hypot(vrx, vry);
  const relativeCourseDeg = normalizeAngle(toDegrees(Math.atan2(vrx, vry)));

  const vox = input.ownSpeedKn * Math.sin(toRadians(input.ownCourseTrueDeg));
  const voy = input.ownSpeedKn * Math.cos(toRadians(input.ownCourseTrueDeg));

  const vtx = vrx + vox;
  const vty = vry + voy;
  const targetSpeedKn = Math.hypot(vtx, vty);
  const targetCourseTrueDeg = normalizeAngle(toDegrees(Math.atan2(vtx, vty)));

  // CPA/TCPA computed at plot2 instant
  const arpa = computeArpaCpaTcpa({
    targetBearingDeg: input.plot2.bearingTrueDeg,
    targetDistanceNm: input.plot2.rangeNm,
    targetCourseDeg: targetCourseTrueDeg,
    targetSpeedKn: targetSpeedKn,
    ownCourseDeg: input.ownCourseTrueDeg,
    ownSpeedKn: input.ownSpeedKn,
  });

  return {
    relativeCourseDeg,
    relativeSpeedKn,
    targetCourseTrueDeg,
    targetSpeedKn,
    cpaNm: arpa.cpaNm,
    tcpaMin: arpa.tcpaMin,
  };
}

// ---- COLREG power-driven vessels in sight of one another (Rules 13–17)
export type ColregSituation = "head-on" | "crossing-starboard" | "crossing-port" | "overtaking" | "being-overtaken";

export type ColregInput = {
  ownCourseDeg: number;
  targetRelativeBearingDeg: number; // 0 = ahead, 90 = starboard beam
  targetCourseDeg: number;
  /** "Ahead or nearly ahead" for Rule 14; COLREG gives no figure, so the user sets it. */
  aheadToleranceDeg?: number;
};

export type ColregAssessment = {
  situation: ColregSituation;
  role: "give-way" | "stand-on" | "both-alter";
  rule: string;
  ownAspectDeg: number; // Own ship's bearing relative to the target's heading
};

/** Assumes risk of collision exists (Rule 7) and both are power-driven vessels in sight of one another. */
export function assessColregSituation(input: ColregInput): ColregAssessment {
  const { ownCourseDeg, targetRelativeBearingDeg, targetCourseDeg } = input;
  if (![ownCourseDeg, targetRelativeBearingDeg, targetCourseDeg].every(isFinite)) throw new Error("Invalid courses or bearing");
  const tol = input.aheadToleranceDeg ?? 6;
  const rel = normalizeAngle(targetRelativeBearingDeg);
  const targetTrueBearing = normalizeAngle(ownCourseDeg + rel);
  const ownAspectDeg = normalizeAngle(targetTrueBearing + 180 - targetCourseDeg);
  const abaft = (x: number) => x > 112.5 && x < 247.5; // more than 22.5° abaft the beam

  if (abaft(ownAspectDeg)) return { situation: "overtaking", role: "give-way", rule: "Rule 13", ownAspectDeg };
  if (abaft(rel)) return { situation: "being-overtaken", role: "stand-on", rule: "Rules 13 and 17", ownAspectDeg };
  if (Math.abs(signedAngle(rel)) <= tol && Math.abs(signedAngle(ownAspectDeg)) <= tol) {
    return { situation: "head-on", role: "both-alter", rule: "Rule 14", ownAspectDeg };
  }
  return rel < 180
    ? { situation: "crossing-starboard", role: "give-way", rule: "Rules 15 and 16", ownAspectDeg }
    : { situation: "crossing-port", role: "stand-on", rule: "Rules 15 and 17", ownAspectDeg };
}

// ---- Tides / UKC / Squat
export type HeightOfTideInput = {
  lowWaterTimeUtc: Date;
  lowWaterHeightM: number;
  highWaterTimeUtc: Date;
  highWaterHeightM: number;
  queryTimeUtc: Date;
};

export type HeightOfTideResult = {
  heightM: number;
  stage: "rising" | "falling";
  fractionOfRange: number; // 0..1 within the LW->HW or HW->LW segment
};

export type TidalStreamInput = {
  // Rates for the hour from the tidal diamond (or tidal stream atlas)
  springRateKn: number;
  neapRateKn: number;
  // Mean spring and neap ranges at the standard port, and the range for the day
  springRangeM: number;
  neapRangeM: number;
  rangeM: number;
};

export type TidalStreamResult = {
  rateKn: number;
  factor: number; // 0 = neaps, 1 = springs
  extrapolated: boolean; // Range for the day outside the neap–spring ranges
};

/** Admiralty method: rate = neap + (spring − neap)·(range − neap range)/(spring range − neap range). */
export function calculateTidalStream(input: TidalStreamInput): TidalStreamResult {
  const { springRateKn, neapRateKn, springRangeM, neapRangeM, rangeM } = input;
  if (![springRateKn, neapRateKn, springRangeM, neapRangeM, rangeM].every(isFinite)) throw new Error("Invalid tidal stream inputs");
  if (springRateKn < 0 || neapRateKn < 0) throw new Error("Rates must be ≥ 0");
  if (springRangeM <= neapRangeM) throw new Error("Spring range must be larger than neap range");
  const factor = (rangeM - neapRangeM) / (springRangeM - neapRangeM);
  return {
    rateKn: Math.max(0, neapRateKn + factor * (springRateKn - neapRateKn)),
    factor,
    extrapolated: factor < 0 || factor > 1,
  };
}

function twelfthsFraction(u: number): number {
  // Map 0..1 to rule-of-twelfths cumulative fraction over 6 hours:
  // at hours 0..6: 0, 1/12, 3/12, 6/12, 9/12, 11/12, 12/12
  // Linear interpolation between points.
  const points = [
    { t: 0, f: 0 },
    { t: 1 / 6, f: 1 / 12 },
    { t: 2 / 6, f: 3 / 12 },
    { t: 3 / 6, f: 6 / 12 },
    { t: 4 / 6, f: 9 / 12 },
    { t: 5 / 6, f: 11 / 12 },
    { t: 1, f: 1 },
  ];
  const x = Math.max(0, Math.min(1, u));
  for (let i = 0; i < points.length - 1; i++) {
    const a = points[i];
    const b = points[i + 1];
    if (x >= a.t && x <= b.t) {
      const k = (x - a.t) / (b.t - a.t);
      return a.f + k * (b.f - a.f);
    }
  }
  return 1;
}

/** Height of tide by the rule of twelfths between consecutive LW and HW (either order). */
export function calculateHeightOfTideAtTime(input: HeightOfTideInput): HeightOfTideResult {
  const { lowWaterTimeUtc, lowWaterHeightM, highWaterTimeUtc, highWaterHeightM, queryTimeUtc } = input;
  const tLW = lowWaterTimeUtc.getTime();
  const tHW = highWaterTimeUtc.getTime();
  const tq = queryTimeUtc.getTime();
  if (!(isFinite(lowWaterHeightM) && isFinite(highWaterHeightM))) throw new Error("Invalid tide heights");
  if (!(isFinite(tLW) && isFinite(tHW) && isFinite(tq))) throw new Error("Invalid times");
  if (tLW === tHW) throw new Error("LW and HW times must differ");
  const start = Math.min(tLW, tHW);
  const end = Math.max(tLW, tHW);
  if (tq < start || tq > end) throw new Error("The time must lie between the low water and the high water");

  const stage: "rising" | "falling" = tLW < tHW ? "rising" : "falling";
  const frac = twelfthsFraction((tq - start) / (end - start));
  const fractionOfRange = stage === "rising" ? frac : 1 - frac;
  return {
    heightM: lowWaterHeightM + fractionOfRange * (highWaterHeightM - lowWaterHeightM),
    stage,
    fractionOfRange,
  };
}

export type TwelfthsRow = { timeUtc: Date; heightM: number; twelfths: number };

/** Seven points (each "tidal hour" = duration/6) from the first event to the second. */
export function ruleOfTwelfthsTable(firstTimeUtc: Date, firstHeightM: number, secondTimeUtc: Date, secondHeightM: number): TwelfthsRow[] {
  const t0 = firstTimeUtc.getTime();
  const t1 = secondTimeUtc.getTime();
  if (!isFinite(t0) || !isFinite(t1) || t1 <= t0) throw new Error("The second time must be after the first");
  if (!isFinite(firstHeightM) || !isFinite(secondHeightM)) throw new Error("Invalid tide heights");
  return [0, 1, 3, 6, 9, 11, 12].map((tw, i) => ({
    timeUtc: new Date(t0 + ((t1 - t0) * i) / 6),
    heightM: firstHeightM + ((secondHeightM - firstHeightM) * tw) / 12,
    twelfths: tw,
  }));
}

export type SecondaryPortCorrection = {
  timeDiffMin: number; // add to primary time
  heightDiffM: number; // add to primary height
};

export function applySecondaryPortCorrection(primaryTimeUtc: Date, primaryHeightM: number, corr: SecondaryPortCorrection): { timeUtc: Date; heightM: number } {
  return {
    timeUtc: new Date(primaryTimeUtc.getTime() + corr.timeDiffMin * 60 * 1000),
    heightM: primaryHeightM + corr.heightDiffM,
  };
}

export type SquatEnvironment = "open" | "confined";

export type SquatInput = {
  speedKn: number;
  blockCoefficient?: number; // typical 0.6..0.85
  environment?: SquatEnvironment;
};

export function estimateSquatBarrass(input: SquatInput): number {
  const V = input.speedKn;
  const Cb = input.blockCoefficient ?? 0.7;
  const env = input.environment ?? "open";
  if (!isFinite(V) || V < 0) throw new Error("Invalid speed");
  if (!isFinite(Cb) || Cb <= 0 || Cb > 1) throw new Error("Invalid block coefficient");
  // Simple Barrass-style approximation (meters)
  const k = env === "confined" ? 2 : 1;
  return (k * Cb * V * V) / 100;
}

export type UkcInput = {
  chartedDepthM: number;
  heightOfTideM: number;
  draftM: number;
  squatM?: number;
  safetyMarginM?: number;
};

export type UkcResult = {
  ukcM: number;
  isSafe: boolean;
};

export function calculateUKC(input: UkcInput): UkcResult {
  const squatM = input.squatM ?? 0;
  const safetyMarginM = input.safetyMarginM ?? 0;
  const ukcM = input.chartedDepthM + input.heightOfTideM - input.draftM - squatM - safetyMarginM;
  return { ukcM, isSafe: ukcM >= 0 };
}

// ---- ECDIS / Route check helpers
export type CrossTrackInput = {
  legStart: LatLon;
  legEnd: LatLon;
  position: LatLon;
};

export type CrossTrackResult = {
  xtdNm: number; // absolute cross track distance in NM
  side: "port" | "starboard" | "on-track";
  alongTrackNm: number; // projection from start along leg
};

export function calculateCrossTrackDistance(input: CrossTrackInput): CrossTrackResult {
  const origin: LatLon = input.legStart;
  const a = latLonToLocalNm(origin, input.legStart);
  const b = latLonToLocalNm(origin, input.legEnd);
  const p = latLonToLocalNm(origin, input.position);
  const abx = b.xNm - a.xNm;
  const aby = b.yNm - a.yNm;
  const apx = p.xNm - a.xNm;
  const apy = p.yNm - a.yNm;
  const ab2 = abx * abx + aby * aby;
  if (ab2 < 1e-9) throw new Error("Leg start/end too close");

  const t = (apx * abx + apy * aby) / ab2;
  const projx = a.xNm + t * abx;
  const projy = a.yNm + t * aby;
  const dx = p.xNm - projx;
  const dy = p.yNm - projy;
  const xtdNmSigned = (abx * apy - aby * apx) / Math.sqrt(ab2); // + means left of track (port) in ENU convention
  const xtdNm = Math.hypot(dx, dy);

  let side: "port" | "starboard" | "on-track" = "on-track";
  if (Math.abs(xtdNmSigned) > 1e-6) side = xtdNmSigned > 0 ? "port" : "starboard";
  return { xtdNm, side, alongTrackNm: t * Math.sqrt(ab2) };
}

export type LookAheadResult = {
  lookAheadDistanceNm: number;
};

export function calculateLookAheadDistance(sogKn: number, lookAheadMinutes: number): LookAheadResult {
  if (!isFinite(sogKn) || !isFinite(lookAheadMinutes) || sogKn < 0 || lookAheadMinutes < 0) throw new Error("Invalid look-ahead inputs");
  return { lookAheadDistanceNm: sogKn * (lookAheadMinutes / 60) };
}

// ---- Astronomical navigation (Sun-focused almanac + sextant correction)
export type SunAlmanacResult = {
  ghaSunDeg: number;
  decSunDeg: number;
  ghaAriesDeg: number;
  gmstDeg: number;
};

function julianDateUtc(dateUtc: Date): number {
  // Unix epoch -> JD
  return dateUtc.getTime() / 86400000 + 2440587.5;
}

function gmstDegFromJulianDate(jd: number): number {
  // IAU 2006-ish: good enough for nav training use
  const T = (jd - 2451545.0) / 36525.0;
  const gmst =
    280.46061837 +
    360.98564736629 * (jd - 2451545.0) +
    0.000387933 * T * T -
    (T * T * T) / 38710000.0;
  return normalizeAngle(gmst);
}

export function computeSunAlmanac(dateUtc: Date): SunAlmanacResult {
  const almanac2025 = getSunAriesAlmanac2025Utc(dateUtc);
  if (almanac2025) {
    // Keep gmstDeg for compatibility with existing callers, even though Aries here is from GAST.
    return {
      ghaSunDeg: almanac2025.ghaSunDeg,
      decSunDeg: almanac2025.decSunDeg,
      ghaAriesDeg: almanac2025.ghaAriesDeg,
      gmstDeg: almanac2025.ghaAriesDeg,
    };
  }

  const jd = julianDateUtc(dateUtc);
  const n = jd - 2451545.0;

  const L = normalizeAngle(280.460 + 0.9856474 * n); // mean longitude
  const g = normalizeAngle(357.528 + 0.9856003 * n); // mean anomaly
  const lambda = normalizeAngle(L + 1.915 * Math.sin(toRadians(g)) + 0.020 * Math.sin(toRadians(2 * g))); // ecliptic longitude
  const epsilon = 23.439 - 0.0000004 * n; // obliquity

  const sinLambda = Math.sin(toRadians(lambda));
  const cosLambda = Math.cos(toRadians(lambda));
  const cosEps = Math.cos(toRadians(epsilon));
  const sinEps = Math.sin(toRadians(epsilon));

  const raRad = Math.atan2(cosEps * sinLambda, cosLambda); // radians, -pi..pi
  const decRad = Math.asin(sinEps * sinLambda);

  const raDeg = normalizeAngle(toDegrees(raRad));
  const decSunDeg = toDegrees(decRad);

  const gmstDeg = gmstDegFromJulianDate(jd);
  const ghaAriesDeg = gmstDeg; // by definition: GHA Aries = GMST (deg)
  const ghaSunDeg = normalizeAngle(gmstDeg - raDeg);

  return { ghaSunDeg, decSunDeg, ghaAriesDeg, gmstDeg };
}

export type SextantCorrectionInput = {
  hsDeg: number; // Sextant altitude (degrees)
  indexErrorMin?: number; // Index error in minutes: + on the arc, − off the arc (subtracted)
  heightOfEyeM?: number;
  pressureHPa?: number; // default 1010
  temperatureC?: number; // default 10
  /** Semi-diameter (minutes): added for a lower limb, subtracted for an upper limb. */
  limb?: "lower" | "upper" | "none";
  semiDiameterMin?: number;
  /** Horizontal parallax (minutes); parallax in altitude = HP · cos Ha. */
  horizontalParallaxMin?: number;
};

export type SextantCorrectionResult = {
  haDeg: number; // Apparent altitude: Hs − IE − dip
  hoDeg: number; // Observed (true) altitude
  dipMin: number;
  refractionMin: number;
  semiDiameterMin: number; // Signed as applied
  parallaxMin: number;
};

/**
 * Altitude corrections (Nautical Almanac): dip = 1.76′√h (m); refraction by Bennett's formula
 * R′ = cot(Ha + 7.31/(Ha + 4.4)) scaled by (P/1010)·(283/(273 + T)); semi-diameter; parallax HP·cos Ha.
 */
export function correctSextantAltitude(input: SextantCorrectionInput): SextantCorrectionResult {
  const hs = input.hsDeg;
  if (!isFinite(hs) || hs < 0 || hs > 90) throw new Error("Invalid sextant altitude");

  const IE = input.indexErrorMin ?? 0;
  const HE = input.heightOfEyeM ?? 0;
  const P = input.pressureHPa ?? 1010;
  const T = input.temperatureC ?? 10;
  if (HE < 0) throw new Error("Height of eye must be ≥ 0");

  const dipMin = 1.76 * Math.sqrt(HE);
  const haDeg = hs - IE / 60 - dipMin / 60;
  if (haDeg < 0) throw new Error("Apparent altitude below the horizon");

  const refractionMin =
    (1 / Math.tan(toRadians(haDeg + 7.31 / (haDeg + 4.4)))) * (P / 1010) * (283 / (273 + T));

  const limb = input.limb ?? "none";
  const sd = input.semiDiameterMin ?? 0;
  const semiDiameterMin = limb === "lower" ? sd : limb === "upper" ? -sd : 0;
  const parallaxMin = (input.horizontalParallaxMin ?? 0) * Math.cos(toRadians(haDeg));

  const hoDeg = haDeg + (-refractionMin + semiDiameterMin + parallaxMin) / 60;
  return { haDeg, hoDeg, dipMin, refractionMin, semiDiameterMin, parallaxMin };
}

export type InterceptSightInput = {
  assumedPosition: LatLon;
  dateUtc: Date;
  hoDeg: number; // corrected observed altitude
  body: "sun";
};

export type InterceptSightResult = {
  ghaDeg: number;
  decDeg: number;
  lhaDeg: number;
  hcDeg: number;
  znDeg: number;
  interceptNm: number; // Ho - Hc (nm)
  towardAway: "toward" | "away";
};

export function computeSunInterceptSight(input: InterceptSightInput): InterceptSightResult {
  const almanac = computeSunAlmanac(input.dateUtc);
  const lhaDeg = normalizeAngle(almanac.ghaSunDeg + input.assumedPosition.lonDeg); // lon East positive => LHA = GHA + λE − λW
  const sr = calculateSightReduction({
    latDeg: input.assumedPosition.latDeg,
    decDeg: almanac.decSunDeg,
    lhaDeg,
  });
  const interceptNm = (input.hoDeg - sr.hcDeg) * 60;
  return {
    ghaDeg: almanac.ghaSunDeg,
    decDeg: almanac.decSunDeg,
    lhaDeg,
    hcDeg: sr.hcDeg,
    znDeg: sr.azimuthDeg,
    interceptNm: Math.abs(interceptNm),
    towardAway: interceptNm >= 0 ? "toward" : "away",
  };
}

export type SightReductionTableRow = {
  lhaDeg: number;
  hcDeg: number;
  znDeg: number;
};

export function generateSightReductionTable(latDeg: number, decDeg: number, lhaStartDeg: number, lhaEndDeg: number, stepDeg: number): SightReductionTableRow[] {
  if (!isFinite(stepDeg) || stepDeg <= 0) throw new Error("Invalid step");
  const rows: SightReductionTableRow[] = [];
  const a = Math.min(lhaStartDeg, lhaEndDeg);
  const b = Math.max(lhaStartDeg, lhaEndDeg);
  for (let lha = a; lha <= b + 1e-9; lha += stepDeg) {
    const r = calculateSightReduction({ latDeg, decDeg, lhaDeg: lha });
    rows.push({ lhaDeg: normalizeAngle(lha), hcDeg: r.hcDeg, znDeg: r.azimuthDeg });
  }
  return rows;
}

export type DailySunAlmanacRow = {
  utcHour: number;
  ghaSunDeg: number;
  decSunDeg: number;
  ghaAriesDeg: number;
};

export function generateDailySunAlmanac(dateUtc: Date): DailySunAlmanacRow[] {
  const base = new Date(Date.UTC(dateUtc.getUTCFullYear(), dateUtc.getUTCMonth(), dateUtc.getUTCDate(), 0, 0, 0));
  const rows: DailySunAlmanacRow[] = [];
  for (let h = 0; h <= 23; h++) {
    const t = new Date(base.getTime() + h * 60 * 60 * 1000);
    const a = computeSunAlmanac(t);
    rows.push({ utcHour: h, ghaSunDeg: a.ghaSunDeg, decSunDeg: a.decSunDeg, ghaAriesDeg: a.ghaAriesDeg });
  }
  return rows;
}

// --- Amplitude (body's centre on the celestial horizon) ---
export type AmplitudeInput = {
  latDeg: number; // North +
  decDeg: number; // North +
  riseOrSet: "rising" | "setting";
  compassBearingDeg?: number; // Observed bearing by the compass to be checked
};

export type AmplitudeResult = {
  amplitudeDeg: number;
  amplitudeName: string; // e.g. "E 20.6° N"
  azimuthDeg: number;    // True bearing Zn
  compassErrorDeg?: number; // + east, − west
};

/**
 * sin A = sin δ / cos φ; A is named E (rising) or W (setting) and N or S like the declination.
 * Zn: rising 090° ∓ A (N/S), setting 270° ± A (N/S). Compass error = true − compass (east +).
 * Centre on the celestial horizon: the lower limb is then about two-thirds of a diameter above the visible horizon (Bowditch).
 */
export function calculateAmplitude(input: AmplitudeInput): AmplitudeResult {
  const { latDeg, decDeg, riseOrSet } = input;
  if (!isFinite(latDeg) || Math.abs(latDeg) >= 90 || !isFinite(decDeg) || Math.abs(decDeg) > 90) throw new Error("Invalid latitude or declination");
  const sinA = Math.sin(toRadians(decDeg)) / Math.cos(toRadians(latDeg));
  if (Math.abs(sinA) > 1) throw new Error("The body does not rise or set at this latitude");
  const signedA = toDegrees(Math.asin(sinA)); // + north
  const amplitudeDeg = Math.abs(signedA);
  const azimuthDeg = normalizeAngle(riseOrSet === "rising" ? 90 - signedA : 270 + signedA);
  const amplitudeName = `${riseOrSet === "rising" ? "E" : "W"} ${amplitudeDeg.toFixed(1)}° ${signedA >= 0 ? "N" : "S"}`;
  const result: AmplitudeResult = { amplitudeDeg, amplitudeName, azimuthDeg };
  if (input.compassBearingDeg !== undefined && isFinite(input.compassBearingDeg)) {
    result.compassErrorDeg = signedAngle(azimuthDeg - input.compassBearingDeg);
  }
  return result;
}
