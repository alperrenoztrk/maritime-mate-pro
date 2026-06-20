import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "CDI inspeksiyon hazırlığı",
  shipType: "tanker",
  dept: "guverte",
  opIndex: 11,
  estimatedPages: 16,
  intro: `CDI (Chemical Distribution Institute) Marine inspeksiyonu, kimyasal tankerlerin kimya sektörü müşterileri için uygunluğunu değerlendirir. Hazırlık; CDI questionnaire, P&A Manual, tank coating direnç listesi ve kargo uyumluluk tablolarına dayanır. Bu bölüm CDI hazırlığını ele alır.`,
  sources: ["IBC Code", "CDI Marine Scheme", "P&A Manual", "MARPOL Annex II"],
  chapters: [
    {
      heading: "1. CDI Kapsamı",
      sections: [
        {
          subheading: "1.1 Kimyasal tanker odağı",
          paragraphs: [
            `CDI; kargo uyumluluğu, coating dayanımı, segregation ve kimyasal güvenlik prosedürlerine odaklanır. IBC Code ve gemiye özel P&A Manual referans dokümanlardır.`,
          ],
          bullets: [
            `Coating resistance list (tank kaplama dayanımı)`,
            `Kargo uyumluluk (compatibility) tabloları`,
            `Segregation ve önceki kargo kayıtları`,
          ],
        },
      ],
    },
    {
      heading: "2. Hazırlık",
      sections: [
        {
          subheading: "2.1 Dokümantasyon",
          paragraphs: [
            `CDI questionnaire güncel tutulur; P&A Manual, coating list ve compatibility tabloları erişilebilir olmalıdır. Önceki üç kargo ve tank temizlik kayıtları kontrol edilir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Coating uyumsuzluğu",
              text: `Kargo ile tank kaplamasının uyumsuzluğu hem kargo kontaminasyonu hem coating hasarı yaratır; coating list mutlaka kontrol edilir.`,
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
            `CDI questionnaire güncel mi?`,
            `P&A Manual + coating list hazır mı?`,
            `Compatibility tabloları erişilebilir mi?`,
            `Önceki kargo + tank temizlik kayıtları tam mı?`,
          ],
        },
      ],
    },
  ],
};

export default content;
