import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "SIRE inspeksiyon hazırlığı ve VPQ güncelleme",
  shipType: "tanker",
  dept: "guverte",
  opIndex: 10,
  estimatedPages: 18,
  intro: `OCIMF SIRE (Ship Inspection Report Programme) inspeksiyonu, tankerin kiralanabilirliğini doğrudan etkileyen kritik bir denetimdir. SIRE 2.0 ile denetim daha çok davranış-temelli ve dijital hale geldi. Bu bölüm VPQ/HVPQ güncellemesi, self-assessment ve gemi kondisyonu hazırlığını ele alır.`,
  sources: ["OCIMF SIRE 2.0", "OCIMF VIQ", "TMSA (Tanker Management and Self Assessment)"],
  chapters: [
    {
      heading: "1. SIRE 2.0 Yaklaşımı",
      sections: [
        {
          subheading: "1.1 Davranış + dijital denetim",
          paragraphs: [
            `SIRE 2.0; sabit soru setinden, gemiye/duruma özel dinamik soru setine ve denetçinin tablet üzerinden gerçek zamanlı raporlamasına geçti. Hardware, process ve human (davranış) boyutları ayrı ayrı değerlendirilir.`,
          ],
          bullets: [
            `Gemiye özel dinamik soru seti`,
            `Hardware / process / human boyutları`,
            `Fotoğraf ve gerçek zamanlı kayıt`,
          ],
        },
      ],
    },
    {
      heading: "2. Hazırlık Adımları",
      sections: [
        {
          subheading: "2.1 VPQ/HVPQ ve self-assessment",
          paragraphs: [
            `VPQ (Vessel Particulars Questionnaire) ve HVPQ güncel tutulur; SIRE 2.0 chapter'ları üzerinden self-assessment yapılır. Önceki PSC/SIRE bulguları kapatılmış ve kanıtlanmış olmalıdır.`,
          ],
        },
        {
          subheading: "2.2 Crew ve kondisyon",
          paragraphs: [
            `Crew matrix, eğitim kayıtları, sertifikalar ve familiarization kanıtları hazırlanır. Güverte/manifold temizliği, etiketleme, SOPEP ekipmanı ve emniyet ekipmanı kontrol edilir.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Major observation = kira riski",
              text: `Tek bir major observation gemiyi kiralama dışı bırakabilir; hazırlık titiz ve kanıt-temelli olmalıdır.`,
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
            `VPQ/HVPQ güncel mi?`,
            `Önceki bulgular kapatıldı, kanıt var mı?`,
            `Crew matrix + eğitim kayıtları tam mı?`,
            `Internal pre-SIRE checklist dolduruldu mu?`,
          ],
        },
      ],
    },
  ],
};

export default content;
