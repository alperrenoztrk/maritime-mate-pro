import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { getFoamAlphaTexture, getWaterNormalTexture } from "./proceduralTextures";

/**
 * Open-sea surface for the stability sim.
 *
 * A MeshStandardMaterial is patched via onBeforeCompile with a 3-wave Gerstner
 * sum evaluated in the vertex shader with analytic normals, so the water keeps
 * full PBR (IBL reflections from the scene environment, shadow receiving, fog)
 * at zero per-frame CPU cost — this replaces the old CPU vertex loop +
 * computeVertexNormals of WaterSurface3D.
 *
 * Waves are damped to a flat calm inside a radius around the ship so the
 * waterline, foam collar and stability markers stay readable; swell builds
 * toward the horizon.
 *
 * If the shader patch ever misbehaves on a device, flip USE_GPU_WAVES to fall
 * back to a static (still reflective, normal-mapped) surface.
 */

const USE_GPU_WAVES = true;

// dirX, dirZ, steepness, wavelength — steepness kept low so peak amplitude
// stays ≈0.1 world units and the hull waterline reads consistently.
const WAVES: [number, number, number, number][] = [
  [1.0, 0.25, 0.035, 9.0],
  [0.65, 0.76, 0.042, 4.2],
  [-0.4, 0.85, 0.04, 1.9],
];

const gerstnerChunk = /* glsl */ `
uniform float uOceanTime;

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
// z is world up and local xy = (world x, -world z). Waves are damped inside a
// hull-hugging ellipse instead of the old wide "calm disc" — gentle swell now
// reaches to within about half a unit of the plating.
const gerstnerVertex = /* glsl */ `
  float oceanDist = length(position.xy);
  float hullDist = length(vec2(position.x / 3.4, position.y / 1.35));
  // calm ellipse around the hull + flatten again toward the horizon so the
  // ocean silhouette stays a clean line against the sky
  float oceanDamp = smoothstep(0.95, 2.1, hullDist) * (1.0 - smoothstep(16.0, 28.0, oceanDist));
  vec3 oceanTangent = vec3(1.0, 0.0, 0.0);
  vec3 oceanBinormal = vec3(0.0, 1.0, 0.0);
  vec3 oceanOffset = vec3(0.0);
  oceanOffset += gerstnerWave(vec4(${WAVES[0].join(",")}), position, oceanTangent, oceanBinormal, oceanDamp);
  oceanOffset += gerstnerWave(vec4(${WAVES[1].join(",")}), position, oceanTangent, oceanBinormal, oceanDamp);
  oceanOffset += gerstnerWave(vec4(${WAVES[2].join(",")}), position, oceanTangent, oceanBinormal, oceanDamp);
`;

interface OceanSurface3DProps {
  /** Live heel angle (radians) — the foam collar tracks the shifted waterline. */
  heelRef?: React.MutableRefObject<number>;
}

export function OceanSurface3D({ heelRef }: OceanSurface3DProps) {
  const timeUniform = useRef<{ value: number }>({ value: 0 });
  const collarRef = useRef<THREE.Mesh>(null);

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

  const material = useMemo(() => {
    const mat = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#0d3d63"),
      roughness: 0.17,
      metalness: 0,
      normalMap: normalTex,
      normalScale: new THREE.Vector2(0.28, 0.28),
      envMapIntensity: 1.1,
      transparent: true,
      opacity: 0.96,
    });
    if (USE_GPU_WAVES) {
      mat.onBeforeCompile = (shader) => {
        shader.uniforms.uOceanTime = timeUniform.current;
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
          .replace(
            "#include <begin_vertex>",
            `vec3 transformed = vec3(position) + oceanOffset;`
          );
      };
      mat.customProgramCacheKey = () => "ocean-gerstner-v2";
    }
    return mat;
  }, [normalTex]);

  const geometry = useMemo(() => new THREE.PlaneGeometry(70, 70, 96, 96), []);
  const foamGeometry = useMemo(() => new THREE.RingGeometry(1, 1.32, 64), []);
  const foamMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: "#e8f1f7",
        alphaMap: foamTex,
        transparent: true,
        opacity: 0.75,
        depthWrite: false,
      }),
    [foamTex]
  );

  useFrame(({ clock }, delta) => {
    timeUniform.current.value = clock.getElapsedTime();
    // slow drift of the fine ripple detail + foam churn
    normalTex.offset.x += delta * 0.012;
    normalTex.offset.y += delta * 0.006;
    foamTex.offset.x += delta * 0.02;
    // foam collar follows the heeled waterline: shifts leeward, widens a
    // touch and fades at big angles so it never argues with the real line
    const heel = heelRef?.current ?? 0;
    const collar = collarRef.current;
    if (collar) {
      collar.position.z = -Math.sin(heel) * 0.32;
      collar.scale.y = 0.6 * (1 + 0.25 * Math.abs(Math.sin(heel)));
      (collar.material as THREE.MeshBasicMaterial).opacity = 0.75 - 0.3 * Math.min(Math.abs(heel) / 0.44, 1);
    }
  });

  useEffect(
    () => () => {
      geometry.dispose();
      material.dispose();
      foamGeometry.dispose();
      foamMaterial.dispose();
    },
    [geometry, material, foamGeometry, foamMaterial]
  );

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} geometry={geometry} material={material} receiveShadow />
      {/* foam collar hugging the hull waterline — hides the hull/water
          intersection line, which is the biggest "fake water" tell */}
      <mesh
        ref={collarRef}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0.015, 0]}
        scale={[2.98, 0.6, 1]}
        geometry={foamGeometry}
        material={foamMaterial}
      />
    </group>
  );
}

export default OceanSurface3D;
