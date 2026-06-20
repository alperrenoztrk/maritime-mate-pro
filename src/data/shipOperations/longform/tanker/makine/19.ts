import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Makine dairesi yangın söndürme sistemi kontrolü",
  shipType: "tanker",
  dept: "makine",
  opIndex: 19,
  estimatedPages: 16,
  intro: `Makine dairesi, gemideki en yüksek yangın riskli bölgedir; sabit söndürme (CO2/foam), portatif cihazlar, quick-closing valve ve damper'lar düzenli kontrol edilir. CO2 release lockout, can güvenliğinin garantisidir. Bu bölüm ER yangın sistemini ele alır.`,
  sources: ["SOLAS II-2 (fire protection)", "FSS Code"],
  chapters: [
    {
      heading: "1. Sistem Kontrolü",
      sections: [
        {
          subheading: "1.1 Sabit ve portatif",
          paragraphs: [
            `CO2/foam sistemi yıllık ve 5 yıllık testlere tabidir; portatif cihazlar, quick-closing valve, fire damper ve emergency stop'lar test edilir. CO2 release öncesi alan tahliyesi ve lockout uygulanır.`,
          ],
          bullets: [
            `CO2/foam yıllık + 5 yıllık test`,
            `Quick-closing valve / damper test`,
            `Emergency stop / fuel trip test`,
          ],
        },
      ],
    },
    {
      heading: "2. Güvenlik",
      sections: [
        {
          subheading: "2.1 CO2 release lockout",
          paragraphs: [
            `CO2 deşarjı boğulma riski taşır; release yalnız alan tamamen tahliye edildikten ve sayım yapıldıktan sonra yapılır. Lockout sistemi yanlışlıkla deşarjı önler.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "CO2 = boğulma",
              text: `CO2 deşarjından önce tüm personel tahliye edilip sayılmalı; lockout devrede tutulmalıdır.`,
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
            `CO2/foam test geçti mi?`,
            `Quick-closing valve/damper çalışıyor mu?`,
            `Emergency stop'lar test edildi mi?`,
            `FFA service report dolduruldu mu?`,
          ],
        },
      ],
    },
  ],
};

export default content;
