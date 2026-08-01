import { InstrumentFrame } from "./InstrumentFrame";
import { ChronometerFace } from "./ChronometerFace";
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
 * Gerçek bir A. Lange & Söhne gemi kronometresinin fotoğrafı; kadran canlı
 * olarak yeniden çizilir (bkz. ChronometerFace), fotoğrafın pirinç bezeli,
 * kubbe camı ve ahşap kutusu olduğu gibi kalır.
 *
 * Kadranın yeniden çizilmesi şart: fotoğraftaki ibreler donmuş. Yeni yüzey
 * fotoğraftakinin ölçülmüş düzenini taşıdığı için ek bir katman gibi değil,
 * fotoğrafın devamı gibi durur.
 */
export function ChronometerWidget({ label, hours, minutes, seconds, digital, subLabel, variant }: ChronometerWidgetProps) {
  const isGmt = variant === "gmt";

  return (
    <InstrumentFrame
      photo={CHRONOMETER}
      size="small"
      photoFilter={isGmt ? "saturate(.5) brightness(.78)" : undefined}
      label={isGmt ? <span className="notranslate" translate="no">{label}</span> : label}
      readout={
        <>
          <span className="iw-digital notranslate" translate="no">{digital}</span>
          {subLabel ? <span className="iw-sub notranslate" translate="no">{subLabel}</span> : null}
        </>
      }
    >
      <div className="iw-dial" style={dialStyle(CHRONOMETER_DIAL, CHRONOMETER.aspect)}>
        <ChronometerFace
          hours={hours}
          minutes={minutes}
          seconds={seconds}
          variant={variant}
          inscription={isGmt ? ["MARINER'S BOOK", "GREENWICH · UTC"] : ["MARINER'S BOOK", "MARINE CHRONOMETER"]}
        />
      </div>
    </InstrumentFrame>
  );
}
