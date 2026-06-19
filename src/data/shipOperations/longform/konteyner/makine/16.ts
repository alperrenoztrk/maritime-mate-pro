import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Fixed CO₂ / foam fire fighting sistemi ve makine dairesi yangın önlemleri",
  shipType: "konteyner",
  dept: "makine",
  opIndex: 16,
  estimatedPages: 16,
  intro: `Makine dairesi en yüksek yangın riskli bölgedir; sabit CO₂/foam, quick-closing valve, damper ve emergency stop'lar düzenli kontrol edilir. CO₂ release lockout can güvenliğini garanti eder. Bu bölüm ER yangın sistemini ele alır.`,
  sources: ["SOLAS II-2", "FSS Code"],
  chapters: [
    {
      heading: "1. Sistem Kontrolü",
      sections: [
        {
          subheading: "1.1 Sabit sistem ve izolasyon",
          paragraphs: [
            `CO₂/foam sistemi yıllık/5 yıllık testlere tabidir; quick-closing valve, fire damper, fuel trip ve emergency stop test edilir. CO₂ release öncesi alan tahliyesi ve sayım yapılır.`,
          ],
          bullets: [`CO₂/foam test`, `Quick-closing valve/damper`, `Emergency stop/fuel trip`],
        },
      ],
    },
    {
      heading: "2. Güvenlik ve Kontrol",
      sections: [
        {
          subheading: "2.1 CO₂ lockout",
          paragraphs: [
            `CO₂ boğulma riski taşır; release yalnız tahliye ve sayım sonrası, lockout devredeyken yapılır.`,
          ],
          callouts: [
            { type: "warning", title: "CO₂ = boğulma", text: `Deşarjdan önce tüm personel tahliye edilip sayılmalıdır.` },
          ],
        },
        {
          subheading: "2.2 Kontrol listesi",
          bullets: [`CO₂/foam test geçti mi?`, `Damper/valve çalışıyor mu?`, `Emergency stop test edildi mi?`, `FFA service report tutuldu mu?`],
        },
      ],
    },
  ],
};

export default content;
