## Hedef

Dil değiştirildikten sonra **uygulamadaki tüm sayfaların** çevrilmiş olması — kullanıcı sayfaya gidince hiçbir çeviri flicker'ı görmemeli.

Seçilen strateji: **Agresif bulk — tüm route'ları arka planda gez, metinleri topla, hepsini önceden çevir.**

## Yaklaşım

Dil değiştirildiğinde overlay açıkken, gizli bir off-screen iframe içinde uygulamanın tüm route'larını sırayla yükle, her route'da DOM'dan metinleri topla, sonra hepsini Google Translate ile toplu çevir. İşlem bitince cache'i kaydet ve dili gerçek anlamda değiştir. Sonraki ziyaretlerde her sayfa cache'den anında çevrilmiş gelir → flicker yok.

### Mimari

1. **Route manifest** (`src/utils/routeManifest.ts` — yeni):
   - `src/App.tsx`'teki tüm static path'leri tek bir dizi olarak listele (`/`, `/calculations`, `/lessons`, vs.).
   - Dinamik path'ler (`:param` içerenler) için bilinen örnek değerlerle somut URL'ler üret. Örnek: `/lessons/:topicKey/formulas` → `/lessons/stability/formulas`, `/lessons/cargo/formulas`, vs. (kategori/topic listeleri zaten kod tabanında mevcut — onlardan üretilir.)
   - Sonuç: ~150-200 somut URL'lik düz bir liste.

2. **Harvest iframe** (`src/utils/routeHarvester.ts` — yeni):
   - `document.body`'ye 1x1 piksel, `aria-hidden`, `pointer-events:none`, `position:fixed; top:-9999px` bir iframe ekle.
   - URL'leri tek tek `iframe.src = origin + path` yaparak yükle.
   - Her route için: `load` event + 800ms ek bekleme (lazy content için) → iframe.contentDocument.body üzerinde `collectTranslationUnits` çalıştır → toplanan source string'leri parent'taki seen-set'e ekle.
   - Hata/timeout (5sn) → o route'u atla, devam et.
   - İşlem boyunca progress yayınla (örn. `routesDone/routesTotal * 50%` ilk yarı).
   - Hassas route'ları (`/auth/callback`) listenin dışında tut.

3. **`LanguageContext.tsx` değişiklikleri**:
   - `runBulkTranslation` başlangıcında, henüz harvest yapılmamış bir dil için `harvestAllRoutes()` çağır (progress 0-50%).
   - Sonra mevcut bulk çeviri pass'i (Google batch) çalışsın (progress 50-100%).
   - `bulkCompletedLanguagesRef` ve cache-only davranışını **koru** — çünkü artık seen-set tüm uygulamayı içerecek, cache miss neredeyse hiç olmayacak → flicker yok ve canlı fetch'e gerek yok.
   - Harvest sonucunu `localStorage`'a kalıcı yaz (`mt-routes-harvested-v1` flag'i) → kullanıcı tekrar başka bir dile geçerse harvest tekrar çalışmasın, sadece bulk çeviri yapılsın. Yeni uygulama sürümünde flag sıfırlanabilsin diye basit bir version key kullan.

4. **Overlay (`LanguageChangeOverlay.tsx`)**:
   - İki fazlı progress mesajı: "Sayfalar taranıyor… (X/Y)" → "Çeviriler hazırlanıyor… (%Z)".
   - `LanguageContext`'e `changePhase` state ekle (`'harvest' | 'translate'`).

### Riskler ve çözümler

- **Iframe sandbox / aynı origin**: Aynı origin olduğu için `contentDocument`'a erişim sorunsuz.
- **Auth / yan etki**: Iframe içindeki uygulama da auth context'i kullanacak; sorun yok. Network'e yazma yapan route var mı diye `routeManifest`'ten harvest sırasında hariç tutulacaklar (auth callback, ödeme vs.) işaretlenir.
- **Süre**: ~150 route × ~1sn = ~2.5 dk. Kullanıcıya overlay'de açıkça gösterilecek + iptal butonu eklenebilir (opsiyonel).
- **Bellek**: Iframe sıralı kullanılıyor (sadece 1 tane), her route arası `src` değişiyor.

### Dosyalar

- `src/utils/routeManifest.ts` (yeni)
- `src/utils/routeHarvester.ts` (yeni)
- `src/contexts/LanguageContext.tsx` (harvest entegrasyonu, faz state'i)
- `src/components/LanguageChangeOverlay.tsx` (iki fazlı mesaj/progress)

### Sonuç davranışı

- İlk dil değişimi: 1-3 dakika overlay (tek seferlik harvest + tam bulk çeviri).
- Sonraki dil değişimleri: sadece bulk çeviri (harvest atlanır, ~30sn).
- Her sayfa açılışı: cache hit → anında çevrilmiş, sıfır flicker.
