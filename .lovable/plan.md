# Açılış ekranında görüntülerin üst üste binmesini düzeltme

## Tespit edilen hata
Açılış ekranı kare kare kaydedildi (her 0,25 sn'de bir). Yaklaşık 0,75. saniyede kitap animasyonunun üstüne beyaz zeminli, ortasında mavi dümen simgesi olan bir ekran geliyor; kısa süre sonra kitap animasyonu kaldığı yerden devam ediyor. Bu yüzden açılışta birden fazla görüntü birbirine giriyor.

Bu ekran, sayfa çevirisi hazırlanırken gösterilen bekleme ekranı. Açılış ekranı ile aynı katman önceliğine sahip ve sayfada ondan sonra geldiği için açılış animasyonunun üstüne çiziliyor. Ayrıca açık renk zemin kullandığı için koyu açılış ekranının ortasında beyaz bir parlama oluşturuyor.

## Yapılacaklar
1. Açılış ekranı ekrandayken çeviri bekleme ekranı hiç gösterilmeyecek. Açılış animasyonu zaten bekleme süresini kapattığı için ayrıca beklemeye gerek yok.
2. Açılış ekranının katman önceliği, uygulamadaki tüm tam ekran katmanların üstüne çıkarılacak. Böylece başka bir ekran ileride de onun üstüne binemeyecek.
3. Açılış ekranı kapanırken çeviri hâlâ hazır değilse, bekleme ekranı koyu temaya uygun olarak (beyaz parlama olmadan) devreye girecek.

## Doğrulama
- Açılış 0,25 sn aralıklarla yeniden kaydedilecek: kitap açılması, gemi, başlık ve geçiş arasında başka hiçbir görüntü araya girmemeli.
- Telefon boyutunda (375 px) ve ikinci açılışta (kısaltılmış animasyon) aynı kontrol yapılacak.
- lint, typecheck, check:design-system, check:ux-consistency çalıştırılacak.
- Android cihazda denenemeyecek; bunu sürüm sonrası telefonda kontrol etmen gerekecek.

## Teknik detaylar
- `src/components/RouteTranslationGate.tsx`: `fixed inset-0 z-[9999] bg-background`. Gate, `document.getElementById('splash-root')` mevcut ve `splash-hide` sınıfı yokken render edilmeyecek; splash kaldırıldığında bir `splash:hidden` olayı ile yeniden değerlendirilecek.
- `src/main.tsx` `hideSplash`: splash kaldırılınca `window.dispatchEvent(new Event('splash:hidden'))`.
- `index.html` `.splash-root`: `z-index:9999` yerine `z-index:2147483000`.
- Gate zemini `bg-background` koyu temada kalacak; açık zeminin nedeni (theme-prepaint ile tema sınıfı) doğrulamada kontrol edilecek, "yalnızca koyu tema" kuralına aykırıysa düzeltilecek.
