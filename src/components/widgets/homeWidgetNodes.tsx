import { useEffect, useMemo, useState, type ReactNode } from "react";
import { useCurrentWeather } from "@/hooks/useCurrentWeather";
import { useLiveGpsPosition } from "@/hooks/useLiveGpsPosition";
import type { HomeWidgetId } from "@/hooks/useHomeWidgets";
import { useLocation } from "@/contexts/useSelectedLocation";
import { ChronometerWidget } from "@/components/widgets/instruments/ChronometerWidget";
import { ThermometerWidget } from "@/components/widgets/instruments/ThermometerWidget";
import { WindCompassWidget } from "@/components/widgets/instruments/WindCompassWidget";
import { GpsReceiverWidget } from "@/components/widgets/instruments/GpsReceiverWidget";
import { SunArcWidget } from "@/components/widgets/instruments/SunArcWidget";

/**
 * Widget'ları besleyen tek kaynak: konum, hava ve saat verisini toplayıp her
 * widget kimliği için hazır bileşeni döndürür.
 */


function degreesToCompass(degrees: number): string {
  const dirs = ["K", "KKD", "KD", "DKD", "D", "DGD", "GD", "GGD", "G", "GGB", "GB", "BGB", "B", "BKB", "KB", "KKB"];
  return dirs[Math.round(degrees / 22.5) % 16];
}

function decimalToDMS(dec: number, isLat: boolean): string {
  // Round the full value before splitting it so 59.999... seconds carries
  // correctly into the next minute/degree. Two decimal places retain the
  // precision of a normal phone GPS fix instead of rounding to ~30 metres.
  let remainingSeconds = Math.round(Math.abs(dec) * 3600 * 100) / 100;
  const d = Math.floor(remainingSeconds / 3600);
  remainingSeconds -= d * 3600;
  const m = Math.floor(remainingSeconds / 60);
  const s = (remainingSeconds - m * 60).toFixed(2);
  const dir = isLat ? (dec >= 0 ? "K" : "G") : (dec >= 0 ? "D" : "B");
  return `${d}° ${m}′ ${s}″ ${dir}`;
}

function wmoText(code?: number): string {
  if (code === undefined) return "—";
  if (code === 0) return "Açık";
  if (code <= 3) return "Az Bulutlu";
  if (code <= 48) return "Bulutlu";
  if (code <= 67) return "Yağmurlu";
  if (code <= 77) return "Karlı";
  if (code <= 82) return "Sağanak";
  if (code <= 86) return "Kar";
  if (code >= 95) return "Fırtına";
  return "—";
}

/** Analog kadran ibreleri için saat dilimine göre saat/dakika/saniye. */
function zonedTimeParts(now: Date, timeZone?: string): { h: number; m: number; s: number } {
  try {
    const parts = new Intl.DateTimeFormat("en-GB", {
      timeZone,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }).formatToParts(now);
    const get = (type: string) => Number(parts.find((p) => p.type === type)?.value ?? NaN);
    const h = get("hour");
    const m = get("minute");
    const s = get("second");
    if ([h, m, s].some(Number.isNaN)) throw new Error("parse");
    return { h, m, s };
  } catch {
    return { h: now.getHours(), m: now.getMinutes(), s: now.getSeconds() };
  }
}

export type HomeWidgetNodes = Partial<Record<HomeWidgetId, ReactNode>>;

export interface HomeWidgetData {
  nodes: HomeWidgetNodes;
}


export function useHomeWidgetNodes(onEditLocation: () => void): HomeWidgetData {
  const { data, locationLabel, accuracyMeters, locationSource, positionTimestamp } = useCurrentWeather({
    watchPosition: false,
    refreshMs: 300000,
    reverseGeocode: true,
  });
  const { selectedLocation } = useLocation();
  // Weather APIs snap requests to a forecast grid. The location card must use
  // the device fix itself; manual selection continues to take precedence.
  const { position: livePosition } = useLiveGpsPosition(1000, !selectedLocation);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const nationalTime = useMemo(() => {
    try {
      return now.toLocaleTimeString("tr-TR", {
        timeZone: data?.timezoneId,
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
    } catch {
      return now.toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit", hour12: false });
    }
  }, [now, data?.timezoneId]);

  const gmtTime = useMemo(
    () => now.toLocaleTimeString("en-GB", { timeZone: "UTC", hour: "2-digit", minute: "2-digit", hour12: false }),
    [now],
  );

  const localParts = zonedTimeParts(now, data?.timezoneId);
  const gmtParts = zonedTimeParts(now, "UTC");

  const latitude = selectedLocation?.latitude ?? livePosition?.latitude ?? data?.latitude;
  const longitude = selectedLocation?.longitude ?? livePosition?.longitude ?? data?.longitude;
  const effectiveLabel = selectedLocation?.locationLabel ?? locationLabel;
  const effectiveSource = selectedLocation ? "manual" : livePosition ? "gps" : locationSource;
  const effectiveAccuracy = selectedLocation ? null : livePosition?.accuracyMeters ?? accuracyMeters;
  const effectiveTimestamp = selectedLocation ? positionTimestamp : livePosition?.timestamp ?? positionTimestamp;
  const sourceKind =
    effectiveSource === "gps" ? "gps" :
    effectiveSource === "ip" ? "ip" :
    effectiveSource === "manual" ? "manual" : "unknown";
  const sourceLabel =
    effectiveSource === "gps" ? "GPS" :
    effectiveSource === "ip" ? "IP" :
    effectiveSource === "manual" ? "Manuel" : "—";
  const accuracyLabel =
    effectiveAccuracy == null ? "—" :
    effectiveAccuracy < 1000 ? `±${Math.round(effectiveAccuracy)} m` :
    `±${(effectiveAccuracy / 1000).toFixed(1)} km`;
  const fixedAt = effectiveTimestamp
    ? new Date(effectiveTimestamp).toLocaleTimeString("tr-TR", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      })
    : "—";

  const sunrise = data?.sunriseIso
    ? new Date(data.sunriseIso).toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit", hour12: false })
    : "—";
  const sunset = data?.sunsetIso
    ? new Date(data.sunsetIso).toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit", hour12: false })
    : "—";
  let sunProgress: number | null = null;
  if (data?.sunriseIso && data?.sunsetIso) {
    const rise = new Date(data.sunriseIso).getTime();
    const set = new Date(data.sunsetIso).getTime();
    if (set > rise) sunProgress = (now.getTime() - rise) / (set - rise);
  }



  const nodes: HomeWidgetNodes = {
    "clock-national": (
      <ChronometerWidget
        hours={localParts.h}
        minutes={localParts.m}
        seconds={localParts.s}
        digital={nationalTime}
        subLabel={locationLabel ?? "—"}
        variant="local"
      />
    ),
    "clock-gmt": (
      <ChronometerWidget
        hours={gmtParts.h}
        minutes={gmtParts.m}
        seconds={gmtParts.s}
        digital={gmtTime}
        subLabel="UTC ±0"
        variant="gmt"
      />
    ),
    weather: <ThermometerWidget temperatureC={data?.temperatureC} conditionText={wmoText(data?.weatherCode)} />,
    wind: (
      <WindCompassWidget
        speedKt={data?.windSpeedKt}
        directionDeg={data?.windDirectionDeg}
        directionLabel={data?.windDirectionDeg !== undefined ? degreesToCompass(data.windDirectionDeg) : "—"}
      />
    ),
    location: (
      <GpsReceiverWidget
        label={effectiveLabel ?? null}
        latDMS={latitude !== undefined ? decimalToDMS(latitude, true) : "—"}
        lonDMS={longitude !== undefined ? decimalToDMS(longitude, false) : "—"}
        latDec={latitude !== undefined ? latitude.toFixed(4) + "°" : ""}
        lonDec={longitude !== undefined ? longitude.toFixed(4) + "°" : ""}
        sourceKind={sourceKind}
        sourceLabel={sourceLabel}
        accuracyLabel={accuracyLabel}
        fixedAt={fixedAt}
        onEdit={onEditLocation}
      />
    ),
    sun: <SunArcWidget sunrise={sunrise} sunset={sunset} progress={sunProgress} />,
  };

  return { nodes };
}
