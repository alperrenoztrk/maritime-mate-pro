import * as THREE from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import type { ShipType } from "./ShipModel3D";

/**
 * Propulsion gear: a real screw propeller (twisted, skewed, raked blades on
 * a helicoid + boss with a fairing cone) and the fixed stern gear (tail
 * shaft, stern-tube bossing, foil-section rudder with horn or skeg).
 *
 * The propeller merges to ONE geometry (rotated as a whole around +X by the
 * component); blades are single-sheet grids rendered DoubleSide — at sim
 * scale a thin blade reads correctly and halves the triangle count.
 */

const NR = 6; // radial samples per blade
const NC = 4; // chordwise samples

/** One blade as a helicoidal grid, pointing +Y, prop axis = +X. */
function buildBlade(R: number, hubR: number): THREE.BufferGeometry {
  const positions: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];
  const P = 1.0 * R; // pitch
  const rake = Math.tan((6 * Math.PI) / 180);

  for (let ir = 0; ir < NR; ir++) {
    const fr = ir / (NR - 1);
    const r = hubR * 0.85 + fr * (R - hubR * 0.85);
    const rr = r / R;
    const chord = 0.55 * R * Math.sin(Math.PI * Math.pow(rr, 0.9)) + 0.006;
    const beta = Math.atan(P / (2 * Math.PI * r)); // pitch angle
    const skew = (0.35 * R * rr * rr) / r; // circumferential skew as an angle
    for (let ic = 0; ic < NC; ic++) {
      const s = ic / (NC - 1) - 0.5;
      const phi = skew + (s * chord * Math.cos(beta)) / r;
      const x = s * chord * Math.sin(beta) + rake * r;
      positions.push(x, r * Math.cos(phi), r * Math.sin(phi));
      uvs.push(fr, s + 0.5);
    }
  }
  for (let ir = 0; ir < NR - 1; ir++) {
    for (let ic = 0; ic < NC - 1; ic++) {
      const a = ir * NC + ic;
      const b = (ir + 1) * NC + ic;
      indices.push(a, b, b + 1, a, b + 1, a + 1);
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  g.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
  g.setIndex(indices);
  g.computeVertexNormals();
  return g;
}

export function buildPropeller(blades: number, radius: number): THREE.BufferGeometry {
  const hubR = radius * 0.2;
  const hubLen = radius * 0.62;
  const parts: THREE.BufferGeometry[] = [];

  for (let k = 0; k < blades; k++) {
    const blade = buildBlade(radius, hubR);
    blade.rotateX((k * 2 * Math.PI) / blades);
    parts.push(blade);
  }
  // boss + aft fairing cone (cap points aft = -X)
  const hub = new THREE.CylinderGeometry(hubR, hubR, hubLen, 12);
  hub.rotateZ(Math.PI / 2);
  parts.push(hub);
  const cone = new THREE.ConeGeometry(hubR * 0.98, hubR * 1.7, 12);
  cone.rotateZ(Math.PI / 2); // +Y → -X
  cone.translate(-(hubLen / 2 + hubR * 0.8), 0, 0);
  parts.push(cone);

  const merged = mergeGeometries(parts);
  parts.forEach((p) => p.dispose());
  return merged;
}

/** Foil-section rudder blade: rounded leading edge, tapered trailing edge. */
function foilRudder(chord: number, thickness: number, depth: number): THREE.BufferGeometry {
  const s = new THREE.Shape();
  s.moveTo(-chord / 2, 0);
  s.quadraticCurveTo(-chord / 2 + 0.03, thickness, 0, thickness * 0.8);
  s.quadraticCurveTo(chord / 2 - 0.02, thickness * 0.25, chord / 2, 0);
  s.quadraticCurveTo(chord / 2 - 0.02, -thickness * 0.25, 0, -thickness * 0.8);
  s.quadraticCurveTo(-chord / 2 + 0.03, -thickness, -chord / 2, 0);
  const g = new THREE.ExtrudeGeometry(s, { depth, bevelEnabled: false, curveSegments: 6 });
  g.rotateX(Math.PI / 2); // extrusion becomes vertical (downward)
  return g;
}

export function buildSternGear(type: ShipType): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = [];

  // tail shaft from the counter into the propeller hub
  const shaft = new THREE.CylinderGeometry(0.02, 0.02, 0.32, 10);
  shaft.rotateZ(Math.PI / 2);
  shaft.translate(-3.02, -0.44, 0);
  parts.push(shaft);
  // stern-tube bossing fairing into the hull
  const boss = new THREE.CylinderGeometry(0.034, 0.056, 0.2, 10);
  boss.rotateZ(-Math.PI / 2); // narrow end aft
  boss.translate(-2.92, -0.44, 0);
  parts.push(boss);

  // rudder on its stock, aft of the propeller
  const rudder = foilRudder(0.24, 0.034, 0.36);
  // leading edge toward the prop (+x side of the foil is TE): flip so LE fwd
  rudder.rotateY(Math.PI);
  rudder.translate(-3.38, -0.24, 0);
  parts.push(rudder);
  const stock = new THREE.CylinderGeometry(0.016, 0.016, 0.14, 8);
  stock.translate(-3.38, -0.2, 0);
  parts.push(stock);

  if (type === "tanker" || type === "bulk") {
    // semi-balanced rudder horn
    const horn = new THREE.BoxGeometry(0.09, 0.18, 0.028);
    horn.translate(-3.34, -0.3, 0);
    parts.push(horn);
  } else {
    // skeg fin ahead of the rudder for the finer forms
    const skeg = new THREE.BoxGeometry(0.26, 0.1, 0.02);
    skeg.translate(-3.06, -0.58, 0);
    parts.push(skeg);
  }

  // ExtrudeGeometry (rudder) is non-indexed while the primitives are indexed;
  // mergeGeometries requires all-or-none, so flatten everything.
  const flat = parts.map((p) => (p.index ? p.toNonIndexed() : p));
  const merged = mergeGeometries(flat);
  parts.forEach((p) => p.dispose());
  flat.forEach((p) => p.dispose());
  return merged;
}
