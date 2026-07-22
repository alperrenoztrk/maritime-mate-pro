interface ChronometerWidgetProps {
  label: string;
  /** Kadran saati (0-23) — ibre açıları buradan hesaplanır. */
  hours: number;
  minutes: number;
  seconds: number;
  /** Kadran altındaki kazınmış dijital okuma (HH:MM). */
  digital: string;
  subLabel?: string;
  variant: "local" | "gmt";
}

/** Pirinç çerçeveli gemi kronometresi — analog ibreler + kazınmış dijital okuma. */
export function ChronometerWidget({ label, hours, minutes, seconds, digital, subLabel, variant }: ChronometerWidgetProps) {
  const hourDeg = (hours % 12) * 30 + minutes * 0.5;
  const minuteDeg = minutes * 6 + seconds * 0.1;
  const secondDeg = seconds * 6;

  return (
    <div className="vw-device vw-small">
      <div className="vw-plate">
        {variant === "gmt" ? (
          <span className="notranslate" translate="no">{label}</span>
        ) : (
          label
        )}
      </div>
      <div className={"vw-dial" + (variant === "gmt" ? " vw-dial--gmt" : "")}>
        <span className="vw-nu vw-nu--t notranslate" translate="no">XII</span>
        <span className="vw-nu vw-nu--r notranslate" translate="no">III</span>
        <span className="vw-nu vw-nu--b notranslate" translate="no">VI</span>
        <span className="vw-nu vw-nu--l notranslate" translate="no">IX</span>
        <div className="vw-hand vw-hand--hour" style={{ transform: `translateX(-50%) rotate(${hourDeg}deg)` }} />
        <div className="vw-hand vw-hand--min" style={{ transform: `translateX(-50%) rotate(${minuteDeg}deg)` }} />
        <div className="vw-hand vw-hand--sec" style={{ transform: `translateX(-50%) rotate(${secondDeg}deg)` }} />
        <div className="vw-cap" />
      </div>
      <div className="vw-digital notranslate" translate="no">{digital}</div>
      {subLabel ? <div className="vw-sub notranslate" translate="no">{subLabel}</div> : null}
    </div>
  );
}
