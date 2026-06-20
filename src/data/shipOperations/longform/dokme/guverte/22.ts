import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "AIS ve GMDSS kontrol",
  shipType: "dokme",
  dept: "guverte",
  opIndex: 22,
  estimatedPages: 14,
  intro: `GMDSS (EPIRB, SART, VHF/MF/HF DSC) ve AIS, can güvenliği ve seyir emniyetinin haberleşme omurgasıdır; periyodik test ve doğru kayıt zorunludur. Bu bölüm GMDSS/AIS kontrolünü ele alır.`,
  sources: ["SOLAS IV", "GMDSS test schedule"],
  chapters: [
    {
      heading: "1. Test",
      sections: [
        {
          subheading: "1.1 Periyodik test",
          paragraphs: [
            `DSC günlük/haftalık test edilir; EPIRB/SART periyodik kontrol edilir (batarya/HRU tarihleri). AIS statik/dinamik veri doğruluğu kontrol edilir.`,
          ],
          bullets: [`DSC test`, `EPIRB/SART kontrol`, `AIS veri doğruluğu`],
        },
      ],
    },
    {
      heading: "2. Kontrol Listesi",
      sections: [
        {
          subheading: "2.1 Son kontrol",
          bullets: [`DSC test edildi mi?`, `EPIRB/SART geçerli mi?`, `AIS verisi doğru mu?`, `Radio log tutuldu mu?`],
        },
      ],
    },
  ],
};

export default content;
