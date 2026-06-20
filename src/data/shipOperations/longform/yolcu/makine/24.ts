import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Shore power (cold ironing) bağlantısı ve yönetimi",
  shipType: "yolcu",
  dept: "makine",
  opIndex: 24,
  estimatedPages: 16,
  intro: `Shore power (cold ironing/OPS), gemi limanda iken jeneratörler yerine kıyı elektriğine bağlanarak emisyonu ve gürültüyü azaltır; yüksek gerilim bağlantısı titiz prosedür gerektirir. Bu bölüm shore power yönetimini ele alır.`,
  sources: ["IEC/ISO/IEEE 80005-1 (HVSC)", "MARPOL Annex VI", "Port OPS requirements"],
  chapters: [
    {
      heading: "1. Bağlantı",
      sections: [
        {
          subheading: "1.1 HVSC prosedürü",
          paragraphs: [
            `Yüksek gerilim shore connection (HVSC), kablo bağlantısı, topraklama, faz/voltaj senkronizasyonu ve yük transferini içerir; gemi jeneratöründen kıyı gücüne kesintisiz/güvenli geçiş yapılır.`,
          ],
          bullets: [`Kablo bağlantı + topraklama`, `Faz/voltaj uyumu`, `Yük transferi`, `Acil ayırma prosedürü`],
        },
      ],
    },
    {
      heading: "2. Güvenlik ve Kontrol",
      sections: [
        {
          subheading: "2.1 Yüksek gerilim güvenliği",
          paragraphs: [`HVSC yüksek gerilim taşır; interlock, topraklama ve LOTO disiplinine kesin uyulur. Acil ayırma hazır tutulur.`],
          callouts: [
            { type: "warning", title: "Yüksek gerilim", text: `HVSC bağlantısında interlock/topraklama atlanırsa ölümcül elektrik riski oluşur.` },
          ],
        },
        {
          subheading: "2.2 Kontrol listesi",
          bullets: [`Topraklama/interlock sağlandı mı?`, `Faz/voltaj uyumlu mu?`, `Yük transferi sorunsuz mu?`, `Acil ayırma hazır mı?`],
        },
      ],
    },
  ],
};

export default content;
