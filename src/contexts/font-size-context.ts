import { createContext } from "react";

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

export interface FontSizeContextValue {
  fontSize: FontSizeKey;
  setFontSize: (size: FontSizeKey) => void;
}

const initialState: FontSizeContextValue = {
  fontSize: "normal",
  setFontSize: () => null,
};

export const FontSizeContext = createContext<FontSizeContextValue>(initialState);
