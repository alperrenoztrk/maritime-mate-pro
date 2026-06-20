import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "GMDSS kontrol ve test",
  shipType: "yolcu",
  dept: "guverte",
  opIndex: 19,
  estimatedPages: 14,
  intro: `GMDSS (EPIRB, SART, VHF/MF/HF DSC) yolcu gemilerinde geniş kapsamlıdır; periyodik test ve doğru kayıt zorunludur. Bu bölüm GMDSS testlerini ele alır.`,
  sources: ["SOLAS IV", "GMDSS test schedule"],
  chapters: [
    {
      heading: "1. Test",
      sections: [
        {
          subheading: "1.1 Periyodik test",
          paragraphs: [`DSC günlük/haftalık test edilir; EPIRB/SART periyodik kontrol edilir. Batarya/HRU tarihleri izlenir.`],
          bullets: [`DSC test (günlük/haftalık)`, `EPIRB/SART kontrol`, `Batarya/HRU tarihleri`],
        },
      ],
    },
    {
      heading: "2. Kontrol Listesi",
      sections: [
        {
          subheading: "2.1 Son kontrol",
          bullets: [`DSC test edildi mi?`, `EPIRB/SART geçerli mi?`, `Radio log tutuldu mu?`],
        },
      ],
    },
  ],
};

export default content;
