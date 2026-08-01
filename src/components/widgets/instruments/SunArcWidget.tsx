import { InstrumentFrame } from "./InstrumentFrame";
import { PORTHOLE, PORTHOLE_GLASS } from "./instrumentPhotos";
import { ellipseStyle } from "./overlayGeometry";

interface SunArcWidgetProps {
  sunrise: string;
  sunset: string;
  /** Gün içi ilerleme 0–1; veri yoksa null (güneş çizilmez). */
  progress: number | null;
}

/**
 * Gerçek bir lombar fotoğrafı; güneşin gün içindeki yayı camın içine çizilir.
 * Yay ve güneş, camın gerçek deniz manzarasının üstünde durur.
 */
export function SunArcWidget({ sunrise, sunset, progress }: SunArcWidgetProps) {
  let sun: { cx: number; cy: number } | null = null;
  if (progress !== null && !Number.isNaN(progress)) {
    const angle = Math.PI * (1 - progress);
    // 52: fotoğraftaki gerçek deniz ufku bu yükseklikte — yay onun üstüne oturur.
    sun = { cx: 50 + 42 * Math.cos(angle), cy: 52 - 42 * Math.sin(angle) };
  }

  return (
    <InstrumentFrame
      photo={PORTHOLE}
      size="medium"
      label="Güneş"
      readout={
        <div className="iw-split">
          <span className="iw-readout-cell">
            <span className="iw-sub">Doğuş</span>
            <span className="iw-digital notranslate" translate="no">{sunrise}</span>
          </span>
          <span className="iw-readout-cell">
            <span className="iw-sub">Batış</span>
            <span className="iw-digital notranslate" translate="no">{sunset}</span>
          </span>
        </div>
      }
    >
      <div className="iw-glass" style={ellipseStyle(PORTHOLE_GLASS)}>
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <path
            d="M8 52 A 42 42 0 0 1 92 52"
            fill="none"
            stroke="#f6e3a0"
            strokeWidth="1.5"
            strokeDasharray="3 3"
            opacity=".8"
          />
          <line x1="8" y1="52" x2="92" y2="52" stroke="#f6e3a0" strokeWidth=".8" opacity=".45" />
          {sun ? (
            <circle cx={sun.cx} cy={sun.cy} r="6" fill="#ffd45e" stroke="#8a6820" strokeWidth=".9" />
          ) : null}
        </svg>
      </div>
    </InstrumentFrame>
  );
}
