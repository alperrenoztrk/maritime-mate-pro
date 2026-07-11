import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { getAOBlobTexture, getWakeStripTexture } from "./proceduralTextures";

/**
 * Moving-water layer under OceanSurface3D's static contact foam: a scrolling
 * streak strip along the stern wake (the ship is anchored, but the sea
 * streams past it — the waves already translate, so a gentle current wake is
 * coherent). The shaped bow crescent and V-wake envelope live in
 * OceanSurface3D; this adds the motion inside that envelope. Lengthwise
 * dissolve is baked into RGBA vertex colours, the across-strip softness into
 * the texture, so no per-frame geometry work.
 *
 * The hull AO blob (moved here from SceneEnvironment) shares the group, so
 * both shift leeward with heel and track the true waterline.
 */

interface WakeEffectsProps {
  /** Live heel angle in radians — the whole layer shifts leeward with it. */
  heelRef?: React.MutableRefObject<number>;
  /** Master foam opacity; 0 removes the wake strips entirely. */
  intensity?: number;
  /** Ship model scale so strip endpoints line up with the hull. */
  scale?: number;
}

const STRIP_ROWS = 9;

/** Flat tapering strip from (ax,az) to (bx,bz), alpha fading along length. */
function buildStrip(
  ax: number,
  az: number,
  bx: number,
  bz: number,
  w0: number,
  w1: number,
  headAlpha: number,
  uRep: number
): THREE.BufferGeometry {
  const dx = bx - ax;
  const dz = bz - az;
  const len = Math.hypot(dx, dz) || 1;
  const px = -dz / len;
  const pz = dx / len;

  const positions: number[] = [];
  const uvs: number[] = [];
  const colors: number[] = [];
  const indices: number[] = [];

  for (let r = 0; r < STRIP_ROWS; r++) {
    const t = r / (STRIP_ROWS - 1);
    const cx = ax + dx * t;
    const cz = az + dz * t;
    const half = (w0 + (w1 - w0) * t) / 2;
    const a = headAlpha * Math.pow(1 - t, 1.2);
    positions.push(cx + px * half, 0, cz + pz * half, cx - px * half, 0, cz - pz * half);
    uvs.push(t * uRep, 0, t * uRep, 1);
    colors.push(1, 1, 1, a, 1, 1, 1, a);
  }
  for (let r = 0; r < STRIP_ROWS - 1; r++) {
    const i0 = r * 2;
    indices.push(i0, i0 + 1, i0 + 2, i0 + 1, i0 + 3, i0 + 2);
  }

  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  g.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
  g.setAttribute("color", new THREE.Float32BufferAttribute(colors, 4));
  g.setIndex(indices);
  return g;
}

export function WakeEffects({ heelRef, intensity = 0.35, scale = 1 }: WakeEffectsProps) {
  const groupRef = useRef<THREE.Group>(null);
  const wakeTex = useMemo(() => getWakeStripTexture(), []);

  const strips = useMemo(() => {
    // streaming foam streaks inside the stern-wake envelope
    const parts = [buildStrip(-2.95, 0, -7.4, 0, 0.85, 2.5, 0.8, 4)];
    const merged = mergeGeometries(parts);
    parts.forEach((p) => p.dispose());
    return merged;
  }, []);

  const stripMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: "#e6f2fa",
        alphaMap: wakeTex,
        transparent: true,
        opacity: intensity,
        depthWrite: false,
        vertexColors: true,
        side: THREE.DoubleSide,
      }),
    [wakeTex, intensity]
  );

  useFrame((_, delta) => {
    // foam streams aft along the strips
    wakeTex.offset.x -= delta * 0.05;
    const heel = heelRef?.current ?? 0;
    if (groupRef.current) groupRef.current.position.z = -Math.sin(heel) * 0.3;
  });

  useEffect(
    () => () => {
      strips.dispose();
      stripMaterial.dispose();
    },
    [strips, stripMaterial]
  );

  return (
    <group ref={groupRef}>
      <group scale={scale}>
        {/* soft dark blob under the hull footprint — cheap grounding in
            place of per-frame contact shadows */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.012, 0]} renderOrder={1}>
          <planeGeometry args={[8.8, 2.7]} />
          <meshBasicMaterial color="#04101c" alphaMap={getAOBlobTexture()} transparent opacity={0.38} depthWrite={false} />
        </mesh>
        {intensity > 0 && <mesh geometry={strips} material={stripMaterial} position={[0, 0.02, 0]} renderOrder={2} />}
      </group>
    </group>
  );
}

export default WakeEffects;
