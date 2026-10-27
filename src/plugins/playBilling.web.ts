import { WebPlugin } from '@capacitor/core';
import type { PlayBillingPlugin, PlayProduct, PlayPurchase, PlayProductType } from './playBilling';

/**
 * Web stub: tarayıcıda Google Play Faturalandırma yoktur. Arayüz,
 * `isAvailable()` false döndüğünde satın alma düğmelerini gizler ve
 * kullanıcıyı Android uygulamasına yönlendirir.
 */
export class PlayBillingWeb extends WebPlugin implements PlayBillingPlugin {
  async isAvailable(): Promise<{ available: boolean }> {
    return { available: false };
  }

  async getProducts(_options: { productIds: string[]; type: PlayProductType }): Promise<{ products: PlayProduct[] }> {
    return { products: [] };
  }

  async purchase(_options: {
    productId: string;
    type: PlayProductType;
    offerToken?: string;
    obfuscatedAccountId?: string;
  }): Promise<{ purchases: PlayPurchase[] }> {
    throw this.unavailable('Purchases are only available in the Android app.');
  }

  async restorePurchases(_options: { type: PlayProductType }): Promise<{ purchases: PlayPurchase[] }> {
    throw this.unavailable('Restoring purchases is only available in the Android app.');
  }
}
