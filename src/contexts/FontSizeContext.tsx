import { useEffect, useState } from "react";
import { safeLocalStorage } from "@/lib/safeStorage";
import {
  FONT_SCALES,
  FontSizeContext,
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
  root.style.setProperty("--font-scale", String(FONT_SCALES[size] ?? 1));
  root.setAttribute("data-font-size", size);
}

export function FontSizeProvider({
  children,
  defaultFontSize = "normal",
  storageKey = "maritime-ui-font-size",
  ...props
}: FontSizeProviderProps) {
  const [fontSize, setFontSizeState] = useState<FontSizeKey>(() => {
    const stored = safeLocalStorage.getItem(storageKey) as FontSizeKey | null;
    return stored && stored in FONT_SCALES ? stored : defaultFontSize;
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
