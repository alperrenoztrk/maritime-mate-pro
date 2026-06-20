import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Kompresör (hava, IGS) bakımı",
  shipType: "tanker",
  dept: "makine",
  opIndex: 23,
  estimatedPages: 14,
  intro: `Starting air, control air ve IGS hava kompresörleri; drain, intercooler ve safety valve bakımı ile güvenli çalışır. Basınçlı hava enjeksiyonu ciddi yaralanma yapar. Bu bölüm kompresör bakımını ele alır.`,
  sources: ["Class Rules", "Compressor maker manuals"],
  chapters: [
    {
      heading: "1. Bakım",
      sections: [
        {
          subheading: "1.1 Drain, intercooler, safety valve",
          paragraphs: [
            `Otomatik drain, intercooler temizliği ve safety valve testi düzenli yapılır; hava şişesi (air bottle) periyodik iç muayeneye tabidir. Yağ taşıması (oil carry-over) yangın/patlama riski yaratır.`,
          ],
          bullets: [
            `Drain + intercooler`,
            `Safety valve testi`,
            `Air bottle inspection`,
          ],
        },
      ],
    },
    {
      heading: "2. Güvenlik",
      sections: [
        {
          subheading: "2.1 Hava enjeksiyonu",
          paragraphs: [
            `Basınçlı hava cilde enjekte olabilir; bakımda sistem boşaltılır ve izolasyon uygulanır.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Compressed air injection",
              text: `Basınçlı hava ciddi yaralanma yapar; bakım öncesi basınç boşaltılır.`,
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
            `Drain/intercooler yapıldı mı?`,
            `Safety valve test edildi mi?`,
            `Air bottle muayenesi güncel mi?`,
            `Kayıt tutuldu mu?`,
          ],
        },
      ],
    },
  ],
};

export default content;
