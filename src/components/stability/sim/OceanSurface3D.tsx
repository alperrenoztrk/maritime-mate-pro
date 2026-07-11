import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { getFoamAlphaTexture, getWaterNormalTexture } from "./proceduralTextures";
import type { ShipType } from "./ShipModel3D";
import { shipVisualProfiles } from "./ShipArchitecture";

/**
 * Open-sea surface for the stability sim.
 *
 * The main surface uses a GPU Gerstner-wave sum with analytic normals, keeping
 * full PBR reflections and fog at zero per-frame CPU geometry cost. The former
 * uniform foam ring has been replaced by three physically legible layers:
 * narrow hull-contact ribbons, a bow pressure wave and a widening stern wake.
 * This removes the "ship sitting on a flat disc" look while remaining fully
 * procedural and offline-safe inside Capacitor WebViews.
 */

const USE_GPU_WAVES = true;

// dirX, dirZ, steepness, wavelength. The near-hull multiplier below keeps a
// light surface motion at the waterline instead of forcing an artificial calm.
const WAVES: [number, number, number, number][] = [
  [1.0, 0.25, 0.035, 9.0],
  [0.65, 0.76, 0.042, 4.2],
  [-0.4, 0.85, 0.04, 1.9],
];

const gerstnerChunk = /* glsl */ `
uniform float uOceanTime;
uniform float uSeaState;

vec3 gerstnerWave(vec4 wave, vec3 p, inout vec3 tangent, inout vec3 binormal, float damp) {
  float steepness = wave.z * damp;
  float wavelength = wave.w;
  float k = 6.28318530718 / wavelength;
  float c = sqrt(9.8 / k);
  vec2 d = normalize(wave.xy);
  float f = k * (dot(d, p.xy) - c * uOceanTime);
  float a = steepness / k;

  tangent += vec3(
    -d.x * d.x * steepness * sin(f),
    -d.x * d.y * steepness * sin(f),
    d.x * steepness * cos(f)
  );
  binormal += vec3(
    -d.x * d.y * steepness * sin(f),
    -d.y * d.y * steepness * sin(f),
    d.y * steepness * cos(f)
  );
  return vec3(d.x * a * cos(f), d.y * a * cos(f), a * sin(f));
}
`;

// Plane is authored in local XY (rotated -90° about X in the scene), so local
// z is world up. A small amount of wave energy is retained around the hull.
const gerstnerVertex = /* glsl */ `
  float oceanDist = length(position.xy);
  float nearHullMotion = mix(0.22, 1.0, smoothstep(2.4, 8.5, oceanDist));
  float horizonFlatten = 1.0 - smoothstep(17.0, 29.0, oceanDist);
  float oceanDamp = nearHullMotion * horizonFlatten;
  vec3 oceanTangent = vec3(1.0, 0.0, 0.0);
  vec3 oceanBinormal = vec3(0.0, 1.0, 0.0);
  vec3 oceanOffset = vec3(0.0);
  oceanOffset += gerstnerWave(vec4(${WAVES[0].join(",")}), position, oceanTangent, oceanBinormal, oceanDamp);
  oceanOffset += gerstnerWave(vec4(${WAVES[1].join(",")}), position, oceanTangent, oceanBinormal, oceanDamp);
  oceanOffset += gerstnerWave(vec4(${WAVES[2].join(",")}), position, oceanTangent, oceanBinormal, oceanDamp);
  oceanOffset *= uSeaState;
  oceanTangent = vec3(1.0, 0.0, 0.0) + (oceanTangent - vec3(1.0, 0.0, 0.0)) * uSeaState;
  oceanBinormal = vec3(0.0, 1.0, 0.0) + (oceanBinormal - vec3(0.0, 1.0, 0.0)) * uSeaState;
`;

function makeWakeTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 160;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new THREE.CanvasTexture(canvas);

  const image = ctx.createImageData(canvas.width, canvas.height);
  for (let y = 0; y < canvas.height; y++) {
    const v = (y / (canvas.height - 1) - 0.5) * 2;
    for (let x = 0; x < canvas.width; x++) {
      const u = x / (canvas.width - 1);
      const downstream = 1 - u; // stern is at the right-hand edge of the map
      const halfWidth = 0.06 + downstream * 0.43;
      const edgeDistance = Math.abs(Math.abs(v) - halfWidth);
      const edge = Math.exp(-(edgeDistance * edgeDistance) / 0.008);
      const coreWidth = 0.05 + downstream * 0.12;
      const core = Math.exp(-(v * v) / Math.max(0.002, coreWidth * coreWidth)) * (1 - downstream * 0.72);
      const breakup = 0.66 + 0.34 * Math.sin(x * 0.37 + y * 0.71) * Math.sin(x * 0.11 - y * 0.29);
      const tailFade = 0.35 + 0.65 * Math.pow(u, 0.35);
      const alpha = THREE.MathUtils.clamp((edge * 0.72 + core * 0.55) * breakup * tailFade, 0, 1);
      const i = (y * canvas.width + x) * 4;
      image.data[i] = 238;
      image.data[i + 1] = 247;
      image.data[i + 2] = 252;
      image.data[i + 3] = Math.round(alpha * 255);
    }
  }
  ctx.putImageData(image, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  return texture;
}

function makeBowWaveTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new THREE.CanvasTexture(canvas);

  const image = ctx.createImageData(canvas.width, canvas.height);
  for (let y = 0; y < canvas.height; y++) {
    const v = (y / (canvas.height - 1) - 0.5) * 2;
    for (let x = 0; x < canvas.width; x++) {
      const u = (x / (canvas.width - 1) - 0.5) * 2;
      const shiftedU = u + 0.18;
      const radius = Math.sqrt(shiftedU * shiftedU + (v / 0.78) * (v / 0.78));
      const crescent = Math.exp(-Math.pow((radius - 0.58) / 0.115, 2));
      const forwardMask = THREE.MathUtils.smoothstep(u, -0.28, 0.72);
      const shoulderBreakup = 0.72 + 0.28 * Math.sin(x * 0.22 + y * 0.37);
      const alpha = THREE.MathUtils.clamp(crescent * forwardMask * shoulderBreakup, 0, 1);
      const i = (y * canvas.width + x) * 4;
      image.data[i] = 242;
      image.data[i + 1] = 249;
      image.data[i + 2] = 252;
      image.data[i + 3] = Math.round(alpha * 210);
    }
  }
  ctx.putImageData(image, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  return texture;
}

function buildHullFoamRibbon(
  side: 1 | -1,
  lengthScale: number,
  beamScale: number
): THREE.BufferGeometry {
  // World-space approximation of the scaled hull waterline, stern to bow.
  const samples: Array<[number, number]> = [
    [-2.82, 0.3],
    [-2.45, 0.43],
    [-1.65, 0.52],
    [-0.45, 0.54],
    [0.8, 0.53],
    [1.8, 0.48],
    [2.48, 0.34],
    [2.83, 0.13],
  ];
  const width = 0.1;
  const positions: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];

  samples.forEach(([x, halfBeam], i) => {
    const scaledX = x * lengthScale;
    const scaledBeam = halfBeam * beamScale;
    const inner = side * (scaledBeam - width * 0.35);
    const outer = side * (scaledBeam + width);
    positions.push(scaledX, 0.018, inner, scaledX, 0.022, outer);
    const u = i / (samples.length - 1);
    uvs.push(u * 4.5, 0, u * 4.5, 1);
  });

  for (let i = 0; i < samples.length - 1; i++) {
    const a = i * 2;
    const b = a + 1;
    const c = a + 2;
    const d = a + 3;
    indices.push(a, c, d, a, d, b);
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

interface OceanSurface3DProps {
  shipType: ShipType;
  seaState?: number;
  speedKnots?: number;
}

export function OceanSurface3D({ shipType, seaState = 2, speedKnots = 0 }: OceanSurface3DProps) {
  const timeUniform = useRef<{ value: number }>({ value: 0 });
  const seaStateUniform = useRef<{ value: number }>({ value: 0.69 });
  const profile = shipVisualProfiles[shipType];
  const underway = speedKnots > 0.5;

  useEffect(() => {
    seaStateUniform.current.value = THREE.MathUtils.clamp(0.45 + seaState * 0.12, 0.35, 1.2);
  }, [seaState]);

  const normalTex = useMemo(() => {
    const t = getWaterNormalTexture();
    t.repeat.set(8, 8);
    return t;
  }, []);
  const foamTex = useMemo(() => {
    const t = getFoamAlphaTexture();
    t.repeat.set(5, 1.2);
    return t;
  }, []);
  const wakeTex = useMemo(makeWakeTexture, []);
  const bowWaveTex = useMemo(makeBowWaveTexture, []);

  const material = useMemo(() => {
    const mat = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#0b4168"),
      roughness: 0.14,
      metalness: 0,
      normalMap: normalTex,
      normalScale: new THREE.Vector2(0.32, 0.32),
      envMapIntensity: 1.25,
      transparent: true,
      opacity: 0.965,
    });
    if (USE_GPU_WAVES) {
      mat.onBeforeCompile = (shader) => {
        shader.uniforms.uOceanTime = timeUniform.current;
        shader.uniforms.uSeaState = seaStateUniform.current;
        shader.vertexShader = shader.vertexShader
          .replace("#include <common>", `#include <common>\n${gerstnerChunk}`)
          .replace(
            "#include <beginnormal_vertex>",
            `${gerstnerVertex}
             vec3 objectNormal = normalize(cross(oceanBinormal, oceanTangent));
             #ifdef USE_TANGENT
               vec3 objectTangent = vec3( tangent.xyz );
             #endif`
          )
          .replace("#include <begin_vertex>", "vec3 transformed = vec3(position) + oceanOffset;");
      };
      mat.customProgramCacheKey = () => "ocean-gerstner-v3";
    }
    return mat;
  }, [normalTex]);

  const geometry = useMemo(() => new THREE.PlaneGeometry(70, 70, 96, 96), []);
  const portFoamGeometry = useMemo(
    () => buildHullFoamRibbon(-1, profile.lengthScale, profile.beamScale),
    [profile.lengthScale, profile.beamScale]
  );
  const starboardFoamGeometry = useMemo(
    () => buildHullFoamRibbon(1, profile.lengthScale, profile.beamScale),
    [profile.lengthScale, profile.beamScale]
  );
  const wakeGeometry = useMemo(() => new THREE.PlaneGeometry(4.4, 2.05), []);
  const bowWaveGeometry = useMemo(() => new THREE.PlaneGeometry(1.65, 1.55), []);

  const foamMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: "#eef7fb",
        alphaMap: foamTex,
        transparent: true,
        opacity: 0.78,
        depthWrite: false,
        side: THREE.DoubleSide,
      }),
    [foamTex]
  );
  const wakeMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: "#e7f3f8",
        alphaMap: wakeTex,
        transparent: true,
        opacity: 0.58,
        depthWrite: false,
        side: THREE.DoubleSide,
      }),
    [wakeTex]
  );
  const bowWaveMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: "#f0f8fb",
        alphaMap: bowWaveTex,
        transparent: true,
        opacity: 0.64,
        depthWrite: false,
        side: THREE.DoubleSide,
      }),
    [bowWaveTex]
  );

  useEffect(() => {
    const normalStrength = 0.22 + seaState * 0.045;
    material.normalScale.set(normalStrength, normalStrength);
  }, [material, seaState]);

  useFrame(({ clock }, delta) => {
    timeUniform.current.value = clock.getElapsedTime();
    // Independent motion rates prevent the normal detail and foam from locking
    // into the same obvious texture loop.
    const motion = 0.65 + seaState * 0.12;
    normalTex.offset.x += delta * 0.012 * motion;
    normalTex.offset.y += delta * 0.006 * motion;
    foamTex.offset.x += delta * 0.024 * motion;
    foamTex.offset.y += delta * 0.004 * motion;
  });

  useEffect(
    () => () => {
      geometry.dispose();
      material.dispose();
      portFoamGeometry.dispose();
      starboardFoamGeometry.dispose();
      wakeGeometry.dispose();
      bowWaveGeometry.dispose();
      foamMaterial.dispose();
      wakeMaterial.dispose();
      bowWaveMaterial.dispose();
      wakeTex.dispose();
      bowWaveTex.dispose();
    }, [
      geometry,
      material,
      portFoamGeometry,
      starboardFoamGeometry,
      wakeGeometry,
      bowWaveGeometry,
      foamMaterial,
      wakeMaterial,
      bowWaveMaterial,
      wakeTex,
      bowWaveTex,
    ]
  );

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} geometry={geometry} material={material} receiveShadow />

      {/* Narrow, irregular contact foam follows the actual visual waterline
          instead of forming a perfect ellipse around the ship. */}
      <mesh geometry={portFoamGeometry} material={foamMaterial} renderOrder={2} />
      <mesh geometry={starboardFoamGeometry} material={foamMaterial} renderOrder={2} />

      {/* Pressure wave and stern wake only exist when the vessel is actually
          underway. The stability scene defaults to zero speed, avoiding the
          physically impossible wake that made the stationary ship look fake. */}
      {underway && (
        <>
          <mesh
            rotation={[-Math.PI / 2, 0, 0]}
            position={[3.1 * profile.lengthScale, 0.026, 0]}
            geometry={bowWaveGeometry}
            material={bowWaveMaterial}
            renderOrder={2}
          />
          <mesh
            rotation={[-Math.PI / 2, 0, 0]}
            position={[-5.0 * profile.lengthScale, 0.024, 0]}
            geometry={wakeGeometry}
            material={wakeMaterial}
            renderOrder={2}
          />
        </>
      )}
    </group>
  );
}

export default OceanSurface3D;
