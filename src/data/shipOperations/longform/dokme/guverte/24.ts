import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Yük miktarı hesabı (ullage/trim correction)",
  shipType: "dokme",
  dept: "guverte",
  opIndex: 24,
  estimatedPages: 14,
  intro: `Bulk yük miktarı esasen draft survey ile bulunsa da, ilgili tanklar/ölçümler için trim ve düzeltmeler titizlikle uygulanır; ship figure ile shore figure farkı belgelenir. Bu bölüm miktar hesabını ele alır.`,
  sources: ["UN ECE Draft Survey Code", "Hydrostatic tables"],
  chapters: [
    {
      heading: "1. Hesap",
      sections: [
        {
          subheading: "1.1 Trim/density düzeltme",
          paragraphs: [
            `Ölçümler trim ve density ile düzeltilir; draft survey net yükü hesaplanır. Ship vs shore figure karşılaştırılır, fark toleransı aşarsa LoP düzenlenir.`,
          ],
          bullets: [`Trim/density düzeltme`, `Ship vs shore figure`, `Tolerans → LoP`],
        },
      ],
    },
    {
      heading: "2. Kontrol Listesi",
      sections: [
        {
          subheading: "2.1 Son kontrol",
          bullets: [`Düzeltmeler yapıldı mı?`, `Ship/shore karşılaştırıldı mı?`, `Gerekirse LoP düzenlendi mi?`, `Belgeler saklandı mı?`],
        },
      ],
    },
  ],
};

export default content;
