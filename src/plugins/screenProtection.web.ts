import { WebPlugin } from '@capacitor/core';
import type { ScreenProtectionPlugin } from './screenProtection';

/**
 * Web fallback. Tarayıcılar sayfanın ekran görüntüsünü almayı engelleyemez,
 * bu yüzden tüm metotlar güvenli bir şekilde no-op'tur ve `enabled: false`
 * bildirir. Böylece aynı kod native ve web'de sorunsuz çalışır.
 */
export class ScreenProtectionWeb extends WebPlugin implements ScreenProtectionPlugin {
  async enable(): Promise<void> {
    // Web'de yapılabilecek bir şey yok.
  }

  async disable(): Promise<void> {
    // Web'de yapılabilecek bir şey yok.
  }

  async isEnabled(): Promise<{ enabled: boolean }> {
    return { enabled: false };
  }
}
