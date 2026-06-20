import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Hatch kapağı hidrolik sistemi bakımı ve testi",
  shipType: "dokme",
  dept: "makine",
  opIndex: 7,
  estimatedPages: 14,
  intro: `Hatch cover hidrolik sistemi; silindir, pompa, hortum ve valflerin bakımıyla güvenli ve sızdırmaz çalışır. Hidrolik arızası yük operasyonunu durdurur ve sızdırmazlığı bozar. Bu bölüm hatch hidroliğini ele alır.`,
  sources: ["Hatch cover maker manuals", "Class Rules"],
  chapters: [
    {
      heading: "1. Bakım",
      sections: [
        {
          subheading: "1.1 Silindir/hortum/valf",
          paragraphs: [
            `Silindirler ve hortumlar sızıntı açısından denetlenir; hidrolik yağ temizliği ve basınç testi yapılır. Compression bar/conta ile birlikte çalışması doğrulanır.`,
          ],
          bullets: [`Silindir/hortum sızıntı`, `Hidrolik yağ temizliği`, `Basınç testi`],
        },
      ],
    },
    {
      heading: "2. Güvenlik ve Kontrol",
      sections: [
        {
          subheading: "2.1 Hidrolik enjeksiyon",
          paragraphs: [`Basınçlı hidrolik kaçağı yaralanma yapar; bakımda basınç boşaltılır.`],
          callouts: [
            { type: "warning", title: "Hidrolik enjeksiyon", text: `Basınçlı jet ciddi yaralanma yapar; basınç boşaltılmadan müdahale edilmez.` },
          ],
        },
        {
          subheading: "2.2 Kontrol listesi",
          bullets: [`Sızıntı var mı?`, `Yağ temiz mi?`, `Basınç testi geçti mi?`, `Kayıt tutuldu mu?`],
        },
      ],
    },
  ],
};

export default content;
