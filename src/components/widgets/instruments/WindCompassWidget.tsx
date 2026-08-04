import { InstrumentFrame } from "./InstrumentFrame";
import { WindDialFace } from "./WindDialFace";
import { WIND_GAUGE, WIND_GAUGE_DIAL } from "./instrumentPhotos";
import { dialStyle } from "./overlayGeometry";

interface WindCompassWidgetProps {
  speedKt?: number;
  directionDeg?: number;
  directionLabel: string;
}

/**
 * Köprüüstündeki Koshin rüzgâr panelinin fotoğrafı; göstergenin yüzü canlı
 * olarak yeniden çizilir (bkz. WindDialFace) ve ibresi rüzgârın geldiği yönü
 * gösterir. Fotoğrafın siyah bezeli, vidaları ve panel sacı olduğu gibi kalır.
 */
export function WindCompassWidget({ speedKt, directionDeg, directionLabel }: WindCompassWidgetProps) {
  const hasDirection = directionDeg !== undefined && !Number.isNaN(directionDeg);
  const hasSpeed = speedKt !== undefined && !Number.isNaN(speedKt);

  return (
    <InstrumentFrame
      photo={WIND_GAUGE}
      size="small"
      readout={
        <>
          <span className="iw-digital notranslate" translate="no">
            {hasSpeed ? `${Math.round(speedKt)} kt` : "—"}
          </span>
          <span className="iw-sub notranslate" translate="no">
            {hasDirection ? `${directionLabel} · ${Math.round(directionDeg)}°` : "—"}
          </span>
        </>
      }
    >
      <div className="iw-dial" style={dialStyle(WIND_GAUGE_DIAL, WIND_GAUGE.aspect)}>
        <WindDialFace directionDeg={directionDeg} />
      </div>
    </InstrumentFrame>
  );
}
