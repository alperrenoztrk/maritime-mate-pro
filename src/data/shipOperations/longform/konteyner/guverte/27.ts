import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Deck log, Official Log Book ve voyage records doldurma",
  shipType: "konteyner",
  dept: "guverte",
  opIndex: 27,
  estimatedPages: 12,
  intro: `Deck log ve Official Log Book, seferin resmi kaydıdır; olaylar, ölçümler, tatbikatlar ve emniyet kontrolleri eksiksiz ve zamanında işlenir. Bu kayıtlar denetim ve hukuki süreçlerde delildir. Bu bölüm log disiplinini ele alır.`,
  sources: ["Flag state log requirements", "MLC (rest hours)"],
  chapters: [
    {
      heading: "1. Kayıt Disiplini",
      sections: [
        {
          subheading: "1.1 Eksiksiz ve zamanında",
          paragraphs: [
            `Tüm seyir/operasyon olayları, tatbikatlar ve emniyet kontrolleri zamanında işlenir; Official Log Book yasal zorunlu girişleri (drills, inspections vb.) içerir.`,
          ],
          bullets: [`Zamanında giriş`, `Yasal zorunlu kayıtlar`, `İmza/onay`],
        },
      ],
    },
    {
      heading: "2. Kontrol Listesi",
      sections: [
        {
          subheading: "2.1 Son kontrol",
          bullets: [`Girişler eksiksiz mi?`, `Yasal kayıtlar tam mı?`, `İmzalar var mı?`, `Voyage records arşivlendi mi?`],
          paragraphs: [`Tutarlı ve eksiksiz log, bir sorun çıktığında en güçlü savunmadır.`],
        },
      ],
    },
  ],
};

export default content;
