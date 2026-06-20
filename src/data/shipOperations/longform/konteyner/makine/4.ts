import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Bilge water separator (OWS) ile sintine suyu işleme ve ORB I kaydı",
  shipType: "konteyner",
  dept: "makine",
  opIndex: 4,
  estimatedPages: 16,
  intro: `Makine dairesi sintine suyu, 15 ppm OWS ile arıtılıp izin verilen koşullarda denize basılabilir; OCM ve 15 ppm alarmı zorunludur. "Magic pipe" ağır kriminal suçtur. Bu bölüm OWS operasyonunu ele alır.`,
  sources: ["MARPOL Annex I Reg. 14, 15", "OWS/OCM maker manuals"],
  chapters: [
    {
      heading: "1. OWS Operasyonu",
      sections: [
        {
          subheading: "1.1 15 ppm ve kurallar",
          paragraphs: [
            `OCM 15 ppm'i aşarsa 3-way valve sintineyi tanka geri yollar; tahliye special area dışında ve uygun mesafede yapılır. ORB I'a doğru kodla işlenir.`,
          ],
          bullets: [`OCM auto (15 ppm)`, `3-way valve geri dönüş`, `ORB I — Code C, D, E`],
        },
      ],
    },
    {
      heading: "2. Kriminal Risk",
      sections: [
        {
          subheading: "2.1 Magic pipe",
          paragraphs: [
            `OWS bypass'ı ağır cezalı kriminal suçtur; ORB I kayıtları fiili durumla tutarlı olmalıdır.`,
          ],
          callouts: [
            { type: "warning", title: "Magic pipe", text: `Bypass tespiti milyonlarca dolar ceza ve hapis ile sonuçlanır.` },
          ],
        },
        {
          subheading: "2.2 Kontrol listesi",
          bullets: [`OCM kalibre mi?`, `Bölge/mesafe uygun mu?`, `ORB I işlendi mi?`, `Bypass yok mu?`],
        },
      ],
    },
  ],
};

export default content;
