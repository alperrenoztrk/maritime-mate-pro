import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "STS (Ship-to-Ship) transfer planı ve operasyonu",
  shipType: "tanker",
  dept: "guverte",
  opIndex: 18,
  estimatedPages: 22,
  intro: `Ship-to-Ship (STS) transfer; iki tankerin açık deniz/demir sahasında yan yana gelerek kargo aktarmasıdır. Mooring, fender (Yokohama), hortum bağlantısı ve kargo transferi yüksek risk taşır; bir POAC (Person in Overall Advisory Control) operasyonu yönetir. Bu bölüm STS plan ve uygulamasını ele alır.`,
  sources: ["MARPOL Annex I Reg. 40-42", "OCIMF/ICS Ship-to-Ship Transfer Guide", "ISGOTT"],
  chapters: [
    {
      heading: "1. Planlama ve Risk Değerlendirme",
      sections: [
        {
          subheading: "1.1 STS plan ve POAC",
          paragraphs: [
            `STS operasyonu onaylı bir STS plan ve risk assessment ile yürütülür. POAC genel istişari kontrolü üstlenir; iki geminin Master'ları kendi gemilerinin sorumluluğunu korur. Hava/deniz limitleri ve abort kriterleri önceden tanımlanır.`,
          ],
          bullets: [
            `STS plan + risk assessment`,
            `POAC ataması`,
            `Hava/deniz limitleri ve abort kriterleri`,
            `Pre-transfer notification (kıyı devletine)`,
          ],
        },
      ],
    },
    {
      heading: "2. Yanaşma, Mooring ve Hortum",
      sections: [
        {
          subheading: "2.1 Fender ve mooring",
          paragraphs: [
            `Yokohama fender'lar ve mooring pattern, iki geminin güvenli mesafede tutulmasını sağlar. Yanaşma manevrası düşük hızda, kontrollü yapılır. Hortum bağlantısı sonrası leak test yapılır.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Hortum kopması",
              text: `STS'te hortum kopması büyük çaplı deniz kirliliği yaratır; bağlantı, izleme ve abort hazırlığı titizdir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. Transfer ve İzleme",
      sections: [
        {
          subheading: "3.1 Eşgüdümlü kontrol",
          paragraphs: [
            `Transfer süresince her iki gemide rate, basınç, mooring gerginliği ve hava izlenir; abort kriteri aşılırsa ESD ile güvenli durdurma yapılır.`,
          ],
        },
      ],
    },
    {
      heading: "4. Kontrol Listesi",
      sections: [
        {
          subheading: "4.1 Son kontrol",
          bullets: [
            `STS plan + risk assessment onaylı mı?`,
            `POAC ve haberleşme tanımlı mı?`,
            `Fender/mooring/hortum doğrulandı mı?`,
            `Pre-transfer notification yapıldı mı?`,
          ],
        },
      ],
    },
  ],
};

export default content;
