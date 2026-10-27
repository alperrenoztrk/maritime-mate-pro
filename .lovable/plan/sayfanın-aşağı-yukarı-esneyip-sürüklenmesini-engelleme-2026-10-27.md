# Sayfanın aşağı/yukarı esneyip sürüklenmesini engelleme

Sayfanın en üstünde aşağı çekince ya da en altında yukarı itince bütün uygulama esniyor (iOS Safari ve Android). Bu esneme ve "çekip yenile" kapatılacak; sayfa içindeki normal kaydırma aynen çalışacak.

## Yapılacaklar
1. Genel stil: `html` ve `body` için `overscroll-behavior: none`. Böylece kök sayfa esnemez, Android/Chrome'da çekip yenileme de kapanır.
2. Kaydırılan iç alanlar (sayfa gövdesi, açılan pencereler, haber okuyucu) için `overscroll-behavior-y: contain`. Kaydırma kenara gelince arka sayfa sürüklenmez.
3. iOS Safari eski sürümleri bu ayarı tam uygulamıyor. Bunun için uygulama kabuğu sabit tam ekran yapılır (`html, body` yükseklik %100, `overflow: hidden`) ve kaydırma yalnızca ana içerik alanında olur. Gerekirse kaydırılabilir alan yoksa dokunmatik sürüklemeyi durduran hafif bir dinleyici eklenir.
4. Android (Capacitor): WebView'in kenar esnemesi kapatılır (yalnızca ayar).

## Doğrulama
- Telefon boyutunda Playwright ile en üst ve en altta sürükleme denenir; sayfanın kaymadığı, içerik kaydırmasının çalıştığı kontrol edilir.
- Alt menü, geri tuşu ve açılan pencereler kontrol edilir.
- Gerçek iPhone/Android cihazda deneme kullanıcıda kalır.
