import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { Capacitor } from "@capacitor/core";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  SystemSymbols,
  type SystemSymbolWeight,
} from "@/plugins/systemSymbols";

const renderedSymbols = new Map<string, string>();
const pendingSymbols = new Map<string, Promise<string>>();
const unavailableSymbols = new Set<string>();

const isNativeIos = () =>
  Capacitor.isNativePlatform() && Capacitor.getPlatform() === "ios";

const loadSymbol = (
  name: string,
  pointSize: number,
  weight: SystemSymbolWeight,
): Promise<string> => {
  const cacheKey = `${name}:${pointSize}:${weight}`;
  const cached = renderedSymbols.get(cacheKey);
  if (cached) return Promise.resolve(cached);
  if (unavailableSymbols.has(cacheKey)) return Promise.reject(new Error("symbol unavailable"));

  const pending = pendingSymbols.get(cacheKey);
  if (pending) return pending;

  const request = SystemSymbols.render({ name, pointSize, weight })
    .then(({ dataUrl }) => {
      renderedSymbols.set(cacheKey, dataUrl);
      pendingSymbols.delete(cacheKey);
      return dataUrl;
    })
    .catch((error) => {
      pendingSymbols.delete(cacheKey);
      unavailableSymbols.add(cacheKey);
      throw error;
    });
  pendingSymbols.set(cacheKey, request);
  return request;
};

export function AppSymbol({
  name,
  selectedName,
  selected = false,
  fallback: Fallback,
  className,
  pointSize = 22,
  style,
}: {
  name: string;
  selectedName?: string;
  selected?: boolean;
  fallback: LucideIcon;
  className?: string;
  pointSize?: number;
  style?: CSSProperties;
}) {
  const resolvedName = selected && selectedName ? selectedName : name;
  const weight: SystemSymbolWeight = selected ? "semibold" : "regular";
  const cacheKey = `${resolvedName}:${pointSize}:${weight}`;
  const [dataUrl, setDataUrl] = useState<string | null>(() => renderedSymbols.get(cacheKey) ?? null);

  useEffect(() => {
    let cancelled = false;
    const cached = renderedSymbols.get(cacheKey);
    setDataUrl(cached ?? null);
    if (!isNativeIos() || cached || unavailableSymbols.has(cacheKey)) return;

    void loadSymbol(resolvedName, pointSize, weight)
      .then((value) => {
        if (!cancelled) setDataUrl(value);
      })
      .catch(() => {
        // Older iOS releases do not contain every newer symbol. Lucide remains
        // the stable web/Android/old-iOS fallback without breaking navigation.
      });
    return () => {
      cancelled = true;
    };
  }, [cacheKey, pointSize, resolvedName, weight]);

  const maskStyle = useMemo<CSSProperties | undefined>(() => {
    if (!dataUrl) return undefined;
    return {
      backgroundColor: "currentColor",
      maskImage: `url("${dataUrl}")`,
      maskPosition: "center",
      maskRepeat: "no-repeat",
      maskSize: "contain",
      WebkitMaskImage: `url("${dataUrl}")`,
      WebkitMaskPosition: "center",
      WebkitMaskRepeat: "no-repeat",
      WebkitMaskSize: "contain",
    };
  }, [dataUrl]);

  if (!dataUrl) {
    return <Fallback aria-hidden className={cn("app-symbol-fallback", className)} style={style} />;
  }

  return (
    <span
      aria-hidden
      className={cn("app-system-symbol inline-block shrink-0", className)}
      style={{ ...style, ...maskStyle }}
    />
  );
}

export default AppSymbol;
