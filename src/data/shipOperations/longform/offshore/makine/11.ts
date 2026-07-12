import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "DP FMEA proving ve annual trials teknik yürütümü",
  shipType: "offshore",
  dept: "makine",
  opIndex: 11,
  estimatedPages: 20,
  intro: `Failure detection, alarm, isolation ve kalan sistem performansı, ancak kontrollü testlerle doğrulanır. Test için kurulan güvenlik önlemleri gerçek failure effect'i maskeleyebilir; bu durum raporda açıkça belirtilmelidir ve kritik operasyon sürerken failure injection yapılmaz. Bu bölüm proving/annual trials'ın teknik yürütümünü ele alır.`,
  sources: [
    "IMCA M166 Rev. 3",
    "IMCA M190",
    "IMO MSC.1/Circ.1580",
    "Class rules",
  ],
  chapters: [
    {
      heading: "1. Test Programı",
      sections: [
        {
          subheading: "1.1 Failure mode eşleştirme",
          bullets: [
            `Test programını FMEA failure mode, beklenen alarm/etki ve kabul kriteriyle eşleştir`,
            `Simülasyon veya canlı trip yöntemini risk değerlendirmesiyle seç; vessel safety barrier'ları kur`,
            `Generator, breaker, thruster, UPS, network ve auxiliary failure testlerinde gerçek ile bekleneni karşılaştır`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Maskelenen failure effect",
              text: `Test kontrol önlemleri gerçek failure effect'i maskeleyebilir; raporda açıkça belirtilmelidir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. Bulgu ve Kapanış",
      sections: [
        {
          subheading: "2.1 Limitation ve close-out",
          paragraphs: [
            `Beklenmeyen etki hemen limitation/defect olarak bildirilir ve CAMO/ASOG'a yansıtılır. Close-out sonrası tekrar testi kanıtlanır; çizim, software sürümü ve FMEA revizyonu güncellenir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Kritik operasyonda test yok",
              text: `Kritik operasyon sürerken failure injection yapılmaz.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. Kontrol Listesi",
      sections: [
        {
          subheading: "3.1 Trials son kontrol",
          bullets: [
            `Test programı FMEA ve kabul kriteriyle eşleşiyor mu?`,
            `Safety barrier'lar kuruldu ve maskeleme raporlandı mı?`,
            `Beklenmeyen etkiler limitation olarak CAMO/ASOG'a yansıdı mı?`,
            `Close-out kanıtı ve FMEA revizyonu tamam mı?`,
          ],
        },
      ],
    },
  ],
};

export default content;
