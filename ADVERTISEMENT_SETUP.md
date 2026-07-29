# Reklam (AdMob) Kurulumu

Reklam, para kazanma modelinde **ikincil** gelirdir: ana teklif Pro aboneliğidir
(bkz. `MONETIZATION_SETUP.md`). Reklam yalnızca **ücretsiz pakette** ve yalnızca
**native uygulamada** (Android/iOS) gösterilir. Web'de reklam yoktur.

Şu an depo, Google'ın **TEST** reklam kimlikleriyle çalışacak şekilde
yapılandırılmıştır — gerçek kimlikler girilmeden de her şey çalışır ve gerçek
reklam envanteri kirlenmez.

## Mimari

```
src/config/ads.ts          Reklam birimi kimlikleri, reklamsız rotalar, frekans kuralları
  └─ src/services/ads.ts   @capacitor-community/admob köprüsü (web'de no-op, hata yutar)
       └─ src/components/ads/AdsController.tsx
            "Kime ve nerede" kararı: paket (useEntitlement) + rota
```

- **Karar tek yerdedir.** `AdsController`, `hasProAccess` true olduğu anda
  bannerı kaldırır; "reklamsız kullanım" Pro vaadidir.
- **Servis katmanı asla hata fırlatmaz.** Reklam yüklenememesi, onay formunun
  açılamaması veya SDK hatası uygulamayı bozmaz.
- **Web'de tamamen kapalıdır.** Eklenti tarayıcıda `unimplemented` fırlattığı
  için her giriş noktası `Capacitor.isNativePlatform()` ile korunur.

### Formatlar

| Format | Nerede | Kural |
|---|---|---|
| Banner (adaptive, alt orta) | İç sayfalar | `AD_FREE_ROUTES` dışındaki tüm rotalar |
| Interstitial (geçiş) | Sayfa geçişlerinde | Üç kapı birden açıksa (aşağıda) |

Ödüllü (rewarded) reklam bilinçli olarak yoktur.

### Reklamsız rotalar (`AD_FREE_ROUTES`)

`/` (ana sayfa), `/auth`, `/auth/callback`, `/oauth-consent`, `/pro`, `/settings`.

`/pro` özellikle önemlidir: **ödeme ekranında reklam göstermek AdMob
politikasına aykırıdır.**

### Geçiş reklamı frekansı

Üç kapı da açılmadan reklam gösterilmez (`src/config/ads.ts`):

| Sabit | Varsayılan | Anlamı |
|---|---|---|
| `INTERSTITIAL_SESSION_WARMUP_MS` | 60 sn | Açılıştan sonraki bu sürede reklam yok |
| `INTERSTITIAL_MIN_NAVIGATIONS` | 8 | Son reklamdan bu yana gereken sayfa geçişi |
| `INTERSTITIAL_MIN_INTERVAL_MS` | 3 dk | İki reklam arasındaki en kısa süre |

Değerleri değiştirmeden önce: agresif geçiş reklamı hem mağaza puanını hem Pro
dönüşümünü düşürür.

### Yerleşim

Banner native bir görünümdür, web katmanının üstünde durur. Servis, banner
yüksekliğini `--ad-banner-height` CSS değişkenine yazar; `MobileLayout` alt
boşluğunu buradan hesaplar, böylece banner içeriği kapatmaz. Banner yokken
değişken `0px`'tir.

## GDPR / UMP onayı

`src/services/ads.ts` Google'ın önerdiği sırayı uygular:

1. `requestConsentInfo()` — onay durumu ve `canRequestAds`.
2. Durum `REQUIRED` ve form mevcutsa `showConsentForm()`.
3. iOS'ta izleme izni (ATT): `trackingAuthorizationStatus()` → gerekiyorsa
   `requestTrackingAuthorization()`.
4. `AdMob.initialize()`.

Onay alınmadıysa (veya durum bilinmiyorsa) tüm istekler **kişiselleştirilmemiş**
(`npa: true`) gönderilir. `canRequestAds` false ise hiç reklam istenmez.

**AdMob Console tarafında yapılması gereken:** Privacy & messaging → GDPR ve
US state regulations mesajlarını oluşturup yayımlayın. Mesaj tanımlanmazsa
`showConsentForm()` gösterilecek bir şey bulamaz.

Ayarlar → "Reklamlar ve Gizlilik" kartındaki **Reklam tercihlerini yönet**
düğmesi `showPrivacyOptionsForm()` çağırır. Bu giriş noktası, onay formu
gösterilen bölgelerde Google tarafından zorunlu tutulur; kart yalnızca reklam
gören (ücretsiz + native) kullanıcıya ve UMP "gerekli" dediğinde görünür.

## Test reklamlarından canlıya geçiş

Hiçbir gerçek kimlik depoya girmez.

### 1. AdMob Console

1. [AdMob Console](https://admob.google.com/) → **Add app**.
   - Android paket adı: `com.marinersbook.app`
   - iOS bundle kimliği: `com.marinersbook.app`
2. Her uygulama için iki reklam birimi oluşturun: **Banner** ve **Interstitial**.
3. App ID'leri (`ca-app-pub-XXXX~YYYY`) ve birim kimliklerini
   (`ca-app-pub-XXXX/YYYY`) not edin. `~` App ID'de, `/` birim kimliğindedir.

### 2. Reklam birimi kimlikleri (JS tarafı)

`.env` dosyanıza yazın (bkz. `.env.example`):

```
VITE_ADMOB_BANNER_ID_ANDROID=ca-app-pub-XXXXXXXX/YYYYYYYYYY
VITE_ADMOB_INTERSTITIAL_ID_ANDROID=ca-app-pub-XXXXXXXX/YYYYYYYYYY
VITE_ADMOB_BANNER_ID_IOS=ca-app-pub-XXXXXXXX/YYYYYYYYYY
VITE_ADMOB_INTERSTITIAL_ID_IOS=ca-app-pub-XXXXXXXX/YYYYYYYYYY
```

Bir platformun kimliği doldurulduğunda `isUsingTestAds()` false döner ve
`isTesting` bayrağı otomatik kapanır. **Gerçek bir birim kimliğini
`isTesting: true` ile istemek politika ihlalidir**; bu yüzden iki karar tek
yerden türetilir, elle ayarlamayın.

### 3. App ID (native taraf)

**Android** — `AndroidManifest.xml` değeri `${admobAppId}`'dir,
`android/app/build.gradle` şu sırayla çözer:

1. `android/admob.properties` (gitignored):
   ```properties
   appId=ca-app-pub-XXXXXXXX~YYYYYYYYYY
   ```
2. `ADMOB_APP_ID_ANDROID` ortam değişkeni (CI için).
3. Google'ın TEST App ID'si (varsayılan — derleme asla kimlik eksikliğinden
   kırılmaz).

**iOS** — `ios/App/App/Info.plist` içindeki `GADApplicationIdentifier`
değerini elle gerçek App ID ile değiştirin.

> App ID eksik/yanlışsa uygulama **açılışta çöker**. Bu, AdMob SDK'sının
> bilinçli davranışıdır.

### 4. Test cihazı

Gerçek kimliklere geçtikten sonra kendi cihazınızda reklam tıklamayın — hesap
askıya alınabilir. Cihazınızı test cihazı olarak kaydetmek için logcat/Xcode
çıktısındaki cihaz kimliğini `AdMob.initialize({ testingDevices: [...] })`
çağrısına (`src/services/ads.ts`) ekleyin.

## Doğrulama

```bash
npx tsc --noEmit -p tsconfig.app.json
npm run lint
npm run build

# Android cihaz/emülatör
npm run build && npx cap sync android && npm run android:build
```

Cihazda kontrol listesi:

- [ ] Ana sayfada (`/`) banner **yok**.
- [ ] Bir iç sayfada (örn. `/calculations`) test bannerı görünüyor ve içeriğin
      son satırını kapatmıyor.
- [ ] `/pro` ve `/settings` sayfalarında banner **yok**.
- [ ] Pro/ömür boyu hesapta hiçbir sayfada reklam **yok**.
- [ ] EEA'da (veya `AdmobConsentDebugGeography.EEA` ile) ilk açılışta onay formu
      çıkıyor; Ayarlar'da "Reklam tercihlerini yönet" düğmesi formu tekrar açıyor.
- [ ] Uygulamayı açar açmaz geçiş reklamı **çıkmıyor**; yoğun gezinmede en fazla
      3 dakikada bir çıkıyor.

## Mağaza gereksinimleri

- **Play Console → Uygulama içeriği → Reklamlar:** "Uygulamam reklam içeriyor"
  olarak işaretlenmelidir.
- **Play Console → Veri güvenliği:** AdMob'un topladığı veriler (cihaz
  tanımlayıcıları, yaklaşık konum, reklam etkileşimi) beyan edilmelidir.
- **App Store → App Privacy:** aynı beyanlar; `NSUserTrackingUsageDescription`
  ve `SKAdNetworkItems` `Info.plist`'te hazırdır (Google'ın yayımladığı tam
  ağ listesi; AdMob yeni ağ ekledikçe güncellenmelidir).
- **Gizlilik politikası:** `public/privacy-policy.html` AdMob'u zaten anıyor.

## Web reklamları (AdSense) — kurulu değil

Web tarafında reklam yoktur ve şu an planlanmamıştır. Üretim CSP'si
(`vite.config.ts`) harici script'leri engeller; AdSense açılacaksa önce ilgili
Google alan adlarının CSP'ye eklenmesi gerekir. Native AdMob CSP'den
etkilenmez.
