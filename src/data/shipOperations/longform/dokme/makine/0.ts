import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Ana makine bakımı ve turboşarj kontrolü",
  shipType: "dokme",
  dept: "makine",
  opIndex: 0,
  estimatedPages: 18,
  intro: `Ana makine; piston, liner, yatak, fuel injection ve turboşarj bakımı running hours esasına göre yürütülür. Crankcase oil mist explosion en ciddi tehlikedir. Bu bölüm ME ve T/C bakımını ele alır.`,
  sources: ["Engine maker manuals", "Class Rules"],
  chapters: [
    {
      heading: "1. ME Bakımı",
      sections: [
        {
          subheading: "1.1 Overhaul ve T/C",
          paragraphs: [
            `Piston/liner/yatak/fuel injection running hours'a göre overhaul edilir; clearance ölçümleri kaydedilir. Turboşarj temizlik/balansı performansı korur.`,
          ],
          bullets: [`Running hours overhaul`, `Clearance ölçümleri`, `T/C temizlik/balans`],
        },
      ],
    },
    {
      heading: "2. Crankcase Explosion",
      sections: [
        {
          subheading: "2.1 Oil mist detector",
          paragraphs: [
            `Aşırı ısınan yatak oil mist üretir; detector ve relief valve patlamaya karşı korur. Oil mist alarmında crankcase soğumadan açılmaz.`,
          ],
          callouts: [
            { type: "warning", title: "Crankcase explosion", text: `Oil mist alarmında crankcase hemen açılmaz; ikincil patlama riski vardır.` },
          ],
        },
        {
          subheading: "2.2 Kontrol listesi",
          bullets: [`Overhaul zamanında mı?`, `Clearance kaydedildi mi?`, `T/C temiz mi?`, `Oil mist detector çalışıyor mu?`],
        },
      ],
    },
  ],
};

export default content;
