# 📦 Mağaza Hazırlık Durumu — Mariner's Book

> Google Play + App Store yayın hazırlığının güncel durumu.
> Bu branch'te yapılan teknik hazırlıklar ve sizin tamamlamanız gereken adımlar.

**Uygulama kimliği**

| Alan | Değer |
|---|---|
| Uygulama adı | Mariner's Book |
| Paket adı / Bundle ID | `com.marinersbook.app` |
| Sürüm | 2.5.70 (versionCode / build: 20570) |
| Min SDK / Target SDK | 23 / 35 |
| Gizlilik politikası | `public/privacy-policy.html` → yayınlanınca `https://<alan-adınız>/privacy-policy.html` |

---

## ✅ Bu branch'te tamamlananlar

- **`capacitor.config.ts` üretime hazırlandı** — `appId: com.marinersbook.app`, uzak `server.url` kaldırıldı (mağaza incelemesinde ret sebebiydi), release tipi AAB yapıldı. `capacitor.config.prod.ts` gereksizleşti, silindi.
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

## ⚠️ Kritik bulgu: Git LFS görselleri kayıp

Repodaki **38 görsel dosya** (`public/maritime-logo.svg`, tüm `sextant-*` görselleri, `src/assets/maritime/*`, `src/assets/weather/*` bulut fotoğrafları, `public/lovable-uploads/*`) Git LFS işaretçisi olarak duruyor ama **LFS nesneleri sunucuda yok (404)** — hiç push edilmemişler. Yani:

- Taze bir clone'dan yapılan her build'de (CI dahil) bu görseller **bozuk** çıkar.
- Meteoroloji dersindeki bulut fotoğrafları vb. uygulamada görünmez.

**Çözüm:** Bu dosyaların gerçek kopyaları hangi makinede varsa oradan `git lfs push --all origin` yapın, ya da dosyaları normal git dosyası olarak yeniden ekleyin. Mağaza sürümünden önce mutlaka düzeltilmeli.

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
   - Create app → "Mariner's Book", Türkçe, App, Free
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
3. Xcode'da: Signing & Capabilities → Team seçin (bundle ID `com.marinersbook.app` otomatik). Push kullanılacaksa Push Notifications capability + APNs anahtarı ekleyin.
4. **App Store Connect**: yeni uygulama oluşturun (aynı bundle ID), Product → Archive → Distribute ile TestFlight'a yükleyin.
5. **App Privacy etiketleri** (Play data safety ile aynı cevaplar): Email Address + Name → "Linked to you" / "App Functionality"; tracking yok (gerçek AdMob açılırsa ATT ve tracking beyanı gerekir — `NSUserTrackingUsageDescription` hazır).
6. İnceleme notlarına test hesabı bilgisi eklemeyi unutmayın (giriş isteyen özellikler için).

---

## 🏪 Mağaza metinleri (taslak)

**Kısa açıklama (80 kr):** Denizciler için hesaplama, seyir ve eğitim asistanı — stabilite, trim, COLREG.

**Uzun açıklama:**
> Mariner's Book, denizcilik profesyonelleri ve öğrencileri için kapsamlı bir hesaplama ve eğitim uygulamasıdır.
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
