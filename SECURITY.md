# Güvenlik Önlemleri — Mariner's Book

Bu belge uygulamanın dış saldırılara karşı koruma katmanlarını özetler ve
yeni kod eklerken uyulması gereken kuralları tanımlar.

## ⚠️ Acil aksiyon gerektiren geçmiş sızıntı

`test-gemini-api.js` dosyasında gerçek bir Gemini API anahtarı commit'lenmişti
(`AIzaSyDZ81...` ile başlayan). Anahtar koddan kaldırıldı ancak **git geçmişinde
hâlâ görülebilir durumda**. Yapılması gereken:

1. [Google AI Studio](https://aistudio.google.com/apikey) veya Google Cloud
   Console'dan bu anahtarı **iptal edin (revoke)** ve yenisini üretin.
2. Yeni anahtarı yalnızca Supabase Secrets'a (`GEMINI_API_KEY`) koyun —
   asla repoya commit etmeyin.

## Firebase kaldırıldı

Repoda `google-services.json` (hem kökte hem `android/app/` altında), bir
`com.google.gms:google-services` Gradle eklentisi ve bir `FIREBASE_SETUP.md`
duruyordu; hiçbiri kullanılmıyordu. Uygulama kimlik doğrulama, veritabanı ve
depolama için yalnızca Supabase kullanır, push bildirimi göndermez ve projede
tek bir Firebase SDK'sı kurulu değildir. Üçü de kaldırıldı.

Firebase API anahtarı türü gereği gizli değildir (istemci tanımlayıcısıdır),
ama artık kullanılmayan bir projeye ait olduğu ve git geçmişinde kaldığı için
**Google Cloud Console'dan `maritime-calculator` projesindeki anahtarı silin**
(ya da proje tamamen atılsın). Yalnızca kısıtlamak yeterli değil: kullanılmayan
bir anahtarı yaşatmanın hiçbir faydası yok.

## İstemci (web / Capacitor WebView)

- **Content-Security-Policy**: Üretim build'ine `vite.config.ts` içindeki
  `cspPlugin` tarafından `<meta>` olarak enjekte edilir. Enjekte edilmiş
  harici script'ler (XSS'in ana vektörü) engellenir; yalnızca
  `@vitejs/plugin-legacy`'nin hash'lenmiş inline snippet'lerine izin verilir.
  Yeni bir harici servis eklerken ilgili yönergeye (connect-src, frame-src…)
  alan adını eklemeniz gerekir — aksi hâlde üretimde istek sessizce engellenir.
- **Referrer-Policy**: `strict-origin-when-cross-origin` (index.html).
- **XSS**: `dangerouslySetInnerHTML` yalnızca DOMPurify ile temizlenmiş SVG
  (diagram-viewer) veya önce HTML-escape edilmiş metin (haber okuyucu) için
  kullanılır. Yeni kullanım eklemeyin; gerekiyorsa DOMPurify'dan geçirin.
- **postMessage**: Dinleyiciler `event.source` doğrulaması yapar
  (routeHarvester). Yeni dinleyicilerde kaynak/origin kontrolü zorunludur.
- **Oturum**: Native kabuklarda Supabase oturumu Android Keystore / iOS
  Keychain arkasında şifreli tutulur (`src/lib/secureSessionStorage.ts` →
  `@aparajita/capacitor-secure-storage`; AES/GCM, anahtar `AndroidKeyStore`
  içinde üretilir ve TEE/StrongBox olan cihazlarda donanımdan çıkmaz).
  Root'lanmış bir cihazda SharedPreferences dosyası okunsa bile yalnızca
  şifreli metin görünür. Web/PWA'da karşılığı olmadığı için oturum
  localStorage'da kalır. Android'de ayrıca `allowBackup=false`.
  Eklenti yüklenemezse (web, `cap sync` yapılmamış kabuk) adaptör
  localStorage'a düşer — kullanıcı kilitlenmez, koruma seviyesi eski hâline
  döner ve konsola uyarı yazılır.

## Edge Functions (Supabase)

Paylaşılan yardımcılar `supabase/functions/_shared/` altındadır ve yeni
fonksiyonlarda kullanılmaları zorunludur:

| Modül | Görev |
|---|---|
| `auth.ts` | `validateAuth` (JWT → kullanıcı), jenerik hata mesajları |
| `cors.ts` | Origin allowlist'li CORS (`getCorsHeaders`) — wildcard yok |
| `ssrf.ts` | `assertSafeUrl`: özel/loopback/link-local IP ve iç host engeli |
| `rateLimit.ts` | IP/kullanıcı başına istek freni (`checkRateLimit`) |
| `entitlements.ts` | Faturalama düzeyinde AI kotası (`consumeAiQuota`) |

Kurallar:

- **Kimlik doğrulama**: AI/maliyet üreten her uç `validateAuth` + kota
  kullanır. `verify_jwt=false` yalnızca fonksiyon içinde kendi doğrulamasını
  yapan uçlar için kabul edilir (ör. `play-rtdn` timing-safe paylaşılan sır).
- **SSRF**: Kullanıcıdan URL alan her fetch `assertSafeUrl`'den geçer ve
  yönlendirmeler `redirect: "manual"` ile izlenip **her sıçramada yeniden
  doğrulanır** (`fetch-article` örnek alınmalı). Harici yanıtlardan gelen
  `Location` başlıkları da host allowlist'ine göre süzülür (`tide-forecast`).
- **Kaynak sınırları**: Harici yanıtlar boyut sınırıyla okunur
  (`fetch-article`: 3 MB) ve içerik türü süzülür; zaman aşımı zorunludur.
- **Hata mesajları**: İstemciye yalnızca jenerik mesaj döner; ayrıntı
  `console.error` ile sunucu logunda kalır (Stripe/fetch hataları dahil).
- **Girdi doğrulama**: Gövde alanları tip + uzunluk + beyaz liste ile
  doğrulanır (`gemini-chat` mesaj şeması, `batch-content-writer` hedef
  şeması, `stripe-checkout` priceId/redirect allowlist'i).
- **CORS**: Yalnızca `getCorsHeaders(origin)`; `*` kullanılmaz, yanıtlar
  `Vary: Origin` taşır.

## Kimlik doğrulama

- **İki adımlı doğrulama (TOTP)**: İsteğe bağlıdır, Ayarlar → İki adımlı
  doğrulama'dan açılır (`src/lib/mfa.ts`, `src/components/settings/
  TwoFactorCard.tsx`). Girişte kod adımı hem `Auth.tsx` hem `RequireAuth`
  tarafından uygulanır.
- **İstemci kapısı tek başına yeterli değildir**: çalınmış bir `aal1` jetonu
  PostgREST'e doğrudan konuşabilir. Zorlama veritabanındadır — faktör
  kaydetmiş kullanıcının satırları yalnızca `aal2` jetonuyla açılır
  (`20260807120000_require_aal2_for_mfa_users.sql`, RESTRICTIVE politikalar).
  **Yeni kullanıcı tablosu eklerken bu politikayı da eklemeyi unutmayın**;
  RLS'i açıp AAL politikasını atlamak 2FA'yı o tablo için sessizce devre dışı
  bırakır.
- **Tuzak — RLS engeli hata değil, boş sonuç döndürür.** `aal1` oturumda
  korumalı bir tablodan okuma yapan kod `error` almaz; `data: []` alır. Bu
  sonucu "kullanıcının hiç kaydı yok" diye yorumlayıp yerele yazan her yer
  veriyi bozar (`EntitlementContext` Pro hakkını "free" ile eziyordu; kod
  adımı bitene kadar sorgu atlanarak düzeltildi). Oturumun tamamlanmasını
  beklemeyen yeni bir okuma eklemeyin.
- **TOTP Supabase'de varsayılan olarak KAPALIDIR.** Panelden açılmadan
  uygulamadaki akış çalışmaz — bkz. `docs/supabase-auth-hardening.md`.
- **Panel ayarları** (sızmış şifre koruması, minimum şifre uzunluğu, rate
  limit, e-posta doğrulama, OTP süresi) repoda görünmez. Hedeflenen değerler
  `supabase/config.toml` içindedir ama `supabase config push` çalıştırılmadan
  etkili olmaz; doğrulama listesi `docs/supabase-auth-hardening.md`.
  `Auth.tsx:19`'daki 8 karakter kuralı yalnızca istemci tarafıdır.

## Veritabanı

- Tüm kullanıcı tablolarında RLS etkindir ve politikalar `auth.uid()` ile
  satır sahipliğine bağlıdır. Yeni tablo eklerken RLS'siz bırakmayın.
- `service_role` anahtarı yalnızca edge function ortamında yaşar; istemciye
  yalnızca publishable/anon anahtar gider.

## Android

- `android:allowBackup="false"` — oturum verisinin ADB/bulut yedeğiyle
  dışarı alınması engellenir.
- `network_security_config.xml` — düz metin (HTTP) trafiği tüm API
  seviyelerinde yasak.
- İmzalama anahtarları repoya girmez (`keystore.properties` gitignored).

## Bağımlılıklar

- `npm audit` üretim bağımlılıklarında yüksek önemli açık bırakılmadan
  tutulur (dompurify, react-router, ws, fast-uri, picomatch güncellendi).
- Kalan bilinen uyarılar yalnızca dev-time `@lovable.dev/mcp-js` araç
  zincirindedir (Windows'a özgü path traversal / dev-server senaryoları,
  üretim paketine girmez).
