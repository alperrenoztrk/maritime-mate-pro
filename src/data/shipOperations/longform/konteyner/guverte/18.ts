import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "STCW Reg. VIII/2 uyumlu OOW bridge watch tutma",
  shipType: "konteyner",
  dept: "guverte",
  opIndex: 18,
  estimatedPages: 16,
  intro: `Köprüüstü vardiyası (OOW watch), STCW Reg. VIII/2 ve COLREG'e uygun yürütülür; gözcülük (look-out), trafik değerlendirme ve Master'ı çağırma kriterleri vardiya güvenliğinin esasıdır. Bu bölüm OOW vardiyasını ele alır.`,
  sources: ["STCW Reg. VIII/2", "COLREG 1972", "Bridge Procedures Guide (ICS)"],
  chapters: [
    {
      heading: "1. Vardiya Esasları",
      sections: [
        {
          subheading: "1.1 Look-out ve değerlendirme",
          paragraphs: [
            `OOW sürekli uygun gözcülük yapar; radar/ARPA ve görsel gözlemle çatışma riski değerlendirilir. COLREG'e göre erken ve belirgin manevra yapılır.`,
          ],
          bullets: [`Sürekli look-out`, `Radar/ARPA değerlendirme`, `COLREG manevrası`, `Master'ı çağırma kriterleri`],
        },
      ],
    },
    {
      heading: "2. Yorgunluk ve Devir",
      sections: [
        {
          subheading: "2.1 Fatigue ve handover",
          paragraphs: [
            `Yorgunluk yönetimi (rest hours) ve net vardiya devri (handover) yapılır; şüphe varsa Master çağrılır.`,
          ],
          callouts: [
            { type: "regulation", title: "Master'ı çağır", text: `Şüphe halinde tereddüt etmeden Master çağrılır; bu bir başarısızlık değil, doğru karardır.` },
          ],
        },
        {
          subheading: "2.2 Kontrol listesi",
          bullets: [`Look-out yeterli mi?`, `COLREG uygulanıyor mu?`, `Rest hours uyumlu mu?`, `Handover net mi?`],
        },
      ],
    },
  ],
};

export default content;
