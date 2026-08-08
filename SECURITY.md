# Güvenlik Önlemleri — Mariner's Book

Bu belge uygulamanın dış saldırılara karşı koruma katmanlarını özetler ve
yeni kod eklerken uyulması gereken kuralları tanımlar.

## Git geçmişindeki anahtarlar

Geçmişin tamamı (tüm ref'lerden erişilebilen 243 commit) `AIzaSy[\w-]{10,}`
kalıbıyla tarandı. Çıkan iki eşleşme:

| Anahtar | Nerede | Durum |
|---|---|---|
| `AIzaSyBhpuFTxk…` | silinmiş `google-services.json` + `FIREBASE_SETUP.md` | **Gerçek** Firebase istemci anahtarı — aşağıya bakın |
| `AIzaSyDExample_Your_Real_API_Key_Here_…` | belge örnekleri | Yer tutucu, zararsız |

Bu belge daha önce `test-gemini-api.js` içinde `AIzaSyDZ81…` ile başlayan
gerçek bir Gemini anahtarının geçmişte durduğunu söylüyordu. **Bu artık doğru
değil:** o dize geçmişte yalnızca bu belgenin kendi uyarı metninde geçiyor,
hiçbir commit'te kod olarak bulunmuyor. Dosyanın erişilebilir geçmişteki en
eski hâli bile anahtarı `process.env.GEMINI_API_KEY`'den okuyor.

Tek uyarı: bu tarama yalnızca **mevcut ref'lerden erişilebilen** geçmişi
kapsar. Anahtar bir zamanlar squash/rewrite edilmiş bir dal üzerinden
GitHub'a itilmişse, GitHub o nesneleri commit SHA'sı ile hâlâ sunabilir.
Bu yüzden "anahtarı iptal edin" tavsiyesi geçerliliğini korur; daha önce
iptal edildiyse yapılacak bir şey yoktur.

## Firebase kaldırıldı

Repoda `google-services.json` (hem kökte hem `android/app/` altında), bir
`com.google.gms:google-services` Gradle eklentisi ve bir `FIREBASE_SETUP.md`
duruyordu; hiçbiri kullanılmıyordu. Uygulama kimlik doğrulama, veritabanı ve
depolama için yalnızca Supabase kullanır, push bildirimi göndermez ve projede
tek bir Firebase SDK'sı kurulu değildir. Üçü de kaldırıldı.

Geçmişte kalan tek gerçek anahtar budur (`AIzaSyBhpu…`). Firebase API anahtarı
türü gereği gizli değildir — istemci tanımlayıcısıdır, APK'dan zaten okunur —
ama artık kullanılmayan bir projeye ait olduğu için **Google Cloud Console'dan
`maritime-calculator` projesindeki anahtarı silin** (ya da proje tamamen
atılsın). Yalnızca kısıtlamak yeterli değil: kullanılmayan bir anahtarı
yaşatmanın hiçbir faydası yok.

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
| `rateLimit.ts` | IP/kullanıcı başına istek freni (`checkDurableRateLimit`) |
| `entitlements.ts` | Faturalama düzeyinde AI kotası (`consumeAiQuota`) |
| `serviceClient.ts` | `service_role` istemcisi (yukarıdaki ikisi de kullanır) |

Kurallar:

- **Kimlik doğrulama**: AI/maliyet üreten her uç `validateAuth` + kota
  kullanır. `verify_jwt=false` yalnızca fonksiyon içinde kendi doğrulamasını
  yapan uçlar için kabul edilir (ör. `play-rtdn` timing-safe paylaşılan sır).
- **Rate limit**: Maliyet üreten veya dış servise giden her uç
  `checkDurableRateLimit` kullanır. Sayaç Postgres'tedir
  (`consume_rate_limit` RPC), yani isolate'ler arasında paylaşılır ve soğuk
  başlatmada sıfırlanmaz. Bellek içi `checkRateLimit` yalnızca ucuz ilk
  kademedir (aynı isolate'teki bot döngüsünü DB'ye gitmeden keser); tek
  başına kullanılmamalıdır. DB'ye ulaşılamazsa fren **açık tarafa düşer** —
  rate limit'in kendisi bir kullanılabilirlik arızasına dönüşmemelidir.
- **Satın alma doğrulama**: `verify-purchase` bir purchaseToken'ı hesaba
  bağlamadan önce iki kontrol yapar: (1) token başka bir kullanıcıya bağlı
  mı, (2) Google'ın döndürdüğü `obfuscatedAccountId` oturumdaki `user.id` ile
  eşleşiyor mu. İkincisi "başkasının token'ını ilk talep eden kazanır"
  boşluğunu kapatır. Alan yalnızca uygulama içi satın almalarda dolu gelir;
  promosyon kodları ve eski sürüm satın alımları için null olabildiğinden
  null durumunda birinci kontrole güvenilir.
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

## Kimlik doğrulama

- **İki adımlı doğrulama (TOTP)**: İsteğe bağlıdır, Ayarlar → İki adımlı
  doğrulama'dan açılır (`src/lib/mfa.ts`, `src/components/settings/
  TwoFactorCard.tsx`). Girişte kod adımı hem `Auth.tsx` hem `RequireAuth`
  tarafından uygulanır.
- **İstemci kapısı tek başına yeterli değildir**: çalınmış bir `aal1` jetonu
  PostgREST'e doğrudan konuşabilir. Zorlama veritabanındadır — faktör
  kaydetmiş kullanıcının satırları yalnızca `aal2` jetonuyla açılır
  (`20260807150000_require_aal2_for_mfa_users.sql`, RESTRICTIVE politikalar).
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

## Bilinen sınır: Pro içerik kapısı istemcide

`ProGate.tsx` / `ProRoute.tsx` yalnızca istemci tarafı kontrollerdir. Karar
`EntitlementContext`'ten gelir; bağlam sunucuya ulaşabildiğinde `user_entitlements`
tablosunu okur, ulaşamadığında `mmp.entitlement.v1` localStorage önbelleğine
düşer. Bu önbellek **imzasız düz metindir**: onu düzenleyip cihazı çevrimdışına
alan biri Pro içeriği açabilir.

Bu bilinçli olarak kabul edilmiş bir risktir, çünkü:

- Pro içeriğin çoğu (dersler, quizler, 3B gemi sistemleri) APK'nın içinde
  paketli gelir. Sunucu kapısı koysak bile içerik cihazda durur; paketli
  içeriği istemci tarafı bir kontrolle korumak tanım gereği mümkün değildir.
- Çevrimdışı erişim ürün gereksinimidir (gemide internet yok), dolayısıyla
  "hak sunucudan doğrulanmadan içerik açılmasın" seçeneği elenmiştir.

Buna karşılık **gerçekten paraya dokunan taraf sunucuda zorlanır**: AI kotası
(`consume_ai_credit`) ve satın alma doğrulaması (`verify-purchase`) istemciye
hiç güvenmez. İstemcinin "ben Pro'yum" iddiası hiçbir sunucu kararını
etkilemez — `getUserTier` her zaman tabloyu okur.

Çıtayı yükseltmek istenirse sıradaki adım, sunucunun Ed25519 ile imzaladığı
süreli bir hak jetonu üretmesi ve istemcinin yalnızca genel anahtarla
doğrulamasıdır; bu, saldırıyı "localStorage'da JSON düzenle" seviyesinden
"APK'yı yamala ve yeniden imzala" seviyesine taşır. Paketli içerik için nihai
koruma yine de sağlamaz.

## Veritabanı

- Tüm kullanıcı tablolarında RLS etkindir ve politikalar `auth.uid()` ile
  satır sahipliğine bağlıdır. Yeni tablo eklerken RLS'siz bırakmayın.
- `service_role` anahtarı yalnızca edge function ortamında yaşar; istemciye
  yalnızca publishable/anon anahtar gider.

## Para kazanma sırları (repoda değildir)

Abonelik akışı iki Supabase Secret'ına bağlıdır. Kod kusursuz çalışsa bile
bunlar eksikse sonuç şudur: kullanıcı **ödeme yapar ama Pro açılmaz**.

- `GOOGLE_PLAY_SERVICE_ACCOUNT_JSON` — yoksa `verify-purchase` 503 döner ve
  hiçbir satın alma doğrulanamaz. (Onaylanmayan satın almayı Google 3 gün
  içinde iade eder, yani para geri gider — ama kullanıcı Pro alamaz.)
- `PLAY_RTDN_SECRET` — yoksa/yanlışsa `play-rtdn` her bildirimi 401'ler;
  yenileme, iptal, ödeme sorunu ve iade olayları entitlement tablosuna hiç
  işlenmez. Süresi dolmuş abonelikte bile erişim, kullanıcı uygulamayı açana
  kadar açık kalır.

İkisi de dışarıdan doğrulanabilir:

```
npm run check:billing-config
```

Gerekli ortam değişkenleri `scripts/check-play-billing-config.mjs` başındaki
açıklamadadır. Kapı hiçbir kontrolü çalıştıramazsa yeşil dönmez (çıkış kodu 2),
çünkü "doğrulandı" ile "doğrulanmadı" aynı çıktıyı vermemelidir. Bu kapı yeşil
olmadan mağazaya çıkmayın.

Sunucu yapılandırması eksikken satın alma denenirse istemci artık jenerik
"tekrar deneyin" mesajı göstermez: `BillingNotConfiguredError`
(`src/services/billing.ts`) kullanıcıya ücretin iade edileceğini söyler.
Tekrar denemek bu hatayı düzeltmez.

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
