import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Bilge high-level alarm testi ve 15 ppm OWS alarm kalibrasyonu",
  shipType: "konteyner",
  dept: "makine",
  opIndex: 10,
  estimatedPages: 12,
  intro: `Bilge high-level alarmları su basmasını erken haber verir; 15 ppm OWS alarmı ise MARPOL uyumunun teknik garantisidir. Her ikisinin testi/kalibrasyonu kritiktir. Bu bölüm bu testleri ele alır.`,
  sources: ["MARPOL Annex I", "SOLAS II-1 (bilge alarms)"],
  chapters: [
    {
      heading: "1. Testler",
      sections: [
        {
          subheading: "1.1 Bilge ve OCM",
          paragraphs: [
            `Bilge high-level alarmları periyodik fonksiyon testine tabidir; OCM 15 ppm alarmı kalibre edilir ve 3-way valve tepkisi doğrulanır.`,
          ],
          bullets: [`Bilge alarm fonksiyon testi`, `OCM 15 ppm kalibrasyon`, `3-way valve tepkisi`],
        },
      ],
    },
    {
      heading: "2. Kontrol Listesi",
      sections: [
        {
          subheading: "2.1 Son kontrol",
          bullets: [`Bilge alarmları çalışıyor mu?`, `OCM kalibre mi?`, `3-way valve doğru mu?`, `Test kaydı tutuldu mu?`],
          paragraphs: [`Çalışmayan 15 ppm alarmı hem MARPOL ihlali hem denetim bulgusudur.`],
        },
      ],
    },
  ],
};

export default content;
