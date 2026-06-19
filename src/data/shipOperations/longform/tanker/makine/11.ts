import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Sintine operasyonu ve MARPOL ORB kaydı",
  shipType: "tanker",
  dept: "makine",
  opIndex: 11,
  estimatedPages: 16,
  intro: `Makine dairesi sintine suyu, 15 ppm yağ ayırıcı (OWS) ile arıtılıp izin verilen koşullarda denize basılabilir; OCM (oil content meter) ve 15 ppm alarmı zorunludur. "Magic pipe" (bypass) ağır kriminal suçtur. Bu bölüm sintine operasyonunu ele alır.`,
  sources: ["MARPOL Annex I Reg. 14, 15", "OWS/OCM maker manuals"],
  chapters: [
    {
      heading: "1. OWS Operasyonu",
      sections: [
        {
          subheading: "1.1 15 ppm ve bölge kuralları",
          paragraphs: [
            `OWS çıkışı OCM ile izlenir; 15 ppm aşılırsa otomatik 3-way valve sintineyi tanka geri yollar. Special area dışında ve kıyıdan uzakta (uygun mesafede) tahliye yapılır.`,
          ],
          bullets: [
            `OCM auto izleme (15 ppm)`,
            `3-way valve geri dönüş`,
            `Special area/mesafe kuralları`,
            `ORB I — Code C, D, E`,
          ],
        },
      ],
    },
    {
      heading: "2. Kriminal Risk",
      sections: [
        {
          subheading: "2.1 Magic pipe",
          paragraphs: [
            `OWS'i bypass eden herhangi bir düzenek (magic pipe) tespit edilirse ağır cezalar ve hapis söz konusudur; ORB I kayıtları fiili durumla tutarlı olmalıdır.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Magic pipe = suç",
              text: `OWS bypass'ı kriminal kovuşturma ve milyonlarca dolar ceza ile sonuçlanır.`,
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
            `OCM kalibre, 15 ppm alarmı çalışıyor mu?`,
            `Tahliye bölge/mesafe kurallarına uygun mu?`,
            `ORB I doğru kodla işlendi mi?`,
            `Bypass düzeneği yok mu?`,
          ],
        },
      ],
    },
  ],
};

export default content;
