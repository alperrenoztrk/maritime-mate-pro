# Gemi Stabilite Hesaplamaları ve Formülleri

## 1. Metasentrik Yükseklik (GM) Hesabı

Geminin küçük açılardaki denge durumunu gösterir.

### Ana Formül:
```
GM = KM - KG
```

**Açıklama:**
- **KM** = Keel'den Metacenter'a mesafe
- **KG** = Keel'den ağırlık merkezi G'ye mesafe

### Alternatif Formül:
```
GM = KB + BM - KG = KB + (I/∇) - KG
```

**Açıklama:**
- **KB** = Keel'den yüzdürme merkezi B'ye mesafe
- **BM** = Metasentrik yarıçap (BM = I/∇)
- **I** = Su hattı alanının enine atalet momenti
- **∇ (Nabla)** = Su altı hacmi (deplasman hacmi)

> Not: KM = KB + BM olduğundan bu formül, ana formül (GM = KM − KG) ile aynıdır.

---

## 2. Doğrultucu Kol (GZ) Hesabı

Geminin yana yatma açısında (heel angle, φ) doğrultucu momenti yaratan kol uzunluğu.

### Küçük Açılar İçin:
```
GZ ≈ GM · sin(φ)
```

### Büyük Açılar İçin:
Hidrostatik eğrilerden bulunur.

---

## 3. Doğrultucu Moment (RM)

Geminin rüzgâr, dalga vb. kuvvetlere karşı koyma momentidir.

```
RM = Δ · GZ
```

**Açıklama:**
- **Δ (Delta)** = Deplasman (ton veya kN cinsinden)

---

## 4. Metasentrik Yarıçap (BM)

Su hattı şekline bağlıdır.

```
BM = I/∇
```

---

## 5. KG Hesabı (Dikey Ağırlık Merkezi)

Yüklerin gemi üzerindeki konumuna göre hesaplanır:

```
KG = Σ(wᵢ · KGᵢ) / Σwᵢ
```

**Açıklama:**
- **wᵢ** = yükün ağırlığı
- **KGᵢ** = yükün KG mesafesi

---

## 6. Doğrultucu Kol Eğrisi (GZ Curve)

Çeşitli yatma açılarında GZ değerleri hesaplanır ve eğri çizilir.

Geminin stabilite kriterleri (IMO kriterleri) bu eğriye göre değerlendirilir.

### Değerlendirilen Kriterler:
- Maksimum GZ açısı ve büyüklüğü
- GZ eğrisinin altında kalan alan (enerji rezervi)

---

## 7. Serbest Yüzey Düzeltmesi (Free Surface Effect)

Tanklardaki serbest sıvı, GM'yi düşürür.

```
GM_düzeltilmiş = GM - Σ(I_f)/∇
```

**Açıklama:**
- **I_f** = Tanktaki sıvının serbest yüzey atalet momenti

---

## 8. Stabilite Açısı (Angle of Vanishing Stability, AVS)

Geminin doğrultucu momentini kaybettiği ve alabora olduğu açı.

**Not:** GZ eğrisinden alınır → GZ = 0 olduğu açı.

---

## 9. Hogging ve Sagging Tespiti

Geminin boyuna dengesine ilişkin durumları kontrol etmek için provalardan (dF), pupadan (dA) ve ortadan (dM) okunan draftlar kullanılır.

- **Hogging:**
  \
  \( \frac{d_F + d_A}{2} > d_M \)

- **Sagging:**
  \
  \( \frac{d_F + d_A}{2} < d_M \)

### Mean Draft (Ortalama Draft)

\[
d_M = \frac{d_F + d_A}{2}
\]

---

## 10. Enine Denge Hesapları

### Temel Bağıntılar

\[
KG + GM = KM
\]

\[
KB + BM = KM
\]

\[
KM - KG = GM
\]

### Moment ve KG Hesapları

- \( \text{Moment} = Ağırlık \times KG \text{ mesafesi} \)
- \( KG_{yeni} = \frac{\text{Toplam Moment}}{\text{Toplam Ağırlık}} \)

### Shifting ile GM Değişimi

\[
\Delta GM = \frac{w \times d}{\Delta}
\]

### Meyil Açısı Hesabı

\[
GZ = \frac{w \times y}{\Delta}
\]

\[
\tan \theta = \frac{GZ}{GM}
\]

### Bumba ile GM Değişimi

\[
GG_1 = \frac{w \times (h_{çunda} - h_{yük})}{\Delta}
\]

### Havuzlamada Kritik GM

\[
P = \frac{MCT \times \text{Trim (cm)}}{l}
\]

\[
\Delta GM = \frac{P \times KM}{\Delta}
\]

---

## 11. Boyuna Denge Hesapları

### Trim Değişimi

\[
\Delta \text{Trim} = \frac{\text{Toplam Moment}}{MCT}
\]

### Paralel Batma/Çıkma

\[
\text{Batma (cm)} = \frac{w}{TPC}
\]

### LCG Hesabı

\[
LCG = \frac{\text{Toplam Moment}}{\text{Toplam Deplasman}}
\]

### Trim Hesabı

\[
\text{Trim} = \frac{\Delta \times BG}{MCT}
\]

### Draft Değişimleri (LCF Mastoride)

\[
\Delta d_F = -\frac{\Delta \text{Trim}}{2}, \quad \Delta d_A = +\frac{\Delta \text{Trim}}{2}
\]

### Draft Düzeltmeleri

\[
\text{Düzeltme} = \frac{\text{Mesafe} \times \text{Trim}}{LBD}
\]

---

## 12. Draft Survey Hesapları

### MMM Draftı

\[
MMM = \frac{d_F + d_A + 6 \times d_M}{8}
\]

### Trim Düzeltmeleri

\[
\Delta_1 = \frac{\text{Trim} \times LCF \times TPC \times 100}{LBP}
\]

\[
\Delta_2 = \frac{\text{Trim}^2 \times \Delta MCT \times 50}{LBP}
\]

### Yoğunluk Düzeltmesi

\[
\Delta_{\rho} = \left( \frac{\rho}{1.025} - 1 \right) \times \Delta
\]

---

## 13. Diğer Hesaplar

### Duba/Tank Hacmi

\[
V = L \times B \times H, \quad m = V \times \rho
\]

### Blok Katsayısı

\[
C_b = \frac{\nabla}{L \times B \times T}
\]

### Fresh Water Allowance (FWA)

\[
FWA = \frac{\Delta}{4 \times TPC}
\]

\[
\Delta T = \frac{FWA \times (1025 - \rho)}{25}
\]

### Yoğunluk Farkı Deplasman İlişkisi

\[
\frac{\Delta_1}{\rho_1} = \frac{\Delta_2}{\rho_2}
\]

---

## 14. SOLAS Stabilite Kriterleri

### Tahıl Kayması Meyil Açısı (Grain Heel)

\[
\theta = \frac{57.3 \times GHM}{\Delta \times GM}
\]

### GHM Hesabı

\[
GHM = \frac{VHM}{SF}
\]

**Açıklama:** VHM hacimsel kayma momenti (m⁴), SF istif faktörü (m³/t), GHM tahıl kayma momentidir (t·m).

### GZ Kolu (KN Eğrileri)

\[
GZ = KN - KG \cdot \sin \theta
\]

### Simpson Alan Hesapları

- **1/3 Kuralı:**
  \
  \( A = \frac{h}{3} (y_0 + 4y_1 + 2y_2 + 4y_3 + y_4) \)

- **3/8 Kuralı:**
  \
  \( A = \frac{3h}{8} (y_0 + 3y_1 + 3y_2 + y_3) \)

### Serbest Yüzey Momenti

\[
GG_1 = \frac{l \times b^3}{12 \times \nabla} \times \frac{\rho_{sıvı}}{\rho_{deniz}} \times \frac{1}{n^2}
\]

**Açıklama:** l ve b tankın boyu/genişliği, ∇ geminin deplasman hacmi, n tankın boyuna bölme (perde) sayısıdır. Boyuna perdeler serbest yüzey etkisini n² oranında azaltır.

### Yalpa Periyodu

\[
T = \frac{C \times B}{\sqrt{GM}}
\]

**Açıklama:** C yalpa katsayısıdır (tipik olarak 0.7–0.8; blok katsayısı C_b ile karıştırılmamalıdır). IMO hava kriterinde C = 0.373 + 0.023(B/d) − 0.043(L_{wl}/100) olarak hesaplanır.

### Yaralı Stabilite (Kaybolan Sepiye Yöntemi — Paralel Batma)

\[
\Delta T = \frac{v}{A_{su hattı} - a_{yaralı}}
\]

**Açıklama:** v yaralanan kompartımana giren su hacmi, A su hattı alanı, a yaralı kompartımanın su hattı alanıdır.

---

## 15. Yük Hesapları

### Maksimum Yük Miktarı

\[
w_{max} = \frac{V_{ambar}}{SF}
\]

### Maksimum Yük Yüksekliği

\[
h_{max} = SF \times PL
\]

### Sıcaklıkla Yoğunluk Değişimi

\[
\rho_2 = \rho_1 - [(T_2 - T_1) \times k]
\]

---

## 16. Pratik Hesaplar

### Draft Okuma (Metrik Sistem)

- Rakam altı: Rakam değeri
- Rakam ortası: Rakam + 5 cm
- Rakam üstü: Rakam + 10 cm

### Draft Okuma (Kraliyet Sistemi)

- Rakam altı: Rakam değeri
- Rakam ortası: Rakam + 3 inç
- Rakam üstü: Rakam + 6 inç

### Ortalama Draftlar

\[
d_F = \frac{d_{F_{sancak}} + d_{F_{iskele}}}{2}, \quad d_M = \frac{d_{M_{sancak}} + d_{M_{iskele}}}{2}, \quad d_A = \frac{d_{A_{sancak}} + d_{A_{iskele}}}{2}
\]

---

## Önemli Notlar

- Bu hesaplamalar gemi güvenliği için kritik öneme sahiptir.
- IMO (Uluslararası Denizcilik Örgütü) kriterlerine uygun olmalıdır.
- Hesaplamalar sürekli güncellenmelidir (yük değişiklikleri, yakıt tüketimi vb.).
- Serbest yüzey etkisi özellikle kısmi dolulu tanklarda dikkate alınmalıdır.

## Uygulama Alanları

- Gemi tasarımı
- Yük planlaması
- Deniz güvenliği
- Gemi operasyonları
- Klasifikasyon kuruluşları
