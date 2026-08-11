import { useEffect, useState } from "react";
import { safeLocalStorage } from "@/lib/safeStorage";
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

function applyScale(size: FontSizeKey) {
  const root = window.document.documentElement;
  const scale = FONT_SCALES[size] ?? 1;
  root.style.setProperty("--font-scale", String(scale));
  root.setAttribute("data-font-size", size);
  root.setAttribute("data-font-size-source", "manual");
}

export function FontSizeProvider({
  children,
  defaultFontSize = "normal",
  storageKey = "maritime-ui-font-size",
  ...props
}: FontSizeProviderProps) {
  const [fontSize, setFontSizeState] = useState<FontSizeKey>(() => {
    const stored = safeLocalStorage.getItem(storageKey);
    return stored ? normalizeFontSize(stored) : defaultFontSize;
  });

  useEffect(() => {
    applyScale(fontSize);
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
