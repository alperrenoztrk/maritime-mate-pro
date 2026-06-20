import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Liman devleti denetimi (PSC) hazırlığı",
  shipType: "yolcu",
  dept: "guverte",
  opIndex: 24,
  estimatedPages: 16,
  intro: `Yolcu gemilerinde PSC denetimleri özellikle LSA, fire safety, evacuation ve sanitation odaklı ve sıkıdır; deficiency/detention ticari ve itibar kaybı yaratır. Bu bölüm PSC hazırlığını ele alır.`,
  sources: ["Paris/Tokyo MoU", "SOLAS/MARPOL/MLC", "ISM Code"],
  chapters: [
    {
      heading: "1. Hazırlık",
      sections: [
        {
          subheading: "1.1 Odak alanları",
          paragraphs: [
            `Sertifikalar geçerli; LSA/FFA, evacuation düzeni, sanitation ve önceki bulgular kontrol edilir. Yolcu gemisi denetimleri kapsamlıdır.`,
          ],
          bullets: [`Sertifika geçerliliği`, `LSA/FFA/evacuation`, `Sanitation`, `Önceki bulgu kapatma`],
        },
      ],
    },
    {
      heading: "2. Kontrol Listesi",
      sections: [
        {
          subheading: "2.1 Son kontrol",
          bullets: [`Sertifikalar geçerli mi?`, `LSA/FFA uygun mu?`, `Evacuation düzeni hazır mı?`, `Bulgular kapandı mı?`],
        },
      ],
    },
  ],
};

export default content;
