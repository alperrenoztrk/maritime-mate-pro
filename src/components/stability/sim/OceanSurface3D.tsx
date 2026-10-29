import { useEffect, useMemo, type MutableRefObject } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { WAVE_COUNT } from '@/lib/seakeeping';
import type { OceanFrame } from '@/lib/oceanSimulation';
import { OCEAN_SEGMENTS, type OceanQuality } from './oceanQuality';
import { getWaterNormalTexture } from './proceduralTextures';

// Plane-local coordinates: (world x, −world z, world y). Both the GPU and
// buoyancy sampler consume the same waves and integrated phases.
const waveShader = /* glsl */ `
uniform vec4 uWaves[${WAVE_COUNT}];
uniform float uPhases[${WAVE_COUNT}];
uniform float uChop;
void seaSurface(vec2 p, out vec3 offset, out vec3 tx, out vec3 ty, out float compression) {
  offset = vec3(0.0);
  tx = vec3(1.0, 0.0, 0.0);
  ty = vec3(0.0, 1.0, 0.0);
  for (int i = 0; i < ${WAVE_COUNT}; i++) {
    vec4 w = uWaves[i];
    float k = 6.28318530718 / w.w;
    float phase = k * dot(w.xy, p) + uPhases[i];
    float s = sin(phase), c = cos(phase), a = w.z / k;
    offset += vec3(uChop * w.xy * a * c, a * s);
    tx += vec3(-uChop*w.x*w.x*w.z*s, -uChop*w.x*w.y*w.z*s, w.x*w.z*c);
    ty += vec3(-uChop*w.x*w.y*w.z*s, -uChop*w.y*w.y*w.z*s, w.y*w.z*c);
  }
  compression = 1.0 - (tx.x * ty.y - tx.y * ty.x);
}
`;
const surfaceFragment = /* glsl */ `
uniform sampler2D uRipple;
uniform float uTime;
uniform float uEnergy;
uniform float uSpeed;
uniform float uHeel;
uniform float uWake;
varying vec2 vSeaPoint;
float seaNoise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  f = f*f*(3.0-2.0*f);
  vec4 n = fract(sin(vec4(dot(i,vec2(127.1,311.7)), dot(i+vec2(1,0),vec2(127.1,311.7)),
    dot(i+vec2(0,1),vec2(127.1,311.7)), dot(i+vec2(1),vec2(127.1,311.7))))*43758.5453);
  return mix(mix(n.x,n.y,f.x),mix(n.z,n.w,f.x),f.y);
}
`;
/** One draw call with a dense near field and coarse fogged horizon. */
function oceanGeometry(quality: OceanQuality) {
  const segments = OCEAN_SEGMENTS[quality];
  const geometry = new THREE.PlaneGeometry(2, 2, segments, segments);
  const position = geometry.attributes.position;
  const spread = (v: number) => Math.sign(v) * 65 * Math.expm1(Math.abs(v) * 3.8) / Math.expm1(3.8);
  for (let i = 0; i < position.count; i++) position.setXYZ(i, spread(position.getX(i)), spread(position.getY(i)), 0);
  geometry.computeBoundingSphere();
  return geometry;
}
interface Props {
  frame: MutableRefObject<OceanFrame>;
  heelRef: MutableRefObject<number>;
  wakeIntensity: number;
  quality?: OceanQuality;
}
export function OceanSurface3D({ frame, heelRef, wakeIntensity, quality = 'balanced' }: Props) {
  const geometry = useMemo(() => oceanGeometry(quality), [quality]);
  const normalTexture = useMemo(() => {
    const texture = getWaterNormalTexture().clone();
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    return texture;
  }, []);
  const uniforms = useMemo(() => ({
    uWaves: { value: Array.from({ length: WAVE_COUNT }, () => new THREE.Vector4(1, 0, 0, 1)) },
    uPhases: { value: new Float32Array(WAVE_COUNT) },
    uChop: { value: 0 }, uTime: { value: 0 }, uEnergy: { value: 0 },
    uSpeed: { value: 0 }, uHeel: { value: 0 }, uWake: { value: 0 },
    uRipple: { value: normalTexture },
  }), [normalTexture]);
  const material = useMemo(() => {
    // Opaque deep water correctly occludes submerged plating; foam is shaded on
    // the displaced surface rather than a transparent plane over the waves.
    const mat = quality === 'high' ? new THREE.MeshPhysicalMaterial({
      color: '#063844', roughness: 0.18, metalness: 0, ior: 1.333, envMapIntensity: 1.35,
    }) : new THREE.MeshStandardMaterial({
      color: '#063844', roughness: 0.18, metalness: 0, envMapIntensity: 1.15,
    });
    // Lower tiers interpolate analytic vertex normals/crest compression.
    // This removes twelve trigonometric wave evaluations from EVERY pixel;
    // scrolling normal maps retain fine ripples without that fragment cost.
    const oceanVaryings = 'varying vec3 vOceanOffset; varying vec3 vOceanNormal; varying float vCompression;';
    mat.onBeforeCompile = shader => {
      Object.assign(shader.uniforms, uniforms);
      shader.vertexShader = shader.vertexShader
        .replace('#include <common>', `#include <common>\n${waveShader}\nvarying vec2 vSeaPoint;\n${oceanVaryings}`)
        .replace('#include <beginnormal_vertex>', `
          vec3 displacement, tx, ty; float compression;
          seaSurface(position.xy, displacement, tx, ty, compression);
          vec3 objectNormal = normalize(cross(tx, ty));
          ${quality === 'high' ? '' : `
          // Coarse horizon cells must not alias short waves into a sawtooth
          // skyline. Fade distant displacement/normals into the fog; the
          // complete Gerstner surface is retained around the vessel.
          float horizonFade = 1.0 - smoothstep(14.0,45.0,length(position.xy));
          displacement *= horizonFade;
          objectNormal = normalize(mix(vec3(0.0,0.0,1.0),objectNormal,horizonFade));
          compression *= horizonFade;
          `}
        `)
        .replace('#include <begin_vertex>', `
          vSeaPoint = position.xy;
          vOceanOffset = displacement;
          vOceanNormal = objectNormal;
          vCompression = compression;
          vec3 transformed = position + displacement;
        `);
      shader.fragmentShader = shader.fragmentShader
        .replace('#include <common>', `#include <common>\n${quality === 'high' ? waveShader : ''}\n${surfaceFragment}\n${oceanVaryings}`)
        .replace('#include <color_fragment>', `
          #include <color_fragment>
          ${quality === 'high' ? `
          vec3 oceanOffset, oceanTx, oceanTy; float compression;
          seaSurface(vSeaPoint, oceanOffset, oceanTx, oceanTy, compression);
          vec3 localSeaNormal = normalize(cross(oceanTx,oceanTy));
          ` : `
          vec3 oceanOffset = vOceanOffset;
          float compression = vCompression;
          vec3 localSeaNormal = normalize(vOceanNormal);
          `}
          vec2 waterPoint = vSeaPoint + oceanOffset.xy;
          float distanceFade = 1.0 - smoothstep(14.0, 45.0, length(vSeaPoint));
          vec2 flow = waterPoint*7.0 + vec2(uTime*0.16, -uTime*0.11);
          float bubbles = seaNoise(flow)*0.65 + seaNoise(flow*3.7)*0.35;
          float crest = smoothstep(0.12, 0.40, compression) * smoothstep(0.28,0.72,bubbles);
          crest *= smoothstep(0.045, 0.2, uEnergy);
          float aft = max(0.0, -waterPoint.x-2.75);
          float side = abs(waterPoint.y - sin(uHeel)*0.30);
          float wakeWidth = 0.24 + aft*0.354;
          float kelvin = exp(-pow((side-wakeWidth)/(0.055+aft*0.035),2.0));
          float propWash = exp(-side*side/(0.025+aft*0.12));
          float aftMask = 1.0-smoothstep(-3.1,-2.65,waterPoint.x);
          float wake = (kelvin*0.65+propWash*0.48)*aftMask*exp(-aft*0.26);
          float bow = exp(-pow((waterPoint.x-2.76)/0.36,2.0)-pow((side-0.22)/0.13,2.0));
          float speedFade = smoothstep(0.002, 0.18, uSpeed) * uWake;
          float wakeFoam = (wake+bow)*speedFade*smoothstep(0.22,0.66,bubbles);
          float foam = clamp((crest + wakeFoam)*distanceFade,0.0,0.92);
          float crestLight = smoothstep(-0.08,0.15,oceanOffset.z);
          diffuseColor.rgb = mix(diffuseColor.rgb,vec3(0.018,0.16,0.18),crestLight*0.45);
          diffuseColor.rgb = mix(diffuseColor.rgb,vec3(0.78,0.88,0.87),foam);
        `)
        .replace('#include <roughnessmap_fragment>', `
          #include <roughnessmap_fragment>
          roughnessFactor = mix(${quality === 'high' ? '0.13' : 'mix(0.3,0.16,distanceFade)'},0.66,foam);
        `)
        .replace('#include <normal_fragment_maps>', `
          // Two moving normal scales preserve the small surface ripples.
          vec2 ripple1 = texture2D(uRipple,waterPoint*0.75+vec2(uTime*0.013,uTime*0.007)).xy*2.0-1.0;
          vec2 ripple2 = texture2D(uRipple,waterPoint.yx*1.83+vec2(-uTime*0.009,uTime*0.017)).xy*2.0-1.0;
          vec2 ripple = (ripple1+ripple2*0.45)*min(1.0,uEnergy*5.0)*distanceFade;
          vec3 worldSeaNormal = normalize(vec3(localSeaNormal.x+ripple.x*0.22,localSeaNormal.z,-localSeaNormal.y+ripple.y*0.22));
          normal = normalize(mat3(viewMatrix)*worldSeaNormal);
        `);
    };
    mat.customProgramCacheKey = () => `directional-ocean-v2-${quality}`;
    return mat;
  }, [uniforms, quality]);
  useFrame(() => {
    const sea = frame.current;
    let energy = 0;
    sea.waves.forEach((w, i) => {
      uniforms.uWaves.value[i].set(...w); uniforms.uPhases.value[i] = sea.phases[i]; energy += w[2];
    });
    uniforms.uChop.value = sea.chop; uniforms.uTime.value = sea.time;
    uniforms.uEnergy.value = energy; uniforms.uSpeed.value = sea.speed;
    uniforms.uHeel.value = heelRef.current; uniforms.uWake.value = wakeIntensity;
  });
  useEffect(() => () => geometry.dispose(), [geometry]);
  useEffect(() => () => material.dispose(), [material]);
  useEffect(() => () => normalTexture.dispose(), [normalTexture]);
  return <mesh name="ocean-surface" rotation={[-Math.PI / 2, 0, 0]} geometry={geometry} material={material} receiveShadow />;
}
export default OceanSurface3D;
