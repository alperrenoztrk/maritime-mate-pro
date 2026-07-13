import { registerPlugin } from '@capacitor/core';
import type { PluginListenerHandle } from '@capacitor/core';

/**
 * Ekran görüntüsü / ekran kaydı engelleme sistemi.
 *
 * Bu, native tarafta uygulanan özel bir Capacitor eklentisidir (bkz.
 * `android/.../ScreenProtectionPlugin.java` ve `ios/.../ScreenProtectionPlugin.swift`).
 *
 * Platform davranışı:
 *  - **Android:** `FLAG_SECURE` penceresel bayrağı. Ekran görüntüsü ve ekran
 *    kaydını tamamen engeller; ayrıca uygulamayı "son kullanılanlar" (recents)
 *    önizlemesinde de gizler. Tam engelleme mümkündür.
 *  - **iOS:** Apple, ekran görüntüsünü herkese açık API ile *tamamen* engellemeye
 *    izin vermez. Bunun yerine güvenli katman (secure text-field) tekniğiyle
 *    alınan ekran görüntüsü/kaydı boş/siyah çıkar, çoklu görev (app switcher)
 *    önizlemesi bulanıklaştırılır ve bir ekran görüntüsü alındığında
 *    `screenshotTaken` olayı tetiklenir.
 *  - **Web:** Tarayıcılar ekran görüntüsünü engelleyemez; tüm çağrılar no-op'tur.
 */
export interface ScreenshotTakenEvent {
  /** Olayı üreten platform (şu an yalnızca 'ios'). */
  platform: string;
}

export interface ScreenProtectionPlugin {
  /** Ekran görüntüsü korumasını etkinleştirir. */
  enable(): Promise<void>;

  /** Ekran görüntüsü korumasını devre dışı bırakır. */
  disable(): Promise<void>;

  /** Korumanın şu an etkin olup olmadığını döndürür. */
  isEnabled(): Promise<{ enabled: boolean }>;

  /**
   * iOS: kullanıcı bir ekran görüntüsü aldığında tetiklenir. iOS'ta görüntü
   * alınması engellenemediği için bu olay yalnızca bilgilendirme amaçlıdır.
   */
  addListener(
    eventName: 'screenshotTaken',
    listenerFunc: (event: ScreenshotTakenEvent) => void,
  ): Promise<PluginListenerHandle>;

  /** Bu eklentinin tüm dinleyicilerini kaldırır. */
  removeAllListeners(): Promise<void>;
}

const ScreenProtection = registerPlugin<ScreenProtectionPlugin>('ScreenProtection', {
  web: () => import('./screenProtection.web').then((m) => new m.ScreenProtectionWeb()),
});

export { ScreenProtection };
