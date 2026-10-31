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

// ── İzin gerekçesi ────────────────────────────────────────────────────────
// Sistem izin penceresinden önce uygulama içinde konumun ne için kullanıldığı
// anlatılır (Play izin politikası). Pencere LocationRationaleHost'ta (App'te
// bir kez bağlı). Cevap cihazda saklanır; "Not now" denirse bir daha
// sorulmaz, IP tabanlı yaklaşık konum kullanılır. Kullanıcı Konum Seçici →
// "Use device location" ile yeniden açabilir (resetLocationRationale).

const RATIONALE_KEY = "maritime-geo-rationale";
type RationaleAnswer = "accepted" | "declined";
type RationaleRequest = (resolve: (allow: boolean) => void) => void;

let rationaleListener: RationaleRequest | null = null;
let pendingRationale: Promise<boolean> | null = null;
let queuedResolve: ((allow: boolean) => void) | null = null;

const readRationale = (): RationaleAnswer | null => {
  try {
    const value = safeLocalStorage.getItem(RATIONALE_KEY);
    return value === "accepted" || value === "declined" ? value : null;
  } catch {
    return null;
  }
};

const writeRationale = (answer: RationaleAnswer) => {
  try {
    safeLocalStorage.setItem(RATIONALE_KEY, answer);
  } catch {
    // yok sayılır
  }
};

/** Kullanıcı konumu kendisi açmak istediğinde gerekçe yeniden sorulabilsin. */
export const resetLocationRationale = () => {
  try {
    safeLocalStorage.removeItem(RATIONALE_KEY);
  } catch {
    // yok sayılır
  }
};

/** LocationRationaleHost bu dinleyiciyle pencereyi açar. */
export const onLocationRationaleRequest = (listener: RationaleRequest): (() => void) => {
  rationaleListener = listener;
  if (queuedResolve) {
    const resolve = queuedResolve;
    queuedResolve = null;
    listener(resolve);
  }
  return () => {
    if (rationaleListener === listener) rationaleListener = null;
  };
};

const askLocationRationale = (): Promise<boolean> => {
  if (pendingRationale) return pendingRationale;
  pendingRationale = new Promise<boolean>((resolve) => {
    const finish = (allow: boolean) => {
      writeRationale(allow ? "accepted" : "declined");
      pendingRationale = null;
      resolve(allow);
    };
    if (rationaleListener) rationaleListener(finish);
    else queuedResolve = finish; // pencere henüz bağlanmadı; bağlanınca açılır
  });
  return pendingRationale;
};

/**
 * Konum isteği yapılmalı mı? Reddedilmiş izinde tekrar sormayız (tarayıcı zaten
 * sessizce reddeder, native kabukta ise kullanıcıyı rahatsız eder). İzin henüz
 * sorulmadıysa önce uygulama içi gerekçe gösterilir.
 */
export const shouldRequestLocation = async (): Promise<boolean> => {
  const state = await getGeoPermissionState();
  if (state === "denied") return false;
  if (state === "granted") return true;
  const answer = readRationale();
  if (answer === "declined") return false;
  // Bu sürümden önce zaten izin sorulmuş kullanıcıya gerekçe gösterilmez.
  if (answer === "accepted" || hasPromptedForLocation()) return true;
  return askLocationRationale();
};
