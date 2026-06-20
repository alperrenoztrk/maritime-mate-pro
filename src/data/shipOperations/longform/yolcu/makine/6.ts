import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Jeneratör bakımı ve yük yönetimi (yüksek elektrik talebi)",
  shipType: "yolcu",
  dept: "makine",
  opIndex: 6,
  estimatedPages: 16,
  intro: `Cruise gemilerinde elektrik talebi (otel yükü + propulsion) çok yüksektir; genelde power station konsepti (birden çok DG) ile yönetilir. Senkronizasyon, load sharing ve black-out önleme kritiktir. Bu bölüm DG yönetimini ele alır.`,
  sources: ["SOLAS II-1 Reg. 41-43", "Engine maker manuals", "PMS/power management"],
  chapters: [
    {
      heading: "1. Yük Yönetimi",
      sections: [
        {
          subheading: "1.1 Power management",
          paragraphs: [
            `Otel + propulsion yüküne göre DG sayısı PMS ile ayarlanır; senkronizasyon ve dengeli load sharing sağlanır. Black-out recovery testi yapılır.`,
          ],
          bullets: [`Otel + propulsion yükü`, `PMS load sharing`, `Senkronizasyon`, `Black-out testi`],
        },
      ],
    },
    {
      heading: "2. Güvenlik ve Kontrol",
      sections: [
        {
          subheading: "2.1 Black-out riski",
          paragraphs: [`Cruise gemisinde black-out hem propulsion hem otel yükünü etkiler; redundancy ve hızlı recovery kritiktir.`],
          callouts: [
            { type: "warning", title: "Black-out", text: `Yolcu gemisinde black-out, manevra ve can güvenliği açısından ciddi olaydır; recovery düzenli test edilir.` },
          ],
        },
        {
          subheading: "2.2 Kontrol listesi",
          bullets: [`DG planı yüke uygun mu?`, `Senkronizasyon doğru mu?`, `Black-out testi yapıldı mı?`, `DG log güncel mi?`],
        },
      ],
    },
  ],
};

export default content;
