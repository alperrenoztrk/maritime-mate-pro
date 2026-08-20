import { InstrumentFrame } from "./InstrumentFrame";
import { PortholeSky } from "./PortholeSky";
import { skyLook } from "./skyLook";
import { PORTHOLE, PORTHOLE_GLASS } from "./instrumentPhotos";
import { ellipseStyle } from "./overlayGeometry";

interface SunArcWidgetProps {
  sunrise: string;
  sunset: string;
  /**
   * Gün ilerlemesi: 0 doğuş, 1 batış. Aralık DIŞINA çıkabilir — gece olduğunda
   * negatif ya da 1'den büyük gelir ki lombardan karanlık görünsün. Veri yoksa
   * null.
   */
  progress: number | null;
  /** Gerçek bulutluluk yüzdesi (0-100); yoksa undefined. */
  cloudCoverPct?: number;
}

/**
 * Gerçek bir lombar fotoğrafı; güneşin günün neresinde olduğu camın ardındaki
 * ışığı değiştirir (bkz. PortholeSky). Işık camın dışına, madeni çerçeveye de
 * vurur — bu yüzden hâlenin bir kopyası cam maskesinin dışında ayrı katman.
 */
export function SunArcWidget({ sunrise, sunset, progress, cloudCoverPct }: SunArcWidgetProps) {
  const look = skyLook(progress, cloudCoverPct);

  const spill =
    look?.sun != null
      ? {
          left: `${(PORTHOLE_GLASS.cx + ((look.sun.x - 50) / 50) * PORTHOLE_GLASS.rx) * 100}%`,
          top: `${(PORTHOLE_GLASS.cy + ((look.sun.y - 50) / 50) * PORTHOLE_GLASS.ry) * 100}%`,
          opacity: Math.max(0.16, 0.5 - look.elevation * 0.34) * (look.cloud !== null ? 1 - look.cloud * 0.8 : 1),
          background: `radial-gradient(circle, ${look.glowColor} 0%, transparent 64%)`,
        }
      : null;

  return (
    <InstrumentFrame
      photo={PORTHOLE}
      size="medium"
      readout={
        <div className="iw-split">
          <span className="iw-readout-cell">
            <span className="iw-sub">Sunrise</span>
            <span className="iw-digital notranslate" translate="no">{sunrise}</span>
          </span>
          <span className="iw-readout-cell">
            <span className="iw-sub">Sunset</span>
            <span className="iw-digital notranslate" translate="no">{sunset}</span>
          </span>
        </div>
      }
    >
      <div className="iw-glass" style={ellipseStyle(PORTHOLE_GLASS)}>
        <PortholeSky look={look} />
      </div>
      {spill ? <div className="iw-spill" style={spill} /> : null}
    </InstrumentFrame>
  );
}
