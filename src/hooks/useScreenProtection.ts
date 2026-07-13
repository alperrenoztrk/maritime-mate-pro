import { useEffect } from 'react';
import { Capacitor } from '@capacitor/core';
import type { PluginListenerHandle } from '@capacitor/core';
import { toast } from 'sonner';
import { ScreenProtection } from '@/plugins/screenProtection';

/**
 * Ekran görüntüsü engelleme sistemini uygulama genelinde etkinleştirir.
 *
 * Uygulama kökünde (App bileşeni) bir kez çağrılır. Native platformlarda
 * korumayı açar; iOS'ta bir ekran görüntüsü alındığında kullanıcıyı bilgilendirir.
 * Web'de hiçbir şey yapmaz (tarayıcı ekran görüntülerini engelleyemez).
 *
 * Not: Android'de koruma ayrıca `MainActivity.onCreate` içinde `FLAG_SECURE`
 * ile uygulama ilk kareden itibaren zaten etkindir; buradaki `enable()` çağrısı
 * bunu tamamlar ve iOS korumasını başlatır.
 */
export function useScreenProtection(): void {
  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return;

    let screenshotListener: PluginListenerHandle | undefined;
    let cancelled = false;

    (async () => {
      try {
        await ScreenProtection.enable();
        console.log('[ScreenProtection] Ekran görüntüsü koruması etkin.');
      } catch (err) {
        console.warn('[ScreenProtection] Koruma etkinleştirilemedi:', err);
      }

      // iOS: ekran görüntüsü engellenemez, yalnızca tespit edilip bildirilir.
      if (Capacitor.getPlatform() === 'ios') {
        try {
          const handle = await ScreenProtection.addListener('screenshotTaken', () => {
            toast.info('Ekran görüntüsü alındı', {
              description: 'Bu uygulamadaki içerik korumalıdır.',
            });
          });
          if (cancelled) {
            // Effect, dinleyici bağlanmadan önce temizlendiyse hemen kaldır.
            handle.remove();
          } else {
            screenshotListener = handle;
          }
        } catch (err) {
          console.warn('[ScreenProtection] Ekran görüntüsü dinleyicisi eklenemedi:', err);
        }
      }
    })();

    return () => {
      cancelled = true;
      screenshotListener?.remove();
    };
  }, []);
}
