import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Güvenlik (security) tarama ve ISPS uyumu",
  shipType: "yolcu",
  dept: "guverte",
  opIndex: 15,
  estimatedPages: 16,
  intro: `Yolcu gemilerinde ISPS Code kapsamında boarding güvenliği; bagaj X-ray, access control ve güvenlik seviyesi (MARSEC) uygulamaları yürütülür. SSO (Ship Security Officer) süreci yönetir. Bu bölüm güvenlik taramasını ele alır.`,
  sources: ["ISPS Code", "SOLAS XI-2", "Ship Security Plan (SSP)"],
  chapters: [
    {
      heading: "1. Güvenlik Uygulaması",
      sections: [
        {
          subheading: "1.1 Tarama ve access control",
          paragraphs: [
            `Yolcu/bagaj X-ray ve metal detektör ile taranır; access control noktaları ile yetkisiz giriş engellenir. Güvenlik seviyesine göre önlemler artırılır.`,
          ],
          bullets: [`Bagaj X-ray + metal detektör`, `Access control`, `Güvenlik seviyesi (MARSEC)`, `SSP uygulaması`],
        },
      ],
    },
    {
      heading: "2. Kontrol Listesi",
      sections: [
        {
          subheading: "2.1 Son kontrol",
          bullets: [`Tarama yapıldı mı?`, `Access control aktif mi?`, `Güvenlik seviyesi uygun mu?`, `Security records tutuldu mu?`],
        },
      ],
    },
  ],
};

export default content;
