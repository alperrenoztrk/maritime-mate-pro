import { SHIP, type ShipMotion, type WaveTrain } from "./waveField";
import type { BridgeTelemetry } from "./bridgeTelemetry";

/**
 * Sahnenin her karede değişen ortak durumu.
 *
 * Köprüüstünde saniyede altmış kez değişen üç şey var: dalga alanının gemiye
 * göre kayması, geminin o dalgalarda yaptığı hareket ve cihazların okuduğu
 * telemetri. Üçü de React durumu DEĞİL — her biri için setState çağrılsaydı
 * ağaç saniyede altmış kez yeniden çizilir, `<Html>` içindeki gerçek
 * widget'lar da onunla birlikte gidip gelirdi. Değişken bir nesne tutup
 * okuyanların her karede taze okuması, R3F'te bunun olağan çözümü.
 *
 * Yazan tek yer BridgeSimulation; okuyanlar SeaHorizon, OceanSurface ve
 * bütün LiveScreen'ler.
 */
export interface BridgeSim {
  /** Dalga deseninin gemiye göre kayması (m) — yerinde değiştirilir. */
  offset: { x: number; z: number };
  /** Yumuşatılmış gemi hareketi. */
  motion: ShipMotion;
  /** Yüzeyi kabartan ve gemiyi sallayan dalga treni. */
  trains: WaveTrain[];
  /** Cihaz ekranlarının okuduğu anlık gerçeklik. */
  telemetry: BridgeTelemetry | null;
}

export function createSim(): BridgeSim {
  return {
    offset: { x: 0, z: 0 },
    motion: {
      roll: 0,
      pitch: 0,
      heave: 0,
      yaw: 0,
      rollAmplitudeDeg: 0,
      pitchAmplitudeDeg: 0,
      encounterPeriodS: SHIP.rollPeriodS,
    },
    trains: [],
    telemetry: null,
  };
}

