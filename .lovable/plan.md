## Plan

### 1. Hesap kartında e-postayı her zaman göster
`src/pages/Settings.tsx` içindeki koşul (`displayName !== user.email`) kaldırılacak. Google ile giriş yapıldığında Google `full_name` ile e-posta ayrı satırlarda gösterilecek:

- 1. satır: Görünen ad (Google `full_name` veya e-posta öneki)
- 2. satır: `user.email` (her zaman görünür, muted renkte)

Anonim/isimsiz kullanıcılarda çift satır olmaması için sadece `user.email` varsa `full_name` yoksa tek satır e-posta gösterilecek.

### 2. Google giriş akışını doğrulama
Google OAuth managed popup akışı gerçek bir Google hesabı gerektirdiği için otomatik olarak headless test edilemez. Bunun yerine:

- `useAuth.signInWithGoogle` kod yolunu tekrar okuyup şu kontrol edilecek:
  - `cloudAuth.signInWithOAuth("google", { redirect_uri: window.location.origin })` çağrısı
  - `result.error` durumunda temiz hata dönüşü
  - `result.redirected` durumunda erken return (tam sayfa yönlendirme)
  - Popup akışında `supabase.auth.setSession(result.tokens)` ile session yazımı
  - `onAuthStateChange` dinleyicisinin session'ı `user`/`session` state'ine aktarması
- Preview'de `/auth` sayfası açılıp "Google ile Devam Et" butonuna basıldığında konsolda hata olup olmadığı Playwright ile kontrol edilecek (buton tıklanır, popup'ın açıldığı doğrulanır; gerçek Google girişi manuel test olarak sende kalacak).
- Giriş sonrasında `/settings` açılıp Hesap kartında e-postanın göründüğü ekran görüntüsüyle doğrulanacak (sende oturum açıldıktan sonra).

### Teknik notlar
- Değişiklik yalnızca `src/pages/Settings.tsx` içinde görsel bir düzenleme.
- Auth mantığında değişiklik yok — mevcut `useAuth` akışı Lovable managed Google OAuth için doğru şekilde yapılandırılmış durumda.
- Uçtan uca OAuth popup akışının başarısını yalnızca gerçek bir Google hesabıyla sen doğrulayabilirsin; ben kod yolunu ve UI tarafını doğrulayacağım.
