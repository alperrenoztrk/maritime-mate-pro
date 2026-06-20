import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "OOG/ODC (Out-of-Gauge) konteyner özel lashing planı",
  shipType: "konteyner",
  dept: "guverte",
  opIndex: 6,
  estimatedPages: 16,
  intro: `OOG/ODC (Out-of-Gauge / Over-Dimensional Cargo) konteynerler, standart ISO ölçülerini aşar ve özel lashing planı gerektirir. Yanlış sabitleme hem kendi yükünü hem komşu yığınları riske atar. Bu bölüm OOG lashing planını ele alır.`,
  sources: ["CSS Code Annex 13", "Cargo Securing Manual", "Flat-rack lashing guidance"],
  chapters: [
    {
      heading: "1. Özel Lashing",
      sections: [
        {
          subheading: "1.1 Flat-rack ve ekstra lashing",
          paragraphs: [
            `OOG yükler genelde flat-rack/platform üzerinde taşınır; ek lashing (chain/web), açı ve MSL hesabıyla planlanır. Taşma boyutları komşu slot kullanımını etkiler.`,
          ],
          bullets: [`Flat-rack/platform`, `Ek lashing + MSL hesabı`, `Komşu slot blok rezervasyonu`],
        },
      ],
    },
    {
      heading: "2. Onay ve Kontrol",
      sections: [
        {
          subheading: "2.1 Mühendislik onayı",
          paragraphs: [
            `Ağır/büyük OOG için lashing planı mühendislik hesabıyla ve Chief Officer/Master onayıyla uygulanır.`,
          ],
          callouts: [
            { type: "tip", title: "Komşu slot", text: `OOG taşması nedeniyle bloke edilen slotlar bay planında işaretlenir.` },
          ],
        },
        {
          subheading: "2.2 Kontrol listesi",
          bullets: [`Özel lashing planı var mı?`, `MSL/açı hesabı yapıldı mı?`, `Komşu slotlar bloke edildi mi?`, `Onaylar tam mı?`],
        },
      ],
    },
  ],
};

export default content;
