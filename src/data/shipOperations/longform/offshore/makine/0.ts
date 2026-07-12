import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "DP güç tesisi ve yedek grupların hazırlanması",
  shipType: "offshore",
  dept: "makine",
  opIndex: 0,
  estimatedPages: 20,
  intro: `DP station-keeping'in temeli, güç tesisinin WCF sonrası bile yeterli itki gücü sağlayacak hata toleranslı gruplara ayrılmasıdır. Tek bir ortak açık valf veya crossover, kâğıt üzerinde ayrı görünen iki yedek grubu aynı arızaya maruz bırakabilir. Bu bölüm jeneratör, switchboard, bus-tie ve yardımcı sistemlerin DP öncesi hazırlanmasını ele alır.`,
  sources: [
    "IMCA M206 (Power System)",
    "IMCA M166",
    "IMCA M220",
    "Vessel CAMO",
  ],
  chapters: [
    {
      heading: "1. Yedek Grup Sınırları",
      sections: [
        {
          subheading: "1.1 FMEA ve tek hat şeması",
          bullets: [
            `FMEA, CAMO/TAM ve single-line diagramdan redundant group sınırlarını doğrula`,
            `Jeneratör ve thrusterları yedek gruplara dengeli dağıt`,
            `Beklenen WCF sonrası kalan kapasiteyi hesapla`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Ortak crossover",
              text: `Tek bir ortak açık valf veya crossover, iki yedek grubu aynı arızaya maruz bırakabilir; kâğıttaki generator sayısı yanlış breaker topolojisini telafi etmez.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. Line-up ve Yardımcılar",
      sections: [
        {
          subheading: "2.1 Koruma ve ortak noktalar",
          bullets: [
            `Bus-tie, breaker, protection, earthing ve blackout recovery konumlarını operasyon moduna göre kontrol et`,
            `Fuel, starting air, cooling, ventilation ve control power ortak noktalarını line-up et`,
            `ECR ile köprüüstü CAMO checklistini karşılıklı tamamla`,
          ],
        },
      ],
    },
    {
      heading: "3. Kontrol Listesi",
      sections: [
        {
          subheading: "3.1 Güç tesisi son kontrol",
          bullets: [
            `Redundant group sınırları FMEA ile doğrulandı mı?`,
            `DG/thruster dağılımı dengeli mi ve WCF kapasitesi yeterli mi?`,
            `Yardımcı sistem ortak noktaları line-up edildi mi?`,
            `CAMO verification ve ECR log tamam mı?`,
          ],
        },
      ],
    },
  ],
};

export default content;
