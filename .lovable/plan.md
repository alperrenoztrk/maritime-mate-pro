## Amaç

Güverte (seyir, denizcilik, stabilite, emniyet, haberleşme, kargo, meteoroloji) ve Makine derslerindeki **konu anlatımları, formüller, quiz soruları ve kurallar**ı güncel uluslararası denizcilik regülasyonlarıyla (SOLAS, MARPOL, STCW, COLREG, IMO MSC/MEPC kararları, ISM, ISPS, MLC 2006, Load Lines, IMDG, IBC, IGC, MARPOL Annex VI, EEDI/EEXI/CII vb.) bire bir uyumlu hale getirmek.

## Kapsam (mevcut dosyalar)

**Güverte tarafı:**
- `src/data/navigationQuestions.ts`, `seamanshipQuestions.ts`, `stabilityQuestions.ts`, `safetyQuestions.ts`, `meteorologyQuestions.ts`, `cargoQuestions.ts`
- `src/data/topicContents.ts`, `navigationTopicContents.ts`, `communicationTopicContents.ts`
- `src/data/regulations/*` (IMO, safety codes, environmental, regional, survey)
- `src/data/solas2024.ts`, `shipOperations/*`
- `src/data/formulas/stability.json`, `hydrostatics.json`

**Makine tarafı:**
- `src/data/machineQuestions.ts`, `machineQuizData1.ts`, `machineQuizDataIndex.ts`
- `src/data/machineTopicData.ts`, `machineTopicLessonData.ts`, `machineTopicDetailContent9.ts`
- `src/pages/MachineTopicFormulasPage.tsx` (formül listesi)
- `docs/gemi_makineleri.md`

## Yaklaşım: 3 fazlı denetim ve düzeltme

### Faz 1 — Regülasyon Referans Matrisi
Her ders konusunu, ilgili olduğu yürürlükteki regülasyon maddesine eşleyen kanonik bir kaynak dosyası oluşturulur:

`src/data/compliance/regulationMatrix.ts`

İçerik (örnek):
```text
COLREG Rule 5      → seamanshipQuestions / nöbet, gözcülük
COLREG Rule 13–18  → çatışmayı önleme soruları
SOLAS II-1         → stabilite, hasar stabilitesi (2020 amendments)
SOLAS II-2 Reg.10  → CO2 hacim hesabı (mCO₂ = V × 0.56)
SOLAS III          → can kurtarma, drill periyotları
SOLAS V            → seyir teçhizatı, ECDIS, BNWAS
MARPOL Annex I     → OWS 15 ppm, ODMCS
MARPOL Annex VI    → SOx (%0.5 global, %0.1 ECA), NOx Tier I/II/III
IMO 2020 + 2023    → CII, EEXI, SEEMP Part III
STCW A-VIII/1      → 10 saat / 24 sa, 77 saat / 7 gün dinlenme
MLC 2006           → çalışma süreleri
Load Lines 1966/88 → fribord, mevsim bölgeleri
IAMSAR             → SAR prosedürleri
IMDG / IBC / IGC   → tehlikeli yük
```

Bu matris hem denetim referansı hem de "Bu konu hangi regülasyondan geliyor?" rozeti için UI tarafından kullanılabilir.

### Faz 2 — İçerik Denetimi ve Düzeltme

Her dosya için aşağıdaki adımlar:

1. **Konu anlatımları** (`*TopicContents.ts`, `machineTopicLessonData.ts`):
   - Bahsedilen kuralın güncel versiyonu (ör. SOLAS 2020/2024 değişiklikleri, MARPOL Annex VI 2020 sülfür sınırı, EEXI/CII 2023) kontrol edilir
   - Eski/yanlış değerler düzeltilir (örn. "MARPOL %3.5 sülfür" → "global %0.5, ECA %0.1")
   - Her konu sonuna "Regülasyon kaynağı" bölümü eklenir (madde numarası ile)

2. **Formüller** (`MachineTopicFormulasPage.tsx`, `formulas/*.json`):
   - EEDI/EEXI/CII formülleri MEPC.328(76) ve MEPC.336(76) ile karşılaştırılır
   - SOLAS II-2 yangın söndürme hesapları (CO₂ %40, köpük) kontrol edilir
   - STCW dinlenme saatleri formülleri doğrulanır
   - Stabilite kriterleri (IS Code 2008): GM ≥ 0.15 m, GZ@30°≥ 0.20 m, GZmax ≥ 25°, vb.
   - Yanlış/eksik formüller düzeltilir, kaynak madde eklenir

3. **Quiz soruları** (`*Questions.ts`):
   - Her sorunun cevabı yürürlükteki kurala göre tekrar doğrulanır
   - `explanation` alanına ilgili regülasyon maddesi eklenir
   - Eski rakam/değerler güncellenir (özellikle MARPOL Annex VI, BWM, CII)
   - Kategori bazında sayım korunur (memory: 50 soru/topic standardı)

4. **Kurallar/Kod listeleri** (`regulations/*`, `solas2024.ts`):
   - Yürürlük tarihleri, son değişiklikler (amendments) güncellenir
   - 2023–2026 IMO kararları (MEPC 80/81, MSC 107/108) eklenir

### Faz 3 — UI'da Regülasyon İzlenebilirliği
- Konu kartlarına ve quiz açıklamalarına küçük "📜 SOLAS V/19" rozeti
- Deep-dive modallarında "İlgili regülasyon" bölümü
- Memory kuralı eklenir: *"Tüm güverte/makine içerikleri compliance/regulationMatrix.ts ile bağlantılı olmalı."*

## Teslim sırası (her tur ≈ 1 modül)

1. **Tur 1 — Altyapı:** `compliance/regulationMatrix.ts` + denetim raporu (`docs/regulation-audit.md`) — hangi içerikte hangi tutarsızlık var, tüm liste.
2. **Tur 2 — Makine formülleri & lesson:** `MachineTopicFormulasPage.tsx`, `machineTopicLessonData.ts`, `machineQuestions.ts` (EEDI/EEXI/CII, SOx/NOx, SOLAS II-2 hesapları).
3. **Tur 3 — Stabilite & hidrostatik:** IS Code 2008, SOLAS II-1 hasar stabilitesi (`stability.json`, `stabilityQuestions.ts`).
4. **Tur 4 — Seyir & COLREG:** `navigationTopicContents.ts`, `navigationQuestions.ts`, SOLAS V.
5. **Tur 5 — Emniyet & SAR:** SOLAS II-2/III, IAMSAR (`safetyQuestions.ts`).
6. **Tur 6 — Denizcilik, kargo, meteoroloji, haberleşme:** kalan modüller.
7. **Tur 7 — UI rozetleri & memory güncellemesi.**

Her tur sonunda kullanıcı onayı alınır; bir sonraki tura geçilir. Bu, hem doğruluk gözden geçirmenizi hem de uygulamanın stabilitesini korur.

## Teknik Notlar

- Tüm değişiklikler mevcut tip yapılarıyla uyumlu kalacak (ek alan yerine `metadata?: { regulation?: string }` gibi opsiyonel alanlar tercih edilir).
- AI üretimi minimum tutulacak; veriler IMO/EMSA/USCG resmi yayınlarına dayandırılacak (memory kuralı ile uyumlu).
- Hiçbir mevcut quiz silinmez; yalnızca cevap/açıklama düzeltilir → soru sayıları korunur (50/topic).

## Onayınız sonrası ilk tur

İlk tur olarak **regulationMatrix.ts + tam denetim raporu (`docs/regulation-audit.md`)** üretilir; rapor; her dosyada bulunan tutarsızlıkların listesini içerir. Sonraki turlarda bu rapora göre düzeltmeler uygulanır.

Devam etmemi onaylar mısınız?
