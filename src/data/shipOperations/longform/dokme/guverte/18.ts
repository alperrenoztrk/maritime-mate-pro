import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Hava raporu takibi ve deniz şartları değerlendirmesi",
  shipType: "dokme",
  dept: "guverte",
  opIndex: 18,
  estimatedPages: 14,
  intro: `Dökme yük gemilerinde ağır hava; yük kayması, structural slamming ve (Group A yüklerde) liquefaction riskini artırır. Hava takibi ve heavy weather kararı kritiktir. Bu bölüm hava değerlendirmesini ele alır.`,
  sources: ["MSC.1/Circ.1228", "IMSBC Code (Group A)", "Weather routing"],
  chapters: [
    {
      heading: "1. Değerlendirme",
      sections: [
        {
          subheading: "1.1 Risk ve karar",
          paragraphs: [
            `Hava tahmini ve dalga durumu izlenir; ağır havada hız/rota ayarlanır. Group A (sıvılaşabilir) yüklerde nem/davranış izlenir, gerekirse rota değişir.`,
          ],
          bullets: [`Hava/dalga izleme`, `Hız/rota ayarı`, `Group A liquefaction izleme`],
        },
      ],
    },
    {
      heading: "2. Kontrol Listesi",
      sections: [
        {
          subheading: "2.1 Son kontrol",
          bullets: [`Hava tahmini güncel mi?`, `Heavy weather kararı verildi mi?`, `Group A riski değerlendirildi mi?`, `Karar log'a işlendi mi?`],
          paragraphs: [`Bulk Jupiter vakası, liquefaction'ın gemiyi alabora edebileceğini göstermiştir.`],
        },
      ],
    },
  ],
};

export default content;
