# 📦 Mağaza Hazırlık Durumu — Mariner's Book

> Google Play + App Store yayın hazırlığının güncel durumu.
> Bu branch'te yapılan teknik hazırlıklar ve sizin tamamlamanız gereken adımlar.

**Uygulama kimliği**

| Alan | Değer |
|---|---|
| Uygulama adı | Mariner's Book |
| Paket adı / Bundle ID | `com.marinersbook.app` |
| Sürüm | 2.5.70 (versionCode / build: 20570) |
| Min SDK / Target SDK | 23 / 36 (Android 16 — Play'in 31 Ağustos 2026 zorunluluğu) |
| Gizlilik politikası | `public/privacy-policy.html` → yayında: `https://nauticalleap.com/privacy-policy.html` |

---

## ✅ Bu branch'te tamamlananlar

- **`capacitor.config.ts` üretime hazırlandı** — `appId: com.marinersbook.app`, uzak `server.url` kaldırıldı (mağaza incelemesinde ret sebebiydi), release tipi AAB yapıldı. `capacitor.config.prod.ts` gereksizleşti, silindi.
- **Android platformu eksiksiz üretildi** — daha önce repoda yalnızca birkaç üretilmiş dosya vardı (build.gradle, AndroidManifest, MainActivity yoktu). Artık `android/` komple derlenebilir durumda:
  - `versionCode 20570`, `versionName "2.5.70"`
  - Release imzalama: `android/keystore.properties` (gitignored) veya `KEYSTORE_FILE/KEYSTORE_PASSWORD/KEY_ALIAS/KEY_PASSWORD` ortam değişkenleri. Şablon: `android/keystore.properties.example`
  - Manifest izinleri: `INTERNET`, `ACCESS_NETWORK_STATE`, `ACCESS_FINE_LOCATION`, `ACCESS_COARSE_LOCATION` (AdMob SDK'sının otomatik eklediği `com.google.android.gms.permission.AD_ID` reklamlar kapalı olduğu için `tools:node="remove"` ile çıkarıldı)
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

### Yayın öncesi ikinci tur

- **Yapay zekâ içeriği bildirme mekanizması eklendi** — Play'in Üretken Yapay Zekâ politikası bunu zorunlu tutuyordu ve hiçbir AI ekranında yoktu. `ReportAiContentButton` beş yüzeye de bağlandı (AI Eğitmen, Açıkla popup'ı, Denizcilik Asistanı, Asistan arayüzü, Stabilite asistanı); bildirimler `ai_content_reports` tablosuna yazılıyor (RLS: kullanıcı yalnızca kendi bildirimini yazar/okur).
- **Firebase tamamen kaldırıldı** — `google-services.json` (kök + `android/app/`), `com.google.gms:google-services` classpath'i, `app/build.gradle`'daki apply bloğu ve `FIREBASE_SETUP.md`. Projede tek bir Firebase SDK'sı kurulu değildi; sadece derlemeye giriyor ve API anahtarını repoda taşıyordu. Anahtarın Google Cloud'dan silinmesi gerekiyor (bkz. `SECURITY.md`).
- **AdMob kimlikleri CI'ya bağlandı** — `android-release.yml` artık `ADMOB_*` secret'larını hem Vite build'ine hem Gradle'a geçiriyor. Secret yoksa davranış değişmiyor (TEST reklamı), ama artık gerçek kimlik girmek için kod değişikliği gerekmiyor. Şablon: `android/admob.properties.example`.
- **Reklamlar build-time anahtarla kapatıldı (`VITE_ADS_ENABLED`, varsayılan kapalı)** — ilk sürüm reklamsız çıkacak. Daha önce AdMob kimlikleri boş bırakıldığında reklamlar kapanmıyor, Google'ın **TEST** reklamları gösteriliyordu; mağaza sürümünde bu bir AdMob politikası ihlaliydi. Artık anahtar açıkça `true` değilse `areAdsSupported()` false döner ve tek kapıdan geçen tüm yollar kapanır: SDK `initialize` edilmez, UMP onay formu açılmaz, banner/geçiş reklamı istenmez, `--ad-banner-height` `0px`'te kalır (`MobileLayout` alt boşluk açmaz), Ayarlar'daki "Reklamlar ve Gizlilik" kartı görünmez. Manifest'teki AdMob `APPLICATION_ID` meta-data'sı **bilinçli olarak duruyor** — SDK pakette bağımlılık olduğu için eksik olsa uygulama açılışta çökerdi. Buna karşılık `com.google.android.gms.permission.AD_ID` izni `tools:node="remove"` ile kaldırıldı: SDK hiç başlatılmadığı için reklam kimliği okunmuyor, izni pakette taşımak Play beyanıyla çelişirdi (doğrulandı — manifest-merger raporunda izin `play-services-ads-api`, `play-services-ads-identifier` ve `play-services-measurement-sdk-api`'den `REJECTED`, birleşmiş manifest'te yok). **Reklam açılırken bu satır silinmelidir.** CI'daki `ADMOB_*` aktarımları da duruyor; anahtar kapalıyken etkisizler, reklam açılacağında yalnızca `ADS_ENABLED` variable'ını `true` yapmak yeterli. Ayrıntı: `ADVERTISEMENT_SETUP.md`.
- **Ölü içerik temizlendi** — `public/videos/gemici/*.mp4` (15 dosya, 42.7 MB; knot videoları YouTube'dan geliyor, bu dosyalar hiç referanslanmıyordu), `Nautical-Almanac-2025.pdf` (PDF değil, kaydedilmiş bir bot-engelleme HTML sayfası) ve `MARPOL-Consolidated-2023-Overview.pdf` (tek sayfalık yer tutucu). Sıkıştırılmış paket 180.7 MB → 141.1 MB (ölçüldü).
- **Data safety cevapları koda göre yeniden yazıldı** — önceki taslak "yalnızca e-posta + ad" diyordu; gerçekte belge fotoğrafı, sınav sonuçları, satın alma, AI sohbeti, konum ve reklam kimliği de var. Yanlış beyan askıya alma sebebi olduğu için aşağıdaki tablo tek tek koddaki akışlara dayandırıldı.

---

## ✅ Çözüldü: Git LFS görselleri kayıp

Daha önce 38 görsel Git LFS işaretçisi olarak duruyordu ve LFS nesneleri sunucuda yoktu (404). Bunların çoğu (`src/assets/maritime/*`, `src/assets/weather/*` bulut fotoğrafları, `public/lovable-uploads/*`, navigasyon görselleri) sonradan **gerçek dosya** olarak yeniden eklendi.

Geriye kalan 7 kırık işaretçi bu branch'te temizlendi:
- 6'sı uygulamada kullanılmıyordu → silindi (`placeholder.svg`, `maritime-home-background.svg`, `sextant-{complete,drawn,exact,realistic}.svg`).
- `maritime-logo.svg` (`index.html` JSON-LD logosu) → uygulama ikonu tasarımından türetilmiş gerçek, kendi kendine yeten SVG olarak yeniden yazıldı.

Repoda artık LFS işaretçisi kalmadı; taze clone/CI build'i tüm görselleri düzgün üretir.

---

## 📏 Uygulama boyutu

Play'in app bundle indirme boyutu üst sınırı **200 MB**; aşan AAB yüklenemez.
Aşağıdaki tablo `npm run build:native` sonrası `dist/` üzerinde, her dosya tek
tek gzip'lenerek **yeniden ölçüldü** (Play'in hesabına yakın bir vekil):

| Bölüm | Ham | Sıkıştırılmış |
|---|---|---|
| `public/locales` (**24 dil**) | 326.8 MB | **111.6 MB** |
| `dist/assets` (JS/CSS/görsel) | 38.5 MB | 26.9 MB |
| `passage-plan` (44 sayfa JPEG) | 8.8 MB | 7.6 MB |
| `env` (sky_1k.hdr) | 1.4 MB | 0.9 MB |
| diğer (navigation, fonts, knots, kök…) | 2.3 MB | 2.1 MB |
| **`dist` toplamı (ölçülen)** | **377.8 MB** | **149.1 MB** |

**Marj: ~51 MB.** Sınır aşılmıyor, yani boyut yayını bloklamıyor — ama trend
yanlış yönde: bir önceki ölçümde toplam 141.1 MB idi ve locale paketleri
18 dil / 56.5 MB olarak kayıtlıydı. Diller 24'e çıkıp içerik korpusu da
çevrildiği için locale'ler tek başına **sıkıştırılmış boyutun %75'i**
(dil başına ~92.000 anahtar, dosya başına 13–21 MB).

Pratik sonuç: **yeni dil eklemek artık ~4–5 MB sıkıştırılmış maliyet
demek.** Bu hızla 10–12 dil daha eklenirse sınıra dayanılır. Sınıra
yaklaşılırsa ilk aday locale paketleridir; kod zaten fetch tabanlı
(`src/utils/staticTranslations.ts`) ama **uzağa taşımak çevrimdışı dil
değiştirmeyi bozar**: native profilde service worker üretilmiyor, yani
dosyaları pakette tutmak dışında bir çevrimdışı önbellek yok. Taşımadan önce
runtime cache kurulmalı.

Kesin rakam ilk AAB yüklendiğinde Play Console'da görünür; oradaki değeri
esas alın.

---

## ⚠️ Karar bekleyen: üçüncü taraf içerik telifi

**Güncelleme:** Bu bölümde daha önce listelenen iki PDF
(`public/navigation/pdfs/DN2025SES1112.pdf` ve `public/COLREG-Ders-Sunumu.pdf`)
artık pakette **yok** — `dist/` içinde tek bir PDF kalmadı ve bunlara atıf
yapan `src/data/dn2025ses1112.ts` de silinmiş durumda. Bu iki kalem kapandı.

Yerine bakılması gereken **tek** kalem kaldı:

| İçerik | Boyut | Kaynak | Durum |
|---|---|---|---|
| `public/passage-plan/page_1…44.jpg` | 8.8 MB (44 sayfa) | Great Lakes Pilotage Authority (Kanada Hükümeti), District No. 2 — "Upbound Port Weller to Port Huron" | Sayfada kaynak yazılı, izin bilinmiyor |

Bu, resmî bir Kanada hükümeti yayınının **birebir taranmış tam metni**;
`PassagePlanPage.tsx` içinde 44 sayfa olarak gömülü gösteriliyor. Sayfada
kaynak adı ("Great Lakes Pilotage Authority - District No. 2") ve
"Navigasyon için kullanılmaz" notu var — yani silinen PDF'lerin aksine
atıf mevcut. Ancak Kanada'da hükümet yayınları **Crown copyright** kapsamında:
ticari olmayan çoğaltma serbest, **ticari yeniden dağıtım izin ister** ve
uygulamanın ücretli bir Pro katmanı var.

Bu Play tarafında otomatik yakalanan bir şey değildir; risk, hak sahibinin
şikâyeti üzerine kaldırma bildirimidir. Üç seçenek: (a) Great Lakes Pilotage
Authority'den yazılı izin alın, (b) 44 sayfayı paketten çıkarıp kaynağa link
verin, (c) örnek planı kendi çiziminizle yeniden üretin. İlk sürümü bu haliyle
çıkarmak savunulabilir bir risk — ama bilinçli alınmış bir karar olmalı.

**Ayrıca depo hijyeni:** `tmp/DN2025SES1112.pdf` (29 MB MEB ders materyali)
hâlâ git'te **takipli**. Uygulama paketine girmiyor (yalnızca `public/`
paketlenir), o yüzden Play açısından sorun değil; ama depoyu 29 MB şişiriyor
ve `.gitignore` yalnızca `tmp/validation-test/` satırını içeriyor. Silinmesi
ve `tmp/` tamamen yok sayılması önerilir.

---

## 📋 Sizin tamamlamanız gerekenler

### Ortak (her iki mağaza)

1. **Gizlilik politikası URL'i**: `https://nauticalleap.com/privacy-policy.html` yayında ve hesap silme bölümünü içeriyor. **Ama yayındaki metin repodakinden eski** — Play'e girmeden önce siteyi güncel `main`'den yeniden deploy edin, yoksa beyan ettiğiniz politika ile uygulamanın gerçek davranışı ayrışır.
2. **Reklamlar — ilk sürümde KAPALI, sonra açmak için**: `VITE_ADS_ENABLED` anahtarı varsayılan olarak kapalıdır; ilk sürüm için yapılacak bir şey yok, uygulama hiç reklam göstermez. Reklamı açacağınız sürümde **ikisi birden** gerekir: (a) GitHub → Settings → Variables → `ADS_ENABLED=true` (yerelde `.env` içinde `VITE_ADS_ENABLED=true`), (b) GitHub → Settings → Secrets: `ADMOB_APP_ID_ANDROID`, `ADMOB_BANNER_ID_ANDROID`, `ADMOB_INTERSTITIAL_ID_ANDROID` (+ iOS karşılıkları); yerelde `android/admob.properties` (şablon: `admob.properties.example`) ve `.env`. **Anahtarı kimlikler olmadan açarsanız üretilen AAB Google'ın TEST reklamlarını gösterir; bu hem gelir üretmez hem de AdMob politikası ihlalidir.** Reklamı açtığınız sürümde Play/App Store reklam beyanlarını da güncellemeniz gerekir (aşağıya bkz.).
3. **Ekran görüntüleri**: Telefon (en az 2; 1080×1920+) ve varsa tablet/iPad. Feature graphic hazır: `resources/store/play-feature-graphic-1024x500.png`.
   ⚠️ `FLAG_SECURE` (`MainActivity.java`) ekran görüntüsünü tamamen engeller — mağaza görsellerini cihazdan **alamazsınız**. Web sürümünden alın veya geçici olarak bayrağı kapatın. Play'in Pre-launch report görüntüleri de siyah çıkacaktır, bu normaldir.
4. **Google OAuth consent screen**: Uygulamada Google ile giriş açık (`Auth.tsx`). Google Cloud Console'da consent screen **"In production"** olmalı; "Testing" modunda kalırsa yalnızca test kullanıcıları giriş yapabilir. Supabase → Authentication → Redirect URLs listesinde `com.marinersbook.app://auth/callback` bulunmalı (`authFlow.ts:10` bunu gönderiyor).

### Google Play

1. **Keystore oluşturun** (bir kez, asla kaybetmeyin):
   ```bash
   keytool -genkey -v -keystore marine-expert-pro.keystore \
     -alias marine-key -keyalg RSA -keysize 2048 -validity 10000
   ```
2. **GitHub secrets ekleyin**: `ANDROID_KEYSTORE_BASE64` (=`base64 -w0 marine-expert-pro.keystore`), `ANDROID_KEYSTORE_PASSWORD`, `ANDROID_KEY_ALIAS`, `ANDROID_KEY_ALIAS_PASSWORD`. Sonra Actions'tan **Android Release** workflow'unu çalıştırın → imzalı `.aab` artifact'ını indirin. (Yerelde: `npm run android:bundle`.)
3. **Play Console** ([console.play.google.com](https://play.google.com/console), $25 tek seferlik):
   - Create app → "Mariner's Book", Türkçe, App, Free
   - **Data safety formu** (aşağıdaki tablo)
   - **İçerik derecelendirmesi (IARC)** anketi
   - **Hesap silme URL'i**: `https://nauticalleap.com/privacy-policy.html` (bölüm 6)
   - **App access**: Belge takibi, Pro ve AI özellikleri `RequireAuth` arkasında — inceleme ekibine **demo hesap** girin, yoksa reddedilir
   - **Reklam içerir: Hayır** — `VITE_ADS_ENABLED` kapalı olduğu sürece uygulama hiç reklam göstermiyor (bkz. yukarıdaki 2. madde). **Reklam kimliği (AD_ID) beyanı: Hayır** — `com.google.android.gms.permission.AD_ID` izni `tools:node="remove"` ile manifest'ten kaldırıldığı için AAB'ye hiç girmiyor (doğrulandı: manifest-merger raporunda üç kütüphaneden de `REJECTED`). Reklamı açtığınız sürümde ikisini de **Evet**'e çevirin ve manifest'teki kaldırma satırını silin.
   - Internal testing → AAB yükle → test → Production rollout

4. **⏳ Kapalı test zorunluluğu** — hesabı **kişisel** (organizasyon değil) olarak
   açtıysanız ve 13 Kasım 2023'ten sonra oluşturulduysa, production erişimi için
   **en az 12 test kullanıcısıyla 14 gün kesintisiz kapalı test** yapmanız gerekir.
   Takvimi belirleyen adım budur; en başta başlatın.

5. **Satın alma altyapısı** (yoksa para ödeyen kullanıcıda Pro açılmaz):
   - **Ürünler**: `pro_monthly`, `pro_yearly` (abonelik) ve `pro_lifetime`
     (tek seferlik). Kimlikler kodda birebir bekleniyor (`src/config/products.ts`).
   - **Servis hesabı**: Google Cloud'da JSON anahtar → Play Console → Users and
     permissions'a davet (Financial data + Manage orders) → Supabase secret
     `GOOGLE_PLAY_SERVICE_ACCOUNT_JSON`. `verify-purchase` bunu kullanır.
   - **RTDN**: Pub/Sub topic + push subscription →
     `https://<proje>.supabase.co/functions/v1/play-rtdn?secret=<PLAY_RTDN_SECRET>`.
     Yoksa iptal/iade/yenileme olayları entitlement tablosuna işlenmez.
   - **Payments profili**, vergi ve banka bilgileri. IAP'li uygulamalarda
     geliştirici adresi mağaza sayfasında herkese açık gösterilir.

**Data safety cevapları.** Tek doğru kaynak `public/privacy-policy.html`
bölüm 2–3'tür; form oradan doldurulmalıdır. Beyan ile gerçek davranışın
uyuşmaması Play'de **askıya alma** sebebidir, o yüzden aşağıdaki tablo
koddaki gerçek akışlara dayandırılmıştır:

| Play kategorisi | Beyan | Neden (koddaki kaynak) |
|---|---|---|
| Kişisel bilgiler → E-posta, Ad | Toplanıyor, hesaba bağlı | Supabase kimlik doğrulama (`useAuth.tsx`) |
| Kişisel bilgiler → Diğer | Toplanıyor, hesaba bağlı | Denizcilik belgesindeki ad, belge no, veren kurum (`documentTracker.ts`) |
| Fotoğraflar / Dosya ve belgeler | Toplanıyor, hesaba bağlı | Belge fotoğrafı özel bucket'a yükleniyor (`documentTracker.ts:202`) |
| Uygulama etkinliği → Diğer | Toplanıyor, hesaba bağlı | Sınav sonuçları, kategori istatistikleri |
| Uygulama etkinliği → Kullanıcı içeriği | Toplanıyor + **paylaşılıyor** | AI sohbet metinleri Google Gemini'ye gidiyor (`gemini-chat`) |
| Finansal bilgiler → Satın alma geçmişi | Toplanıyor, hesaba bağlı | `purchaseToken` / sipariş no (`verify-purchase`) |
| Konum → Yaklaşık + Kesin | Toplanıyor, hesaba bağlı DEĞİL | `ACCESS_FINE/COARSE_LOCATION`; sunucuda saklanmaz, hava/gelgit servisine anlık iletilir |
| Cihaz veya diğer kimlikler | **Toplanmıyor** (ilk sürüm) | AdMob reklam kimliği yalnızca reklamlar açıkken toplanır; `VITE_ADS_ENABLED` kapalı olduğu için SDK hiç başlatılmıyor. Reklam açıldığında: "Toplanıyor" (yalnızca ücretsiz paket) |
| Aktarımda şifreleme | Evet | Tümü HTTPS; cleartext manifest'te kapalı |
| Silme talebi | Evet | Uygulama içi (`Settings.tsx:57` → `delete-account`) + e-posta |
| Analitik / çökme izleme | Toplanmıyor | Projede analitik SDK'sı yok |

Ayrıca **App content** altında: "Uygulama reklam içerir → **Hayır**" ve
**reklam kimliği (AD_ID) beyanı → Hayır** — `VITE_ADS_ENABLED` kapalı olduğu
için ilk sürümde hiç reklam yok (test reklamı da reklamdır; anahtar zaten bu
yüzden eklendi) ve AD_ID izni pakete hiç girmiyor.

Reklamı açtığınız sürümde geri çevrilecekler: bu iki cevap **Evet**, yukarıdaki
"Cihaz veya diğer kimlikler" satırı "Toplanıyor" ve `AndroidManifest.xml`'deki
AD_ID kaldırma satırının silinmesi (bkz. `ADVERTISEMENT_SETUP.md` → "Test
reklamlarından canlıya geçiş", adım 3).

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
