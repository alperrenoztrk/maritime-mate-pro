import { InstrumentFrame } from "./InstrumentFrame";
import { THERMOMETER, THERMOMETER_COLUMN } from "./instrumentPhotos";
import { mercuryStyle, tubeStyle } from "./overlayGeometry";

interface ThermometerWidgetProps {
  temperatureC?: number;
  conditionText: string;
}

/**
 * Gerçek bir cıvalı termometre fotoğrafı; canlı cıva sütunu fotoğrafın kendi
 * kılcalının üstüne çizilir.
 *
 * Sütun yüksekliği, fotoğrafta BASILI olan ±40 °C skalasına göre hesaplanır
 * (bkz. THERMOMETER_COLUMN) — böylece cıvanın ucu gerçekten rakamı gösterir.
 */
export function ThermometerWidget({ temperatureC, conditionText }: ThermometerWidgetProps) {
  const hasValue = temperatureC !== undefined && !Number.isNaN(temperatureC);

  return (
    <InstrumentFrame
      photo={THERMOMETER}
      size="small"
      readout={
        <>
          <span className="iw-digital notranslate" translate="no">
            {hasValue ? `${Math.round(temperatureC)}°C` : "—"}
          </span>
          <span className="iw-sub">{conditionText}</span>
        </>
      }
    >
      <div className="iw-tube" style={tubeStyle(THERMOMETER_COLUMN)}>
        {hasValue ? (
          <div className="iw-mercury" style={mercuryStyle(THERMOMETER_COLUMN, temperatureC)} />
        ) : null}
      </div>
    </InstrumentFrame>
  );
}
