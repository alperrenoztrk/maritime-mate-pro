import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Viskosimetre kalibrasyon ve bakımı",
  shipType: "tanker",
  dept: "makine",
  opIndex: 7,
  estimatedPages: 12,
  intro: `Online viscometer, ağır yakıtın enjeksiyon öncesi doğru viskoziteye ısıtılmasını sağlar; yanlış viskozite enjektör tahribi ve kötü yanma yapar. Bu bölüm viskosimetre kalibrasyon ve bakımını ele alır.`,
  sources: ["ISO 8217 (fuel)", "Viscometer maker manuals"],
  chapters: [
    {
      heading: "1. Kalibrasyon ve Bakım",
      sections: [
        {
          subheading: "1.1 Periyodik kalibrasyon",
          paragraphs: [
            `Viscometer periyodik kalibre edilir ve filtre temizliği yapılır; viskozite kontrol döngüsü yakıt ısıtıcısı ile birlikte doğrulanır.`,
          ],
          bullets: [
            `Periyodik kalibrasyon`,
            `Filtre temizliği`,
            `Heater ile kontrol döngüsü testi`,
          ],
        },
      ],
    },
    {
      heading: "2. Kontrol Listesi",
      sections: [
        {
          subheading: "2.1 Son kontrol",
          bullets: [
            `Kalibrasyon yapıldı mı?`,
            `Filtre temiz mi?`,
            `Kontrol döngüsü doğru mu?`,
            `Calibration certificate dosyalandı mı?`,
          ],
          paragraphs: [
            `Yanlış viskozite enjektör/pompa hasarı yapar; kalibrasyon ihmal edilmez.`,
          ],
        },
      ],
    },
  ],
};

export default content;
