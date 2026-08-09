import type { CapacitorConfig } from '@capacitor/cli';

// Üretim (mağaza) yapılandırması. Store build'lerinde web içeriği yerel
// `dist` klasöründen sunulur — buraya asla uzak `server.url` eklemeyin,
// aksi halde Google Play / App Store incelemesi reddedilir.
// Canlı yeniden yükleme ile geliştirme için: `npx cap run android -l --external`
const config: CapacitorConfig = {
  appId: 'com.marinersbook.app',
  appName: "Mariner's Book",
  webDir: 'dist',
  plugins: {
    StatusBar: {
      // 'DARK' = light text on a dark background, which is what the deep ocean
      // shell needs. The colour must match the top stop of the shell gradient
      // (hsl(214 84% 8%)) — see index.html theme-color and the PWA manifest.
      // The previous #1e40af belonged to no surface the app actually paints.
      style: 'DARK',
      backgroundColor: '#031226'
    },
    Keyboard: {
      resize: 'body',
      style: 'DARK'
    },
    // App: Capacitor 7'de `skipBackButton` opsiyonu yok. JS tarafında
    // `backButton` dinleyicisinin varlığı zaten default davranışı bastırır
    // (bkz. src/hooks/useNavigationHierarchy.ts).
    Haptics: {}
    // PushNotifications yapılandırması kaldırıldı: @capacitor/push-notifications
    // kurulu değil ve uygulamada push akışı yok. Ölü yapılandırma, izin/SDK
    // denetimlerinde yanıltıcı oluyordu.
  },
  android: {
    buildOptions: {
      // İmzalama bilgileri repoya girmez; android/keystore.properties
      // (gitignored) veya ortam değişkenleri üzerinden sağlanır.
      // Google Play yalnızca AAB kabul eder.
      releaseType: 'AAB',
      signingType: 'apksigner'
    }
  }
};

export default config;
