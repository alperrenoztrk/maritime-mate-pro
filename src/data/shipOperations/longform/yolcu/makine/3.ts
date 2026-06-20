import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Stabilizatör (fin/tank stabilizer) bakımı ve operasyonu",
  shipType: "yolcu",
  dept: "makine",
  opIndex: 3,
  estimatedPages: 14,
  intro: `Stabilizatör (fin veya anti-roll tank), yolcu konforu için yalpayı azaltır; fin stabilizer hidrolik/kontrol bakımı ve doğru operasyon kritiktir. Bu bölüm stabilizatör bakım/operasyonunu ele alır.`,
  sources: ["Maker manuals", "Class Rules"],
  chapters: [
    {
      heading: "1. Operasyon/Bakım",
      sections: [
        {
          subheading: "1.1 Fin/tank stabilizer",
          paragraphs: [
            `Fin stabilizer açılma/kapanma ve hidrolik sistemi bakıma alınır; anti-roll tank sistemlerinde su transferi/kontrol doğrulanır. Limanda fin'ler içeri alınır.`,
          ],
          bullets: [`Fin açılma/kapanma`, `Hidrolik bakımı`, `Anti-roll tank kontrolü`, `Limanda fin içeri`],
        },
      ],
    },
    {
      heading: "2. Kontrol Listesi",
      sections: [
        {
          subheading: "2.1 Son kontrol",
          bullets: [`Fin/tank çalışıyor mu?`, `Hidrolik uygun mu?`, `Limanda içeri alındı mı?`, `Kayıt tutuldu mu?`],
          paragraphs: [`Dışarıda kalan fin, yanaşmada rıhtım/teknelerle çarpışma riski yaratır.`],
        },
      ],
    },
  ],
};

export default content;
