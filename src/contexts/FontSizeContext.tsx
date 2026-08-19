import { useEffect, useState } from "react";
import { Capacitor } from "@capacitor/core";
import { safeLocalStorage } from "@/lib/safeStorage";
import { ContentSize, type ContentSizeChange } from "@/plugins/contentSize";
import {
  FONT_SCALES,
  FontSizeContext,
  normalizeFontSize,
  type FontSizeContextValue,
  type FontSizeKey,
} from "./font-size-context";




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

const normalizeSystemScale = (scale: number) =>
  Number.isFinite(scale) ? Math.min(2, Math.max(0.875, scale)) : 1;

function applyScale(size: FontSizeKey, systemScale = 1) {
  const root = window.document.documentElement;
  const scale = size === "system" ? normalizeSystemScale(systemScale) : FONT_SCALES[size] ?? 1;
  root.style.setProperty("--font-scale", String(scale));
  root.setAttribute("data-font-size", size);
  root.setAttribute("data-font-size-source", size === "system" ? "system" : "manual");
}

export function FontSizeProvider({
  children,
  defaultFontSize = "system",
  storageKey = "maritime-ui-font-size",
  ...props
}: FontSizeProviderProps) {
  const [fontSize, setFontSizeState] = useState<FontSizeKey>(() => {
    const stored = safeLocalStorage.getItem(storageKey);
    return stored ? normalizeFontSize(stored) : defaultFontSize;
  });

  useEffect(() => {
    if (
      fontSize !== "system" ||
      !Capacitor.isNativePlatform() ||
      Capacitor.getPlatform() !== "ios"
    ) {
      applyScale(fontSize);
      return;
    }

    let disposed = false;
    let listener: { remove: () => Promise<void> } | undefined;
    const applyNativeScale = ({ scale }: ContentSizeChange) => {
      if (!disposed) applyScale("system", scale);
    };

    applyScale("system");
    void ContentSize.getCurrent().then(applyNativeScale).catch(() => {
      // The default system scale is already applied while the native bridge starts.
    });
    void ContentSize.addListener("contentSizeChanged", applyNativeScale).then((handle) => {
      if (disposed) void handle.remove();
      else listener = handle;
    }).catch(() => {
      // Browser previews and older native builds safely remain at the default scale.
    });

    return () => {
      disposed = true;
      if (listener) void listener.remove();
    };
  }, [fontSize]);


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
