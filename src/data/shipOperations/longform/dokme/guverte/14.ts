import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "PSC hazırlığı ve ISM/SMS denetimi",
  shipType: "dokme",
  dept: "guverte",
  opIndex: 14,
  estimatedPages: 16,
  intro: `Port State Control ve ISM iç denetimleri, geminin sözleşmelere uyumunu ve SMS'in canlılığını güvence altına alır; deficiency/detention önlenir. Bu bölüm PSC/ISM hazırlığını ele alır.`,
  sources: ["Paris/Tokyo MoU", "ISM Code", "SOLAS/MARPOL/MLC"],
  chapters: [
    {
      heading: "1. Hazırlık",
      sections: [
        {
          subheading: "1.1 Sertifika ve bulgular",
          paragraphs: [
            `Sertifikalar geçerli; LSA/FFA ve seyir ekipmanı çalışır olmalı. Önceki PSC/iç denetim bulguları kapatılıp kanıtlanır. Bulk-specific alanlar (hatch cover, hold) öne çıkar.`,
          ],
          bullets: [`Sertifika geçerliliği`, `Önceki bulgu kapatma`, `Hatch/hold kondisyonu`, `İç denetim/CAPA`],
        },
      ],
    },
    {
      heading: "2. Kontrol Listesi",
      sections: [
        {
          subheading: "2.1 Son kontrol",
          bullets: [`Sertifikalar geçerli mi?`, `Bulgular kapandı mı?`, `Hatch/hold uygun mu?`, `Kayıtlar düzenli mi?`],
          paragraphs: [`Detention gemiyi durdurur; hazırlık titiz ve kanıt-temelli olmalıdır.`],
        },
      ],
    },
  ],
};

export default content;
