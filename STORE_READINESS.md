# 📦 Mağaza Hazırlık Durumu — Marine Expert Pro

> Google Play + App Store yayın hazırlığının güncel durumu.
> Bu branch'te yapılan teknik hazırlıklar ve sizin tamamlamanız gereken adımlar.

**Uygulama kimliği**

| Alan | Değer |
|---|---|
| Uygulama adı | Marine Expert Pro |
| Paket adı / Bundle ID | `com.maritime.calculator` |
| Sürüm | 2.5.70 (versionCode / build: 20570) |
| Min SDK / Target SDK | 23 / 35 |
| Gizlilik politikası | `public/privacy-policy.html` → yayınlanınca `https://<alan-adınız>/privacy-policy.html` |

---

## ✅ Bu branch'te tamamlananlar

- **`capacitor.config.ts` üretime hazırlandı** — `appId: com.maritime.calculator`, uzak `server.url` kaldırıldı (mağaza incelemesinde ret sebebiydi), release tipi AAB yapıldı. `capacitor.config.prod.ts` gereksizleşti, silindi.
- **Android platformu eksiksiz üretildi** — daha önce repoda yalnızca birkaç üretilmiş dosya vardı (build.gradle, AndroidManifest, MainActivity yoktu). Artık `android/` komple derlenebilir durumda:
  - `versionCode 20570`, `versionName "2.5.70"`
  - Release imzalama: `android/keystore.properties` (gitignored) veya `KEYSTORE_FILE/KEYSTORE_PASSWORD/KEY_ALIAS/KEY_PASSWORD` ortam değişkenleri. Şablon: `android/keystore.properties.example`
  - Manifest izinleri: `INTERNET`, `ACCESS_NETWORK_STATE`, `POST_NOTIFICATIONS`
  - AdMob `APPLICATION_ID` meta-verisi eklendi (şimdilik Google'ın **TEST** App ID'si — eksik olsaydı uygulama açılışta çökerdi)
  - AAB'de dil bölünmesi kapatıldı (uygulama içi dil değiştirme bozulmasın diye)
- **iOS platformu eklendi** (`ios/`) — bundle ID, sürüm (2.5.70 / 20570), izin açıklamaları (kamera, fotoğraf kitaplığı, izleme/ATT), AdMob iOS TEST App ID, `ITSAppUsesNonExemptEncryption=false`, SKAdNetwork girdisi.
- **İkon + splash setleri üretildi** — `resources/icon.svg` kaynağından `npm run assets:generate` ile:
  - Android: tüm yoğunluklar için `ic_launcher`, `ic_launcher_round`, adaptif foreground + lacivert arka plan
  - iOS: 1024 AppIcon, 2732×2732 splash
  - Mağaza görselleri: `resources/store/play-icon-512.png`, `play-feature-graphic-1024x500.png`, `app-store-icon-1024.png`
- **Gizlilik politikası sayfası** — `public/privacy-policy.html` (TR + EN), hesap silme/veri silme bölümü dahil (Play zorunluluğu).
- **AdMob eklentisi 6.x → 7.2** — 6.x Capacitor 6 içindi, Capacitor 7 ile derlenmiyordu.
- **CI güncellendi** — `.github/workflows/android-release.yml` artık Java 21 kullanıyor (Capacitor 7 şartı; eski Java 17 ile derleme patlıyordu) ve Play'in istediği **AAB**'yi üretiyor (eski workflow yalnızca APK üretiyordu). Secret adları aynı kaldı.
- **Sürüm meta-verisi senkronize edildi** — `src/lib/appVersion.ts` artık gerçek paket adını ve build numarasını gösteriyor.

---

## ✅ Çözüldü: Git LFS görselleri kayıp

Daha önce 38 görsel Git LFS işaretçisi olarak duruyordu ve LFS nesneleri sunucuda yoktu (404). Bunların çoğu (`src/assets/maritime/*`, `src/assets/weather/*` bulut fotoğrafları, `public/lovable-uploads/*`, navigasyon görselleri) sonradan **gerçek dosya** olarak yeniden eklendi.

Geriye kalan 7 kırık işaretçi bu branch'te temizlendi:
- 6'sı uygulamada kullanılmıyordu → silindi (`placeholder.svg`, `maritime-home-background.svg`, `sextant-{complete,drawn,exact,realistic}.svg`).
- `maritime-logo.svg` (`index.html` JSON-LD logosu) → uygulama ikonu tasarımından türetilmiş gerçek, kendi kendine yeten SVG olarak yeniden yazıldı.

Repoda artık LFS işaretçisi kalmadı; taze clone/CI build'i tüm görselleri düzgün üretir.

---

## ⚠️ Uygulama boyutu (takip gerekiyor)

`npm run build` sonrası `dist/` ~**373 MB**; bunun ~**244 MB'ı** `public/locales/*.json` (24 dil × ~10 MB, çevrimdışı çeviri için bundle'a gömülü). Sıkıştırılmış AAB'de bile locale'ler ~80–106 MB; videolar (~41 MB) ve görsellerle birlikte teslim edilen uygulama 200 MB'a yaklaşır, **kurulu boyut ~373 MB+** olur.

- Google Play temel APK indirme limitlerini zorlayabilir.
- Büyük indirme, kurulum vazgeçme oranını artırır.

Bu, çevrimdışı çeviri tasarımının doğal sonucu (her dil paketi gömülü). Şimdilik olduğu gibi bırakıldı. İleride küçültmek için seçenekler: (a) locale JSON'larını CDN'den indirmeye çevirmek (kod zaten fetch tabanlı — `src/utils/staticTranslations.ts`), (b) yalnızca popüler dilleri gömüp gerisini ilk seçimde indirmek. Karardan önce imzalı AAB üretip Play'in bildirdiği gerçek indirme boyutuna bakmak faydalı olur.

---

## 📋 Sizin tamamlamanız gerekenler

### Ortak (her iki mağaza)

1. **Gizlilik politikası URL'i**: Uygulama web'e deploy edildiğinde `https://<alan-adınız>/privacy-policy.html` erişilebilir olacak. Bu URL'i her iki konsola girin. İçerikteki iletişim e-postasını kontrol edin.
2. **GoogleAuth `serverClientId`**: `capacitor.config.ts` içindeki değer hâlâ **placeholder** (`...xxxx...`). Google Cloud Console'dan gerçek Web Client ID ile değiştirin, yoksa Google ile giriş native'de çalışmaz.
3. **AdMob**: Gerçek reklam kullanacaksanız manifest ve Info.plist'teki TEST App ID'lerini AdMob Console'daki gerçek ID'lerle değiştirin (dosyalarda yorum satırıyla işaretli). Reklam kullanmayacaksanız `@capacitor-community/admob` paketini kaldırmak hem boyutu küçültür hem mağaza beyanlarını sadeleştirir.
4. **Ekran görüntüleri**: Telefon (en az 2; 1080×1920+) ve varsa tablet/iPad. Feature graphic hazır: `resources/store/play-feature-graphic-1024x500.png`.

### Google Play

1. **Keystore oluşturun** (bir kez, asla kaybetmeyin):
   ```bash
   keytool -genkey -v -keystore marine-expert-pro.keystore \
     -alias marine-key -keyalg RSA -keysize 2048 -validity 10000
   ```
2. **GitHub secrets ekleyin**: `ANDROID_KEYSTORE_BASE64` (=`base64 -w0 marine-expert-pro.keystore`), `ANDROID_KEYSTORE_PASSWORD`, `ANDROID_KEY_ALIAS`, `ANDROID_KEY_ALIAS_PASSWORD`. Sonra Actions'tan **Android Release** workflow'unu çalıştırın → imzalı `.aab` artifact'ını indirin. (Yerelde: `npm run android:bundle`.)
3. **Play Console** ([console.play.google.com](https://play.google.com/console), $25 tek seferlik):
   - Create app → "Marine Expert Pro", Türkçe, App, Free
   - **Data safety formu** (aşağıdaki taslak cevaplar)
   - **İçerik derecelendirmesi (IARC)** anketi → muhtemelen "Everyone"
   - **Hesap silme URL'i**: privacy policy URL'ini gösterin (bölüm 5'te açıklanıyor)
   - Internal testing → AAB yükle → test → Production rollout

**Data safety taslak cevapları** (mevcut uygulama davranışına göre):

| Soru | Cevap |
|---|---|
| Veri topluyor mu? | Evet |
| Toplanan | E-posta adresi, ad (yalnızca hesap açanlar için) |
| Amaç | Hesap yönetimi / kimlik doğrulama |
| Üçüncü tarafla paylaşım | Hayır (Supabase işleyici sıfatıyla) |
| Aktarımda şifreleme | Evet (HTTPS) |
| Silme talebi imkânı | Evet (uygulama içi + e-posta) |
| Konum / kişiler / analitik | Toplanmıyor |
| Reklam | TEST ID ile reklam gösterilmiyorsa "Hayır"; gerçek AdMob açılırsa "Evet" + reklam SDK beyanları |

### App Store (macOS gerekir)

1. **Apple Developer Program** üyeliği ($99/yıl).
2. macOS'ta:
   ```bash
   npm install && npm run build
   npx cap sync ios
   cd ios/App && pod install
   npx cap open ios
   ```
3. Xcode'da: Signing & Capabilities → Team seçin (bundle ID `com.maritime.calculator` otomatik). Push kullanılacaksa Push Notifications capability + APNs anahtarı ekleyin.
4. **App Store Connect**: yeni uygulama oluşturun (aynı bundle ID), Product → Archive → Distribute ile TestFlight'a yükleyin.
5. **App Privacy etiketleri** (Play data safety ile aynı cevaplar): Email Address + Name → "Linked to you" / "App Functionality"; tracking yok (gerçek AdMob açılırsa ATT ve tracking beyanı gerekir — `NSUserTrackingUsageDescription` hazır).
6. İnceleme notlarına test hesabı bilgisi eklemeyi unutmayın (giriş isteyen özellikler için).

---

## 🏪 Mağaza metinleri (taslak)

**Kısa açıklama (80 kr):** Denizciler için hesaplama, seyir ve eğitim asistanı — stabilite, trim, COLREG.

**Uzun açıklama:**
> Marine Expert Pro, denizcilik profesyonelleri ve öğrencileri için kapsamlı bir hesaplama ve eğitim uygulamasıdır.
>
> • Stabilite hesaplamaları (GM, BM, KM), trim ve boyuna stabilite
> • Hidrostatik ve hidrodinamik hesaplamalar
> • Navigasyon ve seyir hesaplamaları, geçiş planlama
> • COLREG, MARPOL ve denizcilik mevzuatı içerikleri
> • Meteoroloji: bulut tipleri, uydu kanalları
> • Göksel seyir (yıldız/sekstant) araçları
> • AI destekli soru-cevap asistanı
> • Çevrimdışı çalışma desteği, çoklu dil

Kategori: Eğitim (veya Araçlar) · Yaş: 13+ / 4+ (IARC anketi belirler)

---

## 🔁 Sürüm yükseltme rutini

Her mağaza sürümünde birlikte artırın:
1. `package.json` → `version`
2. `src/lib/appVersion.ts` → `APP_VERSION`, `BUILD_NUMBER`
3. `android/app/build.gradle` → `versionCode`, `versionName`
4. `ios/App/App.xcodeproj/project.pbxproj` → `MARKETING_VERSION`, `CURRENT_PROJECT_VERSION`

İkon değişirse: `resources/icon.svg` düzenleyin → `npm run assets:generate`.
