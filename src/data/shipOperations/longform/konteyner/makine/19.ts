import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Exhaust gas boiler (EGB) veya composite boiler bakımı ve kontrol",
  shipType: "konteyner",
  dept: "makine",
  opIndex: 19,
  estimatedPages: 14,
  intro: `Exhaust gas boiler (EGB), ana makine egzoz ısısından buhar üretir; soot birikimi soot/iron fire riskidir. Su kimyası ve soot blowing kritiktir. Bu bölüm EGB bakımını ele alır.`,
  sources: ["Class Rules — Boilers", "Boiler maker manuals"],
  chapters: [
    {
      heading: "1. Bakım",
      sections: [
        {
          subheading: "1.1 Soot ve su kimyası",
          paragraphs: [
            `Soot blowing düzenli yapılır; düşük yükte uzun çalışma soot birikimini artırır. Su kimyası ve sirkülasyon korunur.`,
          ],
          bullets: [`Soot blowing`, `Su kimyası/sirkülasyon`, `Düşük yük birikimi izleme`],
        },
      ],
    },
    {
      heading: "2. Güvenlik ve Kontrol",
      sections: [
        {
          subheading: "2.1 Soot fire",
          paragraphs: [
            `Soot fire, sirkülasyon kesilince hızla iron fire'a dönüşebilir; sıcaklık ve sirkülasyon izlenir.`,
          ],
          callouts: [
            { type: "warning", title: "Soot/iron fire", text: `EGB soot fire'da su sirkülasyonu sürdürülmeli; ihmal iron fire'a yol açar.` },
          ],
        },
        {
          subheading: "2.2 Kontrol listesi",
          bullets: [`Soot blowing yapıldı mı?`, `Su kimyası uygun mu?`, `Sirkülasyon normal mi?`, `Kayıt tutuldu mu?`],
        },
      ],
    },
  ],
};

export default content;
