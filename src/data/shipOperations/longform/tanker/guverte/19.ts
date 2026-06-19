import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Çekici (tug) koordinasyonu ve limana yanaşma",
  shipType: "tanker",
  dept: "guverte",
  opIndex: 19,
  estimatedPages: 16,
  intro: `Limana yanaşma; pilot/Master bilgi alışverişi, tug kullanımı ve mooring sırasının doğru yönetimini gerektirir. Tanker manifold pozisyonunun rıhtım bağlantı noktasıyla hizalanması ayrıca önemlidir. Bu bölüm tug koordinasyonu ve güvenli yanaşmayı ele alır.`,
  sources: ["OCIMF MEG4", "Bridge Procedures Guide (ICS)"],
  chapters: [
    {
      heading: "1. Pilot/Master Exchange ve Plan",
      sections: [
        {
          subheading: "1.1 Manevra planı",
          paragraphs: [
            `Pilot geldiğinde Master ile manevra planı (tug sayısı, yaklaşma açısı, hız, mooring sırası, manifold hedefi) paylaşılır. Tug line'ları panama chock ve bitt üzerinden güvenli bağlanır.`,
          ],
          bullets: [
            `Tug sayısı ve bağlantı noktaları`,
            `Yaklaşma açısı ve hız profili`,
            `Manifold ↔ rıhtım hizalama`,
          ],
        },
      ],
    },
    {
      heading: "2. Mooring",
      sections: [
        {
          subheading: "2.1 Mooring sırası ve snap-back",
          paragraphs: [
            `Mooring head/breast/spring sırasıyla verilir. Halat gerginliği ve snap-back zone'lar MEG4'e göre yönetilir; personel snap-back bölgesinde durmaz.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Snap-back zone",
              text: `Kopan bir halat ölümcül snap-back yapar; mooring sırasında bu bölgelerde durmak yasaktır.`,
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
            `Pilot/Master exchange yapıldı mı?`,
            `Tug bağlantıları güvenli mi?`,
            `Mooring sırası planlandı mı?`,
            `Bell book + mooring plan kaydedildi mi?`,
          ],
        },
      ],
    },
  ],
};

export default content;
