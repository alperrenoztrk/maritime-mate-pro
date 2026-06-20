import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Bow thruster bakımı ve testi",
  shipType: "ro-ro",
  dept: "makine",
  opIndex: 1,
  estimatedPages: 14,
  intro: `Bow thruster, sık liman dönüşü yapan Ro-Ro'larda manevra için kritik ekipmandır; pervane, hidrolik/elektrik tahrik ve yağlama bakımı düzenli yapılır. Bu bölüm bow thruster bakımını ele alır.`,
  sources: ["Thruster maker manuals", "Class Rules"],
  chapters: [
    {
      heading: "1. Bakım ve Test",
      sections: [
        {
          subheading: "1.1 Pervane ve tahrik",
          paragraphs: [
            `Pervane (CPP ise pitch kontrolü), yağlama ve seal denetlenir; tahrik motoru/insulation ve kumanda testi yapılır. Manevra öncesi fonksiyon testi koşulur.`,
          ],
          bullets: [`Pervane/pitch kontrolü`, `Yağlama/seal`, `Manevra öncesi test`],
        },
      ],
    },
    {
      heading: "2. Kontrol Listesi",
      sections: [
        {
          subheading: "2.1 Son kontrol",
          bullets: [`Pervane/pitch uygun mu?`, `Seal/yağlama tamam mı?`, `Fonksiyon testi yapıldı mı?`, `Kayıt tutuldu mu?`],
          paragraphs: [`Bow thruster arızası sık manevra yapan feribotta yanaşmayı ciddi zorlaştırır.`],
        },
      ],
    },
  ],
};

export default content;
