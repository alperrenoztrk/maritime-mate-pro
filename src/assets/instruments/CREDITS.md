# Enstrüman Görsel Kaynakları / Image Credits

Bu klasördeki görseller ana sayfa widget'larının gövdesini oluşturur: her widget
gerçek bir enstrümanın fotoğrafı üzerine canlı veriyi bindirir. Görsellerin
tamamı gerçek fotoğraftır (yapay zeka üretimi değildir). Kaynaklar iki gruptur.

## Uygulama arşivi

Saat, rüzgâr ve konum widget'larının gövdeleri uygulama sahibi tarafından
sağlanmıştır. Bunlar Commons görselleri gibi özgür lisanslı değildir; yayın
öncesi kullanım haklarının doğrulanması gerekir.

| Dosya | Enstrüman | Kaynak |
|---|---|---|
| seiko-marine-clock.jpg | Seiko köprüüstü saati | Kullanıcı arşivi |
| wind-indicator.jpg | Koshin rüzgâr hız/yön paneli | Kullanıcı arşivi |
| gps-receiver.webp | SGN-500 GPS/GLONASS alıcısı | Kullanıcı arşivi |

## Wikimedia Commons

Özgür lisanslarla alınmıştır; lisans gereği atıflar aşağıdadır.

| Dosya | Kaynak | Fotoğrafçı | Lisans |
|---|---|---|---|
| porthole.jpg | [Bamberton through the porthole - panoramio.jpg](https://commons.wikimedia.org/wiki/File:Bamberton_through_the_porthole_-_panoramio.jpg) | Kiwibirdman | CC BY 3.0 |
| thermometer.jpg | [Quicksilvertermometer Osaby.JPG](https://commons.wikimedia.org/wiki/File:Quicksilvertermometer_Osaby.JPG) | Pieter Kuiper | Public domain |

Atıflar uygulama içinde de gösterilir: ana sayfa widget panelinin altındaki
"Enstrüman fotoğrafları" satırı, kaynak listesini açan bir pencere açar. Bu
listenin verisi `src/components/widgets/instruments/instrumentPhotos.ts`
dosyasındaki `credit` alanlarından gelir — yeni bir fotoğraf eklerken hem bu
tablo hem orası güncellenmelidir.
