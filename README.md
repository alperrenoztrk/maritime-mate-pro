# Mariner's Book

Mariner's Book; denizcilik derslerini, operasyonel referansları, hesaplama araçlarını ve gerçekçi etkileşimli kitapları tek mobil uygulamada birleştiren React, TypeScript, Vite ve Capacitor tabanlı bir projedir.

## Mobil uygulama arayüzü

- iOS tarzı kalıcı sekme navigasyonu ve iPad yan menüsü
- Büyük başlıktan satır içi başlığa dönüşen navigasyon
- Etkileşimli kenardan geri kaydırma ve eşzamanlı sayfa geçişleri
- Sistem, açık ve koyu görünüm desteği
- Güvenli alanlar, 44 px dokunma hedefleri ve azaltılmış hareket seçenekleri
- Çevrimdışı PWA desteği ve yerel iOS/Android uygulama varlıkları

## Gemi enine stabilite hesaplama sistemi

Stabilite modülü, gemi enine stabilitesiyle ilgili kapsamlı hesaplamalar yapar. SOLAS ve IMO kriterlerine uygun kontroller ve detaylı raporlama sağlar.

## 🚢 Özellikler

### Temel Stabilite Hesaplamaları
- GM (Metasantr yüksekliği) hesaplama
- KM ve KG hesaplamaları
- KB ve BM ilişkisi

### Yük Operasyonları
- Yükleme/tahliye sonrası yeni KG hesaplama
- GM değişimi analizi
- Çoklu yük operasyonları desteği

### Meyil Hesaplamaları
- Yük hareketi ile meyil açısı
- Sarkaç ile meyil ölçümü
- GZ (doğrultucu kol) hesaplama
- Meyil momenti analizi

### Kren/Bumba Operasyonları
- Yük kaldırma sırasında GM değişimi
- Kritik yükseklik analizi
- Güvenlik kontrolü

### Serbest Yüzey Etkisi (FSM)
- Tank bazlı FSM hesaplama
- GM düzeltmesi
- Çoklu tank analizi

### Stabilite Analizleri
- Yalpa periyodu hesaplama
- GZ eğrisi oluşturma
- KN'den GZ hesaplama
- Dinamik stabilite alanı (Simpson kuralı)

### SOLAS Kriterleri
- Minimum GM kontrolü (0.15m / 0.30m)
- GZ eğrisi alan kontrolleri
- Maksimum GZ ve açı kontrolleri

### Özel Durumlar
- Havuzda kritik GM hesabı
- Yaralı stabilite (duba örneği)
- P kuvveti (takarya tepkisi) hesabı

## 🛠️ Kurulum

1. Python 3.8 veya üzeri sürümün yüklü olduğundan emin olun.

2. Gerekli paketleri yükleyin:
```bash
pip install -r requirements.txt
```

## 🚀 Kullanım

### Streamlit Uygulaması (Web Arayüzü)

```bash
streamlit run streamlit_app.py
```

Uygulama varsayılan olarak `http://localhost:8501` adresinde açılacaktır.

### Test ve Örnekler

Test dosyasını çalıştırarak tüm hesaplama örneklerini görebilirsiniz:

```bash
python test_stability.py
```

### Python Modülü Olarak Kullanım

```python
from stability_calculator import EnineStabiliteHesaplama, YukBilgisi

# Temel hesaplama
hesaplama = EnineStabiliteHesaplama(
    deplasman=10000,  # ton
    km=8.5,           # m
    kg=6.5            # m
)

print(f"GM: {hesaplama.gm} m")

# Yük operasyonu
yukler = [
    YukBilgisi(agirlik=200, kg=12.0),
    YukBilgisi(agirlik=150, kg=2.0)
]

yeni_kg = hesaplama.yeni_kg_hesapla(yukler)
print(f"Yeni KG: {yeni_kg} m")
```

## 📊 Formüller

### Temel Formüller

- **GM Hesaplama**: `GM = KM - KG`
- **KM Hesaplama**: `KM = KB + BM`
- **Yeni KG**: `KG_yeni = Σ(Ağırlık × KG) / Σ(Ağırlık)`
- **GG₁ (Yük Hareketi)**: `GG₁ = (w × d) / Δ`
- **Meyil Açısı**: `tan φ = GZ / GM`
- **GZ Hesaplama**: `GZ = KN - KG × sin φ`

### Serbest Yüzey Etkisi

- **FSM (Dikdörtgen Tank)**: `FSM = (L × B³ × ρ) / 12`
- **GM Küçülmesi**: `GG₁ = FSM / Δ`

### Yalpa Periyodu

- **T**: `T = C × B / √GM`

## 📋 Dosya Yapısı

```
├── stability_calculator.py    # Ana hesaplama modülü
├── streamlit_app.py          # Web arayüzü
├── test_stability.py         # Test ve örnekler
├── requirements.txt          # Gerekli paketler
└── README.md                # Bu dosya
```

## 🔍 Özellik Detayları

### Streamlit Arayüzü Sekmeleri

1. **Temel Hesaplamalar**: GM, KM, KG hesaplamaları ve SOLAS kontrolleri
2. **Yük Operasyonları**: Yükleme/tahliye simülasyonları
3. **Kren/Bumba İşlemleri**: Yük kaldırma güvenlik analizi
4. **Serbest Yüzey Etkisi**: Tank FSM hesaplamaları
5. **Meyil Hesaplamaları**: Meyil açısı ve yalpa periyodu
6. **GZ Eğrisi ve SOLAS**: Stabilite eğrisi analizi
7. **Rapor**: Detaylı stabilite raporu oluşturma

### Test Fonksiyonları

- `test_temel_hesaplamalar()`: Temel GM, KM, KG testleri
- `test_yuk_operasyonlari()`: Yük ekleme/çıkarma testleri
- `test_meyil_hesaplamalari()`: Meyil açısı testleri
- `test_bumba_kren()`: Kren operasyonu testleri
- `test_serbest_yuzey()`: FSM hesaplama testleri
- `test_yalpa_periyodu()`: Yalpa karakteristiği testleri
- `test_gz_egri_solas()`: GZ eğrisi ve SOLAS testleri
- `test_kritik_gm_havuz()`: Havuz operasyonu testleri

## 📚 Referanslar

- SOLAS (Safety of Life at Sea) Chapter II-1
- IMO Intact Stability Code
- Gemi Stabilitesi Prensipleri

## 📝 Notlar

- Tüm hesaplamalar metrik sistemde yapılmaktadır
- Açılar derece cinsinden girilir, radyana çevrilir
- Deniz suyu yoğunluğu varsayılan: 1.025 ton/m³
- Simpson kuralı için tek sayıda (en az 3) değer gereklidir

## ⚠️ Uyarılar

Bu yazılım eğitim ve referans amaçlıdır. Gerçek gemi operasyonlarında kullanmadan önce:
- Hesaplamaları kontrol edin
- Yetkili denizcilik otoritelerinin onayını alın
- Güncel SOLAS ve IMO kriterlerini takip edin

## 🤝 Katkıda Bulunma

Geliştirme önerileri ve hata bildirimleri için issue açabilirsiniz.

## 📄 Lisans

Bu proje eğitim amaçlı olarak geliştirilmiştir.