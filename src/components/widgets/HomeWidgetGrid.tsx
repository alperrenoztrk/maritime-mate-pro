import { useEffect, useMemo, useState } from "react";
import { useCurrentWeather } from "@/hooks/useCurrentWeather";
import { useLiveGpsPosition } from "@/hooks/useLiveGpsPosition";
import { type HomeWidgetId, AVAILABLE_WIDGETS } from "@/hooks/useHomeWidgets";
import { useLocation } from "@/contexts/LocationContext";
import { Clock, Globe2, Cloud, Wind, MapPin, Sun, Pencil } from "lucide-react";
import { ManualLocationDialog } from "@/components/widgets/ManualLocationDialog";

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

interface CardProps {
  size: "small" | "medium";
  children: React.ReactNode;
}

function WidgetCard({ size, children }: CardProps) {
  return (
    <div
      className={
        (size === "medium" ? "col-span-2 " : "col-span-1 ") +
        "rounded-[22px] p-3.5 backdrop-blur-xl border border-white/15 text-white shadow-[0_8px_24px_rgba(0,0,0,0.3)]"
      }
      style={{
        background: "linear-gradient(160deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.04) 100%)",
      }}
    >
      {children}
    </div>
  );
}


export function HomeWidgetGrid() {
  // All widgets are always active and shown, in their defined order.
  const enabled = AVAILABLE_WIDGETS.map((w) => w.id);
  const { data, locationLabel, accuracyMeters, locationSource, positionTimestamp } = useCurrentWeather({ watchPosition: false, refreshMs: 300000, reverseGeocode: true });
  const { selectedLocation } = useLocation();
  // Weather APIs snap requests to a forecast grid. The location card must use
  // the device fix itself; manual selection continues to take precedence.
  const { position: livePosition } = useLiveGpsPosition(1000, !selectedLocation);
  const [now, setNow] = useState(new Date());
  const [manualOpen, setManualOpen] = useState(false);


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

  const render = (id: HomeWidgetId) => {
    const meta = AVAILABLE_WIDGETS.find((w) => w.id === id);
    if (!meta) return null;

    switch (id) {
      case "clock-national":
        return (
          <WidgetCard key={id} size={meta.size}>
            <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-white/60">
              <Clock className="h-3 w-3" /> Yerel
            </div>
            <div className="mt-1 text-2xl font-semibold tabular-nums">{nationalTime}</div>
            <div className="mt-0.5 truncate text-[10px] text-white/55">{locationLabel ?? "—"}</div>
          </WidgetCard>
        );
      case "clock-gmt":
        return (
          <WidgetCard key={id} size={meta.size}>
            <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-white/60">
              <Globe2 className="h-3 w-3" /> GMT
            </div>
            <div className="mt-1 text-2xl font-semibold tabular-nums">{gmtTime}</div>
            <div className="mt-0.5 text-[10px] text-white/55">UTC ±0</div>
          </WidgetCard>
        );
      case "weather":
        return (
          <WidgetCard key={id} size={meta.size}>
            <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-white/60">
              <Cloud className="h-3 w-3" /> Hava
            </div>
            <div className="mt-1 text-2xl font-semibold tabular-nums">
              {data?.temperatureC !== undefined ? `${Math.round(data.temperatureC)}°` : "—"}
            </div>
            <div className="mt-0.5 text-[10px] text-white/55">{wmoText(data?.weatherCode)}</div>
          </WidgetCard>
        );
      case "wind":
        return (
          <WidgetCard key={id} size={meta.size}>
            <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-white/60">
              <Wind className="h-3 w-3" /> Rüzgâr
            </div>
            <div className="mt-1 text-2xl font-semibold tabular-nums">
              {data?.windSpeedKt !== undefined ? `${Math.round(data.windSpeedKt)}` : "—"}
              <span className="ml-1 text-xs font-normal text-white/60">kt</span>
            </div>
            <div className="mt-0.5 text-[10px] text-white/55">
              {data?.windDirectionDeg !== undefined ? degreesToCompass(data.windDirectionDeg) : "—"}
            </div>
          </WidgetCard>
        );
      case "location": {
        const latitude = selectedLocation?.latitude ?? livePosition?.latitude ?? data?.latitude;
        const longitude = selectedLocation?.longitude ?? livePosition?.longitude ?? data?.longitude;
        const effectiveLabel = selectedLocation?.locationLabel ?? locationLabel;
        const effectiveSource = selectedLocation ? "manual" : livePosition ? "gps" : locationSource;
        const effectiveAccuracy = selectedLocation ? null : livePosition?.accuracyMeters ?? accuracyMeters;
        const effectiveTimestamp = selectedLocation
          ? positionTimestamp
          : livePosition?.timestamp ?? positionTimestamp;
        const sourceLabel =
          effectiveSource === "gps" ? "GPS" :
          effectiveSource === "ip" ? "IP" :
          effectiveSource === "manual" ? "Manuel" : "—";
        const accuracyLabel =
          effectiveAccuracy == null ? "—" :
          effectiveAccuracy < 1000 ? `±${Math.round(effectiveAccuracy)} m` :
          `±${(effectiveAccuracy / 1000).toFixed(1)} km`;
        const fixedAt = effectiveTimestamp
          ? new Date(effectiveTimestamp).toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false })
          : "—";
        const sourceColor =
          effectiveSource === "gps" ? "text-emerald-300" :
          effectiveSource === "ip" ? "text-amber-300" : "text-white/70";
        return (
          <WidgetCard key={id} size={meta.size}>
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-white/60">
                <MapPin className="h-3 w-3" /> Konum
              </div>
              <div className="flex items-center gap-1.5">
                <span className={`text-[10px] font-semibold uppercase tracking-wider ${sourceColor}`}>
                  {sourceLabel} · {accuracyLabel}
                </span>
                <button
                  type="button"
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); setManualOpen(true); }}
                  className="flex h-5 w-5 items-center justify-center rounded-full bg-white/10 text-white/80 hover:bg-white/20 active:scale-90 transition"
                  aria-label="Konumu manuel gir"
                >
                  <Pencil className="h-3 w-3" />
                </button>
              </div>
            </div>
            <div className="mt-1 truncate text-sm font-medium">{effectiveLabel ?? "—"}</div>
            <div className="mt-1.5 grid grid-cols-2 gap-2 text-[10px] text-white/70">
              <div>
                <div className="text-white/45">Enlem</div>
                <div className="font-medium text-white/85">
                  {latitude !== undefined ? decimalToDMS(latitude, true) : "—"}
                </div>
                <div className="font-mono text-[9px] text-white/50 tabular-nums">
                  {latitude !== undefined ? latitude.toFixed(6) + "°" : ""}
                </div>
              </div>
              <div>
                <div className="text-white/45">Boylam</div>
                <div className="font-medium text-white/85">
                  {longitude !== undefined ? decimalToDMS(longitude, false) : "—"}
                </div>
                <div className="font-mono text-[9px] text-white/50 tabular-nums">
                  {longitude !== undefined ? longitude.toFixed(6) + "°" : ""}
                </div>
              </div>
            </div>
            <div className="mt-1.5 text-[9px] text-white/40">Son güncelleme: {fixedAt}</div>
          </WidgetCard>
        );
      }
      case "sun": {
        const sunrise = data?.sunriseIso
          ? new Date(data.sunriseIso).toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit", hour12: false })
          : "—";
        const sunset = data?.sunsetIso
          ? new Date(data.sunsetIso).toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit", hour12: false })
          : "—";
        return (
          <WidgetCard key={id} size={meta.size}>
            <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-white/60">
              <Sun className="h-3 w-3" /> Güneş
            </div>
            <div className="mt-1 grid grid-cols-2 gap-2">
              <div>
                <div className="text-[10px] text-white/55">Doğuş</div>
                <div className="text-base font-semibold tabular-nums">{sunrise}</div>
              </div>
              <div>
                <div className="text-[10px] text-white/55">Batış</div>
                <div className="text-base font-semibold tabular-nums">{sunset}</div>
              </div>
            </div>
          </WidgetCard>
        );
      }
      default:
        return null;
    }
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-3 px-4 sm:grid-cols-4">
        {enabled.map(render)}
      </div>
      <ManualLocationDialog open={manualOpen} onOpenChange={setManualOpen} />
    </>
  );
}
