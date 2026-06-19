import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Ana makine bakımı ve turboşarj kontrolü",
  shipType: "tanker",
  dept: "makine",
  opIndex: 12,
  estimatedPages: 20,
  intro: `Ana makine (ME); piston, liner, yatak, fuel injection ve turboşarj bakımı running hours esasına göre yürütülür. Crankcase oil mist explosion en ciddi tehlikedir. Bu bölüm ME ve T/C bakımını ele alır.`,
  sources: ["Engine maker manuals", "Class Rules"],
  chapters: [
    {
      heading: "1. ME Bakımı",
      sections: [
        {
          subheading: "1.1 Running hours overhaul",
          paragraphs: [
            `Piston, liner, yatak ve fuel injection ekipmanı running hours'a göre overhaul edilir; clearance ve aşınma ölçümleri kaydedilir. Turboşarj temizliği ve balansı performansı korur.`,
          ],
          bullets: [
            `Running hours'a göre overhaul`,
            `Clearance/aşınma ölçümleri`,
            `T/C temizlik + balans`,
          ],
        },
      ],
    },
    {
      heading: "2. Crankcase Explosion",
      sections: [
        {
          subheading: "2.1 Oil mist detector",
          paragraphs: [
            `Aşırı ısınan yatak yağ buharı (oil mist) üretir; oil mist detector ve crankcase relief valve patlamaya karşı korur. Sıcak yataktan sonra crankcase açılması scavenge/explosion riski taşır.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Crankcase explosion",
              text: `Oil mist alarmında crankcase hemen açılmaz; soğuma beklenir, aksi halde ikincil patlama olur.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. Kontrol Listesi",
      sections: [
        {
          subheading: "3.1 Son kontrol",
          bullets: [
            `Overhaul running hours'a uygun mu?`,
            `Clearance ölçümleri kaydedildi mi?`,
            `T/C temiz/balanslı mı?`,
            `Oil mist detector çalışıyor mu?`,
          ],
        },
      ],
    },
  ],
};

export default content;
