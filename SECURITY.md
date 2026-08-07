# Güvenlik Önlemleri — Mariner's Book

Bu belge uygulamanın dış saldırılara karşı koruma katmanlarını özetler ve
yeni kod eklerken uyulması gereken kuralları tanımlar.

## Geçmişte commit'lenmiş anahtarlar

**Gemini API anahtarı — temiz.** `test-gemini-api.js` dosyasında bir zamanlar
gerçek bir Gemini anahtarı (`AIzaSyDZ81...`) commit'lenmişti. Dosyanın tüm
geçmiş sürümleri tarandı: anahtar artık **git geçmişinde de yok**, dosya
anahtarı ortam değişkeninden okuyor. (Bu bölüm daha önce anahtarın geçmişte
durduğunu söylüyordu; artık doğru değil.) Anahtar bir kez sızdığı için yine de
iptal edilmiş olmalıdır — emin değilseniz
[Google AI Studio](https://aistudio.google.com/apikey)'dan iptal edip yenisini
üretin ve yalnızca Supabase Secrets'a (`GEMINI_API_KEY`) koyun.

**Firebase istemci anahtarı — geçmişte duruyor, aksiyon gerekiyor.** Silinmiş
`google-services.json` (kök + `android/app/`) ve `FIREBASE_SETUP.md` dosyaları
`AIzaSyBhpu...` ile başlayan anahtarı taşıyordu ve bu **hâlâ git geçmişinden
okunabilir**. Tür gereği gizli değildir (istemci tanımlayıcısıdır), ama
kullanılmayan bir anahtarı yaşatmanın hiçbir faydası yok:
Google Cloud Console → `maritime-calculator` projesinden **anahtarı silin**
(ya da projeyi tamamen kapatın). Yalnızca kısıtlamak yeterli değildir.

Taramayı tekrar etmek için:

```
git log --all -S "AIzaSy" --oneline --name-only
```

## Firebase kaldırıldı

Repoda `google-services.json` (hem kökte hem `android/app/` altında), bir
`com.google.gms:google-services` Gradle eklentisi ve bir `FIREBASE_SETUP.md`
duruyordu; hiçbiri kullanılmıyordu. Uygulama kimlik doğrulama, veritabanı ve
depolama için yalnızca Supabase kullanır, push bildirimi göndermez ve projede
tek bir Firebase SDK'sı kurulu değildir. Üçü de kaldırıldı.

Anahtarın git geçmişinde kalması ve silinmesi gerektiği için bkz. yukarıdaki
"Geçmişte commit'lenmiş anahtarlar".

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
  `console.error` ile sunucu logunda kalır (Play API/fetch hataları dahil).
- **Girdi doğrulama**: Gövde alanları tip + uzunluk + beyaz liste ile
  doğrulanır (`gemini-chat` mesaj şeması, `batch-content-writer` hedef
  şeması, `verify-purchase` ürün kimliği allowlist'i).
- **CORS**: Yalnızca `getCorsHeaders(origin)`; `*` kullanılmaz, yanıtlar
  `Vary: Origin` taşır.

## Kimlik doğrulama — Supabase panel ayarları

Şifreler bu repoda hiçbir yerde tutulmaz, loglanmaz veya elle işlenmez:
uygulama yalnızca `signInWithPassword` / `signUp` çağırır, hash'lemeyi
Supabase (GoTrue, bcrypt) yapar. Buna karşılık **şifre politikası ve giriş
freni koddan değil panelden** yönetilir — `src/pages/Auth.tsx` içindeki
"en az 8 karakter" kuralı yalnızca istemci tarafı bir kolaylıktır ve API'ye
doğrudan istek atan biri için bağlayıcı değildir.

Aşağıdakiler dağıtım öncesi **elle** doğrulanmalıdır (repodan denetlenemezler):

| Ayar | Konum | Olması gereken |
|---|---|---|
| Leaked password protection | Authentication → Policies (Password) | **Açık** (HaveIBeenPwned kontrolü) |
| Minimum password length | Authentication → Policies (Password) | **≥ 8** (istemci kuralıyla eşit) |
| Password requirements | Authentication → Policies (Password) | En az `letters_digits` |
| Confirm email | Authentication → Sign In / Providers → Email | **Açık** |
| Rate limits (sign in/up, token refresh, e-posta) | Authentication → Rate Limits | Varsayılanları düşürmeyin |
| OTP / magic link süresi | Authentication → Sign In / Providers | **≤ 1 saat** |
| Redirect URLs | Authentication → URL Configuration | Yalnızca `https://nauticalleap.com/**` ve `com.marinersbook.app://auth/callback` |

MFA/2FA şu an yok. Şifre + e-posta erişimi olan biri hesaba girebilir;
yüksek riskli hesaplar için ileride TOTP eklenmesi değerlendirilmelidir.

## Veritabanı

- Tüm kullanıcı tablolarında RLS etkindir ve politikalar `auth.uid()` ile
  satır sahipliğine bağlıdır. Yeni tablo eklerken RLS'siz bırakmayın.
- `service_role` anahtarı yalnızca edge function ortamında yaşar; istemciye
  yalnızca publishable/anon anahtar gider.

## Para kazanma sırları (repoda değildir)

Abonelik akışı iki Supabase Secret'ına bağlıdır; eksiklerse kod kusursuz
çalışsa bile kullanıcı **ödeme yapar ama Pro açılmaz**:

- `GOOGLE_PLAY_SERVICE_ACCOUNT_JSON` — yoksa `verify-purchase` 503 döner.
- `PLAY_RTDN_SECRET` — yoksa/yanlışsa `play-rtdn` her bildirimi 401'ler;
  yenileme, iptal, ödeme sorunu ve iade olayları hiç işlenmez.

İkisi de dışarıdan doğrulanabilir:

```
npm run check:billing-config
```

(Gerekli ortam değişkenleri `scripts/check-play-billing-config.mjs`
başındaki açıklamada.) Bu kapı yeşil olmadan mağazaya çıkmayın.

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
