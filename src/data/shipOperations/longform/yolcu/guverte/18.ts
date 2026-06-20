import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Navigasyon cihazları bakımı (radar, ECDIS, AIS)",
  shipType: "yolcu",
  dept: "guverte",
  opIndex: 18,
  estimatedPages: 14,
  intro: `Seyir cihazları (radar/ARPA, ECDIS, AIS, gyro, GPS) düzenli kontrol ve bakım gerektirir; yedeklilik (redundancy) ve doğru kalibrasyon seyir güvenliğinin temelidir. Bu bölüm seyir cihazı bakımını ele alır.`,
  sources: ["SOLAS V/19", "Maker manuals"],
  chapters: [
    {
      heading: "1. Bakım/Kontrol",
      sections: [
        {
          subheading: "1.1 Kalibrasyon ve yedeklilik",
          paragraphs: [
            `Radar/ECDIS/AIS fonksiyon testleri ve kalibrasyon yapılır; sensör (gyro/GPS/log) girişleri doğrulanır. Back-up cihazlar çalışır durumda tutulur.`,
          ],
          bullets: [`Fonksiyon testi`, `Sensör girişi doğrulama`, `Back-up/redundancy`],
        },
      ],
    },
    {
      heading: "2. Kontrol Listesi",
      sections: [
        {
          subheading: "2.1 Son kontrol",
          bullets: [`Cihazlar çalışıyor mu?`, `Sensör girişleri doğru mu?`, `Back-up hazır mı?`, `Kayıt tutuldu mu?`],
        },
      ],
    },
  ],
};

export default content;
