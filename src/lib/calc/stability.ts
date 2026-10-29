/**
 * Intact stability engine (pure functions, no UI), working from the ship's
 * stability booklet data the way it is done on board: loading table → KG and
 * free surface → GM fluid → GZ from KN cross curves → criteria.
 *
 * Sources:
 *  - IMO 2008 Intact Stability Code (MSC.267(85)), Part A 2.2 general criteria
 *    and 2.3 severe wind and rolling (weather) criterion, tables 2.3.4-1…4.
 *  - International Grain Code (MSC.23(59)), A 7 criteria, B 1.3 / B 1.5 factors.
 *
 * Conventions: angles in degrees, levers and heights in metres, weights in
 * tonnes. Longitudinal positions are metres FORWARD OF THE AFT PERPENDICULAR
 * (convert other booklet conventions with `fromAftPerpendicular`). Transverse
 * positions are metres from the centreline, positive to starboard.
 */

const RAD = Math.PI / 180;

export type LongitudinalReference = "from-aft-perpendicular" | "midships-forward-positive" | "midships-aft-positive";

/** Converts a booklet longitudinal position to metres forward of the AP. */
export function fromAftPerpendicular(value: number, reference: LongitudinalReference, lbp: number): number {
  switch (reference) {
    case "from-aft-perpendicular":
      return value;
    case "midships-forward-positive":
      return lbp / 2 + value;
    case "midships-aft-positive":
      return lbp / 2 - value;
  }
}

// ── Loading condition ───────────────────────────────────────────────────────

export interface LoadItem {
  weight: number;
  vcg: number;
  lcg?: number;
  tcg?: number;
  /** Free surface moment of a slack tank (t·m). */
  fsm?: number;
}

export interface LoadingSummary {
  displacement: number;
  kg: number;
  lcg: number;
  tcg: number;
  totalFsm: number;
}

/** Sums a loading table (lightship included as one item). */
export function summariseLoading(items: LoadItem[]): LoadingSummary {
  const displacement = items.reduce((s, i) => s + i.weight, 0);
  if (!(displacement > 0)) throw new Error("Total displacement must be greater than zero.");
  const moment = (pick: (i: LoadItem) => number) => items.reduce((s, i) => s + i.weight * pick(i), 0);
  return {
    displacement,
    kg: moment((i) => i.vcg) / displacement,
    lcg: moment((i) => i.lcg ?? 0) / displacement,
    tcg: moment((i) => i.tcg ?? 0) / displacement,
    totalFsm: items.reduce((s, i) => s + (i.fsm ?? 0), 0),
  };
}

export interface GmResult {
  gmSolid: number;
  /** Free surface correction (virtual rise of G). */
  fsc: number;
  kgFluid: number;
  gmFluid: number;
}

export function metacentricHeight(km: number, kg: number, totalFsm: number, displacement: number): GmResult {
  const fsc = totalFsm / displacement;
  return { gmSolid: km - kg, fsc, kgFluid: kg + fsc, gmFluid: km - kg - fsc };
}

/** Small-angle list from an off-centre G: tan θ = TCG / GM (fluid). Returns NaN when GM ≤ 0. */
export const listFromTcg = (tcg: number, gmFluid: number) => (gmFluid > 0 ? Math.atan(tcg / gmFluid) / RAD : Number.NaN);

export interface TrimInput {
  displacement: number;
  /** Positions forward of the AP (m). */
  lcg: number;
  lcb: number;
  lcf: number;
  /** Moment to change trim 1 cm (t·m/cm). */
  mctc: number;
  /** Draft from the hydrostatic table at this displacement (even keel). */
  tableDraft: number;
  lbp: number;
}

/** Trim (m, + by the stern) and drafts at the perpendiculars. */
export function trimAndDrafts({ displacement, lcg, lcb, lcf, mctc, tableDraft, lbp }: TrimInput) {
  const trim = (displacement * (lcb - lcg)) / (100 * mctc);
  const aft = tableDraft + (trim * lcf) / lbp;
  const forward = aft - trim;
  return { trim, forward, aft };
}

// ── Weight changes ──────────────────────────────────────────────────────────

/** Shift of G when a weight w is moved a distance d: GG₁ = w·d / Δ. */
export const shiftOfG = (weight: number, distance: number, displacement: number) => (weight * distance) / displacement;

/** New KG after loading (+w) or discharging (−w) a weight with centre kg. */
export function kgAfterWeight(displacement: number, kg: number, weight: number, weightKg: number) {
  const newDisplacement = displacement + weight;
  if (!(newDisplacement > 0)) throw new Error("Resulting displacement must be greater than zero.");
  return { displacement: newDisplacement, kg: (displacement * kg + weight * weightKg) / newDisplacement };
}

/** Heel from a transverse shift: tan θ = (w·d / Δ) / GM. */
export const heelFromShift = (weight: number, distance: number, displacement: number, gm: number) =>
  gm > 0 ? Math.atan(shiftOfG(weight, distance, displacement) / gm) / RAD : Number.NaN;

/** Rise of G when a weight is lifted by a derrick: the weight acts at the derrick head. */
export const suspendedWeightRise = (weight: number, derrickHeadHeight: number, weightKg: number, displacement: number) =>
  (weight * (derrickHeadHeight - weightKg)) / displacement;

/** Free surface moment of a rectangular tank (t·m): ρ · l · b³ / 12. */
export const fsmRectangular = (length: number, breadth: number, density: number) => (density * length * breadth ** 3) / 12;

/** Angle of loll of a wall-sided ship with negative GM: tan θ = √(2|GM| / BM). */
export function angleOfLoll(gm: number, bm: number) {
  if (gm >= 0) return 0;
  return Math.atan(Math.sqrt((2 * Math.abs(gm)) / bm)) / RAD;
}

/** Wall-sided GZ: sin θ · (GM + ½ BM tan² θ). Valid until the deck edge immerses or the bilge emerges. */
export const gzWallSided = (gm: number, bm: number, angle: number) =>
  Math.sin(angle * RAD) * (gm + 0.5 * bm * Math.tan(angle * RAD) ** 2);

/** IS Code 2008 rolling period approximation T = 2·C·B / √GM. */
export function rollingPeriodIsCode(breadth: number, draft: number, lwl: number, gm: number) {
  const c = 0.373 + 0.023 * (breadth / draft) - 0.043 * (lwl / 100);
  return { c, period: (2 * c * breadth) / Math.sqrt(gm) };
}

/** Dry-docking upthrust at the stern: P = MCTC · trim(cm) / l, l = distance from the after keel block point to the LCF. */
export const dockingUpthrust = (mctc: number, trimCm: number, distanceToLcf: number) => (mctc * trimCm) / distanceToLcf;

/** Virtual loss of GM in dry dock (method with KM): P · KM / Δ. */
export const dockingGmLoss = (upthrust: number, km: number, displacement: number) => (upthrust * km) / displacement;

/** Virtual loss of GM in dry dock (method with KG): P · KG / (Δ − P). */
export const dockingGmLossByKg = (upthrust: number, kg: number, displacement: number) => (upthrust * kg) / (displacement - upthrust);

/**
 * Largest trim (cm) at which the ship may take the blocks with effective GM not
 * below `minGm` (KM method): P max = Δ (GM − minGm) / KM, trim = P max · l / MCTC.
 */
export function maxTrimForDocking(displacement: number, gmFluid: number, km: number, mctc: number, distanceToLcf: number, minGm = 0) {
  const pMax = (displacement * (gmFluid - minGm)) / km;
  return { pMax, trimCm: (pMax * distanceToLcf) / mctc };
}

/** Heel from a pendulum or plumb line: tan θ = horizontal deflection / pendulum length. */
export const heelFromPendulum = (deflection: number, length: number) => Math.atan(deflection / length) / RAD;

/** Inclining test: GM = w · d / (Δ · tan θ), θ from the pendulum. */
export const gmFromInclining = (weight: number, shift: number, displacement: number, deflection: number, length: number) =>
  (weight * shift * length) / (displacement * deflection);

// ── GZ curve ────────────────────────────────────────────────────────────────

export interface CurvePoint {
  angle: number;
  value: number;
}

/** GZ = KN − KG(fluid)·sin θ − TCG·cos θ. */
export const gzFromKn = (kn: number, kgFluid: number, angle: number, tcg = 0) =>
  kn - kgFluid * Math.sin(angle * RAD) - tcg * Math.cos(angle * RAD);

export function gzCurveFromKn(kn: CurvePoint[], kgFluid: number, tcg = 0): CurvePoint[] {
  return kn.map((p) => ({ angle: p.angle, value: gzFromKn(p.value, kgFluid, p.angle, tcg) }));
}

/**
 * Shape-preserving piecewise cubic (Fritsch–Carlson / PCHIP) through the
 * points; does not overshoot between table values. Outside the range it holds
 * the end values.
 */
export function smoothCurve(points: CurvePoint[]): (angle: number) => number {
  const pts = [...points].sort((a, b) => a.angle - b.angle);
  if (pts.length < 2) throw new Error("At least two curve points are required.");
  for (let i = 1; i < pts.length; i++) {
    if (pts[i].angle === pts[i - 1].angle) throw new Error("Curve angles must be different.");
  }
  const n = pts.length;
  const h = pts.slice(1).map((p, i) => p.angle - pts[i].angle);
  const delta = pts.slice(1).map((p, i) => (p.value - pts[i].value) / h[i]);
  const m = new Array<number>(n);
  if (n === 2) {
    m[0] = m[1] = delta[0];
  } else {
    for (let i = 1; i < n - 1; i++) {
      if (delta[i - 1] * delta[i] <= 0) m[i] = 0;
      else {
        const w1 = 2 * h[i] + h[i - 1];
        const w2 = h[i] + 2 * h[i - 1];
        m[i] = (w1 + w2) / (w1 / delta[i - 1] + w2 / delta[i]);
      }
    }
    const end = (h0: number, h1: number, d0: number, d1: number) => {
      let d = ((2 * h0 + h1) * d0 - h0 * d1) / (h0 + h1);
      if (Math.sign(d) !== Math.sign(d0)) d = 0;
      else if (Math.sign(d0) !== Math.sign(d1) && Math.abs(d) > Math.abs(3 * d0)) d = 3 * d0;
      return d;
    };
    m[0] = end(h[0], h[1], delta[0], delta[1]);
    m[n - 1] = end(h[n - 2], h[n - 3], delta[n - 2], delta[n - 3]);
  }
  return (x: number) => {
    if (x <= pts[0].angle) return pts[0].value;
    if (x >= pts[n - 1].angle) return pts[n - 1].value;
    let i = 0;
    while (x > pts[i + 1].angle) i++;
    const t = (x - pts[i].angle) / h[i];
    const t2 = t * t;
    const t3 = t2 * t;
    return (
      (2 * t3 - 3 * t2 + 1) * pts[i].value +
      (t3 - 2 * t2 + t) * h[i] * m[i] +
      (-2 * t3 + 3 * t2) * pts[i + 1].value +
      (t3 - t2) * h[i] * m[i + 1]
    );
  };
}

/** ∫ f dθ from a to b (degrees in, metre-radians out), composite Simpson. */
export function area(f: (angle: number) => number, from: number, to: number, stepDeg = 0.1) {
  if (to <= from) return 0;
  let n = Math.max(2, Math.ceil((to - from) / stepDeg));
  if (n % 2) n++;
  const h = (to - from) / n;
  let s = f(from) + f(to);
  for (let i = 1; i < n; i++) s += f(from + i * h) * (i % 2 ? 4 : 2);
  return (s * h * RAD) / 3;
}

/** First angle in [from, to] where g changes sign (bisection on a 0.1° scan); NaN if none. */
export function firstRoot(g: (angle: number) => number, from: number, to: number) {
  let a = from;
  let ga = g(a);
  if (ga === 0) return a;
  for (let b = from + 0.1; b <= to + 1e-9; b += 0.1) {
    const gb = g(b);
    if (ga * gb <= 0) {
      let lo = a;
      let hi = b;
      for (let k = 0; k < 60; k++) {
        const mid = (lo + hi) / 2;
        if (g(lo) * g(mid) <= 0) hi = mid;
        else lo = mid;
      }
      return (lo + hi) / 2;
    }
    a = b;
    ga = gb;
  }
  return Number.NaN;
}

function maxOf(f: (angle: number) => number, from: number, to: number) {
  let best = { angle: from, value: f(from) };
  for (let x = from; x <= to + 1e-9; x += 0.1) {
    const v = f(x);
    if (v > best.value) best = { angle: x, value: v };
  }
  const end = f(to);
  if (end >= best.value) best = { angle: to, value: end };
  return best;
}

// ── IS Code 2008 Part A 2.2 ─────────────────────────────────────────────────

export interface Criterion {
  id: string;
  label: string;
  required: string;
  actual: string;
  pass: boolean;
}

export interface GeneralCriteriaResult {
  area0to30: number;
  area0to40: number;
  area30to40: number;
  /** Upper limit used for the 40° areas (40° or the downflooding angle if less). */
  upperAngle: number;
  gzAt30: number;
  maxGz: CurvePoint;
  criteria: Criterion[];
}

const f3 = (v: number) => v.toFixed(3);

export function isCodeGeneralCriteria(gz: CurvePoint[], gm0: number, downfloodingAngle?: number): GeneralCriteriaResult {
  const curve = smoothCurve(gz);
  const top = Math.max(...gz.map((p) => p.angle));
  if (top < 40) throw new Error("The GZ curve must extend to at least 40°.");
  const upper = downfloodingAngle !== undefined && downfloodingAngle < 40 ? downfloodingAngle : 40;
  const a30 = area(curve, 0, Math.min(30, upper));
  const a40 = area(curve, 0, upper);
  const a3040 = upper > 30 ? area(curve, 30, upper) : 0;
  const maxGz = maxOf(curve, 0, top);
  // 2.2.2: GZ ≥ 0.20 m at an angle ≥ 30° → the largest GZ found at or beyond 30°.
  const gzBeyond30 = maxOf(curve, 30, top);
  return {
    area0to30: a30,
    area0to40: a40,
    area30to40: a3040,
    upperAngle: upper,
    gzAt30: curve(30),
    maxGz,
    criteria: [
      { id: "a30", label: "Area 0° – 30°", required: "≥ 0.055 m·rad", actual: `${f3(a30)} m·rad`, pass: a30 >= 0.055 },
      { id: "a40", label: `Area 0° – ${upper === 40 ? "40°" : `θf ${upper.toFixed(1)}°`}`, required: "≥ 0.090 m·rad", actual: `${f3(a40)} m·rad`, pass: a40 >= 0.09 },
      { id: "a3040", label: `Area 30° – ${upper === 40 ? "40°" : `θf ${upper.toFixed(1)}°`}`, required: "≥ 0.030 m·rad", actual: `${f3(a3040)} m·rad`, pass: a3040 >= 0.03 },
      { id: "gz30", label: "GZ at an angle ≥ 30°", required: "≥ 0.20 m", actual: `${f3(gzBeyond30.value)} m at ${gzBeyond30.angle.toFixed(1)}°`, pass: gzBeyond30.value >= 0.2 },
      { id: "maxgz", label: "Angle of maximum GZ", required: "≥ 25°", actual: `${maxGz.angle.toFixed(1)}°`, pass: maxGz.angle >= 25 },
      { id: "gm0", label: "Initial GM (fluid)", required: "≥ 0.15 m", actual: `${f3(gm0)} m`, pass: gm0 >= 0.15 },
    ],
  };
}

// ── IS Code 2008 Part A 2.3 weather criterion ───────────────────────────────

type Table = Array<[number, number]>;

/** Linear interpolation in a table, holding the end values outside it (as the Code's ≤/≥ rows do). */
export function tableLookup(table: Table, x: number) {
  if (x <= table[0][0]) return table[0][1];
  const last = table[table.length - 1];
  if (x >= last[0]) return last[1];
  for (let i = 1; i < table.length; i++) {
    const [x1, y1] = table[i];
    const [x0, y0] = table[i - 1];
    if (x <= x1) return y0 + ((y1 - y0) * (x - x0)) / (x1 - x0);
  }
  return last[1];
}

/** IS Code 2008 Table 2.3.4-1: X1 vs B/d. */
export const TABLE_X1: Table = [[2.4, 1.0], [2.5, 0.98], [2.6, 0.96], [2.7, 0.95], [2.8, 0.93], [2.9, 0.91], [3.0, 0.9], [3.1, 0.88], [3.2, 0.86], [3.4, 0.82], [3.5, 0.8]];
/** Table 2.3.4-2: X2 vs CB. */
export const TABLE_X2: Table = [[0.45, 0.75], [0.5, 0.82], [0.55, 0.89], [0.6, 0.95], [0.65, 0.97], [0.7, 1.0]];
/** Table 2.3.4-3: k vs Ak·100/(Lwl·B), ships with bilge keels or a bar keel. */
export const TABLE_K: Table = [[0, 1.0], [1.0, 0.98], [1.5, 0.95], [2.0, 0.88], [2.5, 0.79], [3.0, 0.74], [3.5, 0.72], [4.0, 0.7]];
/** Table 2.3.4-4: s vs rolling period T (s). */
export const TABLE_S: Table = [[6, 0.1], [7, 0.098], [8, 0.093], [12, 0.065], [14, 0.053], [16, 0.044], [18, 0.038], [20, 0.035]];

export type BilgeType = "round-no-keels" | "sharp" | "bilge-keels";

export interface WeatherInput {
  gz: CurvePoint[];
  displacement: number;
  /** Projected lateral windage area above the waterline (m²). */
  windArea: number;
  /** Lever from centre of windage area to centre of underwater lateral area (≈ half draft) (m). */
  windLever: number;
  breadth: number;
  meanDraft: number;
  lwl: number;
  blockCoefficient: number;
  kg: number;
  gmFluid: number;
  bilge: BilgeType;
  /** Total bilge keel / bar keel area Ak (m²), for "bilge-keels". */
  bilgeKeelArea?: number;
  downfloodingAngle?: number;
  deckEdgeAngle?: number;
  /** Rolling period if known from tests; otherwise the Code approximation is used. */
  rollingPeriod?: number;
  windPressure?: number;
}

export interface WeatherResult {
  lw1: number;
  lw2: number;
  theta0: number;
  theta0Limit: number;
  theta1: number;
  factors: { x1: number; x2: number; k: number; r: number; s: number; period: number };
  thetaA: number;
  theta2: number;
  areaA: number;
  areaB: number;
  criteria: Criterion[];
  /** Notes when the ship is outside the range the tables were derived from (2.3.5). */
  rangeWarnings: string[];
}

export function weatherCriterion(input: WeatherInput): WeatherResult {
  const g = 9.81;
  const P = input.windPressure ?? 504;
  const lw1 = (P * input.windArea * input.windLever) / (1000 * g * input.displacement);
  const lw2 = 1.5 * lw1;
  const gzPos = smoothCurve(input.gz);
  const top = Math.max(...input.gz.map((p) => p.angle));
  const gz = (angle: number) => (angle >= 0 ? gzPos(angle) : -gzPos(-angle));

  const theta0 = firstRoot((a) => gz(a) - lw1, 0, top);
  if (!Number.isFinite(theta0)) throw new Error("The steady wind lever lw1 does not intersect the GZ curve.");
  const theta0Limit = Math.min(16, input.deckEdgeAngle !== undefined ? 0.8 * input.deckEdgeAngle : 16);

  const bd = input.breadth / input.meanDraft;
  const x1 = tableLookup(TABLE_X1, bd);
  const x2 = tableLookup(TABLE_X2, input.blockCoefficient);
  const k =
    input.bilge === "round-no-keels"
      ? 1.0
      : input.bilge === "sharp"
        ? 0.7
        : tableLookup(TABLE_K, ((input.bilgeKeelArea ?? 0) * 100) / (input.lwl * input.breadth));
  const og = input.kg - input.meanDraft;
  const r = 0.73 + (0.6 * og) / input.meanDraft;
  const period = input.rollingPeriod ?? rollingPeriodIsCode(input.breadth, input.meanDraft, input.lwl, input.gmFluid).period;
  const s = tableLookup(TABLE_S, period);
  const theta1 = 109 * k * x1 * x2 * Math.sqrt(r * s);

  const thetaA = firstRoot((a) => gz(a) - lw2, theta0, top);
  if (!Number.isFinite(thetaA)) throw new Error("The gust wind lever lw2 does not intersect the GZ curve.");
  const thetaC = firstRoot((a) => gz(a) - lw2, thetaA + 0.5, top);
  const theta2 = Math.min(input.downfloodingAngle ?? 50, 50, Number.isFinite(thetaC) ? thetaC : 50);

  const areaA = area((a) => lw2 - gz(a), theta0 - theta1, thetaA);
  const areaB = theta2 > thetaA ? area((a) => gz(a) - lw2, thetaA, theta2) : 0;

  const rangeWarnings: string[] = [];
  if (bd >= 3.5) rangeWarnings.push("B/d is 3.5 or more: outside the range the roll tables were derived from (2.3.5).");
  const kgd = input.kg / input.meanDraft - 1;
  if (kgd < -0.3 || kgd > 0.5) rangeWarnings.push("KG/d − 1 is outside −0.3 … 0.5 (2.3.5).");
  if (period >= 20) rangeWarnings.push("Rolling period is 20 s or more (2.3.5).");

  return {
    lw1,
    lw2,
    theta0,
    theta0Limit,
    theta1,
    factors: { x1, x2, k, r, s, period },
    thetaA,
    theta2,
    areaA,
    areaB,
    criteria: [
      { id: "theta0", label: "Heel under steady wind θ0", required: `≤ ${theta0Limit.toFixed(1)}°`, actual: `${theta0.toFixed(1)}°`, pass: theta0 <= theta0Limit },
      { id: "ab", label: "Area b against area a", required: "b ≥ a", actual: `b ${f3(areaB)} / a ${f3(areaA)} m·rad`, pass: areaB >= areaA },
    ],
    rangeWarnings,
  };
}

// ── Grain Code ──────────────────────────────────────────────────────────────

export interface GrainHold {
  /** Volumetric heeling moment from the grain loading manual (m⁴). */
  volumetricMoment: number;
  /**
   * 1.00 filled & trimmed (G at centre of the whole space) or untrimmed;
   * 1.06 filled & trimmed when underdeck voids are used for VCG (B 1.3);
   * 1.12 partly filled (B 1.5). Use 1.00 if the manual's figures already include it.
   */
  factor: number;
}

/** Total grain heeling moment in t·m: Σ(Mv × factor) / SF. */
export function grainHeelingMoment(holds: GrainHold[], stowageFactor: number) {
  const volumetric = holds.reduce((s, h) => s + h.volumetricMoment * h.factor, 0);
  return { volumetric, tonneMetres: volumetric / stowageFactor };
}

export interface GrainInput {
  gz: CurvePoint[];
  displacement: number;
  gmFluid: number;
  /** Σ(Mv × factor) in m⁴. */
  volumetricMoment: number;
  stowageFactor: number;
  downfloodingAngle?: number;
  /** Required for ships built on or after 1 Jan 1994. */
  deckEdgeAngle?: number;
}

export interface GrainResult {
  lambda0: number;
  lambda40: number;
  heelAngle: number;
  heelLimit: number;
  residualArea: number;
  residualUpper: number;
  criteria: Criterion[];
}

export function grainCriteria(input: GrainInput): GrainResult {
  const lambda0 = input.volumetricMoment / (input.stowageFactor * input.displacement);
  const lambda40 = 0.8 * lambda0;
  const heelArm = (a: number) => lambda0 + ((lambda40 - lambda0) * a) / 40;
  const gz = smoothCurve(input.gz);
  const top = Math.max(...input.gz.map((p) => p.angle));
  if (top < 40) throw new Error("The GZ curve must extend to at least 40°.");
  const diff = (a: number) => gz(a) - heelArm(a);
  const heelAngle = firstRoot(diff, 0, top);
  if (!Number.isFinite(heelAngle)) throw new Error("The grain heeling arm does not intersect the GZ curve.");
  const heelLimit = Math.min(12, input.deckEdgeAngle ?? 12);
  const maxDiff = maxOf(diff, heelAngle, Math.min(40, top));
  const residualUpper = Math.min(maxDiff.angle, 40, input.downfloodingAngle ?? 40);
  const residualArea = area(diff, heelAngle, residualUpper);
  return {
    lambda0,
    lambda40,
    heelAngle,
    heelLimit,
    residualArea,
    residualUpper,
    criteria: [
      { id: "heel", label: "Angle of heel from grain shift", required: `≤ ${heelLimit.toFixed(1)}°`, actual: `${heelAngle.toFixed(1)}°`, pass: heelAngle <= heelLimit },
      { id: "residual", label: `Residual area up to ${residualUpper.toFixed(1)}°`, required: "≥ 0.075 m·rad", actual: `${f3(residualArea)} m·rad`, pass: residualArea >= 0.075 },
      { id: "gm", label: "Initial GM (fluid)", required: "≥ 0.30 m", actual: `${f3(input.gmFluid)} m`, pass: input.gmFluid >= 0.3 },
    ],
  };
}
