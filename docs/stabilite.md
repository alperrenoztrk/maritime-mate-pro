# Gemi Stabilitesi – Kapsamlı Notlar

Bu doküman, gemi stabilitesini (enine, boyuna ve hasarlı durum) denizcilik eğitimi odağıyla bütüncül olarak ele alır. Temel kavramlar, hidrostatik büyüklükler, GZ eğrisi, IMO kriterleri, serbest yüzey etkisi ve operasyonel uygulamalar özetlenir.

### 1) Temel Kavramlar ve Tanımlar

- **Stabilite**: Geminin; rüzgâr, dalga, yük kayması gibi dış etkilerle yatırıldıktan sonra, etki ortadan kalktığında ilk denge konumuna dönme yeteneği.
- **Deplasman (Δ)**: Geminin ve içindeki her şeyin toplam ağırlığı; yüzen gemide taşırılan suyun ağırlığına eşittir (Arşimet prensibi).
- **B (Yüzdürme merkezi)**: Su altı hacminin geometrik merkezi; gemi yattıkça yer değiştirir.
- **G (Ağırlık merkezi)**: Gemi ağırlığının etkidiği nokta; yük dağılımıyla değişir.
- **M (Metasantr)**: Küçük yatma açılarında kaldırma kuvveti doğrultusunun gemi merkez hattını kestiği nokta.
- **KB, BM, KM, KG, GM**: Omurgadan ölçülen dikey mesafeler; `KM = KB + BM`, `GM = KM − KG`, `BM = I/∇` (I: su hattı alanının enine atalet momenti, ∇: deplasman hacmi).

### 2) Denge Durumları

- **Kararlı (stabil) denge**: G, M'nin altında (`GM > 0`); yatan gemi doğrultucu momentle geri döner.
- **Kayıtsız (nötr) denge**: G ile M çakışık (`GM = 0`); gemi yatırıldığı açıda kalma eğilimindedir.
- **Kararsız (unstabil) denge**: G, M'nin üstünde (`GM < 0`); gemi küçük bir etkiyle daha çok yatar (loll açısına gider).

### 3) Enine Stabilite

- **Doğrultucu kol (GZ)**: Küçük açılarda `GZ ≈ GM·sinθ`; büyük açılarda çapraz eğrilerden `GZ = KN − KG·sinθ` ile bulunur.
- **Doğrultucu moment**: `RM = Δ × GZ`.
- **Sert gemi**: Büyük GM → kısa ve sert yalpa periyodu; personel/yük üzerinde yüksek ivmeler.
- **Yumuşak gemi**: Küçük GM → uzun ve yavaş yalpa; aşırı düşük GM emniyet riski.
- **Yalpa periyodu**: `T ≈ (C·B)/√GM` (C: yalpa katsayısı, tipik 0,7–0,8; B: genişlik). Periyottan GM'in yaklaşık kontrolü yapılabilir.

### 4) GZ Eğrisi ve IMO (IS Code 2008) Kriterleri

GZ eğrisi, 0–90° yatma açıları için doğrultucu kolun değişimini gösterir. Genel yük gemileri için IMO Res. MSC.267(85) (2008 IS Code) temel kriterleri:

- 0–30° arası eğri altında kalan alan ≥ **0,055 m·rad**
- 0–40° (veya su alma açısına kadar) alan ≥ **0,090 m·rad**
- 30–40° arası alan ≥ **0,030 m·rad**
- 30° veya daha büyük bir açıda **GZ ≥ 0,20 m**
- Maksimum GZ tercihen 30°'den, her hâlde 25°'den büyük açıda oluşmalı
- Başlangıç **GM₀ ≥ 0,15 m** (serbest yüzey düzeltmeli)

Tahıl yüklerinde (International Grain Code) ek olarak: GM ≥ 0,30 m, tahıl kayması kaynaklı meyil ≤ 12° ve artık alan ≥ 0,075 m·rad aranır.

### 5) Serbest Yüzey Etkisi

Kısmi dolu tanklardaki sıvı, gemi yattığında yer değiştirerek ağırlık merkezini sanal olarak yükseltir (`GG₁ = Σ(i·ρ_sıvı)/(∇·ρ_deniz)`; i: tank serbest yüzeyinin atalet momenti). Boyuna perdeler etkiyi bölme sayısının karesi (n²) oranında azaltır. Efektif GM her zaman serbest yüzey düzeltmesi yapılmış değerdir.

### 6) Boyuna Stabilite ve Trim

- **Trim**: Baş ve kıç draftlar farkı; `Trim değişimi = Moment / MCT1cm`.
- **MCT1cm**: Trimi 1 cm değiştiren moment; `MCT1cm ≈ (Δ·GM_L)/(100·LBP)`.
- **TPC**: 1 cm paralel batma için gereken ağırlık; `TPC = (WPA·ρ)/100`.
- Yük alma/verme sonrası draft değişimi, LCF etrafındaki moment dengesine göre hesaplanır.

### 7) Hasarlı Durum (Yaralı) Stabilitesi

- **Kaybolan sepiye (lost buoyancy) yöntemi**: Yaralanan bölme sepiyesini kaybeder; paralel batma `ΔT = v/(A_su hattı − a_yaralı)`.
- **Eklenen ağırlık (added weight) yöntemi**: Giren su ağırlık olarak eklenir; KG ve serbest yüzey yeniden hesaplanır.
- SOLAS II-1, yolcu gemilerinde olasılıksal bölmeleme indeksi (A ≥ R), yük gemilerinde tip ve boyuta göre hasar stabilitesi kriterleri arar. Damage Control Plan/Booklet gemide bulunur.

### 8) Özel Durumlar ve Operasyonel Riskler

- **Loll açısı**: Negatif GM'de gemi bir tarafa yatarak yeni denge bulur; düzeltme, önce ağırlık merkezini düşürerek yapılır (alçak tankları doldur, üst ağırlığı azalt) — asla önce karşı tarafa balast alarak değil.
- **Rıhtım/havuz (docking) stabilitesi**: Kızağa oturmada omurga reaksiyonu P, sanal GM kaybı `ΔGM = P·KM/Δ` yaratır.
- **Parametrik yalpa**: Dalga karşılaşma periyodunun yalpa doğal periyodunun yarısına yaklaşması hâlinde ani büyük yalpalar (özellikle konteyner gemilerinde); rota/hız değişikliğiyle kaçınılır (MSC.1/Circ.1228).
- **Tahıl ve sıvılaşan yükler**: Yük kayması (IMSBC Code'da sıvılaşma riski olan yükler dahil) ciddi meyil ve devrilme nedenidir.

### 9) Pratik Değerlendirme Adımları

1. Yükleme durumu için Δ, KG ve serbest yüzey momentlerini hesapla.
2. Hidrostatik tablodan KM'yi al; `GM = KM − KG`'yi serbest yüzey düzeltmesiyle bul.
3. KN eğrilerinden GZ eğrisini çiz; IMO alan ve GZ kriterlerini kontrol et.
4. Kesme kuvveti/eğilme momenti limitlerini yükleme bilgisayarında doğrula.
5. Draft, trim ve UKC değerlerinin sefer kısıtlarına uygunluğunu kontrol et.

### 10) Sık Karşılaşılan Hatalar

- Serbest yüzey düzeltmesini ihmal ederek GM'i olduğundan büyük görmek.
- Loll açısını rüzgâr/yük kaynaklı meyille karıştırıp karşı tarafa balast basmak.
- GM'in tek başına yeterli olduğunu sanmak (büyük açı stabilitesi GZ eğrisiyle değerlendirilir).
- Küçük açı formülünü (`GZ = GM·sinθ`) büyük açılarda kullanmak.

### 11) Kaynaklar

- IMO, *International Code on Intact Stability (2008 IS Code)*, Res. MSC.267(85).
- IMO, *SOLAS Chapter II-1* (bölmeleme ve hasarlı stabilite).
- IMO, *International Grain Code*, Res. MSC.23(59).
- D. R. Derrett, *Ship Stability for Masters and Mates*.
- K. J. Rawson & E. C. Tupper, *Basic Ship Theory*.

### 12) Kısa Özet

- `GM = KM − KG`; kararlılık için GM > 0 ve IMO kriterlerinin tamamı sağlanmalı.
- GZ eğrisi büyük açı stabilitesinin esas aracıdır; alan kriterleri enerji rezervini gösterir.
- Serbest yüzey etkisi efektif GM'i düşürür; kısmi dolu tank sayısı en aza indirilir.
- Hasarlı stabilite SOLAS II-1'e göre; tahıl yükleri Grain Code'a göre değerlendirilir.
