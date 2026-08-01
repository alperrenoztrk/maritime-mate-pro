# Navigation Almanac hesaplama ayrıntısı kıyaslaması

**Kıyas tarihi:** 1 Ağustos 2026

**Kamuya açık referans:** [Navigation Almanac — Apple App Store](https://apps.apple.com/us/app/navigation-almanac/id6777455516)

**Maritime Mate Pro kapsamı:** 25 ders konusu içindeki 282 veri güdümlü hesaplayıcı ile gelişmiş hesap sayfalarındaki işlem zincirleri

## Kıyas sınırı

Bu çalışma, üçüncü taraf uygulamanın yalnız App Store'da kamuya açık açıklaması ve ekran sunumu üzerinden yapılmıştır. Kaynak koduna, kapalı algoritmalarına veya doğrulama veri setine erişildiği varsayılmamıştır. Amaç görünümü kopyalamak değil; profesyonel bir hesapta hangi bağlamın birlikte sunulduğunu Maritime Mate Pro'nun çok daha geniş hesap kataloğuna uyarlamaktır.

## Referans uygulamada görülen ayrıntı modeli

Navigation Almanac tek bir nihai sayı yerine aynı iş akışında şunları bir arada sunar:

- gözlemci konumu ve UTC zamanı;
- seçilen gök cismi ve gözlem bağlamı;
- GHA, LHA, SHA, deklinasyon, yarıçap ve paralaks gibi ara büyüklükler;
- azimut, yükseklik ve sight reduction sonucu;
- pusula hatası ve iki mevki hattı (two-LOP) sonucu;
- canlı GPS verisi ve WMM-2025 manyetik varyasyonu;
- doğuş, batış ve alacakaranlık zamanları.

Buradan türetilen kalite ilkesi şudur: **girdi → birim/işaret kuralı → kullanılan bağıntı → yerine koyma → ara işlem → nihai sonuç → kaynak/kapsam** zinciri kullanıcı tarafından denetlenebilmelidir.

## Maritime Mate Pro başlangıç durumu

| Alan | Başlangıç durumu | Risk |
| --- | --- | --- |
| Hesap kapsamı | Seyir, stabilite, yük, meteoroloji, gemicilik, emniyet, çevre, ekonomi ve makine derslerinde 282 bağlı hesaplayıcı | Kapsam geniş fakat sunum derinliği eşit değildi |
| Girdi işleme | Boş alanlar ortak kartta `0` kabul edilebiliyordu | Sessiz ve yanıltıcı sonuç riski |
| Formül izi | Formül kart başlığında vardı | Sonuç dökümünde girdi ve formülle birlikte taşınmıyordu |
| İşlem adımları | Tüm hesaplarda otomatik, sekiz hesapta elle zenginleştirilmiş adımlar vardı | Ayrıntı varsayılan olarak kapalıydı; yerine koyma izi sınırlıydı |
| Kaynak | Hesap verisinde kaynak alanı mevcuttu | Sonuçla aynı denetlenebilir kayıtta birleşmiyordu |
| Gelişmiş araçlar | Stabilite, makine, yapı, balast, emniyet ve hidrodinamik modüllerinde adım bileşeni kullanılıyordu | Adımlar kapalı başlıyor, kolay kopyalanamıyordu |
| Doğruluk borcu | `docs/calculation-gap.md` basitleştirilmiş hidrostatik, hidrodinamik, hava ve local-plane yaklaşımlarını listeliyor | Basitleştirilmiş sonucu gemiye özel kesin sonuç gibi kullanma riski |

## Uygulanan ortak profesyonel standart

### 1. Girdi bütünlüğü

- Boş zorunlu alan artık `0` sayılmaz.
- Sonlu sayı kontrolü yapılır.
- Hesap tanımı `min`, `max`, `step`, `required` ve girdi yardım metni taşıyabilir.
- Alan hataları ilgili girdinin yanında ve erişilebilirlik nitelikleriyle gösterilir.
- Bir girdi değiştiğinde eski sonuç silinir; eski sonuç ile yeni girdinin birlikte görünmesi engellenir.

### 2. Denetlenebilir işlem izi

Her veri güdümlü hesapta sonuçtan sonra otomatik olarak:

1. her girdinin değeri ve birimi;
2. kullanılan formül;
3. sayısal yerine koyma izi;
4. ara/nihai sonuç satırları;
5. varsa geçerlilik ve kapsam notu

gösterilir. İşlem izi sonuçla birlikte açık gelir; kullanıcı isterse kapatabilir.

### 3. Profesyonel hesap dökümü

Her başarılı hesap şunları tek kayıtta birleştirir:

- hesap adı ve grubu;
- UTC hesap zamanı;
- doğrulanan girdiler ve birimleri;
- nihai sonuçlar;
- formül;
- kaynak ve kaynak ayrıntısı;
- kapsam/varsayım notu;
- girdi, formül, kaynak ve çıktı kontrolleri.

Döküm panoya kopyalanabilir. Böylece kullanıcı sonucu vardiya notuna, çalışma kağıdına veya çapraz kontrol kaydına bütün bağlamıyla aktarabilir.

### 4. Gelişmiş hesap ekranları

Ortak `CalculationSteps` kullanan gelişmiş stabilite, makine, yapı, balast, emniyet, özel gemi, hidrodinamik ve ekonomi akışlarında:

- işlem zinciri varsayılan açık gelir;
- adım sayısı görünür;
- formül, yerine koyma, sonuç ve açıklamalar topluca kopyalanabilir;
- ekrandaki yuvarlamanın sonraki adıma taşınmadığı ve gemiye özel onaylı verinin önceliği açıkça belirtilir.

## Otomatik kalite kapısı

`npm run test:formulas` artık bütün 282 hesaplayıcı için şunları doğrular:

- formül, değişken ve kaynak izi mevcut;
- girdi anahtarları benzersiz;
- örnek değerler sayısal;
- boş zorunlu alanlar reddediliyor;
- hesap sonlu ve boş olmayan sonuç üretiyor;
- otomatik adımlar sonuçla tutarlı;
- kopyalanabilir dökümde girdi, formül, sonuç, işlem izi ve kaynak bölümleri mevcut.

## Operasyonel sınır

Bu değişiklik, katalogdaki her hesabın **ayrıntı ve izlenebilirlik standardını** eşitler; gemi hidrostatik tabloları, yükleme bilgisayarı, üretici eğrileri, klas kuralları veya resmî seyir neşriyatının yerine sentetik veri üretmez. `docs/calculation-gap.md` içinde yüksek doğruluk riskiyle işaretlenen fizik modelleri, gemiye özel veri olmadan “kesin” hale getirilmemiştir. Bu ayrım kullanıcıya hesap dökümünde açıkça gösterilir.
