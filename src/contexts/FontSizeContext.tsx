import { createContext, useContext, useEffect, useState } from "react";
import { safeLocalStorage } from "@/lib/safeStorage";

/**
 * Font size scaling. The scale is applied to the root <html> element through the
 * `--font-scale` CSS custom property, which the base `html { font-size }` rule in
 * index.css multiplies against. Because everything in the UI is sized in `rem`,
 * adjusting this single value scales typography consistently across every page
 * while preserving the responsive mobile/desktop base sizes.
 */

export type FontSizeKey = "small" | "normal" | "large" | "xlarge";

export const FONT_SCALES: Record<FontSizeKey, number> = {
  small: 0.875,
  normal: 1,
  large: 1.15,
  xlarge: 1.3,
};

export const FONT_SIZE_OPTIONS: { key: FontSizeKey; labelTr: string }[] = [
  { key: "small", labelTr: "Küçük" },
  { key: "normal", labelTr: "Normal" },
  { key: "large", labelTr: "Büyük" },
  { key: "xlarge", labelTr: "Çok Büyük" },
];

type FontSizeProviderProps = {
  children: React.ReactNode;
  defaultFontSize?: FontSizeKey;
  storageKey?: string;
};

type FontSizeProviderState = {
  fontSize: FontSizeKey;
  setFontSize: (size: FontSizeKey) => void;
};

const initialState: FontSizeProviderState = {
  fontSize: "normal",
  setFontSize: () => null,
};

const FontSizeProviderContext = createContext<FontSizeProviderState>(initialState);

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

  const value: FontSizeProviderState = {
    fontSize,
    setFontSize,
  };

  return (
    <FontSizeProviderContext.Provider {...props} value={value}>
      {children}
    </FontSizeProviderContext.Provider>
  );
}

export const useFontSize = () => {
  const context = useContext(FontSizeProviderContext);
  if (context === undefined)
    throw new Error("useFontSize must be used within a FontSizeProvider");
  return context;
};
