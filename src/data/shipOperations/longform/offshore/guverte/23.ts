import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "DP crane ve ağır kaldırma operasyonu",
  shipType: "offshore",
  dept: "guverte",
  opIndex: 23,
  estimatedPages: 22,
  intro: `Ağır kaldırmada askıdaki yükün kuvveti ve gemi ağırlık merkezindeki ani değişim, DP kontrolüne, stabiliteye ve station-keeping planına dahil edilmelidir. Ani hook-load değişimi list, draft ve DP thrust ihtiyacını bir anda değiştirir. Bu bölüm crane/heavy-lift operasyonunun DP tarafını ele alır.`,
  sources: [
    "IMCA LR006 / M187 (Lifting)",
    "IMCA M103",
    "Approved lift plan",
    "Approved stability booklet",
  ],
  chapters: [
    {
      heading: "1. Lift Planı ve Etki",
      sections: [
        {
          subheading: "1.1 Yük ve DP etkisi",
          bullets: [
            `Lift plan, yük ağırlığı/CoG, crane radius, çevre limiti ve landing toleransı`,
            `Crane load kuvveti ile hook-load değişiminin DP modeli ve güç ihtiyacına etkisi`,
            `Barge/gemi, hedef tesis ve yük için ortak iletişim ve stop-work komutu`,
          ],
        },
      ],
    },
    {
      heading: "2. Kaldırma Safhaları",
      sections: [
        {
          subheading: "2.1 Pick-up → landing izleme",
          paragraphs: [
            `Pick-up, slew, transfer ve landing safhalarında position, heading, thrust, list ve hook load trendi izlenir. Yükün ani alınması/bırakılması öncesi DPO uyarılır; setpoint ve gain değişimi yalnızca plan dahilinde yapılır.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Ani hook-load değişimi",
              text: `Ani hook-load değişimi list, draft ve DP thrust ihtiyacını bir anda değiştirebilir. Yük ile tesis arasındaki sıkışma alanına personel girmemelidir.`,
            },
          ],
        },
        {
          subheading: "2.2 Limit aşımı",
          paragraphs: [
            `DP, crane, rigging veya hava limiti aşılırsa yük belirlenmiş güvenli konuma alınır.`,
          ],
        },
      ],
    },
    {
      heading: "3. Kontrol Listesi",
      sections: [
        {
          subheading: "3.1 Heavy-lift son kontrol",
          bullets: [
            `Hook-load etkisi DP modeli ve güç ihtiyacına dahil edildi mi?`,
            `Pre-lift checklist ve ortak stop-work komutu var mı?`,
            `Setpoint/gain değişimi yalnızca plan dahilinde mi?`,
            `Lift plan ve stability calculation kayıtlı mı?`,
          ],
        },
      ],
    },
  ],
};

export default content;
