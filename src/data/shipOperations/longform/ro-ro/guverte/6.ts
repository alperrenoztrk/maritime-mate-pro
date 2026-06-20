import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Passage plan oluşturma ve ECDIS güncelleme",
  shipType: "ro-ro",
  dept: "guverte",
  opIndex: 6,
  estimatedPages: 16,
  intro: `Ro-Ro/feribotlar genelde sıkı tarifeli kısa seferlerde çalışır; berth-to-berth passage plan, dar sular ve yoğun trafik yönetimini içerir. Bu bölüm passage plan hazırlığını ele alır.`,
  sources: ["SOLAS V/34", "IMO Res. A.893(21)", "SOLAS V/27"],
  chapters: [
    {
      heading: "1. Plan",
      sections: [
        {
          subheading: "1.1 ENC ve trafik",
          paragraphs: [
            `ENC güncellenir; safety parametreleri drafta göre ayarlanır. Sıkı tarifeli rotalarda yoğun trafik ve dar geçişler için contingency tanımlanır.`,
          ],
          bullets: [`ENC update`, `Safety parametreleri`, `Yoğun trafik/dar su`, `Contingency`],
        },
      ],
    },
    {
      heading: "2. Kontrol Listesi",
      sections: [
        {
          subheading: "2.1 Son kontrol",
          bullets: [`ENC güncel mi?`, `Check route koşuldu mu?`, `Contingency var mı?`, `Master onaylı mı?`],
        },
      ],
    },
  ],
};

export default content;
