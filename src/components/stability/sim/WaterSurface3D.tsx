import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Lightweight animated sea surface.
 *
 * Performance notes:
 *  - Segment count is kept low (32×20 instead of 80×40) — ~9× fewer vertices.
 *  - `computeVertexNormals()` is the single most expensive per-frame operation,
 *    so we only run it every 6th frame (~10 fps). The waves are subtle enough
 *    that the shading update is imperceptible, but the CPU cost drops sharply.
 *  - The geometry is disposed on unmount to avoid leaking GPU memory across
 *    route changes.
 */
export function WaterSurface3D({ color = "#2980b9" }: { color?: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const geometry = useMemo(() => new THREE.PlaneGeometry(18, 12, 32, 20), []);
  const frame = useRef(0);

  useFrame(({ clock }) => {
    const positions = geometry.attributes.position as THREE.BufferAttribute;
    const t = clock.getElapsedTime();

    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i);
      const y = positions.getY(i);
      const wave =
        Math.sin(t * 0.8 + x * 0.4) * 0.04 +
        Math.cos(t * 1.1 + y * 0.6) * 0.025 +
        Math.sin(t * 1.6 + x * 1.2 + y * 0.3) * 0.015;
      positions.setZ(i, wave);
    }
    positions.needsUpdate = true;

    frame.current = (frame.current + 1) % 6;
    if (frame.current === 0) geometry.computeVertexNormals();
  });

  useEffect(() => () => geometry.dispose(), [geometry]);

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} geometry={geometry}>
      <meshStandardMaterial
        color={color}
        transparent
        opacity={0.72}
        roughness={0.35}
        metalness={0.1}
      />
    </mesh>
  );
}
