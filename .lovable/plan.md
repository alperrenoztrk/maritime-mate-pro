
# Konu Anlatımı Görsel ve İçerik Denetim Raporu

## Mevcut Durum (Tarama Sonucu)

| Modül | Alt başlık sayısı | Görsel sayısı | Durum |
|-------|------------------|---------------|--------|
| **Seyir (Navigation)** | ~700 başlık | **180 görsel** | İyi durumda, sadece spesifik eksikler var |
| **Meteoroloji** | 98 başlık | **0 görsel** | KRİTİK – tamamen görselsiz |
| **Telsiz/Haberleşme** | 25 başlık | **0 görsel** | KRİTİK – tamamen görselsiz |
| **Stabilite** | 97 başlık | **0 görsel** (sadece SVG diyagramlar) | KRİTİK – fotoğraf yok |
| **Gemicilik (Seamanship)** | ~30 alt başlık | Sadece 9 SVG diyagram | KRİTİK – fotoğraf yok |
| **Akışkanlar Mekaniği** | 23 başlık | **0 görsel** | KRİTİK |
| **Makine (10 dosya)** | 612 başlık | **0 görsel** | KRİTİK – tamamen görselsiz |

**Sonuç**: Sadece Seyir modülü görsel açısından doyurucu. Geri kalan **7 modülün tamamı** görselsiz veya çok yetersiz.

## Yapılacak İş

### Öncelik 1: GEMİCİLİK (en kritik)
İçerik var ama görsel sıfır. Eklenecek gerçek fotoğraflar (Wikimedia Commons / NOAA / USCG / IMO public-domain kaynaklardan):
- Gemi kısımları (baş kasara, kıç, manifold, güverte ekipmanı)
- Halat türleri (manila, polypropylene, nylon, polyester, HMPE)
- Çelik tel halat kesiti, makara ve tampon donanımı
- Demir tipleri fotoğrafları (Hall, AC-14, Stockless, Spek, Danforth, Bruce/Plough)
- Zincir baklası ve markalaması
- Demir vinci (windlass), ırgat (capstan), salma demir
- Palamar düzeni ve mooring winch fotoğrafları
- Halat eklemeleri (eye splice, short splice, long splice)
- Yangın ekipmanları (CO2, foam, SCBA), can salı, can yeleği
- Ağır havada gemicilik (heavy weather seamanship sahneleri)

**~30-40 yüksek kaliteli fotoğraf**

### Öncelik 2: METEOROLOJİ
- Bulut türleri (10 ana cins zaten clouds/ klasöründe var → bağla)
- Sıcak/soğuk/oklüzyon cephe sembolleri ve gerçek uydu görüntüleri
- Tropikal siklon uydu görüntüsü (NOAA public domain)
- Beaufort skalası deniz durumu fotoğrafları (0-12)
- Yüksek/alçak basınç sistemleri sinoptik harita örneği
- Sis tipleri, fırtına dalgaları
- Barometre, anemometre, psikrometre cihaz fotoğrafları

**~25-30 görsel**

### Öncelik 3: STABİLİTE
- Gerçek gemi su seviyesi (draft mark) fotoğrafları
- Inclining test fotoğrafı
- Free surface effect tank içi
- Roll period ölçümü
- IMO yük hattı (Plimsoll mark) yakın çekim
- Grain shifting örneği
- Liste/trim örnekleri (gerçek gemi)
- Mevcut SVG diyagramlar korunacak, fotoğraflar tamamlayıcı eklenecek

**~15-20 görsel**

### Öncelik 4: MAKİNE (10 dosya)
- 2-stroke ve 4-stroke kesit fotoğrafları (zaten ship-systems/ klasöründe bazıları var)
- Yakıt enjektörü, supap, krank mili, piston, segman
- Turboşarjer, scavenge air cooler, intercooler
- Boyler (auxiliary, exhaust gas)
- Soğutma sistemi devresi, separatör, purifier
- Şaft hattı, intermediate shaft, stern tube
- Pervane (FPP, CPP), dümen makinesi
- Jeneratör, switchboard, alternatör
- Elektrik dağıtım panosu, akü grubu
- Pompa türleri (santrifüj, dişli, vidalı)
- Kompresör, hava şişesi
- Yangın söndürme sistemi (CO2, foam room)

**~50-60 görsel** (10 dosyaya dağıtılacak)

### Öncelik 5: TELSİZ/HABERLEŞME
- VHF, MF/HF transceiver fotoğrafları (mevcut bridge/ klasöründen yeniden kullan)
- Inmarsat-C terminal, Fleet Broadband
- EPIRB, SART, DSC kontrol paneli
- NAVTEX yazıcı çıktısı örneği
- GMDSS sea area haritası

**~10-15 görsel**

### Öncelik 6: AKIŞKANLAR MEKANİĞİ
- Reynolds deneyi, akış rejimleri
- Bernoulli prensibi (Venturi)
- Pitot tüpü, manometre
- Pompa karakteristik eğrisi diyagramı
- Kavitasyon hasarı pervane fotoğrafı

**~10 görsel**

### Öncelik 7: SEYİR (sadece eksik kısımlar)
Mevcut 180 görsel iyi; sadece şu eksikleri tamamla:
- IALA Bölge A vs Bölge B karşılaştırması (gerçek şamandıra fotoğrafları)
- Gece fener karakteristikleri sahneleri
- Sextant yakın çekim ve kullanım pozisyonu
- Modern köprü konsolu genel görünüm
- Tropikal/kutupsal bölge seyir koşulları

**~10 görsel**

## Görsel Tedarik Yöntemi

1. **Birinci tercih**: Wikimedia Commons, NOAA, USCG, IMO, US Navy (public domain / CC-BY) — `wget` ile indirilip `src/assets/` altına yerleştirilecek, kaynak metadata yorum satırı olarak korunacak.
2. **İkinci tercih**: Eğer uygun fotoğraf bulunamazsa Lovable AI image (Nano banana pro `google/gemini-3-pro-image-preview`) ile fotogerçekçi denizcilik ekipmanı görseli üretilecek. Sadece uydu görüntüsü, gerçek gemi sahnesi gibi durumlarda AI üretimi yapılmaz; o zaman public-domain kaynak şarttır.
3. Her görsel için `alt` metni, içerikle birebir uyumlu Türkçe açıklama olarak yazılacak.
4. WebP formatına dönüştürülecek (boyut optimizasyonu).

## Teknik Uygulama

- Yeni klasörler: `src/assets/seamanship/`, `src/assets/meteorology/`, `src/assets/stability-photos/`, `src/assets/machine/`, `src/assets/communication/`, `src/assets/fluid/`
- Her içerik dosyasının başına görsel `import` blokları eklenir.
- İlgili `subTopic`/`section` içine `image: importedImage` alanı yerleştirilir (mevcut `navigationTopicContents.ts` deseni birebir takip edilir).
- `LessonTopicDetailPage.tsx` ve `MachineTopicDetailPage.tsx` zaten image alanını render ediyor — şema değişikliği gerekmez.
- Mevcut SVG diyagramları (stability, seamanship) korunacak; fotoğraflar **tamamlayıcı** olarak eklenecek, asla yerine geçmeyecek.

## Aşama Planı (büyük iş, 4 etap)

İş hacmi yaklaşık **150–180 yeni görsel + 7 dosya güncellemesi**. Tek mesajda bitmesi imkansız; 4 etaba böleceğim:

1. **Etap 1**: Gemicilik + Meteoroloji (en kritik, ~60 görsel)
2. **Etap 2**: Makine 10 dosya (~55 görsel)
3. **Etap 3**: Stabilite + Akışkanlar + Telsiz (~40 görsel)
4. **Etap 4**: Seyir eksiklerinin kapatılması + tüm modüllerde alt metin/erişilebilirlik düzeltmeleri (~15 görsel)

Her etap sonunda hangi görsellerin gerçek public-domain kaynaktan, hangilerinin AI üretimi olduğunu raporlayacağım. Onay verdiğinde **Etap 1**'den başlıyorum.
