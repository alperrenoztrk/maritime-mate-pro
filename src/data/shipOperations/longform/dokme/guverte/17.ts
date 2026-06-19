import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Seyir logbook doldurma",
  shipType: "dokme",
  dept: "guverte",
  opIndex: 17,
  estimatedPages: 12,
  intro: `Deck log ve Official Log Book seferin resmi kaydıdır; olaylar, ölçümler, tatbikatlar ve emniyet kontrolleri eksiksiz ve zamanında işlenir. Bu bölüm log disiplinini ele alır.`,
  sources: ["Flag state log requirements", "MLC (rest hours)"],
  chapters: [
    {
      heading: "1. Kayıt",
      sections: [
        {
          subheading: "1.1 Eksiksiz giriş",
          paragraphs: [
            `Tüm seyir/operasyon olayları, tatbikatlar ve kontroller zamanında işlenir; yasal zorunlu girişler eksiksiz olmalı ve imzalanmalıdır.`,
          ],
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
