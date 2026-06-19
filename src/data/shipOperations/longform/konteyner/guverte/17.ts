import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Meteoroloji ve heavy weather avoidance — rota optimizasyonu",
  shipType: "konteyner",
  dept: "guverte",
  opIndex: 17,
  estimatedPages: 16,
  intro: `Konteyner gemileri, parametric/synchronous rolling ve yeşil su (green water) etkilerine duyarlıdır; heavy weather avoidance ve weather routing, konteyner kayıplarını önlemenin temelidir. Bu bölüm hava yönetimini ele alır.`,
  sources: ["MSC.1/Circ.1228 (heavy weather)", "Weather routing services"],
  chapters: [
    {
      heading: "1. Risk ve Kaçınma",
      sections: [
        {
          subheading: "1.1 Parametric rolling",
          paragraphs: [
            `Belirli dalga periyodu/karşılaşma açısı kombinasyonları parametric rolling tetikler; rota/hız değişimiyle bu rezonanstan kaçınılır. Weather routing tavsiyeleri değerlendirilir.`,
          ],
          bullets: [`Dalga periyodu/karşılaşma açısı`, `Hız/rota ayarı`, `Weather routing`],
        },
      ],
    },
    {
      heading: "2. Karar",
      sections: [
        {
          subheading: "2.1 Erken karar",
          paragraphs: [
            `Ağır havaya girmeden önce rota/hız kararı verilir; geç kalınan müdahale konteyner kaybına yol açar.`,
          ],
          callouts: [
            { type: "warning", title: "MSC.1/Circ.1228", text: `Rezonant yalpa bölgelerinden kaçınmak için hız/rota erken ayarlanmalıdır.` },
          ],
        },
        {
          subheading: "2.2 Kontrol listesi",
          bullets: [`Hava tahmini güncel mi?`, `Rezonans riski değerlendirildi mi?`, `Rota/hız ayarlandı mı?`, `Karar log'a işlendi mi?`],
        },
      ],
    },
  ],
};

export default content;
