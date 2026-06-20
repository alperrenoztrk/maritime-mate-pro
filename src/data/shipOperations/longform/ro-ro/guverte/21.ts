import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "COLREG uyumu ve seyir kuralları takibi",
  shipType: "ro-ro",
  dept: "guverte",
  opIndex: 21,
  estimatedPages: 14,
  intro: `COLREG 1972, çatışma önlemenin temelidir; yoğun feribot trafiğinde look-out, güvenli hız ve doğru manevra hayati önemdedir. Bu bölüm COLREG uygulamasını ele alır.`,
  sources: ["COLREG 1972", "STCW Reg. VIII/2"],
  chapters: [
    {
      heading: "1. Uygulama",
      sections: [
        {
          subheading: "1.1 Look-out ve manevra",
          paragraphs: [`Sürekli look-out yapılır; risk radar/ARPA ve görsel ile değerlendirilir, erken/belirgin manevra yapılır. Yoğun feribot hatlarında trafik ayrımına uyulur.`],
          bullets: [`Sürekli look-out`, `Güvenli hız`, `Erken manevra`, `CPA/TCPA`],
        },
      ],
    },
    {
      heading: "2. Kontrol Listesi",
      sections: [
        {
          subheading: "2.1 Son kontrol",
          bullets: [`Look-out yeterli mi?`, `Güvenli hız mı?`, `Manevra erken mi?`, `Kayıt tutuldu mu?`],
        },
      ],
    },
  ],
};

export default content;
