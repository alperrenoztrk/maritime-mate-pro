import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { getHullSet, hullForms, HALF, WL_Y, deckYAt } from "./hullGeometry";
import {
  getContainerTextures,
  getDeckTextures,
  getFunnelTexture,
  getHullTextures,
  getWindowStrip,
} from "./proceduralTextures";
import { ShipDetails } from "./ShipDetails";
import { ShipArchitecture, SternRunningGear, shipVisualProfiles } from "./ShipArchitecture";

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
  showPassengerDecks: boolean;
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
    showPassengerDecks: false,
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
    showPassengerDecks: false,
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
    showPassengerDecks: false,
    extraLifeboats: 1,
  },
  roro: {
    superstructureColor: "#f4f7fa",
    superstructurePos: [-0.25, 1.2, 0],
    superstructureSize: [5.5, 1.04, 1.14],
    bridgePos: [1.75, 1.9, 0],
    funnelPos: [-2.15, 1.82, 0],
    showContainers: false,
    showHatches: false,
    showPassengerDecks: false,
    extraLifeboats: 2,
  },
  passenger: {
    superstructureColor: "#f6f9fc",
    superstructurePos: [-0.35, 0.93, 0],
    superstructureSize: [4.7, 0.58, 1.14],
    bridgePos: [1.2, 2.32, 0],
    funnelPos: [-0.85, 2.48, 0],
    showContainers: false,
    showHatches: false,
    showPassengerDecks: true,
    extraLifeboats: 4,
  },
};

/* ─── Container stacks (single instanced draw call, textured + tinted) ─── */
const CONTAINER_COLORS = ["#b23b3b", "#c99a3f", "#3a6ea5", "#3f8f5b", "#c4c8cc", "#c1663b", "#6d4a86", "#2f6d63"];
const CONTAINER_BOX: [number, number, number] = [0.5, 0.16, 0.26];

function ContainerStacks() {
  const ref = useRef<THREE.InstancedMesh>(null);
  const tex = getContainerTextures();

  const items = useMemo(() => {
    const rowsZ = [-0.39, -0.13, 0.13, 0.39];
    const list: { pos: [number, number, number]; color: THREE.Color }[] = [];
    let bay = 0;
    for (let x = 2.35; x >= -1.95; x -= 0.56, bay++) {
      // A bay plan with a lower bow stack and varied centre bays avoids the
      // perfectly rectangular "toy block" silhouette.
      const bayTiers = [2, 3, 4, 5, 4, 5, 3, 2];
      const tiers = bayTiers[bay] ?? 3;
      rowsZ.forEach((z, ri) => {
        // Outboard rows sit lower; selected cells are left empty like real
        // operational stows instead of filling every slot identically.
        const rowTiers = ri === 0 || ri === rowsZ.length - 1 ? Math.max(1, tiers - 1) : tiers;
        for (let t = 0; t < rowTiers; t++) {
          if ((bay === 3 && ri === 0 && t === rowTiers - 1) || (bay === 5 && ri === 3 && t > 1)) continue;
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
    <instancedMesh ref={ref} args={[undefined, undefined, items.length]} castShadow receiveShadow>
      <boxGeometry args={CONTAINER_BOX} />
      <meshPhysicalMaterial
        map={tex.map}
        bumpMap={tex.bumpMap}
        bumpScale={0.01}
        roughnessMap={tex.roughnessMap}
        roughness={0.68}
        metalness={0.04}
        clearcoat={0.08}
        clearcoatRoughness={0.7}
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

/** Textured emissive window band, as a thin plane hovering off a wall.
 *  UVs are scaled by width so window density stays constant on any band. */
function WindowBand({
  position,
  rotationY,
  width,
  height,
  strip,
}: {
  position: [number, number, number];
  rotationY: number;
  width: number;
  height: number;
  strip: { map: THREE.Texture; emissiveMap: THREE.Texture };
}) {
  const geometry = useMemo(() => {
    const g = new THREE.PlaneGeometry(width, height);
    const uv = g.attributes.uv as THREE.BufferAttribute;
    const repeat = Math.max(1, Math.round(width / 1.05));
    for (let i = 0; i < uv.count; i++) uv.setX(i, uv.getX(i) * repeat);
    return g;
  }, [width, height]);
  useEffect(() => () => geometry.dispose(), [geometry]);
  return (
    <mesh position={position} rotation={[0, rotationY, 0]} geometry={geometry}>
      <meshPhysicalMaterial
        map={strip.map}
        emissiveMap={strip.emissiveMap}
        emissive="#ffffff"
        emissiveIntensity={0.42}
        roughness={0.2}
        metalness={0.01}
        clearcoat={0.65}
        clearcoatRoughness={0.2}
      />
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
  const profile = shipVisualProfiles[shipType];
  const vesselScale: [number, number, number] = [
    scale * profile.lengthScale,
    scale,
    scale * profile.beamScale,
  ];
  const form = hullForms[shipType];
  const { hull, deck } = getHullSet(shipType);
  const hullTex = getHullTextures(shipType);
  const deckTex = getDeckTextures(shipType);
  const funnelTex = getFunnelTexture(shipType);
  const accomStrip = getWindowStrip(cfg.superstructureColor, "accom");
  const bridgeStrip = getWindowStrip(cfg.superstructureColor, "bridge");
  const paxStrip = getWindowStrip(cfg.superstructureColor, "pax");

  const ssX = cfg.superstructurePos[0];
  const ssY = cfg.superstructurePos[1];
  const [ssW, ssH, ssD] = cfg.superstructureSize;

  const navLights: { position: [number, number, number]; color: string }[] = [
    { position: [cfg.bridgePos[0], cfg.bridgePos[1] + 0.05, ssD / 2 + 0.04], color: "#00ff3b" }, // starboard
    { position: [cfg.bridgePos[0], cfg.bridgePos[1] + 0.05, -ssD / 2 - 0.04], color: "#ff3030" }, // port
    { position: [-HALF + 0.25, deckYAt(shipType, -HALF + 0.25) + 0.18, 0], color: "#f8fafc" }, // stern
    { position: [3.05, deckYAt(shipType, 3.05) + 0.56, 0], color: "#f8fafc" }, // masthead
  ];

  // Bulk-carrier hatch covers laid out along the cargo length.
  const hatchX = [2.2, 1.25, 0.3, -0.65, -1.55];

  return (
    <group scale={vesselScale} position={[0, 0.1 * scale, 0]}>
      {/* ── Lofted hull — plating, boot-top, draft marks, Plimsoll, name are in the texture ── */}
      <mesh geometry={hull} castShadow receiveShadow>
        <meshPhysicalMaterial
          map={hullTex.map}
          bumpMap={hullTex.bumpMap}
          bumpScale={0.018}
          roughnessMap={hullTex.roughnessMap}
          roughness={0.58}
          metalness={0.04}
          clearcoat={0.16}
          clearcoatRoughness={0.62}
          envMapIntensity={1.0}
        />
      </mesh>

      {/* ── Weather deck (separate geometry → crisp deck edge) ── */}
      <mesh geometry={deck} castShadow receiveShadow>
        <meshPhysicalMaterial
          map={deckTex.map}
          bumpMap={deckTex.bumpMap}
          bumpScale={0.012}
          roughnessMap={deckTex.roughnessMap}
          roughness={0.74}
          metalness={0.03}
          clearcoat={0.04}
          clearcoatRoughness={0.82}
        />
      </mesh>

      {/* ── Bulbous bow at the forefoot ── */}
      {form.bulb && (
        <mesh position={[HALF - 0.02 + form.bulb.length * 0.9, WL_Y - form.forefootRise - form.bulb.radius * 0.55, 0]} scale={[form.bulb.length / form.bulb.radius, 1, 0.92]} castShadow>
          <sphereGeometry args={[form.bulb.radius, 14, 12]} />
          <meshStandardMaterial color="#7d2d24" metalness={0.2} roughness={0.75} />
        </mesh>
      )}

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

      {/* ── Superstructure (accommodation block) with textured window bands ── */}
      <RoundedBox position={cfg.superstructurePos} args={cfg.superstructureSize} radius={0.05} smoothness={3} castShadow receiveShadow>
        <meshPhysicalMaterial
          color={cfg.superstructureColor}
          metalness={0.03}
          roughness={0.5}
          clearcoat={0.14}
          clearcoatRoughness={0.6}
        />
      </RoundedBox>
      {[0.22, -0.02].map((yOff, i) => (
        <WindowBand
          key={`front-${i}`}
          position={[ssX + ssW / 2 + 0.006, ssY + yOff * ssH, 0]}
          rotationY={Math.PI / 2}
          width={ssD - 0.14}
          height={0.09}
          strip={accomStrip}
        />
      ))}
      {[0.22, -0.02].map((yOff, i) => (
        <group key={`side-${i}`}>
          <WindowBand
            position={[ssX, ssY + yOff * ssH, ssD / 2 + 0.006]}
            rotationY={0}
            width={ssW - 0.14}
            height={0.09}
            strip={accomStrip}
          />
          <WindowBand
            position={[ssX, ssY + yOff * ssH, -ssD / 2 - 0.006]}
            rotationY={Math.PI}
            width={ssW - 0.14}
            height={0.09}
            strip={accomStrip}
          />
        </group>
      ))}

      {/* Bridge deck + wraparound bridge windows */}
      <RoundedBox position={cfg.bridgePos} args={[0.95, 0.4, ssD - 0.06]} radius={0.04} smoothness={3} castShadow>
        <meshPhysicalMaterial
          color={cfg.superstructureColor}
          metalness={0.03}
          roughness={0.44}
          clearcoat={0.18}
          clearcoatRoughness={0.54}
        />
      </RoundedBox>
      <WindowBand
        position={[cfg.bridgePos[0] + 0.481, cfg.bridgePos[1] + 0.04, 0]}
        rotationY={Math.PI / 2}
        width={ssD - 0.16}
        height={0.14}
        strip={bridgeStrip}
      />

      {/* Funnel with company colours + exhaust pipes */}
      <mesh position={cfg.funnelPos} castShadow>
        <cylinderGeometry args={[0.15, 0.2, 0.55, 14]} />
        <meshPhysicalMaterial
          map={funnelTex}
          metalness={0.05}
          roughness={0.5}
          clearcoat={0.15}
          clearcoatRoughness={0.56}
        />
      </mesh>
      <mesh position={[cfg.funnelPos[0], cfg.funnelPos[1] + 0.29, cfg.funnelPos[2] + 0.05]}>
        <cylinderGeometry args={[0.035, 0.035, 0.12, 8]} />
        <meshStandardMaterial color="#14181d" metalness={0.5} roughness={0.5} />
      </mesh>
      <mesh position={[cfg.funnelPos[0], cfg.funnelPos[1] + 0.27, cfg.funnelPos[2] - 0.06]}>
        <cylinderGeometry args={[0.028, 0.028, 0.1, 8]} />
        <meshStandardMaterial color="#14181d" metalness={0.5} roughness={0.5} />
      </mesh>

      <Flag position={[-HALF + 0.25, deckYAt(shipType, -HALF + 0.25) + 0.32, 0.02]} />

      {/* Passenger decks (stacked tiers with window rows) */}
      {cfg.showPassengerDecks &&
        [0, 0.42, 0.84].map((yOff, i) => {
          const tierW = 4.0 - i * 0.35;
          const tierY = 1.24 + yOff;
          return (
            <group key={`pax-${i}`}>
              <mesh position={[-0.2, tierY, 0]} castShadow receiveShadow>
                <boxGeometry args={[tierW, 0.32, 1.16 - 0.06]} />
                <meshPhysicalMaterial
                  color="#eef2f6"
                  metalness={0.03}
                  roughness={0.5}
                  clearcoat={0.12}
                  clearcoatRoughness={0.62}
                />
              </mesh>
              <WindowBand position={[-0.2, tierY, (1.16 - 0.06) / 2 + 0.006]} rotationY={0} width={tierW - 0.2} height={0.1} strip={paxStrip} />
              <WindowBand position={[-0.2, tierY, -(1.16 - 0.06) / 2 - 0.006]} rotationY={Math.PI} width={tierW - 0.2} height={0.1} strip={paxStrip} />
            </group>
          );
        })}

      {/* Correct running gear: single-screw cargo ships, twin-screw Ro-Ro/passenger ships. */}
      <SternRunningGear type={shipType} />

      {/* Ship-family architecture, followed by the fine merged detail layers. */}
      <ShipArchitecture type={shipType} cfg={cfg} />
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
