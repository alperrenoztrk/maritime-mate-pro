# Bütün kaynaklar tek yerde: Library'yi ana merkez yapmak

Testçinin övdüğü şey kaynakların tek yerde olmasıydı. Şu an bu kaynaklar dağınık duruyor: Library sayfasında yalnızca personel, sistemler, operasyonlar, sözlük ve mevzuat var. Testçilerin en çok kullandığı **Deck kütüphanesi, Machine kütüphanesi ve Exercises** bu sayfada yok. **PSC/SIRE kontrol listesi** Beta altında kalmış, **düğüm animasyonları** ise Seamanship'in içinde gizli. Hedef: alttaki **Library** sekmesine dokunan biri, uygulamanın bütün kaynaklarını tek ekranda görsün.

## 1. Library sayfası, yeni düzen
Sayfada bir arama kutusu ve altında şu bölümler olacak:

```text
[ Search all resources ............ ]
Continue / Saved        (varsa, son açılanlar ve kayıtlar)
Deck Library            Navigation, Stability, Cargo, Cranes & Lifting,
                        Seamanship, Safety, Meteorology
Engine Library          Machine dersleri
Practice                Exercises, Question banks
Inspections             PSC / SIRE checklist
Seamanship Skills       Knot tutorials (animasyonlu)
Quick Reference         Dictionary, Legislation, Signals, Passage plan
Ship & Crew             Personnel, Bridge, Ship Systems, Operations
```

- Her kart tek dokunuşla doğrudan ilgili sayfayı açar; arada ara sayfa olmaz.
- PSC/SIRE ve Knots buradan açılır. Beta altındaki eski girişler de çalışmaya devam eder.
- Kart başlıkları İngilizce olur, açıklama satırı eklenmez (mevcut kural).

## 2. Library'den her şeyi arama
- Sayfanın en üstündeki kutu, mevcut genel aramayı açar ve sonuçları "Resources" ile sınırlar. Bu aramaya Deck/Engine dersleri, egzersizler, PSC maddeleri ve düğümler de eklenir.
- Arama filtrelerinde Türkçe kalan "Dersler" etiketi "Lessons" olur.

## 3. Ana sayfa ile bağlantı
- Ana sayfadaki "Quick Access" listesi kısalır, yerine tek bir **"All resources → Library"** girişi gelir. Böylece aynı listeler iki yerde tutulmaz.

## Kapsam dışında
- Yeni ders, hesaplama ya da içerik eklenmeyecek; yalnızca var olan kaynaklar tek yerde toplanacak.
- Görsel olarak yalnızca mevcut koyu tema ve kart stili kullanılacak; yapay zekâ ile üretilmiş görsel olmayacak.

## Doğrulama
- Telefon boyutunda Library'deki her kartın doğru sayfayı açtığı otomatik olarak gezilerek kontrol edilecek.
- "Library'deki bütün hedefler gerçek bir sayfaya gider" kuralı için küçük bir test yazılacak.
- Lint, tip denetimi, ux-consistency ve design-system kontrolleri çalıştırılacak.

## Teknik notlar
- `src/pages/LibraryHubPage.tsx` yeniden düzenlenir. Kart listesi `src/data/libraryResources.ts` adlı tek bir veri dosyasına taşınır; ana sayfa ve arama da aynı dosyayı kullanır.
- Deck/Engine dersleri mevcut `/lessons/:key/topics` ve machine yollarından alınır. PSC: `/beta/psc-checklist`, Knots: `/seamanship/knots`.
- `src/lib/appSearch.ts` içindeki scope etiketi düzeltilir. `searchIndex` öğeleri `libraryResources` ile birlikte zenginleştirilir.
- `StudyShortcuts` Library'nin üstünde yeniden kullanılır.
