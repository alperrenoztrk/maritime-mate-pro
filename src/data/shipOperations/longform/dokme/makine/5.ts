import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Ballast pompası bakımı",
  shipType: "dokme",
  dept: "makine",
  opIndex: 5,
  estimatedPages: 14,
  intro: `Ballast pompaları, dökme yük yükleme/boşaltma hızına ayak uyduran ballast yönetiminin makine tarafıdır; seal/bearing ve kapasite bakımı kritiktir. Bu bölüm ballast pompası bakımını ele alır.`,
  sources: ["Pump maker manuals", "Class Rules"],
  chapters: [
    {
      heading: "1. Bakım",
      sections: [
        {
          subheading: "1.1 Seal/bearing/kapasite",
          paragraphs: [
            `Seal/bearing PMS'e göre yenilenir; kapasite testi ile performans doğrulanır. Yüksek deballast kapasitesi BLU sequence için gereklidir.`,
          ],
          bullets: [`Seal/bearing PMS`, `Kapasite testi`, `BLU kapasite uyumu`],
        },
      ],
    },
    {
      heading: "2. Kontrol Listesi",
      sections: [
        {
          subheading: "2.1 Son kontrol",
          bullets: [`Seal/bearing yapıldı mı?`, `Kapasite yeterli mi?`, `PMS kaydı tutuldu mu?`],
          paragraphs: [`Yetersiz ballast kapasitesi hızlı yüklemede SF/BM aşımına yol açabilir.`],
        },
      ],
    },
  ],
};

export default content;
