import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "PSC hazırlığı ve ISM denetimi",
  shipType: "ro-ro",
  dept: "guverte",
  opIndex: 14,
  estimatedPages: 16,
  intro: `Ro-Ro/yolcu segmentinde PSC ve ISM denetimleri özellikle sıkıdır; rampa/kapı, LSA ve tahliye düzeni öne çıkar. Bu bölüm PSC/ISM hazırlığını ele alır.`,
  sources: ["Paris/Tokyo MoU", "ISM Code", "SOLAS"],
  chapters: [
    {
      heading: "1. Hazırlık",
      sections: [
        {
          subheading: "1.1 Sertifika ve odak alanları",
          paragraphs: [
            `Sertifikalar geçerli; rampa/kapı sızdırmazlığı, LSA/FFA ve tahliye düzeni kontrol edilir. Önceki bulgular kapatılır.`,
          ],
          bullets: [`Sertifika geçerliliği`, `Rampa/kapı/LSA`, `Önceki bulgu kapatma`, `İç denetim/CAPA`],
        },
      ],
    },
    {
      heading: "2. Kontrol Listesi",
      sections: [
        {
          subheading: "2.1 Son kontrol",
          bullets: [`Sertifikalar geçerli mi?`, `Rampa/kapı/LSA uygun mu?`, `Bulgular kapandı mı?`, `Kayıtlar düzenli mi?`],
        },
      ],
    },
  ],
};

export default content;
