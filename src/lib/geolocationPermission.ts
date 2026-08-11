import { safeLocalStorage } from "@/lib/safeStorage";

/**
 * Konum izni yönetimi.
 *
 * Amaç: giriş yapmış, uygulamayı daha önce kullanmış kullanıcıya her açılışta
 * yeniden konum izni sorulmaması. Tarayıcı/WebView izin durumu önceden okunur;
 * izin verilmişse doğrudan konum alınır, reddedilmişse hiç istek yapılmaz ve
 * IP tabanlı yedeğe düşülür. Son bilinen konum cihazda saklanır, böylece
 * widget'lar ilk karede dolu gelir.
 */

export type GeoPermissionState = "granted" | "denied" | "prompt" | "unknown";

const LAST_POSITION_KEY = "maritime-last-position";
const PROMPTED_KEY = "maritime-geo-prompted";
/** Önbellekteki konum bu süreden eskiyse yalnızca ilk boyama için kullanılır. */
export const LAST_POSITION_MAX_AGE_MS = 24 * 60 * 60 * 1000;

export type CachedPosition = {
  latitude: number;
  longitude: number;
  accuracyMeters: number | null;
  timestamp: number;
};

export const readCachedPosition = (): CachedPosition | null => {
  try {
    const raw = safeLocalStorage.getItem(LAST_POSITION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CachedPosition;
    if (!Number.isFinite(parsed?.latitude) || !Number.isFinite(parsed?.longitude)) return null;
    return parsed;
  } catch {
    return null;
  }
};

export const writeCachedPosition = (pos: Omit<CachedPosition, "timestamp"> & { timestamp?: number }) => {
  try {
    safeLocalStorage.setItem(
      LAST_POSITION_KEY,
      JSON.stringify({ ...pos, timestamp: pos.timestamp ?? Date.now() }),
    );
  } catch {
    // Storage kapalı: önbellek en iyi çaba.
  }
};

/** Kullanıcıya bu cihazda daha önce konum izni sorulmuş mu? */
export const hasPromptedForLocation = () => {
  try {
    return safeLocalStorage.getItem(PROMPTED_KEY) === "1";
  } catch {
    return false;
  }
};

export const markLocationPrompted = () => {
  try {
    safeLocalStorage.setItem(PROMPTED_KEY, "1");
  } catch {
    // yok sayılır
  }
};

/**
 * Permissions API destekleniyorsa gerçek izin durumunu döndürür. Desteklenmiyorsa
 * (bazı WebView'lar) "unknown" döner; çağıran taraf o zaman normal akışa devam eder.
 */
export const getGeoPermissionState = async (): Promise<GeoPermissionState> => {
  if (typeof navigator === "undefined" || !("geolocation" in navigator)) return "denied";
  try {
    const permissions = (navigator as Navigator & { permissions?: Permissions }).permissions;
    if (!permissions?.query) return "unknown";
    const status = await permissions.query({ name: "geolocation" as PermissionName });
    return status.state as GeoPermissionState;
  } catch {
    return "unknown";
  }
};

/**
 * Konum isteği yapılmalı mı? Reddedilmiş izinde tekrar sormayız (tarayıcı zaten
 * sessizce reddeder, native kabukta ise kullanıcıyı rahatsız eder).
 */
export const shouldRequestLocation = async (): Promise<boolean> => {
  const state = await getGeoPermissionState();
  return state !== "denied";
};
