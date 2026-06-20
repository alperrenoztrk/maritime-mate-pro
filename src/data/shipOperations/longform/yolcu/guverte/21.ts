import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Seyir logbook ve Official Log doldurma",
  shipType: "yolcu",
  dept: "guverte",
  opIndex: 21,
  estimatedPages: 12,
  intro: `Deck log ve Official Log Book seferin resmi kaydıdır; olaylar, tatbikatlar ve emniyet kontrolleri eksiksiz ve zamanında işlenir. Bu bölüm log disiplinini ele alır.`,
  sources: ["Flag state log requirements", "MLC"],
  chapters: [
    {
      heading: "1. Kayıt",
      sections: [
        {
          subheading: "1.1 Eksiksiz giriş",
          paragraphs: [`Tüm olaylar, tatbikatlar ve kontroller zamanında işlenir; yasal zorunlu girişler eksiksiz ve imzalı olur.`],
          bullets: [`Zamanında giriş`, `Yasal kayıtlar`, `İmza/onay`],
        },
      ],
    },
    {
      heading: "2. Kontrol Listesi",
      sections: [
        {
          subheading: "2.1 Son kontrol",
          bullets: [`Girişler eksiksiz mi?`, `Yasal kayıtlar tam mı?`, `İmzalar var mı?`, `Arşivlendi mi?`],
        },
      ],
    },
  ],
};

export default content;
