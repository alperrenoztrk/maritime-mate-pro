import { Capacitor } from "@capacitor/core";
import { safeLocalStorage } from "@/lib/safeStorage";

/**
 * Thin wrapper over @capacitor/haptics.
 *
 * The plugin was installed and declared in capacitor.config.ts but never
 * called once in the entire app — so the native build shipped with zero
 * tactile feedback. On iOS, haptics are a large part of why a tap feels like
 * it landed; without them the UI reads as a web page in a shell.
 *
 * Design notes:
 *  - The plugin is imported lazily. Pulling it in eagerly would add native
 *    bridge setup to the critical path on web, where it can do nothing.
 *  - Every call is fire-and-forget and swallows errors: a device with no
 *    taptic engine, or a browser, must never turn a button press into an
 *    unhandled rejection.
 *  - Respects both an explicit user setting and prefers-reduced-motion —
 *    people who suppress motion generally also want a calmer device.
 */

const STORAGE_KEY = "maritime-haptics-enabled";

type ImpactWeight = "light" | "medium" | "heavy";
type NotificationKind = "success" | "warning" | "error";

let enabled: boolean | null = null;

const reducedMotion = (): boolean =>
  typeof window !== "undefined" &&
  typeof window.matchMedia === "function" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Haptics are native-only, opt-out via Settings, and off under Reduce Motion. */
const isEnabled = (): boolean => {
  if (!Capacitor.isNativePlatform()) return false;
  if (reducedMotion()) return false;
  if (enabled === null) {
    enabled = safeLocalStorage.getItem(STORAGE_KEY) !== "false";
  }
  return enabled;
};

export const setHapticsEnabled = (value: boolean): void => {
  enabled = value;
  safeLocalStorage.setItem(STORAGE_KEY, String(value));
};

export const getHapticsEnabled = (): boolean => {
  if (enabled === null) {
    enabled = safeLocalStorage.getItem(STORAGE_KEY) !== "false";
  }
  return enabled;
};

/** A tap landed on something: icons, cards, list rows. */
export const hapticImpact = (weight: ImpactWeight = "light"): void => {
  if (!isEnabled()) return;
  void import("@capacitor/haptics")
    .then(({ Haptics, ImpactStyle }) =>
      Haptics.impact({
        style: {
          light: ImpactStyle.Light,
          medium: ImpactStyle.Medium,
          heavy: ImpactStyle.Heavy,
        }[weight],
      }),
    )
    .catch(() => {
      /* no taptic engine, or the bridge is not up yet */
    });
};

/** A value changed under the finger: pager snap, segmented control, picker. */
export const hapticSelection = (): void => {
  if (!isEnabled()) return;
  void import("@capacitor/haptics")
    .then(({ Haptics }) => Haptics.selectionChanged())
    .catch(() => {});
};

/** An operation resolved: calculation done, answer graded, save committed. */
export const hapticNotify = (kind: NotificationKind = "success"): void => {
  if (!isEnabled()) return;
  void import("@capacitor/haptics")
    .then(({ Haptics, NotificationType }) =>
      Haptics.notification({
        type: {
          success: NotificationType.Success,
          warning: NotificationType.Warning,
          error: NotificationType.Error,
        }[kind],
      }),
    )
    .catch(() => {});
};
