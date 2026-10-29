import { useEffect, useState } from "react";

/**
 * useState persisted on this device (localStorage). Stored values are merged
 * over `initial`, so new fields get their defaults. Storage errors (private
 * mode, quota) are ignored and the tool keeps working in memory.
 */
export function useStoredState<T extends object>(storageKey: string, initial: T) {
  const [value, setValue] = useState<T>(() => readStored(storageKey, initial));
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(value));
    } catch {
      /* storage full or blocked */
    }
  }, [storageKey, value]);
  return [value, setValue] as const;
}

export function readStored<T extends object>(storageKey: string, initial: T): T {
  try {
    const raw = localStorage.getItem(storageKey);
    return raw ? { ...initial, ...(JSON.parse(raw) as Partial<T>) } : initial;
  } catch {
    return initial;
  }
}
