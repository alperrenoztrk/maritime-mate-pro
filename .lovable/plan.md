# Haberler uygulama açılırken hazır olsun

## Sorun
Ana sayfadaki haber paneli, haberleri ancak kullanıcı haber sayfasına kaydırınca istemeye başlıyor. Haberler kalıcı olarak saklanmadığı için her açılışta en baştan bekleniyor.

## Yapılacaklar
1. **Açılışta önceden yükleme:** Uygulama açılır açılmaz (ana sayfa görünürken, arka planda) haberler istenir. Kullanıcı haber sayfasına geçtiğinde liste hazır olur.
2. **Cihazda saklama:** Son alınan haber listesi ve küçük görselleri cihazda saklanır. Sonraki açılışta önceki haberler anında gösterilir, yenileri arka planda gelince sessizce güncellenir.
3. **Görselleri önceden alma:** İlk 8 haberin küçük görselleri arka planda indirilir, kaydırınca boş kutu görünmez.
4. Aynı önbellek "Maritime News" sayfası için de kullanılır, o sayfa da anında açılır.

## Teknik detaylar
- `src/services/maritimeNews.ts`: `getCachedNews()` / `saveCachedNews()` (localStorage, 24 saat geçerli, sürüm anahtarlı) ve `prefetchMaritimeNews(queryClient)`.
- `src/pages/Index.tsx`: ilk boyamadan sonra `requestIdleCallback` ile `queryClient.prefetchQuery(["maritime-news","home-panel"])`, ardından ilk 8 görsel için `new Image()`.
- `NewsPanel.tsx` ve `MaritimeNews.tsx`: `initialData` + `initialDataUpdatedAt` önbellekten; `placeholderData` ile yeniler gelene kadar eski liste gösterilir.
- Doğrulama: Playwright ile ana sayfa açılıp haber sayfasına geçildiğinde yükleniyor göstergesi çıkmadığı kontrol edilir; önbellek okuma/yazma için küçük test.
