import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { getWaterNormalTexture } from "@/components/stability/sim/proceduralTextures";
import { getSeaPanoramaTexture, PANORAMA_HORIZON_V } from "./bridgeTextures";
import { EYE_Y, EXTERIOR, HORIZON_SCENE } from "./bridgeLayout";

/**
 * Camın dışındaki dünya: ufuk fonu ve deniz.
 *
 * İki katman var. Uzakta panorama dokusunu taşıyan bir silindir yayı, yakında
 * gerçek bir deniz düzlemi; ikisi sis bandında birbirine karışıyor. Fon 600
 * m'de olduğu için kameranın oda içindeki ~1.5 m'lik gezinmesine 0.15° ile
 * karşılık verir, yani sabit durur — ama artık geminin ARKASINDADIR. İşin
 * bütün meselesi bu: eskiden manzara cama boyalıydı ve gemi de o boyanın
 * üstünde bir resimdi; şimdi gemi fonun önündeki gerçek geometri, kamera
 * dönünce ona göre kayıyor.
 *
 * Salınım gemide değil ufukta. Kamera gemiye bağlı olduğu için güverte
 * görüntüde sabit durmalı, salınan deniz ve ufuk olmalı — köprüüstünden
 * bakınca gerçekten de böyle görünür. İki grubu döndürmek geminin onlarca
 * meshini döndürmekten ayrıca çok ucuz.
 *
 * Çevrimdışı sözleşmesi korunuyor: fon dokusu bridgeTextures'ta tuvale
 * çiziliyor, su normali gemi simülasyonunun üretecinden geliyor; ne HDR ne de
 * ağ isteği var.
 */

/**
 * Fon silindirinin merkez yüksekliği elle yazılmaz.
 *
 * Dokuda ufuk üstten PANORAMA_HORIZON_V oranında; dünyada da göz hizasına
 * gelmeli. Silindirin üst kenarı yc + h/2 olduğuna göre ufuk çizgisi
 * yc + h·(0.5 − v_ufuk) yüksekliğine düşer; bunu EYE_Y'ye eşitliyoruz.
 */
const BACKDROP_CENTER_Y = EYE_Y - (0.5 - PANORAMA_HORIZON_V) * HORIZON_SCENE.backdropHeight;

/**
 * Salınımın iki bileşeni: uzun bir ölü dalga ve üstüne binen kısa bir tepki.
 * Periyotlar tam katı olmayan bir oranda (11.3 s / 7.1 s) seçildi — yoksa
 * hareket birkaç saniyede bir aynı yere dönüp göze döngü olarak görünür.
 */
const ROLL_PERIOD = 11.3;
const PITCH_PERIOD = 7.1;

/** Sakin havada bile duran bir deniz yoktur; rüzgâr sıfırken de bu kadar salınır. */
const CALM_ROLL_DEG = 0.35;
const CALM_PITCH_DEG = 0.18;

/**
 * Rüzgârla artan genlik. 30 kt (7 Bofor) tam kuvvetini verir, ötesi doymuş
 * kalır: widget'ın 46svh'lik penceresinde daha fazlası kadrajı sallamaktan
 * başka bir şey yapmıyor.
 */
const GALE_KT = 30;
const ROLL_AT_GALE_DEG = 1.5;
const PITCH_AT_GALE_DEG = 0.8;

/** Su dokusunun bir karesinin denk geldiği mesafe — dalga detayının ölçeği. */
const WATER_TILE_M = 35;

export interface SeaHorizonProps {
  /** Rüzgâr hızı (kt) — salınımın genliğini verir. */
  windSpeedKt?: number;
  /** Fonun ışık tonu: gündüz beyaz (dokuya dokunmaz), gece koyu. */
  tint?: THREE.ColorRepresentation;
  /** Denizin kendi rengi — gece kararır, kapalı havada griye kaçar. */
  seaColor?: THREE.ColorRepresentation;
}

export function SeaHorizon({ windSpeedKt, tint = "#ffffff", seaColor = "#1e5274" }: SeaHorizonProps) {
  const group = useRef<THREE.Group>(null);

  const panorama = useMemo(() => getSeaPanoramaTexture(), []);

  /**
   * Su normalinin kendi kopyası.
   *
   * getWaterNormalTexture() modül düzeyinde önbelleklenmiş ortak bir doku
   * döndürür ve gemi simülasyonu da onu kendi repeat'iyle kullanıyor. Kopya
   * almazsak iki sahne birbirinin dalga ölçeğini bozar, üstelik sim'in
   * disposeAllShipTextures()'ı bizim altımızdan dokuyu serbest bırakabilir.
   * clone() görüntüyü paylaşır, durumu paylaşmaz.
   */
  const waterNormal = useMemo(() => {
    const t = getWaterNormalTexture().clone();
    t.needsUpdate = true;
    t.wrapS = THREE.RepeatWrapping;
    t.wrapT = THREE.RepeatWrapping;
    const tiles = (HORIZON_SCENE.seaRadius * 2) / WATER_TILE_M;
    t.repeat.set(tiles, tiles);
    return t;
  }, []);

  const backdropGeometry = useMemo(
    () =>
      new THREE.CylinderGeometry(
        HORIZON_SCENE.backdropRadius,
        HORIZON_SCENE.backdropRadius,
        HORIZON_SCENE.backdropHeight,
        96,
        1,
        true,
        // Yay baş tarafa (−Z) ortalanır. three'de silindirin θ=0'ı +Z'dir
        // (x = r·sinθ, z = r·cosθ), yani kıç tarafı; yarım tur ekleyip yayın
        // yarısı kadar geri alınca orta nokta baş tarafa düşer.
        Math.PI - HORIZON_SCENE.backdropArc / 2,
        HORIZON_SCENE.backdropArc,
      ),
    [],
  );

  const seaGeometry = useMemo(() => new THREE.CircleGeometry(HORIZON_SCENE.seaRadius, 96), []);

  useEffect(
    () => () => {
      backdropGeometry.dispose();
      seaGeometry.dispose();
      waterNormal.dispose();
    },
    [backdropGeometry, seaGeometry, waterNormal],
  );

  const { rollAmp, pitchAmp } = useMemo(() => {
    const t = Math.min(1, Math.max(0, (windSpeedKt ?? 0) / GALE_KT));
    return {
      rollAmp: THREE.MathUtils.degToRad(CALM_ROLL_DEG + (ROLL_AT_GALE_DEG - CALM_ROLL_DEG) * t),
      pitchAmp: THREE.MathUtils.degToRad(CALM_PITCH_DEG + (PITCH_AT_GALE_DEG - CALM_PITCH_DEG) * t),
    };
  }, [windSpeedKt]);

  useFrame(({ clock }, delta) => {
    const t = clock.getElapsedTime();
    if (group.current) {
      group.current.rotation.z = Math.sin((t * 2 * Math.PI) / ROLL_PERIOD) * rollAmp;
      group.current.rotation.x = Math.sin((t * 2 * Math.PI) / PITCH_PERIOD + 1.1) * pitchAmp;
    }
    // Su yüzeyi kendi başına da yaşamalı: salınım en sakin hâlindeyken bile
    // normal haritası kaydığı için deniz donmuş bir fotoğrafa dönmüyor.
    waterNormal.offset.x += delta * 0.004;
    waterNormal.offset.y += delta * 0.0022;
  });

  return (
    /*
     * Dönme noktası su hattında, gemi merkez hattında: gemi de yalpasını bu
     * eksende yapar. Dış grup döner, iç grup aynı kaymayı geri alır — böylece
     * çocukların y'leri sahne koordinatında okunur kalır.
     */
    <group ref={group} position={[0, EXTERIOR.waterlineY, 0]}>
      <group position={[0, -EXTERIOR.waterlineY, 0]}>
        {/* Fon: aydınlatmasız ve sissiz. Boyalı gökyüzü kendi ışığını taşıyor;
            sahne ışığına bağlansaydı oda karardığında ufuk da kararırdı.
            Derinliğe yazmaz — gökkutusu düzeni: önce o basılır, üstüne gelen
            her şey onu örter. */}
        <mesh position={[0, BACKDROP_CENTER_Y, 0]} geometry={backdropGeometry} renderOrder={-1}>
          <meshBasicMaterial
            map={panorama}
            color={tint}
            side={THREE.BackSide}
            toneMapped={false}
            fog={false}
            depthWrite={false}
          />
        </mesh>

        {/* Deniz: su hattında. Dış kenarı 700 m'de, ufkun 0.74° altında kalıyor
            — sis onu fonun boyalı denizine bağlamasa orada bir disk kenarı
            görünürdü. */}
        <mesh position={[0, EXTERIOR.waterlineY, 0]} rotation={[-Math.PI / 2, 0, 0]} geometry={seaGeometry}>
          <meshStandardMaterial
            color={seaColor}
            normalMap={waterNormal}
            normalScale={new THREE.Vector2(0.45, 0.45)}
            roughness={0.16}
            metalness={0}
            envMapIntensity={1.2}
          />
        </mesh>
      </group>
    </group>
  );
}

export default SeaHorizon;
