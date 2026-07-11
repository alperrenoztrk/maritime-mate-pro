import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { getHullSet, HALF, deckYAt } from "./hullGeometry";
import {
  CONTAINER_ATLAS,
  getContainerTextures,
  getDeckTextures,
  getFunnelTexture,
  getHullTextures,
  getSuperstructureTextures,
} from "./proceduralTextures";
import { buildSuperstructure } from "./superstructureGeometry";
import { buildPropeller, buildSternGear } from "./propellerGeometry";
import { ShipDetails } from "./ShipDetails";

/**
 * Presentational, offline-safe 3D merchant vessel for the beta stability sim.
 *
 * The hull is a procedurally lofted lines-plan geometry (see hullGeometry.ts)
 * dressed with runtime-generated PBR canvas textures (proceduralTextures.ts):
 * shipyard plating, rust streaks, boot-top, draft marks, Plimsoll mark and
 * ship name are all painted at physically exact heights. Type-specific deck
 * equipment lives in ShipDetails.tsx as merged one-draw-call layers.
 *
 *   - No baked G/B/M markers or tank cut-away — the sim draws its own markers.
 *   - No heel/trim animation here — the parent group applies heel.
 *   - No network fetches: all textures are canvas-generated, so it renders
 *     offline / in a Capacitor WebView.
 *
 * Local coordinates: length runs along X (±HALF), beam along Z, vertical Y.
 * The design waterline sits at child y = -0.1 and the whole group is lifted by
 * +0.1·scale so the waterline lands at world y = 0 and the keel at -0.7·scale
 * (matches SHIP_KEEL_Y in Stability3DSim).
 */

export type ShipType = "container" | "tanker" | "bulk" | "roro" | "passenger";

export const shipTypeOptions: { value: ShipType; label: string; description: string }[] = [
  { value: "container", label: "Konteyner", description: "Güverteyi dolduran konteyner istifleri, kıç üstü yaşam mahalli." },
  { value: "tanker", label: "Tanker", description: "Alçak düz güverte, boru hatları ve manifoldlar." },
  { value: "bulk", label: "Dökme", description: "İri ambar kapakları ve merkez hattı vinçleri." },
  { value: "roro", label: "Ro-Ro", description: "Yüksek araç güvertesi ve kıç rampa düzeni." },
  { value: "passenger", label: "Yolcu", description: "Çok katlı üst yapı ve yaşam alanları." },
];

export interface ShipConfig {
  superstructureColor: string;
  superstructurePos: [number, number, number];
  superstructureSize: [number, number, number];
  bridgePos: [number, number, number];
  funnelPos: [number, number, number];
  showContainers: boolean;
  showHatches: boolean;
  extraLifeboats: number;
}

const shipConfigs: Record<ShipType, ShipConfig> = {
  container: {
    superstructureColor: "#d8c7a6",
    superstructurePos: [-2.55, 0.86, 0],
    superstructureSize: [1.15, 0.98, 1.06],
    bridgePos: [-2.55, 1.52, 0],
    funnelPos: [-3.02, 1.3, 0],
    showContainers: true,
    showHatches: false,
    extraLifeboats: 1,
  },
  tanker: {
    superstructureColor: "#eef2f6",
    superstructurePos: [-2.85, 0.9, 0],
    superstructureSize: [1.1, 0.98, 1.05],
    bridgePos: [-2.85, 1.56, 0],
    funnelPos: [-3.2, 1.42, 0],
    showContainers: false,
    showHatches: false,
    extraLifeboats: 2,
  },
  bulk: {
    superstructureColor: "#eef1f4",
    superstructurePos: [-2.6, 0.9, 0],
    superstructureSize: [1.18, 1.0, 1.06],
    bridgePos: [-2.6, 1.58, 0],
    funnelPos: [-3.05, 1.4, 0],
    showContainers: false,
    showHatches: true,
    extraLifeboats: 1,
  },
  roro: {
    superstructureColor: "#f4f7fa",
    superstructurePos: [-1.55, 1.14, 0],
    superstructureSize: [2.2, 1.16, 1.14],
    bridgePos: [-1.5, 1.86, 0],
    funnelPos: [-2.75, 1.72, 0],
    showContainers: false,
    showHatches: false,
    extraLifeboats: 2,
  },
  passenger: {
    superstructureColor: "#f6f9fc",
    superstructurePos: [-0.2, 1.14, 0],
    superstructureSize: [4.2, 1.2, 1.16],
    bridgePos: [0.5, 2.06, 0],
    funnelPos: [0.3, 2.16, 0],
    showContainers: false,
    showHatches: false,
    extraLifeboats: 4,
  },
};

/* ─── Container stacks (single instanced draw call, textured + tinted) ─── */
const CONTAINER_COLORS = ["#b23b3b", "#c99a3f", "#3a6ea5", "#3f8f5b", "#c4c8cc", "#c1663b", "#6d4a86", "#2f6d63"];
const CONTAINER_BOX: [number, number, number] = [0.5, 0.16, 0.26];

function ContainerStacks() {
  const ref = useRef<THREE.InstancedMesh>(null);
  const tex = getContainerTextures();

  // Shared box with per-face atlas UVs: long sides = corrugation, aft end =
  // doors, bow end = corrugation, roof = ribs (bottom too — never visible).
  const boxGeo = useMemo(() => {
    const g = new THREE.BoxGeometry(...CONTAINER_BOX);
    const uv = g.attributes.uv as THREE.BufferAttribute;
    const cells = [
      CONTAINER_ATLAS.side, // +x (bow end — blank corrugated wall)
      CONTAINER_ATLAS.door, // -x (aft end doors)
      CONTAINER_ATLAS.roof, // +y
      CONTAINER_ATLAS.roof, // -y
      CONTAINER_ATLAS.side, // +z
      CONTAINER_ATLAS.side, // -z
    ];
    for (let f = 0; f < 6; f++) {
      const [u0, v0, u1, v1] = cells[f];
      for (let i = f * 4; i < f * 4 + 4; i++) {
        uv.setXY(i, u0 + uv.getX(i) * (u1 - u0), v0 + uv.getY(i) * (v1 - v0));
      }
    }
    return g;
  }, []);
  useEffect(() => () => boxGeo.dispose(), [boxGeo]);

  const items = useMemo(() => {
    const rowsZ = [-0.39, -0.13, 0.13, 0.39];
    const list: { pos: [number, number, number]; color: THREE.Color }[] = [];
    let bay = 0;
    for (let x = 2.35; x >= -1.95; x -= 0.56, bay++) {
      // Taper the stack heights toward the bow so it reads like a real profile.
      const tiers = x > 1.9 ? 2 : x > 1.4 ? 3 : 4;
      rowsZ.forEach((z, ri) => {
        // Outboard rows one tier lower than the block centre.
        const rowTiers = ri === 0 || ri === rowsZ.length - 1 ? Math.max(2, tiers - 1) : tiers;
        for (let t = 0; t < rowTiers; t++) {
          const color = new THREE.Color(CONTAINER_COLORS[(bay * 5 + ri * 3 + t) % CONTAINER_COLORS.length]);
          list.push({ pos: [x, 0.62 + t * 0.17, z], color });
        }
      });
    }
    return list;
  }, []);

  useLayoutEffect(() => {
    const mesh = ref.current;
    if (!mesh) return;
    const dummy = new THREE.Object3D();
    items.forEach((it, i) => {
      dummy.position.set(it.pos[0], it.pos[1], it.pos[2]);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
      mesh.setColorAt(i, it.color);
    });
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  }, [items]);

  return (
    <instancedMesh ref={ref} args={[boxGeo, undefined, items.length]} castShadow receiveShadow>
      <meshStandardMaterial
        map={tex.map}
        normalMap={tex.normalMap}
        normalScale={new THREE.Vector2(0.55, 0.55)}
        roughnessMap={tex.roughnessMap}
        metalness={0.25}
      />
    </instancedMesh>
  );
}

/** Small animated ensign on a light plane — cheap (16×8 grid, no per-frame
 *  normal recompute; the wave is subtle enough that static normals read fine). */
function Flag({ position }: { position: [number, number, number] }) {
  const flagRef = useRef<THREE.Mesh>(null);
  const geometry = useMemo(() => new THREE.PlaneGeometry(0.7, 0.4, 16, 8), []);

  useFrame(({ clock }) => {
    if (!flagRef.current) return;
    const time = clock.getElapsedTime();
    const positions = geometry.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i);
      const y = positions.getY(i);
      const wave = Math.sin(time * 3 + x * 6) * 0.05 + Math.cos(time * 2 + y * 4) * 0.03;
      positions.setZ(i, wave + x * 0.02);
    }
    positions.needsUpdate = true;
  });

  return (
    <mesh ref={flagRef} geometry={geometry} position={position} rotation={[0, Math.PI / 2, 0]} scale={0.5}>
      <meshStandardMaterial color="#e63946" roughness={0.6} metalness={0.1} side={THREE.DoubleSide} />
    </mesh>
  );
}

/** Slowly idling screw propeller — merged twisted blades + boss, 1 draw call. */
function Propeller({ shipType }: { shipType: ShipType }) {
  const ref = useRef<THREE.Mesh>(null);
  const geometry = useMemo(
    () => buildPropeller(shipType === "tanker" || shipType === "bulk" ? 4 : 5, 0.14),
    [shipType]
  );
  useEffect(() => () => geometry.dispose(), [geometry]);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.x += delta * 0.8;
  });
  return (
    <mesh ref={ref} geometry={geometry} position={[-3.16, -0.44, 0]}>
      <meshStandardMaterial color="#b8902f" metalness={0.85} roughness={0.3} side={THREE.DoubleSide} />
    </mesh>
  );
}

/** Static stern gear: tail shaft, stern-tube bossing, foil rudder, horn/skeg. */
function SternGear({ shipType }: { shipType: ShipType }) {
  const geometry = useMemo(() => buildSternGear(shipType), [shipType]);
  useEffect(() => () => geometry.dispose(), [geometry]);
  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial color="#5a2620" metalness={0.35} roughness={0.6} />
    </mesh>
  );
}

interface ShipModel3DProps {
  shipType: ShipType;
  /** Uniform scale of the whole vessel. */
  scale?: number;
}

export function ShipModel3D({ shipType, scale = 1 }: ShipModel3DProps) {
  const cfg = shipConfigs[shipType];
  const { hull, deck } = getHullSet(shipType);
  const hullTex = getHullTextures(shipType);
  const deckTex = getDeckTextures(shipType);
  const funnelTex = getFunnelTexture(shipType);
  const ssTex = getSuperstructureTextures(shipType, cfg.superstructureColor);

  // Stepped superstructure + recessed bridge glass + lathed funnel (3 draws).
  const ss = useMemo(() => buildSuperstructure(shipType, cfg), [shipType, cfg]);
  useEffect(
    () => () => {
      ss.walls.dispose();
      ss.glass.dispose();
      ss.funnel.dispose();
    },
    [ss]
  );

  const navLights: { position: [number, number, number]; color: string }[] = [
    // sidelights on the bridge-wing consoles, where they live on a real ship
    { position: [cfg.bridgePos[0] + 0.02, ss.sideLightY, ss.wingHalfSpan - 0.05], color: "#00ff3b" }, // starboard
    { position: [cfg.bridgePos[0] + 0.02, ss.sideLightY, -(ss.wingHalfSpan - 0.05)], color: "#ff3030" }, // port
    { position: [-HALF + 0.25, deckYAt(shipType, -HALF + 0.25) + 0.18, 0], color: "#f8fafc" }, // stern
    { position: [3.05, deckYAt(shipType, 3.05) + 0.56, 0], color: "#f8fafc" }, // masthead
  ];

  // Bulk-carrier hatch covers laid out along the cargo length.
  const hatchX = [2.2, 1.25, 0.3, -0.65, -1.55];

  return (
    <group scale={scale} position={[0, 0.1 * scale, 0]}>
      {/* ── Lofted hull (bulb included) — plating, boot-top, draft marks, Plimsoll,
          name are in the texture. Two materials: port gets the mirrored-text map
          so the name/marks read correctly on both sides. ── */}
      <mesh geometry={hull} castShadow receiveShadow>
        <meshStandardMaterial
          attach="material-0"
          map={hullTex.portMap}
          normalMap={hullTex.normalMap}
          normalScale={new THREE.Vector2(0.6, 0.6)}
          roughnessMap={hullTex.roughnessMap}
          metalness={0.3}
          envMapIntensity={0.9}
        />
        <meshStandardMaterial
          attach="material-1"
          map={hullTex.map}
          normalMap={hullTex.normalMap}
          normalScale={new THREE.Vector2(0.6, 0.6)}
          roughnessMap={hullTex.roughnessMap}
          metalness={0.3}
          envMapIntensity={0.9}
        />
      </mesh>

      {/* ── Weather deck (separate geometry → crisp deck edge) ── */}
      <mesh geometry={deck} castShadow receiveShadow>
        <meshStandardMaterial
          map={deckTex.map}
          normalMap={deckTex.normalMap}
          normalScale={new THREE.Vector2(0.5, 0.5)}
          roughnessMap={deckTex.roughnessMap}
          metalness={0.18}
        />
      </mesh>

      {/* ── Cargo ── */}
      {cfg.showContainers && <ContainerStacks />}

      {cfg.showHatches &&
        hatchX.map((x, i) => (
          <group key={`hatch-${i}`}>
            <mesh position={[x, deckYAt(shipType, x) + 0.03, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.78, 0.06, 1.02]} />
              <meshStandardMaterial color="#2b333d" metalness={0.2} roughness={0.7} />
            </mesh>
            <mesh position={[x, deckYAt(shipType, x) + 0.09, 0]} castShadow>
              <boxGeometry args={[0.68, 0.08, 0.92]} />
              <meshStandardMaterial color="#3b4550" metalness={0.2} roughness={0.65} />
            </mesh>
          </group>
        ))}

      {/* ── Superstructure: stepped tiers + recessed bridge glass + wings (3 draws) ── */}
      <mesh geometry={ss.walls} castShadow receiveShadow>
        <meshStandardMaterial
          map={ssTex.map}
          emissiveMap={ssTex.emissiveMap}
          emissive="#ffffff"
          emissiveIntensity={0.55}
          normalMap={ssTex.normalMap}
          normalScale={new THREE.Vector2(0.7, 0.7)}
          metalness={0.12}
          roughness={0.5}
        />
      </mesh>
      <mesh geometry={ss.glass}>
        <meshStandardMaterial
          color="#16222f"
          metalness={0.1}
          roughness={0.12}
          envMapIntensity={1.4}
          emissive="#ffd9a0"
          emissiveIntensity={0.1}
        />
      </mesh>
      <mesh geometry={ss.funnel} castShadow>
        <meshStandardMaterial map={funnelTex} metalness={0.3} roughness={0.5} />
      </mesh>

      <Flag position={[-HALF + 0.25, deckYAt(shipType, -HALF + 0.25) + 0.32, 0.02]} />

      {/* ── Propulsion: twisted-blade propeller + foil rudder under the counter ── */}
      <Propeller shipType={shipType} />
      <SternGear shipType={shipType} />

      {/* ── Type-specific deck equipment (railings, mooring gear, cranes…) ── */}
      <ShipDetails type={shipType} cfg={cfg} />

      {/* Navigation lights (emissive only — no point lights) */}
      {navLights.map((l, i) => (
        <mesh key={`nav-${i}`} position={l.position}>
          <sphereGeometry args={[0.028, 10, 10]} />
          <meshStandardMaterial color={l.color} emissive={l.color} emissiveIntensity={1.6} />
        </mesh>
      ))}
    </group>
  );
}

export default ShipModel3D;
