import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { getWaterNormalTexture } from "@/components/stability/sim/proceduralTextures";
import { HORIZON_SCENE } from "./bridgeLayout";
import { foldingScale, WAVE_COMPONENTS, type WaveTrain } from "./waveField";

/**
 * Denizin kendisi: Gerstner dalgalarıyla kabartılmış, köpüklü su yüzeyi.
 *
 * Düz bir düzleme normal haritası sermek uzaktan iş görüyordu ama gemi
 * yürümeye başlayınca yetmedi — dalga TEPESİ olmayan bir denizde ne baş
 * vurması ne de köpük görünür. Yüzey artık gerçekten kabarıyor ve kabardığı
 * dalgalar, geminin yalpasını hesaplayan dalgaların ta kendisi (bkz.
 * waveField.ts): aynı tren hem GPU'ya hem CPU'ya gidiyor.
 *
 * ÜÇGEN BÜTÇESİ NEREYE HARCANDI: ızgara kutupsal ve GEOMETRİK — halka
 * yarıçapları r₀·kⁱ diye büyüyor. Böylece her halka görüş açısında yaklaşık
 * aynı yeri kaplıyor: 10 m'de 0.5 m'lik, 700 m'de 35 m'lik karolar. Eşit
 * aralıklı bir ızgarada aynı yakın detay için on binlerce üçgen gerekirdi.
 *
 * Kabarma 150 m'den sonra sönüyor: o mesafede bir karo dalga boyundan büyük
 * olmaya başlıyor, kabartmayı sürdürmek dalgayı çözmek değil takma diş gibi
 * tırtıklamak olurdu. Ötesini sis ve fonun boyalı denizi devralıyor.
 */

/** GPU'ya giden dalga bileşeni sayısı — waveField.ts tam bu kadar üretiyor. */
const WAVE_COUNT = WAVE_COMPONENTS;

/** Izgara: halka ve dilim sayısı. 96×128 ≈ 24 500 üçgen. */
const RINGS = 96;
const SECTORS = 128;
/** En içteki halka — daha yakını gövdenin altında kalıyor, görünmüyor. */
const INNER_R = 5;

/** Kabartmanın söndüğü aralık (m). */
const FADE_START = 150;
const FADE_END = 420;

/** Su normal dokusunun bir karesinin denk geldiği mesafe (m). */
const WATER_TILE_M = 26;

/**
 * Kutupsal disk. Yerel eksenler sahneyle aynı (XZ düzlemi, normal +Y) —
 * döndürülmesi gerekmiyor, böylece shader'daki `position.xz` doğrudan gemi
 * çatısındaki metre.
 */
function buildOceanGeometry(): THREE.BufferGeometry {
  const outer = HORIZON_SCENE.seaRadius;
  const growth = Math.pow(outer / INNER_R, 1 / RINGS);

  const positions = new Float32Array((RINGS + 1) * SECTORS * 3);
  const uvs = new Float32Array((RINGS + 1) * SECTORS * 2);
  const normals = new Float32Array((RINGS + 1) * SECTORS * 3);
  const index: number[] = [];

  for (let i = 0; i <= RINGS; i++) {
    const r = INNER_R * Math.pow(growth, i);
    for (let s = 0; s < SECTORS; s++) {
      const a = (s / SECTORS) * Math.PI * 2;
      const v = (i * SECTORS + s) * 3;
      const x = Math.cos(a) * r;
      const z = Math.sin(a) * r;
      positions[v] = x;
      positions[v + 1] = 0;
      positions[v + 2] = z;
      normals[v] = 0;
      normals[v + 1] = 1;
      normals[v + 2] = 0;
      const t = (i * SECTORS + s) * 2;
      uvs[t] = x / WATER_TILE_M;
      uvs[t + 1] = z / WATER_TILE_M;
    }
  }

  for (let i = 0; i < RINGS; i++) {
    for (let s = 0; s < SECTORS; s++) {
      const s1 = (s + 1) % SECTORS;
      const a = i * SECTORS + s;
      const b = i * SECTORS + s1;
      const c = (i + 1) * SECTORS + s;
      const d = (i + 1) * SECTORS + s1;
      // Sarım saat yönünde: dilim açısı +θ yönünde ilerlerken (x=cos, z=sin)
      // ters sarım yüzeyi AŞAĞI baktırır ve deniz arka yüz elemesine takılıp
      // hiç çizilmez — geriye fonun boyalı denizi kalır.
      index.push(a, d, c, a, b, d);
    }
  }

  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  g.setAttribute("normal", new THREE.BufferAttribute(normals, 3));
  g.setAttribute("uv", new THREE.BufferAttribute(uvs, 2));
  g.setIndex(index);
  g.computeBoundingSphere();
  return g;
}

const VERTEX_PARS = /* glsl */ `
uniform float uTime;
uniform vec2 uOffset;
uniform vec4 uWaveA[${WAVE_COUNT}];  // yön.xy, genlik, dalga sayısı k
uniform vec4 uWaveB[${WAVE_COUNT}];  // omega, sivrilik Q, faz, (boş)
uniform float uFadeStart;
uniform float uFadeEnd;
uniform vec2 uFoamEdge;
varying float vFoam;
varying float vCrest;
`;

/**
 * Gerstner toplamı. Yer değiştirme ve normal aynı döngüden çıkıyor; normal
 * analitik (sonlu farkla değil) hesaplandığı için ızgara kabalaştığı yerde
 * bile aydınlatma pürüzsüz kalıyor.
 *
 * `folding` yüzeyin kendi üstüne katlanma ölçüsü — Gerstner dalgasında tepe
 * sivrildikçe 1'e yaklaşır. Beyaz köpüğün nerede olacağını bu belirliyor:
 * köpük rüzgârın estiği her yere değil, KIRILAN tepelere biner.
 */
const VERTEX_BODY = /* glsl */ `
  vec3 transformed = vec3( position );
  vec2 p = position.xz + uOffset;

  float dist = length( position.xz );
  float fade = 1.0 - smoothstep( uFadeStart, uFadeEnd, dist );

  vec3 tangentSum = vec3( 0.0 );
  float folding = 0.0;
  float crest = 0.0;

  for ( int i = 0; i < ${WAVE_COUNT}; i++ ) {
    vec2 dir = uWaveA[ i ].xy;
    float amp = uWaveA[ i ].z * fade;
    float k = uWaveA[ i ].w;
    float omega = uWaveB[ i ].x;
    float steep = uWaveB[ i ].y;
    float phase = uWaveB[ i ].z;

    float f = k * dot( dir, p ) - omega * uTime + phase;
    float c = cos( f );
    float s = sin( f );
    float q = steep;

    transformed.x += q * amp * dir.x * c;
    transformed.z += q * amp * dir.y * c;
    transformed.y += amp * s;

    tangentSum.x += dir.x * k * amp * c;
    tangentSum.z += dir.y * k * amp * c;
    tangentSum.y += q * k * amp * s;

    folding += q * k * amp * s;
    crest += amp * s;
  }

  vec3 objectNormal = normalize( vec3( -tangentSum.x, 1.0 - tangentSum.y, -tangentSum.z ) );
  // Eşik denizin kendi dikliğinden geliyor (bkz. foldingScale): köpük her
  // deniz durumunda tepelerin üst çeyreğine biniyor, ne sakin havada yüzeye
  // yayılıyor ne de fırtınada denizi baştan başa beyaza boğuyor.
  vFoam = smoothstep( uFoamEdge.x, uFoamEdge.y, folding );
  vCrest = clamp( crest, -2.5, 2.5 );
`;

const FRAGMENT_PARS = /* glsl */ `
uniform vec3 uFoamColor;
uniform float uFoamAmount;
varying float vFoam;
varying float vCrest;
`;

export interface OceanSurfaceProps {
  /**
   * Dalga treni ve kayma doğrudan simülasyondan okunuyor, prop olarak
   * kopyalanmıyor: ikisi de kare döngüsünde değişiyor, React'in yeniden
   * çizimini beklemek bir kareden fazla gecikme demek olurdu.
   */
  sim: { trains: WaveTrain[]; offset: { x: number; z: number } };
  /** Suyun kendi rengi. */
  color: THREE.ColorRepresentation;
  /** Beyaz köpük örtüsü (0–1) — rüzgârın kuvvetinden. */
  whitecap: number;
  /** Deniz kabardıkça yüzey matlaşır; parlama sakin havada keskin. */
  roughness: number;
}

export function OceanSurface({ sim, color, whitecap, roughness }: OceanSurfaceProps) {
  const geometry = useMemo(() => buildOceanGeometry(), []);

  /**
   * Su normalinin kendi kopyası: getWaterNormalTexture() modül düzeyinde
   * paylaşılan bir doku döndürüyor ve gemi simülasyonu da onu kendi
   * repeat'iyle kullanıyor. clone() görüntüyü paylaşır, durumu paylaşmaz.
   */
  const normalMap = useMemo(() => {
    const t = getWaterNormalTexture().clone();
    t.needsUpdate = true;
    t.wrapS = THREE.RepeatWrapping;
    t.wrapT = THREE.RepeatWrapping;
    return t;
  }, []);

  const uniforms = useRef({
    uTime: { value: 0 },
    uOffset: { value: new THREE.Vector2() },
    uWaveA: { value: Array.from({ length: WAVE_COUNT }, () => new THREE.Vector4(1, 0, 0, 1)) },
    uWaveB: { value: Array.from({ length: WAVE_COUNT }, () => new THREE.Vector4(0, 0, 0, 0)) },
    uFadeStart: { value: FADE_START },
    uFadeEnd: { value: FADE_END },
    uFoamEdge: { value: new THREE.Vector2(0.06, 0.2) },
    uFoamColor: { value: new THREE.Color("#e9f3f6") },
    uFoamAmount: { value: 0 },
  }).current;

  const material = useMemo(() => {
    const m = new THREE.MeshStandardMaterial({
      color: "#1e5274",
      normalMap,
      normalScale: new THREE.Vector2(0.55, 0.55),
      roughness: 0.2,
      metalness: 0,
      envMapIntensity: 1.15,
    });

    m.onBeforeCompile = (shader) => {
      Object.assign(shader.uniforms, uniforms);
      shader.vertexShader = shader.vertexShader
        .replace("#include <common>", `#include <common>\n${VERTEX_PARS}`)
        // Gerstner toplamı hem yer değiştirmeyi hem normali üretiyor; three'nin
        // sırası normal bloklarını begin_vertex'ten ÖNCE çalıştırdığı için
        // hesap beginnormal_vertex'e giriyor ve transformed oradan taşınıyor.
        .replace("#include <beginnormal_vertex>", VERTEX_BODY)
        .replace("#include <begin_vertex>", "");
      shader.fragmentShader = shader.fragmentShader
        .replace("#include <common>", `#include <common>\n${FRAGMENT_PARS}`)
        .replace(
          "#include <color_fragment>",
          /* glsl */ `
          #include <color_fragment>
          float foam = vFoam * uFoamAmount;
          // Çukurlar koyu, tepeler açık: derin suda ışık tepeden sızar.
          diffuseColor.rgb *= 1.0 + 0.16 * clamp( vCrest, -1.0, 1.0 );
          diffuseColor.rgb = mix( diffuseColor.rgb, uFoamColor, foam );
          `,
        )
        .replace(
          "#include <roughnessmap_fragment>",
          /* glsl */ `
          #include <roughnessmap_fragment>
          // Köpük ışığı dağıtır: parlak su lekesi değil, mat bir örtü.
          roughnessFactor = mix( roughnessFactor, 0.92, vFoam * uFoamAmount );
          `,
        );
    };
    // Aynı gövdeyi paylaşan başka bir standart malzemeyle program önbelleği
    // karışmasın.
    m.customProgramCacheKey = () => "bridge-ocean-gerstner-v2";
    return m;
  }, [normalMap, uniforms]);

  useEffect(
    () => () => {
      geometry.dispose();
      material.dispose();
      normalMap.dispose();
    },
    [geometry, material, normalMap],
  );

  // Malzeme rengi/pürüzü veriyle değişiyor; uniform yazmak yeni bir program
  // derlemesi gerektirmediği için her karede güvenle güncellenebilir.
  useFrame(({ clock }) => {
    uniforms.uTime.value = clock.getElapsedTime();
    uniforms.uOffset.value.set(sim.offset.x, sim.offset.z);
    uniforms.uFoamAmount.value = whitecap;
    // Köpük eşiği: kırılmaya yaklaşan tepeler. Üst sınırın %62'sinden
    // başlayıp %96'sında doyuyor.
    const fold = foldingScale(sim.trains);
    uniforms.uFoamEdge.value.set(fold * 0.62, fold * 0.96);

    for (let i = 0; i < WAVE_COUNT; i++) {
      const w = sim.trains[i];
      const a = uniforms.uWaveA.value[i];
      const b = uniforms.uWaveB.value[i];
      if (!w) {
        a.set(1, 0, 0, 1);
        b.set(0, 0, 0, 0);
        continue;
      }
      a.set(w.dirX, w.dirZ, w.amplitude, w.k);
      // Sivrilik Q, tepenin sivriliğini k·a ile sınırlar: Q·k·a > 1 olduğunda
      // Gerstner yüzeyi kendi üstüne katlanıp düğümlenir.
      const q = Math.min(w.steepness, 0.92) / Math.max(1e-4, w.k * w.amplitude * WAVE_COUNT);
      b.set(w.omega, Math.min(1, q), w.phase, 0);
    }

    material.color.set(color);
    material.roughness = roughness;
    normalMap.offset.x += 0.00035;
    normalMap.offset.y += 0.0002;
  });

  return <mesh geometry={geometry} material={material} frustumCulled={false} />;
}

export default OceanSurface;
