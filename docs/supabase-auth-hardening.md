# Supabase kimlik doğrulama — panel ayarları kontrol listesi

Bu ayarlar **repoda görünmez**: canlı davranışın kaynağı Supabase panelidir.
Kod tarafındaki karşılıkları `supabase/config.toml` içine yazıldı ama o dosya
`supabase config push` çalıştırılmadan etkili olmaz (ve push etmenin kendi
riski var — bkz. dosyanın başındaki uyarı).

Aşağıdaki listeyi panelde bir kez geçin. Her satırda **nerede**, **hangi
değer** ve **nasıl doğrulanır** yazıyor.

Proje: `vrpbhguztsqakvjcezeb` →
<https://supabase.com/dashboard/project/vrpbhguztsqakvjcezeb/auth/providers>

---

## 1. Sızmış şifre koruması (HaveIBeenPwned)

| | |
|---|---|
| **Nerede** | Authentication → Sign In / Providers → Password → *Prevent use of leaked passwords* |
| **Değer** | Açık |
| **Neden** | Kullanıcıların başka bir sitede sızmış şifreyi buraya taşımasını engeller. Şifre + e-posta erişimiyle hesap ele geçirmenin en yaygın yolu budur. |
| **config.toml** | ❌ CLI'da karşılığı yok — yalnızca panelden açılabilir. |
| **Doğrulama** | Bilinen sızmış bir şifreyle (`Password123!`) kayıt denemesi yapın; reddedilmeli. |

## 2. Minimum şifre uzunluğu ve karakter kuralı

| | |
|---|---|
| **Nerede** | Authentication → Sign In / Providers → Password |
| **Değer** | Minimum length **8**, requirement **Letters and digits** |
| **Neden** | `src/pages/Auth.tsx:19`'daki 8 karakter kuralı yalnızca istemci tarafında. API'ye doğrudan yapılan bir `signUp` çağrısı o zod şemasını atlar; sunucuda karşılığı yoksa 1 karakterli şifre kabul edilir. |
| **config.toml** | `[auth] minimum_password_length = 8`, `password_requirements = "letters_digits"` |
| **Doğrulama** | `curl -X POST "$SUPABASE_URL/auth/v1/signup" -H "apikey: $ANON_KEY" -H 'Content-Type: application/json' -d '{"email":"probe@example.com","password":"abc"}'` → `weak_password` hatası dönmeli. |

## 3. Giriş denemesi rate limit'i

| | |
|---|---|
| **Nerede** | Authentication → Rate Limits |
| **Değer** | *Sign in / sign ups*: **10** (5 dakikada, IP başına). *Token verifications*: **10**. |
| **Neden** | Varsayılan 30, şifre deneme saldırısı için gereğinden gevşek. |
| **config.toml** | `[auth.rate_limit] sign_in_sign_ups`, `token_verifications` |
| **Doğrulama** | Aynı IP'den 11 hatalı giriş denemesi → 429. |

## 4. E-posta doğrulama zorunluluğu

| | |
|---|---|
| **Nerede** | Authentication → Sign In / Providers → Email → *Confirm email* |
| **Değer** | Açık |
| **Neden** | Kapalıyken saldırgan başkasının e-posta adresiyle hesap açıp o adresi "sahiplenebilir"; gerçek sahibi sonradan kayıt olamaz. |
| **config.toml** | `[auth.email] enable_confirmations = true` |
| **Doğrulama** | Yeni kayıt sonrası `GET /auth/v1/user` → `email_confirmed_at` boş olmalı ve oturum açılmamalı. |

## 5. OTP / sihirli bağlantı süresi

| | |
|---|---|
| **Nerede** | Authentication → Sign In / Providers → Email → *Email OTP Expiration* |
| **Değer** | **900** saniye (15 dk) — varsayılan 3600 |
| **Neden** | Şifre sıfırlama bağlantısı posta kutusunda bir saat canlı kalıyor. Kutuya sonradan erişen biri (paylaşılan gemi bilgisayarı, eski cihaz) o pencerede hesabı ele geçirir. |
| **config.toml** | `[auth.email] otp_expiry = 900` |
| **Doğrulama** | Şifre sıfırlama e-postası isteyin, 16 dakika bekleyip bağlantıya tıklayın → süresi dolmuş hatası. |

## 6. Güvenli şifre değişimi

| | |
|---|---|
| **Nerede** | Authentication → Sign In / Providers → Email → *Secure password change* |
| **Değer** | Açık |
| **Neden** | Kapalıyken çalınmış bir oturum jetonu, mevcut şifre sorulmadan şifreyi değiştirip hesabı kalıcı olarak ele geçirebilir. |
| **config.toml** | `[auth.email] secure_password_change = true` |
| **Doğrulama** | Oturum açıkken şifre değiştirmeyi deneyin; mevcut şifre istenmeli. |

## 7. İki adımlı doğrulama (TOTP)

| | |
|---|---|
| **Nerede** | Authentication → Sign In / Providers → Multi-Factor Authentication → *TOTP (App Authenticator)* |
| **Değer** | Enroll **açık**, Verify **açık** |
| **Neden** | **Uygulamadaki 2FA akışı bu açılmadan çalışmaz.** Supabase'de TOTP varsayılan olarak kapalıdır. |
| **config.toml** | `[auth.mfa.totp] enroll_enabled = true`, `verify_enabled = true` |
| **Uyarı** | Supabase CLI'ın kendi referans yapılandırması MFA'yı "Pro plan" özelliği olarak işaretliyor. Ücretsiz plandaysanız `enroll` çağrısı hata dönebilir — **açmadan önce planınızı teyit edin.** |
| **Doğrulama** | Ayarlar → İki adımlı doğrulama → Aç. QR görünüyorsa açıktır. |

## 8. Yönlendirme adresleri (mevcut durumu bozmayın)

| | |
|---|---|
| **Nerede** | Authentication → URL Configuration |
| **Değer** | Site URL üretim adresi; Redirect URLs listesinde `com.marinersbook.app://auth/callback` **bulunmalı** |
| **Neden** | Native Google girişi bu özel şema ile geri döner (`AndroidManifest.xml`, `src/lib/authFlow.ts:10`). Eksikse Supabase Site URL'ye düşer ve uygulama oturumu hiç alamaz. |
| **Doğrulama** | Android'de Google ile giriş → uygulamaya geri dönmeli. |

---

## Neden hepsi panelde?

`supabase config push` bu ayarların **tamamını** `config.toml`'dan yazar.
Dosyada yazmayan her anahtar CLI varsayılanına döner — `site_url` dahil. Bu
yüzden config.toml'daki blok bugün bilinçli olarak "hedeflenen durumun
belgesi" olarak duruyor, otomatik uygulanan bir kaynak olarak değil.

Push etmeye karar verirseniz önce `[auth] site_url` ve
`additional_redirect_urls` satırlarını gerçek değerlerle doldurun, sonra
`npx supabase@2 config push --project-ref vrpbhguztsqakvjcezeb` çalıştırın ve
ardından 8. maddeyi tekrar doğrulayın.
