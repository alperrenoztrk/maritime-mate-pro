import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Notice to Mariners ve harita düzeltmeleri",
  shipType: "dokme",
  dept: "guverte",
  opIndex: 16,
  estimatedPages: 12,
  intro: `Haritaların güncelliği SOLAS V/27 gereği zorunludur; haftalık NtM ile ECDIS ve kâğıt haritalar tashih edilir. Bu bölüm harita tashih disiplinini ele alır.`,
  sources: ["SOLAS V/27", "Admiralty NtM / ENC updates"],
  chapters: [
    {
      heading: "1. Tashih",
      sections: [
        {
          subheading: "1.1 Kâğıt ve ENC",
          paragraphs: [
            `Kâğıt haritalar standart yöntemle tashih edilir; ECDIS'te ENC update uygulanır. T&P notices takip edilir, correction log tutulur.`,
          ],
          bullets: [`Haftalık NtM`, `ENC update`, `T&P notices`, `Correction log`],
        },
      ],
    },
    {
      heading: "2. Kontrol Listesi",
      sections: [
        {
          subheading: "2.1 Son kontrol",
          bullets: [`Son NtM uygulandı mı?`, `ENC güncel mi?`, `T&P işlendi mi?`, `Log güncel mi?`],
        },
      ],
    },
  ],
};

export default content;
