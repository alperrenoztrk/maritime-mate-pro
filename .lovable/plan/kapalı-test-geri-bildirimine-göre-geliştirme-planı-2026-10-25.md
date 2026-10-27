# Kapalı test geri bildirimine göre geliştirme planı

Test kullanıcıları en çok deck kütüphanesini (cranes & lifting, stability exercises), machine kütüphanesini, exercises bölümünü ve sözlüğü kullandı. "Kaynakların tek yerde olması işimi kolaylaştırdı" yorumu, uygulamanın asıl gücünün **tek merkezden hızlı erişim** olduğunu gösteriyor. Plan bu gücü artırmaya odaklanıyor.

## 1. Tek merkezden erişimi güçlendir
- **Continue where you left off:** Ana sayfada son açılan ders, egzersiz ve sözlük terimi tek bir kartta durur.
- **Bookmarks:** Ders bölümü, egzersiz sorusu ve sözlük terimi tek dokunuşla kaydedilir ve "Saved" listesinde toplanır.
- **Daha iyi arama:** Global arama dersleri, egzersizleri, sözlüğü, PSC/SIRE maddelerini ve düğümleri tek listede gösterir.

## 2. Deck kütüphanesi (en çok kullanılan bölüm)
- **Cranes & lifting:** SWL/WLL, sapan açısı yük tablosu, güvenlik katsayıları; her formüle bağlı bir hesaplama aracı. Değerler kaynaklı standartlardan (ILO 152, LOLER, üretici tabloları) kontrol edilir.
- **Stability exercises:** GM, KG, serbest yüzey düzeltmesi ve meyil açısı için adım adım çözülmüş örnekler. Değerler girildikçe meyil animasyonu güncellenir.

## 3. Machine kütüphanesi
- Mevcut konuların eksik kalan formüllerini (yakıt tüketimi, slip, güç) hesaplama araçlarıyla eşleştirmek.
- Sistem şemalarını etkileşimli hale getirmek (parçaya dokununca açıklama açılır). Yapay zekâ görseli kullanılmaz, uyan görsel yoksa çizim yapılır ya da bölüm boş kalır.

## 4. Exercises
- **Hata defteri:** Yanlış yapılan sorular otomatik olarak listelenir ve tekrar çözülebilir.
- **Konu bazlı ilerleme:** Her konuda doğru cevap oranı gösterilir.
- **Sınav modu:** Süreli, karışık sorulu deneme.

## 5. Sözlük
- Terimden ilgili derse ve egzersize bağlantı.
- Çevrimdışı çalışma (gemide internet olmayabilir).
- Denizcilik terimi kuralları korunur; emin olunmayan çeviri İngilizce kalır.

## 6. Ölçüm
- Hangi bölümlerin ne kadar açıldığını anonim olarak saymak; bir sonraki geliştirme sırası buna göre belirlenir.

## Önerilen sıra
1. Bookmarks + Continue + arama (hızlı ve herkese yarar)
2. Cranes & lifting + Stability exercises
3. Exercises hata defteri ve sınav modu
4. Machine kütüphanesi eksikleri
5. Sözlük bağlantıları ve çevrimdışı çalışma

## Teknik notlar
- Bookmarks ve ilerleme bilgisi önce cihazda (localStorage), oturum açıksa backend'de RLS + GRANT içeren yeni tablolarla saklanır.
- Yeni formüllerin her birine birim testi eklenir (kaynaktaki örnek değerlerle).
- Mevcut `CalculationGridScreen` ve tasarım token'ları kullanılır; yalnızca koyu tema.
- Her adım ayrı teslim edilir; sürüm yalnızca istendiğinde yükseltilir.
