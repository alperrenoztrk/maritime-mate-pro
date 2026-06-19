import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Hatch su geçirmezlik (hose/flood/ultrasonic) testi",
  shipType: "dokme",
  dept: "guverte",
  opIndex: 5,
  estimatedPages: 14,
  intro: `Hatch cover sızdırmazlığı; hose test, chalk test veya ultrasonic test ile doğrulanır. Ultrasonic test, sızıntı noktalarını sayısal olarak (PFU) gösterir ve yükü riske atmadan yapılır. Bu bölüm sızdırmazlık testini ele alır.`,
  sources: ["Hatch cover maintenance guidance", "P&I club survey notes"],
  chapters: [
    {
      heading: "1. Test Yöntemleri",
      sections: [
        {
          subheading: "1.1 Hose/chalk/ultrasonic",
          paragraphs: [
            `Hose test su jeti ile sızıntı arar (yük varken risklidir); chalk test conta temasını gösterir; ultrasonic test kapalı ambarda PFU değeriyle sızıntıyı ölçer. Sonuçlar belgelenir.`,
          ],
          bullets: [`Hose test (yüksüz)`, `Chalk test (temas)`, `Ultrasonic (PFU)`],
        },
      ],
    },
    {
      heading: "2. Kontrol Listesi",
      sections: [
        {
          subheading: "2.1 Son kontrol",
          bullets: [`Uygun test yöntemi seçildi mi?`, `Sızıntı noktaları belirlendi mi?`, `Onarım yapıldı mı?`, `Test belgesi düzenlendi mi?`],
          paragraphs: [`Hassas yüklerde yükleme öncesi ultrasonic test, ıslanma claim'lerine karşı en güvenli kanıttır.`],
        },
      ],
    },
  ],
};

export default content;
