# Mariners Book — Akademik İçerik Tam Tarama Raporu

**Tarih:** 2026-07-11
**Kapsam:** Uygulamadaki tüm eğitim/konu anlatımı yazıları (docs/, kök dizin *.md, src/data/)
**Metodoloji:** [Imbad0202/academic-research-skills](https://github.com/Imbad0202/academic-research-skills) deposunda tanımlanan akademik inceleme standartları esas alınmıştır:

- **İddia-kanıt sadakati denetimi** (claim-faithfulness audit): Metindeki iddiaların gerçek standartlarla (IMO, SOLAS, MARPOL, STCW, COLREG, LSA/IS Code) karşılaştırılması
- **Deterministik atıf doğrulama** (citation verification): Verilen karar/sirküler numaralarının gerçek belgelerle eşleşmesinin kontrolü
- **Halüsinasyon karşıtı kontrol** (anti-hallucination checklist): Konu dışına kayma (frame-lock), uydurma metodoloji, kaynak yerine parametrik bilgiden doldurma tespiti
- **Görsel sadakati** (figure fidelity): Görsellerin metinle uyumu ve erişilebilirlik/lisans durumu
- **Yazım kalitesi** (writing quality check): Yapı, tutarlılık, terminoloji ve makine-üretimi kalıplar
- **0–100 hakem rubriği**: ≥80 Kabul · 65–79 Küçük Revizyon · 50–64 Büyük Revizyon · <50 Ret

## Taranan Külliyat

| Külliyat | Boyut / Adet | Tarama Yöntemi |
| --- | --- | --- |
| `docs/*.md` konu anlatımları (meteoroloji, gemi makineleri, köprüüstü aygıtları, stabilite, SOLAS 2024 özeti) | 5 ana doküman | Tam okuma |
| Kök dizin teknik dokümanlar (`gemi_stabilite_hesaplamalari.md`, `HYDROSTATIC_CALCULATIONS.md`) | 2 doküman | Tam okuma |
| `src/data/*TopicContents.ts` (seyir, stabilite, meteoroloji, haberleşme, kargo, emniyet, çevre, gemicilik, ekonomi) | ~1,3 MB metin | Yapı taraması + yüksek riskli sayısal iddiaların hedefli doğrulaması |
| `src/data/machineTopicDetailContent*.ts` (11 dosya) | ~1 MB | Hedefli örnekleme |
| `src/data/courseContent/*` (28 modül), `shipOperations/*`, `shipSystems/*`, `crewRoleDetails.ts`, `crewTasks/*`, soru bankaları | ~650 dosya | Formül doğrulama + atıf denetimi + örnekleme |

Toplam ~12 MB eğitim içeriği; sayısal/olgusal iddialar (formüller, limit değerleri, frekanslar, mevzuat referansları) öncelikli olarak doğrulanmıştır.

---

## 1. KRİTİK BULGULAR (yayın engelleyici)

### K-1. Konu dışı içerik: `docs/stabilite.md` gemi stabilitesi DEĞİL, kontrol teorisi anlatıyor
Dosyanın tamamı (101 satır) Lyapunov kararlılığı, Routh–Hurwitz, Nyquist kriteri, µ-analizi gibi **kontrol ve sinyal sistemleri** konularını içeriyor; kaynakçası da Ogata, Khalil, Zhou–Doyle–Glover gibi kontrol mühendisliği kitapları. Denizcilik uygulamasında "stabilite" başlığı altında GM, GZ, metasantr beklenir. Bu, referans deponun "frame-lock / konu kayması" halüsinasyon modunun ders kitabı örneğidir. **Öneri:** Dosya kaldırılmalı veya gemi stabilitesi içeriğiyle yeniden yazılmalı (uygulamada zaten doğru içerik `src/data/stabilityTopicsContent.ts` içinde mevcut).

### K-2. Hatalı formül: `gemi_stabilite_hesaplamalari.md:18`
```
GM = (I/∇) - KG        ← HATALI
```
Doğrusu: **GM = KB + BM − KG = KB + (I/∇) − KG**. Formülde KB (omurga–yüzdürme merkezi mesafesi) terimi eksik; bu haliyle öğrenciye sistematik olarak küçük GM hesaplatır. Aynı dosyadaki ana formül (`GM = KM − KG`) doğrudur; iki formül birbiriyle çelişmektedir.

### K-3. Uydurma/yanlış atıf: `src/data/crewRoleDetails.ts:92`
Kaçak yolcu (stowaway) prosedürü için **IMO Resolution A.1117(30)** gösterilmiş. Doğrulama sonucu: A.1117(30) "**IMO Ship Identification Number Scheme**" başlıklı karardır ([IMO](https://puc.overheid.nl/nsi/doc/PUC_698049_14/1/)); kaçak yolcuyla ilgisi yoktur. Doğru referans: **Resolution A.871(20)** ve güncel hali **FAL.13(42)** kılavuzları ile FAL Convention hükümleridir. Bu, referans deponun engellemeyi zorunlu tuttuğu "var olan ama iddiayı desteklemeyen kaynak" hatasının birebir örneğidir.

### K-4. Olgusal hata: `docs/kopruustu_aygitlari.md:6`
> "Manyetik Pusula — Dünyanın manyetik alanı ile hizalanarak **gerçek yönü** gösterir"

Manyetik pusula **manyetik kuzeyi** gösterir; gerçek (hakiki) yön ancak varyasyon + deviasyon düzeltmesiyle elde edilir. Aynı maddenin bir alt satırı bunu doğru anlatıyor ("manyetik sapma ve deviasyonla düzeltilir") — metin kendi içinde çelişkilidir. Temel seyir eğitiminde en kritik ayrımlardan biri olduğundan kritik sayılmıştır.

---

## 2. BÜYÜK BULGULAR (büyük revizyon gerektirir)

### B-1. Terminoloji hatası: `HYDROSTATIC_CALCULATIONS.md` (Merkez Noktaları bölümü)
- "**KM**: Metasentrik yükseklik" ve "**GM**: Metasentrik yükseklik" — ikisi aynı tanımla verilmiş. KM, omurgadan metasantra olan mesafedir; metasentrik yükseklik yalnızca GM'dir.
- "VCF: Dikey yüzme merkezi" standart dışı/anlamsız bir terimdir (LCF su hattı alanının merkezidir, dikey bileşeni tanımlanmaz).

### B-2. Ters tanım: `src/data/stabilityTopicsContent.ts:39`
> "stabilite … geminin **eski durumuna dönmeye karşı gösterdiği direncin** ölçüsüdür"

Tanım tersine yazılmış: stabilite eski konumuna **dönme eğiliminin/yeteneğinin** ölçüsüdür (bir üst paragraf doğru tanımı veriyor; ikinci cümle metni çürütüyor).

### B-3. Şüpheli mevzuat referansları: `docs/solas_2024_consolidated_summary.md`
- Satır 129: SART/AIS-SART taşıma gerekliliği "**SOLAS V/7**" olarak gösterilmiş; V/7 "Arama ve kurtarma hizmetleri"dir, SART taşıma gerekliliği **SOLAS III/6.2.2**'dedir.
- "İşaret fişeği — 12 paraşüt roket … SOLAS III/34" — 12 paraşüt roketi köprüüstü gerekliliği **SOLAS III/6.3**'tedir; III/34 referansı doğrulanamamıştır.
- "Filika kapasitesi: Gemideki herkes + %10 yedek" — SOLAS III/21 ve III/31'de böyle bir "+%10" kuralı yoktur (yolcu gemisinde her bordada %50 filika + salla tamamlama; yük gemisinde her bordada %100 esastır). Tablolar "örnek" olarak etiketlense de yanlış değer öğretir.
- "painter > 15 m" — LSA Code'da can salı painter uzunluğu istif yüksekliğine bağlı tanımlanır (≥10 m + istif yüksekliği); sabit "15 m" değeri doğrulanamaz.

### B-4. Hatalı kural özeti: `src/data/courseContent/rules/navigation.ts:37`
> "Kural 13 — … **Kıç taraftan 22.5° dışındaki açıdan** yaklaşan gemi geçiyor sayılır."

COLREG Kural 13(b)'nin doğru ifadesi: diğer geminin **kemeresinin 22,5°'den daha gerisinden** (more than 22.5° abaft her beam) yaklaşan gemi "geçen gemi"dir. Mevcut cümle geometriyi yanlış tarif ediyor. (Aynı kural `scenarios/navigation.ts:461,478,562`'de doğru anlatılmış — iç tutarsızlık.)

### B-5. Atıf altyapısının yokluğu (külliyat geneli)
Referans deponun temel şartı olan "üç katmanlı atıf çapası" (kaynak + sayfa/bölüm konumu + doğrulanabilirlik) külliyatın **~%95'inde yok**:
- `docs/meteoroloji_konu_anlatimlari.md`, `docs/gemi_makineleri.md`, `docs/kopruustu_aygitlari.md`: hiç kaynak yok (meteorolojide yalnızca genel "resmî kaynaklara başvurun" notu var — bu iyi bir uygulama ama atıf değil).
- `src/data/*TopicContents.ts`: satır içi atıf yok; yalnızca `environmentTopicContents.ts` başında genel bir "içerik gerçek standartlara dayanır" beyanı var.
- **Olumlu istisna:** `src/data/shipOperations/*` dosyaları her adımda IMO karar/sirküler referansı veriyor (A.893(21), MSC.267(85), MSC.1/Circ.1353, A.1045(27), MSC.428(98) vb. — örneklenen referansların K-3 dışında tümü doğru çıktı). Bu format külliyatın geri kalanına şablon yapılmalıdır.

---

## 3. KÜÇÜK BULGULAR

| # | Konum | Bulgu |
| --- | --- | --- |
| M-1 | `docs/kopruustu_aygitlari.md` (GPS bölümü) | "Çoklu takımyıldız desteği ile **daha yüksek PDOP doğruluğu**" — PDOP düşükken doğruluk artar; "daha düşük PDOP / daha yüksek doğruluk" yazılmalı. |
| M-2 | `src/data/shipSystems/longform/nav-systems/0.ts:35` | "SOLAS, 3000 GT üstünde **biri S-band olmak üzere** iki radar ister" — SOLAS V/19.2.7 ikinci radarın 3 GHz olmasını *veya* İdare uygun görürse ikinci 9 GHz radarı kabul eder; ifade mutlaklaştırılmış. |
| M-3 | `src/data/navigationTopicContents.ts:232-239`, `docs/solas_2024_consolidated_summary.md` | Ders görselleri üçüncü taraf sitelerden hotlink (astronavigationdemystified.com, mathscinotes.com, Wikimedia). Lisans/atıf belirsiz, link kırılması hâlinde içerik boş kalır; görseller yerelleştirilip kaynak/lisans notu eklenmeli (`src/assets/IMAGE_CREDITS.md` pratiği zaten mevcut, buraya da uygulanmalı). |
| M-4 | Külliyat geneli | Türkçe-İngilizce karma terim kullanımı tutarsız (ör. "sağlama kolu / doğrultucu kol / righting arm" aynı kavram için üç ayrı ad). Terim sözlüğü (`glossaryTerms.ts`) ile içerik dosyaları senkronize edilmeli. |
| M-5 | `docs/gemi_makineleri.md`, `docs/kopruustu_aygitlari.md` | Yapı tamamen madde imli; referans deponun "makine üretimi kalıp" uyarısına giren tekdüze şablon. Eğitsel akış (örnek problem, senaryo) eklenmesi önerilir. |

---

## 4. DOĞRULANAN İÇERİKLER (örneklem sonuçları)

Taramada kontrol edilen yüksek riskli sayısal iddiaların büyük çoğunluğu **doğru** çıkmıştır:

- **Stabilite kriterleri** (`stabilityTopicsContent.ts`): IS Code 2008 alan kriterleri (0,055 / 0,09 / 0,03 m·rad), GZ ≥ 0,20 m @ ≥30°, GM₀ ≥ 0,15 m, tahıl kodu (GM ≥ 0,30 m; meyil ≤ 12°; artık alan ≥ 0,075 m·rad) ✅; örnek problemlerin aritmetiği örneklemde hatasız ✅
- **Göksel seyir** (`navigationTopicContents.ts`): Dip = 1,76×√h, R ≈ 1/tan h, SD ≈ 16′, P = HP×cos h, örnek hesap (27°23,8′) ✅; coğrafi görünürlük D = 2,08(√h₁+√h₂) ✅
- **GMDSS/haberleşme** (`shipSystems/longform/gmdss-lsa/*`): Ch 16 = 156,8 MHz, Ch 70 DSC, 2182 kHz MF, EPIRB 406 MHz + 121,5 MHz homing, SART 9 GHz X-band, NAVTEX 518 kHz ✅
- **COLREG** (`machineTopicDetailContent4/8`, senaryolar): fener yayları 112,5°/225°/135°/360° ve menziller ✅
- **MARPOL/çevre** (`environmentTopicContents.ts`, makine içerikleri): 15 ppm OWS, 30 L/nm tanker deşarjı, pis su 3/12 nm kuralları, BWM D-1 (%95, 200 nm/200 m) ve D-2, IMO 2020 kükürt %0,50 / ECA %0,10 ✅
- **STCW/MLC** (`seamanshipTopicContents.ts`, `crewRoleDetails.ts`): dinlenme 10 sa/24 sa ve 77 sa/7 gün, ≤2 bölüm, biri ≥6 saat ✅
- **Termodinamik/makine** (`courseContent/thermodynamics.ts`, makine detayları): Otto/Diesel çevrim verimleri, LMTD, Stefan–Boltzmann, silindir yağı BN seçimi (70–100 / 25–40), yorgunluk-alkol eşdeğerliği (17 sa ≈ %0,05) ✅
- **Atıf örneklemi** (`shipOperations/*`): A.893(21), MSC.267(85), A.1045(27) (≤9 m tırmanma), MSC.428(98), A.1050(27), MSC.232(82), MEPC.107(49), MSC.1/Circ.1228/1353/1446 ✅

Bu örneklem, içerik üretiminin genel olarak gerçek standartlara sadık kaldığını; sorunların **yerel ama ciddi** olduğunu gösteriyor.

---

## 5. RUBRİK DEĞERLENDİRMESİ (0–100)

| Külliyat | Olgusal Doğruluk | Atıf Uyumu | Yapı/Yazım | Skor | Karar |
| --- | --- | --- | --- | --- | --- |
| `src/data` ders içerikleri (uygulamanın ana gövdesi) | Yüksek | Zayıf (shipOperations hariç) | İyi | **78** | Küçük Revizyon |
| `shipOperations/*` | Yüksek | İyi | İyi | **84** | Kabul |
| `docs/meteoroloji_konu_anlatimlari.md` | Yüksek | Yok | İyi | **74** | Küçük Revizyon |
| `docs/kopruustu_aygitlari.md` | Orta (K-4, M-1) | Yok | Orta | **62** | Büyük Revizyon |
| `docs/solas_2024_consolidated_summary.md` | Orta (B-3) | Hatalı referanslar | Orta | **58** | Büyük Revizyon |
| `gemi_stabilite_hesaplamalari.md` + `HYDROSTATIC_CALCULATIONS.md` | Düşük-Orta (K-2, B-1) | Yok | İyi | **55** | Büyük Revizyon |
| `docs/stabilite.md` | Konu dışı | — | — | **<50** | Ret / Kaldır |
| **GENEL** | | | | **~72** | **Küçük–Büyük Revizyon arası** |

## 6. ÖNCELİKLİ AKSİYON LİSTESİ

1. `docs/stabilite.md` dosyasını kaldır veya gemi stabilitesiyle yeniden yaz (K-1).
2. `gemi_stabilite_hesaplamalari.md:18` formülünü `GM = KB + (I/∇) − KG` olarak düzelt (K-2).
3. `crewRoleDetails.ts:92` atıfını A.871(20)/FAL.13(42) olarak düzelt (K-3).
4. `kopruustu_aygitlari.md:6` manyetik pusula tanımını düzelt (K-4).
5. SOLAS özetindeki referans numaralarını (V/7 → III/6.2.2 vb.) ve örnek tablo değerlerini doğrula/düzelt (B-3).
6. Kural 13 ifadesini `courseContent/rules/navigation.ts:37`'de düzelt (B-4).
7. `shipOperations/*` atıf formatını tüm konu içeriklerine yay; her konuya asgari bir "Dayanak" satırı (sözleşme + kural no) ekle (B-5).
8. Harici görsel hotlink'lerini yerelleştir ve lisans notu ekle (M-3).

---
*Bu rapor academic-research-skills deposunun insan-denetimli inceleme ilkesine uygun olarak hazırlanmıştır: tüm bulgular dosya:satır düzeyinde doğrulanabilir; düzeltme kararları içerik sahibine aittir.*
