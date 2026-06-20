import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Güverte aydınlatma kontrolü",
  shipType: "ro-ro",
  dept: "guverte",
  opIndex: 17,
  estimatedPages: 10,
  intro: `Araç güvertesi ve rampa aydınlatması, güvenli araç elleçleme ve acil durumda tahliye için kritiktir; normal ve acil (emergency) aydınlatma test edilir. Bu bölüm aydınlatma kontrolünü ele alır.`,
  sources: ["SOLAS II-1 (emergency lighting)", "Company procedures"],
  chapters: [
    {
      heading: "1. Kontrol",
      sections: [
        {
          subheading: "1.1 Normal/acil aydınlatma",
          paragraphs: [
            `Güverte/rampa aydınlatması ve acil aydınlatma (emergency lighting, low-location lighting) test edilir; arızalı armatürler değiştirilir.`,
          ],
          bullets: [`Normal aydınlatma`, `Acil/low-location lighting`, `Arıza değişimi`],
        },
      ],
    },
    {
      heading: "2. Kontrol Listesi",
      sections: [
        {
          subheading: "2.1 Son kontrol",
          bullets: [`Aydınlatma yeterli mi?`, `Acil aydınlatma çalışıyor mu?`, `Arızalar giderildi mi?`, `Kayıt tutuldu mu?`],
        },
      ],
    },
  ],
};

export default content;
