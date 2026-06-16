## Sorun

Şu an dil değişimi **lazy** çalışıyor: `LanguageContext` sadece o anda DOM'da görünen metinleri çeviriyor. Sonradan başka bir sayfaya geçildiğinde, o sayfanın metinleri ilk kez DOM'a basıldığında çeviri başlatılıyor — `public/locales/<lang>.json` sözlüğünde yoksa Google'a sorgu atılıyor ve birkaç yüz ms boyunca kaynak dil (Türkçe / İngilizce) görünüyor. Kullanıcının gördüğü "değişmemiş kelime" ve "sayfa geçişlerinde çeviri" tam olarak bu.

## Çözüm — dil seçildiğinde **tüm uygulama**, sonradan değil **şimdi** çevrilir

Üç parçalı, tek sefer yapılan **eager bulk-translation** akışı kurulur. İlk açılışta ağır olabilir; ondan sonra her sayfa anlık ve eksiksiz olur.

### 1) Kalıcı "görülen kaynak metinler" kayıt defteri
`localStorage`'a `mt-seen-strings-v1` anahtarıyla bir `Set<string>` (kaynak dildeki normalize edilmiş Türkçe metinler) tutulur.
- `MutationObserver` ve ilk sayfa taraması zaten her `TranslationUnit.source`'u görüyor; bunları sete eklemek için `LanguageContext` içine küçük bir kanca eklenir.
- Set kullanıcı uygulamayı kullandıkça büyür → bir sonraki dil değişiminde bu havuz tek seferde çevrilir.

### 2) Master kaynak metin havuzu
`mt-seen-strings-v1` set'i + `public/locales/tr.json` (ya da kaynak dil dosyası varsa onun tüm anahtarları) + `maritimeGlossary` Türkçe terim listesi birleştirilir. Bu, "uygulamanın bildiği tüm metinler"in büyük resmidir.
> Not: `tr.json` zaten build-time extract-strings ile üretiliyor (bkz. `scripts/i18n/extract-strings.mjs`). Yoksa veya eksikse, runtime'da gördüğümüz set yeterince hızlı doluyor — ikinci dil değişiminden itibaren havuz tamamlanmış oluyor.

### 3) `changeLanguage` artık eager — bulk pass'i bitirmeden bitmez
`changeLanguage(lang)` şu sırayı izler:

1. UI üstünde **non-dismissable bir overlay** açılır: "Dil değiştiriliyor… %X" + progress bar (mevcut shadcn `Progress` ile).
2. `loadStaticDictionary(lang)` ile `public/locales/<lang>.json` tek sefer yüklenir; **tüm anahtarları** in-memory `translationCacheRef`'e yazılır (şu an sadece miss'te bakıyor, eager seed daha ucuz).
3. **Master havuz − halihazırda cache'te olanlar = çevrilecekler** listesi çıkarılır.
4. Bu liste **40'lı batch'ler** halinde Google `translate_a/single` endpoint'ine paralel (concurrency 6) atılır. Her batch tek istekte birden fazla `&q=` parametresi gönderir — döngü zaten `runWithConcurrency` ile mevcut, sadece batch boyutu büyütülür.
5. Her batch dönüşünde:
   - `applyMaritimeCorrections` uygulanır,
   - cache'e ve persist edilecek sözlüğe yazılır,
   - overlay progress güncellenir.
6. Tamamlanınca cache `localStorage`'a persist edilir, `setCurrentLanguage(lang)` çağrılır, overlay kapatılır, toast "Dil değiştirildi" gösterilir.
7. Mevcut sayfa için tek bir senkron pass çalıştırılır (`translatePage`) — artık tüm string'ler cache'te olduğu için **ağ çağrısı sıfır, flicker sıfır**.

### 4) Sayfa geçişlerinde sadece cache, hiç ağ
`translateText` içinde dil zaten seçilmişse ve `LOCK_TO_CACHE_AFTER_CHANGE` aktifse: cache miss durumunda **Google fetch'i atlanır**, kaynak metin geçici olarak korunur ve aynı string arka planda sessizce çevrilip cache'e yazılır → bir sonraki render'da güncellenir. Bu, kullanıcının "sayfa değiştirildikten sonra çeviri görmek istemiyorum" şikâyetini garantiler:
- Cache miss zaten %99 olmamalı (1-3 sayesinde),
- Olursa kullanıcı çevirinin yapılıyor olduğunu hiç fark etmez; sayfada **kaynak metin** kalır (bir dahaki ziyarette çevrili), seçili dilin yarı çevrilmiş ekranı görünmez.

### 5) Yeni dosya: `src/components/LanguageChangeOverlay.tsx`
Tam ekran glassmorphism overlay: ortada bir spinner + "Dil değiştiriliyor… %X" + alt satırda "Bu işlem ilk seferde 10-30 saniye sürebilir". Overlay durumu (open + %) `LanguageContext`'e eklenir (yeni `isChangingLanguage` ve `changeProgress` alanları) ve `MobileLayout` / `App` köküne render edilir.

## Etkilenen dosyalar

- `src/contexts/LanguageContext.tsx` — `changeLanguage` baştan yazılır (eager bulk pass + overlay state). `MutationObserver` callback'inde "seen-strings"'e yazma eklenir. `translateText` içinde "cache-first, no live fetch during route change" davranışı eklenir.
- `src/components/LanguageChangeOverlay.tsx` — yeni dosya.
- `src/App.tsx` veya `src/components/MobileLayout.tsx` — `<LanguageChangeOverlay />` mount edilir.

## Kullanıcı için net davranış

- Ayarlar → dil seç → overlay açılır → %100 olunca kapanır → o andan sonra **her sayfa, her menü, her toast** seçilen dilde, **flicker yok, ağ gecikmesi yok**.
- İlk seferde havuz dolarken bekleme olabilir; ikinci sefer aynı dile/farklı dile geçişlerde çok daha hızlı.
- Çevrilemeyen (kesinlikle yeni ve hiç görülmemiş) bir string için kaynak metin görünür — yanlış-yarı çeviri yerine.

Maritime sözlük öncelikleri (`getMaritimeTranslationOverride`, `applyMaritimeCorrections`) ve mevcut JSON sözlükleri korunur — proje belleğindeki "yapay zeka izinin minimum olması" kuralına uygun, ek AI çağrısı yok; Google endpoint'i halihazırda kullanılıyor.