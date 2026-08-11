import { useEffect, useState } from "react";
import { safeLocalStorage } from "@/lib/safeStorage";
import {
  FONT_SCALES,
  FontSizeContext,
  type FontSizeContextValue,
  type FontSizeKey,
} from "./font-size-context";
import { Capacitor } from "@capacitor/core";
import { ContentSize } from "@/plugins/contentSize";

/**
 * Font size scaling. The scale is applied to the root <html> element through the
 * `--font-scale` CSS custom property, which the base `html { font-size }` rule in
 * index.css multiplies against. Because everything in the UI is sized in `rem`,
 * adjusting this single value scales typography consistently across every page
 * while preserving the responsive mobile/desktop base sizes.
 */

type FontSizeProviderProps = {
  children: React.ReactNode;
  defaultFontSize?: FontSizeKey;
  storageKey?: string;
};

const layoutSizeForScale = (size: FontSizeKey, scale: number): FontSizeKey => {
  if (size !== "system") return size;
  if (scale >= 1.9) return "max";
  if (scale >= 1.5) return "accessibility";
  if (scale >= 1.28) return "xlarge";
  if (scale >= 1.1) return "large";
  return "system";
};

function applyScale(size: FontSizeKey, systemScale: number) {
  const root = window.document.documentElement;
  const scale = size === "system" ? systemScale : (FONT_SCALES[size] ?? 1);
  root.style.setProperty("--font-scale", String(scale));
  root.setAttribute("data-font-size", layoutSizeForScale(size, scale));
  root.setAttribute("data-font-size-source", size === "system" ? "system" : "manual");
}

export function FontSizeProvider({
  children,
  defaultFontSize = "system",
  storageKey = "maritime-ui-font-size",
  ...props
}: FontSizeProviderProps) {
  const [fontSize, setFontSizeState] = useState<FontSizeKey>(() => {
    const stored = safeLocalStorage.getItem(storageKey) as FontSizeKey | null;
    return stored && stored in FONT_SCALES ? stored : defaultFontSize;
  });
  const [systemScale, setSystemScale] = useState(1);

  useEffect(() => {
    if (Capacitor.getPlatform() !== "ios") return;

    let cancelled = false;
    let listener: { remove: () => Promise<void> } | undefined;
    void ContentSize.getCurrent()
      .then(({ scale }) => {
        if (!cancelled) setSystemScale(Math.min(2, Math.max(0.875, scale || 1)));
      })
      .catch(() => {
        // A browser preview or an older native binary can safely stay at 100%.
      });
    void ContentSize.addListener("contentSizeChanged", ({ scale }) => {
      if (!cancelled) setSystemScale(Math.min(2, Math.max(0.875, scale || 1)));
    }).then((handle) => {
      if (cancelled) void handle.remove();
      else listener = handle;
    }).catch(() => {
      // Plugin is unavailable until the native shell containing it is installed.
    });

    return () => {
      cancelled = true;
      if (listener) void listener.remove();
    };
  }, []);

  useEffect(() => {
    applyScale(fontSize, systemScale);
  }, [fontSize, systemScale]);

  const setFontSize = (size: FontSizeKey) => {
    safeLocalStorage.setItem(storageKey, size);
    setFontSizeState(size);
  };

  const value: FontSizeContextValue = {
    fontSize,
    setFontSize,
  };

  return (
    <FontSizeContext.Provider {...props} value={value}>
      {children}
    </FontSizeContext.Provider>
  );
}
