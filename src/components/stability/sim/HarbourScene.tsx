import { useMemo } from "react";
import * as THREE from "three";

/**
 * Procedural harbour: concrete quay on the starboard side with bollards,
 * cylindrical rubber fenders, a cope edge and a rubble-mound breakwater.
 * Scene units: ~33 m per unit, so the quay is ~250 m long, ~2 m freeboard.
 */
function concreteTexture(): THREE.CanvasTexture {
  const c = document.createElement("canvas");
  c.width = c.height = 256;
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = "#8a8d8f";
  ctx.fillRect(0, 0, 256, 256);
  for (let i = 0; i < 2600; i++) {
    const v = 110 + Math.floor(Math.random() * 60);
    ctx.fillStyle = `rgba(${v},${v},${v + 3},0.35)`;
    ctx.fillRect(Math.random() * 256, Math.random() * 256, 2, 2);
  }
  ctx.strokeStyle = "rgba(40,40,40,0.35)";
  ctx.lineWidth = 2;
  for (let x = 0; x <= 256; x += 64) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, 256);
    ctx.stroke();
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(8, 1);
  return t;
}

export function HarbourScene() {
  const concrete = useMemo(concreteTexture, []);
  const bollards = useMemo(() => Array.from({ length: 9 }, (_, i) => -4 + i), []);
  const fenders = useMemo(() => Array.from({ length: 8 }, (_, i) => -3.5 + i), []);
  const rocks = useMemo(
    () =>
      Array.from({ length: 70 }, (_, i) => ({
        x: -14 + i * 0.42 + Math.sin(i * 7.3) * 0.15,
        z: -6.5 + Math.sin(i * 3.1) * 0.25,
        s: 0.35 + ((i * 37) % 10) / 30,
        r: i * 1.7,
      })),
    []
  );

  return (
    <group>
      {/* Quay block: top at y≈0.12 (≈4 m above water), face at z = 1.05 */}
      <mesh position={[0, -0.6, 1.72]} receiveShadow castShadow>
        <boxGeometry args={[9, 1.45, 2]} />
        <meshStandardMaterial map={concrete} roughness={0.92} color="#a3a6a8" />
      </mesh>
      {/* Yellow cope edge marking */}
      <mesh position={[0, 0.135, 0.75]}>
        <boxGeometry args={[9, 0.02, 0.05]} />
        <meshStandardMaterial color="#d4a017" roughness={0.6} />
      </mesh>
      {bollards.map((x) => (
        <group key={x} position={[x, 0.13, 0.92]}>
          <mesh castShadow position={[0, 0.05, 0]}>
            <cylinderGeometry args={[0.045, 0.055, 0.1, 14]} />
            <meshStandardMaterial color="#1e2326" metalness={0.6} roughness={0.5} />
          </mesh>
          <mesh position={[0, 0.105, 0]}>
            <cylinderGeometry args={[0.07, 0.07, 0.02, 14]} />
            <meshStandardMaterial color="#1e2326" metalness={0.6} roughness={0.5} />
          </mesh>
        </group>
      ))}
      {fenders.map((x) => (
        <mesh key={x} position={[x, -0.05, 0.66]} rotation={[0, 0, 0]} castShadow>
          <cylinderGeometry args={[0.07, 0.07, 0.32, 16]} />
          <meshStandardMaterial color="#111315" roughness={0.85} />
        </mesh>
      ))}
      {/* Breakwater */}
      {rocks.map((r, i) => (
        <mesh key={i} position={[r.x, -0.05, r.z]} rotation={[r.r, r.r * 0.6, 0]} castShadow receiveShadow>
          <dodecahedronGeometry args={[r.s, 0]} />
          <meshStandardMaterial color="#6f6a62" roughness={1} flatShading />
        </mesh>
      ))}
    </group>
  );
}

export default HarbourScene;
