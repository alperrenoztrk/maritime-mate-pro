import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Notices to Mariners (NtM) ile ECDIS/kağıt harita tashihleri",
  shipType: "konteyner",
  dept: "guverte",
  opIndex: 19,
  estimatedPages: 14,
  intro: `Haritaların güncelliği SOLAS V/27 gereği zorunludur; haftalık NtM ile ECDIS ve kâğıt haritalar tashih edilir. Güncel olmayan harita PSC detention sebebidir. Bu bölüm harita tashih disiplinini ele alır.`,
  sources: ["SOLAS V/27", "Admiralty NtM / ENC updates"],
  chapters: [
    {
      heading: "1. Tashih Süreci",
      sections: [
        {
          subheading: "1.1 Kâğıt ve ENC",
          paragraphs: [
            `Kâğıt haritalar standart yöntemle tashih edilir; ECDIS'te ENC update uygulanır. T&P notices takip edilir ve chart correction log tutulur.`,
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
          bullets: [`Son NtM uygulandı mı?`, `ENC güncel mi?`, `T&P işlendi mi?`, `Correction log güncel mi?`],
          paragraphs: [`Chart correction log, güncelliğin kanıtıdır ve PSC tarafından sorulabilir.`],
        },
      ],
    },
  ],
};

export default content;
