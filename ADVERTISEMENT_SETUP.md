# Reklam (AdMob) Kurulumu

Reklam, para kazanma modelinde **ikincil** gelirdir: ana teklif Pro aboneliğidir
(bkz. `MONETIZATION_SETUP.md`). Reklam yalnızca **ücretsiz pakette** ve yalnızca
**native uygulamada** (Android/iOS) gösterilir. Web'de reklam yoktur.

## ⚠️ Reklamlar şu an KAPALI (`VITE_ADS_ENABLED`)

Tüm reklam yolları `VITE_ADS_ENABLED` build-time anahtarına bağlıdır ve anahtar
**varsayılan olarak kapalıdır** — yalnızca değer açıkça `true` ise reklamlar
etkinleşir (`areAdsEnabled()`, `src/config/ads.ts`). İlk Google Play sürümü
reklamsız çıkacağı için bu anahtar kapalı bırakılmıştır.

Anahtar kapalıyken:

- AdMob SDK hiç `initialize` **edilmez**,
- UMP onay formu hiç **açılmaz** (Ayarlar'daki "Reklamlar ve Gizlilik" kartı da
  görünmez),
- banner ve geçiş reklamı hiç **istenmez**,
- `--ad-banner-height` `0px`'te kalır, `MobileLayout` alt boşluk açmaz.

Tek kapı `areAdsSupported()`'tır (`src/services/ads.ts`): anahtar + native
platform. Modüldeki her giriş noktası buradan geçtiği için anahtarı kapatmak
reklamı tamamen kapatmaya yeter.

> Kimlikleri boş bırakmak reklamı kapatmaz. Anahtar açık ve kimlikler boşsa
> Google'ın **TEST** reklamları gösterilir; bunu mağaza sürümünde yapmak AdMob
> politikası ihlalidir. Bu yüzden "kimlik yok" ile "reklam yok" ayrı
> kararlardır.

Manifest'teki AdMob `APPLICATION_ID` meta-data'sı **kaldırılmamalıdır**: SDK
pakette bağımlılık olarak durduğu için meta-data eksikse uygulama açılışta
çöker — reklamlar kapalı olsa bile.

### Reklam kimliği izni (AD_ID) pakette değil

AdMob SDK'sı (`play-services-ads-api`, `play-services-ads-identifier`,
`play-services-measurement-sdk-api`) `com.google.android.gms.permission.AD_ID`
iznini kendi manifest'inde beyan eder ve manifest birleştirici normalde onu
AAB'ye taşır. Reklamlar kapalıyken SDK hiç başlatılmadığı, dolayısıyla reklam
kimliği hiç okunmadığı için izin `AndroidManifest.xml`'de açıkça kaldırılır:

```xml
<uses-permission android:name="com.google.android.gms.permission.AD_ID"
    tools:node="remove" />
```

Doğrulandı — `:app:processReleaseManifest` sonrası
`app/build/outputs/logs/manifest-merger-release-report.txt` izni üç kütüphaneden
de `REJECTED` gösteriyor ve birleşmiş manifest'te izin yok.

> ⚠️ **Reklam açıldığında bu satır kaldırılmalıdır.** İzin olmadan AdMob
> Android 13+ cihazlarda reklam kimliğine erişemez; doldurma oranı ve gelir
> düşer, kişiselleştirme kapanır.

Not: `play-services-ads` ayrıca üç Privacy Sandbox izni getiriyor
(`ACCESS_ADSERVICES_AD_ID`, `ACCESS_ADSERVICES_ATTRIBUTION`,
`ACCESS_ADSERVICES_TOPICS`). Bunlar AdServices API'lerine aittir ve Play'in
reklam kimliği beyanının dayandığı izin değildir; şu an pakette duruyorlar.
Tamamen arındırmak isterseniz aynı `tools:node="remove"` yöntemiyle onlar da
kaldırılabilir (reklam açılırken yine geri alınmalıdır).

Reklamı açmak için: `VITE_ADS_ENABLED=true` **ve** dört birim kimliğinin birden
doldurulması (aşağıya bkz.).

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

### 2. Anahtar + reklam birimi kimlikleri (JS tarafı)

`.env` dosyanıza yazın (bkz. `.env.example`). Anahtar ile dört kimlik **birlikte**
girilmelidir; anahtarı tek başına açmak TEST reklamı yayınlamak demektir:

```
VITE_ADS_ENABLED=true
VITE_ADMOB_BANNER_ID_ANDROID=ca-app-pub-XXXXXXXX/YYYYYYYYYY
VITE_ADMOB_INTERSTITIAL_ID_ANDROID=ca-app-pub-XXXXXXXX/YYYYYYYYYY
VITE_ADMOB_BANNER_ID_IOS=ca-app-pub-XXXXXXXX/YYYYYYYYYY
VITE_ADMOB_INTERSTITIAL_ID_IOS=ca-app-pub-XXXXXXXX/YYYYYYYYYY
```

Bir platformun kimliği doldurulduğunda `isUsingTestAds()` false döner ve
`isTesting` bayrağı otomatik kapanır. **Gerçek bir birim kimliğini
`isTesting: true` ile istemek politika ihlalidir**; bu yüzden iki karar tek
yerden türetilir, elle ayarlamayın.

### 3. AD_ID iznini geri getirin (native taraf)

`android/app/src/main/AndroidManifest.xml` içindeki şu satırı **silin**:

```xml
<uses-permission android:name="com.google.android.gms.permission.AD_ID"
    tools:node="remove" />
```

Satır reklamsız sürüm için eklenmiştir; kalırsa AdMob Android 13+ cihazlarda
reklam kimliğine erişemez ve gelir düşer. Sildikten sonra izin SDK'nın
manifest'inden birleşerek geri gelir — ayrıca eklemenize gerek yok. Play
Console'daki reklam kimliği beyanını da güncellemeyi unutmayın.

### 4. App ID (native taraf)

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

### 5. Test cihazı

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

Cihazda kontrol listesi — **reklamlar kapalıyken** (varsayılan, ilk sürüm):

- [ ] Hiçbir sayfada banner **yok**, geçiş reklamı **yok**.
- [ ] İçeriğin altında banner için boşluk **açılmıyor** (`--ad-banner-height`
      `0px`).
- [ ] Ayarlar'da "Reklamlar ve Gizlilik" kartı **görünmüyor**.
- [ ] Logcat'te AdMob başlatma/onay formu kaydı **yok**.
- [ ] Uygulama açılışta çökmüyor (manifest'teki `APPLICATION_ID` meta-data'sı
      yerinde).

Reklamlar açıldıktan sonra (`VITE_ADS_ENABLED=true`):

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

Aşağıdakiler **reklamlar açıkken** geçerlidir. `VITE_ADS_ENABLED` kapalı
bırakılan bir sürümde uygulama reklam göstermez; beyanları buna göre verin ve
reklamı açtığınız sürümde güncellemeyi unutmayın.

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
