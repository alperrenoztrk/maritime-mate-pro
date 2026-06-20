import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Yüzme havuzu ve su parkı sistemleri bakımı",
  shipType: "yolcu",
  dept: "makine",
  opIndex: 21,
  estimatedPages: 14,
  intro: `Cruise gemilerinde yüzme havuzları ve su parkları; filtrasyon, dezenfeksiyon (klor) ve su kalitesi yönetimiyle halk sağlığını korur. Yetersiz dezenfeksiyon salgın riski yaratır. Bu bölüm havuz sistemleri bakımını ele alır.`,
  sources: ["WHO recreational water guidance", "USPH/VSP standards", "Maker manuals"],
  chapters: [
    {
      heading: "1. Bakım",
      sections: [
        {
          subheading: "1.1 Filtrasyon/dezenfeksiyon",
          paragraphs: [
            `Havuz suyu filtre edilir ve klor/pH sürekli izlenir; sirkülasyon ve su değişimi sağlanır. Su parkı/jakuzilerde Legionella ve mikrobiyolojik kontrol kritiktir.`,
          ],
          bullets: [`Filtrasyon/sirkülasyon`, `Klor/pH izleme`, `Mikrobiyolojik kontrol`],
        },
      ],
    },
    {
      heading: "2. Güvenlik ve Kontrol",
      sections: [
        {
          subheading: "2.1 Halk sağlığı",
          paragraphs: [`Yetersiz dezenfeksiyon gastrointestinal salgın ve Legionella riski yaratır; su kalitesi sürekli izlenir.`],
          callouts: [
            { type: "warning", title: "Su kalitesi", text: `Havuz/jakuzi su kalitesi salgın riskini doğrudan etkiler; izleme aksatılmaz.` },
          ],
        },
        {
          subheading: "2.2 Kontrol listesi",
          bullets: [`Filtrasyon çalışıyor mu?`, `Klor/pH uygun mu?`, `Mikrobiyolojik test yapıldı mı?`, `Kayıt tutuldu mu?`],
        },
      ],
    },
  ],
};

export default content;
