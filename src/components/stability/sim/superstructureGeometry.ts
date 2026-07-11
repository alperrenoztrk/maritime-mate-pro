import * as THREE from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import type { ShipConfig, ShipType } from "./ShipModel3D";
import { deckHalfBeamAt } from "./hullGeometry";
import { SS_U_WORLD, ssPlainV, ssRowV } from "./proceduralTextures";

/**
 * Superstructure built as real stepped geometry instead of a single rounded
 * box: per-type accommodation tiers with inter-deck slabs, a bridge deck with
 * a genuinely recessed forward glass band and wings out past the beam, an
 * engine casing and a lathed (oval, raked) funnel.
 *
 * Everything is baked into three merged BufferGeometries — walls / glass /
 * funnel — so the whole superstructure costs 3 draw calls. Wall faces carry
 * atlas UVs into getSuperstructureTextures(): each box face is remapped to a
 * deck-level row of the atlas with a u-repeat chosen so window pitch stays
 * constant (~1 repeat per SS_U_WORLD world units), and non-window surfaces
 * (tops, slabs, plinths, casing) sample the plain painted cell.
 */

const FACE_ORDER = ["px", "nx", "py", "ny", "pz", "nz"] as const;
type FaceKey = (typeof FACE_ORDER)[number];

interface FaceUV {
  v: readonly [number, number];
  uRep: number;
  uOff?: number;
}

const PLAIN: FaceUV = { v: ssPlainV(), uRep: 1 };

/** Remap each BoxGeometry face to an atlas cell (u repeats via wrapS). */
function mapBoxFaceUVs(
  g: THREE.BoxGeometry,
  faces: Partial<Record<FaceKey, FaceUV>>,
  fallback: FaceUV = PLAIN
): THREE.BoxGeometry {
  const uv = g.attributes.uv as THREE.BufferAttribute;
  for (let f = 0; f < 6; f++) {
    const spec = faces[FACE_ORDER[f]] ?? fallback;
    for (let i = f * 4; i < f * 4 + 4; i++) {
      uv.setXY(i, (spec.uOff ?? 0) + uv.getX(i) * spec.uRep, spec.v[0] + uv.getY(i) * (spec.v[1] - spec.v[0]));
    }
  }
  return g;
}

/** Collapse a geometry's UVs to one atlas point (paints it a single flat colour). */
function pinUVs(g: THREE.BufferGeometry, u: number, v: number): THREE.BufferGeometry {
  const uv = g.attributes.uv as THREE.BufferAttribute;
  for (let i = 0; i < uv.count; i++) uv.setXY(i, u, v);
  return g;
}

const windowRepeat = (faceWidth: number) => Math.max(1, Math.round(faceWidth / SS_U_WORLD));

function place(g: THREE.BufferGeometry, x: number, y: number, z: number, rot?: [number, number, number]): THREE.BufferGeometry {
  if (rot) {
    if (rot[0]) g.rotateX(rot[0]);
    if (rot[1]) g.rotateY(rot[1]);
    if (rot[2]) g.rotateZ(rot[2]);
  }
  g.translate(x, y, z);
  return g;
}

const box = (w: number, h: number, d: number) => new THREE.BoxGeometry(w, h, d);

/** A tier box whose four wall faces sample a window row of the atlas. */
function wallTier(w: number, h: number, d: number, row: number, uOff = 0): THREE.BoxGeometry {
  const v = ssRowV(row);
  return mapBoxFaceUVs(box(w, h, d), {
    px: { v, uRep: windowRepeat(d), uOff },
    nx: { v, uRep: windowRepeat(d), uOff: uOff + 0.31 },
    pz: { v, uRep: windowRepeat(w), uOff: uOff + 0.13 },
    nz: { v, uRep: windowRepeat(w), uOff: uOff + 0.57 },
  });
}

export interface SuperstructureSet {
  walls: THREE.BufferGeometry;
  glass: THREE.BufferGeometry;
  funnel: THREE.BufferGeometry;
  /** Half-span of the bridge wings — nav sidelights sit on the consoles. */
  wingHalfSpan: number;
  /** World position of the wing-console tops for the sidelights. */
  sideLightY: number;
}

export function buildSuperstructure(type: ShipType, cfg: ShipConfig): SuperstructureSet {
  const walls: THREE.BufferGeometry[] = [];
  const glass: THREE.BufferGeometry[] = [];
  const funnelParts: THREE.BufferGeometry[] = [];

  const ssX = cfg.superstructurePos[0];
  const ssY = cfg.superstructurePos[1];
  const [ssW, ssH, ssD] = cfg.superstructureSize;
  const yB = ssY - ssH / 2;

  /* ── stepped accommodation tiers inside the config envelope ── */
  const tiers = type === "passenger" ? 4 : 3;
  const tierH = ssH / tiers;
  const shrinkW = type === "passenger" ? 0.26 : 0.07;
  const stepX = type === "passenger" ? 0.03 : -0.035; // pax stacks forward, cargo steps aft

  // plinth skirt hides the deck-camber gap under tier 1
  walls.push(mapBoxFaceUVs(place(box(ssW + 0.04, 0.06, ssD + 0.04), ssX, yB + 0.02, 0) as THREE.BoxGeometry, {}));

  for (let i = 0; i < tiers; i++) {
    const w = ssW - i * shrinkW;
    const d = ssD - i * 0.05;
    const x = ssX + i * stepX;
    const y = yB + tierH * (i + 0.5);
    const row = 1 + (i % 4);
    walls.push(place(wallTier(w, tierH - 0.016, d, row, i * 0.17), x, y, 0));
    // inter-deck slab → visible step edge and eyebrow shadow
    walls.push(mapBoxFaceUVs(place(box(w + 0.05, 0.022, d + 0.05), x, yB + tierH * (i + 1) - 0.004, 0) as THREE.BoxGeometry, {}));
  }

  /* ── bridge deck with recessed forward glass and wings ── */
  const bX = cfg.bridgePos[0];
  const bY = cfg.bridgePos[1];
  const bW = 0.95;
  const bH = 0.4;
  const bD = ssD - 0.06;
  const frontX = bX + bW / 2;
  const glassH = 0.17;
  const glassMidY = bY + 0.02;

  // main body, its front face pulled back to form the recess back wall
  walls.push(mapBoxFaceUVs(place(box(bW - 0.06, bH, bD), bX - 0.03, bY, 0) as THREE.BoxGeometry, {}));
  // sill below the glass, flush with the nominal front
  const sillTop = glassMidY - glassH / 2;
  walls.push(mapBoxFaceUVs(place(box(0.06, sillTop - (bY - bH / 2), bD), frontX - 0.03, (sillTop + bY - bH / 2) / 2, 0) as THREE.BoxGeometry, {}));
  // brow above the glass, slightly overhanging for a shadow line
  const browBot = glassMidY + glassH / 2;
  walls.push(mapBoxFaceUVs(place(box(0.1, bY + bH / 2 - browBot + 0.02, bD + 0.02), frontX - 0.02, (browBot + bY + bH / 2 + 0.02) / 2, 0) as THREE.BoxGeometry, {}));
  // recess side cheeks
  for (const side of [1, -1] as const) {
    walls.push(mapBoxFaceUVs(place(box(0.06, glassH, 0.05), frontX - 0.03, glassMidY, side * (bD / 2 - 0.025)) as THREE.BoxGeometry, {}));
  }
  // the recessed forward glass band itself
  glass.push(place(box(0.016, glassH + 0.01, bD - 0.12), frontX - 0.05, glassMidY, 0));
  // wraparound side glass on the forward half of the bridge
  for (const side of [1, -1] as const) {
    glass.push(place(box(bW * 0.52, glassH - 0.04, 0.012), bX + 0.1, glassMidY, side * (bD / 2 + 0.004)));
  }

  /* ── bridge wings out past the beam, with end consoles ── */
  const wingHalfSpan = deckHalfBeamAt(type, bX) + 0.1;
  const wingY = bY - bH / 2 + 0.02;
  walls.push(mapBoxFaceUVs(place(box(0.34, 0.034, wingHalfSpan * 2), bX, wingY, 0) as THREE.BoxGeometry, {}));
  for (const side of [1, -1] as const) {
    walls.push(mapBoxFaceUVs(place(box(0.24, 0.13, 0.09), bX + 0.02, wingY + 0.082, side * (wingHalfSpan - 0.05)) as THREE.BoxGeometry, {}));
    glass.push(place(box(0.012, 0.055, 0.08), bX + 0.145, wingY + 0.1, side * (wingHalfSpan - 0.05)));
    // angled support strut from the superstructure side to the wing underside
    walls.push(
      mapBoxFaceUVs(
        place(box(0.02, 0.3, 0.02), bX, wingY - 0.1, side * (ssD / 2 + (wingHalfSpan - ssD / 2) * 0.45), [
          side * -0.9,
          0,
          0,
        ]) as THREE.BoxGeometry,
        {}
      )
    );
  }
  const sideLightY = wingY + 0.16;

  /* ── engine casing + lathed funnel ── */
  const fX = cfg.funnelPos[0];
  const fY = cfg.funnelPos[1];
  const funnelBaseY = fY - 0.28;
  walls.push(mapBoxFaceUVs(place(box(0.46, 0.26, Math.min(ssD - 0.3, 0.62)), fX, funnelBaseY - 0.11, 0) as THREE.BoxGeometry, {}));

  const streamlined = type === "roro" || type === "passenger";
  const profile = streamlined
    ? [
        [0.26, 0],
        [0.24, 0.1],
        [0.19, 0.28],
        [0.18, 0.4],
        [0.22, 0.55],
        [0.215, 0.6],
        [0.06, 0.62],
        [0.001, 0.62],
      ]
    : [
        [0.21, 0],
        [0.19, 0.08],
        [0.16, 0.34],
        [0.155, 0.44],
        [0.175, 0.47],
        [0.17, 0.55],
        [0.05, 0.56],
        [0.001, 0.56],
      ];
  const lathe = new THREE.LatheGeometry(
    profile.map(([r, y]) => new THREE.Vector2(r, y)),
    20
  );
  lathe.scale(1, 1, streamlined ? 0.62 : 0.72); // oval casing
  lathe.rotateZ(streamlined ? 0.16 : 0.1); // raked aft
  lathe.translate(fX, funnelBaseY, 0);
  funnelParts.push(lathe);
  // exhaust pipes pinned to the soot-cap texel so they read near-black
  const funnelTopY = funnelBaseY + (streamlined ? 0.62 : 0.56);
  funnelParts.push(pinUVs(place(new THREE.CylinderGeometry(0.032, 0.032, 0.14, 8), fX - 0.03, funnelTopY + 0.05, 0.05), 0.5, 0.95));
  funnelParts.push(pinUVs(place(new THREE.CylinderGeometry(0.024, 0.024, 0.11, 8), fX - 0.05, funnelTopY + 0.04, -0.06), 0.5, 0.95));

  const mergedWalls = mergeGeometries(walls);
  const mergedGlass = mergeGeometries(glass);
  const mergedFunnel = mergeGeometries(funnelParts);
  [...walls, ...glass, ...funnelParts].forEach((g) => g.dispose());

  return {
    walls: mergedWalls,
    glass: mergedGlass,
    funnel: mergedFunnel,
    wingHalfSpan,
    sideLightY,
  };
}
