# CLAUDE.md — Mariner's Book (com.marinersbook.app)

Kullanıcı güverte zabiti. Cevaplar kısa, pratik ve Türkçe olsun.
Bir işe başlamadan önce ne yapılacağını tek cümleyle söyle. İş bitince sonucu,
kontrol sonuçlarını ve commit hash'ini kısa bir Türkçe raporla ver.

## Değişmez kurallar
- Sadece `main` dalında çalış, `main`'e commit/push et. Başka dal açma.
- Sürüm (`android/app/build.gradle` versionCode/versionName ve `package.json`
  version) yalnızca kullanıcı açıkça istediğinde yükseltilir.
- Secret, keystore, parola gibi değerleri isteme, görme, loglama.
- Denizcilik terimleri asla kelime kelime çevrilmez. Komut fiilleri (viya,
  alabanda, funda, vira, laçka, aganta, mola, fora, mayna, tornistan) jenerik
  fiil değildir. Bilinmeyen terim `[?? TERİM: …]` diye işaretlenir ve
  kullanıcıya sorulur. Diğer dillere çeviri Türkçeden değil kontrol edilmiş
  İngilizceden yapılır ve otomatik denetimden (pivot kapıları) geçmek
  zorundadır; geçemeyen satır kontrol edilmiş İngilizce kalır. Elle yazılmış
  dil metni makine çevirisiyle asla değiştirilmez. **Eksik olabilir, yanlış
  olamaz.** Terim karşılıkları için: [GLOSSARY.md](GLOSSARY.md).
- Görseller: yapay zekâ ile üretilmiş görsel yok, konuyla birebir uyuşmayan
  görsel yok, düşük çözünürlük yok. Birebir uyan yoksa bölüm boş kalır.
- Commit mesajı İngilizce. Sonuna Türkçe "Terim denetimi (self-check)" listesi
  eklenir.

## Proje bağlamı
Ayrıntılar (Pro abonelik, Play yayını, beyaz ekran tuzakları):
`.claude/skills/mariners-book/SKILL.md`.
- Web sürümü https://nauticalleap.com. Güncel depo
  `alperrenoztrk/maritime-mate-pro`; `maritime-calculator` eski ve terk edilmiş
  bir kopya, ona dayanma.
- Web uygulaması Lovable ile geliştiriliyor, Android'e Capacitor ile
  paketleniyor. Kesin yapı ve script'ler için önce `package.json` ve
  `capacitor.config.*` dosyalarına bak, tahmin yürütme.
- Geliştirici Windows + PowerShell kullanıyor; kullanıcının kendi makinesinde
  çalıştıracağı komutları PowerShell uyumlu ver.
- Test cihazı bir Android tablet; Android telefon yok.
- Backend, Lovable Cloud içinde yönetilen Supabase (gerçek proje
  `vrpbhguztsqakvjcezeb`). Supabase panelindeki `dhjvxtwflntmvbzkqsjn`
  (MARINER'S BOOK) kullanılmıyor; ona göre kod veya SQL yazma.
- Supabase paneline doğrudan erişim yok; veritabanı Lovable → More → Cloud →
  Database/Users üzerinden yönetiliyor. Şema değişikliği gerekirse SQL'i hazırla
  ve kullanıcının bunu Lovable'da uygulaması gerektiğini açıkça belirt.

## Teknik harita
- React 18 + Vite + Capacitor 7 (Android). Supabase projesi: `vrpbhguztsqakvjcezeb`.
- Arayüz İngilizce, varsayılan dil `en`. Türkçe sunulmuyor ama kaynak metinlerin
  çoğu Türkçe.
- Çeviri: `public/locales/<dil>.json` (24 dil). Anahtar, kaynak metnin kendisi.
  Çalışma anındaki sıra: coreUiTranslations → kısaltma → maritimeGlossary
  override (`supabase/functions/_shared/maritimeGlossary.ts`) → statik sözlük →
  canlı makine çevirisi.
- Elle kontrol edilmiş metinler: `scripts/i18n/verified/*.json`. Dosya bir dili
  listelemiyorsa o dile önce İngilizcesi yazılır, sonra pivot katmanı bu
  İngilizceyi çevirir; `"fill": false` varsa yazılmaz.
- Pivot katmanı (kontrol edilmiş İngilizce → hedef dil, Google, anahtarsız):
  İngilizce görünen her satır (verified dolgu, `i18n:fix` geri dönüşleri, yeni
  İngilizce arayüz metni, ders paragrafları, öğrenme rehberi)
  `scripts/i18n/translate-pivot.mjs` (`npm run i18n:translate -- --lang=nl`)
  ile çevrilir. Kapılar `scripts/i18n/pivot-gates.mjs`: SMCP komutları ve
  kısaltmalar maskelenip aynen kalır, sayı/kısaltma/anlam kuralı/iskele-sancak/
  alfabe/uzunluk denetlenir; 1–2 kelimelik riskli etiketler (trim, port, draft…)
  yalnız `maritimeTerms` karşılığıyla çevrilir. Kaynak izi
  `scripts/i18n/pivot/<dil>.json`; İngilizcesi değişen satır bayatlar ve
  İngilizceye döner (`npm run i18n:pivot -- --check|--fix`, `i18n:verify`
  içinde; kural dosyası değişince kabul edilmiş satırlar yeniden denetlenir).
  Kalan İngilizce: `npm run i18n:english-share`. CI:
  `.github/workflows/i18n-translate.yml` (elle + haftalık, dil başına ayrı
  runner) `main`'e commit eder ve AAB'yi başlatır. Sözlük URL'lerindeki sürüm
  `src/i18n/localeVersion.ts` (içerik hash'i): `i18n:fix`, `i18n:fill-english`
  ve `i18n:translate` kendisi günceller; `public/locales`'i başka yoldan
  değiştirdiysen (ör. `i18n:repair-en`) `npm run i18n:pivot -- --fix` çalıştır.
- Native derlemede (`build:native`) `dist/locales/<dil>.json` dosyaları
  `scripts/i18n/pack-locales.mjs` ile paketlenir: ortak `packed/keys.json` +
  dil başına değer dizisi (İngilizceyle/anahtarla aynı değer işaretle yazılır).
  Her dil birebir doğrulanmadan tam JSON çıktıdan kalkmaz; repodaki
  `public/locales` ve web derlemesi değişmez. Release'te R8 açık
  (`minifyEnabled`/`shrinkResources`, kurallar `android/app/proguard-rules.pro`).
- Sözlük sayfası paketleri: `src/data/glossary-i18n/<dil>.json` (en, de, fr, es,
  it, pt, nl elle kontrol edildi, dokunulmaz). Diğer 16 dil
  `npm run i18n:glossary` ile pivottan üretilir (`meta.generated: "pivot"`);
  madde başı (terimin kendisi) İngilizce kalır, tanım ve kategori çevrilir.
- Anlam hatası taraması: `scripts/i18n/sense-error-rules.mjs` →
  `npm run i18n:scan-senses`. `npm run i18n:fix` hatalı satırı İngilizceye
  çevirir (24 dilde ~40 dk, arka planda çalıştır).
- İngilizce düzeltme kuralları:
  `supabase/functions/_shared/englishMaritimeTerminology.ts` (T-001…T-184).
- Kaynak metin değişince: `npm run i18n:extract`, sonra `npm run i18n:fix`.
  Çıkarıcı JSX karakter referanslarını (`&amp;`, `&rsquo;` …) React gibi çözer.
  Yalnız yeni İngilizce arayüz metni eklendiyse hızlı yol:
  `npm run i18n:fill-english` (24 dile İngilizce yazar ve `ui-coverage.json`'a
  kaydeder; Türkçe metni doldurmaz).
- Ders paragrafları (`paragraphs` alanları): kontrol edilmiş İngilizce
  `scripts/i18n/verified/paragraphs/<modül>.json` (`{türkçe: english}`) →
  `npm run i18n:paragraphs` → `public/locales/shared/lesson-paragraphs.en.json`.
  Bu paket her dilin statik sözlüğüne eksik anahtar olarak eklenir; pivot
  katmanı paragrafı dil sözlüğüne çevrilmiş olarak yazar, kapıdan geçmeyen
  paragraf İngilizce kalır. Derleme T-kurallarını,
  anlam kurallarını ve Türkçe kalıntıyı denetler; kuraldan geçmeyen satır
  pakete girmez. Türkçe kaynakta bilgi hatası düzeltilirse paketteki anahtar
  da aynı metne çevrilmeli (yoksa "stale" sayılır ve atlanır).

## Commit öncesi kontroller
```
npm run lint
npm run typecheck
npm run test:i18n-terms
npm run i18n:repair-en -- --check
npm run i18n:audit-terms -- --lang=en --strict --max-errors=0
npm run i18n:audit-terms -- --strict --max-errors=0
npm run i18n:scan-senses -- --check
npm run check:svg-text
npm run check:ux-consistency
npm run check:design-system
npm run i18n:verify
npm run build:native
```
`i18n:check` için önce `npm run i18n:extract` çalışmalı
(`source-strings.json` repoda tutulmuyor). Hepsini sırayla `/precommit`
skill'i çalıştırır ve commit mesajı taslağını self-check listesiyle hazırlar.
Çeviri/ders metni değişikliğinden sonra `terminology-reviewer` subagent'ı
(`.claude/agents/`, yalnız okur) terimleri GLOSSARY.md'ye göre denetler.
Arayüz değişikliğini vite preview + Playwright ekran görüntüsüyle doğrula
(`.claude/skills/verify`). `.env` ve keystore dosyaları
`.claude/settings.json`'daki `permissions.deny` ile okunamaz/düzenlenemez.

## Görsel iş akışı
- Wikimedia Commons'a sadece GitHub Actions üzerinden erişilir:
  `.github/workflows/commons-images.yml` + `scripts/images/commons-tool.mjs`
  (modlar: `candidates`, `fetch`). Sonuç, check-run anotasyonundaki
  `commons-result-blob <sha>` git blob'u olarak gelir.
- Görseli açıp kendin kontrol etmeden kullanma.
- Raster görseller en uzun kenarı 1600 px olacak şekilde küçültülür.
- Kredi: `src/assets/IMAGE_CREDITS.md` veya ilgili klasörün `CREDITS.md`
  dosyası (clouds/, meteorology/, lessons/, instruments/, ship-systems/);
  sonra `node scripts/images/build-credits.mjs`.
- Hâlâ boş konular: altocumulus castellanus, Beaufort deniz durumları, IALA özel
  işaret, IMDG etiketleri, otopilot, BNWAS.

## Yayın
- `main`'e her push `android-release.yml`'i çalıştırır ve imzalı AAB üretir
  (artifact: `marine-expert-pro-release-aab`). Build'den önce `i18n:extract`,
  `i18n:verify` ve svg/ux/tasarım kontrolleri çalışır; biri kalırsa AAB
  üretilmez. Lovable/PR'ın eklediği yeni İngilizce metin CI'da o derleme için
  otomatik doldurulur (`fill-english-coverage.mjs --ci`, run sayfasında uyarı);
  Türkçe metin ve terim hatası derlemeyi yine durdurur. Kalan kontrolün ilk
  hata satırları run sayfasına not (annotation) olarak düşer.
- Production build'den önce repo değişkeni `PRO_GATING_ENABLED=true` olmalı
  (`src/config/proGating.ts`). Kapalı testte kapalı kalır.

## Bilinen açık işler
- Ders metinleri (24 dilde ~94 bin satır) satır satır kontrol edilmemiş makine
  çevirisi; tarama sadece belirli hata türlerini yakalar (ör. Almancada fener
  çakarları için "Schläge pro Minute").
- Pivot katmanından önce her dilde ~26 bin satır (içeriğin ~%35'i) İngilizce
  görünüyordu; artık `i18n-translate.yml` ile çevriliyor. Kalan İngilizce
  satırlar ve gerekçeleri: `npm run i18n:english-share`,
  `scripts/i18n/pivot/<dil>.json` (`rejected`). Pivot çevirisi elle kontrol
  edilmemiş makine çevirisidir; elle kontrol edilmiş çeviri `verified/` altına
  dil koduyla eklenirse her zaman onun yerine geçer.
- Çıkarılan arayüz metinlerinin hepsinin 24 dilde sözlük karşılığı var
  (`i18n:check -- --strict` %100); eksik kalanlar
  `scripts/i18n/verified/ui-coverage.json` ile İngilizce dolduruldu.
- Sözlükte olmayan metin canlı Google çevirisine (gtx) gider; servis 429
  verirse veya ağ yoksa ekranda Türkçe kalır. Çıkarıcının kaçırdığı
  ders/SOLAS/STCW/COLREG metinleri
  `scripts/i18n/verified/english-leftover-texts.json` paketinde (İngilizce, diğer
  dillere İngilizce dolgu). Yeni ekranda Türkçe kalırsa çözüm buraya eklemektir.
  `npm run i18n:leftovers -- --check` (i18n:verify içinde) sözlükte karşılığı
  olmayan yeni Türkçe metni ve `${…}` çevresinde Türkçe kelime birleştiren
  şablonları yakalar; çalışma anında Türkçe parça birleştirme, her parçayı
  ayrı metin olarak göster.
- Ders paragrafları (`paragraphs` alanları, 7.265 paragraf): tamamı kontrol
  edilmiş İngilizcede, tek paket: `scripts/i18n/verified/paragraphs/*.json` →
  `public/locales/shared/lesson-paragraphs.en.json`. Paragraflar dil
  sözlüklerine yalnız pivot çevirisi olarak girer (`translate-pivot.mjs`);
  elle İngilizce kopyasını ekleme. Eksik paragraf varsa build artık hata verir.
- Önceki 24 eksik paragraf kaynak düzeltmesi ve kontrol edilmiş İngilizceyle
  tamamlandı. Seçilmiş terim düzeltmeleri `terminology-completion.json` →
  `shared/terminology-overrides.json` paketinde; yalnız açıkça belirtilen
  anahtarları dil sözlüğünün üstüne uygular. Terim denetimi eşiği sıfırdır.
- Türkçe kalıntı (27 Eki 2026 taraması): `paragraphs` dışındaki veri dosyalarında
  sözlükte karşılığı olmayan ~9 bin Türkçe metin var (çıkarıcı yalnız
  `ALLOWED_PROPS` alanlarını alıyor). En yoğun: `musterList.ts`,
  `shipSystemsData.ts`, `shipTaskDetailData.ts`, `crewRoleDetails.ts`,
  `regulations/*`, `bridgeDevices.ts`. Bunlar çevrimdışında Türkçe kalır.
  İşaret bayrakları ve stabilite bölüm başlıkları kontrol edildi
  (`verified/signal-flags.json`, `verified/stability-chapter-titles.json`).
- Google girişi Lovable editör önizlemesinde (iframe) ve uygulama içi
  tarayıcılarda çalışmaz (Google engeller); giriş ekranı bunu algılayıp yeni
  sekmede açar / uyarı gösterir. Gerçek test: nauticalleap.com veya Android.
- Kalın (`**…**`) parçalarla bölünmüş markdown cümleleri ayrı düğümlere
  çevrilir ve bozuk İngilizce çıkar. `navigationTopicContents.ts` ve
  `stabilityTopicsContent.ts`'de cümle ortası kalınlar kaldırıldı; yeni
  içerikte cümle ortasında `**` kullanma (yalnızca "**Etiket:** cümle" olur).
