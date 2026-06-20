import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Kargo pompası bakımı ve kapasite testi",
  shipType: "tanker",
  dept: "makine",
  opIndex: 0,
  estimatedPages: 18,
  intro: `Kargo pompaları (centrifugal/screw), tankerin boşaltma performansının kalbidir. Seal, bearing ve impeller bakımı PMS'e göre yapılır; kapasite testi gerçek boşaltma rate'iyle doğrulanır. Kavitasyon en yıkıcı arıza modudur. Bu bölüm pompa bakımını ele alır.`,
  sources: ["Class Rules", "Pump maker manuals", "ISGOTT"],
  chapters: [
    {
      heading: "1. Bakım",
      sections: [
        {
          subheading: "1.1 Seal/bearing/impeller",
          paragraphs: [
            `Mechanical seal ve bearing PMS aralıklarında değiştirilir; impeller aşınma/erozyon açısından denetlenir. Vibration analysis erken arıza tespitinde kullanılır.`,
          ],
          bullets: [
            `Mechanical seal + bearing PMS değişimi`,
            `Impeller aşınma kontrolü`,
            `Vibration analysis`,
          ],
        },
      ],
    },
    {
      heading: "2. Kapasite Testi ve Kavitasyon",
      sections: [
        {
          subheading: "2.1 Performans doğrulama",
          paragraphs: [
            `Kapasite testi, discharge sırasında rate ölçümüyle yapılır; düşen performans seal/impeller aşınmasına işaret eder. Düşük seviyede yüksek rate kavitasyon yapar.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Kavitasyon",
              text: `Kavitasyon impeller/bearing tahribatı yapar; emiş şartları ve rate yönetilir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. Kontrol Listesi",
      sections: [
        {
          subheading: "3.1 Son kontrol",
          bullets: [
            `Seal/bearing PMS'e göre yapıldı mı?`,
            `Impeller denetlendi mi?`,
            `Kapasite testi geçti mi?`,
            `Pump overhaul report dolduruldu mu?`,
          ],
        },
      ],
    },
  ],
};

export default content;
