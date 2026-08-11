/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { safeLocalStorage } from "@/lib/safeStorage";
import { Capacitor } from "@capacitor/core";

export type Theme = "system" | "light" | "dark";
export type ResolvedTheme = "light" | "dark";

type ThemeProviderProps = {
  children: ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: Theme) => void;
};

const ThemeProviderContext = createContext<ThemeProviderState | undefined>(undefined);
const VALID_THEMES = new Set<Theme>(["system", "light", "dark"]);

const systemTheme = (): ResolvedTheme =>
  typeof window !== "undefined" && window.matchMedia?.("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "maritime-ui-theme",
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(() => {
    const stored = safeLocalStorage.getItem(storageKey) as Theme | null;
    return stored && VALID_THEMES.has(stored) ? stored : defaultTheme;
  });
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>(() =>
    theme === "system" ? systemTheme() : theme,
  );

  useEffect(() => {
    const root = window.document.documentElement;
    const media = window.matchMedia("(prefers-color-scheme: dark)");

    const applyTheme = () => {
      const next = theme === "system" ? (media.matches ? "dark" : "light") : theme;
      setResolvedTheme(next);
      root.classList.remove("light", "dark", "cyberpunk", "neon", "nature");
      root.classList.add(next);
      root.style.colorScheme = next;

      const themeColor = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
      if (themeColor) themeColor.content = next === "dark" ? "#111318" : "#f8fafb";

      void import("@capacitor/status-bar")
        .then(({ StatusBar, Style }) => {
          if (!Capacitor.isNativePlatform()) return;
          void StatusBar.setStyle({ style: next === "dark" ? Style.Light : Style.Dark });
          if (Capacitor.getPlatform() === "android") {
            void StatusBar.setBackgroundColor({ color: next === "dark" ? "#111318" : "#f8fafb" });
          }
        })
        .catch(() => {
          // Browser preview or a native bridge that is not ready yet.
        });
    };

    applyTheme();
    if (theme === "system") {
      if (media.addEventListener) media.addEventListener("change", applyTheme);
      else media.addListener?.(applyTheme);
    }
    return () => {
      if (media.removeEventListener) media.removeEventListener("change", applyTheme);
      else media.removeListener?.(applyTheme);
    };
  }, [theme]);

  const value = useMemo<ThemeProviderState>(
    () => ({
      theme,
      resolvedTheme,
      setTheme: (nextTheme) => {
        safeLocalStorage.setItem(storageKey, nextTheme);
        setThemeState(nextTheme);
      },
    }),
    [resolvedTheme, storageKey, theme],
  );

  return <ThemeProviderContext.Provider value={value}>{children}</ThemeProviderContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeProviderContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
}
