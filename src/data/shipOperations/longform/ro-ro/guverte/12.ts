import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Yüksek ve ağır araç (abnormal load) kabulü",
  shipType: "ro-ro",
  dept: "guverte",
  opIndex: 12,
  estimatedPages: 14,
  intro: `Yüksek/ağır (abnormal) araçlar; güverte yüksekliği, load density ve özel lashing açısından önceden değerlendirilir. Yanlış kabul güverte hasarı ve stabilite sorunu yaratır. Bu bölüm abnormal load kabulünü ele alır.`,
  sources: ["CSS Code Annex 13", "Deck load capacity plan"],
  chapters: [
    {
      heading: "1. Değerlendirme",
      sections: [
        {
          subheading: "1.1 Yükseklik/ağırlık/lashing",
          paragraphs: [
            `Araç yüksekliği güverte clearance ile, ağırlık deck load density ile karşılaştırılır; özel lashing planı yapılır. Uygun değilse kabul edilmez.`,
          ],
          bullets: [`Güverte clearance`, `Load density`, `Özel lashing planı`],
        },
      ],
    },
    {
      heading: "2. Kontrol Listesi",
      sections: [
        {
          subheading: "2.1 Son kontrol",
          bullets: [`Yükseklik uygun mu?`, `Load density aşılmıyor mu?`, `Lashing planı var mı?`, `Onay verildi mi?`],
          paragraphs: [`Tek bir ağır aracın yanlış konumu lokal güverte hasarı yapabilir.`],
        },
      ],
    },
  ],
};

export default content;
