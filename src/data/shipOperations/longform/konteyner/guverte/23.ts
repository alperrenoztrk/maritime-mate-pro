import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Cargo damage tespiti, letter of protest ve belgeleme",
  shipType: "konteyner",
  dept: "guverte",
  opIndex: 23,
  estimatedPages: 14,
  intro: `Yükleme/boşaltmada konteyner hasarı, yanlış elleçleme veya önceden var olan hasar tespit edilirse fotoğraf, kayıt ve Letter of Protest (LoP) ile belgelenir; bu, sonradan cargo claim'lere karşı savunmanın temelidir. Bu bölüm hasar belgelemeyi ele alır.`,
  sources: ["Hague-Visby Rules", "P&I club guidance"],
  chapters: [
    {
      heading: "1. Tespit ve Belgeleme",
      sections: [
        {
          subheading: "1.1 Kanıt toplama",
          paragraphs: [
            `Hasar fotoğraflanır, konum/zaman kaydedilir ve ilgili tarafa LoP düzenlenir. Mate's receipt/clausing ile kondisyon belgelenir.`,
          ],
          bullets: [`Fotoğraf + zaman/konum`, `Letter of Protest`, `Mate's receipt clausing`],
        },
      ],
    },
    {
      heading: "2. Kontrol Listesi",
      sections: [
        {
          subheading: "2.1 Son kontrol",
          bullets: [`Hasar fotoğraflandı mı?`, `LoP düzenlendi mi?`, `Clausing yapıldı mı?`, `P&I bilgilendirildi mi?`],
          paragraphs: [`Belgelenmeyen hasar, sonradan gemiye yüklenecek claim'lere karşı savunmasız bırakır.`],
        },
      ],
    },
  ],
};

export default content;
