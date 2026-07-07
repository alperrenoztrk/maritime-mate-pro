import { useEffect, useMemo } from "react";
import { Html } from "@react-three/drei";
import * as THREE from "three";

interface MarkerProps {
  position: [number, number, number];
  label: string;
  color: string;
  size?: number;
}

function PointMarker({ position, label, color, size = 0.07 }: MarkerProps) {
  return (
    <group position={position}>
      <mesh>
        <sphereGeometry args={[size, 16, 16]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.4} />
      </mesh>
      <Html distanceFactor={12} position={[0.15, 0.05, 0]} style={{ pointerEvents: "none" }}>
        <span
          style={{
            color,
            fontWeight: 700,
            fontSize: "13px",
            fontFamily: "monospace",
            textShadow: "0 0 4px rgba(0,0,0,0.8)",
            whiteSpace: "nowrap",
          }}
        >
          {label}
        </span>
      </Html>
    </group>
  );
}

interface StabilityMarkersProps {
  /** Position of Keel (K) in world Y */
  kY: number;
  /** KB distance */
  kb: number;
  /** KG distance */
  kg: number;
  /** KM distance */
  km: number;
  /** Current heel angle in radians */
  heelAngle: number;
  /** GZ righting arm */
  gz: number;
  /** Visual scale factor */
  vScale?: number;
}

/**
 * Renders G, B, M, K reference points and GZ arm on the ship centerline
 */
export function StabilityMarkers({
  kY,
  kb,
  kg,
  km,
  heelAngle,
  gz,
  vScale = 0.35,
}: StabilityMarkersProps) {
  const kPos: [number, number, number] = [0, kY, 0];
  const bPos: [number, number, number] = [0, kY + kb * vScale, 0];
  const gPos: [number, number, number] = [0, kY + kg * vScale, 0];
  const mPos: [number, number, number] = [0, kY + km * vScale, 0];

  // GZ arm visualization: horizontal distance from G to vertical through new B
  const gzLength = gz * vScale * 2;

  // Centerline — memoized so we don't allocate (and leak) a BufferGeometry on
  // every re-render, which happens ~12×/s as the live heel readout updates.
  const lineGeo = useMemo(() => {
    const linePoints = [
      new THREE.Vector3(0, kY - 0.1, 0),
      new THREE.Vector3(0, kY + km * vScale + 0.15, 0),
    ];
    return new THREE.BufferGeometry().setFromPoints(linePoints);
  }, [kY, km, vScale]);

  useEffect(() => () => lineGeo.dispose(), [lineGeo]);

  return (
    <group>
      {/* Centerline */}
      <line>
        <bufferGeometry attach="geometry" {...lineGeo} />
        <lineBasicMaterial color="#475569" linewidth={1} transparent opacity={0.5} />
      </line>

      {/* K - Keel */}
      <PointMarker position={kPos} label="K" color="#94a3b8" size={0.05} />

      {/* B - Center of Buoyancy */}
      <PointMarker position={bPos} label="B" color="#3b82f6" />

      {/* G - Center of Gravity */}
      <PointMarker position={gPos} label="G" color="#ef4444" />

      {/* M - Metacenter */}
      <PointMarker position={mPos} label="M" color="#0ea5e9" />

      {/* GZ arm indicator (when heeled) */}
      {Math.abs(heelAngle) > 0.02 && Math.abs(gzLength) > 0.01 && (
        <group position={[0, kY + kg * vScale, 0]}>
          <mesh position={[gzLength / 2 * Math.sign(heelAngle), 0, 0]}>
            <boxGeometry args={[Math.abs(gzLength), 0.015, 0.015]} />
            <meshStandardMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={0.5} />
          </mesh>
          <Html
            distanceFactor={12}
            position={[gzLength * Math.sign(heelAngle), 0.12, 0]}
            style={{ pointerEvents: "none" }}
          >
            <span
              style={{
                color: "#22c55e",
                fontWeight: 700,
                fontSize: "11px",
                fontFamily: "monospace",
                textShadow: "0 0 4px rgba(0,0,0,0.8)",
              }}
            >
              GZ
            </span>
          </Html>
        </group>
      )}
    </group>
  );
}
