import { Capacitor } from "@capacitor/core";
import { Haptics, ImpactStyle, NotificationType } from "@capacitor/haptics";

const HAPTICS_KEY = "maritime-haptics-enabled";

export const isHapticsEnabled = (): boolean => {
  try {
    return localStorage.getItem(HAPTICS_KEY) !== "false";
  } catch {
    return true;
  }
};

export const setHapticsEnabled = (enabled: boolean) => {
  try {
    localStorage.setItem(HAPTICS_KEY, String(enabled));
  } catch {
    // Keep interaction functional when Web Storage is unavailable.
  }
};

const canPlay = () => Capacitor.isNativePlatform() && isHapticsEnabled();

export const hapticSelection = () => {
  if (!canPlay()) return;
  void (async () => {
    try {
      await Haptics.selectionStart();
      await Haptics.selectionChanged();
      await Haptics.selectionEnd();
    } catch {
      // Haptics are enhancement-only; unsupported devices stay functional.
    }
  })();
};

export const hapticImpact = (style: ImpactStyle = ImpactStyle.Light) => {
  if (!canPlay()) return;
  void Haptics.impact({ style }).catch(() => undefined);
};

export const hapticSuccess = () => {
  if (!canPlay()) return;
  void Haptics.notification({ type: NotificationType.Success }).catch(() => undefined);
};

export const hapticError = () => {
  if (!canPlay()) return;
  void Haptics.notification({ type: NotificationType.Error }).catch(() => undefined);
};
