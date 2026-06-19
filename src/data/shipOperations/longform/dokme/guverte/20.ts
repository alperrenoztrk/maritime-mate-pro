import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "COLREG uyumu",
  shipType: "dokme",
  dept: "guverte",
  opIndex: 20,
  estimatedPages: 14,
  intro: `COLREG 1972 (Denizde Çatışmayı Önleme Kuralları), tüm gemilerde çatışma önlemenin temelidir; look-out, güvenli hız ve doğru manevra esastır. Büyük bulk gemilerinin manevra ataleti yüksektir. Bu bölüm COLREG uygulamasını ele alır.`,
  sources: ["COLREG 1972", "STCW Reg. VIII/2"],
  chapters: [
    {
      heading: "1. Uygulama",
      sections: [
        {
          subheading: "1.1 Look-out ve manevra",
          paragraphs: [
            `Sürekli look-out yapılır; çatışma riski radar/ARPA ve görsel ile değerlendirilir. Erken ve belirgin manevra yapılır; büyük gemide manevranın etkisi gecikmeli olur.`,
          ],
          bullets: [`Sürekli look-out`, `Güvenli hız`, `Erken/belirgin manevra`, `CPA/TCPA değerlendirme`],
        },
      ],
    },
    {
      heading: "2. Kontrol Listesi",
      sections: [
        {
          subheading: "2.1 Son kontrol",
          bullets: [`Look-out yeterli mi?`, `Güvenli hız mı?`, `Manevra erken/belirgin mi?`, `Kayıt tutuldu mu?`],
          paragraphs: [`Büyük bulk gemisinin durma mesafesi uzundur; karar erken verilmelidir.`],
        },
      ],
    },
  ],
};

export default content;
