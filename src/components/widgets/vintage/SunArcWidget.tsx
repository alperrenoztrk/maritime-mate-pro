interface SunArcWidgetProps {
  sunrise: string;
  sunset: string;
  /** Gün içi ilerleme 0–1; veri yoksa null (güneş çizilmez). */
  progress: number | null;
}

/** Pirinç çerçeveli lombar penceresinde güneş yayı — doğuş/batış saatleriyle. */
export function SunArcWidget({ sunrise, sunset, progress }: SunArcWidgetProps) {
  let sun: { cx: number; cy: number } | null = null;
  if (progress !== null && !Number.isNaN(progress)) {
    const angle = Math.PI * (1 - progress);
    sun = { cx: 50 + 42 * Math.cos(angle), cy: 42 - 42 * Math.sin(angle) };
  }

  return (
    <div className="vw-device vw-medium">
      <div className="vw-plate">Güneş</div>
      <div className="vw-porthole">
        <div className="vw-porthole-glass">
          <svg viewBox="0 0 100 46" width="100%" height="100%" preserveAspectRatio="xMidYMax meet" aria-hidden="true">
            <path
              d="M8 42 A 42 42 0 0 1 92 42"
              fill="none"
              stroke="#a97f2c"
              strokeWidth="1.4"
              strokeDasharray="3 3"
            />
            <line x1="2" y1="42" x2="98" y2="42" stroke="#7a5c1a" strokeWidth="1" opacity=".8" />
            {sun ? (
              <circle cx={sun.cx} cy={sun.cy} r="4.5" fill="#daa520" stroke="#7a5c1a" strokeWidth=".8" />
            ) : null}
          </svg>
        </div>
      </div>
      <div className="vw-sun-times">
        <div className="vw-sun-time">
          <span className="vw-sub">Doğuş</span>
          <span className="vw-digital notranslate" translate="no">{sunrise}</span>
        </div>
        <div className="vw-sun-time">
          <span className="vw-sub">Batış</span>
          <span className="vw-digital notranslate" translate="no">{sunset}</span>
        </div>
      </div>
    </div>
  );
}
