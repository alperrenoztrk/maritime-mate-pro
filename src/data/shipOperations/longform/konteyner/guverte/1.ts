import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Berth-to-berth passage planı hazırlama (SOLAS V/34 uyumlu)",
  shipType: "konteyner",
  dept: "guverte",
  opIndex: 1,
  estimatedPages: 18,
  intro: `Passage plan, SOLAS V/34 gereği rıhtımdan rıhtıma (berth-to-berth) hazırlanır ve appraisal-planning-execution-monitoring döngüsünü izler. Konteyner gemilerinde liner servis sıkı zaman çizelgesi ile UKC ve hava optimizasyonu dengelenir. Bu bölüm plan hazırlığını ele alır.`,
  sources: ["SOLAS V/34", "IMO Res. A.893(21)", "Bridge Procedures Guide (ICS)"],
  chapters: [
    {
      heading: "1. Appraisal",
      sections: [
        {
          subheading: "1.1 Bilgi toplama",
          paragraphs: [
            `Mevcut haritalar, sailing directions, tide/akıntı, hava ve liman bilgileri toplanır; alternatif rotalar ve riskli geçişler (TSS, dar kanallar) belirlenir.`,
          ],
          bullets: [`Harita/yayın güncelliği`, `Tide/akıntı/UKC`, `TSS, dar kanal, no-go area`],
        },
      ],
    },
    {
      heading: "2. Planning ve Monitoring",
      sections: [
        {
          subheading: "2.1 Plan ve izleme",
          paragraphs: [
            `Waypoint, course, hız ve wheel-over noktaları tanımlanır; abort/contingency noktaları işaretlenir. Seyirde XTD ve UKC sürekli izlenir.`,
          ],
          callouts: [
            { type: "tip", title: "Contingency", text: `Plan, abort noktaları ve acil sığınma (port of refuge) seçeneklerini içermelidir.` },
          ],
        },
        {
          subheading: "2.2 Kontrol listesi",
          bullets: [`Berth-to-berth kapsanıyor mu?`, `Abort/contingency var mı?`, `Master onaylı mı?`, `ECDIS + kâğıt tutarlı mı?`],
        },
      ],
    },
  ],
};

export default content;
