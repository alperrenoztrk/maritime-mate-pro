import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { ShipType } from "./ShipModel3D";

interface FunnelExhaustProps {
  position: [number, number, number];
  type: ShipType;
}

interface ExhaustProfile {
  color: string;
  opacity: number;
  size: number;
  rise: number;
  aftDrift: number;
  spread: number;
  cycleSpeed: number;
}

const PROFILES: Record<ShipType, ExhaustProfile> = {
  container: {
    color: "#4b5563",
    opacity: 0.24,
    size: 0.22,
    rise: 1.25,
    aftDrift: 0.72,
    spread: 0.19,
    cycleSpeed: 0.08,
  },
  tanker: {
    color: "#525b63",
    opacity: 0.22,
    size: 0.23,
    rise: 1.18,
    aftDrift: 0.64,
    spread: 0.18,
    cycleSpeed: 0.075,
  },
  bulk: {
    color: "#434b52",
    opacity: 0.27,
    size: 0.24,
    rise: 1.28,
    aftDrift: 0.76,
    spread: 0.21,
    cycleSpeed: 0.082,
  },
  roro: {
    color: "#66717c",
    opacity: 0.18,
    size: 0.2,
    rise: 1.08,
    aftDrift: 0.58,
    spread: 0.17,
    cycleSpeed: 0.072,
  },
  passenger: {
    color: "#8a949d",
    opacity: 0.13,
    size: 0.19,
    rise: 1.0,
    aftDrift: 0.5,
    spread: 0.16,
    cycleSpeed: 0.068,
  },
};

const PARTICLE_COUNT = 18;

function makeSoftSmokeTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 96;
  canvas.height = 96;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new THREE.CanvasTexture(canvas);

  const gradient = ctx.createRadialGradient(48, 48, 3, 48, 48, 46);
  gradient.addColorStop(0, "rgba(255,255,255,0.9)");
  gradient.addColorStop(0.35, "rgba(255,255,255,0.55)");
  gradient.addColorStop(0.72, "rgba(255,255,255,0.16)");
  gradient.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  return texture;
}

/**
 * Low-cost procedural exhaust plume. The particles are one Points draw call,
 * use a soft radial texture and are repositioned entirely on the GPU scene's
 * animation tick. Profiles are deliberately restrained by vessel type so the
 * effect reads as engine exhaust rather than a cartoon smoke trail.
 */
export function FunnelExhaust({ position, type }: FunnelExhaustProps) {
  const points = useRef<THREE.Points>(null);
  const profile = PROFILES[type];
  const texture = useMemo(makeSoftSmokeTexture, []);

  const seeds = useMemo(
    () =>
      Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
        phase: i / PARTICLE_COUNT,
        lateral: Math.sin(i * 12.9898) * 0.5 + Math.cos(i * 4.1414) * 0.5,
        flutter: 0.75 + ((i * 37) % 11) / 20,
      })),
    []
  );

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(new Float32Array(PARTICLE_COUNT * 3), 3));
    return g;
  }, []);

  const material = useMemo(
    () =>
      new THREE.PointsMaterial({
        color: profile.color,
        map: texture,
        transparent: true,
        opacity: profile.opacity,
        alphaTest: 0.015,
        depthWrite: false,
        size: profile.size,
        sizeAttenuation: true,
        blending: THREE.NormalBlending,
      }),
    [profile, texture]
  );

  useFrame(({ clock }) => {
    const attribute = geometry.getAttribute("position") as THREE.BufferAttribute;
    const time = clock.getElapsedTime();

    seeds.forEach((seed, i) => {
      const life = (seed.phase + time * profile.cycleSpeed) % 1;
      const broaden = profile.spread * (0.2 + life * life);
      const turbulence = Math.sin(time * (1.4 + seed.flutter) + i * 1.73) * broaden;
      const crossFlow = Math.cos(time * 0.83 + i * 0.91) * broaden * 0.55;
      const x = -profile.aftDrift * life + turbulence * 0.35;
      const y = 0.03 + profile.rise * life + Math.sin(life * Math.PI) * 0.12;
      const z = seed.lateral * broaden + crossFlow;
      attribute.setXYZ(i, x, y, z);
    });

    attribute.needsUpdate = true;
    if (points.current) points.current.rotation.y = Math.sin(time * 0.19) * 0.03;
  });

  useEffect(
    () => () => {
      geometry.dispose();
      material.dispose();
      texture.dispose();
    },
    [geometry, material, texture]
  );

  return (
    <group position={[position[0], position[1] + 0.34, position[2]]}>
      <points ref={points} geometry={geometry} material={material} frustumCulled={false} renderOrder={3} />
    </group>
  );
}

export default FunnelExhaust;
