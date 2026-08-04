import { useEffect, useMemo } from "react";
import * as THREE from "three";
import {
  getHatchCoverTexture,
  getTopsideTexture,
  getWeatherDeckTexture,
} from "./bridgeTextures";
import { EXTERIOR } from "./bridgeLayout";
import { deckHeightAt, disposeShipExteriorGeometry, getShipExteriorGeometry } from "./shipExterior";

/**
 * Camın dışındaki gemi: baş güverte, ambarlar, baş kasara ve direk.
 *
 * Geometri shipExterior.ts'te dört malzeme grubunda birleştirilmiş hâlde
 * geliyor; burada yalnız giydiriliyor. Dört çizim çağrısı + silyon feneri:
 * kapalı bir odaya açık deniz eklemenin bedeli bu kadarla kalsın diye.
 *
 * Hiçbir parça gölge vermiyor ve almıyor. Sahnedeki tek gölge kaynağının
 * kamerası ±4.5 m'lik odayı kaplıyor (bkz. BridgeScene3D); 60 m'lik gemiyi de
 * içine alacak şekilde büyütülseydi 1024²'lik gölge haritası odanın içinde
 * çözünürlüğünü kaybederdi. Dışarısı gündüz ışığında zaten düz aydınlık.
 */

/** Silyon feneri: gece yanan tek dış ışık. */
const MASTHEAD_COLOR = "#fff4d6";

export interface ShipExteriorProps {
  /**
   * Gecenin koyuluğu (0 gündüz, 1 tam karanlık) — skyLook().night.
   * Gemi kararır, silyon feneri yanar.
   */
  night?: number;
}

export function ShipExterior({ night = 0 }: ShipExteriorProps) {
  const geo = useMemo(() => getShipExteriorGeometry(), []);
  const deckTex = useMemo(() => getWeatherDeckTexture(), []);
  const coverTex = useMemo(() => getHatchCoverTexture(), []);
  const topsideTex = useMemo(() => getTopsideTexture(), []);

  // Sahne kapanınca loft edilmiş geometriyi bırak — dokular
  // disposeBridgeTextures() ile birlikte gidiyor.
  useEffect(() => () => disposeShipExteriorGeometry(), []);

  /**
   * Gece kararması dokuların üstüne renk çarpanı olarak biniyor: ayrı bir gece
   * doku takımı üretmek yerine aynı tuvaller kısılıyor. Gemi hiçbir zaman
   * tamamen kararmaz — güverte aydınlatması ve ay ışığı 0.22'de tutuluyor.
   */
  const dim = useMemo(() => {
    const k = 1 - 0.78 * THREE.MathUtils.clamp(night, 0, 1);
    return new THREE.Color(k, k, k * (1 + 0.12 * night));
  }, [night]);

  const mastY = deckHeightAt(EXTERIOR.mastZ) + EXTERIOR.mastHeight + 0.24;

  return (
    <group>
      <mesh geometry={geo.deck}>
        <meshStandardMaterial
          map={deckTex.map}
          bumpMap={deckTex.bumpMap}
          bumpScale={0.35}
          color={dim}
          roughness={0.9}
          metalness={0.04}
          side={THREE.DoubleSide}
        />
      </mesh>

      <mesh geometry={geo.covers}>
        <meshStandardMaterial
          map={coverTex.map}
          bumpMap={coverTex.bumpMap}
          bumpScale={0.5}
          color={dim}
          roughness={0.82}
          metalness={0.12}
        />
      </mesh>

      {/* Küpeşte, mezarna, kasara perdesi ve borda — hepsi aynı açık gri gemi
          boyası. DoubleSide: yalpada kenar bir kare ters dönse bile arkadaki
          deniz sızmasın. */}
      <mesh geometry={geo.painted}>
        <meshStandardMaterial
          map={topsideTex.map}
          bumpMap={topsideTex.bumpMap}
          bumpScale={0.4}
          color={dim}
          roughness={0.74}
          metalness={0.06}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Irgat, zincir, direk, korkuluk: boyasız/koyu çelik. */}
      <mesh geometry={geo.steel}>
        <meshStandardMaterial color={dim.clone().multiplyScalar(0.34)} roughness={0.55} metalness={0.65} />
      </mesh>

      {/* Silyon feneri — gündüz sönük bir cam, gece yanan bir nokta. */}
      <mesh position={[0, mastY, EXTERIOR.mastZ - 0.24]}>
        <sphereGeometry args={[0.16, 10, 8]} />
        <meshBasicMaterial color={MASTHEAD_COLOR} toneMapped={false} transparent opacity={0.25 + 0.75 * night} />
      </mesh>
    </group>
  );
}

export default ShipExterior;
