

## Plan: Gemide Yapılan Tüm İşler - Detay Sayfaları

### Mevcut Durum
- ShipTasksPage'de 9 kategori, ~80+ iş maddesi var
- Sadece "Passage Plan" bir detay sayfasına (`/passage-plan`) bağlı
- Diğer tüm işler sadece tablo satırı olarak listeleniyor, tıklanabilir değil

### Yaklaşım
PassagePlanPage formatını referans alarak, her iş maddesi için detay sayfası oluşturulacak. Dinamik routing ile tek bir bileşen kullanılacak.

### Teknik Yapı

**1. Veri Dosyası:** `src/data/shipTaskDetailData.ts`
- Her kategori ve iş maddesi için detaylı içerik (tanım, prosedür adımları, sorumluluk tablosu, ilgili mevzuat, pratik ipuçları)
- 9 kategorideki ~80 iş için yapılandırılmış veri

**2. Dinamik Sayfa:** `src/pages/ShipTaskDetailPage.tsx`
- Route: `/ship-tasks/:taskSlug`
- PassagePlanPage ile aynı tasarım dili (koyu arka plan, kartlar, tablolar)
- Her iş için: tanım, prosedür, sorumluluk matrisi, mevzuat referansları, kontrol listesi

**3. ShipTasksPage Güncelleme:**
- Tüm iş maddelerine `href` eklenerek tıklanabilir link haline getirilecek
- Tüm kategorilerdeki inline diziler yapılandırılmış veriye dönüştürülecek

**4. App.tsx Route Ekleme:**
- `/ship-tasks/:taskSlug` route'u eklenecek

### İçerik Kapsamı (Passage Plan formatında)
Her iş detayı şunları içerecek:
- Tanım ve önem
- Adım adım prosedür
- Sorumluluk matrisi (kim ne yapar)
- İlgili SOLAS/MARPOL/ISM/STCW referansları
- Kontrol listesi
- Pratik senaryo veya örnek

### Uygulama Sırası
1. `shipTaskDetailData.ts` veri dosyası oluştur (tüm 80+ iş için)
2. `ShipTaskDetailPage.tsx` dinamik bileşen oluştur
3. `ShipTasksPage.tsx` güncelle (tüm işlere href ekle)
4. `App.tsx` route ekle

Veri boyutu nedeniyle birden fazla mesajda tamamlanacak.

