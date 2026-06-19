import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Pre-arrival ve pre-departure checklist",
  shipType: "dokme",
  dept: "guverte",
  opIndex: 23,
  estimatedPages: 12,
  intro: `Liman öncesi/sonrası checklist'ler; ekipman testleri, bildirimler ve hazırlık adımlarını standartlaştırır. Eksik adım gecikme ve emniyet riski yaratır. Bu bölüm checklist uygulamasını ele alır.`,
  sources: ["SOLAS V", "Company procedures"],
  chapters: [
    {
      heading: "1. Checklist",
      sections: [
        {
          subheading: "1.1 Hazırlık",
          paragraphs: [
            `Pre-arrival/departure checklist (steering test, ECDIS, ekipman, bildirimler) uygulanır; NAVTEX ve liman bildirimleri takip edilir.`,
          ],
          bullets: [`Ekipman/steering test`, `Bildirimler (NOA vb.)`, `NAVTEX`],
        },
      ],
    },
    {
      heading: "2. Kontrol Listesi",
      sections: [
        {
          subheading: "2.1 Son kontrol",
          bullets: [`Checklist'ler uygulandı mı?`, `Bildirimler yapıldı mı?`, `NAVTEX okundu mu?`, `Kayıt tutuldu mu?`],
        },
      ],
    },
  ],
};

export default content;
