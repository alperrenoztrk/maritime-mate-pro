## Sorun

Ders modallarında (özellikle Seyir derslerinde) bir kısım görseller yüklenmiyor / kırık görünüyor.

**Kök neden — denetim sonucu:**
- `src/data/navigationTopicContents.ts` içinde **178 görsel** referansı var: 110'u yerel asset (sorunsuz), **68'i dış URL** (sailingissues.com, marinegyaan.com, skippertips.com, researchgate.net, jimcdn.com, sstatic.net vb.).
- Bu siteler tarayıcıda **hotlink/Referer koruması, CORS veya 403** döndürüyor (örn. researchgate.net → 403). Sunucu HEAD isteği 200 dönse bile `<img>` etiketi `Referer` başlığı yüzünden tarayıcıda yüklenmiyor.
- `TopicContentModal.tsx` içindeki `<img>` etiketlerinde **`onError` fallback yok** → kırık görsel olduğu gibi kalıyor, kullanıcı boş kutu görüyor.
- Diğer ders dosyaları (meteoroloji, stabilite, makine, haberleşme, genel `topicContents.ts`) `image:` alanı kullanmadığı için onlarda eksiklik yok — sadece Seyir dersleri etkileniyor.

Aynı sorun maritime news için daha önce `images.weserv.nl` proxy ile çözülmüştü (mem://performance/maritime-news-image-optimization). Aynı yaklaşımı derslere de uygulayacağız.

## Plan

### 1. Ortak görsel bileşeni (yeni dosya)
`src/components/ui/LessonImage.tsx` oluştur:
- `src` URL'si dış kaynaksa otomatik olarak `https://images.weserv.nl/?url=<encoded>&w=800&output=webp` proxy'sine sar (yerel `/src/assets/...` veya `/diagrams/...` ise dokunma).
- `onError` ile **iki kademeli fallback**:
  1. İlk hata → proxy'siz orijinal URL'ye düş (proxy bazen kaynağı çekemiyor).
  2. İkinci hata → `bg-muted` + ortada ikon (Lucide `ImageOff`) + alt metni göster ("Görsel yüklenemedi: <imageAlt>"). Böylece kullanıcı boş kutu yerine düzgün bir placeholder görür.
- `loading="lazy"`, `referrerPolicy="no-referrer"`, `crossOrigin` ayarları.
- Mevcut `object-contain`, ImageViewerModal `onClick`, hover overlay davranışlarını korur.

### 2. TopicContentModal entegrasyonu
`src/components/navigation/TopicContentModal.tsx`:
- İki yerdeki ham `<img>` (section.image bloğu + ReactMarkdown `img` override) `LessonImage` ile değiştir.
- ImageViewerModal'a tıklama davranışı aynen kalır (büyük gösterim için yine proxy'li URL kullanılır).

### 3. ImageViewerModal'a fallback
`src/components/ui/ImageViewerModal.tsx` içinde tam ekran görüntüleyiciye de aynı `onError` mantığını ekle ki büyütülen görsel de kırık kalmasın.

### 4. Bilinen kırık URL'lerin yerel asset ile değiştirilmesi
`src/assets/navigation/` içinde zaten kullanılmayan ama konuya uygun yerel görseller var (örn. `sembol-cardinal-marks.png`, `sembol-iala-buoyage.jpg`, `sembol-racon.jpg`, `sembol-sector-lights.jpg`, `sembol-light-characteristics.jpg`, `sembol-isolated-danger.jpg`, `sembol-dangers.jpg`, `iala-lateral-marks.svg`, `cardinal-marks.svg`, `safe-water-mark.svg`, `isolated-danger-mark.svg`, `mercator-projection.svg`, `gnomonic-projection.svg`, `great-circle-vs-rhumb.svg`, `compass.svg`, `radar-display.svg`, `gps-satellites.svg`, `tide-current.svg`, `weather-systems.svg`, `chart-plotting.jpg`, vb.).
- `navigationTopicContents.ts` içindeki **68 dış URL**'yi gözden geçir; konusu eşleşen yerel asset olanları yerel import ile değiştir (örn. RACON, IALA buoyage, kardinal markalar, sektör ışıkları, GPS, mercator/gnomonik projeksiyon, dead reckoning, manyetik kuzey, gelgit/akıntı vb.). Tahminen **30-40 görsel** birebir yerel asset ile değiştirilebilir.
- Yerel karşılığı olmayan dış URL'ler (örn. spesifik fotoğraflar, formül diyagramları) proxy + fallback ile çalışmaya devam edecek.

### 5. Diğer ders modüllerinin denetimi (doğrulama)
- Meteoroloji, stabilite, makine, haberleşme ve `topicContents.ts` taranınca `image:` alanı bulunamadı; bu modüllerde "yüklenmeyen görsel" sorunu yok. Eğer ileride eklenirse aynı `LessonImage` bileşeni hazır olacak.
- `BridgeDeviceDetail` zaten `<img>` ile dış görseller kullanıyor — aynı `LessonImage` bileşenini orada da kullan ki tutarlı fallback olsun.

## Değişecek Dosyalar

- **Yeni:** `src/components/ui/LessonImage.tsx`
- **Düzenle:** `src/components/navigation/TopicContentModal.tsx`
- **Düzenle:** `src/components/ui/ImageViewerModal.tsx`
- **Düzenle:** `src/data/navigationTopicContents.ts` (yerel asset eşlemeleri — sadece `image:` satırları)
- **Düzenle:** `src/pages/BridgeDeviceDetail.tsx` (img → LessonImage)

## Beklenen Sonuç

- Tüm ders görselleri ya yerel asset'ten ya da `weserv.nl` proxy üzerinden yüklenir → hotlink/Referer/CORS hataları ortadan kalkar.
- Yine de yüklenemeyen tek tük görsel için, kullanıcı boş kutu yerine "Görsel yüklenemedi" placeholder'ı görür.
- Mobil cihazlarda webp dönüşümü ile bant genişliği de düşer.

Onayınızla uygulamaya geçeyim.