import { InstrumentFrame } from "./InstrumentFrame";
import { COMPASS, COMPASS_DIAL } from "./instrumentPhotos";
import { dialStyle } from "./overlayGeometry";

interface WindCompassWidgetProps {
  speedKt?: number;
  directionDeg?: number;
  directionLabel: string;
}

/**
 * Gerçek bir pusula fotoğrafı; rüzgârın geldiği yön kartın üstündeki canlı
 * ibreyle gösterilir (kırmızı yarı rüzgârı işaret eder).
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
          <span className="iw-sub notranslate" translate="no">{hasDirection ? directionLabel : "—"}</span>
        </>
      }
    >
      <div className="iw-face iw-face--card" style={dialStyle(COMPASS_DIAL, COMPASS.aspect)}>
        <span className="iw-nu iw-nu--t notranslate" translate="no">K</span>
        <span className="iw-nu iw-nu--r notranslate" translate="no">D</span>
        <span className="iw-nu iw-nu--b notranslate" translate="no">G</span>
        <span className="iw-nu iw-nu--l notranslate" translate="no">B</span>
        {hasDirection ? (
          <div className="iw-needle" style={{ transform: `translateX(-50%) rotate(${directionDeg}deg)` }} />
        ) : null}
        <div className="iw-cap" />
      </div>
    </InstrumentFrame>
  );
}
