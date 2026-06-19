import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Pre-arrival / pre-departure NAVTEX, NOA ve checklist uygulaması",
  shipType: "konteyner",
  dept: "guverte",
  opIndex: 24,
  estimatedPages: 14,
  intro: `Liman öncesi/sonrası süreçler; NAVTEX takibi, Notice of Arrival (NOA) bildirimi ve pre-arrival/pre-departure checklist'lerin uygulanmasını kapsar. Eksik bildirim liman gecikmesine yol açar. Bu bölüm bu süreçleri ele alır.`,
  sources: ["SOLAS V", "Port/flag reporting requirements"],
  chapters: [
    {
      heading: "1. Bildirim ve Checklist",
      sections: [
        {
          subheading: "1.1 NOA ve hazırlık",
          paragraphs: [
            `NOA ve gerekli liman bildirimleri zamanında yapılır; pre-arrival checklist (ekipman testleri, ECDIS, steering test) uygulanır. NAVTEX seyir uyarıları takip edilir.`,
          ],
          bullets: [`NOA + liman bildirimleri`, `Pre-arrival/departure checklist`, `NAVTEX takibi`],
        },
      ],
    },
    {
      heading: "2. Kontrol Listesi",
      sections: [
        {
          subheading: "2.1 Son kontrol",
          bullets: [`NOA gönderildi mi?`, `Checklist'ler uygulandı mı?`, `NAVTEX okundu mu?`, `Kayıtlar tutuldu mu?`],
        },
      ],
    },
  ],
};

export default content;
