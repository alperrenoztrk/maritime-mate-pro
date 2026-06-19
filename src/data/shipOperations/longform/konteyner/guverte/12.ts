import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Port State Control (PSC) denetim hazırlığı — deficiency kapatma takibi",
  shipType: "konteyner",
  dept: "guverte",
  opIndex: 12,
  estimatedPages: 16,
  intro: `Port State Control (PSC), geminin uluslararası sözleşmelere uygunluğunu denetler; deficiency (eksiklik) ve detention ticari/operasyonel kayıp yaratır. Önceki bulguların kapatılması ve sertifika/ekipman hazırlığı kritiktir. Bu bölüm PSC hazırlığını ele alır.`,
  sources: ["Paris/Tokyo MoU", "SOLAS/MARPOL/MLC", "PSC inspection guidelines"],
  chapters: [
    {
      heading: "1. Hazırlık",
      sections: [
        {
          subheading: "1.1 Sertifika ve ekipman",
          paragraphs: [
            `Tüm sertifikalar geçerli; LSA/FFA ekipmanı, ECDIS, GMDSS ve emniyet ekipmanı çalışır durumda olmalıdır. Önceki PSC deficiency'leri kapatılıp kanıtlanmış olmalıdır.`,
          ],
          bullets: [`Sertifika geçerliliği`, `LSA/FFA/GMDSS kontrol`, `Önceki deficiency kapatma`],
        },
      ],
    },
    {
      heading: "2. Detention Önleme",
      sections: [
        {
          subheading: "2.1 Yaygın bulgu alanları",
          paragraphs: [
            `ISM uygulama eksikleri, LSA/FFA kondisyonu ve ECDIS/seyir kayıtları sık bulgu alanlarıdır; iç denetim ile önceden giderilir.`,
          ],
          callouts: [
            { type: "warning", title: "Detention", text: `Detention gemiyi durdurur ve şirket PSC performansını düşürür; hazırlık titiz olmalıdır.` },
          ],
        },
        {
          subheading: "2.2 Kontrol listesi",
          bullets: [`Sertifikalar geçerli mi?`, `LSA/FFA çalışır mı?`, `Önceki bulgular kapandı mı?`, `Kayıtlar düzenli mi?`],
        },
      ],
    },
  ],
};

export default content;
