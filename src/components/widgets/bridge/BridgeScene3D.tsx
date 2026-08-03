import { useEffect, useMemo, type ReactNode } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, Lightformer, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import type { HomeWidgetId } from "@/hooks/useHomeWidgets";
import { skyLook } from "@/components/widgets/instruments/skyLook";
import { BridgeRoom } from "./BridgeRoom";
import { BridgeConsole } from "./BridgeConsole";
import { BridgeInstrumentMounts, BridgeMountStyles } from "./BridgeInstrumentMounts";
import { SeaHorizon } from "./SeaHorizon";
import { ShipExterior } from "./ShipExterior";
import { disposeBridgeTextures } from "./bridgeTextures";
import { EYE_Y, HORIZON_SCENE, ROOM, SCENE_SCALE } from "./bridgeLayout";
import type { BridgeConditions } from "@/components/widgets/homeWidgetNodes";

/**
 * Köprüüstü sahnesi — ana sayfa widget'larının 3B karşılığı.
 *
 * Kamera dümencinin arkasında, göz hizasında (1.6 m) duruyor ve konsolun
 * çevresinde sınırlı bir yayda dönüyor: kullanıcı köprüüstünün içinde
 * kalıyor, duvarların arkasına geçemiyor. Aydınlatma iki kaynaktan geliyor —
 * pencerelerden giren gündüz ışığı (tek gölge veren yönlü ışık) ve tavandaki
 * gömme armatürler (bkz. BridgeRoom → Downlight).
 *
 * Camın dışı gerçek: geminin baş güvertesi (ShipExterior) ile deniz ve ufuk
 * (SeaHorizon) sahnenin içinde duruyor, cama boyalı değil. Kamera dönünce
 * gemi fona göre kayıyor — köprüüstünü çıkartmadan ayıran şey bu.
 *
 * Çevrimdışı sözleşmesi gemi simülasyonuyla aynı: HDR dosyası yok, yansımalar
 * drei'nin Lightformer panelleriyle yerel PMREM'e çiziliyor.
 */

/**
 * Görüş uzaklığı.
 *
 * Sahne santimetre biriminde (SCENE_SCALE = 100), aşağıdaki ikisi metre.
 * Oda tek başına 40 m'lik bir uzak düzlemle yetiniyordu; artık 700 m'deki
 * deniz kenarı ve 600 m'deki fon da kadraja giriyor. Oran 0.08 → 800 m,
 * yani 1:10 000 — 24-bit derinlik tamponu için rahat bir aralık, logaritmik
 * derinliğe (mobilde bedeli var) gerek kalmıyor. Yakın düzlem 8 cm'e
 * çekilebiliyor çünkü kamera hiçbir zaman 1.1 m'den yakına gelmiyor.
 */
const NEAR_M = 0.08;
const FAR_M = 800;

/**
 * Güneşin yönü. Gün ilerlemesi verildiğinde ışık gökyüzüyle aynı yere oturur:
 * doğuda doğar, tepeye çıkar, batıda batar. Veri yoksa öğleden sonra
 * sancak omzundan gelen sabit ışık — panoramaya boyalı güneşin yeri de orası.
 */
const DEFAULT_SUN: [number, number, number] = [2.4, 4.4, -7.5];

function sunDirection(progress: number | null | undefined): [number, number, number] {
  if (progress == null || Number.isNaN(progress)) return DEFAULT_SUN;
  // p=0 doğuş (iskele kıç omuzluğu), p=1 batış (sancak kıç omuzluğu).
  const angle = Math.PI * (1 - Math.min(1, Math.max(0, progress)));
  const elevation = Math.sin(Math.PI * Math.min(1.35, Math.max(-0.35, progress)));
  return [8.5 * Math.cos(angle), 1.2 + 5.2 * Math.max(elevation, -0.1), -6.5];
}

interface BridgeLightingProps {
  sun: [number, number, number];
  /** 0 gündüz, 1 tam karanlık. */
  night: number;
  /** Gökyüzünün o andaki üst rengi — yansımalar da onu almalı. */
  skyColor: string;
}

/**
 * Pencerelerden gelen gündüz ışığı ve konsol metaline yansıyan gökyüzü.
 *
 * Işıklar sahne grubunun içinde durduğu için konumları metre cinsinden
 * yazılır; yalnızca dünya biriminde ölçülen büyüklükler (gölge kamerasının
 * sınırları) SCENE_SCALE ile çarpılır.
 *
 * Gölge kamerası odayı kaplar, gemiyi değil — 60 m'lik güverteyi de içine
 * alacak şekilde büyütülseydi 1024²'lik harita odanın içinde çözünürlüğünü
 * kaybederdi. Dış geometri bu yüzden gölge vermiyor (bkz. ShipExterior).
 */
function BridgeLighting({ sun, night, skyColor }: BridgeLightingProps) {
  const day = 1 - night;
  return (
    <>
      <hemisphereLight args={[skyColor, "#3c4149", 0.2 + 0.3 * day]} />
      <ambientLight intensity={0.1 + 0.12 * day} />

      {/* Camlardan giren güneş — sahnedeki tek gölge kaynağı. */}
      <directionalLight
        position={sun}
        intensity={0.25 + 1.5 * day}
        color={night > 0.5 ? "#9fb6d8" : "#fff3dd"}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0006}
        shadow-normalBias={0.02 * SCENE_SCALE}
        shadow-camera-left={-4.5 * SCENE_SCALE}
        shadow-camera-right={4.5 * SCENE_SCALE}
        shadow-camera-top={4 * SCENE_SCALE}
        shadow-camera-bottom={-2 * SCENE_SCALE}
        shadow-camera-near={1 * SCENE_SCALE}
        shadow-camera-far={16 * SCENE_SCALE}
      />
      {/* Pencere kuşağının odaya vurduğu geniş, gölgesiz dolgu. rectAreaLight
          değil: o, three'nin ayrıca yüklenmesi gereken LTC tablolarına
          bağlı — burada aynı etkiyi yumuşak bir yönlü ışıkla veriyoruz. */}
      <directionalLight
        position={[0, ROOM.sillY + 0.9, -3.4]}
        intensity={0.12 + 0.48 * day}
        color={skyColor}
      />

      <Environment resolution={64} frames={1} background={false}>
        <color attach="background" args={["#3a444e"]} />
        {/* Pencere: parlak, geniş kart */}
        <Lightformer form="rect" intensity={0.6 + 3.4 * day} color={skyColor} position={[0, 1.6, -6]} scale={[7, 1.6, 1]} />
        {/* Tavan armatürleri */}
        <Lightformer
          form="rect"
          intensity={1.2}
          color="#fff0d6"
          position={[0, 3.4, -0.5]}
          rotation-x={Math.PI / 2}
          scale={[6, 6, 1]}
        />
        {/* Güverte: koyu geri dönüş */}
        <Lightformer
          form="rect"
          intensity={0.35}
          color="#2b3037"
          position={[0, -1, 0]}
          rotation-x={-Math.PI / 2}
          scale={[8, 8, 1]}
        />
      </Environment>
    </>
  );
}

export interface BridgeScene3DProps {
  nodes: Partial<Record<HomeWidgetId, ReactNode>>;
  enabled: HomeWidgetId[];
  /** Widget'ları besleyen aynı canlı veri — dışarısı da ondan besleniyor. */
  conditions?: BridgeConditions;
}

export function BridgeScene3D({ nodes, enabled, conditions }: BridgeScene3DProps) {
  // Sahne kapanınca canvas dokularını bırak — köprüüstü panoraması tek başına
  // birkaç megabayt.
  useEffect(() => () => disposeBridgeTextures(), []);

  /**
   * Gökyüzünün o anki hâli, güneş widget'ıyla tek kaynaktan: lombardan görünen
   * gökyüzü de (PortholeSky) aynı skyLook() tablosunu okuyor. İki yerde iki
   * ayrı gündüz/gece eğrisi olsaydı widget ile pencere birbirini yalanlardı.
   */
  const look = useMemo(() => skyLook(conditions?.sunProgress ?? null), [conditions?.sunProgress]);
  const night = look?.night ?? 0;
  const skyColor = look?.topColor ?? "#dceaf6";
  const sun = useMemo(() => sunDirection(conditions?.sunProgress), [conditions?.sunProgress]);

  /** Kapalı havada (WMO ≥ 45) deniz griye kaçar, açıkta gökyüzünü yansıtır. */
  const overcast = (conditions?.weatherCode ?? 0) >= 45;
  const seaColor = useMemo(() => {
    const base = new THREE.Color(overcast ? "#3f5566" : "#1e5274");
    return base.multiplyScalar(1 - 0.72 * night);
  }, [overcast, night]);

  /**
   * Fonun ışık tonu — panorama dokusunun üstüne çarpan olarak biner.
   *
   * Gündüz beyaz kalması şart: doku zaten gökyüzünü, bulutları ve kıyıyı
   * boyalı taşıyor, üstüne gökyüzü rengi çarpılsa kıyı da deniz de maviye
   * boğulurdu. Değişen yalnız günün ucu — alçak güneşte ısınıyor, gece
   * kararıyor.
   */
  const backdropTint = useMemo(() => {
    const c = new THREE.Color("#ffffff");
    if (look) {
      c.lerp(new THREE.Color(look.sunColor), Math.min(0.32, Math.max(0, 0.4 - look.elevation)));
      c.multiplyScalar(1 - 0.8 * night);
    }
    return c;
  }, [look, night]);

  /** Sis de aynı günü yaşamalı, yoksa gece deniz kenarı gündüz mavisine solar. */
  const fogColor = useMemo(
    () => new THREE.Color(HORIZON_SCENE.fogColor).multiplyScalar(1 - 0.8 * night),
    [night],
  );

  return (
    <>
      <BridgeMountStyles />
      <Canvas
        shadows
        dpr={[1, 1.75]}
        performance={{ min: 0.5 }}
        gl={{
          antialias: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.05,
        }}
        onCreated={({ gl }) => {
          gl.shadowMap.type = THREE.PCFSoftShadowMap;
        }}
      >
        {/* Kamera ve denetimler dünya biriminde çalışır — göz hizası 1.6 m.
            Dar dikey görüş açısı + geniş kare: köprüüstünün tamamı kadraja
            girerken boş güverte ve tavan dışarıda kalıyor. */}
        <PerspectiveCamera
          makeDefault
          position={[0, EYE_Y * SCENE_SCALE, 1.95 * SCENE_SCALE]}
          fov={48}
          near={NEAR_M * SCENE_SCALE}
          far={FAR_M * SCENE_SCALE}
        />
        <OrbitControls
          enablePan={false}
          enableDamping
          dampingFactor={0.08}
          target={[0, 1.33 * SCENE_SCALE, -1.9 * SCENE_SCALE]}
          minDistance={1.1 * SCENE_SCALE}
          maxDistance={4.2 * SCENE_SCALE}
          minAzimuthAngle={-0.5}
          maxAzimuthAngle={0.5}
          // Kamera odanın içinde kalır: 75°'nin altındaki bir yükseklik açısı
          // en uzak mesafede tavanın üstüne çıkardı, 93° ise güverteye gömerdi.
          minPolarAngle={1.32}
          maxPolarAngle={1.62}
        />

        {/* Sis dünya biriminde ölçülür, yani sahne ölçeğiyle çarpılır. Deniz
            düzleminin dış kenarını fonun boyalı denizine bağlar; oda (≤6 m) ve
            gemi (≤60 m) sisin çok berisinde kaldığı için etkilenmiyor. */}
        <fog
          attach="fog"
          args={[fogColor, HORIZON_SCENE.fogNear * SCENE_SCALE, HORIZON_SCENE.fogFar * SCENE_SCALE]}
        />

        <group scale={SCENE_SCALE}>
          <BridgeLighting sun={sun} night={night} skyColor={skyColor} />
          <SeaHorizon windSpeedKt={conditions?.windSpeedKt} tint={backdropTint} seaColor={seaColor} />
          <ShipExterior night={night} />
          <BridgeRoom />
          <BridgeConsole />
          <BridgeInstrumentMounts nodes={nodes} enabled={enabled} />
        </group>
      </Canvas>
    </>
  );
}

export default BridgeScene3D;
