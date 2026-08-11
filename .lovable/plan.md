# Şifresiz Giriş (Magic Link)

Kullanıcı e-postasını girer, gelen bağlantıya tıklayınca doğrudan uygulamaya girer. Mevcut e-posta/şifre ve Google girişi olduğu gibi kalır.

## Kullanıcı akışı

1. Giriş ekranında "Giriş" sekmesine "E-posta ile bağlantı gönder" seçeneği eklenir. Şifre alanı isteğe bağlı hale gelir: kullanıcı ya şifreyle girer ya da bağlantı ister.
2. Bağlantı istendiğinde "Bağlantı e-postanıza gönderildi" bilgisi ve 60 saniyelik tekrar gönderme sayacı görünür.
3. E-postadaki bağlantı `/auth/callback` adresine döner; oturum kurulduktan sonra kullanıcı geldiği sayfaya (`next`) yönlendirilir.
4. Hesabı olmayan biri bağlantı isterse hesap otomatik oluşturulur ve profili mevcut tetikleyiciyle yazılır.
5. 2FA açık hesaplarda bağlantı sonrası yine kod adımı gösterilir (mevcut davranış korunur).

## Teknik detaylar

- `src/hooks/useAuth.tsx`: `signInWithMagicLink(email, returnPath)` eklenir; `supabase.auth.signInWithOtp` çağrılır, `emailRedirectTo` olarak `${origin}/auth/callback?next=...`, native kabukta `com.marinersbook.app://auth/callback` kullanılır. Tip `src/hooks/auth-context.ts` içine eklenir.
- `src/pages/Auth.tsx`: bağlantı gönderme butonu, sayaç durumu ve hata/başarı bildirimleri. Rate limit (429) hatası için anlaşılır Türkçe mesaj.
- `src/pages/AuthCallback.tsx`: magic link hem PKCE `?code=` hem token fragment döndürebilir; `finishOAuthFromUrl` zaten ikisini de işliyor, ek olarak `type=magiclink` ve `type=recovery` ayrımı yapılıp recovery `/reset-password` sayfasına yönlendirilir.
- `src/lib/authFlow.ts`: magic link redirect URL'ini üreten yardımcı, Google akışıyla aynı `buildRedirectUrl` mantığını paylaşır.
- Backend: e-posta gönderimi mevcut auth e-posta altyapısı üzerinden gider; ek yapılandırma gerekmez. Kayıtlı olmayan adres için hesap oluşturmayı kapatmak istenirse `shouldCreateUser: false` ile sınırlanabilir — varsayılan olarak açık bırakılır.
- Tüm yeni metinler mevcut çeviri kurallarına uyar (teknik terimler `translate="no"`).

## Yan not

`vite.config.ts` içinde service worker kuralında `self.location.origin` kullanımı TypeScript hatası veriyor (`Cannot find name 'self'`). Bu mevcut bir hata, magic link ile ilgisi yok; uygulama sırasında `url.origin === location.origin` şeklinde düzeltilecek.
