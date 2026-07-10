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

const NS = 48; // stations, transom (i=0) → stem (i=NS)
const NJ = 12; // points per half-section, keel (jj=0) → deck edge (jj=NJ-1)
const R = 2 * NJ - 1; // ring size (keel point shared, deck edges distinct)
const MIN_HB = 0.012; // half-beam clamp at the stem — never degenerate
const T_CLUSTER = 1.5; // cluster section points toward the bilge

/** Map a hull-local x to texture u. Single source of truth for texture art. */
export const texU = (x: number) => (x + HALF + 0.35) / (2 * HALF + 0.75);
/** Map a hull-local y to texture v. Single source of truth for texture art. */
export const texV = (y: number) => (y - KEEL_Y) / (HULL_TEX_TOP_Y - KEEL_Y);

export interface HullForm {
  /** Superellipse exponent at midship — high = wall-sided/flat-bottomed. */
  midshipFullness: number;
  /** u where the bow taper begins (everything between aftTaper and this is
   *  full-beam parallel midbody, so the plan view reads long straight sides). */
  bowTaperStart: number;
  /** Length fraction of the stern taper — kept short so the transom stays square. */
  aftTaper: number;
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
    bowTaperStart: 0.7,
    aftTaper: 0.12,
    bowEntrance: 2.6,
    bowFlare: 0.55,
    stemRake: 0.45,
    transomWidthFrac: 0.82,
    transomWidthFracWL: 0.5,
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
    bowTaperStart: 0.78,
    aftTaper: 0.12,
    bowEntrance: 3.4,
    bowFlare: 0.2,
    stemRake: 0.18,
    transomWidthFrac: 0.8,
    transomWidthFracWL: 0.62,
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
    bowTaperStart: 0.75,
    aftTaper: 0.12,
    bowEntrance: 3.2,
    bowFlare: 0.25,
    stemRake: 0.2,
    transomWidthFrac: 0.8,
    transomWidthFracWL: 0.6,
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
    bowTaperStart: 0.72,
    aftTaper: 0.08,
    bowEntrance: 2.6,
    bowFlare: 0.4,
    stemRake: 0.5,
    transomWidthFrac: 0.95, // near-square stern for the ramp
    transomWidthFracWL: 0.7,
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
    bowTaperStart: 0.66,
    aftTaper: 0.1,
    bowEntrance: 2.2,
    bowFlare: 0.5,
    stemRake: 0.55,
    transomWidthFrac: 0.88,
    transomWidthFracWL: 0.55,
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
  const b = BEAM / 2;
  if (u < f.aftTaper) {
    const s = Math.pow(smooth(0, f.aftTaper, u), 0.7);
    return Math.max(b * lerp(frac, 1, s), MIN_HB);
  }
  if (u > f.bowTaperStart) {
    const t = (u - f.bowTaperStart) / (1 - f.bowTaperStart);
    // convex waterlines: stay full long, then round off into the stem
    return Math.max(b * Math.pow(1 - Math.pow(t, entrance), 0.7), MIN_HB);
  }
  return b;
}

const halfBeamDeck = (f: HullForm, u: number) => planHalfBeam(f, u, f.transomWidthFrac, f.bowEntrance);
const halfBeamWL = (f: HullForm, u: number) => planHalfBeam(f, u, f.transomWidthFracWL, f.bowEntrance * 0.8);

function keelY(f: HullForm, u: number): number {
  const aftEnd = 0.18;
  const fwdStart = 0.92;
  if (u < aftEnd) return lerp(WL_Y - f.counterRise, KEEL_Y, smooth(0, aftEnd, u));
  if (u > fwdStart) return lerp(KEEL_Y, WL_Y - f.forefootRise, smooth(fwdStart, 1, u));
  return KEEL_Y;
}

function deckY(f: HullForm, u: number): number {
  const aft = f.sheerAft * Math.pow(Math.max(0, 1 - u / 0.3), 2);
  const fwd = f.sheerFwd * Math.pow(Math.max(0, (u - 0.7) / 0.3), 2);
  return DECK_Y + f.deckRise + aft + fwd;
}

function sectionExponent(f: HullForm, u: number): number {
  if (u < f.aftTaper * 2) return lerp(2.4, f.midshipFullness, smooth(0, f.aftTaper * 2, u));
  if (u > f.bowTaperStart) return lerp(f.midshipFullness, 1.6, smooth(f.bowTaperStart, 1, u));
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
  const flareMul = 1 + f.bowFlare * smooth(f.bowTaperStart, 1, u) * Math.pow(Math.max(0, t - tWL), 2);
  const bd = halfBeamDeck(f, u) * flareMul;
  const b = t < tWL ? bw : lerp(bw, bd, smooth(tWL, 1, t));

  // Lamé quadrant: flat bottom + bilge radius emerge from exponent e.
  const z = b * Math.pow(1 - Math.pow(1 - t, 2), 1 / e) * (t === 0 ? 0 : 1);
  const y = lerp(yk, yd, t) + f.deadrise * (z / (BEAM / 2)) * Math.pow(1 - t, 2);
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
  // Split indices by side so the hull can carry two materials: the port map
  // is a mirrored-text repaint (see proceduralTextures.getHullTextures) so the
  // ship name / draft marks read correctly on both sides. The split runs
  // cleanly along the keel centreline (rj = NJ-1).
  const stbdIdx: number[] = [];
  const portIdx: number[] = [];

  for (let i = 0; i < rows; i++) {
    const u = i / NS;
    for (let rj = 0; rj < R; rj++) {
      sectionPoint(f, u, ringT(rj), ringSide(rj), v);
      positions.push(v.x, v.y, v.z);
      uvs.push(texU(v.x), texV(v.y));
    }
  }

  for (let i = 0; i < NS; i++) {
    for (let rj = 0; rj < R - 1; rj++) {
      const a = i * R + rj;
      const b = (i + 1) * R + rj;
      const c = (i + 1) * R + rj + 1;
      const d = i * R + rj + 1;
      (rj < NJ - 1 ? portIdx : stbdIdx).push(a, b, c, a, c, d);
    }
  }

  // Stem closing strip across the clamped-width bow line (shared verts → smooth).
  const last = NS * R;
  for (let k = 0; k < NJ - 1; k++) {
    const pA = last + k;
    const pB = last + k + 1;
    const sB = last + (R - 2 - k);
    const sA = last + (R - 1 - k);
    stbdIdx.push(pA, sA, sB, pA, sB, pB);
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
    stbdIdx.push(capStart, capStart + 1 + rj, capStart + 2 + rj);
  }

  const hull = new THREE.BufferGeometry();
  hull.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  hull.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
  hull.setIndex([...stbdIdx, ...portIdx]);
  hull.addGroup(0, stbdIdx.length, 0); // material 0: starboard texture
  hull.addGroup(stbdIdx.length, portIdx.length, 1); // material 1: port (mirrored-text) texture
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
  const flareMul = 1 + f.bowFlare * smooth(f.bowTaperStart, 1, u);
  return Math.max(halfBeamDeck(f, u) * flareMul, MIN_HB);
}

export function disposeHullGeometries(): void {
  cache.forEach((set) => {
    set.hull.dispose();
    set.deck.dispose();
  });
  cache.clear();
}
