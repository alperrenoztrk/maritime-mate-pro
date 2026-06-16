import { useEffect, useMemo, useState } from "react";
import { useCurrentWeather } from "@/hooks/useCurrentWeather";
import { useHomeWidgets, type HomeWidgetId, AVAILABLE_WIDGETS } from "@/hooks/useHomeWidgets";
import { Clock, Globe2, Cloud, Wind, MapPin, Sun, Pencil } from "lucide-react";
import { ManualLocationDialog } from "@/components/widgets/ManualLocationDialog";

function degreesToCompass(degrees: number): string {
  const dirs = ["K", "KKD", "KD", "DKD", "D", "DGD", "GD", "GGD", "G", "GGB", "GB", "BGB", "B", "BKB", "KB", "KKB"];
  return dirs[Math.round(degrees / 22.5) % 16];
}

function decimalToDMS(dec: number, isLat: boolean): string {
  const abs = Math.abs(dec);
  const d = Math.floor(abs);
  const mFloat = (abs - d) * 60;
  const m = Math.floor(mFloat);
  const s = ((mFloat - m) * 60).toFixed(0);
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
  const { enabled } = useHomeWidgets();
  const { data, locationLabel, accuracyMeters, locationSource, positionTimestamp } = useCurrentWeather({ watchPosition: false, refreshMs: 300000, reverseGeocode: true });
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

  if (enabled.length === 0) return null;

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
        const sourceLabel =
          locationSource === "gps" ? "GPS" :
          locationSource === "ip" ? "IP" :
          locationSource === "manual" ? "Manuel" : "—";
        const accuracyLabel =
          accuracyMeters == null ? "—" :
          accuracyMeters < 1000 ? `±${Math.round(accuracyMeters)} m` :
          `±${(accuracyMeters / 1000).toFixed(1)} km`;
        const fixedAt = positionTimestamp
          ? new Date(positionTimestamp).toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false })
          : "—";
        const sourceColor =
          locationSource === "gps" ? "text-emerald-300" :
          locationSource === "ip" ? "text-amber-300" : "text-white/70";
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
            <div className="mt-1 truncate text-sm font-medium">{locationLabel ?? "—"}</div>
            <div className="mt-1.5 grid grid-cols-2 gap-2 text-[10px] text-white/70">
              <div>
                <div className="text-white/45">Enlem</div>
                <div className="font-medium text-white/85">
                  {data?.latitude !== undefined ? decimalToDMS(data.latitude, true) : "—"}
                </div>
                <div className="font-mono text-[9px] text-white/50 tabular-nums">
                  {data?.latitude !== undefined ? data.latitude.toFixed(6) + "°" : ""}
                </div>
              </div>
              <div>
                <div className="text-white/45">Boylam</div>
                <div className="font-medium text-white/85">
                  {data?.longitude !== undefined ? decimalToDMS(data.longitude, false) : "—"}
                </div>
                <div className="font-mono text-[9px] text-white/50 tabular-nums">
                  {data?.longitude !== undefined ? data.longitude.toFixed(6) + "°" : ""}
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
    <div className="grid grid-cols-2 gap-3 px-4 sm:grid-cols-4">
      {enabled.map(render)}
    </div>
  );
}
