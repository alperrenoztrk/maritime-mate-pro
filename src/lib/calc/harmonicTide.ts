/**
 * Harmonic tide prediction with the NOAA convention (Schureman, Manual of
 * Harmonic Analysis and Prediction of Tides, SP 98):
 *
 *   h(t) = Z0 + Σ f·H·cos(V + u − κ)
 *
 * V: equilibrium argument at t from the mean longitudes T, s, h, p, p₁;
 * f, u: node factor and nodal correction from the lunar node N;
 * H, κ: NOAA amplitude and Greenwich phase (phase_GMT).
 * Only NOAA's 37 standard constituents are defined.
 */

const RAD = Math.PI / 180;
const norm = (x: number) => ((x % 360) + 360) % 360;
const atanDeg = (y: number, x: number) => Math.atan2(y, x) / RAD;

export interface Astro {
  /** Hour angle of the mean sun + 180°, s, h, p, N, p₁ (degrees). */
  T: number;
  s: number;
  h: number;
  p: number;
  N: number;
  p1: number;
}

/** Mean longitudes (Meeus; T in Julian centuries from J2000.0, UT used for TT). */
export function astro(date: Date): Astro {
  const jd = date.getTime() / 86400000 + 2440587.5;
  const c = (jd - 2451545.0) / 36525;
  const hoursUt = ((date.getTime() / 3600000) % 24 + 24) % 24;
  return {
    T: norm(180 + 15 * hoursUt),
    s: norm(218.3164477 + 481267.88123421 * c - 0.0015786 * c * c),
    h: norm(280.46646 + 36000.76983 * c + 0.0003032 * c * c),
    p: norm(83.3532465 + 4069.0137287 * c - 0.01032 * c * c),
    N: norm(125.04452 - 1934.136261 * c + 0.0020708 * c * c),
    p1: norm(282.93735 + 1.71946 * c + 0.00046 * c * c),
  };
}

export interface Nodal {
  I: number;
  nu: number;
  xi: number;
  nup: number;
  nupp2: number;
  /** P = p − ξ */
  P: number;
}

/** Schureman's lunar orbit angles from the node N and perigee p (degrees). */
export function nodal(a: Astro): Nodal {
  const w = 23.452 * RAD; // obliquity used by Schureman
  const i = 5.145 * RAD; // inclination of the lunar orbit
  const N = a.N * RAD;
  const cosI = Math.cos(w) * Math.cos(i) - Math.sin(w) * Math.sin(i) * Math.cos(N);
  const I = Math.acos(cosI);
  const nu = Math.asin((Math.sin(i) * Math.sin(N)) / Math.sin(I));
  // tan ½(N − ξ + ν) = 1.01883 tan ½N ; tan ½(N − ξ − ν) = 0.64412 tan ½N
  const halfN = N / 2;
  const A = Math.atan(1.01883 * Math.tan(halfN)) + Math.round(halfN / Math.PI) * Math.PI;
  const B = Math.atan(0.64412 * Math.tan(halfN)) + Math.round(halfN / Math.PI) * Math.PI;
  const xi = N - A - B;
  const sin2I = Math.sin(2 * I);
  const nup = Math.atan2(sin2I * Math.sin(nu), sin2I * Math.cos(nu) + 0.3347);
  const s2I = Math.sin(I) ** 2;
  const nupp2 = Math.atan2(s2I * Math.sin(2 * nu), s2I * Math.cos(2 * nu) + 0.0727);
  return { I: I / RAD, nu: nu / RAD, xi: xi / RAD, nup: nup / RAD, nupp2: nupp2 / RAD, P: norm(a.p - xi / RAD) };
}

type Fu = { f: number; u: number };

function factors(n: Nodal) {
  const I = n.I * RAD;
  const sinI = Math.sin(I);
  const cosHalf = Math.cos(I / 2);
  const sinHalf = Math.sin(I / 2);
  const nu = n.nu * RAD;
  const P = n.P * RAD;
  const m2: Fu = { f: cosHalf ** 4 / 0.9154, u: 2 * n.xi - 2 * n.nu };
  const o1: Fu = { f: (sinI * cosHalf ** 2) / 0.38, u: 2 * n.xi - n.nu };
  const k1: Fu = {
    f: Math.sqrt(0.8965 * Math.sin(2 * I) ** 2 + 0.6001 * Math.sin(2 * I) * Math.cos(nu) + 0.1006),
    u: -n.nup,
  };
  const k2: Fu = {
    f: Math.sqrt(19.0444 * sinI ** 4 + 2.7702 * sinI ** 2 * Math.cos(2 * nu) + 0.0981),
    u: -n.nupp2,
  };
  const j1: Fu = { f: Math.sin(2 * I) / 0.7214, u: -n.nu };
  const oo1: Fu = { f: (sinI * sinHalf ** 2) / 0.0164, u: -2 * n.xi - n.nu };
  const mm: Fu = { f: (2 / 3 - sinI ** 2) / 0.5021, u: 0 };
  const mf: Fu = { f: sinI ** 2 / 0.1578, u: -2 * n.xi };
  const m3: Fu = { f: cosHalf ** 6 / 0.8758, u: 3 * n.xi - 3 * n.nu };
  // L2 (Schureman 213–215): R and 1/Ra
  const t2 = Math.tan(I / 2) ** 2;
  const R = Math.atan2(Math.sin(2 * P), 1 / (6 * t2) - Math.cos(2 * P)) / RAD;
  const invRa = Math.sqrt(1 - 12 * t2 * Math.cos(2 * P) + 36 * t2 * t2);
  const l2: Fu = { f: m2.f * invRa, u: 2 * n.xi - 2 * n.nu - R };
  // M1 (Schureman 197–207): Q and 1/Qa
  const cosI = Math.cos(I);
  const Q = atanDeg(((5 * cosI - 1) / (7 * cosI + 1)) * Math.sin(P), Math.cos(P));
  const invQa = Math.sqrt(0.25 + 1.5 * (cosI / cosHalf ** 2) * Math.cos(2 * P) + 2.25 * (cosI / cosHalf ** 2) ** 2);
  // Sign of Q and the V constant fixed by comparison with NOAA's published predictions.
  const m1: Fu = { f: o1.f * invQa, u: n.xi - n.nu - Q };
  return { m2, o1, k1, k2, j1, oo1, mm, mf, m3, l2, m1 };
}

const one: Fu = { f: 1, u: 0 };
const comb = (...parts: Array<[Fu, number]>): Fu => ({
  f: parts.reduce((f, [x, k]) => f * x.f ** Math.abs(k), 1),
  u: parts.reduce((u, [x, k]) => u + k * x.u, 0),
});

/** V coefficients on [T, s, h, p, p₁] plus a constant, and the f/u rule. */
type Def = { v: [number, number, number, number, number, number]; fu: (x: ReturnType<typeof factors>) => Fu };

export const CONSTITUENTS: Record<string, Def> = {
  M2: { v: [2, -2, 2, 0, 0, 0], fu: (x) => x.m2 },
  S2: { v: [2, 0, 0, 0, 0, 0], fu: () => one },
  N2: { v: [2, -3, 2, 1, 0, 0], fu: (x) => x.m2 },
  K1: { v: [1, 0, 1, 0, 0, -90], fu: (x) => x.k1 },
  M4: { v: [4, -4, 4, 0, 0, 0], fu: (x) => comb([x.m2, 2]) },
  O1: { v: [1, -2, 1, 0, 0, 90], fu: (x) => x.o1 },
  M6: { v: [6, -6, 6, 0, 0, 0], fu: (x) => comb([x.m2, 3]) },
  MK3: { v: [3, -2, 3, 0, 0, -90], fu: (x) => comb([x.m2, 1], [x.k1, 1]) },
  S4: { v: [4, 0, 0, 0, 0, 0], fu: () => one },
  MN4: { v: [4, -5, 4, 1, 0, 0], fu: (x) => comb([x.m2, 2]) },
  NU2: { v: [2, -3, 4, -1, 0, 0], fu: (x) => x.m2 },
  S6: { v: [6, 0, 0, 0, 0, 0], fu: () => one },
  MU2: { v: [2, -4, 4, 0, 0, 0], fu: (x) => x.m2 },
  "2N2": { v: [2, -4, 2, 2, 0, 0], fu: (x) => x.m2 },
  OO1: { v: [1, 2, 1, 0, 0, -90], fu: (x) => x.oo1 },
  LAM2: { v: [2, -1, 0, 1, 0, 180], fu: (x) => x.m2 },
  S1: { v: [1, 0, 0, 0, 0, 0], fu: () => one },
  M1: { v: [1, -1, 1, 1, 0, 0], fu: (x) => x.m1 },
  J1: { v: [1, 1, 1, -1, 0, -90], fu: (x) => x.j1 },
  MM: { v: [0, 1, 0, -1, 0, 0], fu: (x) => x.mm },
  SSA: { v: [0, 0, 2, 0, 0, 0], fu: () => one },
  SA: { v: [0, 0, 1, 0, 0, 0], fu: () => one },
  MSF: { v: [0, 2, -2, 0, 0, 0], fu: (x) => comb([x.m2, -1]) },
  MF: { v: [0, 2, 0, 0, 0, 0], fu: (x) => x.mf },
  RHO: { v: [1, -3, 3, -1, 0, 90], fu: (x) => x.o1 },
  Q1: { v: [1, -3, 1, 1, 0, 90], fu: (x) => x.o1 },
  T2: { v: [2, 0, -1, 0, 1, 0], fu: () => one },
  R2: { v: [2, 0, 1, 0, -1, 180], fu: () => one },
  "2Q1": { v: [1, -4, 1, 2, 0, 90], fu: (x) => x.o1 },
  P1: { v: [1, 0, -1, 0, 0, 90], fu: () => one },
  "2SM2": { v: [2, 2, -2, 0, 0, 0], fu: (x) => comb([x.m2, -1]) },
  M3: { v: [3, -3, 3, 0, 0, 0], fu: (x) => x.m3 },
  L2: { v: [2, -1, 2, -1, 0, 180], fu: (x) => x.l2 },
  "2MK3": { v: [3, -4, 3, 0, 0, 90], fu: (x) => comb([x.m2, 2], [x.k1, -1]) },
  K2: { v: [2, 0, 2, 0, 0, 0], fu: (x) => x.k2 },
  M8: { v: [8, -8, 8, 0, 0, 0], fu: (x) => comb([x.m2, 4]) },
  MS4: { v: [4, -2, 2, 0, 0, 0], fu: (x) => x.m2 },
};

export type Harmonic = [name: string, amplitude: number, phaseGreenwich: number];

/** Height above the datum of Z0 (m) at an instant. Throws for a constituent that is not defined. */
export function harmonicHeight(constituents: Harmonic[], z0: number, date: Date): number {
  const a = astro(date);
  // NOAA holds f and u at their values for the middle of the year.
  const x = factors(nodal(astro(new Date(Date.UTC(date.getUTCFullYear(), 6, 2, 12)))));
  let h = z0;
  for (const [name, H, kappa] of constituents) {
    const def = CONSTITUENTS[name];
    if (!def) throw new Error(`Constituent ${name} is not supported`);
    const [cT, cs, ch, cp, cp1, k] = def.v;
    const V = cT * a.T + cs * a.s + ch * a.h + cp * a.p + cp1 * a.p1 + k;
    const { f, u } = def.fu(x);
    h += f * H * Math.cos((V + u - kappa) * RAD);
  }
  return h;
}
