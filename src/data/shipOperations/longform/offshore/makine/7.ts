import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Soğutma, yakıt, starting air ve yardımcı sistem yedekliliği",
  shipType: "offshore",
  dept: "makine",
  opIndex: 7,
  estimatedPages: 20,
  intro: `DP plant'in en sinsi tek hata kaynağı, güç üreten ekipmanın kendisi değil, onları besleyen ortak yardımcı sistemlerdir. Ortak kirli fuel veya ortak cooling header, iki yedek grubu aynı anda kaybettirebilir; standby pompanın kapalı valf nedeniyle devreye girmemesi hidden failure'dır. Bu bölüm yardımcı sistem yedekliliğini ele alır.`,
  sources: [
    "IMCA M206",
    "IMCA M166",
    "IMCA M247",
    "Vessel CAMO",
  ],
  chapters: [
    {
      heading: "1. Ortak Sistem Sınırları",
      sections: [
        {
          subheading: "1.1 Cooling / fuel / air line-up",
          bullets: [
            `Sea-water ve fresh-water cooling hatlarını redundant group sınırlarına göre line-up et`,
            `Fuel service/day tank, transfer, quick-closing valve ve purifier bağımlılıklarını FMEA ile karşılaştır`,
            `Starting air receiver, compressor ve cross-connection'ların tek arızada yeterli kaldığını doğrula`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Ortak header / kirli fuel",
              text: `Ortak kirli fuel veya ortak cooling header iki yedek grubu aynı anda kaybettirebilir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. Standby ve Bölme Sınırları",
      sections: [
        {
          subheading: "2.1 Auto-start ve ventilation",
          paragraphs: [
            `Duty/standby pump auto-start, low pressure, high temperature ve strainer differential alarmı test edilir. Ventilation, fire damper ve machinery-space flooding sınırlarının redundant group'lara etkisi kontrol edilir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Devreye girmeyen standby",
              text: `Standby pompanın selector veya kapalı valf nedeniyle otomatik devreye girmemesi hidden failure'dır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. Kontrol Listesi",
      sections: [
        {
          subheading: "3.1 Yardımcı sistem son kontrol",
          bullets: [
            `Cooling/fuel/air hatları grup sınırlarına göre line-up mı?`,
            `Standby pump auto-start test edildi mi?`,
            `Starting air tek arızada yeterli mi?`,
            `Ventilation/fire damper etkisi değerlendirildi mi?`,
          ],
        },
      ],
    },
  ],
};

export default content;
