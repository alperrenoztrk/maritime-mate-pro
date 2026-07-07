# Regulation Compliance Audit — Mariner's Book

**Date:** 2026-05-06
**Scope:** Güverte (navigation, seamanship, stability, safety, communication, cargo, meteorology) + Makine (machine) modülleri.
**Reference:** `src/data/compliance/regulationMatrix.ts` (canonical values & refs).

---

## 1. Faz 1 — Altyapı (TAMAMLANDI bu turda)

- ✅ `src/data/compliance/regulationMatrix.ts` oluşturuldu.
  - 25+ regülasyon referansı (SOLAS, MARPOL, COLREG, STCW, MLC, IS Code, IAMSAR, IMDG/IBC/IGC, ISM, ISPS, BWM, HKC, MEPC kararları).
  - `CANONICAL_VALUES` objesi: tüm sayısal sınırlar tek noktadan beslenecek (15 ppm OWS, %0.5/0.1 sülfür, 10/77 dinlenme, GM ≥ 0.15 m, vs.).
  - Topic → regulation eşlemesi (`CURRICULUM_COMPLIANCE`).
- ✅ Bu denetim raporu hazırlandı (aşağıda dosya-dosya tutarsızlık listesi).

---

## 2. Tespit edilen tutarsızlıklar (düzeltilecek — sonraki turlar)

### 2.1 `src/pages/MachineTopicFormulasPage.tsx`

| # | Mevcut | Sorun | Düzeltme | Kaynak |
|---|--------|-------|----------|--------|
| 1 | Yakıt parlama noktası "Tflash ≥ 60°C" | Doğru ama referanssız | "≥ 60 °C (SOLAS II-2/Reg.4.2.1)" | SOLAS II-2/4 |
| 2 | OWS limit 15 ppm | Doğru, kaynak eksik | "MARPOL Annex I Reg. 15" eklenecek | MARPOL/I/15 |
| 3 | Sewage BOD ≤ 25 mg/L | Eksik: TSS ≤ 35 mg/L | "BOD₅ ≤ 25 mg/L; TSS ≤ 35 mg/L (MARPOL Annex IV Reg. 11)" | MARPOL/IV/11 |
| 4 | "Syakıt: yakıt kükürt oranı (%, m/m)" | Sınır verilmemiş | "Global ≤ 0.50% m/m (2020+); ECA ≤ 0.10% m/m" | MARPOL/VI/14 |
| 5 | EEDI/EEXI/CII formülleri | Genel formül var, MEPC kararları belirtilmemiş | EEXI: MEPC.328(76); CII: MEPC.336(76); SEEMP III: MEPC.346(78) | MEPC kararları |
| 6 | CO₂ "0,56 kg/m³ (min %40)" | Doğru ama "min %40" yanlış formüle ediliyor | "Tasarım: makine mahallinin %40'ı için net hacim; m = V × 0.56 kg/m³" | SOLAS II-2/10 |
| 7 | STCW dinlenme: "10 saat / 24 sa, 77 saat / 7 gün" | Doğru, A-VIII/1 referansı eksik | "STCW A-VIII/1 (Manila 2010)" | STCW |
| 8 | Carbon factor: HFO 3.114, MDO 3.206 | Doğru, LNG eksik | LNG = 2.750 eklenecek | MEPC.328(76) |

### 2.2 `src/data/machineTopicLessonData.ts`
- Kontrol edilecek: SOx/NOx anlatımı, Tier I/II/III tarihleri (2000/2011/2016+).
- Beklenen düzeltme: Tier III alanı "NECA + 2016 (Kuzey Amerika/Karayipler), Baltık+Kuzey Denizi 2021-01-01".

### 2.3 `src/data/machineQuestions.ts` (~50 soru)
- "Sülfür içeriği" sorularının cevabı %3.5 ise → %0.5 (global) olarak güncellenecek.
- "EEDI mevcut gemilerde uygulanır" tipi yanıltıcı sorular → EEXI olarak düzeltilecek.
- Her sorunun `explanation` alanına "Kaynak: SOLAS … / MARPOL …" eklenecek.

### 2.4 `src/data/formulas/stability.json` & `stabilityQuestions.ts`
- IS Code 2008 kriterleri eksiksiz olmalı:
  - GM₀ ≥ 0.15 m
  - GZ@30° ≥ 0.20 m
  - GZmax açısı ≥ 25°
  - Alan 0–30°: ≥ 0.055 m·rad
  - Alan 0–40°: ≥ 0.090 m·rad
  - Alan 30–40°: ≥ 0.030 m·rad
  - Severe wind/rolling (weather) kriteri ayrı listelenmeli
- Mevcut quiz cevaplarında 0.15/0.20/25° değerleri doğrulanacak.

### 2.5 `src/data/navigationQuestions.ts`
- COLREG 13–18 sorularında "vessel" tanımları (Rule 3) hâlâ Türkçe açıklamada var mı? Doğrulama.
- ECDIS zorunluluğu: "yeni gemiler 2012, mevcut gemiler 2018'e kadar (faz tamamlandı)" — eski "2018'den itibaren zorunlu olacak" ifadeleri güncellenecek.
- BNWAS: 150 GT ↑ yolcu / 500 GT ↑ kargo — SOLAS V/19.2.2.3 doğrulanacak.

### 2.6 `src/data/seamanshipQuestions.ts`
- Demir, halat, palamar değerleri klasik denizcilik bilgisi — regülasyon referansı şart değil ama ISM/SMS bağlantısı eklenecek.

### 2.7 `src/data/safetyQuestions.ts`
- Fire/abandon ship drill: "ayda en az 1 kez + %25 mürettebat değişiminde 24 saat içinde" — SOLAS III/19.3.
- LSA Code referansları (MSC.48(66)) eklenecek.
- SOLAS II-2 Reg.10 CO₂ hesabı doğrulanacak.

### 2.8 `src/data/cargoQuestions.ts`
- IMDG Code Amdt 41-22 (2024-01-01) referansı eklenecek.
- IBC/IGC kod adları doğrulanacak.

### 2.9 `src/data/meteorologyQuestions.ts`
- Regülasyon teması düşük; SOLAS V/31 (tehlikeli buz/fırtına ihbarı), V/32 (mesaj formatı), V/34 (havadan gelen meteorolojik bilgi) referansları eklenecek.

### 2.10 `src/data/communicationTopicContents.ts`
- GMDSS deniz alanları (A1/A2/A3/A4) → SOLAS IV.
- DSC, EPIRB, SART, NAVTEX zorunluluk kaynakları SOLAS IV/Reg. 7-15 ile etiketlenecek.

### 2.11 `src/data/regulations/*` ve `solas2024.ts`
- Eksikler:
  - MEPC.328(76), MEPC.336(76), MEPC.346(78), MEPC.377(80) kararları.
  - Hong Kong Convention (yürürlük 2025-06-26).
  - BWM D-2 tam uyum tarihi (2024-09-08).
  - SOLAS 2024 amendments (MSC.521(106)) — yangın güvenliği.

---

## 3. Sonraki tur planı

| Tur | İçerik | Etki edilen dosyalar |
|-----|--------|----------------------|
| **2** | Makine: formüller + lesson + quiz | `MachineTopicFormulasPage.tsx`, `machineTopicLessonData.ts`, `machineQuestions.ts` |
| **3** | Stabilite & hidrostatik | `stability.json`, `stabilityQuestions.ts`, `topicContents.ts` (stabilite konuları) |
| **4** | Seyir & COLREG | `navigationTopicContents.ts`, `navigationQuestions.ts` |
| **5** | Emniyet & SAR | `safetyQuestions.ts`, `topicContents.ts` (safety) |
| **6** | Denizcilik, kargo, meteoroloji, haberleşme | `seamanshipQuestions.ts`, `cargoQuestions.ts`, `meteorologyQuestions.ts`, `communicationTopicContents.ts` |
| **7** | Regülasyonlar listesi + UI rozetleri | `regulations/*`, `solas2024.ts`, deep-dive UI rozet bileşeni |

Her tur 1 modülü tamamen yeniden doğrular ve gerekli düzeltmeleri uygular. **Tur 2'ye geçmek için onayınızı bekliyorum.**
