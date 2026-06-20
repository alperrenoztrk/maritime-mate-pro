import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Araç yerleştirme planı ve sayımı",
  shipType: "ro-ro",
  dept: "guverte",
  opIndex: 2,
  estimatedPages: 16,
  intro: `Araç yerleştirme planı; ağırlık dağılımı, güverte yük yoğunluğu, çıkış sırası (discharge order) ve manevra alanını optimize eder. Doğru sayım ve plan, trim/stabilite ve hızlı tahliyenin temelidir. Bu bölüm yerleştirme planını ele alır.`,
  sources: ["CSS Code", "Stability booklet", "Deck load capacity plan"],
  chapters: [
    {
      heading: "1. Plan",
      sections: [
        {
          subheading: "1.1 Ağırlık ve sıra",
          paragraphs: [
            `Ağır araçlar uygun güverteye/eksene yerleştirilir; deck load density aşılmaz. Çıkış limanı sırasına göre erişim ve manevra alanı korunur. Araç sayımı (tally) yapılır.`,
          ],
          bullets: [`Ağırlık/eksen dağılımı`, `Deck load density`, `Discharge order erişimi`, `Tally/sayım`],
        },
      ],
    },
    {
      heading: "2. Kontrol Listesi",
      sections: [
        {
          subheading: "2.1 Son kontrol",
          bullets: [`Ağırlık dağılımı dengeli mi?`, `Load density aşıldı mı?`, `Çıkış sırası uygun mu?`, `Sayım doğru mu?`],
          paragraphs: [`Yanlış yerleştirme hem stabiliteyi bozar hem boşaltmada gecikme yaratır.`],
        },
      ],
    },
  ],
};

export default content;
