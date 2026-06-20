import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Passage plan oluşturma ve ECDIS güncelleme",
  shipType: "yolcu",
  dept: "guverte",
  opIndex: 7,
  estimatedPages: 16,
  intro: `Yolcu/cruise gemilerinde passage plan; berth-to-berth, tender anchorage pencereleri ve sahil yakını seyir (scenic cruising) güvenliğini içerir. Costa Concordia, plandan sapmanın sonuçlarını göstermiştir. Bu bölüm passage plan hazırlığını ele alır.`,
  sources: ["SOLAS V/34", "IMO Res. A.893(21)", "SOLAS V/27"],
  chapters: [
    {
      heading: "1. Plan",
      sections: [
        {
          subheading: "1.1 ENC ve sapma disiplini",
          paragraphs: [
            `ENC güncellenir; safety parametreleri ayarlanır. Onaylı plandan sapma (örn. sahile yakın gösteri seyri) ancak risk değerlendirmesi ve Master onayıyla yapılır.`,
          ],
          bullets: [`ENC update`, `Tender anchorage pencereleri`, `Plandan sapma disiplini`, `UKC/safety contour`],
        },
      ],
    },
    {
      heading: "2. Güvenlik ve Kontrol",
      sections: [
        {
          subheading: "2.1 Plana sadakat",
          paragraphs: [
            `Costa Concordia, onaylı rotadan plansız sapmanın felakete yol açabileceğini gösterdi; sapmalar kontrollü ve belgeli olmalıdır.`,
          ],
          callouts: [
            { type: "example", title: "Costa Concordia (2012)", text: `Onaylı rotadan plansız sahil yakını sapma karaya oturma ve 32 ölümle sonuçlandı.` },
          ],
        },
        {
          subheading: "2.2 Kontrol listesi",
          bullets: [`ENC güncel mi?`, `Check route koşuldu mu?`, `Sapma onaylı mı?`, `Master onaylı mı?`],
        },
      ],
    },
  ],
};

export default content;
