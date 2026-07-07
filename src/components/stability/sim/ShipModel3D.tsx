import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";

/**
 * Presentational, offline-safe 3D merchant vessel for the beta stability sim.
 *
 * The geometry recipe is adapted from `Ship3DVisualization.tsx`'s `ShipModel`,
 * but deliberately trimmed for this surface:
 *   - No baked G/B/M markers or tank cut-away — the sim draws its own
 *     `StabilityMarkers` and keeps the hull solid.
 *   - No heel/trim animation here — the parent group applies heel.
 *   - `meshStandardMaterial` instead of `meshPhysicalMaterial` (clearcoat /
 *     envMapIntensity do nothing without an HDR env map, which we intentionally
 *     avoid so the scene renders inside a Capacitor WebView / offline).
 *   - Navigation lights are emissive spheres only — no per-light `pointLight`,
 *     which is the single biggest mobile GPU cost.
 *
 * The design waterline is placed at local y = 0 so the caller can drop the
 * vessel straight onto the water plane and heel it about that line.
 */

export type ShipType = "container" | "tanker" | "bulk" | "roro" | "passenger";

export const shipTypeOptions: { value: ShipType; label: string; description: string }[] = [
  { value: "container", label: "Konteyner", description: "Yüksek konteyner istifli, kıç üstü güverteli." },
  { value: "tanker", label: "Tanker", description: "Alçak güverte, boru hatları ve manifoldlar." },
  { value: "bulk", label: "Dökme", description: "Geniş ambar açıklıkları ve iri hatch cover'lar." },
  { value: "roro", label: "Ro-Ro", description: "Araç güvertesi ve kıç rampa düzeni." },
  { value: "passenger", label: "Yolcu", description: "Çok katlı üst yapı ve yaşam alanları." },
];

interface ShipConfig {
  hullColor: string;
  deckColor: string;
  superstructureColor: string;
  superstructurePos: [number, number, number];
  superstructureSize: [number, number, number];
  bridgePos: [number, number, number];
  showCranes: boolean;
  showContainers: boolean;
  showHatches: boolean;
  showTankerPiping: boolean;
  showRoRoRamp: boolean;
  showPassengerDecks: boolean;
  extraLifeboats: number;
  funnelPos: [number, number, number];
}

const shipConfigs: Record<ShipType, ShipConfig> = {
  container: {
    hullColor: "#1f2a36",
    deckColor: "#2b3a4a",
    superstructureColor: "#e5e7eb",
    superstructurePos: [-2.2, 0.85, 0],
    superstructureSize: [1.6, 0.9, 1.0],
    bridgePos: [-2.25, 1.45, 0],
    showCranes: false,
    showContainers: true,
    showHatches: false,
    showTankerPiping: false,
    showRoRoRamp: false,
    showPassengerDecks: false,
    extraLifeboats: 1,
    funnelPos: [-2.8, 1.25, 0],
  },
  tanker: {
    hullColor: "#2c3e50",
    deckColor: "#334155",
    superstructureColor: "#f1f5f9",
    superstructurePos: [-2.6, 0.9, 0],
    superstructureSize: [1.3, 0.95, 1.0],
    bridgePos: [-2.6, 1.55, 0],
    showCranes: false,
    showContainers: false,
    showHatches: false,
    showTankerPiping: true,
    showRoRoRamp: false,
    showPassengerDecks: false,
    extraLifeboats: 2,
    funnelPos: [-2.95, 1.4, 0],
  },
  bulk: {
    hullColor: "#243647",
    deckColor: "#374151",
    superstructureColor: "#e2e8f0",
    superstructurePos: [-2.0, 0.85, 0],
    superstructureSize: [1.5, 0.9, 1.0],
    bridgePos: [-2.05, 1.45, 0],
    showCranes: true,
    showContainers: false,
    showHatches: true,
    showTankerPiping: false,
    showRoRoRamp: false,
    showPassengerDecks: false,
    extraLifeboats: 1,
    funnelPos: [-2.6, 1.25, 0],
  },
  roro: {
    hullColor: "#1f2937",
    deckColor: "#1f2937",
    superstructureColor: "#f8fafc",
    superstructurePos: [-1.0, 0.95, 0],
    superstructureSize: [2.2, 1.1, 1.1],
    bridgePos: [-0.9, 1.65, 0],
    showCranes: false,
    showContainers: false,
    showHatches: false,
    showTankerPiping: false,
    showRoRoRamp: true,
    showPassengerDecks: false,
    extraLifeboats: 2,
    funnelPos: [-1.1, 1.5, 0],
  },
  passenger: {
    hullColor: "#2f3f52",
    deckColor: "#1f2937",
    superstructureColor: "#f8fafc",
    superstructurePos: [-0.4, 1.0, 0],
    superstructureSize: [3.2, 1.3, 1.2],
    bridgePos: [0.4, 2.0, 0],
    showCranes: false,
    showContainers: false,
    showHatches: false,
    showTankerPiping: false,
    showRoRoRamp: false,
    showPassengerDecks: true,
    extraLifeboats: 4,
    funnelPos: [0.2, 2.1, 0],
  },
};

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

  const hullMat = { color: cfg.hullColor, metalness: 0.25, roughness: 0.42 };

  const portholes = useMemo(
    () =>
      Array.from({ length: 10 }, (_, i) => ({
        x: 2.55 - i * 0.55,
        y: 0.05 + (i % 2 === 0 ? 0.05 : -0.02),
        z: 0.7,
      })),
    []
  );

  const navLights: { position: [number, number, number]; color: string }[] = [
    { position: [2.6, 0.5, 0.72], color: "#00ff3b" }, // starboard
    { position: [2.6, 0.5, -0.72], color: "#ff3030" }, // port
    { position: [-3.35, 0.55, 0], color: "#f8fafc" }, // stern
    { position: [-2.0, 1.8, 0], color: "#f8fafc" }, // masthead
  ];

  // The recipe below is authored with the waterline stripe at y = -0.1; lifting
  // the whole vessel by +0.1 puts the design waterline exactly at local y = 0.
  return (
    <group scale={scale} position={[0, 0.1, 0]}>
      {/* Hull — main body */}
      <RoundedBox position={[0, 0, 0]} args={[6.2, 0.85, 1.35]} radius={0.08} smoothness={3}>
        <meshStandardMaterial {...hullMat} />
      </RoundedBox>

      {/* Upper hull taper */}
      <RoundedBox position={[0, 0.35, 0]} args={[5.9, 0.35, 1.15]} radius={0.06} smoothness={3}>
        <meshStandardMaterial {...hullMat} />
      </RoundedBox>

      {/* Anti-fouling bottom */}
      <mesh position={[0, -0.55, 0]}>
        <boxGeometry args={[5.8, 0.45, 1.05]} />
        <meshStandardMaterial color="#b03a2e" metalness={0.2} roughness={0.8} />
      </mesh>

      {/* Keel */}
      <mesh position={[0, -0.8, 0]}>
        <boxGeometry args={[5.5, 0.05, 0.2]} />
        <meshStandardMaterial color="#8e2f25" metalness={0.2} roughness={0.75} />
      </mesh>

      {/* Boot-top / waterline stripe */}
      <mesh position={[0, -0.1, 0]}>
        <boxGeometry args={[6.15, 0.06, 1.36]} />
        <meshStandardMaterial color="#f1c40f" metalness={0.1} roughness={0.4} />
      </mesh>

      {/* Bow (tapered) */}
      <mesh position={[3.3, -0.05, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.05, 0.7, 1.3, 12]} />
        <meshStandardMaterial {...hullMat} />
      </mesh>

      {/* Bulbous bow */}
      <mesh position={[3.45, -0.55, 0]}>
        <sphereGeometry args={[0.28, 16, 16]} />
        <meshStandardMaterial color="#b03a2e" metalness={0.25} roughness={0.7} />
      </mesh>

      {/* Forecastle deck */}
      <mesh position={[2.7, 0.45, 0]}>
        <boxGeometry args={[0.9, 0.25, 1.2]} />
        <meshStandardMaterial color="#2c3e50" metalness={0.2} roughness={0.65} />
      </mesh>

      {/* Stern (blocky) */}
      <mesh position={[-3.0, 0.2, 0]}>
        <boxGeometry args={[0.6, 1.1, 1.1]} />
        <meshStandardMaterial {...hullMat} />
      </mesh>

      {/* Stern rounded cap */}
      <mesh position={[-3.4, -0.1, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.5, 0.55, 0.4, 14]} />
        <meshStandardMaterial {...hullMat} />
      </mesh>

      {/* Main deck */}
      <RoundedBox position={[0, 0.45, 0]} args={[6.0, 0.1, 1.25]} radius={0.04} smoothness={3}>
        <meshStandardMaterial color={cfg.deckColor} metalness={0.15} roughness={0.85} />
      </RoundedBox>

      {/* Hatch covers + coamings (bulk carriers) */}
      {cfg.showHatches &&
        [
          { x: 1.9, size: 1.1 },
          { x: 0.4, size: 1.35 },
          { x: -1.2, size: 1.2 },
        ].map((h, i) => (
          <group key={`hatch-${i}`}>
            <mesh position={[h.x, 0.52, 0]}>
              <boxGeometry args={[h.size + 0.1, 0.08, 1.15]} />
              <meshStandardMaterial color="#374151" metalness={0.2} roughness={0.7} />
            </mesh>
            <mesh position={[h.x, 0.58, 0]}>
              <boxGeometry args={[h.size, 0.12, 1.08]} />
              <meshStandardMaterial color="#4b5563" metalness={0.2} roughness={0.65} />
            </mesh>
          </group>
        ))}

      {/* Guard rails */}
      {[0.62, -0.62].map((z) => (
        <mesh key={`rail-${z}`} position={[0, 0.75, z]}>
          <boxGeometry args={[5.6, 0.04, 0.04]} />
          <meshStandardMaterial color="#9ca3af" metalness={0.3} roughness={0.5} />
        </mesh>
      ))}

      {/* Anchor pockets */}
      {[0.45, -0.45].map((z) => (
        <mesh key={`anchor-${z}`} position={[2.95, 0.1, z]}>
          <boxGeometry args={[0.18, 0.18, 0.08]} />
          <meshStandardMaterial color="#111827" metalness={0.4} roughness={0.6} />
        </mesh>
      ))}

      {/* Portholes (both sides) */}
      {portholes.map((h, i) => (
        <mesh key={`ph-s-${i}`} position={[h.x, h.y, h.z]}>
          <circleGeometry args={[0.05, 16]} />
          <meshStandardMaterial color="#dbeafe" emissive="#2563eb" emissiveIntensity={0.15} />
        </mesh>
      ))}
      {portholes.map((h, i) => (
        <mesh key={`ph-p-${i}`} position={[h.x, h.y, -h.z]} rotation={[0, Math.PI, 0]}>
          <circleGeometry args={[0.05, 16]} />
          <meshStandardMaterial color="#dbeafe" emissive="#2563eb" emissiveIntensity={0.15} />
        </mesh>
      ))}

      {/* Superstructure */}
      <RoundedBox position={cfg.superstructurePos} args={cfg.superstructureSize} radius={0.06} smoothness={3}>
        <meshStandardMaterial color={cfg.superstructureColor} metalness={0.15} roughness={0.42} />
      </RoundedBox>

      {/* Bridge */}
      <RoundedBox position={cfg.bridgePos} args={[0.9, 0.45, 0.8]} radius={0.05} smoothness={3}>
        <meshStandardMaterial color="#60a5fa" metalness={0.3} roughness={0.28} />
      </RoundedBox>

      {/* Bridge windows */}
      {[-0.25, 0, 0.25].map((x, i) => (
        <mesh key={`win-${i}`} position={[cfg.bridgePos[0] + x, cfg.bridgePos[1], cfg.bridgePos[2] + 0.42]}>
          <boxGeometry args={[0.18, 0.15, 0.04]} />
          <meshStandardMaterial color="#1f2937" metalness={0.1} roughness={0.15} transparent opacity={0.65} />
        </mesh>
      ))}

      {/* Funnel + cap */}
      <mesh position={cfg.funnelPos}>
        <cylinderGeometry args={[0.16, 0.22, 0.6, 10]} />
        <meshStandardMaterial color="#6b7280" metalness={0.5} roughness={0.5} />
      </mesh>
      <mesh position={[cfg.funnelPos[0], cfg.funnelPos[1] + 0.31, cfg.funnelPos[2]]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.12, 0.18, 0.18, 10]} />
        <meshStandardMaterial color="#4b5563" metalness={0.4} roughness={0.6} />
      </mesh>

      {/* Aft mast + flag */}
      <mesh position={[cfg.bridgePos[0] + 0.6, cfg.bridgePos[1] - 0.2, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 1.2, 8]} />
        <meshStandardMaterial color="#334155" metalness={0.6} roughness={0.4} />
      </mesh>
      <mesh position={[cfg.bridgePos[0] + 0.6, cfg.bridgePos[1] + 0.45, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.7, 8]} />
        <meshStandardMaterial color="#334155" metalness={0.6} roughness={0.4} />
      </mesh>
      <Flag position={[cfg.bridgePos[0] + 0.6, cfg.bridgePos[1] + 0.7, 0.25]} />

      {/* Cargo cranes */}
      {cfg.showCranes &&
        [1.4, 0.1, -1.2].map((x, i) => (
          <group key={`crane-${i}`} position={[x, 0.7, 0.55]}>
            <mesh rotation={[0, 0, Math.PI / 6]}>
              <cylinderGeometry args={[0.03, 0.03, 1.4, 8]} />
              <meshStandardMaterial color="#f59e0b" metalness={0.3} roughness={0.6} />
            </mesh>
            <mesh position={[0.25, 0.3, -0.4]} rotation={[Math.PI / 2, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.02, 0.02, 0.9, 8]} />
              <meshStandardMaterial color="#fbbf24" metalness={0.3} roughness={0.6} />
            </mesh>
          </group>
        ))}

      {/* Container stacks */}
      {cfg.showContainers &&
        [2.0, 1.0, 0.0, -1.0].map((x) => (
          <group key={`stack-${x}`} position={[x, 0.7, 0]}>
            {[-0.42, 0, 0.42].map((z) =>
              [0, 0.18, 0.36].map((y, idx) => (
                <mesh key={`c-${z}-${idx}`} position={[0, y, z]}>
                  <boxGeometry args={[0.85, 0.16, 0.38]} />
                  <meshStandardMaterial
                    color={["#ef4444", "#38bdf8", "#f59e0b", "#22c55e"][(idx + Math.round(z * 10)) % 4]}
                    metalness={0.2}
                    roughness={0.6}
                  />
                </mesh>
              ))
            )}
          </group>
        ))}

      {/* Tanker piping */}
      {cfg.showTankerPiping && (
        <>
          {[1.9, 0.7, -0.6].map((x) => (
            <mesh key={`pipe-${x}`} position={[x, 0.65, 0]}>
              <cylinderGeometry args={[0.05, 0.05, 1.1, 10]} />
              <meshStandardMaterial color="#f97316" metalness={0.5} roughness={0.4} />
            </mesh>
          ))}
          {[0.35, -0.35].map((z) => (
            <mesh key={`manifold-${z}`} position={[0.6, 0.62, z]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.04, 0.04, 3.2, 10]} />
              <meshStandardMaterial color="#fb923c" metalness={0.5} roughness={0.4} />
            </mesh>
          ))}
        </>
      )}

      {/* Ro-Ro stern ramp */}
      {cfg.showRoRoRamp && (
        <group position={[-3.2, 0.2, 0]}>
          <mesh rotation={[0, 0, Math.PI / 10]}>
            <boxGeometry args={[0.8, 0.05, 0.9]} />
            <meshStandardMaterial color="#94a3b8" metalness={0.2} roughness={0.6} />
          </mesh>
          <mesh position={[0.2, -0.12, 0]}>
            <boxGeometry args={[0.4, 0.04, 0.9]} />
            <meshStandardMaterial color="#cbd5f5" metalness={0.2} roughness={0.6} />
          </mesh>
        </group>
      )}

      {/* Passenger decks */}
      {cfg.showPassengerDecks &&
        [0, 0.45, 0.9].map((yOff, i) => (
          <mesh key={`pax-${i}`} position={[0.2, 1.2 + yOff, 0]}>
            <boxGeometry args={[3.4, 0.35, 1.15]} />
            <meshStandardMaterial color="#e2e8f0" metalness={0.1} roughness={0.5} />
          </mesh>
        ))}

      {/* Propeller */}
      <group position={[-3.45, -0.35, 0]} rotation={[0, 0, Math.PI / 2]}>
        <mesh>
          <torusGeometry args={[0.12, 0.02, 8, 16]} />
          <meshStandardMaterial color="#fbbf24" metalness={0.7} roughness={0.3} />
        </mesh>
        {[0, Math.PI / 2, Math.PI].map((r, i) => (
          <mesh key={`blade-${i}`} rotation={[0, r, 0]}>
            <boxGeometry args={[0.04, 0.22, 0.08]} />
            <meshStandardMaterial color="#f59e0b" metalness={0.7} roughness={0.3} />
          </mesh>
        ))}
      </group>

      {/* Rudder */}
      <mesh position={[-3.25, -0.55, 0]}>
        <boxGeometry args={[0.08, 0.35, 0.28]} />
        <meshStandardMaterial color="#6b7280" metalness={0.4} roughness={0.6} />
      </mesh>

      {/* Lifeboats */}
      {Array.from({ length: cfg.extraLifeboats }).map((_, i) => (
        <mesh
          key={`lb-${i}`}
          position={[cfg.superstructurePos[0] - 0.4 + i * 0.35, cfg.superstructurePos[1] + 0.1, -0.65]}
          rotation={[0, Math.PI / 2, 0]}
        >
          <capsuleGeometry args={[0.12, 0.5, 4, 8]} />
          <meshStandardMaterial color="#f97316" metalness={0.2} roughness={0.5} />
        </mesh>
      ))}

      {/* Radar array */}
      <group position={[-2.0, 1.8, 0.2]}>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.02, 0.02, 0.5, 8]} />
          <meshStandardMaterial color="#e2e8f0" metalness={0.6} roughness={0.3} />
        </mesh>
        <mesh position={[0.25, 0, 0]}>
          <boxGeometry args={[0.5, 0.08, 0.08]} />
          <meshStandardMaterial color="#f8fafc" metalness={0.6} roughness={0.3} />
        </mesh>
      </group>

      {/* Navigation lights (emissive only — no point lights, for mobile perf) */}
      {navLights.map((l, i) => (
        <mesh key={`nav-${i}`} position={l.position}>
          <sphereGeometry args={[0.05, 10, 10]} />
          <meshStandardMaterial color={l.color} emissive={l.color} emissiveIntensity={1.6} />
        </mesh>
      ))}
    </group>
  );
}

export default ShipModel3D;
