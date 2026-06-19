import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Main engine standby hazırlığı — slow-down, manoeuvring mode geçişi",
  shipType: "konteyner",
  dept: "makine",
  opIndex: 0,
  estimatedPages: 16,
  intro: `Ana makine standby hazırlığı; seyirden manevra moduna geçişte ısıtma, yakıt geçişi, devir sınırları ve emniyet kontrollerini içerir. Hatalı standby manevrada güç kaybına yol açar. Bu bölüm ME standby hazırlığını ele alır.`,
  sources: ["Engine maker manuals", "Bridge-engine room communication procedures"],
  chapters: [
    {
      heading: "1. Standby Geçişi",
      sections: [
        {
          subheading: "1.1 Manoeuvring mode",
          paragraphs: [
            `Standby öncesi makine ısıtılır, yakıt (gerekirse MGO'ya) geçirilir, hava şişeleri dolu, devir sınırları ayarlanır. Telegraph testi ve bridge-ER haberleşmesi doğrulanır.`,
          ],
          bullets: [`Isıtma + yakıt geçişi`, `Hava şişeleri dolu`, `Telegraph testi`, `Devir/barred speed range`],
        },
      ],
    },
    {
      heading: "2. Güvenlik ve Kontrol",
      sections: [
        {
          subheading: "2.1 Manevra disiplini",
          paragraphs: [
            `Manevra boyunca emirler tekrar edilerek (repeat-back) uygulanır; bell book tutulur. Barred speed range'de sürekli çalışmaktan kaçınılır.`,
          ],
          callouts: [
            { type: "warning", title: "Barred speed range", text: `Yasaklı devir aralığında sürekli çalışmak titreşim/şaft hasarı yapar; hızlı geçilir.` },
          ],
        },
        {
          subheading: "2.2 Kontrol listesi",
          bullets: [`Isıtma/yakıt geçişi yapıldı mı?`, `Telegraph test edildi mi?`, `Hava basıncı yeterli mi?`, `Bell book tutuldu mu?`],
        },
      ],
    },
  ],
};

export default content;
