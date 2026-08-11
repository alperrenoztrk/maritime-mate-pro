import { createContext } from "react";

export type FontSizeKey = "system" | "small" | "normal" | "large" | "xlarge" | "accessibility" | "max";

export const FONT_SCALES: Record<FontSizeKey, number> = {
  system: 1,
  small: 0.875,
  normal: 1,
  large: 1.15,
  xlarge: 1.3,
  accessibility: 1.6,
  max: 2,
};

export const FONT_SIZE_OPTIONS: { key: FontSizeKey; labelTr: string }[] = [
  { key: "system", labelTr: "Sistem (Dynamic Type)" },
  { key: "small", labelTr: "Küçük" },
  { key: "normal", labelTr: "Normal" },
  { key: "large", labelTr: "Büyük" },
  { key: "xlarge", labelTr: "Çok Büyük" },
  { key: "accessibility", labelTr: "Erişilebilir" },
  { key: "max", labelTr: "En Büyük (%200)" },
];

export interface FontSizeContextValue {
  fontSize: FontSizeKey;
  setFontSize: (size: FontSizeKey) => void;
}

const initialState: FontSizeContextValue = {
  fontSize: "system",
  setFontSize: () => null,
};

export const FontSizeContext = createContext<FontSizeContextValue>(initialState);
