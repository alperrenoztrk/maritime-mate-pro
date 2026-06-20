import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Araç lashing kontrolü (zincirleme, shoring)",
  shipType: "ro-ro",
  dept: "guverte",
  opIndex: 1,
  estimatedPages: 18,
  intro: `Ro-Ro'da araçlar ve trailerlar, deniz koşullarında kaymayı önlemek için en az dört noktadan deck pad-eye'lara zincir/web ile bağlanır. Yetersiz lashing, ağır havada araç kayması, hasar ve stabilite kaybı yaratır. Bu bölüm araç lashing'ini ele alır.`,
  sources: ["CSS Code", "Cargo Securing Manual (Ro-Ro)", "IMO MSC.1/Circ.1355"],
  chapters: [
    {
      heading: "1. Lashing Uygulaması",
      sections: [
        {
          subheading: "1.1 Bağlama noktaları ve MSL",
          paragraphs: [
            `Araçlar CSM'deki pattern'e göre en az 4 noktadan bağlanır; zincir/web MSL'i araç ağırlığına ve deniz koşuluna göre seçilir. Tekerlek takozları (chocks) ve fren uygulanır.`,
          ],
          bullets: [`En az 4 nokta bağlama`, `MSL/açı uyumu`, `Tekerlek takozu + fren`, `CSM pattern`],
        },
      ],
    },
    {
      heading: "2. Güvenlik ve Kontrol",
      sections: [
        {
          subheading: "2.1 Hava ve gevşeme",
          paragraphs: [
            `Lashing gerginliği seyir sırasında kontrol edilir; gevşeyen bağlar yeniden sıkılır. Ağır hava beklentisinde ek lashing uygulanır.`,
          ],
          callouts: [
            { type: "warning", title: "Araç kayması", text: `Yetersiz lashing'de araç kayması zincirleme hasar ve liste yaratır; gerginlik düzenli kontrol edilir.` },
          ],
        },
        {
          subheading: "2.2 Kontrol listesi",
          bullets: [`Her araç ≥4 noktadan bağlı mı?`, `MSL/açı uygun mu?`, `Takoz/fren uygulandı mı?`, `Gerginlik kontrol ediliyor mu?`],
        },
      ],
    },
  ],
};

export default content;
