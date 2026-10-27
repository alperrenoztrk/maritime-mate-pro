# Haber okuma penceresini ortala

## Sorun
Telefonda haber penceresi sola yapışık açılıyor: pencere ekranın sol kenarından başlıyor ama ekrandan biraz dar, bu yüzden sağda boşluk kalıyor.

## Çözüm
- Haber penceresini telefonda yatayda tam ortaya al (sol ve sağ boşluk eşit).
- Masaüstündeki görünüm değişmez.
- Diğer pencereler etkilenmez; değişiklik yalnızca haber okuma penceresinde.

## Doğrulama
- 375px genişlikte Playwright ile haberi aç, pencerenin sol ve sağ boşluklarını ölç, eşit olduğunu ve ekran görüntüsünü kontrol et.

## Teknik detay
`src/components/news/NewsReaderDialog.tsx` içindeki `DialogContent` sınıflarına `inset-x-0` ile birlikte `mx-auto` eklenir (sabit konumlu, genişliği `calc(100vw-1.25rem)` olan öğe sol/sağ 0 + otomatik kenar boşluğu ile ortalanır).
