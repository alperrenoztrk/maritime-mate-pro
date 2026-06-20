import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Yük hasarı (wetting/contamination) tespiti",
  shipType: "dokme",
  dept: "guverte",
  opIndex: 15,
  estimatedPages: 14,
  intro: `Bulk yükte ıslanma (wetting), kontaminasyon veya önceden var olan hasar tespit edilirse fotoğraf, kayıt ve Letter of Protest ile belgelenir; bu cargo claim savunmasının temelidir. Bu bölüm hasar tespitini ele alır.`,
  sources: ["Hague-Visby Rules", "P&I club guidance"],
  chapters: [
    {
      heading: "1. Tespit ve Belgeleme",
      sections: [
        {
          subheading: "1.1 Kanıt",
          paragraphs: [
            `Hasar fotoğraflanır, konum/zaman kaydedilir ve LoP düzenlenir. Mate's receipt clausing ile kondisyon belgelenir; ıslanma kaynağı (yağmur, hatch sızıntısı, terleme) ayırt edilir.`,
          ],
          bullets: [`Foto + zaman/konum`, `Letter of Protest`, `Clausing`, `Hasar kaynağı analizi`],
        },
      ],
    },
    {
      heading: "2. Kontrol Listesi",
      sections: [
        {
          subheading: "2.1 Son kontrol",
          bullets: [`Hasar belgelendi mi?`, `LoP düzenlendi mi?`, `Kaynak belirlendi mi?`, `P&I bilgilendirildi mi?`],
          paragraphs: [`Cargo sweat/ship sweat kaynaklı ıslanmada ventilasyon kayıtları savunmada önemlidir.`],
        },
      ],
    },
  ],
};

export default content;
