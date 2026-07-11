import { useEffect, useMemo } from "react";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import type { ShipConfig, ShipType } from "./ShipModel3D";
import { deckHalfBeamAt, deckYAt } from "./hullGeometry";

/**
 * High-level naval architecture details that keep the procedural vessels from
 * reading as the same toy hull with different cargo.  The dimensions remain
 * deliberately lightweight, but the silhouettes, deck breaks, shell openings
 * and stern gear now follow the conventions of each merchant-ship family.
 */

export interface ShipVisualProfile {
  lengthScale: number;
  beamScale: number;
}

export const shipVisualProfiles: Record<ShipType, ShipVisualProfile> = {
  container: { lengthScale: 1.04, beamScale: 0.96 },
  tanker: { lengthScale: 1.0, beamScale: 1.08 },
  bulk: { lengthScale: 1.0, beamScale: 1.04 },
  roro: { lengthScale: 0.98, beamScale: 1.0 },
  passenger: { lengthScale: 1.08, beamScale: 0.94 },
};

const PAINTED_STEEL = {
  metalness: 0.04,
  roughness: 0.52,
  clearcoat: 0.12,
  clearcoatRoughness: 0.62,
};

function SidePanel({
  x,
  y,
  z,
  width,
  height,
  color = "#172532",
  opacity = 1,
}: {
  x: number;
  y: number;
  z: number;
  width: number;
  height: number;
  color?: string;
  opacity?: number;
}) {
  return (
    <mesh position={[x, y, z]} rotation={[0, z < 0 ? Math.PI : 0, 0]}>
      <planeGeometry args={[width, height]} />
      <meshPhysicalMaterial
        color={color}
        metalness={0.08}
        roughness={0.24}
        clearcoat={0.5}
        clearcoatRoughness={0.28}
        transparent={opacity < 1}
        opacity={opacity}
      />
    </mesh>
  );
}

function HullOpenings({ type }: { type: ShipType }) {
  const bowX = 2.82;
  const bowY = deckYAt(type, bowX) - 0.22;
  const bowZ = deckHalfBeamAt(type, bowX) * 0.96;
  const hasThruster = type === "roro" || type === "passenger" || type === "container";

  return (
    <group>
      {[1, -1].map((side) => (
        <group key={`hawse-${side}`}>
          <mesh
            position={[bowX, bowY, side * (bowZ + 0.006)]}
            rotation={[0, side < 0 ? Math.PI : 0, 0]}
          >
            <torusGeometry args={[0.058, 0.014, 8, 20]} />
            <meshStandardMaterial color="#1a2027" metalness={0.35} roughness={0.58} />
          </mesh>
          <mesh
            position={[bowX, bowY, side * (bowZ + 0.008)]}
            rotation={[0, side < 0 ? Math.PI : 0, 0]}
          >
            <circleGeometry args={[0.044, 18]} />
            <meshStandardMaterial color="#080c10" metalness={0.12} roughness={0.82} />
          </mesh>
        </group>
      ))}

      {hasThruster &&
        [1, -1].map((side) => (
          <group key={`thruster-${side}`}>
            <mesh
              position={[2.05, -0.18, side * 0.535]}
              rotation={[0, side < 0 ? Math.PI : 0, 0]}
            >
              <torusGeometry args={[0.073, 0.012, 8, 22]} />
              <meshStandardMaterial color="#364553" metalness={0.38} roughness={0.52} />
            </mesh>
            <mesh
              position={[2.05, -0.18, side * 0.537]}
              rotation={[0, side < 0 ? Math.PI : 0, 0]}
            >
              <circleGeometry args={[0.061, 20]} />
              <meshStandardMaterial color="#101820" metalness={0.2} roughness={0.7} />
            </mesh>
          </group>
        ))}
    </group>
  );
}

function AccommodationFinish({ cfg }: { cfg: ShipConfig }) {
  const [width, height, depth] = cfg.superstructureSize;
  const [x, y] = cfg.superstructurePos;
  const lipColor = cfg.superstructureColor;

  return (
    <group>
      {[-0.26, 0.02, 0.28].map((fraction, index) => (
        <mesh key={`deck-lip-${index}`} position={[x, y + fraction * height, 0]} castShadow>
          <boxGeometry args={[width + 0.08, 0.025, depth + 0.08]} />
          <meshPhysicalMaterial color={lipColor} {...PAINTED_STEEL} />
        </mesh>
      ))}
      <mesh position={[cfg.bridgePos[0], cfg.bridgePos[1] - 0.17, 0]} castShadow>
        <boxGeometry args={[1.12, 0.035, depth + 0.3]} />
        <meshPhysicalMaterial color={lipColor} {...PAINTED_STEEL} />
      </mesh>
      {[1, -1].map((side) => (
        <mesh
          key={`bridge-wing-${side}`}
          position={[cfg.bridgePos[0] + 0.12, cfg.bridgePos[1] - 0.11, side * (depth / 2 + 0.13)]}
          castShadow
        >
          <boxGeometry args={[0.48, 0.055, 0.28]} />
          <meshPhysicalMaterial color={lipColor} {...PAINTED_STEEL} />
        </mesh>
      ))}
    </group>
  );
}

function ContainerArchitecture({ cfg }: { cfg: ShipConfig }) {
  const y = cfg.superstructurePos[1];
  const z = cfg.superstructureSize[2] / 2 + 0.008;
  return (
    <group>
      {[1, -1].map((side) => (
        <group key={`container-accom-${side}`}>
          {[y - 0.24, y + 0.05, y + 0.32].map((wy, index) => (
            <SidePanel
              key={index}
              x={cfg.superstructurePos[0]}
              y={wy}
              z={side * z}
              width={cfg.superstructureSize[0] - 0.18}
              height={0.075}
            />
          ))}
        </group>
      ))}
      <mesh position={[-1.72, deckYAt("container", -1.72) + 0.055, 0]} castShadow>
        <boxGeometry args={[0.25, 0.11, 1.03]} />
        <meshPhysicalMaterial color="#8f9baa" {...PAINTED_STEEL} />
      </mesh>
    </group>
  );
}

function TankerArchitecture() {
  const forecastleY = deckYAt("tanker", 2.55);
  return (
    <group>
      <RoundedBox position={[2.55, forecastleY + 0.1, 0]} args={[1.36, 0.2, 1.02]} radius={0.04} smoothness={2} castShadow>
        <meshPhysicalMaterial color="#6e7f8c" {...PAINTED_STEEL} />
      </RoundedBox>
      <mesh position={[1.92, forecastleY + 0.2, 0]} rotation={[0, 0, -0.08]} castShadow>
        <boxGeometry args={[0.035, 0.32, 1.0]} />
        <meshPhysicalMaterial color="#c7d0d7" {...PAINTED_STEEL} />
      </mesh>
      <RoundedBox position={[0.15, deckYAt("tanker", 0.15) + 0.11, 0]} args={[0.45, 0.2, 0.58]} radius={0.025} smoothness={2} castShadow>
        <meshPhysicalMaterial color="#d7dde2" {...PAINTED_STEEL} />
      </RoundedBox>
      {[1, -1].map((side) => (
        <mesh key={side} position={[0.15, deckYAt("tanker", 0.15) + 0.13, side * 0.305]}>
          <boxGeometry args={[0.3, 0.08, 0.018]} />
          <meshStandardMaterial color="#202a31" metalness={0.18} roughness={0.62} />
        </mesh>
      ))}
    </group>
  );
}

function BulkArchitecture() {
  const hatchX = [2.2, 1.25, 0.3, -0.65, -1.55];
  return (
    <group>
      {hatchX.map((x) => {
        const y = deckYAt("bulk", x) + 0.145;
        return (
          <group key={x}>
            {[-0.24, 0, 0.24].map((rib) => (
              <mesh key={rib} position={[x + rib, y, 0]} castShadow>
                <boxGeometry args={[0.018, 0.018, 0.9]} />
                <meshStandardMaterial color="#697784" metalness={0.3} roughness={0.58} />
              </mesh>
            ))}
          </group>
        );
      })}
      <mesh position={[2.68, deckYAt("bulk", 2.68) + 0.17, 0]} rotation={[0, 0, -0.12]} castShadow>
        <boxGeometry args={[0.04, 0.34, 1.02]} />
        <meshPhysicalMaterial color="#bdc6cd" {...PAINTED_STEEL} />
      </mesh>
    </group>
  );
}

function RoroArchitecture() {
  const sideZ = 0.578;
  return (
    <group>
      {[0.78, 1.08, 1.38, 1.68].map((y) => (
        <mesh key={`roro-deck-${y}`} position={[-0.25, y, 0]} castShadow>
          <boxGeometry args={[5.42, 0.025, 1.16]} />
          <meshPhysicalMaterial color="#edf2f5" {...PAINTED_STEEL} />
        </mesh>
      ))}
      {[1, -1].map((side) => (
        <group key={`roro-side-${side}`}>
          {[0.94, 1.24, 1.54].map((y) => (
            <SidePanel key={y} x={-0.2} y={y} z={side * sideZ} width={4.9} height={0.105} color="#263a48" />
          ))}
          <SidePanel x={-1.92} y={0.92} z={side * (sideZ + 0.004)} width={0.72} height={0.42} color="#778792" />
          {[-2.1, -1.9, -1.7].map((x) => (
            <SidePanel key={x} x={x} y={1.47} z={side * (sideZ + 0.006)} width={0.09} height={0.17} color="#16232c" />
          ))}
        </group>
      ))}
      <mesh position={[2.49, 1.16, 0]} castShadow>
        <boxGeometry args={[0.025, 0.9, 1.04]} />
        <meshStandardMaterial color="#aebbc5" metalness={0.12} roughness={0.58} />
      </mesh>
    </group>
  );
}

function PassengerArchitecture() {
  const deckData = [
    { y: 1.24, width: 4.0, z: 0.552 },
    { y: 1.66, width: 3.65, z: 0.552 },
    { y: 2.08, width: 3.3, z: 0.552 },
  ];
  return (
    <group>
      {deckData.map((deck) => (
        <group key={deck.y}>
          <mesh position={[-0.15, deck.y - 0.15, 0]} castShadow>
            <boxGeometry args={[deck.width, 0.025, deck.z * 2 + 0.14]} />
            <meshPhysicalMaterial color="#f3f6f8" {...PAINTED_STEEL} />
          </mesh>
          {[1, -1].map((side) => (
            <SidePanel
              key={side}
              x={-0.12}
              y={deck.y}
              z={side * deck.z}
              width={deck.width - 0.22}
              height={0.105}
              color="#163447"
            />
          ))}
        </group>
      ))}
      {[1, -1].map((side) => (
        <mesh key={side} position={[-0.35, 0.95, side * 0.62]} castShadow>
          <boxGeometry args={[3.5, 0.055, 0.18]} />
          <meshPhysicalMaterial color="#f5f7f8" {...PAINTED_STEEL} />
        </mesh>
      ))}
    </group>
  );
}

export function ShipArchitecture({ type, cfg }: { type: ShipType; cfg: ShipConfig }) {
  return (
    <group>
      <HullOpenings type={type} />
      <AccommodationFinish cfg={cfg} />
      {type === "container" && <ContainerArchitecture cfg={cfg} />}
      {type === "tanker" && <TankerArchitecture />}
      {type === "bulk" && <BulkArchitecture />}
      {type === "roro" && <RoroArchitecture />}
      {type === "passenger" && <PassengerArchitecture />}
    </group>
  );
}

function Propeller({ position, radius }: { position: [number, number, number]; radius: number }) {
  const blade = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0.015, 0.045);
    shape.bezierCurveTo(0.08, 0.09, 0.12, radius * 0.78, 0.04, radius);
    shape.bezierCurveTo(-0.045, radius * 0.88, -0.065, radius * 0.35, -0.018, 0.045);
    shape.closePath();
    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: 0.024,
      bevelEnabled: true,
      bevelSegments: 2,
      bevelSize: 0.008,
      bevelThickness: 0.006,
      curveSegments: 10,
    });
    geometry.translate(0, 0, -0.012);
    geometry.rotateY(Math.PI / 2);
    geometry.computeVertexNormals();
    return geometry;
  }, [radius]);

  useEffect(() => () => blade.dispose(), [blade]);

  return (
    <group position={position}>
      <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.065, 0.085, 0.18, 14]} />
        <meshPhysicalMaterial color="#b88b2d" metalness={0.72} roughness={0.28} clearcoat={0.18} />
      </mesh>
      {[0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].map((angle) => (
        <mesh key={angle} geometry={blade} rotation={[angle, 0, 0]} castShadow>
          <meshPhysicalMaterial color="#c59a3c" metalness={0.75} roughness={0.26} clearcoat={0.2} />
        </mesh>
      ))}
    </group>
  );
}

function Rudder({ x, z, scale = 1 }: { x: number; z: number; scale?: number }) {
  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(-0.08, 0.02);
    shape.lineTo(0.11, 0.08);
    shape.lineTo(0.07, 0.52);
    shape.lineTo(-0.12, 0.46);
    shape.closePath();
    const g = new THREE.ExtrudeGeometry(shape, {
      depth: 0.055,
      bevelEnabled: true,
      bevelSegments: 1,
      bevelSize: 0.012,
      bevelThickness: 0.008,
    });
    g.translate(0, 0, -0.0275);
    g.computeVertexNormals();
    return g;
  }, []);
  useEffect(() => () => geometry.dispose(), [geometry]);

  return (
    <mesh geometry={geometry} position={[x, -0.73, z]} scale={scale} castShadow>
      <meshPhysicalMaterial color="#4b5964" metalness={0.08} roughness={0.64} clearcoat={0.08} />
    </mesh>
  );
}

/** Single-screw cargo ships and twin-screw Ro-Ro/passenger stern arrangements. */
export function SternRunningGear({ type }: { type: ShipType }) {
  const twin = type === "roro" || type === "passenger";
  const screwPositions: Array<[number, number, number]> = twin
    ? [[-3.12, -0.47, -0.27], [-3.12, -0.47, 0.27]]
    : [[-3.15, -0.47, 0]];

  return (
    <group>
      {screwPositions.map((position, index) => (
        <group key={index}>
          <mesh position={[position[0] + 0.22, position[1], position[2]]} rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.032, 0.04, 0.42, 10]} />
            <meshStandardMaterial color="#4b5560" metalness={0.5} roughness={0.42} />
          </mesh>
          <Propeller position={position} radius={twin ? 0.23 : 0.28} />
          <Rudder x={-3.38} z={position[2]} scale={twin ? 0.82 : 1} />
        </group>
      ))}
    </group>
  );
}

export default ShipArchitecture;
