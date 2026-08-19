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

export const FONT_SIZE_OPTIONS: { key: FontSizeKey; label: string }[] = [
  { key: "system", label: "System" },
  { key: "normal", label: "Normal" },
  { key: "large", label: "Large" },
];

/** Collapses legacy stored preferences onto the supported sizes. */
export const normalizeFontSize = (value: string | null | undefined): FontSizeKey =>
  value === "system"
    ? "system"
    : value === "large" || value === "xlarge" || value === "accessibility" || value === "max"
    ? "large"
    : "normal";


export interface FontSizeContextValue {
  fontSize: FontSizeKey;
  setFontSize: (size: FontSizeKey) => void;
}

const initialState: FontSizeContextValue = {
  fontSize: "system",
  setFontSize: () => null,
};


export const FontSizeContext = createContext<FontSizeContextValue>(initialState);
