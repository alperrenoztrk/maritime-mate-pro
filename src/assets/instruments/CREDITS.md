# Enstrüman Görsel Kaynakları / Image Credits

Bu klasördeki görseller ana sayfa widget'larının gövdesini oluşturur: her widget
gerçek bir enstrümanın fotoğrafı üzerine canlı veriyi bindirir. Görsellerin
tamamı gerçek fotoğraftır (yapay zeka üretimi değildir) ve Wikimedia Commons
üzerinden özgür lisanslarla alınmıştır. Lisans gereği atıflar aşağıdadır.

| Dosya | Kaynak | Fotoğrafçı | Lisans |
|---|---|---|---|
| chronometer.jpg | [Marine-Chronometer.A.Lange&Soehne.1948.jpg](https://commons.wikimedia.org/wiki/File:Marine-Chronometer.A.Lange%26Soehne.1948.jpg) | Bautsch | CC0 |
| compass.jpg | [Askania compass.JPG](https://commons.wikimedia.org/wiki/File:Askania_compass.JPG) | Blueberry009 | Public domain |
| porthole.jpg | [Bamberton through the porthole - panoramio.jpg](https://commons.wikimedia.org/wiki/File:Bamberton_through_the_porthole_-_panoramio.jpg) | Kiwibirdman | CC BY 3.0 |
| thermometer.jpg | [Quicksilvertermometer Osaby.JPG](https://commons.wikimedia.org/wiki/File:Quicksilvertermometer_Osaby.JPG) | Pieter Kuiper | Public domain |

Konum widget'ı bu klasör yerine `../ship-systems/gps.jpg` dosyasını kullanır;
kredisi `../IMAGE_CREDITS.md` içinde listelidir.

Atıflar uygulama içinde de gösterilir: ana sayfa widget panelinin altındaki
"Enstrüman fotoğrafları" satırı, kaynak listesini açan bir pencere açar. Bu
listenin verisi `src/components/widgets/instruments/instrumentPhotos.ts`
dosyasındaki `credit` alanlarından gelir — yeni bir fotoğraf eklerken hem bu
tablo hem orası güncellenmelidir.
