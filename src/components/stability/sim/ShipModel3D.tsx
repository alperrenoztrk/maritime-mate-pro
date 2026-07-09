import { useLayoutEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";

/**
 * Presentational, offline-safe 3D merchant vessel for the beta stability sim.
 *
 * Proportions and details are tuned against real vessel photographs (long,
 * sleek hull; red anti-fouling below a thin boot-top with dark topsides;
 * deck-filling container stacks; aft accommodation with the funnel behind it;
 * centreline cranes on the bulker). Kept deliberately trimmed for this surface:
 *   - No baked G/B/M markers or tank cut-away — the sim draws its own markers.
 *   - No heel/trim animation here — the parent group applies heel.
 *   - `meshStandardMaterial` only (no HDR-dependent clearcoat) and no per-light
 *     `pointLight`, so it renders fast and works offline / in a WebView.
 *   - Container stacks use a single `InstancedMesh` (one draw call for ~80 TEU).
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

const HALF = 3.5; // half length (overall ~7 units)
const BEAM = 1.28;

interface ShipConfig {
  hullColor: string;
  deckColor: string;
  superstructureColor: string;
  superstructurePos: [number, number, number];
  superstructureSize: [number, number, number];
  bridgePos: [number, number, number];
  funnelPos: [number, number, number];
  showCranes: boolean;
  showContainers: boolean;
  showHatches: boolean;
  showTankerPiping: boolean;
  showRoRoRamp: boolean;
  showPassengerDecks: boolean;
  extraLifeboats: number;
}

const shipConfigs: Record<ShipType, ShipConfig> = {
  container: {
    hullColor: "#8f3b34", // classic container-line red topside
    deckColor: "#3a4658",
    superstructureColor: "#d8c7a6",
    superstructurePos: [-2.55, 0.86, 0],
    superstructureSize: [1.15, 0.98, 1.06],
    bridgePos: [-2.55, 1.52, 0],
    funnelPos: [-3.02, 1.3, 0],
    showCranes: false,
    showContainers: true,
    showHatches: false,
    showTankerPiping: false,
    showRoRoRamp: false,
    showPassengerDecks: false,
    extraLifeboats: 1,
  },
  tanker: {
    hullColor: "#24313e",
    deckColor: "#3a4655",
    superstructureColor: "#eef2f6",
    superstructurePos: [-2.85, 0.9, 0],
    superstructureSize: [1.1, 0.98, 1.05],
    bridgePos: [-2.85, 1.56, 0],
    funnelPos: [-3.2, 1.42, 0],
    showCranes: false,
    showContainers: false,
    showHatches: false,
    showTankerPiping: true,
    showRoRoRamp: false,
    showPassengerDecks: false,
    extraLifeboats: 2,
  },
  bulk: {
    hullColor: "#1e2732", // near-black topside like the reference bulker
    deckColor: "#2f3a49",
    superstructureColor: "#eef1f4",
    superstructurePos: [-2.6, 0.9, 0],
    superstructureSize: [1.18, 1.0, 1.06],
    bridgePos: [-2.6, 1.58, 0],
    funnelPos: [-3.05, 1.4, 0],
    showCranes: true,
    showContainers: false,
    showHatches: true,
    showTankerPiping: false,
    showRoRoRamp: false,
    showPassengerDecks: false,
    extraLifeboats: 1,
  },
  roro: {
    hullColor: "#20304a",
    deckColor: "#26303c",
    superstructureColor: "#f4f7fa",
    superstructurePos: [-1.55, 1.02, 0],
    superstructureSize: [2.2, 1.16, 1.14],
    bridgePos: [-1.5, 1.74, 0],
    funnelPos: [-2.75, 1.6, 0],
    showCranes: false,
    showContainers: false,
    showHatches: false,
    showTankerPiping: false,
    showRoRoRamp: true,
    showPassengerDecks: false,
    extraLifeboats: 2,
  },
  passenger: {
    hullColor: "#33475d",
    deckColor: "#26303c",
    superstructureColor: "#f6f9fc",
    superstructurePos: [-0.2, 1.05, 0],
    superstructureSize: [4.2, 1.2, 1.16],
    bridgePos: [0.5, 1.98, 0],
    funnelPos: [0.3, 2.08, 0],
    showCranes: false,
    showContainers: false,
    showHatches: false,
    showTankerPiping: false,
    showRoRoRamp: false,
    showPassengerDecks: true,
    extraLifeboats: 4,
  },
};

/* ─── Container stacks (single instanced draw call) ─── */
const CONTAINER_COLORS = ["#b23b3b", "#c99a3f", "#3a6ea5", "#3f8f5b", "#c4c8cc", "#c1663b", "#6d4a86", "#2f6d63"];
const CONTAINER_BOX: [number, number, number] = [0.5, 0.16, 0.26];

function ContainerStacks() {
  const ref = useRef<THREE.InstancedMesh>(null);

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
    <instancedMesh ref={ref} args={[undefined, undefined, items.length]} castShadow>
      <boxGeometry args={CONTAINER_BOX} />
      <meshStandardMaterial metalness={0.12} roughness={0.72} />
    </instancedMesh>
  );
}

/** Small animated ensign on a light plane — cheap (16×8 grid). */
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
    geometry.computeVertexNormals();
  });

  return (
    <mesh ref={flagRef} geometry={geometry} position={position} rotation={[0, Math.PI / 2, 0]}>
      <meshStandardMaterial color="#e63946" roughness={0.6} metalness={0.1} side={THREE.DoubleSide} />
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

  const topsideMat = { color: cfg.hullColor, metalness: 0.2, roughness: 0.5 };
  const antifoulMat = { color: "#8a2f26", metalness: 0.15, roughness: 0.78 };

  const portholes = useMemo(
    () => Array.from({ length: 4 }, (_, i) => ({ x: cfg.superstructurePos[0] + 0.35 - i * 0.28, y: 0.08 })),
    [cfg.superstructurePos]
  );

  const navLights: { position: [number, number, number]; color: string }[] = [
    { position: [HALF - 0.05, 0.55, 0.5], color: "#00ff3b" }, // starboard
    { position: [HALF - 0.05, 0.55, -0.5], color: "#ff3030" }, // port
    { position: [-HALF + 0.1, 0.6, 0], color: "#f8fafc" }, // stern
  ];

  // Bulk-carrier hatches / cranes laid out along the cargo length.
  const hatchX = [2.2, 1.25, 0.3, -0.65, -1.55];
  const craneX = [1.72, 0.77, -0.18];

  return (
    <group scale={scale} position={[0, 0.1 * scale, 0]}>
      {/* ── Hull ── */}
      {/* Dark topside (above waterline) */}
      <RoundedBox position={[0, 0.2, 0]} args={[6.98, 0.62, BEAM]} radius={0.07} smoothness={3}>
        <meshStandardMaterial {...topsideMat} />
      </RoundedBox>
      {/* Anti-fouling red bottom (below waterline), slightly narrower */}
      <mesh position={[0, -0.46, 0]}>
        <boxGeometry args={[6.78, 0.72, BEAM - 0.06]} />
        <meshStandardMaterial {...antifoulMat} />
      </mesh>
      {/* Rounded bilge hint */}
      <mesh position={[0, -0.12, 0]}>
        <boxGeometry args={[6.9, 0.06, BEAM + 0.015]} />
        <meshStandardMaterial color="#6b241d" metalness={0.15} roughness={0.7} />
      </mesh>
      {/* Keel */}
      <mesh position={[0, -0.8, 0]}>
        <boxGeometry args={[6.2, 0.05, 0.18]} />
        <meshStandardMaterial color="#5c211a" metalness={0.15} roughness={0.75} />
      </mesh>

      {/* ── Bow ── raked, tapering to a point */}
      <mesh position={[HALF - 0.15, 0.2, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.03, 0.62, 1.5, 4]} />
        <meshStandardMaterial {...topsideMat} />
      </mesh>
      <mesh position={[HALF - 0.2, -0.46, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.02, 0.58, 1.35, 4]} />
        <meshStandardMaterial {...antifoulMat} />
      </mesh>
      {/* Bulbous bow */}
      <mesh position={[HALF + 0.18, -0.62, 0]}>
        <sphereGeometry args={[0.24, 14, 14]} />
        <meshStandardMaterial {...antifoulMat} />
      </mesh>
      {/* Forecastle deck */}
      <mesh position={[2.75, 0.6, 0]}>
        <boxGeometry args={[0.7, 0.2, BEAM - 0.12]} />
        <meshStandardMaterial color={cfg.deckColor} metalness={0.15} roughness={0.7} />
      </mesh>

      {/* ── Stern ── flat transom */}
      <mesh position={[-HALF + 0.18, 0.12, 0]}>
        <boxGeometry args={[0.5, 0.95, BEAM - 0.02]} />
        <meshStandardMaterial {...topsideMat} />
      </mesh>
      <mesh position={[-HALF + 0.12, -0.42, 0]}>
        <boxGeometry args={[0.36, 0.55, BEAM - 0.12]} />
        <meshStandardMaterial {...antifoulMat} />
      </mesh>

      {/* ── Main deck ── */}
      <RoundedBox position={[-0.1, 0.5, 0]} args={[6.5, 0.08, BEAM - 0.08]} radius={0.03} smoothness={2}>
        <meshStandardMaterial color={cfg.deckColor} metalness={0.15} roughness={0.85} />
      </RoundedBox>

      {/* Guard rails */}
      {[0.58, -0.58].map((z) => (
        <mesh key={`rail-${z}`} position={[-0.1, 0.62, z]}>
          <boxGeometry args={[6.2, 0.03, 0.03]} />
          <meshStandardMaterial color="#9ca3af" metalness={0.3} roughness={0.5} />
        </mesh>
      ))}

      {/* ── Cargo ── */}
      {cfg.showContainers && <ContainerStacks />}

      {cfg.showHatches &&
        hatchX.map((x, i) => (
          <group key={`hatch-${i}`}>
            <mesh position={[x, 0.56, 0]}>
              <boxGeometry args={[0.78, 0.06, BEAM - 0.2]} />
              <meshStandardMaterial color="#2b333d" metalness={0.2} roughness={0.7} />
            </mesh>
            <mesh position={[x, 0.62, 0]}>
              <boxGeometry args={[0.68, 0.08, BEAM - 0.3]} />
              <meshStandardMaterial color="#3b4550" metalness={0.2} roughness={0.65} />
            </mesh>
          </group>
        ))}

      {/* Bulk-carrier deck cranes on the centreline (khaki, angled up) */}
      {cfg.showCranes &&
        craneX.map((x, i) => (
          <group key={`crane-${i}`} position={[x, 0.6, 0]}>
            <mesh position={[0, 0.18, 0]}>
              <cylinderGeometry args={[0.06, 0.08, 0.36, 10]} />
              <meshStandardMaterial color="#c9b58a" metalness={0.25} roughness={0.6} />
            </mesh>
            <mesh position={[0.32, 0.62, 0]} rotation={[0, 0, Math.PI / 3.2]}>
              <cylinderGeometry args={[0.03, 0.04, 1.15, 8]} />
              <meshStandardMaterial color="#d8c79b" metalness={0.25} roughness={0.6} />
            </mesh>
          </group>
        ))}

      {/* Tanker piping + manifold */}
      {cfg.showTankerPiping && (
        <>
          {[1.9, 0.9, -0.1, -1.1].map((x) => (
            <mesh key={`pipe-${x}`} position={[x, 0.6, 0]}>
              <cylinderGeometry args={[0.045, 0.045, 0.9, 10]} />
              <meshStandardMaterial color="#e07b2e" metalness={0.5} roughness={0.45} />
            </mesh>
          ))}
          {[0.32, -0.32].map((z) => (
            <mesh key={`manifold-${z}`} position={[0.4, 0.58, z]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.035, 0.035, 3.6, 10]} />
              <meshStandardMaterial color="#f0954a" metalness={0.5} roughness={0.45} />
            </mesh>
          ))}
        </>
      )}

      {/* Ro-Ro stern ramp */}
      {cfg.showRoRoRamp && (
        <group position={[-HALF + 0.05, 0.15, 0]}>
          <mesh rotation={[0, 0, Math.PI / 9]}>
            <boxGeometry args={[0.8, 0.05, BEAM - 0.3]} />
            <meshStandardMaterial color="#94a3b8" metalness={0.2} roughness={0.6} />
          </mesh>
        </group>
      )}

      {/* ── Superstructure (accommodation block) ── */}
      <RoundedBox position={cfg.superstructurePos} args={cfg.superstructureSize} radius={0.05} smoothness={3}>
        <meshStandardMaterial color={cfg.superstructureColor} metalness={0.12} roughness={0.5} />
      </RoundedBox>
      {/* Deck-house window bands (front + sides) */}
      {[0.2, -0.05, -0.3].map((yOff, i) => (
        <mesh
          key={`band-${i}`}
          position={[cfg.superstructurePos[0] + cfg.superstructureSize[0] / 2 + 0.01, cfg.superstructurePos[1] + yOff, 0]}
        >
          <boxGeometry args={[0.02, 0.07, cfg.superstructureSize[2] - 0.12]} />
          <meshStandardMaterial color="#243244" metalness={0.2} roughness={0.3} />
        </mesh>
      ))}

      {/* Bridge + windows */}
      <RoundedBox position={cfg.bridgePos} args={[0.95, 0.4, cfg.superstructureSize[2] - 0.06]} radius={0.04} smoothness={3}>
        <meshStandardMaterial color={cfg.superstructureColor} metalness={0.12} roughness={0.45} />
      </RoundedBox>
      <mesh position={[cfg.bridgePos[0] + 0.48, cfg.bridgePos[1] + 0.02, 0]}>
        <boxGeometry args={[0.03, 0.16, cfg.superstructureSize[2] - 0.2]} />
        <meshStandardMaterial color="#1b2733" metalness={0.15} roughness={0.2} transparent opacity={0.75} />
      </mesh>

      {/* Portholes on the accommodation side */}
      {portholes.map((h, i) => (
        <mesh key={`ph-${i}`} position={[h.x, h.y + 0.7, cfg.superstructureSize[2] / 2 + 0.01]}>
          <circleGeometry args={[0.035, 14]} />
          <meshStandardMaterial color="#cfe4ff" emissive="#2563eb" emissiveIntensity={0.2} />
        </mesh>
      ))}

      {/* Funnel + cap (behind the accommodation) */}
      <mesh position={cfg.funnelPos}>
        <cylinderGeometry args={[0.15, 0.2, 0.55, 12]} />
        <meshStandardMaterial color="#4b5563" metalness={0.45} roughness={0.5} />
      </mesh>
      <mesh position={[cfg.funnelPos[0], cfg.funnelPos[1] + 0.18, cfg.funnelPos[2]]}>
        <cylinderGeometry args={[0.16, 0.16, 0.1, 12]} />
        <meshStandardMaterial color="#c0392b" metalness={0.3} roughness={0.5} />
      </mesh>

      {/* Radar mast + flag */}
      <mesh position={[cfg.bridgePos[0], cfg.bridgePos[1] + 0.5, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.6, 8]} />
        <meshStandardMaterial color="#334155" metalness={0.6} roughness={0.4} />
      </mesh>
      <group position={[cfg.bridgePos[0], cfg.bridgePos[1] + 0.65, 0]}>
        <mesh position={[0.16, 0, 0]}>
          <boxGeometry args={[0.34, 0.05, 0.05]} />
          <meshStandardMaterial color="#e2e8f0" metalness={0.5} roughness={0.35} />
        </mesh>
      </group>
      <Flag position={[-HALF + 0.25, 0.75, 0.2]} />

      {/* Passenger decks (stacked tiers) */}
      {cfg.showPassengerDecks &&
        [0, 0.42, 0.84].map((yOff, i) => (
          <mesh key={`pax-${i}`} position={[-0.2, 1.15 + yOff, 0]}>
            <boxGeometry args={[4.0 - i * 0.35, 0.32, BEAM - 0.06]} />
            <meshStandardMaterial color="#eef2f6" metalness={0.1} roughness={0.5} />
          </mesh>
        ))}

      {/* Propeller + rudder */}
      <group position={[-HALF + 0.02, -0.5, 0]} rotation={[0, 0, Math.PI / 2]}>
        <mesh>
          <torusGeometry args={[0.1, 0.02, 8, 14]} />
          <meshStandardMaterial color="#caa63a" metalness={0.7} roughness={0.3} />
        </mesh>
        {[0, (2 * Math.PI) / 3, (4 * Math.PI) / 3].map((r, i) => (
          <mesh key={`blade-${i}`} rotation={[0, r, 0]}>
            <boxGeometry args={[0.03, 0.19, 0.07]} />
            <meshStandardMaterial color="#b8902f" metalness={0.7} roughness={0.3} />
          </mesh>
        ))}
      </group>
      <mesh position={[-HALF + 0.16, -0.62, 0]}>
        <boxGeometry args={[0.07, 0.32, 0.24]} />
        <meshStandardMaterial color="#4b5563" metalness={0.4} roughness={0.6} />
      </mesh>

      {/* Lifeboats beside the accommodation */}
      {Array.from({ length: cfg.extraLifeboats }).map((_, i) => (
        <mesh
          key={`lb-${i}`}
          position={[cfg.superstructurePos[0] - 0.35 + i * 0.34, cfg.superstructurePos[1] - 0.1, -cfg.superstructureSize[2] / 2 - 0.08]}
          rotation={[0, Math.PI / 2, 0]}
        >
          <capsuleGeometry args={[0.1, 0.42, 4, 8]} />
          <meshStandardMaterial color="#f97316" metalness={0.2} roughness={0.5} />
        </mesh>
      ))}

      {/* Navigation lights (emissive only — no point lights) */}
      {navLights.map((l, i) => (
        <mesh key={`nav-${i}`} position={l.position}>
          <sphereGeometry args={[0.045, 10, 10]} />
          <meshStandardMaterial color={l.color} emissive={l.color} emissiveIntensity={1.6} />
        </mesh>
      ))}
    </group>
  );
}

export default ShipModel3D;
