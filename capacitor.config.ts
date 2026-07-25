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
      style: 'DARK',
      backgroundColor: '#1e40af'
    },
    Keyboard: {
      resize: 'body',
      style: 'DARK'
    },
    // App: Capacitor 7'de `skipBackButton` opsiyonu yok. JS tarafında
    // `backButton` dinleyicisinin varlığı zaten default davranışı bastırır
    // (bkz. src/hooks/useNavigationHierarchy.ts).
    Haptics: {},
    PushNotifications: {
      presentationOptions: ['badge', 'sound', 'alert']
    }
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
