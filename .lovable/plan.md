## Plan

1. **Animasyon kapsamını tüm sayfaya genişlet**
   - Şu an çevirme katmanı yalnızca `.bs-pager` içinde olduğu için sadece orta içerik alanı dönüyor.
   - Çevirme katmanını `.bs-spread` seviyesine taşıyacağım; böylece üst başlık, orta içerik ve alt sayfa numarası/YAPRAK alanı aynı fiziksel yaprağın parçası gibi dönecek.

2. **Tek yaprak fiziğini koru**
   - İleri çevirirken yalnızca sağ yarı; geri çevirirken yalnızca sol yarı omurgadan dönecek.
   - Ancak bu yarım yaprak artık sadece turuncu içerik alanını değil, kitabın görünen tam yüksekliğini kapsayacak.

3. **Başlık ve footer klonlarını doğru senkronize et**
   - Dönen yaprağın ön/arka yüzünde ilgili sayfanın üst başlığı, içerik alanı, sayfa numarası ve yaprak sayacı birlikte görünecek.
   - Sabit kalan yarı maske de aynı şekilde başlık + içerik + footer bütünlüğünü koruyacak.

4. **Görsel katmanları temizle**
   - Pembeyle işaretlediğiniz alanların sabit kalmasına yol açan katman ayrımını kaldıracağım.
   - Omurga gölgesi, sayfa gölgesi ve kenar kıvrımı tam yaprak yüksekliğine göre hizalanacak.

5. **Doğrulama**
   - Mobil/yatay önizlemede sayfa çevirme sırasında üst ve alt şeritlerin de yaprakla birlikte döndüğünü Playwright ekran görüntüsüyle kontrol edeceğim.
   - Geri/ileri çevirme, butonla çevirme ve sürükleyerek çevirme davranışlarını aynı düzeltmeyle doğrulayacağım.