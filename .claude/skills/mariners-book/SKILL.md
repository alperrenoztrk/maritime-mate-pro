---
name: mariners-book
description: Mariners Book (com.marinersbook.app) proje bağlamı. Capacitor/Android derleme, Play yayını, Pro abonelik, Lovable Cloud/Supabase ve açılış hatalarıyla ilgili işlerde kullan.
---

# Mariners Book proje bağlamı

## Genel
- Uygulama: Mariners Book. Android paketi `com.marinersbook.app`, web sürümü https://nauticalleap.com
- Güncel depo `alperrenoztrk/maritime-mate-pro`. `maritime-calculator` eski ve terk edilmiş bir kopya; ona dayanma.
- Web uygulaması Lovable ile geliştiriliyor, Android'e Capacitor ile paketleniyor. Kesin yapı ve script'ler için önce `package.json` ve `capacitor.config.*` dosyalarına bak, tahmin yürütme.
- Geliştirici Windows + PowerShell kullanıyor; kullanıcının kendi makinesinde çalıştıracağı komutları PowerShell uyumlu ver.
- Test cihazı bir Android tablet; Android telefon yok.

## Backend
- Backend, Lovable Cloud içinde yönetilen Supabase. Gerçek proje `vrpbhguztsqakvjcezeb`. Supabase panelindeki `dhjvxtwflntmvbzkqsjn` (MARINER'S BOOK) kullanılmıyor; ona göre kod veya SQL yazma.
- Supabase paneline doğrudan erişim yok; veritabanı Lovable → More → Cloud → Database/Users üzerinden yönetiliyor. Şema değişikliği gerekirse SQL'i hazırla ve kullanıcının bunu Lovable'da uygulaması gerektiğini açıkça belirt.

## Pro abonelik
- Model: ücretsiz + Pro. Google Play ürün kimlikleri: `pro_monthly`, `pro_yearly`, `pro_lifetime`.
- Pro erişimi `user_entitlements` tablosunda tutuluyor; Pro kontrolüne dokunan değişikliklerde bu tabloyla tutarlı kal.

## Bilinen tuzaklar (beyaz ekran olayından)
- Açılışta yakalanmayan bir promise reddi uygulamayı beyaz ekranda bırakmıştı: `"SecureStorage.then()" is not implemented on android`. Capacitor eklenti proxy'si `.then` erişimini native çağrıya çeviriyor. Eklenti nesnesini doğrudan `await` etme ve `async` fonksiyondan döndürme; sadece metotlarını çağırıp onların sonucunu bekle.
- Cihazın eski kodu çalıştırdığı görüldü: hata, güncel pakette olmayan bir chunk dosyasından geliyordu. Şüphe, `npm run build` çıktısındaki PWA service worker'ın bayat önbelleği. Native paket için `build:native` script'ini kullan ve native derlemeye service worker girmediğini kontrol et.
- Açılış yolundaki async kodda hataları yakala; tek bir yakalanmayan red tüm uygulamayı boş ekranda bırakabiliyor.

## Play yayını
- Release AAB, kullanıcının kendi makinesindeki keystore ile imzalanıyor. Keystore, şifreler ve imza bilgileri asla repoya eklenmez.
- Hesap silme sayfası `public/delete-account.html` (yalnızca İngilizce). Gizlilik politikasının 6. bölümü de PR #238'de bu sayfayla birlikte güncellendi; birini değiştirirsen diğerini de kontrol et.

## İçerik ve arayüz kuralları
- Uydurma içerik yok: yorum, alıntı ve mevzuat bilgisi gerçek kaynaklardan gelsin; kaynak yoksa alanı boş bırak.
- Arayüz uygulama görünümünde olmalı: kart yapısı, kompakt satırlar, uygulama çubuğu. Editoryal/gazete tarzı tasarım istenmiyor.
- Hedef kitlenin gemideki zabitlerden denizcilik öğrencilerine kaydırılması değerlendiriliyor; henüz kesin karar yok.
