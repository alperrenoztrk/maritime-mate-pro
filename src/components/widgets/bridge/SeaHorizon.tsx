import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { getSeaPanoramaTexture, PANORAMA_HORIZON_V } from "./bridgeTextures";
import { EYE_Y, EXTERIOR, HORIZON_SCENE } from "./bridgeLayout";
import { OceanSurface } from "./OceanSurface";
import { whitecapCoverage } from "./waveField";
import type { BridgeSim } from "./bridgeSim";

/**
 * Camın dışındaki dünya: ufuk fonu, deniz ve geminin denize verdiği tepki.
 *
 * İki katman var. Uzakta panorama dokusunu taşıyan bir silindir, yakında
 * Gerstner dalgalarıyla kabaran gerçek bir su yüzeyi; ikisi sis bandında
 * birbirine karışıyor. Fon 600 m'de olduğu için kameranın oda içindeki ~1.5
 * m'lik gezinmesine 0.15° ile karşılık verir, yani sabit durur — ama
 * geminin ARKASINDADIR ve gemi döndükçe döner: kıyı artık pusulaya bağlı.
 *
 * SALINIM GEMİDE DEĞİL UFUKTA. Kamera gemiye bağlı olduğu için güverte
 * görüntüde sabit durmalı, salınan deniz ve ufuk olmalı — köprüüstünden
 * bakınca gerçekten de böyle görünür. Ayrıca çok daha ucuz: iki grubu
 * döndürmek, geminin onlarca meshini döndürmekten katbekat hafif.
 *
 * Salınımın kendisi artık uydurma bir sinüs değil: gemi, gözle görülen
 * dalgaların eğimine göre yalpalıyor (bkz. waveField.ts → shipMotion). Baştan
 * gelen dalgada baş vurur, kemereden gelende yalpalar, doğal periyoduna denk
 * gelen karşılaşma periyodunda yalpa büyür. Aynı dalga treni yüzeyi kabartan
 * tren olduğu için pencereden görülen tepe ile geminin tepkisi birbirini tutar.
 *
 * Çevrimdışı sözleşmesi korunuyor: fon dokusu tuvale çiziliyor, su normali
 * gemi simülasyonunun üretecinden geliyor; ne HDR ne de ağ isteği var.
 */

/**
 * Fon silindirinin merkez yüksekliği elle yazılmaz.
 *
 * Dokuda ufuk üstten PANORAMA_HORIZON_V oranında; dünyada da göz hizasına
 * gelmeli. Silindirin üst kenarı yc + h/2 olduğuna göre ufuk çizgisi
 * yc + h·(0.5 − v_ufuk) yüksekliğine düşer; bunu EYE_Y'ye eşitliyoruz.
 */
const BACKDROP_CENTER_Y = EYE_Y - (0.5 - PANORAMA_HORIZON_V) * HORIZON_SCENE.backdropHeight;

export interface SeaHorizonProps {
  /** Dalga alanı, gemi hareketi ve kayma — hepsi BridgeSimulation'dan. */
  sim: BridgeSim;
  /** Gerçek rota (°) — fonun kıyısı pusulaya göre yerleşsin diye. */
  headingDeg: number;
  /** Rüzgâr hızı (kt) — beyaz köpüğün örtüsü. */
  windKt: number;
  /** Fonun ışık tonu: gündüz beyaz (dokuya dokunmaz), gece koyu. */
  tint?: THREE.ColorRepresentation;
  /** Denizin kendi rengi — gece kararır, kapalı havada griye kaçar. */
  seaColor?: THREE.ColorRepresentation;
}

export function SeaHorizon({
  sim,
  headingDeg,
  windKt,
  tint = "#ffffff",
  seaColor = "#1e5274",
}: SeaHorizonProps) {
  const group = useRef<THREE.Group>(null);
  const backdrop = useRef<THREE.Mesh>(null);

  const panorama = useMemo(() => getSeaPanoramaTexture(), []);

  const backdropGeometry = useMemo(
    () =>
      new THREE.CylinderGeometry(
        HORIZON_SCENE.backdropRadius,
        HORIZON_SCENE.backdropRadius,
        HORIZON_SCENE.backdropHeight,
        128,
        1,
        true,
      ),
    [],
  );

  useEffect(() => () => backdropGeometry.dispose(), [backdropGeometry]);

  useFrame(() => {
    const m = sim.motion;
    if (group.current) {
      // Gemi sancağa yatıyorsa dünya iskeleye yatmış görünür: işaretler ters.
      group.current.rotation.z = -m.roll;
      group.current.rotation.x = -m.pitch;
      group.current.rotation.y = -m.yaw;
      group.current.position.y = EXTERIOR.waterlineY - m.heave;
    }
    if (backdrop.current) {
      // Kıyı pusulaya bağlı: gemi sancağa dönerse fon iskeleye kayar.
      backdrop.current.rotation.y = (headingDeg * Math.PI) / 180;
    }
  });

  const whitecap = whitecapCoverage(windKt);
  // Kabaran deniz ışığı dağıtır; ayna gibi bir denizde parlama keskin kalır.
  const roughness = 0.14 + 0.16 * Math.min(1, windKt / 30);

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
        <mesh ref={backdrop} position={[0, BACKDROP_CENTER_Y, 0]} geometry={backdropGeometry} renderOrder={-1}>
          <meshBasicMaterial
            map={panorama}
            color={tint}
            side={THREE.BackSide}
            toneMapped={false}
            fog={false}
            depthWrite={false}
          />
        </mesh>

        {/* Deniz: su hattında, gerçek dalgalarla. Dış kenarı 700 m'de, ufkun
            0.74° altında kalıyor — sis onu fonun boyalı denizine bağlamasa
            orada bir disk kenarı görünürdü. */}
        <group position={[0, EXTERIOR.waterlineY, 0]}>
          <OceanSurface sim={sim} color={seaColor} whitecap={whitecap} roughness={roughness} />
        </group>
      </group>
    </group>
  );
}

export default SeaHorizon;
