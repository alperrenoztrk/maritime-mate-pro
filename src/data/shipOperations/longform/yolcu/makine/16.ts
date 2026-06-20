import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Makine dairesi yangın söndürme sistemi kontrolü",
  shipType: "yolcu",
  dept: "makine",
  opIndex: 16,
  estimatedPages: 16,
  intro: `Makine dairesi en yüksek yangın riskli bölgedir; sabit CO2/foam/water-mist, quick-closing valve, damper ve emergency stop'lar düzenli kontrol edilir. CO2 release lockout can güvenliğini garanti eder. Bu bölüm ER yangın sistemini ele alır.`,
  sources: ["SOLAS II-2", "FSS Code"],
  chapters: [
    {
      heading: "1. Sistem Kontrolü",
      sections: [
        {
          subheading: "1.1 Sabit sistem ve izolasyon",
          paragraphs: [`CO2/foam/water-mist yıllık/5 yıllık testlere tabidir; quick-closing valve, damper, fuel trip ve emergency stop test edilir. CO2 öncesi tahliye/sayım yapılır.`],
          bullets: [`Sabit sistem test`, `Quick-closing valve/damper`, `Emergency stop/fuel trip`],
        },
      ],
    },
    {
      heading: "2. Güvenlik ve Kontrol",
      sections: [
        {
          subheading: "2.1 CO2 lockout",
          paragraphs: [`CO2 boğulma riski taşır; release yalnız tahliye ve sayım sonrası yapılır.`],
          callouts: [
            { type: "warning", title: "CO2 = boğulma", text: `Deşarjdan önce personel tahliye edilip sayılmalıdır.` },
          ],
        },
        {
          subheading: "2.2 Kontrol listesi",
          bullets: [`Sabit sistem test geçti mi?`, `Damper/valve çalışıyor mu?`, `Emergency stop test edildi mi?`, `FFA report tutuldu mu?`],
        },
      ],
    },
  ],
};

export default content;
