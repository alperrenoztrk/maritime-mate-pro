import { useMemo } from "react";
import * as THREE from "three";

interface ShipHull3DProps {
  /** Scale multiplier for the 3D model */
  scale?: number;
}

/**
 * V-shaped hull geometry built from custom BufferGeometry
 * Represents a realistic merchant vessel cross-section
 */
export function ShipHull3D({ scale = 1 }: ShipHull3DProps) {
  const hullGeometry = useMemo(() => {
    // Hull profile: V-shaped bottom with flared sides
    // Cross-section points (half-hull, will be mirrored)
    const sections = 24; // longitudinal sections
    const profilePoints = 12; // points per cross-section

    const length = 5.2 * scale;
    const halfLength = length / 2;
    const maxBeam = 1.5 * scale;
    const depth = 0.9 * scale;
    const deadrise = 0.25 * scale; // V-shape depth

    const vertices: number[] = [];
    const indices: number[] = [];

    for (let s = 0; s <= sections; s++) {
      const t = s / sections;
      const x = -halfLength + t * length;

      // Bow/stern narrowing factor
      const bowFactor = 1 - Math.pow(Math.abs(t - 0.45) / 0.55, 2.5);
      const localBeam = maxBeam * Math.max(0.15, bowFactor);
      const localDeadrise = deadrise * bowFactor;

      for (let p = 0; p <= profilePoints; p++) {
        const u = p / profilePoints; // 0=port bottom, 0.5=keel, 1=starboard bottom
        let y: number, z: number;

        if (u <= 0.5) {
          // Port side: bottom to top
          const pu = u * 2; // 0=keel, 1=port beam
          // V-shape: keel is lowest, rises to beam
          z = -localBeam * pu;
          y = -localDeadrise * (1 - pu * pu) + depth * pu * 0.3;
        } else {
          // Starboard side
          const pu = (u - 0.5) * 2; // 0=starboard beam edge, 1=keel approach
          z = localBeam * (1 - pu);
          y = -localDeadrise * (1 - (1 - pu) * (1 - pu)) + depth * (1 - pu) * 0.3;
        }

        vertices.push(x, y, z);
      }
    }

    // Build indices
    for (let s = 0; s < sections; s++) {
      for (let p = 0; p < profilePoints; p++) {
        const a = s * (profilePoints + 1) + p;
        const b = a + 1;
        const c = (s + 1) * (profilePoints + 1) + p;
        const d = c + 1;
        indices.push(a, c, b, b, c, d);
      }
    }

    // Deck (top cap)
    const deckVerts: number[] = [];
    const deckStart = vertices.length / 3;
    for (let s = 0; s <= sections; s++) {
      const t = s / sections;
      const x = -halfLength + t * length;
      const bowFactor = 1 - Math.pow(Math.abs(t - 0.45) / 0.55, 2.5);
      const localBeam = maxBeam * Math.max(0.15, bowFactor);
      const topY = depth * 0.3;
      deckVerts.push(x, topY, -localBeam);
      deckVerts.push(x, topY, localBeam);
    }

    for (let s = 0; s < sections; s++) {
      const i = deckStart + s * 2;
      indices.push(i, i + 2, i + 1, i + 1, i + 2, i + 3);
    }

    const allVerts = [...vertices, ...deckVerts];

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(allVerts, 3));
    geo.setIndex(indices);
    geo.computeVertexNormals();
    return geo;
  }, [scale]);

  return (
    <group>
      {/* Main hull */}
      <mesh geometry={hullGeometry}>
        <meshStandardMaterial
          color="#1a2634"
          roughness={0.45}
          metalness={0.15}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Superstructure - bridge */}
      <mesh position={[0.5 * scale, 0.55 * scale, 0]}>
        <boxGeometry args={[1.2 * scale, 0.45 * scale, 0.7 * scale]} />
        <meshStandardMaterial color="#c8d6e5" roughness={0.6} />
      </mesh>

      {/* Forward house */}
      <mesh position={[-0.9 * scale, 0.42 * scale, 0]}>
        <boxGeometry args={[0.8 * scale, 0.3 * scale, 0.65 * scale]} />
        <meshStandardMaterial color="#b8c9dc" roughness={0.6} />
      </mesh>

      {/* Funnel */}
      <mesh position={[1.3 * scale, 0.85 * scale, 0]}>
        <boxGeometry args={[0.25 * scale, 0.5 * scale, 0.25 * scale]} />
        <meshStandardMaterial color="#e8a838" roughness={0.5} />
      </mesh>

      {/* Waterline marking */}
      <mesh position={[0, 0.02 * scale, 0]}>
        <boxGeometry args={[5.0 * scale, 0.02 * scale, 1.52 * scale]} />
        <meshStandardMaterial color="#c0392b" roughness={0.7} />
      </mesh>
    </group>
  );
}
