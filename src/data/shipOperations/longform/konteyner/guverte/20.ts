import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "AIS transponder, GMDSS (EPIRB, SART, VHF, MF/HF) test ve kontrol",
  shipType: "konteyner",
  dept: "guverte",
  opIndex: 20,
  estimatedPages: 16,
  intro: `GMDSS ekipmanı (EPIRB, SART, VHF/MF/HF DSC) ve AIS, can güvenliği ve seyir emniyetinin haberleşme omurgasıdır; periyodik testler ve doğru kayıt zorunludur. Bu bölüm GMDSS/AIS testlerini ele alır.`,
  sources: ["SOLAS IV (Radiocommunications)", "GMDSS test schedule"],
  chapters: [
    {
      heading: "1. Testler",
      sections: [
        {
          subheading: "1.1 Periyodik test",
          paragraphs: [
            `VHF/MF/HF DSC günlük/haftalık test edilir; EPIRB ve SART periyodik kontrol edilir (EPIRB batarya/HRU son kullanma izlenir). AIS statik/dinamik veri doğruluğu kontrol edilir.`,
          ],
          bullets: [`DSC test (günlük/haftalık)`, `EPIRB batarya/HRU tarihi`, `SART kontrol`, `AIS veri doğruluğu`],
        },
      ],
    },
    {
      heading: "2. Kontrol Listesi",
      sections: [
        {
          subheading: "2.1 Son kontrol",
          bullets: [`DSC testleri yapıldı mı?`, `EPIRB/SART geçerli mi?`, `AIS verisi doğru mu?`, `Radio log tutuldu mu?`],
          paragraphs: [`Yanlış AIS verisi (örn. yanlış draft/destination) hem seyir hem hukuki sorun yaratır.`],
        },
      ],
    },
  ],
};

export default content;
