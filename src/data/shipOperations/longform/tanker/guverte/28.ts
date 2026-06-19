import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Yük hesabı ve B/L onayı (Bill of Lading)",
  shipType: "tanker",
  dept: "guverte",
  opIndex: 28,
  estimatedPages: 16,
  intro: `Bill of Lading (B/L), yükün miktarını ve teslim koşullarını belgeleyen ticari/hukuki senettir. Ship figure ile shore figure arasındaki fark, gerektiğinde Letter of Protest (LoP) ile belgelenir. Bu bölüm yük hesabını ve B/L onayını ele alır.`,
  sources: ["Hague-Visby Rules", "API/ASTM measurement standards"],
  chapters: [
    {
      heading: "1. Ship vs Shore Figure",
      sections: [
        {
          subheading: "1.1 Fark yönetimi",
          paragraphs: [
            `Geminin ölçümünden (ship figure) elde edilen miktar, kıyı ölçümüyle (shore figure) karşılaştırılır. Fark belirlenen toleransı (örn. %0.5) aşarsa Letter of Protest düzenlenir; aksi halde sonradan cargo claim'lere karşı savunma zayıflar.`,
          ],
          bullets: [
            `Ship figure vs shore figure karşılaştırma`,
            `Tolerans aşılırsa LoP`,
            `Ölçüm belgeleri saklanır`,
          ],
        },
      ],
    },
    {
      heading: "2. B/L Onayı",
      sections: [
        {
          subheading: "2.1 İmza disiplini",
          paragraphs: [
            `B/L Master/yetkili tarafından imzalanır; miktar, tanım ve kondisyon doğrulanmadan clean B/L imzalanmaz. Yanlış/imzasız B/L ciddi ticari ve hukuki sonuç doğurur.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Cargo claim",
              text: `Doğrulanmadan imzalanan B/L, sonradan miktar/kondisyon uyuşmazlığında gemiyi sorumlu bırakır.`,
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
            `Ship/shore figure karşılaştırıldı mı?`,
            `Fark toleransta mı, değilse LoP düzenlendi mi?`,
            `B/L doğru ve imzalı mı?`,
            `Ölçüm belgeleri dosyalandı mı?`,
          ],
        },
      ],
    },
  ],
};

export default content;
