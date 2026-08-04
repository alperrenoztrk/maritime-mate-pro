import { InstrumentFrame } from "./InstrumentFrame";
import { ChronometerFace } from "./ChronometerFace";
import { SEIKO_CLOCK, SEIKO_CLOCK_DIAL } from "./instrumentPhotos";
import { dialStyle } from "./overlayGeometry";

interface ChronometerWidgetProps {
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
 * Gerçek bir Seiko köprüüstü saatinin fotoğrafı; kadran canlı olarak yeniden
 * çizilir (bkz. ChronometerFace), fotoğrafın açık mavi bezeli, camı ve yan
 * kulakları olduğu gibi kalır.
 *
 * Kadranın yeniden çizilmesi şart: fotoğraftaki ibreler donmuş. Yeni yüzey
 * fotoğraftakinin ölçülmüş düzenini taşıdığı için ek bir katman gibi değil,
 * fotoğrafın devamı gibi durur.
 */
export function ChronometerWidget({ hours, minutes, seconds, digital, subLabel, variant }: ChronometerWidgetProps) {
  const isGmt = variant === "gmt";

  return (
    <InstrumentFrame
      photo={SEIKO_CLOCK}
      size="small"
      photoFilter={isGmt ? "saturate(.5) brightness(.78)" : undefined}
      readout={
        <>
          <span className="iw-digital notranslate" translate="no">{digital}</span>
          {subLabel ? <span className="iw-sub notranslate" translate="no">{subLabel}</span> : null}
        </>
      }
    >
      <div className="iw-dial" style={dialStyle(SEIKO_CLOCK_DIAL, SEIKO_CLOCK.aspect)}>
        <ChronometerFace
          hours={hours}
          minutes={minutes}
          seconds={seconds}
          variant={variant}
          inscription={isGmt ? ["MARINER'S BOOK", "GREENWICH · UTC"] : ["MARINER'S BOOK", "MARINE CLOCK"]}
        />
      </div>
    </InstrumentFrame>
  );
}
