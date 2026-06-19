import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "MARPOL Ek I uyum kontrolü ve ORB I kaydı",
  shipType: "tanker",
  dept: "guverte",
  opIndex: 17,
  estimatedPages: 16,
  intro: `Oil Record Book Part I (ORB I), kargo/balast yağ operasyonlarının yasal kaydıdır. Yanlış veya eksik kayıt, bazı yargı bölgelerinde (örn. ABD APPS) kriminal suçtur. Bu bölüm doğru kod kullanımı ve kayıt disiplinini ele alır.`,
  sources: ["MARPOL Annex I Reg. 17, 36", "US APPS (Act to Prevent Pollution from Ships)"],
  chapters: [
    {
      heading: "1. ORB I Kayıt Disiplini",
      sections: [
        {
          subheading: "1.1 Kod kullanımı",
          paragraphs: [
            `Kargo/balast operasyonları ilgili kodlarla (Code A-K) zamanında ve eksiksiz işlenir. Her sayfa sorumlu zabit ve Master tarafından imzalanır; kayıtlar gemide en az üç yıl saklanır.`,
          ],
          bullets: [
            `Doğru kod (A-K) seçimi`,
            `Zamanında giriş (gecikme yok)`,
            `Master imzası her sayfa`,
            `3 yıl saklama`,
          ],
        },
      ],
    },
    {
      heading: "2. Denetim Riski",
      sections: [
        {
          subheading: "2.1 Kriminal sorumluluk",
          paragraphs: [
            `ORB I ile fiili operasyon arasındaki tutarsızlık ağır cezalara yol açar. PSC ve sahil devletleri kayıtları fiziksel kanıtla (sounding, tank durumu) karşılaştırır.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Yanlış kayıt = suç",
              text: `Kasıtlı yanlış ORB I kaydı (örn. magic pipe gizleme) kriminal kovuşturma sebebidir.`,
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
            `Tüm operasyonlar doğru kodla işlendi mi?`,
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
