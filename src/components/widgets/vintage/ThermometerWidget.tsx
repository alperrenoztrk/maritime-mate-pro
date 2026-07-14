interface ThermometerWidgetProps {
  temperatureC?: number;
  conditionText: string;
}

/** Ahşap panolu cam tüp termometre — cıva yüksekliği −20…40°C aralığına oranlanır. */
export function ThermometerWidget({ temperatureC, conditionText }: ThermometerWidgetProps) {
  const hasValue = temperatureC !== undefined && !Number.isNaN(temperatureC);
  const pct = hasValue
    ? Math.min(1, Math.max(0.03, (temperatureC + 20) / 60)) * 100
    : 3;

  return (
    <div className="vw-device vw-small">
      <div className="vw-plate">Hava Durumu</div>
      <div className="vw-thermo-board">
        <div className="vw-thermo-scale notranslate" translate="no" aria-hidden="true">
          <span>40</span>
          <span>20</span>
          <span>0</span>
          <span>-20</span>
        </div>
        <div className="vw-thermo-ticks" aria-hidden="true" />
        <div className="vw-tube">
          <div className="vw-mercury" style={{ height: `${pct}%` }} />
          <div className="vw-bulb" />
        </div>
        <div className="vw-thermo-read">
          <span className="vw-digital notranslate" translate="no">
            {hasValue ? `${Math.round(temperatureC)}°` : "—"}
          </span>
          <span className="vw-engraved notranslate" translate="no" style={{ fontSize: 8 }}>C</span>
        </div>
      </div>
      <div className="vw-sub">{conditionText}</div>
    </div>
  );
}
