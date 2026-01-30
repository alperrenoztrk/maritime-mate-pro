
# Stabilite Konu Anlatımlarının Tamamlanması Planı

## Mevcut Durum Analizi

`src/data/stabilityTopicsContent.ts` dosyası **4550 satır** ve **16 bölüm** içermektedir. Her bölüm çok sayıda alt başlık (subtopic) barındırmaktadır.

### Mevcut Bölümler ve Alt Başlıklar

| Bölüm | Başlık | Alt Başlık Sayısı | Durum |
|-------|--------|-------------------|-------|
| 1 | Gemi Stabilitesine Giriş | 4 | ✅ Tamamlandı |
| 2 | Temel Kavramlar ve Tanımlar | 8 | ✅ Tamamlandı |
| 3 | Arşimet Prensibi ve Deplasman | 4 | ✅ Tamamlandı |
| 4 | Küçük Açılı Enine Stabilite | 3 | ✅ Tamamlandı |
| 5 | Sert ve Yumuşak Gemi, Rulo Periyodu | 3 | ✅ Tamamlandı |
| 6 | GZ Eğrileri ve Büyük Açılı Stabilite | 4 | ✅ Tamamlandı |
| 7 | Serbest Yüzey Etkisi (FSE) | 3 | ✅ Tamamlandı |
| 8 | Boyuna Stabilite ve Trim | 4 | ✅ Tamamlandı |
| 9 | Hasarlı Stabilite | 4 | ✅ Tamamlandı |
| 10 | IMO Stabilite Kriterleri | 4 | ✅ Tamamlandı |
| 11 | Yükleme Durumları | 2 | ✅ Tamamlandı |
| 12 | Özel Kargo Tipleri | 4 | ✅ Tamamlandı |
| 13 | Yükleme Bilgisayarları | 3 | ✅ Tamamlandı |
| 14 | Hesap Örnekleri | 4 | ✅ Tamamlandı |
| 15 | Pratik Uygulamalar | 4 | ✅ Tamamlandı |
| 16 | Özet ve Kontrol Listeleri | 4 | ✅ Tamamlandı |

**Sonuç:** Tüm 16 bölüm ve 58 alt başlık detaylı içerikle yazılmış durumdadır.

---

## Tespit Edilen Eksiklikler

Dosyadaki mevcut içerikler kapsamlı olmakla birlikte, bazı kritik konuların **eksik veya yetersiz** olduğu tespit edilmiştir:

### 1. Eksik Alt Başlıklar (Eklenmesi Gereken)

| Bölüm | Eksik Alt Başlık | Açıklama |
|-------|-----------------|----------|
| 4 | **4.4. İnclinometer ve GM Ölçümü** | Pratik GM ölçüm yöntemleri |
| 5 | **5.4. Parametrik Rulo (Parametric Rolling)** | Modern gemilerde kritik bir konu |
| 6 | **6.5. Wall-Sided Formülü** | Büyük açı GZ hesabı için önemli |
| 8 | **8.5. LCF ve Draft Düzeltmeleri** | Pratik operasyonlar için gerekli |
| 9 | **9.5. Progressive Flooding** | Ardışık su basması analizi |
| 10 | **10.5. İkinci Nesil Stabilite Kriterleri (SGISC)** | IMO'nun yeni kriterleri |

### 2. İçeriği Yetersiz/Güçlendirilmesi Gereken Alt Başlıklar

| Mevcut Alt Başlık | Eksik İçerik |
|-------------------|--------------|
| 2.0 Kaldırma Kuvveti | Formül tablosu eksik, örnekler yetersiz |
| 3.4 TPC ve Paralel Batma | DWA hesap örnekleri eksik |
| 7.3 Serbest Yüzey Düzeltmesi | Çoklu tank hesap tablosu eksik |
| 11 (Standart Yükleme Durumları) | Tipik değer tabloları eksik |

---

## Yapılacak Değişiklikler

### Faz 1: Eksik Alt Başlıkların Eklenmesi

#### 1.1. Bölüm 4'e Yeni Alt Başlık
**"4.4. İnclinometer ve GM Ölçümü"** eklenecek:
- Eğim testi (inclining experiment) prosedürü
- İnclinometer kullanımı
- Pratik GM hesabı
- Formüller ve örnekler

#### 1.2. Bölüm 5'e Yeni Alt Başlık
**"5.4. Parametrik Yalpa (Parametric Rolling)"** eklenecek:
- Fenomenin fiziksel açıklaması
- Kritik koşullar (λ/L oranı, karşılaşma frekansı)
- Önleme yöntemleri
- IMO rehber dokümanları referansları

#### 1.3. Bölüm 6'ya Yeni Alt Başlık
**"6.5. Wall-Sided Formülü"** eklenecek:
- Duvar bordolu gemiler için yaklaşım
- GZ = sin θ (GM + ½ BM tan²θ) formülü
- Uygulama sınırları
- Hesap örnekleri

#### 1.4. Bölüm 8'e Yeni Alt Başlık
**"8.5. LCF ve Draft Düzeltmeleri"** eklenecek:
- LCF'nin fiziksel anlamı
- Trim düzeltme hesapları
- Gerçek draft hesabı (perpendikülerlerde)
- Pratik tablo ve örnekler

#### 1.5. Bölüm 9'a Yeni Alt Başlık
**"9.5. Progressive Flooding"** eklenecek:
- Ardışık su basması tanımı
- Cross-flooding sistemleri
- Zaman hesapları
- Emniyet önlemleri

#### 1.6. Bölüm 10'a Yeni Alt Başlık
**"10.5. İkinci Nesil Stabilite Kriterleri (SGISC)"** eklenecek:
- 5 başarısızlık modu açıklaması
- Level 1, 2, 3 yaklaşımları
- DSA (Direct Stability Assessment)
- IMO MSC.1/Circ.1627 referansı

### Faz 2: Mevcut İçeriklerin Güçlendirilmesi

#### 2.1. Formül Tabloları Ekleme
Aşağıdaki bölümlere detaylı formül tabloları eklenecek:
- Bölüm 2: Tüm dikey mesafe formülleri özeti
- Bölüm 7: Tank tiplerine göre FSM formül tablosu
- Bölüm 8: Trim hesap formülleri özet tablosu

#### 2.2. Hesap Örnekleri Ekleme
Aşağıdaki bölümlere adım adım çözümlü örnekler eklenecek:
- Bölüm 3: Draft Survey hesap örneği
- Bölüm 7: Çoklu tank FSE hesap örneği
- Bölüm 8: Tam yükleme durumu trim hesabı

#### 2.3. Pratik İpuçları Ekleme
Tüm bölümlere "practicalTips" ve "warnings" alanları kontrol edilecek ve eksik olanlar tamamlanacak.

---

## Teknik Uygulama Detayları

### Dosya Yapısı
Mevcut `StabilityTopic` ve `StabilitySubTopic` interface'leri korunacak:

```typescript
interface StabilitySubTopic {
  id?: string;
  title: string;
  content: string;
  formulas?: { formula: string; description: string }[];
  examples?: { problem: string; solution: string }[];
  practicalTips?: string[];
  warnings?: string[];
  keyPoints?: string[];
}
```

### İçerik Formatı
- Markdown formatı kullanılacak
- Formüller `────────────` ile çerçevelenecek
- Görseller mümkünse uygun URL'lerle eklenecek
- Tablolar markdown tablo formatında

### Kaynak Doğrulaması
Tüm formüller ve veriler aşağıdaki kaynaklarla doğrulanacak:
- IMO 2008 IS Code (MSC.267(85))
- IMO Grain Code
- SOLAS II-1
- gemi_stabilite_hesaplamalari.md (proje içi referans)

---

## Beklenen Sonuç

İşlem tamamlandığında:
- **16 bölüm** → 16 bölüm (değişiklik yok)
- **58 alt başlık** → **64 alt başlık** (6 yeni ekleme)
- Her alt başlıkta: formüller, örnekler, pratik ipuçları ve uyarılar
- Toplam satır sayısı: ~5500-6000 satır (tahmini)

---

## Zaman Tahmini

| Görev | Süre |
|-------|------|
| 6 yeni alt başlık ekleme | ~15 dakika |
| Mevcut içeriklerin güçlendirilmesi | ~10 dakika |
| Formül ve örnek tabloları | ~5 dakika |
| Test ve doğrulama | ~5 dakika |
| **Toplam** | **~35 dakika** |
