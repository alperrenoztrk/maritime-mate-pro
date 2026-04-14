

# Konu Anlatımı İçerik Denetleme ve Tamamlama Planı

## Mevcut Durum Analizi

Tüm kategorileri taradım. Sonuçlar:

| Kategori | Alt Başlık | İçerik Durumu | Sorun |
|----------|-----------|---------------|-------|
| **Seyir (Navigation)** | ~130 alt başlık | **84 alt başlık içerik YOK** | En kritik eksik |
| **Stabilite** | 82 alt başlık | Tümü var ama **21 tanesi çok kısa** (310-400 karakter) | Yetersiz derinlik |
| **Meteoroloji** | 24 konu | İyi (~2700 kar/konu) | Yeterli |
| **Haberleşme** | 5 konu | İyi ama sadece 5 konu | Yeterli |
| **Yük Elleçleme** | 68 alt başlık | Orta (ort. 704 kar) | Kabul edilebilir |
| **Gemicilik** | 68 alt başlık | İyi (ort. 1003 kar) | Yeterli |
| **Denizde Emniyet** | 57 alt başlık | İyi (ort. 1139 kar) | Yeterli |
| **Çevre Koruma** | 39 alt başlık | İyi (ort. 1006 kar) | Yeterli |
| **Deniz İşletmeciliği** | 28 alt başlık | Orta (ort. 913 kar) | Kabul edilebilir |
| **Makine** | 600+ başlık | Çok kapsamlı (~800K kar) | Yeterli |

---

## Kritik Eksikler ve Yapılacak İşler

### 1. SEYİR — 84 Eksik Alt Başlık İçeriği (En Büyük İş)

Aşağıdaki alt başlıklar için `navigationTopicContents.ts` dosyasına detaylı içerik yazılacak. Her içerik ilgili regülasyona referans verecek:

**Seyrin Temelleri (2 eksik):**
- Rota hız ve mesafe ilişkisi *(COLREG Kural 6 — Emniyetli Hız)*
- Zaman – mesafe – hız bağıntısı

**Harita Bilgisi (3 eksik):**
- Harita datum *(IHO S-44, SOLAS V/19)*
- Mesafe ölçümü
- Rota ölçümü

**Düzlem Seyir (5 eksik):**
- Düzlem seyir varsayımı, DLat, Kurs-mesafe hesapları, Enlem-boylam değişimi, Akıntısız seyir hesapları

**Orta Enlem Seyri (6 eksik):**
- Düzlem seyirin sınırları, Ortalama enlem kavramı, Departure-boylam ilişkisi, Boylam değişimi, İşaret değişimi, Sayısal uygulamalar

**Akıntı ve Rüzgar (6 eksik):**
- Set ve drift, Akıntı vektörleri, Heading-COG, STW-SOG, Akıntılı seyir hesapları, Vektör üçgenleri

**Klasik Seyir (5 eksik):**
- Kerteriz türleri, Kerterizle mevki tayini, Mesafe+kerteriz fix, Running fix (klasik), Paralel indeks, Kıyı seyri teknikleri

**Büyük Daire (8 eksik):**
- Büyük daire kavramı/geometrisi/mesafesi/başlangıç kursu, Rhumb line, Mercator-rhumb ilişkisi, Composite rota, Uzun okyanus seyri

**Elektronik Seyir (13 eksik):**
- GPS prensibi/Trilaterasyon/Doğruluk, HDOP/PDOP, Radar prensibi/mevki tayini, Paralel indeks (radar), ECDIS, Rota planlama, XTE/ETA/Turn radius, Çapraz kontrol *(SOLAS V/19, IMO A.817(19))*

**Tides (11 eksik):**
- Gelgitin fiziksel mantığı, Spring/Neap, Chart datum (LAT), Tidal table okuma, Height of tide, 12'ler kuralı, İnterpolasyon, Tidal stream, Set-drift, UKC+gelgit, Tidal window *(SOLAS V/34, IMO A.893(21))*

**Meteoroloji Bağlantılı Seyir (7 eksik):**
- Rüzgârın gemiye etkisi, Leeway kavramı/hesapları, Rüzgâr+akıntı+gemi hareketi, Dalga etkileri, Heavy weather navigation, Fırtınada rota ve hız kararı *(COLREG Kural 6, SOLAS V/34)*

**Passage Planning (8 eksik):**
- IMO A.893(21), Appraisal/Planning/Execution/Monitoring, UKC ve squat, BRM, PSC bakış açısı *(SOLAS V/34, IMO A.893(21))*

**COLREG (7 eksik):**
- COLREG temel prensipleri, Crossing, Head-on, Overtaking, Restricted visibility, Gerçek çatışma kazaları, Neden-sonuç analizi *(COLREG 1972, MSC/Circ.1023)*

### 2. STABİLİTE — 21 Yetersiz İçerik Güçlendirme

Aşağıdaki başlıkların içerikleri ~300 karakterden ~800-1200 karaktere çıkarılacak, formül açıklaması + operasyonel bağlam + regülasyon referansı eklenecek:

- trim-calculations, draft, fse-calc, tpc, lcg, capsizing-angle, mct, heel-from-weight-shift, fsm, km-values, multiple-tanks-effect, lcb, trim-control, heeling-moment, displacement, small-angle-stability, fse-gm-effect, hydrostatic-tables-usage, dynamic-righting-moment, wind-effect, trim-concept

**Referans regülasyonlar:** IMO A.749(18), SOLAS II-1, IS Code (2008 Intact Stability Code), Grain Code

---

## Uygulama Planı

### Adım 1: Seyir İçerikleri — Bölüm 1 (~40 alt başlık)
`navigationTopicContents.ts` dosyasına yeni içerikler ekle:
- Seyrin Temelleri, Harita Bilgisi, Düzlem Seyir, Orta Enlem Seyri, Akıntı/Rüzgar
- Her biri ~600-1000 karakter, formül + regülasyon referansı ile
- `LessonTopicsPage.tsx`'de `hasContent: true` ekle

### Adım 2: Seyir İçerikleri — Bölüm 2 (~44 alt başlık)
- Klasik Seyir, Büyük Daire, Elektronik Seyir, Tides, Meteoroloji Bağlantılı Seyir, Passage Planning, COLREG
- Her biri ~600-1000 karakter

### Adım 3: Stabilite İçerik Güçlendirme (21 giriş)
`StabilityTopicsPage.tsx` içindeki `topicContents` kaydında kısa girişleri genişlet:
- Her girişi IS Code / SOLAS II-1 / IMO A.749(18) referanslarıyla zenginleştir
- Formül açıklaması, neden önemli, operasyonel bağlam ekle

### Teknik Detaylar
- Dosya boyutu nedeniyle seyir içerikleri 2 aşamada yazılacak
- Her içerik statik veri olarak yazılacak (kitap dili standardı, AI izi minimumda)
- Regülasyon referansları mevcut `regulationItems.ts` slug'larıyla uyumlu tutulacak
- Toplam ~105 içerik bloğu, tahmini ~80-100K karakter yeni veri

