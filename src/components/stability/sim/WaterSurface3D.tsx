import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function WaterSurface3D({ color = "#2980b9" }: { color?: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const geometry = useMemo(() => new THREE.PlaneGeometry(18, 12, 80, 40), []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
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
    geometry.computeVertexNormals();
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} geometry={geometry}>
      <meshStandardMaterial
        color={color}
        transparent
        opacity={0.65}
        roughness={0.3}
        metalness={0.15}
      />
    </mesh>
  );
}
