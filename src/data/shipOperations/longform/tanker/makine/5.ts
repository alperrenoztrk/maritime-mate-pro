import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Stripper pompası bakımı",
  shipType: "tanker",
  dept: "makine",
  opIndex: 5,
  estimatedPages: 14,
  intro: `Stripper (recip/eductor) pompası, boşaltma sonunda tank diplerini ve hatları süpürerek ROB'u minimuma indirir. Yetersiz stripping ticari kayıp ve MARPOL riski yaratır. Bu bölüm stripper bakımını ele alır.`,
  sources: ["Class Rules", "Pump maker manuals"],
  chapters: [
    {
      heading: "1. Bakım",
      sections: [
        {
          subheading: "1.1 Valve clearance ve nozzle",
          paragraphs: [
            `Recip stripper'da valve clearance ayarlanır; eductor stripper'da nozzle aşınması kontrol edilir. Aşınmış nozzle emiş verimini düşürür.`,
          ],
          bullets: [
            `Valve clearance ayarı`,
            `Eductor nozzle aşınması`,
            `Emiş performansı kontrolü`,
          ],
        },
      ],
    },
    {
      heading: "2. Kontrol Listesi",
      sections: [
        {
          subheading: "2.1 Son kontrol",
          bullets: [
            `Valve clearance uygun mu?`,
            `Nozzle aşınması kabul sınırında mı?`,
            `Stripping performansı yeterli mi?`,
            `PMS report dolduruldu mu?`,
          ],
          paragraphs: [
            `İyi stripping düşük ROB demektir; bu hem ticari hem çevresel kazançtır.`,
          ],
        },
      ],
    },
  ],
};

export default content;
