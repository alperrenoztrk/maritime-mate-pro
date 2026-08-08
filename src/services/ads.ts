/**
 * AdMob köprüsü.
 *
 * `@capacitor-community/admob` etrafında ince, savunmacı bir katman:
 *  - **Build-time anahtarla tamamen kapatılabilir.** `VITE_ADS_ENABLED` açıkça
 *    `true` değilse (varsayılan) `areAdsSupported()` false döner ve bu
 *    modüldeki hiçbir çağrı AdMob'a ulaşmaz.
 *  - **Web'de tamamen no-op.** Eklenti web'de `unimplemented` fırlatır; bu
 *    yüzden her giriş noktası `Capacitor.isNativePlatform()` ile korunur
 *    (bkz. src/plugins/screenProtection.web.ts — aynı felsefe).
 *  - **Hiçbir hata dışarı sızmaz.** Reklam ikincil gelirdir; yüklenememesi,
 *    onay formunun açılamaması veya SDK hatası uygulamayı asla bozmamalıdır.
 *  - **Karar burada verilmez.** Reklamın gösterilip gösterilmeyeceğine
 *    `AdsController` karar verir (paket + rota); burası yalnızca uygular.
 *
 * GDPR/UMP: Google'ın önerdiği sıra izlenir — önce onay bilgisi, sonra iOS
 * izleme izni (ATT), en son SDK başlatma. Onay alınmadıysa istekler
 * kişiselleştirilmemiş (`npa`) olarak gönderilir.
 */

import { Capacitor } from '@capacitor/core';
import {
  AdMob,
  AdmobConsentStatus,
  BannerAdPluginEvents,
  BannerAdPosition,
  BannerAdSize,
  type AdmobConsentInfo,
  type AdMobBannerSize,
} from '@capacitor-community/admob';
import {
  BANNER_HEIGHT_CSS_VAR,
  INTERSTITIAL_MIN_INTERVAL_MS,
  INTERSTITIAL_MIN_NAVIGATIONS,
  INTERSTITIAL_SESSION_WARMUP_MS,
  areAdsEnabled,
  getAdUnitId,
  isUsingTestAds,
} from '@/config/ads';

/**
 * Reklam bu derlemede ve bu platformda gösterilebilir mi?
 *
 * İki kapı birden açık olmalı: build-time anahtar (`VITE_ADS_ENABLED`, bkz.
 * `areAdsEnabled()` — varsayılan kapalı) ve native platform (yalnızca
 * Android/iOS; eklenti web'de `unimplemented` fırlatır).
 *
 * Bu modüldeki her giriş noktası buradan geçer. Anahtar kapalıyken bu yüzden
 * AdMob SDK hiç `initialize` edilmez, UMP onay formu hiç açılmaz, banner ve
 * geçiş reklamı hiç istenmez; `--ad-banner-height` 0'da kalır ve `MobileLayout`
 * alt boşluk açmaz.
 */
export function areAdsSupported(): boolean {
  return areAdsEnabled() && Capacitor.isNativePlatform();
}

/** Yalnızca geliştirmede konsola yazar; üretimde sessizdir. */
function warn(message: string, error?: unknown): void {
  if (import.meta.env.DEV) {
    console.warn(`[ads] ${message}`, error);
  }
}

/**
 * Ayarlardaki "reklam tercihleri" girişi gerekli mi?
 *
 * `PrivacyOptionsRequirementStatus` enum'ı eklentinin genel API'sinden
 * dışa aktarılmıyor (yalnızca alanın tipinde görünüyor), bu yüzden karşılaştırma
 * enum'un metin değeri üzerinden yapılır.
 */
function requiresPrivacyOptions(consent: AdmobConsentInfo): boolean {
  return String(consent.privacyOptionsRequirementStatus) === 'REQUIRED';
}

/**
 * Kişiselleştirilmemiş reklam istenmeli mi? Onay alınmadıysa (veya durum
 * bilinmiyorsa) her zaman `npa` tarafına düşülür — şüphede kalan kullanıcıya
 * kişiselleştirilmiş reklam göstermek GDPR açısından yanlış taraftır.
 */
function shouldUseNonPersonalized(consent: AdmobConsentInfo): boolean {
  return (
    consent.status !== AdmobConsentStatus.OBTAINED &&
    consent.status !== AdmobConsentStatus.NOT_REQUIRED
  );
}

// ---------------------------------------------------------------------------
// Başlatma + onay (UMP)
// ---------------------------------------------------------------------------

interface AdsState {
  /** SDK başlatıldı mı? */
  initialized: boolean;
  /** UMP'ye göre reklam isteği yapılabilir mi? */
  canRequestAds: boolean;
  /** Kişiselleştirilmemiş reklam istenmeli mi? */
  npa: boolean;
  /** Ayarlarda "reklam tercihleri" girişi gösterilmeli mi? */
  privacyOptionsRequired: boolean;
}

const state: AdsState = {
  initialized: false,
  canRequestAds: false,
  npa: true,
  privacyOptionsRequired: false,
};

let initPromise: Promise<AdsState> | null = null;

async function runInitialize(): Promise<AdsState> {
  // 1) Onay durumu. Hata olursa reklamsız devam edilir (izinsiz reklam
  //    göstermektense hiç göstermemek doğrudur).
  try {
    const consent = await AdMob.requestConsentInfo();
    state.canRequestAds = consent.canRequestAds ?? false;
    state.privacyOptionsRequired = requiresPrivacyOptions(consent);

    if (consent.status === AdmobConsentStatus.REQUIRED && consent.isConsentFormAvailable) {
      const updated = await AdMob.showConsentForm();
      state.canRequestAds = updated.canRequestAds ?? state.canRequestAds;
      state.npa = shouldUseNonPersonalized(updated);
      state.privacyOptionsRequired = requiresPrivacyOptions(updated);
    } else {
      state.npa = shouldUseNonPersonalized(consent);
    }
  } catch (error) {
    warn('onay bilgisi alınamadı, reklamlar kapalı kalıyor', error);
    state.canRequestAds = false;
  }

  // 2) iOS izleme izni (ATT). Reddedilmesi reklamı engellemez, yalnızca
  //    kişiselleştirmeyi kapatır.
  if (Capacitor.getPlatform() === 'ios') {
    try {
      const tracking = await AdMob.trackingAuthorizationStatus();
      if (tracking.status === 'notDetermined') {
        await AdMob.requestTrackingAuthorization();
      }
      const finalStatus = await AdMob.trackingAuthorizationStatus();
      if (finalStatus.status !== 'authorized') state.npa = true;
    } catch (error) {
      warn('izleme izni sorgulanamadı', error);
      state.npa = true;
    }
  }

  // 3) SDK. Bu adım başarısız olursa hiçbir reklam çağrısı anlamlı değildir.
  try {
    await AdMob.initialize({ initializeForTesting: isUsingTestAds() });
    state.initialized = true;
  } catch (error) {
    warn('AdMob başlatılamadı', error);
    state.initialized = false;
    state.canRequestAds = false;
  }

  if (state.initialized && state.canRequestAds) {
    void attachBannerSizeListeners();
    void prepareInterstitial();
  }

  return state;
}

/**
 * AdMob'u bir kez başlatır (idempotent). Reklam gösterilebilir durumdaysa
 * `true` döner.
 */
export async function initializeAds(): Promise<boolean> {
  if (!areAdsSupported()) return false;
  initPromise ??= runInitialize();
  const result = await initPromise;
  return result.initialized && result.canRequestAds;
}

/** Ayarlarda "reklam tercihlerini yönet" girişi gösterilmeli mi? */
export function isPrivacyOptionsRequired(): boolean {
  return state.privacyOptionsRequired;
}

/**
 * UMP gizlilik seçenekleri formunu kullanıcı isteğiyle yeniden açar.
 * Google, onay formu gösterilen bölgelerde bu girişin uygulamada
 * bulunmasını zorunlu kılar.
 */
export async function openPrivacyOptionsForm(): Promise<boolean> {
  if (!areAdsSupported()) return false;
  try {
    await AdMob.showPrivacyOptionsForm();
    // Kullanıcı onayı geri çekmiş olabilir; güncel durumu tazele.
    const consent = await AdMob.requestConsentInfo();
    state.canRequestAds = consent.canRequestAds ?? false;
    state.npa = shouldUseNonPersonalized(consent);
    state.privacyOptionsRequired = requiresPrivacyOptions(consent);
    if (!state.canRequestAds) await hideBanner();
    return true;
  } catch (error) {
    warn('gizlilik seçenekleri formu açılamadı', error);
    return false;
  }
}

// ---------------------------------------------------------------------------
// Banner
// ---------------------------------------------------------------------------

let bannerVisible = false;
let bannerListenersAttached = false;

/**
 * Banner yüksekliğini CSS değişkenine yazar; MobileLayout alt boşluğunu
 * buradan hesaplar, böylece banner içeriği kapatmaz.
 */
function setBannerHeight(pixels: number): void {
  if (typeof document === 'undefined') return;
  document.documentElement.style.setProperty(BANNER_HEIGHT_CSS_VAR, `${Math.max(0, pixels)}px`);
}

async function attachBannerSizeListeners(): Promise<void> {
  if (bannerListenersAttached) return;
  bannerListenersAttached = true;
  try {
    await AdMob.addListener(BannerAdPluginEvents.SizeChanged, (size: AdMobBannerSize) => {
      setBannerHeight(bannerVisible ? size.height : 0);
    });
    await AdMob.addListener(BannerAdPluginEvents.FailedToLoad, () => {
      setBannerHeight(0);
    });
  } catch (error) {
    warn('banner dinleyicileri eklenemedi', error);
  }
}

/** Alt bannerı gösterir. Zaten görünürse hiçbir şey yapmaz. */
export async function showBanner(): Promise<void> {
  if (!areAdsSupported() || bannerVisible) return;
  if (!(await initializeAds())) return;

  try {
    await AdMob.showBanner({
      adId: getAdUnitId('banner'),
      adSize: BannerAdSize.ADAPTIVE_BANNER,
      position: BannerAdPosition.BOTTOM_CENTER,
      isTesting: isUsingTestAds(),
      npa: state.npa,
      margin: 0,
    });
    bannerVisible = true;
  } catch (error) {
    warn('banner gösterilemedi', error);
    bannerVisible = false;
    setBannerHeight(0);
  }
}

/** Bannerı gizler ve içeriğin alt boşluğunu sıfırlar. */
export async function hideBanner(): Promise<void> {
  setBannerHeight(0);
  if (!areAdsSupported() || !bannerVisible) return;
  bannerVisible = false;
  try {
    await AdMob.hideBanner();
  } catch (error) {
    warn('banner gizlenemedi', error);
  }
}

/** Bannerı tamamen kaldırır (Pro'ya geçişte / oturum kapanışında). */
export async function removeBanner(): Promise<void> {
  setBannerHeight(0);
  if (!areAdsSupported()) return;
  bannerVisible = false;
  try {
    await AdMob.removeBanner();
  } catch (error) {
    warn('banner kaldırılamadı', error);
  }
}

// ---------------------------------------------------------------------------
// Geçiş reklamı (interstitial)
// ---------------------------------------------------------------------------

const sessionStartedAt = Date.now();
let interstitialReady = false;
let interstitialPreparing = false;
let lastInterstitialAt = 0;
let navigationsSinceLastAd = 0;

/** Bir sonraki geçiş reklamını arka planda yükler. */
export async function prepareInterstitial(): Promise<void> {
  if (!areAdsSupported() || interstitialReady || interstitialPreparing) return;
  if (!state.initialized || !state.canRequestAds) return;

  interstitialPreparing = true;
  try {
    await AdMob.prepareInterstitial({
      adId: getAdUnitId('interstitial'),
      isTesting: isUsingTestAds(),
      npa: state.npa,
    });
    interstitialReady = true;
  } catch (error) {
    warn('geçiş reklamı hazırlanamadı', error);
    interstitialReady = false;
  } finally {
    interstitialPreparing = false;
  }
}

/** Sayfa geçişi sayacını artırır (AdsController her rota değişiminde çağırır). */
export function registerNavigation(): void {
  navigationsSinceLastAd += 1;
}

/** Frekans kapılarının hepsi açık mı? */
function isInterstitialAllowed(): boolean {
  if (!interstitialReady) return false;
  if (Date.now() - sessionStartedAt < INTERSTITIAL_SESSION_WARMUP_MS) return false;
  if (navigationsSinceLastAd < INTERSTITIAL_MIN_NAVIGATIONS) return false;
  if (Date.now() - lastInterstitialAt < INTERSTITIAL_MIN_INTERVAL_MS) return false;
  return true;
}

/**
 * Frekans kuralları izin veriyorsa geçiş reklamı gösterir.
 * Gösterildiyse `true` döner ve bir sonrakini önceden yükler.
 */
export async function maybeShowInterstitial(): Promise<boolean> {
  if (!areAdsSupported()) return false;
  if (!state.initialized || !state.canRequestAds) return false;
  if (!isInterstitialAllowed()) return false;

  try {
    await AdMob.showInterstitial();
    lastInterstitialAt = Date.now();
    navigationsSinceLastAd = 0;
    interstitialReady = false;
    void prepareInterstitial();
    return true;
  } catch (error) {
    warn('geçiş reklamı gösterilemedi', error);
    interstitialReady = false;
    void prepareInterstitial();
    return false;
  }
}
