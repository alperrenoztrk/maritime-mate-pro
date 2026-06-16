import { useCallback, useEffect, useState } from "react";

export type HomeWidgetId =
  | "clock-national"
  | "clock-gmt"
  | "weather"
  | "wind"
  | "location"
  | "sun";

export interface HomeWidgetMeta {
  id: HomeWidgetId;
  label: string;
  description: string;
  size: "small" | "medium";
}

export const AVAILABLE_WIDGETS: HomeWidgetMeta[] = [
  { id: "clock-national", label: "Yerel Saat", description: "Bulunduğun bölgenin saati", size: "small" },
  { id: "clock-gmt", label: "GMT / UTC", description: "Greenwich ortalama zamanı", size: "small" },
  { id: "weather", label: "Hava Durumu", description: "Sıcaklık ve durum", size: "small" },
  { id: "wind", label: "Rüzgâr", description: "Yön ve hız (kt)", size: "small" },
  { id: "location", label: "Konum", description: "Enlem / boylam (DMS)", size: "medium" },
  { id: "sun", label: "Güneş", description: "Doğuş & batış saatleri", size: "medium" },
];

const STORAGE_KEY = "marine-home-widgets-v1";

interface StoredEntry {
  id: HomeWidgetId;
  enabled: boolean;
  order: number;
}

function readStorage(): StoredEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((e) => e && typeof e.id === "string");
  } catch {
    return [];
  }
}

function writeStorage(entries: StoredEntry[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  } catch {
    /* ignore */
  }
}

export function useHomeWidgets() {
  const [entries, setEntries] = useState<StoredEntry[]>(() => {
    const stored = readStorage();
    // seed defaults the first time
    if (stored.length === 0) {
      return AVAILABLE_WIDGETS.map((w, i) => ({
        id: w.id,
        enabled: i < 4,
        order: i,
      }));
    }
    // merge in any new widget ids
    const known = new Set(stored.map((e) => e.id));
    const merged = [...stored];
    AVAILABLE_WIDGETS.forEach((w, i) => {
      if (!known.has(w.id)) merged.push({ id: w.id, enabled: false, order: stored.length + i });
    });
    return merged;
  });

  useEffect(() => {
    writeStorage(entries);
  }, [entries]);

  const toggle = useCallback((id: HomeWidgetId) => {
    setEntries((prev) => prev.map((e) => (e.id === id ? { ...e, enabled: !e.enabled } : e)));
  }, []);

  const move = useCallback((id: HomeWidgetId, dir: -1 | 1) => {
    setEntries((prev) => {
      const sorted = [...prev].sort((a, b) => a.order - b.order);
      const idx = sorted.findIndex((e) => e.id === id);
      const swap = idx + dir;
      if (idx < 0 || swap < 0 || swap >= sorted.length) return prev;
      [sorted[idx], sorted[swap]] = [sorted[swap], sorted[idx]];
      return sorted.map((e, i) => ({ ...e, order: i }));
    });
  }, []);

  const enabled = entries
    .filter((e) => e.enabled)
    .sort((a, b) => a.order - b.order)
    .map((e) => e.id);

  const ordered = [...entries].sort((a, b) => a.order - b.order);

  return { entries: ordered, enabled, toggle, move };
}
