import * as THREE from "three";
import type { ShipType } from "./ShipModel3D";

/**
 * Procedurally lofted merchant-ship hull.
 *
 * The hull is built the way a naval architect drafts a lines plan: a set of
 * transverse stations (cross-sections) from the transom to the stem, each a
 * superellipse quadrant (Lamé curve) so the bilge radius and flat bottom
 * emerge from a single "fullness" exponent, lofted into one indexed
 * BufferGeometry with smooth vertex normals.
 *
 * Coordinate contract (must match ShipModel3D / Stability3DSim):
 *   +X bow, +Y up, +Z starboard; KEEL_Y=-0.8, design waterline WL_Y=-0.1,
 *   the parent group lifts the model +0.1·scale so the waterline is world y=0.
 *
 * UVs are load-bearing: u is length-linear (stern→bow) and v height-linear
 * (keel→texture top), so the boot-top band, draft marks and Plimsoll mark
 * painted in the hull texture land at physically exact heights on every
 * section regardless of its shape. Texture painters must use texU()/texV().
 */

export const HALF = 3.5; // half length overall
export const BEAM = 1.28; // moulded beam at midship waterline
export const KEEL_Y = -0.8;
export const WL_Y = -0.1;
export const DECK_Y = 0.54; // base main-deck height before sheer/deckRise
export const HULL_TEX_TOP_Y = DECK_Y + 0.36; // v=1 in the hull texture (clears max sheer+deckRise)
/** 1 m of real draft in hull-local units — design draft 6.5 m spans keel→WL.
 *  Single source of truth for draft marks (textures) and hull immersion (scene). */
export const UNITS_PER_METER = (WL_Y - KEEL_Y) / 6.5;

const NS = 48; // stations, transom (i=0) → stem (i=NS)
const NJ = 12; // points per half-section, keel (jj=0) → deck edge (jj=NJ-1)
const R = 2 * NJ - 1; // ring size (keel point shared, deck edges distinct)
const NB = 7; // extra rows lofting the bulbous bow forward of the stem
const MIN_HB = 0.012; // half-beam clamp at the stem — never degenerate
const T_CLUSTER = 1.5; // cluster section points toward the bilge

/** Map a hull-local x to texture u. Single source of truth for texture art. */
export const texU = (x: number) => (x + HALF + 0.35) / (2 * HALF + 0.75);
/** Map a hull-local y to texture v. Single source of truth for texture art. */
export const texV = (y: number) => (y - KEEL_Y) / (HULL_TEX_TOP_Y - KEEL_Y);

export interface HullForm {
  /** Superellipse exponent at midship — high = wall-sided/flat-bottomed. */
  midshipFullness: number;
  /** u-range of full-beam parallel midbody. */
  parallelMidbody: [number, number];
  /** Plan-taper exponent at the bow — high = full/blunt entrance. */
  bowEntrance: number;
  /** Above-waterline widening of forward sections. */
  bowFlare: number;
  /** Forward shear of the stem, proportional to height² (raked stem). */
  stemRake: number;
  /** Transom width at deck / at waterline, as fraction of beam. */
  transomWidthFrac: number;
  transomWidthFracWL: number;
  /** Depth of the transom bottom below WL (counter stern rise). */
  counterRise: number;
  /** Depth of the forefoot below WL where the bulb attaches. */
  forefootRise: number;
  /** Bottom V angle folded into low sections. */
  deadrise: number;
  /** Deck-edge rise at bow / stern (sheer). */
  sheerFwd: number;
  sheerAft: number;
  /** Freeboard adjustment: roro/passenger ride high, tanker low. */
  deckRise: number;
  bulb: { length: number; radius: number } | null;
}

export const hullForms: Record<ShipType, HullForm> = {
  container: {
    midshipFullness: 3.2,
    parallelMidbody: [0.35, 0.68],
    bowEntrance: 2.1,
    bowFlare: 0.55,
    stemRake: 0.45,
    transomWidthFrac: 0.74,
    transomWidthFracWL: 0.42,
    counterRise: 0.18,
    forefootRise: 0.25,
    deadrise: 0.03,
    sheerFwd: 0.1,
    sheerAft: 0.05,
    deckRise: 0,
    bulb: { length: 0.34, radius: 0.13 },
  },
  tanker: {
    midshipFullness: 5.2,
    parallelMidbody: [0.28, 0.78],
    bowEntrance: 3.2,
    bowFlare: 0.2,
    stemRake: 0.18,
    transomWidthFrac: 0.68,
    transomWidthFracWL: 0.46,
    counterRise: 0.16,
    forefootRise: 0.18,
    deadrise: 0,
    sheerFwd: 0.06,
    sheerAft: 0.03,
    deckRise: -0.04,
    bulb: { length: 0.3, radius: 0.15 },
  },
  bulk: {
    midshipFullness: 4.6,
    parallelMidbody: [0.3, 0.75],
    bowEntrance: 2.9,
    bowFlare: 0.25,
    stemRake: 0.2,
    transomWidthFrac: 0.7,
    transomWidthFracWL: 0.45,
    counterRise: 0.16,
    forefootRise: 0.2,
    deadrise: 0,
    sheerFwd: 0.07,
    sheerAft: 0.04,
    deckRise: 0,
    bulb: { length: 0.3, radius: 0.14 },
  },
  roro: {
    midshipFullness: 3.6,
    parallelMidbody: [0.3, 0.7],
    bowEntrance: 2.2,
    bowFlare: 0.4,
    stemRake: 0.5,
    transomWidthFrac: 0.92, // near-square stern for the ramp
    transomWidthFracWL: 0.6,
    counterRise: 0.2,
    forefootRise: 0.24,
    deadrise: 0.02,
    sheerFwd: 0.08,
    sheerAft: 0.02,
    deckRise: 0.22,
    bulb: { length: 0.3, radius: 0.12 },
  },
  passenger: {
    midshipFullness: 2.7,
    parallelMidbody: [0.32, 0.66],
    bowEntrance: 1.9,
    bowFlare: 0.5,
    stemRake: 0.55,
    transomWidthFrac: 0.85,
    transomWidthFracWL: 0.5,
    counterRise: 0.22,
    forefootRise: 0.26,
    deadrise: 0.04,
    sheerFwd: 0.09,
    sheerAft: 0.04,
    deckRise: 0.12,
    bulb: { length: 0.34, radius: 0.12 },
  },
};

/* ─── station scalar curves, all functions of u = i/NS (0 stern → 1 bow) ─── */

const clamp01 = (x: number) => Math.min(Math.max(x, 0), 1);
const smooth = (a: number, b: number, x: number) => {
  const t = clamp01((x - a) / (b - a));
  return t * t * (3 - 2 * t);
};
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

function planHalfBeam(f: HullForm, u: number, frac: number, entrance: number): number {
  const [p0, p1] = f.parallelMidbody;
  const b = BEAM / 2;
  if (u < p0) {
    const s = Math.pow(smooth(0, p0, u), 0.8);
    return Math.max(b * lerp(frac, 1, s), MIN_HB);
  }
  if (u > p1) {
    const t = (u - p1) / (1 - p1);
    return Math.max(b * (1 - Math.pow(t, entrance)), MIN_HB);
  }
  return b;
}

const halfBeamDeck = (f: HullForm, u: number) => planHalfBeam(f, u, f.transomWidthFrac, f.bowEntrance);
const halfBeamWL = (f: HullForm, u: number) => planHalfBeam(f, u, f.transomWidthFracWL, f.bowEntrance * 0.8);

/** Bulb axis height — a little below the forefoot so the top fairs into the stem. */
const bulbCenterY = (f: HullForm) =>
  f.bulb ? WL_Y - f.forefootRise - 0.35 * f.bulb.radius : WL_Y - f.forefootRise;

function keelY(f: HullForm, u: number): number {
  const aftEnd = 0.18;
  const fwdStart = 0.92;
  // With a bulb the forefoot dives toward the bulb underside so the root has body.
  const forefootY = f.bulb
    ? Math.min(WL_Y - f.forefootRise, bulbCenterY(f) - 0.85 * f.bulb.radius)
    : WL_Y - f.forefootRise;
  if (u < aftEnd) return lerp(WL_Y - f.counterRise, KEEL_Y, smooth(0, aftEnd, u));
  if (u > fwdStart) return lerp(KEEL_Y, forefootY, smooth(fwdStart, 1, u));
  return KEEL_Y;
}

function deckY(f: HullForm, u: number): number {
  const aft = f.sheerAft * Math.pow(Math.max(0, 1 - u / 0.3), 2);
  const fwd = f.sheerFwd * Math.pow(Math.max(0, (u - 0.7) / 0.3), 2);
  return DECK_Y + f.deckRise + aft + fwd;
}

function sectionExponent(f: HullForm, u: number): number {
  const [p0, p1] = f.parallelMidbody;
  if (u < p0) return lerp(2.2, f.midshipFullness, smooth(0, p0, u));
  if (u > p1) return lerp(f.midshipFullness, 1.6, smooth(p1, 1, u));
  return f.midshipFullness;
}

/** Forward x-shear applied to a vertex (raked stem, slight raked transom). */
function xShear(f: HullForm, u: number, t: number): number {
  const stem = f.stemRake * t * t * smooth(0.82, 1, u);
  const transom = -0.06 * t * t * (1 - smooth(0, 0.06, u));
  return stem + transom;
}

/** One section point: given station u and height fraction t (0 keel → 1 deck). */
function sectionPoint(f: HullForm, u: number, t: number, side: 1 | -1, out: THREE.Vector3): void {
  const yk = keelY(f, u);
  const yd = deckY(f, u);
  const tWL = clamp01((WL_Y - yk) / (yd - yk));
  const e = sectionExponent(f, u);

  const bw = halfBeamWL(f, u);
  const flareMul = 1 + f.bowFlare * smooth(0.68, 1, u) * Math.pow(Math.max(0, t - tWL), 2);
  const bd = halfBeamDeck(f, u) * flareMul;
  const b = t < tWL ? bw : lerp(bw, bd, smooth(tWL, 1, t));

  // Lamé quadrant: flat bottom + bilge radius emerge from exponent e.
  let z = b * Math.pow(1 - Math.pow(1 - t, 2), 1 / e) * (t === 0 ? 0 : 1);
  const yBase = lerp(yk, yd, t);

  // Bulb-root swell: widen the forward underwater sections around the bulb
  // axis so the lofted stations fair into the bulb extension with no seam.
  if (f.bulb && t > 0 && t < tWL && u > 0.86) {
    const sig = 0.75 * f.bulb.radius;
    const dy = yBase - bulbCenterY(f);
    const g = Math.exp(-(dy * dy) / (2 * sig * sig));
    z += (f.bulb.radius - MIN_HB) * g * smooth(0.86, 1, u);
  }

  const y = yBase + f.deadrise * (z / (BEAM / 2)) * Math.pow(1 - t, 2);
  const x = -HALF + u * 2 * HALF + xShear(f, u, t);

  out.set(x, y, side * z);
}

/* ─── loft ─── */

interface HullGeoSet {
  hull: THREE.BufferGeometry;
  deck: THREE.BufferGeometry;
  /** Starboard deck-edge samples stern→bow (mirror z for port). */
  sheer: THREE.Vector3[];
}

const cache = new Map<ShipType, HullGeoSet>();

function buildHullSet(type: ShipType): HullGeoSet {
  const f = hullForms[type];
  const v = new THREE.Vector3();

  // t values clustered toward the bilge so the bilge turn is well resolved.
  const tVals: number[] = [];
  for (let jj = 0; jj < NJ; jj++) tVals.push(Math.pow(jj / (NJ - 1), T_CLUSTER));

  // ring order: port deck (rj=0) → keel (rj=NJ-1) → stbd deck (rj=R-1)
  const ringT = (rj: number) => (rj < NJ ? tVals[NJ - 1 - rj] : tVals[rj - (NJ - 1)]);
  const ringSide = (rj: number): 1 | -1 => (rj < NJ - 1 ? -1 : 1);

  const rows = NS + 1;
  const positions: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];

  for (let i = 0; i < rows; i++) {
    const u = i / NS;
    for (let rj = 0; rj < R; rj++) {
      sectionPoint(f, u, ringT(rj), ringSide(rj), v);
      positions.push(v.x, v.y, v.z);
      uvs.push(texU(v.x), texV(v.y));
    }
  }

  // ── Bulbous bow: NB extra rows continue the grid forward of the stem. ──
  // Rings at/above tTop are pinned onto the stem row (degenerate, invisible
  // quads) so the grid stays R wide; rings below trace circular bulb sections
  // that shrink to a point at the nose. Same texU/texV → the antifoul paint
  // and plating flow onto the bulb with no seam or material switch.
  let tTop = 1; // ring t at/above which bulb rows are pinned to the stem row
  if (f.bulb) {
    const r0 = f.bulb.radius;
    const cy0 = bulbCenterY(f);
    const ykStem = keelY(f, 1);
    const ydStem = deckY(f, 1);
    // Snap the pin boundary to an actual ring t so the stem closing strip and
    // the bulb surface partition cleanly with no sliver gap or interior wall.
    const tTopRaw = clamp01((cy0 + 1.05 * r0 - ykStem) / (ydStem - ykStem));
    for (const tv of tVals) if (tv >= tTopRaw && tv < tTop) tTop = tv;
  }
  // Sanity gate: a pin boundary near the deck means the form data is off —
  // fall back to a bulbless loft rather than lofting a hull-sized "bulb".
  const bulb = tTop < 0.9 ? f.bulb : null;
  if (bulb) {
    const r0 = bulb.radius;
    const cy0 = bulbCenterY(f);

    for (let bi = 1; bi <= NB; bi++) {
      const s = bi / NB;
      const xA = HALF - 0.02 + s * bulb.length;
      const cy = cy0 + 0.1 * r0 * s; // slight nose-up axis
      const rad = r0 * Math.pow(1 - Math.pow(s, 2.2), 0.55); // rounded, self-closing nose
      for (let rj = 0; rj < R; rj++) {
        const t = ringT(rj);
        if (t >= tTop) {
          const src = (NS * R + rj) * 3;
          positions.push(positions[src], positions[src + 1], positions[src + 2]);
          uvs.push(texU(positions[src]), texV(positions[src + 1]));
        } else {
          const theta = (Math.PI * t) / tTop; // 0 = underside, π = top of bulb
          const y = cy - Math.cos(theta) * rad;
          const z = t === 0 ? 0 : Math.sin(theta) * rad;
          positions.push(xA, y, ringSide(rj) * z);
          uvs.push(texU(xA), texV(y));
        }
      }
    }
  }

  // Faces are split port / starboard so the two sides can take different
  // colour maps — hull text (name, draft marks) must not read mirrored on
  // the port side. Port = rings below NJ-1 (z ≤ 0), see ringSide().
  const portIndices: number[] = [];
  const stbdIndices: number[] = indices; // deliberate alias: shared quads → stbd

  const lastRow = bulb ? NS + NB : NS;
  for (let i = 0; i < lastRow; i++) {
    for (let rj = 0; rj < R - 1; rj++) {
      const a = i * R + rj;
      const b = (i + 1) * R + rj;
      const c = (i + 1) * R + rj + 1;
      const d = i * R + rj + 1;
      (rj < NJ - 1 ? portIndices : stbdIndices).push(a, b, c, a, c, d);
    }
  }

  // Stem closing strip across the clamped-width bow line (shared verts → smooth).
  // With a bulb, stop at its top — below tTop the bulb rows continue the
  // surface forward, and a strip there would be an interior wall corrupting
  // the averaged vertex normals of the bulb root.
  const last = NS * R;
  for (let k = 0; k < NJ - 1; k++) {
    if (bulb && ringT(k + 1) < tTop) break;
    const pA = last + k;
    const pB = last + k + 1;
    const sB = last + (R - 2 - k);
    const sA = last + (R - 1 - k);
    stbdIndices.push(pA, sA, sB, pA, sB, pB);
  }

  // Transom cap: duplicated ring-0 vertices → crisp edge, fan around centroid.
  const capStart = positions.length / 3;
  let cx = 0;
  let cy = 0;
  for (let rj = 0; rj < R; rj++) {
    cx += positions[rj * 3];
    cy += positions[rj * 3 + 1];
  }
  cx /= R;
  cy /= R;
  positions.push(cx, cy, 0);
  uvs.push(texU(cx), texV(cy));
  for (let rj = 0; rj < R; rj++) {
    positions.push(positions[rj * 3], positions[rj * 3 + 1], positions[rj * 3 + 2]);
    uvs.push(texU(positions[rj * 3]), texV(positions[rj * 3 + 1]));
  }
  for (let rj = 0; rj < R - 1; rj++) {
    indices.push(capStart, capStart + 1 + rj, capStart + 2 + rj);
  }

  const hull = new THREE.BufferGeometry();
  hull.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  hull.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
  hull.setIndex([...portIndices, ...stbdIndices]);
  hull.addGroup(0, portIndices.length, 0); // material 0: port (mirrored-text map)
  hull.addGroup(portIndices.length, stbdIndices.length, 1); // material 1: starboard
  hull.computeVertexNormals();

  // ── deck: separate geometry from the same station data → crisp deck edge ──
  const dPos: number[] = [];
  const dUv: number[] = [];
  const dIdx: number[] = [];
  const sheer: THREE.Vector3[] = [];
  const camber = 0.025;
  for (let i = 0; i < rows; i++) {
    const u = i / NS;
    sectionPoint(f, u, 1, 1, v); // starboard deck edge
    const bx = v.x;
    const by = v.y;
    const bz = Math.max(v.z, MIN_HB);
    sheer.push(new THREE.Vector3(bx, by, bz));
    dPos.push(bx, by, -bz, bx, by + camber, 0, bx, by, bz);
    const du = (bx + HALF) / (2 * HALF);
    dUv.push(du, 0, du, 0.5, du, 1);
  }
  for (let i = 0; i < NS; i++) {
    const p = i * 3;
    const q = (i + 1) * 3;
    // port→center and center→stbd strips, +Y winding
    dIdx.push(p, p + 1, q + 1, p, q + 1, q);
    dIdx.push(p + 1, p + 2, q + 2, p + 1, q + 2, q + 1);
  }
  const deck = new THREE.BufferGeometry();
  deck.setAttribute("position", new THREE.Float32BufferAttribute(dPos, 3));
  deck.setAttribute("uv", new THREE.Float32BufferAttribute(dUv, 2));
  deck.setIndex(dIdx);
  deck.computeVertexNormals();

  return { hull, deck, sheer };
}

export function getHullSet(type: ShipType): HullGeoSet {
  let set = cache.get(type);
  if (!set) {
    set = buildHullSet(type);
    cache.set(type, set);
  }
  return set;
}

export const buildHullGeometry = (type: ShipType) => getHullSet(type).hull;
export const buildDeckGeometry = (type: ShipType) => getHullSet(type).deck;
export const sampleSheerLine = (type: ShipType) => getHullSet(type).sheer;

/** Deck height at a hull-local x (for placing equipment on the sheer line). */
export function deckYAt(type: ShipType, x: number): number {
  const f = hullForms[type];
  return deckY(f, clamp01((x + HALF) / (2 * HALF)));
}

/** Deck-edge half-beam at a hull-local x. */
export function deckHalfBeamAt(type: ShipType, x: number): number {
  const f = hullForms[type];
  const u = clamp01((x + HALF) / (2 * HALF));
  const flareMul = 1 + f.bowFlare * smooth(0.68, 1, u);
  return Math.max(halfBeamDeck(f, u) * flareMul, MIN_HB);
}

export function disposeHullGeometries(): void {
  cache.forEach((set) => {
    set.hull.dispose();
    set.deck.dispose();
  });
  cache.clear();
}
