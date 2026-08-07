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
- **Oturum**: Supabase oturumu WebView localStorage'ında tutulur;
  Android'de `allowBackup=false` ile yedek üzerinden sızması engellenir.

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
  `console.error` ile sunucu logunda kalır (harici servis/fetch hataları
  dahil).
- **Girdi doğrulama**: Gövde alanları tip + uzunluk + beyaz liste ile
  doğrulanır (`gemini-chat` mesaj şeması, `batch-content-writer` hedef
  şeması).
- **CORS**: Yalnızca `getCorsHeaders(origin)`; `*` kullanılmaz, yanıtlar
  `Vary: Origin` taşır.

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
