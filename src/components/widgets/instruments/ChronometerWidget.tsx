import { InstrumentFrame } from "./InstrumentFrame";
import { CHRONOMETER, CHRONOMETER_DIAL } from "./instrumentPhotos";
import { dialStyle } from "./overlayGeometry";

interface ChronometerWidgetProps {
  label: string;
  /** Kadran saati (0-23) — ibre açıları buradan hesaplanır. */
  hours: number;
  minutes: number;
  seconds: number;
  /** Kadran altındaki dijital okuma (HH:MM). */
  digital: string;
  subLabel?: string;
  variant: "local" | "gmt";
}

/**
 * Gerçek bir A. Lange & Söhne gemi kronometresinin fotoğrafı; canlı ibreler
 * fotoğrafın kadranının üstüne çizilir. Kadran yüzeyi yeniden boyanır, yoksa
 * fotoğraftaki donmuş ibreler canlı olanlarla çakışırdı.
 */
export function ChronometerWidget({ label, hours, minutes, seconds, digital, subLabel, variant }: ChronometerWidgetProps) {
  const hourDeg = (hours % 12) * 30 + minutes * 0.5;
  const minuteDeg = minutes * 6 + seconds * 0.1;
  const secondDeg = seconds * 6;
  const isGmt = variant === "gmt";

  return (
    <InstrumentFrame
      photo={CHRONOMETER}
      size="small"
      photoFilter={isGmt ? "saturate(.55) brightness(.82)" : undefined}
      label={isGmt ? <span className="notranslate" translate="no">{label}</span> : label}
      readout={
        <>
          <span className="iw-digital notranslate" translate="no">{digital}</span>
          {subLabel ? <span className="iw-sub notranslate" translate="no">{subLabel}</span> : null}
        </>
      }
    >
      <div
        className={"iw-face" + (isGmt ? " iw-face--gmt" : "")}
        style={dialStyle(CHRONOMETER_DIAL, CHRONOMETER.aspect)}
      >
        <span className="iw-nu iw-nu--t notranslate" translate="no">XII</span>
        <span className="iw-nu iw-nu--r notranslate" translate="no">III</span>
        <span className="iw-nu iw-nu--b notranslate" translate="no">VI</span>
        <span className="iw-nu iw-nu--l notranslate" translate="no">IX</span>
        <div className="iw-hand iw-hand--hour" style={{ transform: `translateX(-50%) rotate(${hourDeg}deg)` }} />
        <div className="iw-hand iw-hand--min" style={{ transform: `translateX(-50%) rotate(${minuteDeg}deg)` }} />
        <div className="iw-hand iw-hand--sec" style={{ transform: `translateX(-50%) rotate(${secondDeg}deg)` }} />
        <div className="iw-cap" />
      </div>
    </InstrumentFrame>
  );
}
