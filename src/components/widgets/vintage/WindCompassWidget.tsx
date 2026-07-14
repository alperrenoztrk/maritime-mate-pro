interface WindCompassWidgetProps {
  speedKt?: number;
  directionDeg?: number;
  directionLabel: string;
}

/** Pirinç bezelli rüzgâr pusulası — kırmızı yarı, rüzgârın geldiği yönü gösterir. */
export function WindCompassWidget({ speedKt, directionDeg, directionLabel }: WindCompassWidgetProps) {
  const hasDirection = directionDeg !== undefined && !Number.isNaN(directionDeg);
  const hasSpeed = speedKt !== undefined && !Number.isNaN(speedKt);

  return (
    <div className="vw-device vw-small">
      <div className="vw-plate">Rüzgâr</div>
      <div className="vw-dial vw-crosshair">
        <span className="vw-nu vw-nu--t notranslate" translate="no">K</span>
        <span className="vw-nu vw-nu--r notranslate" translate="no">D</span>
        <span className="vw-nu vw-nu--b notranslate" translate="no">G</span>
        <span className="vw-nu vw-nu--l notranslate" translate="no">B</span>
        {hasDirection ? (
          <div
            className="vw-needle"
            style={{ transform: `translateX(-50%) rotate(${directionDeg}deg)` }}
          />
        ) : null}
        <div className="vw-cap" />
      </div>
      <div className="vw-digital notranslate" translate="no">
        {hasSpeed ? `${Math.round(speedKt)} kt` : "—"}
      </div>
      <div className="vw-sub notranslate" translate="no">{hasDirection ? directionLabel : "—"}</div>
    </div>
  );
}
