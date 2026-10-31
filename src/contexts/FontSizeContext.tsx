import { useEffect, type ReactNode } from "react";
import { safeLocalStorage } from "@/lib/safeStorage";
import { FontSizeContext, type FontSizeContextValue } from "./font-size-context";

// Text-size customization has been removed from the app. Retain the provider
// for compatibility with existing consumers, but keep the UI at its design size.
const fixedFontSize: FontSizeContextValue = {
  fontSize: "normal",
  setFontSize: () => {},
};

export function FontSizeProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    safeLocalStorage.removeItem("maritime-ui-font-size");
    document.documentElement.style.setProperty("--font-scale", "1");
    document.documentElement.setAttribute("data-font-size", "normal");
    document.documentElement.setAttribute("data-font-size-source", "fixed");
  }, []);

  return (
    <FontSizeContext.Provider value={fixedFontSize}>
      {children}
    </FontSizeContext.Provider>
  );
}
