## Sorunun kökü (doğrulandı)

Kullanıcı kayıtlarını kontrol ettim: `alperenberil6@gmail.com` hesabı **yalnızca Google ile** oluşturulmuş (provider: `google`) ve bu hesabın **hiç şifresi yok**. Aynı durum diğer 5 hesap için de geçerli; sadece bir hesapta (`xtrimcontact@gmail.com`) şifre var.

Bu yüzden:
- Kayıt olmaya çalışınca → "Bu e-posta zaten kayıtlı" (422)
- Şifreyle girmeye çalışınca → "Invalid login credentials" (400)

Hata değil, beklenen davranış: şifresi olmayan bir hesaba şifreyle girilemiyor. Eksik olan, kullanıcıya bunu anlatan bir arayüz ve şifre belirleme yolu.

## Yapılacaklar

### 1. Şifre sıfırlama / belirleme akışı (asıl çözüm)
- `src/pages/Auth.tsx` içine "Şifremi unuttum / şifre belirle" bağlantısı eklenecek.
- `supabase.auth.resetPasswordForEmail(email, { redirectTo: origin + "/reset-password" })` çağrılacak.
- Yeni sayfa `src/pages/ResetPassword.tsx`: recovery bağlantısıyla gelen oturumda `supabase.auth.updateUser({ password })` ile şifre belirlenecek. `src/App.tsx`'e public route olarak eklenecek.
- Böylece Google ile açılmış hesaplar e-posta üzerinden şifre belirleyip bundan sonra şifreyle de girebilecek.

### 2. Hata mesajlarını netleştirme (`src/pages/Auth.tsx`)
- "Invalid login credentials" → "E-posta veya şifre hatalı. Bu hesabı Google ile oluşturduysanız 'Google ile devam et' ile girin ya da şifre belirleyin."
- "User already registered" → "Bu e-posta zaten kayıtlı. Google ile giriş yapın veya şifrenizi belirleyin." + doğrudan giriş sekmesine geçiş.

### 3. Google butonunun görünürlüğü
Auth sayfasındaki Google butonu zaten var ve provider açık; mesajlarda buna yönlendirme yapılacak.

## Teknik notlar
- Şifre e-postası, projedeki mevcut auth e-posta altyapısı üzerinden gider; ek yapılandırma gerekmez.
- Hiçbir veritabanı değişikliği gerekmiyor; sadece istemci tarafı.
- Şifre belirlendikten sonra hesabın Google girişi çalışmaya devam eder (iki yöntem birlikte kullanılabilir).
