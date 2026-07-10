import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import type { ShipConfig, ShipType } from "./ShipModel3D";
import { deckHalfBeamAt, deckYAt, sampleSheerLine } from "./hullGeometry";

/**
 * Type-specific deck equipment for the sim vessel. Everything static is
 * merged into a handful of BufferGeometries grouped by material (one draw
 * call each), so the whole detail pass costs ~5 draw calls + one animated
 * radar bar. Geometries are rebuilt only when the ship type changes and are
 * disposed on unmount/switch.
 */

interface DetailLayer {
  geometry: THREE.BufferGeometry;
  color: string;
  metalness: number;
  roughness: number;
}

/** Bake a primitive into place: rotate (XYZ order), then translate. */
function place(
  g: THREE.BufferGeometry,
  x: number,
  y: number,
  z: number,
  rot?: [number, number, number]
): THREE.BufferGeometry {
  if (rot) {
    if (rot[0]) g.rotateX(rot[0]);
    if (rot[1]) g.rotateY(rot[1]);
    if (rot[2]) g.rotateZ(rot[2]);
  }
  g.translate(x, y, z);
  return g;
}

const box = (w: number, h: number, d: number) => new THREE.BoxGeometry(w, h, d);
const cyl = (rTop: number, rBot: number, h: number, seg = 8) => new THREE.CylinderGeometry(rTop, rBot, h, seg);

function buildDetailLayers(type: ShipType, cfg: ShipConfig): DetailLayer[] {
  const layers: DetailLayer[] = [];
  const sheer = sampleSheerLine(type);

  /* ── railings: stanchions + two tube rails following the sheer line ── */
  const railParts: THREE.BufferGeometry[] = [];
  const railInset = 0.028;
  for (const side of [1, -1] as const) {
    const pts: THREE.Vector3[] = [];
    for (let i = 1; i < sheer.length - 1; i++) {
      const p = sheer[i];
      pts.push(new THREE.Vector3(p.x, p.y, side * (p.z - railInset)));
    }
    for (let i = 0; i < pts.length; i += 2) {
      railParts.push(place(cyl(0.006, 0.006, 0.14, 5), pts[i].x, pts[i].y + 0.07, pts[i].z));
    }
    const top = new THREE.CatmullRomCurve3(pts.map((p) => new THREE.Vector3(p.x, p.y + 0.142, p.z)));
    const mid = new THREE.CatmullRomCurve3(pts.map((p) => new THREE.Vector3(p.x, p.y + 0.085, p.z)));
    railParts.push(new THREE.TubeGeometry(top, 72, 0.0045, 5, false));
    railParts.push(new THREE.TubeGeometry(mid, 72, 0.0038, 5, false));
  }
  // foremast at the fo'c'sle
  railParts.push(place(cyl(0.009, 0.013, 0.55, 6), 3.05, deckYAt(type, 3.05) + 0.27, 0));
  railParts.push(place(box(0.16, 0.014, 0.014), 3.05, deckYAt(type, 3.05) + 0.42, 0));

  /* ── mooring / anchor gear (dark steel) ── */
  const gearParts: THREE.BufferGeometry[] = [];
  const bollardXs = [-2.9, -1.8, -0.7, 0.6, 1.7, 2.55];
  for (const bx of bollardXs) {
    for (const side of [1, -1] as const) {
      const bz = side * (deckHalfBeamAt(type, bx) - 0.11);
      const by = deckYAt(type, bx);
      gearParts.push(place(box(0.11, 0.022, 0.06), bx, by + 0.011, bz));
      gearParts.push(place(cyl(0.02, 0.023, 0.07, 8), bx - 0.028, by + 0.05, bz));
      gearParts.push(place(cyl(0.02, 0.023, 0.07, 8), bx + 0.028, by + 0.05, bz));
    }
  }
  // panama fairleads at bow and stern quarters
  for (const [fx, fz] of [
    [3.28, 0.1],
    [3.28, -0.1],
    [-3.3, 0.24],
    [-3.3, -0.24],
  ] as const) {
    gearParts.push(place(new THREE.TorusGeometry(0.035, 0.011, 6, 12), fx, deckYAt(type, fx) + 0.045, fz));
  }
  // windlass on the fo'c'sle: transverse drum + gypsies
  const wlY = deckYAt(type, 2.82);
  gearParts.push(place(cyl(0.045, 0.045, 0.34, 10), 2.82, wlY + 0.07, 0, [Math.PI / 2, 0, 0]));
  gearParts.push(place(cyl(0.06, 0.06, 0.05, 10), 2.82, wlY + 0.07, 0.2, [Math.PI / 2, 0, 0]));
  gearParts.push(place(cyl(0.06, 0.06, 0.05, 10), 2.82, wlY + 0.07, -0.2, [Math.PI / 2, 0, 0]));
  gearParts.push(place(box(0.09, 0.06, 0.09), 2.82, wlY + 0.03, 0));
  // stockless anchors housed at the bow
  for (const side of [1, -1] as const) {
    const az = side * (deckHalfBeamAt(type, 3.0) * 0.82);
    gearParts.push(place(box(0.016, 0.17, 0.032), 3.02, 0.3, az, [0, 0, side * 0.1]));
    gearParts.push(place(box(0.014, 0.075, 0.05), 3.0, 0.2, az, [0.5 * side, 0, 0]));
    gearParts.push(place(box(0.014, 0.075, 0.05), 3.04, 0.2, az, [-0.5 * side, 0, 0]));
  }

  /* ── lifeboat davit arms (into gear layer), boats into their own layer ── */
  const boatParts: THREE.BufferGeometry[] = [];
  const boatCount = Math.max(1, cfg.extraLifeboats);
  for (const side of [1, -1] as const) {
    for (let i = 0; i < boatCount; i++) {
      const bx = cfg.superstructurePos[0] - 0.3 + i * 0.36;
      const by = cfg.superstructurePos[1] - 0.08;
      const bz = side * (cfg.superstructureSize[2] / 2 + 0.1);
      boatParts.push(place(new THREE.CapsuleGeometry(0.085, 0.34, 4, 8), bx, by, bz, [0, 0, Math.PI / 2]));
      gearParts.push(place(box(0.014, 0.2, 0.014), bx - 0.15, by + 0.12, bz - side * 0.03, [side * 0.45, 0, 0]));
      gearParts.push(place(box(0.014, 0.2, 0.014), bx + 0.15, by + 0.12, bz - side * 0.03, [side * 0.45, 0, 0]));
    }
  }
  if (type === "passenger") {
    // freefall boat on a stern skid
    boatParts.push(place(box(0.3, 0.12, 0.15), -3.0, 1.0, 0, [0, 0, -0.42]));
  }

  /* ── per-type primary equipment ── */
  const typeParts: THREE.BufferGeometry[] = [];
  let typeLayerStyle = { color: "#c9b58a", metalness: 0.3, roughness: 0.55 };

  if (type === "bulk") {
    // proper pedestal deck cranes with raked boom + hook fall
    for (const cx of [1.72, 0.77, -0.18, -1.13]) {
      const base = deckYAt(type, cx) + 0.02;
      typeParts.push(place(cyl(0.07, 0.085, 0.32, 10), cx, base + 0.16, 0));
      typeParts.push(place(box(0.15, 0.11, 0.13), cx, base + 0.37, 0));
      const boom = place(cyl(0.016, 0.038, 1.25, 7), 0, 0.625, 0);
      boom.rotateZ(-0.95); // raked toward the bow
      boom.translate(cx + 0.03, base + 0.38, 0);
      typeParts.push(boom);
      const tipX = cx + 0.03 + Math.sin(0.95) * 1.25;
      const tipY = base + 0.38 + Math.cos(0.95) * 1.25;
      typeParts.push(place(cyl(0.004, 0.004, 0.4, 4), tipX, tipY - 0.2, 0));
      typeParts.push(place(box(0.035, 0.05, 0.035), tipX, tipY - 0.42, 0));
    }
  } else if (type === "tanker") {
    typeLayerStyle = { color: "#e07b2e", metalness: 0.45, roughness: 0.5 };
    // centreline catwalk with A-frame supports and handrail
    const cwY = 0.86;
    typeParts.push(place(box(3.9, 0.022, 0.2), 0.35, cwY, 0));
    typeParts.push(place(box(3.9, 0.012, 0.012), 0.35, cwY + 0.1, 0.09));
    typeParts.push(place(box(3.9, 0.012, 0.012), 0.35, cwY + 0.1, -0.09));
    for (let i = 0; i < 9; i++) {
      const sx = -1.5 + i * 0.47;
      const legTop = cwY - 0.011;
      const legBase = deckYAt(type, sx);
      const legLen = legTop - legBase;
      typeParts.push(place(box(0.016, legLen, 0.016), sx, legBase + legLen / 2, 0.08, [0.12, 0, 0]));
      typeParts.push(place(box(0.016, legLen, 0.016), sx, legBase + legLen / 2, -0.08, [-0.12, 0, 0]));
    }
    // cargo lines along deck + midship manifold with handwheel valves
    for (const pz of [0.16, -0.16]) {
      typeParts.push(place(cyl(0.028, 0.028, 3.9, 8), 0.35, deckYAt(type, 0.35) + 0.06, pz, [0, 0, Math.PI / 2]));
    }
    for (const mx of [0.28, 0.42]) {
      typeParts.push(place(cyl(0.026, 0.026, 1.15, 8), mx, deckYAt(type, mx) + 0.09, 0, [Math.PI / 2, 0, 0]));
    }
    for (const wz of [0.3, 0.42, -0.3, -0.42]) {
      typeParts.push(place(new THREE.TorusGeometry(0.032, 0.008, 6, 12), 0.35, deckYAt(type, 0.35) + 0.16, wz, [0, Math.PI / 2, 0]));
    }
    // vent risers
    for (const vx of [1.9, 0.9, -0.6]) {
      typeParts.push(place(cyl(0.024, 0.024, 0.34, 7), vx, deckYAt(type, vx) + 0.17, 0.3));
      typeParts.push(place(cyl(0.05, 0.05, 0.03, 7), vx, deckYAt(type, vx) + 0.35, 0.3));
    }
  } else if (type === "roro") {
    typeLayerStyle = { color: "#93a3b5", metalness: 0.35, roughness: 0.5 };
    // ribbed stern ramp on hinge drums
    const rampY = 0.34;
    const parts: THREE.BufferGeometry[] = [place(box(0.95, 0.035, 1.05), 0, 0, 0)];
    for (let i = 0; i < 5; i++) parts.push(place(box(0.95, 0.02, 0.03), 0, 0.026, -0.45 + i * 0.225));
    const merged = mergeGeometries(parts);
    parts.forEach((p) => p.dispose());
    merged.rotateZ(Math.PI / 8.5);
    merged.translate(-3.42, rampY, 0);
    typeParts.push(merged);
    typeParts.push(place(cyl(0.035, 0.035, 1.0, 8), -3.05, rampY + 0.13, 0, [Math.PI / 2, 0, 0]));
  } else if (type === "container") {
    typeLayerStyle = { color: "#8b97a6", metalness: 0.5, roughness: 0.45 };
    // lashing bridges between container bays
    for (let i = 0; i < 7; i++) {
      const lx = 2.07 - i * 0.56;
      const ly = deckYAt(type, lx);
      typeParts.push(place(box(0.022, 0.3, 0.022), lx, ly + 0.15, 0.5));
      typeParts.push(place(box(0.022, 0.3, 0.022), lx, ly + 0.15, -0.5));
      typeParts.push(place(box(0.022, 0.022, 1.02), lx, ly + 0.3, 0));
    }
  } else if (type === "passenger") {
    typeLayerStyle = { color: "#f6f9fc", metalness: 0.1, roughness: 0.45 };
    // bridge wings spanning past the beam
    typeParts.push(place(box(0.2, 0.05, 1.9), cfg.bridgePos[0], cfg.bridgePos[1] - 0.06, 0));
    typeParts.push(place(box(0.2, 0.09, 0.06), cfg.bridgePos[0], cfg.bridgePos[1] - 0.01, 0.93));
    typeParts.push(place(box(0.2, 0.09, 0.06), cfg.bridgePos[0], cfg.bridgePos[1] - 0.01, -0.93));
  }

  const push = (parts: THREE.BufferGeometry[], style: Omit<DetailLayer, "geometry">) => {
    if (!parts.length) return;
    const merged = mergeGeometries(parts);
    parts.forEach((p) => p.dispose());
    if (merged) layers.push({ geometry: merged, ...style });
  };

  push(railParts, { color: "#c7ced6", metalness: 0.55, roughness: 0.4 });
  push(gearParts, { color: "#3a444f", metalness: 0.5, roughness: 0.55 });
  push(boatParts, { color: "#f97316", metalness: 0.15, roughness: 0.5 });
  push(typeParts, typeLayerStyle);

  return layers;
}

/** Animated radar/antenna cluster on the bridge top. */
function RadarMast({ position }: { position: [number, number, number] }) {
  const scanner = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (scanner.current) scanner.current.rotation.y += delta * 1.4;
  });
  return (
    <group position={position}>
      <mesh castShadow>
        <cylinderGeometry args={[0.016, 0.022, 0.5, 7]} />
        <meshStandardMaterial color="#41505e" metalness={0.55} roughness={0.4} />
      </mesh>
      <group ref={scanner} position={[0, 0.28, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.3, 0.028, 0.045]} />
          <meshStandardMaterial color="#e2e8f0" metalness={0.5} roughness={0.35} />
        </mesh>
      </group>
      <mesh position={[0.09, 0.14, 0]}>
        <sphereGeometry args={[0.045, 10, 8]} />
        <meshStandardMaterial color="#f1f5f9" metalness={0.2} roughness={0.4} />
      </mesh>
      {[-0.06, 0.02].map((zx, i) => (
        <mesh key={i} position={[-0.09, 0.2, zx]}>
          <cylinderGeometry args={[0.003, 0.003, 0.34, 4]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.6} roughness={0.35} />
        </mesh>
      ))}
    </group>
  );
}

export function ShipDetails({ type, cfg }: { type: ShipType; cfg: ShipConfig }) {
  const layers = useMemo(() => buildDetailLayers(type, cfg), [type, cfg]);

  useEffect(() => () => layers.forEach((l) => l.geometry.dispose()), [layers]);

  return (
    <group>
      {layers.map((l, i) => (
        <mesh key={i} geometry={l.geometry} castShadow>
          <meshStandardMaterial color={l.color} metalness={l.metalness} roughness={l.roughness} />
        </mesh>
      ))}
      <RadarMast position={[cfg.bridgePos[0], cfg.bridgePos[1] + 0.24, 0]} />
    </group>
  );
}

export default ShipDetails;
