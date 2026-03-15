

## Formül-Hesaplama Eşleştirme Analizi ve Eksiklik Raporu

### Analiz Kapsamı
Tüm departmanlardaki formül sayfaları ile hesaplama araçları karşılaştırıldı.

---

### A. MAKİNE DEPARTMANI (MachineTopicFormulasPage → MachineTopicCalculationsPage)

**Sonuç: Makine departmanı neredeyse tam senkronize.** Her 16 konunun hem formülü hem hesaplayıcısı mevcut. Aşağıdaki minor eksikler var:

| Formül (formulas sayfasında var) | Hesaplayıcı Durumu |
|---|---|
| Thermodynamics: Entropi Değişimi (ΔS = Q/T) | ❌ Eksik |
| Thermodynamics: Politropik Süreç (P₁V₁ⁿ = P₂V₂ⁿ) | ❌ Eksik |
| Thermodynamics: İletim/Taşınım/Işınım (Fourier, Newton, Stefan-Boltzmann) | ❌ Eksik (tek tek) |
| Fluid Mechanics: Afinite Kuralları (Q₂/Q₁ = n₂/n₁) | ❌ Eksik |
| Diesel Engines: Sıkıştırma Oranı, Hava Fazlalık Katsayısı | ❌ Eksik |
| Ship Systems: Yağ Film Kalınlığı, Viskozite-Sıcaklık (Walther) | ❌ Eksik |
| Cooling-HVAC: Kompresör İşi (W = ṁ×(h₂-h₁)), Nem Alma | ❌ Eksik |
| Electrical: Reaktif Güç, Görünür Güç (ayrı hesaplayıcı) | ❌ Eksik (kısmen jeneratörde var) |
| Automation: Doğruluk Hesabı (Hata %) | ❌ Eksik |
| Maintenance: Güvenilirlik R(t) = e^(-t/MTBF) | ❌ Eksik |
| Engine Room Ops: Isınma Süresi, Yağ Basınç Kontrol | ❌ Eksik (prosedürel) |
| ERM: Yorgunluk İndeksi, Vardiya Etkinliği | ❌ Eksik |
| Energy Efficiency: EEXI, WHRS (atık ısı geri kazanım) | ❌ Eksik |

**Makine toplam eksik: ~20 hesaplayıcı**

---

### B. GÜVERTİ DEPARTMANI

#### 1. Gemicilik (SeamanshipFormulas → SeamanshipCalculations)
| Formül | Hesaplayıcı |
|---|---|
| Palamar Çalışma Yükü | ✅ Var |
| Rüzgâr Kuvveti | ✅ Var |
| Katenary | ✅ Var |
| Demir Tutma Kuvveti | ❌ Eksik |
| Römorkör Bollard Pull | ❌ Eksik |
| Scope Ratio | ❌ Eksik |

#### 2. Emniyet (SafetyFormulas → SafetyCalculations)
SafetyCalculations mevcut sayfası farklı bir yapıda (can salı, yangın bölmesi vb.) — formül sayfasındaki formüllere karşılık gelen hesaplayıcılar:

| Formül | Hesaplayıcı |
|---|---|
| Köpük Çözeltisi Miktarı | ❌ Eksik |
| CO₂ Miktarı | ✅ Var (engine-room-safety altında) |
| Su Sisi Debisi | ❌ Eksik |
| Yangın Suyu Kapasitesi | ❌ Eksik |
| Kaçış Süresi | ❌ Eksik |
| Risk Matrisi Skoru | ✅ Var (ERM altında) |

#### 3. Meteoroloji (MeteorologyFormulas → WeatherCalculations)
| Formül | Hesaplayıcı |
|---|---|
| Gerçek Rüzgâr Hızı (vektörel) | ❌ Eksik |
| Hava Yoğunluğu (ρ = P/RT) | ❌ Eksik |
| Derin Su Dalgaboyu | ❌ Eksik |
| Dalga Hızı | ❌ Eksik |
| Beaufort → Hız | ❌ Eksik |
| Çiğ Noktası | ❌ Eksik |
| Deniz Seviyesine İndirgenmiş Basınç | ❌ Eksik |

#### 4. Seyir (NavigationFormulas → NavigationCalculations)
NavigationFormulas çok kapsamlı (839 satır, 20+ formül grubu). Mevcut hesaplayıcılar: Great Circle, Rhumb Line, DR, ETA, Akıntı, CPA/TCPA, Pusula, Gelgit vb. zaten NavigationCalculations bileşeninde mevcut. Eksikler:

| Formül | Hesaplayıcı |
|---|---|
| Radar Horizon (d = 2.23×(√h₁+√h₂)) | ❌ Eksik |
| Geographical Range | ❌ Eksik |
| Dönüş Hesabı (ROT, Advance, Transfer) | ❌ Eksik |
| Squat Hesabı | ❌ Eksik |
| WOP (Wheel Over Point) | ❌ Eksik |

#### 5. Stabilite (StabilityFormulas → StabilityCalculations)
Stabilite en kapsamlı modül. Formüller detay sayfalarında, hesaplayıcılar ayrı bileşenlerde. Genel olarak iyi kapsanmış (GM, GZ, Trim, Draft Survey, FWA, Blok Katsayısı vb. hepsi mevcut).

---

### UYGULAMA PLANI

Toplam ~35 yeni hesaplayıcı eklenecek. Öncelik sırasıyla:

#### Faz 1: Güverte Eksikleri (~15 hesaplayıcı)
1. **SeamanshipCalculations.tsx** — 3 yeni hesaplayıcı ekleme (Demir Tutma, Bollard Pull, Scope Ratio)
2. **SafetyCalculations bileşeni** — 4 yeni hesaplayıcı (Köpük, Su Sisi, Yangın Suyu, Kaçış Süresi)
3. **Meteoroloji hesaplayıcıları** — WeatherCalculations bileşenine 7 yeni tab/hesaplayıcı (Gerçek Rüzgâr, Hava Yoğunluğu, Dalgaboyu, Dalga Hızı, Beaufort, Çiğ Noktası, İndirgenmiş Basınç)
4. **NavigationCalculations** — 5 yeni hesaplayıcı ekleme (Radar Horizon, Geographical Range, ROT/Advance/Transfer, Squat, WOP)

#### Faz 2: Makine Eksikleri (~20 hesaplayıcı)
5. **MachineTopicCalculationsPage.tsx** — Mevcut topic anahtarlarına yeni `CalcTool` nesneleri ekleme:
   - thermodynamics: +3 (Entropi, Politropik, Isı Transferi)
   - fluid-mechanics: +1 (Afinite Kuralları)
   - diesel-engines: +2 (Sıkıştırma Oranı, Hava Fazlalık)
   - cooling-hvac: +2 (Kompresör İşi, Nem Alma)
   - electrical: +2 (Reaktif/Görünür Güç ayrı)
   - automation: +1 (Doğruluk)
   - maintenance: +1 (Güvenilirlik R(t))
   - erm: +2 (Yorgunluk İndeksi, Vardiya Etkinliği)
   - energy-efficiency: +2 (EEXI, WHRS)
   - engine-room-ops: +2 (Isınma Süresi, Basınç Kontrol)
   - ship-systems: +2 (Walther Viskozite, Yağ Film)

#### Teknik Yaklaşım
- Makine hesaplayıcıları: mevcut `topicCalculations` record'una yeni CalcTool nesneleri ekleme — dosya zaten 1226 satır, aynı pattern devam edecek
- Güverte modülleri: her bileşenin kendi yapısına uygun şekilde ekleme (SeamanshipCalculations = CalculationGrid, WeatherCalculations = tab yapısı, SafetyCalculations = card yapısı)
- NavigationCalculations: mevcut tab yapısına yeni tab'lar ekleme

