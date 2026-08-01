import {
  Sun,
  CloudSun,
  Cloudy,
  Cloud,
  CloudFog,
  CloudDrizzle,
  CloudRain,
  CloudSnow,
  Snowflake,
  CloudLightning,
  CloudHail,
  Thermometer,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface WeatherGlyph {
  Icon: LucideIcon;
  colorClass: string;
}

/** Maps a WMO weather code to a lucide icon + tone that reads on light and dark surfaces. */
function wmoToGlyph(code?: number): WeatherGlyph {
  if (code === undefined || code === null || Number.isNaN(code)) {
    return { Icon: Thermometer, colorClass: "text-slate-400" };
  }
  switch (code) {
    case 0:
      return { Icon: Sun, colorClass: "text-amber-400" };
    case 1:
      return { Icon: CloudSun, colorClass: "text-amber-400" };
    case 2:
      return { Icon: Cloudy, colorClass: "text-slate-400" };
    case 3:
      return { Icon: Cloud, colorClass: "text-slate-400" };
    case 45:
    case 48:
      return { Icon: CloudFog, colorClass: "text-slate-400" };
    case 51:
    case 53:
    case 55:
      return { Icon: CloudDrizzle, colorClass: "text-sky-500" };
    case 56:
    case 57:
      return { Icon: CloudSnow, colorClass: "text-sky-300" };
    case 61:
    case 63:
    case 65:
      return { Icon: CloudRain, colorClass: "text-blue-500" };
    case 66:
    case 67:
      return { Icon: CloudSnow, colorClass: "text-sky-300" };
    case 71:
    case 73:
    case 75:
      return { Icon: Snowflake, colorClass: "text-sky-300" };
    case 77:
      return { Icon: CloudSnow, colorClass: "text-sky-300" };
    case 80:
    case 81:
    case 82:
      return { Icon: CloudRain, colorClass: "text-blue-500" };
    case 85:
    case 86:
      return { Icon: Snowflake, colorClass: "text-sky-300" };
    case 95:
      return { Icon: CloudLightning, colorClass: "text-purple-400" };
    case 96:
    case 99:
      return { Icon: CloudHail, colorClass: "text-purple-400" };
    default:
      return { Icon: Cloud, colorClass: "text-slate-400" };
  }
}

/** Range-based variant for callers that bucket WMO codes instead of matching them exactly. */
function wmoRangeToGlyph(code?: number): WeatherGlyph {
  if (code === undefined || code === null || Number.isNaN(code)) {
    return { Icon: Thermometer, colorClass: "text-slate-400" };
  }
  if (code === 0) return { Icon: Sun, colorClass: "text-amber-400" };
  if (code <= 2) return { Icon: CloudSun, colorClass: "text-amber-400" };
  if (code === 3) return { Icon: Cloud, colorClass: "text-slate-400" };
  if (code <= 48) return { Icon: CloudFog, colorClass: "text-slate-400" };
  if (code <= 57) return { Icon: CloudDrizzle, colorClass: "text-sky-500" };
  if (code <= 67) return { Icon: CloudRain, colorClass: "text-blue-500" };
  if (code <= 77) return { Icon: Snowflake, colorClass: "text-sky-300" };
  if (code <= 82) return { Icon: CloudRain, colorClass: "text-blue-500" };
  if (code <= 86) return { Icon: Snowflake, colorClass: "text-sky-300" };
  if (code >= 95) return { Icon: CloudLightning, colorClass: "text-purple-400" };
  return { Icon: Cloud, colorClass: "text-slate-400" };
}

interface WeatherIconProps {
  code?: number;
  className?: string;
  /** Use range-based bucketing (for callers that don't use exact WMO codes). */
  ranged?: boolean;
}

export function WeatherIcon({ code, className, ranged = false }: WeatherIconProps) {
  const { Icon, colorClass } = ranged ? wmoRangeToGlyph(code) : wmoToGlyph(code);
  return <Icon className={cn("shrink-0", colorClass, className)} aria-hidden="true" />;
}
