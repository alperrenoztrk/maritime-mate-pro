import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "MARPOL uyum kontrolü (ORB I ve II)",
  shipType: "tanker",
  dept: "makine",
  opIndex: 14,
  estimatedPages: 16,
  intro: `Makine dairesi ve kargo operasyonlarının yasal kayıtları (ORB I, gerektiğinde ORB II/cargo) doğru kodlarla, zamanında ve Master imzalı tutulmalıdır. Tutarsızlık kriminal sorumluluk doğurur. Bu bölüm ORB kayıt uyumunu ele alır.`,
  sources: ["MARPOL Annex I", "MARPOL Annex II (NLS)", "MARPOL Annex VI"],
  chapters: [
    {
      heading: "1. Kayıt Disiplini",
      sections: [
        {
          subheading: "1.1 Doğru kod ve imza",
          paragraphs: [
            `Her operasyon ilgili kodla işlenir; girişler zamanında yapılır ve her sayfa Master tarafından imzalanır. Kayıtlar fiili durumla (sounding, tank içeriği) tutarlı olmalıdır.`,
          ],
          bullets: [
            `Doğru kod kullanımı`,
            `Zamanında giriş`,
            `Master imzası`,
            `Fiili durumla tutarlılık`,
          ],
        },
      ],
    },
    {
      heading: "2. Denetim",
      sections: [
        {
          subheading: "2.1 PSC/sahil devleti",
          paragraphs: [
            `PSC, ORB ile fiziksel kanıtı karşılaştırır; tutarsızlık detention ve kovuşturma sebebidir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Kriminal sorumluluk",
              text: `Yanlış kayıt bazı ülkelerde (örn. ABD) kriminaldir; kayıt disiplinine taviz verilmez.`,
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
            `Kodlar doğru mu?`,
            `Girişler zamanında mı?`,
            `Master imzaları tam mı?`,
            `Kayıt fiili durumla tutarlı mı?`,
          ],
        },
      ],
    },
  ],
};

export default content;
