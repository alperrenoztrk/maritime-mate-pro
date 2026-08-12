# Kitap kapağı başlıkları: her yazı boyutunda taşmasız

## Sorun
Kitap kapaklarındaki başlıklar (`LibraryInterface.tsx` içindeki kapak bileşeni) `rem` tabanlı sabit boyutlarla yazılıyor. `rem` değeri kullanıcının yazı boyutu ayarına (`--font-scale`) bağlı büyüdüğü için "Communication at Sea" gibi uzun başlıklar kapak çerçevesinin dışına taşıyor ve kelime ortasından bölünüyor ("Communicatio / n at Sea").

## Çözüm
Kapak başlığını kapağın kendi genişliğine göre ölçeklendirmek:

- Kapak yüzeyini bir CSS container yapmak ve başlık boyutunu `cqw` (container genişliği yüzdesi) ile vermek — böylece yazı boyutu ayarı ne olursa olsun başlık kapağa oranla sabit kalır, taşma olmaz.
- Uzunluk kademelerini (`coverTitleSize`) `rem` yerine `cqw` tabanlı `clamp()` değerleriyle yeniden tanımlamak; container query desteklenmeyen tarayıcılar için makul bir `px/rem` yedeği bırakmak.
- Kelime ortasından bölünmeyi engellemek: `break-normal`, `overflow-wrap: break-word` yerine `word-break: keep-all` benzeri davranış; uzun tek kelimeler taşarsa boyut kademesi zaten küçültecek.
- Kapak altındaki etiket (kapak dışındaki başlık metni) için de satır sınırı ve taşma koruması.

Aynı yaklaşımı kütüphanedeki tüm kapak varyantlarına (raf görünümü ve kart görünümü) uygulayacağım, böylece Stability'den Maritime and Environmental Protection'a kadar tüm başlıklar hem Normal hem Büyük yazı boyutunda çerçeve içinde kalır.

## Teknik detay
- Dosya: `src/components/library/LibraryInterface.tsx`
  - Kapak yüzeyine `[container-type:inline-size]` eklenir.
  - `coverTitleSize()` kademeleri `text-[clamp(0.55rem,Xcqw,Yrem)]` biçimine dönüştürülür.
  - Başlık `h2` üzerine `[word-break:normal] [overflow-wrap:normal]` + gerekli durumda `line-clamp` korunur.
- Doğrulama: Playwright ile kütüphane sayfası hem `--font-scale: 1` hem `1.15` altında, dar (360px) ve tablet (769px) genişliklerde ekran görüntüsüyle kontrol edilir.
