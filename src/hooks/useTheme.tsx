import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Capacitor } from "@capacitor/core";
import { StatusBar, Style } from "@capacitor/status-bar";

export type Theme = "system" | "light" | "dark";
export type ResolvedTheme = Exclude<Theme, "system">;

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: "system",
  resolvedTheme: "dark",
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "maritime-ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      return stored === "light" || stored === "dark" || stored === "system"
        ? stored
        : defaultTheme;
    } catch {
      return defaultTheme;
    }
  });
  const [systemTheme, setSystemTheme] = useState<ResolvedTheme>(() =>
    typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark",
  );

  const resolvedTheme: ResolvedTheme = theme === "system" ? systemTheme : theme;

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: light)");
    const syncSystemTheme = (matches: boolean) => setSystemTheme(matches ? "light" : "dark");
    const onChange = (event: MediaQueryListEvent) => syncSystemTheme(event.matches);
    syncSystemTheme(media.matches);
    if (media.addEventListener) media.addEventListener("change", onChange);
    else media.addListener?.(onChange);
    return () => {
      if (media.removeEventListener) media.removeEventListener("change", onChange);
      else media.removeListener?.(onChange);
    };
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark", "cyberpunk", "neon", "nature");
    root.classList.add(resolvedTheme);
    root.style.colorScheme = resolvedTheme;
    root.dataset.themePreference = theme;

    const themeColor = resolvedTheme === "dark" ? "#061225" : "#eef6ff";
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", themeColor);

    if (Capacitor.isNativePlatform()) {
      void StatusBar.setStyle({ style: resolvedTheme === "dark" ? Style.Light : Style.Dark }).catch(() => undefined);
      void StatusBar.setBackgroundColor({ color: themeColor }).catch(() => undefined);
    }
  }, [resolvedTheme, theme]);

  const value = useMemo<ThemeProviderState>(() => ({
    theme,
    resolvedTheme,
    setTheme: (nextTheme: Theme) => {
      try {
        localStorage.setItem(storageKey, nextTheme);
      } catch {
        // Storage can be unavailable in embedded/private WebViews; the in-memory
        // preference still works for the current session.
      }
      setTheme(nextTheme);
    },
  }), [resolvedTheme, storageKey, theme]);

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

// This hook intentionally shares the provider module so consumers cannot import
// a context without its matching public API.
// eslint-disable-next-line react-refresh/only-export-components
export const useAppTheme = () => useContext(ThemeProviderContext);
