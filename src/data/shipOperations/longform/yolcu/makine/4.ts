import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Bow ve stern thruster bakımı ve testi",
  shipType: "yolcu",
  dept: "makine",
  opIndex: 4,
  estimatedPages: 14,
  intro: `Bow/stern thruster'lar, sık liman dönüşü yapan yolcu gemilerinde manevra için kritiktir; pervane, tahrik ve yağlama bakımı düzenli yapılır. Bu bölüm thruster bakımını ele alır.`,
  sources: ["Thruster maker manuals", "Class Rules"],
  chapters: [
    {
      heading: "1. Bakım/Test",
      sections: [
        {
          subheading: "1.1 Pervane/tahrik",
          paragraphs: [`Pervane (CPP ise pitch), yağlama ve seal denetlenir; tahrik motoru/insulation ve kumanda test edilir. Manevra öncesi fonksiyon testi koşulur.`],
          bullets: [`Pervane/pitch`, `Yağlama/seal`, `Manevra öncesi test`],
        },
      ],
    },
    {
      heading: "2. Kontrol Listesi",
      sections: [
        {
          subheading: "2.1 Son kontrol",
          bullets: [`Pervane/pitch uygun mu?`, `Seal/yağlama tamam mı?`, `Fonksiyon testi yapıldı mı?`, `Kayıt tutuldu mu?`],
        },
      ],
    },
  ],
};

export default content;
