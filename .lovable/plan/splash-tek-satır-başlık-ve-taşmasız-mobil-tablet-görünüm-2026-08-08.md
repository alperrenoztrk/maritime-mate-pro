# Splash: tek satır başlık ve taşmasız mobil/tablet görünüm

## Hedef
- Kitap kapağındaki "MARINER'S BOOK" iki satır yerine tek satırda dursun.
- Alt başlık ("MARINER'S BOOK" ana yazısı) da her ekran genişliğinde tek satır kalsın.
- Mobil ve tablet en-boy oranlarında splash ekranında yatay/dikey taşma olmasın; tablet ölçeklemesi mobil ile aynı kalitede olsun.

## Yapılacaklar (index.html splash bloğu)

1. Kapak başlığı tek satır
   - `<div class="cover-title">MARINER'S<br>BOOK</div>` içindeki `<br>` kaldırılır.
   - `.cover-title` için `white-space:nowrap` eklenir ve punto kapak genişliğine göre ölçeklenir: `font-size` `vw` yerine kapsayıcıya bağlı ölçüye (container query birimi `cqw`, `.cover-trim` üzerinde `container-type:inline-size`) çevrilir; desteklemeyen tarayıcılar için `vw` tabanlı `clamp()` fallback bırakılır. Harf aralığı da (`letter-spacing`) tek satıra sığacak şekilde düşürülür.

2. Ana başlık tek satır
   - `.splash-title` için `white-space:nowrap` + `max-width:94vw` ve `font-size` `clamp()` üst sınırı, en dar cihazda bile satır kırılmayacak biçimde ayarlanır (letter-spacing dar ekranda küçülür).

3. Taşma kontrolü
   - `.splash-root` zaten `overflow:hidden`; ek olarak `max-width:100vw` / `max-height:100svh` ve `100dvh` desteği ile adres çubuğu değişiminde dikey taşma engellenir.
   - Gemi animasyonundaki `translateX(92vw)` kapsayıcı dışına çıkışı `overflow:hidden` ile sınırlı kalır; klip garantisi için `.splash-stage` çevresine taşma denetimi eklenir.
   - `.splash-stage` genişliği hem genişliğe hem yüksekliğe bağlı sınırlandırılır: `width:min(80vw, 62svh*1.5, 420px)` mantığıyla, kısa/geniş (tablet yatay) ekranlarda kitabın ekranı aşması önlenir.

4. Tablet optimizasyonu
   - 600–1024px aralığı ve yatay (landscape) yönelim için ayarlar: kitap sahnesinin üst sınırı büyütülür (ör. 480px), başlık puntosu ve harf aralığı tablet ölçeğine uyarlanır, dikey boşluklar `svh` tabanlı clamp ile yeniden dengelenir.
   - Yatay yönelimde (`orientation:landscape` ve düşük yükseklik) kitap + başlık toplam yüksekliği ekranı aşmayacak şekilde `svh` bazlı küçültme uygulanır.

5. Doğrulama
   - Playwright ile 360x640 (mobil), 768x1024 (tablet dikey), 1024x768 (tablet yatay) ve 390x844 görünümlerinde splash ekran görüntüsü alınır; `document.scrollWidth > innerWidth` kontrolü ile yatay taşma olmadığı ve başlıkların tek satır kaldığı doğrulanır.

## Teknik notlar
- Tüm değişiklikler `index.html` içindeki statik splash markup + inline `<style>` bloğunda; React tarafına dokunulmaz.
- Animasyon zamanlamaları (4.2 sn açılış dizisi) değişmez, yalnız boyutlandırma/hizalama düzenlenir.
