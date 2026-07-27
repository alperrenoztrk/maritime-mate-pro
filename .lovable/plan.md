## Tespit

Kod ve backend sinyallerini kontrol ettim. Şu an Google girişini bozabilecek en güçlü iki nokta var:

1. **Yayın build’i hâlâ backend adresini zorla gömüyor.**
   - `vite.config.ts` içinde `define` fallback bloğu mevcut.
   - Bu, gerçek ortam değişkenleriyle auth broker’ın kullandığı backend arasında sessiz uyumsuzluk yaratabilir veya eski yanlış ayarı yayına taşıyabilir.

2. **Domain yönlendirmesi ve auth callback aynı kanonik origin’e sabitlenmemiş.**
   - Uygulama `www.nauticalleap.com` adresini açılır açılmaz `nauticalleap.com` adresine gönderiyor.
   - Backend auth ayarında görünen site URL ise `https://www.nauticalleap.com`.
   - Google akışı bir origin’de başlayıp diğer origin’de tamamlanırsa tarayıcı oturum/state bilgisini ayrı tuttuğu için kullanıcı Google’dan dönse bile uygulamada giriş yapılmış görünmeyebilir.

Project monitoring tarafında bekleyen bulgu yok; yani bu, kod + domain/auth yapılandırması uyumsuzluğu gibi görünüyor.

## Uygulamada yapacağım düzeltmeler

1. **Backend env fallback’lerini kaldıracağım**
   - `vite.config.ts` içindeki `FALLBACK_*` sabitlerini ve `define` bloğunu kaldıracağım.
   - Böylece yayın build’i yanlış/eskimiş backend bilgisini sessizce gömmeyecek.
   - Uygulama sadece gerçek Lovable Cloud bağlantısının verdiği değerleri kullanacak.

2. **Google callback akışını tek origin’e sabitleyeceğim**
   - Auth callback URL üretimini tek kanonik domain ile tutarlı hale getireceğim.
   - `www` → apex yönlendirmesiyle auth akışının ortasında origin değişmemesini sağlayacak şekilde login tarafını sadeleştireceğim.

3. **Callback sayfasını daha görünür hata verecek hale getireceğim**
   - `/auth/callback` artık sessizce ana sayfaya düşmek yerine oturum kurulamazsa anlaşılır bir hata gösterecek.
   - Böylece “Google’dan döndü ama giriş yok” durumunda gerçek hata ekranda görülebilecek.

4. **Google provider’ı managed backend’de yeniden doğrulayacağım**
   - Build modunda Google sosyal giriş sağlayıcısını yeniden etkinleştireceğim/doğrulayacağım.
   - Bu işlem koddan bağımsız backend auth ayarını da tazeler.

5. **Canlı önizlemede akışı test edeceğim**
   - `/auth` sayfasında Google butonunun doğru callback URL ile başlattığını kontrol edeceğim.
   - Callback route’unun uygulama içinde gerçekten var olduğunu ve auth route cache/service worker tarafından kesilmediğini doğrulayacağım.

## Senin yapman gerekenler

1. **Tek ana domain seç:** önerim `https://nauticalleap.com`.
2. **Lovable Domains ayarında primary domain’i buna göre ayarla.**
   - `www.nauticalleap.com` varsa primary olmayan domain olarak kalsın ve ana domaine yönlensin.
3. **Google Cloud Console OAuth Client ayarlarında şunlar olmalı:**
   - Authorized JavaScript origins:
     - `https://nauticalleap.com`
     - `https://www.nauticalleap.com`
   - Authorized redirect URIs:
     - Lovable Cloud’un Google auth ayarında gösterdiği callback URL
     - Eğer özel domain callback’i isteniyorsa: `https://nauticalleap.com/auth/callback` ve `https://www.nauticalleap.com/auth/callback`
4. Düzeltmeden sonra uygulamayı **Update/Publish** etmen gerekecek; canlı özel domain eski bundle’ı kullanıyorsa kod düzeltmesi görünmez.

## Beklenen sonuç

Google hesabı seçildikten sonra kullanıcı `/auth/callback` üzerinden uygulamaya dönecek, oturum aynı backend ve aynı kanonik domain üzerinde kurulacak, ardından Ayarlar/Hesap bölümünde giriş yapılan e-posta görünecek.