import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "DP teknik PMS ve kondisyon trendi",
  shipType: "offshore",
  dept: "makine",
  opIndex: 13,
  estimatedPages: 18,
  intro: `Kritik DP bileşenlerinin talep anında çalışmasını sağlamak için bakım planı (PMS), failure mode ve kondisyon verisiyle yönetilmelidir. Standby ekipman düzenli test edilmezse gizli arıza yalnızca WCF sonrasında ortaya çıkar; aynı redundant gruplarda eşzamanlı bakım DP sınıfını düşürür. Bu bölüm DP odaklı PMS ve kondisyon izlemeyi ele alır.`,
  sources: [
    "ISM Code",
    "IMCA M109",
    "IMCA M247",
    "Maker maintenance manuals",
  ],
  chapters: [
    {
      heading: "1. Kritik Ekipman ve Bakım",
      sections: [
        {
          subheading: "1.1 CEL ve aralıklar",
          bullets: [
            `FMEA ile critical equipment list'i (CEL) PMS görevleri ve yedek parça listesiyle eşleştir`,
            `Generator, thruster, breaker, UPS battery, cooling pump, network ve sensör bakım/test aralıklarını takip et`,
            `Vibration, oil analysis, insulation, thermography, battery capacity ve alarm geçmişini trendle`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Test edilmeyen standby",
              text: `Standby ekipman düzenli test edilmezse gizli arıza yalnızca WCF sonrasında ortaya çıkar.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. Yedeklilik ve Geri Dönüş",
      sections: [
        {
          subheading: "2.1 Eşzamanlı bakım riski",
          paragraphs: [
            `Tekrarlayan defect ve overdue maintenance'in redundancy/ASOG etkisi Master ve DPO'ya bildirilir. Bakım sonrası return-to-service testi ve independent verification tamamlanır.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Aynı grupta eşzamanlı bakım",
              text: `Aynı redundant gruplarda eşzamanlı bakım DP sınıfını düşürebilir; iş planlaması buna göre yapılır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. Kontrol Listesi",
      sections: [
        {
          subheading: "3.1 PMS son kontrol",
          bullets: [
            `CEL, PMS görevleri ve yedek parçayla eşleşiyor mu?`,
            `Standby ekipman test aralıkları güncel mi?`,
            `Kondisyon trendleri (vibration/oil/battery) izleniyor mu?`,
            `Return-to-service ve independent verification tamam mı?`,
          ],
        },
      ],
    },
  ],
};

export default content;
