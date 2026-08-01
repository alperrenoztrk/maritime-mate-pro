import { InstrumentFrame } from "./InstrumentFrame";
import { CompassFace } from "./CompassFace";
import { COMPASS, COMPASS_DIAL } from "./instrumentPhotos";
import { dialStyle } from "./overlayGeometry";

interface WindCompassWidgetProps {
  speedKt?: number;
  directionDeg?: number;
  directionLabel: string;
}

/**
 * Gerçek bir Askania pusulasının fotoğrafı; kartı canlı olarak yeniden çizilir
 * (bkz. CompassFace) ve üstündeki fırıldak rüzgârın geldiği yönü gösterir.
 * Fotoğrafın siyah bezeli ile kubbe camı olduğu gibi kalır.
 */
export function WindCompassWidget({ speedKt, directionDeg, directionLabel }: WindCompassWidgetProps) {
  const hasDirection = directionDeg !== undefined && !Number.isNaN(directionDeg);
  const hasSpeed = speedKt !== undefined && !Number.isNaN(speedKt);

  return (
    <InstrumentFrame
      photo={COMPASS}
      size="small"
      label="Rüzgâr"
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
      <div className="iw-dial" style={dialStyle(COMPASS_DIAL, COMPASS.aspect)}>
        <CompassFace directionDeg={directionDeg} />
      </div>
    </InstrumentFrame>
  );
}
