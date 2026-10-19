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
  kullanıcıya sorulur. Emin olunmayan dilde yanlış çeviri yerine kontrol
  edilmiş İngilizce kalır. **Eksik olabilir, yanlış olamaz.**
  Terim karşılıkları için: [GLOSSARY.md](GLOSSARY.md).
- Görseller: yapay zekâ ile üretilmiş görsel yok, konuyla birebir uyuşmayan
  görsel yok, düşük çözünürlük yok. Birebir uyan yoksa bölüm boş kalır.
- Commit mesajı İngilizce. Sonuna Türkçe "Terim denetimi (self-check)" listesi
  eklenir.

## Teknik harita
- React 18 + Vite + Capacitor 7 (Android). Supabase projesi: `vrpbhguztsqakvjcezeb`.
- Arayüz İngilizce, varsayılan dil `en`. Türkçe sunulmuyor ama kaynak metinlerin
  çoğu Türkçe.
- Çeviri: `public/locales/<dil>.json` (24 dil). Anahtar, kaynak metnin kendisi.
  Çalışma anındaki sıra: coreUiTranslations → kısaltma → maritimeGlossary
  override (`supabase/functions/_shared/maritimeGlossary.ts`) → statik sözlük →
  canlı makine çevirisi.
- Elle kontrol edilmiş metinler: `scripts/i18n/verified/*.json`. Dosya bir dili
  listelemiyorsa o dilde İngilizcesi gösterilir; `"fill": false` varsa
  gösterilmez.
- Sözlük sayfası paketleri: `src/data/glossary-i18n/<dil>.json` (en, de, fr, es,
  it, pt, nl kontrol edildi).
- Anlam hatası taraması: `scripts/i18n/sense-error-rules.mjs` →
  `npm run i18n:scan-senses`. `npm run i18n:fix` hatalı satırı İngilizceye
  çevirir (24 dilde ~40 dk, arka planda çalıştır).
- İngilizce düzeltme kuralları:
  `supabase/functions/_shared/englishMaritimeTerminology.ts` (T-001…T-147).
- Kaynak metin değişince: `npm run i18n:extract`, sonra `npm run i18n:fix`.

## Commit öncesi kontroller
```
npm run lint
npm run typecheck
npm run test:i18n-terms
npm run i18n:repair-en -- --check
npm run i18n:audit-terms -- --lang=en --strict --max-errors=0
npm run i18n:audit-terms -- --strict --max-errors=126
npm run i18n:scan-senses -- --check
npm run check:svg-text
npm run build:native
```
`check:ux-consistency` ve `check:design-system` zaten başarısız (Türkçe sekme
etiketleri vb.). Bunları düzeltmek için İngilizce arayüzü geri alma.
Arayüz değişikliğini vite preview + Playwright ekran görüntüsüyle doğrula
(`.claude/skills/verify`).

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
  (artifact: `marine-expert-pro-release-aab`).
- Production build'den önce repo değişkeni `PRO_GATING_ENABLED=true` olmalı
  (`src/config/proGating.ts`). Kapalı testte kapalı kalır.

## Bilinen açık işler
- Ders metinleri (24 dilde ~94 bin satır) satır satır kontrol edilmemiş makine
  çevirisi; tarama sadece belirli hata türlerini yakalar (ör. Almancada fener
  çakarları için "Schläge pro Minute").
- 23 dilde ~750 satır şimdilik İngilizce; kontrol edilmiş çeviriyle
  `verified/` altına eklenerek geri açılabilir.
- ~79 metnin (Pro ekranları, görsel altyazıları) hiçbir dilde sözlük karşılığı
  yok; canlı çeviriye gidiyor.
- Sözlükte olmayan metin canlı Google çevirisine (gtx) gider; servis 429
  verirse veya ağ yoksa ekranda Türkçe kalır. Çıkarıcının kaçırdığı
  ders/SOLAS/STCW/COLREG metinleri
  `scripts/i18n/verified/english-leftover-texts.json` paketinde (İngilizce, diğer
  dillere İngilizce dolgu). Yeni ekranda Türkçe kalırsa çözüm buraya eklemektir.
- `paragraphs` alanı çıkarıcıda bilinçli olarak yok: ~6.700 Türkçe paragraf
  (`machineTopicDetailContent*.ts`, `shipSystemsData.ts`, `crewTasks/`) sözlükte
  yok, tamamen canlı çeviriye bağlı.
- Kalın (`**…**`) parçalarla bölünmüş markdown cümleleri ayrı düğümlere
  çevrilir ve bozuk İngilizce çıkar. `navigationTopicContents.ts` ve
  `stabilityTopicsContent.ts`'de cümle ortası kalınlar kaldırıldı; yeni
  içerikte cümle ortasında `**` kullanma (yalnızca "**Etiket:** cümle" olur).
