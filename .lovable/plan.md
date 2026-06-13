## Amaç
Lovable mobil önizlemede görünen “this project couldn't render correctly in the mobile preview” uyarısını gidermek ve uygulamanın özellikle telefon önizlemesinde ilk ekrana güvenilir şekilde açılmasını sağlamak.

## Bulgu
- Mevcut sinyallerde kayıtlı console/runtime/network hatası görünmüyor; bu uyarı çoğu zaman mobil önizlemenin sayfayı zamanında/kararlı render edemediğini algılamasıyla çıkar.
- Projede açılışta çok fazla sayfa modülü tek seferde import ediliyor. Bu, mobil önizleme WebView/iframe ortamında ilk yüklemeyi ağırlaştırabilir.
- 3D/animasyon, offline/service worker temizliği, localStorage erişimleri ve çeviri/splash katmanları mobil önizlemede hassas noktalar.

## Plan
1. **Açılış yükünü azaltma**
   - `src/App.tsx` içindeki ağır sayfa importlarını `React.lazy` ile parça parça yüklenecek hale getireceğim.
   - Route alanını `Suspense` ile sarmalayıp denizcilik temasına uygun hafif bir yükleme ekranı göstereceğim.

2. **Mobil önizleme güvenliği**
   - Lovable mobil preview/iframe ortamında ilk render’ı engelleyebilecek işlemleri gözden geçireceğim.
   - Service worker temizliği gibi açılışta gereksiz bekleme yaratabilecek işlemlerin React mount’u bloklamadığından emin olacağım.

3. **Hata yakalama ve kullanıcıya görünür geri dönüş**
   - Mevcut `ErrorBoundary` korunacak.
   - Lazy route yükleme hatalarında uygulama boş kalmasın diye fallback davranışı güçlendirilecek.

4. **Doğrulama**
   - Değişikliklerden sonra mobil preview sinyali kontrol edilecek.
   - Ana sayfanın ve en az bir alt menünün mobilde açıldığını doğrulayacağım.

## Değişmesi beklenen dosyalar
- `src/App.tsx`
- Gerekirse küçük dokunuşla `src/serviceWorkerRegistration.ts` veya mevcut açılış yardımcıları

## Beklenen sonuç
Mobil önizleme uyarısının ortadan kalkması veya en azından uygulamanın mobil preview içinde ilk ekranı kararlı şekilde render etmesi.