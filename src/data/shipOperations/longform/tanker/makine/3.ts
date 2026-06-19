import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Buhar (steam) sistemi bakımı ve kazan operasyonu",
  shipType: "tanker",
  dept: "makine",
  opIndex: 3,
  estimatedPages: 18,
  intro: `Tankerlerde buhar; kargo ısıtma, tank yıkama ve çeşitli servisler için üretilir. Kazan operasyonu su kalitesi, blow-down ve safety valve disiplinini gerektirir. Bu bölüm buhar sistemi bakımını ele alır.`,
  sources: ["Class Rules — Boilers", "Boiler maker manuals"],
  chapters: [
    {
      heading: "1. Kazan Operasyonu",
      sections: [
        {
          subheading: "1.1 Su kalitesi ve blow-down",
          paragraphs: [
            `Kazan suyu testleri (pH, kloride, fosfat vb.) düzenli yapılır; günlük blow-down ile birikim atılır. Soot blowing kurum birikimini önler.`,
          ],
          bullets: [
            `Günlük blow-down`,
            `Su kimyası testleri`,
            `Soot blowing`,
            `Safety valve yıllık testi`,
          ],
        },
      ],
    },
    {
      heading: "2. Güvenlik",
      sections: [
        {
          subheading: "2.1 Soot fire ve safety valve",
          paragraphs: [
            `Kurum birikimi soot fire riski yaratır; safety valve testi aşırı basınca karşı son korumadır.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Soot fire",
              text: `İhmal edilen soot birikimi baca/kazan yangını yapar; soot blowing düzenli yapılır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. Kontrol Listesi",
      sections: [
        {
          subheading: "3.1 Son kontrol",
          bullets: [
            `Blow-down yapıldı mı?`,
            `Su kimyası uygun mu?`,
            `Soot blowing uygulandı mı?`,
            `Boiler water test log güncel mi?`,
          ],
        },
      ],
    },
  ],
};

export default content;
