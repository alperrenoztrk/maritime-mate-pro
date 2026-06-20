import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Güverte ekipman bakımı (grab, hatch hydraulic)",
  shipType: "dokme",
  dept: "guverte",
  opIndex: 19,
  estimatedPages: 14,
  intro: `Geared bulk gemilerinde grab/vinç ve hatch cover hidrolik sistemleri yük operasyonunun verimini belirler; düzenli bakım arızayı ve gecikmeyi önler. Bu bölüm güverte ekipman bakımını ele alır.`,
  sources: ["Maker manuals", "Class Rules", "PMS"],
  chapters: [
    {
      heading: "1. Bakım",
      sections: [
        {
          subheading: "1.1 Grab ve hidrolik",
          paragraphs: [
            `Grab/vinç tel halat, fren ve hidrolik bakımı PMS'e göre yapılır; hatch hidrolik silindirleri ve hortumları sızıntı açısından denetlenir.`,
          ],
          bullets: [`Tel halat/fren`, `Hidrolik sızıntı`, `Greaseleme`],
        },
      ],
    },
    {
      heading: "2. Kontrol Listesi",
      sections: [
        {
          subheading: "2.1 Son kontrol",
          bullets: [`Tel halat/fren uygun mu?`, `Hidrolik sızıntı var mı?`, `Greaseleme yapıldı mı?`, `PMS kaydı tutuldu mu?`],
          paragraphs: [`Vinç arızası geared gemide yük operasyonunu durdurur ve demuraj yaratır.`],
        },
      ],
    },
  ],
};

export default content;
