import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Araç güvertesi ventilasyon planlaması",
  shipType: "ro-ro",
  dept: "guverte",
  opIndex: 19,
  estimatedPages: 14,
  intro: `Araç güvertelerinde çalışan motorlar karbonmonoksit (CO) ve egzoz üretir; zorunlu ventilasyon, hem personel sağlığı hem patlayıcı buhar kontrolü için kritiktir. Bu bölüm ventilasyon planlamasını ele alır (güverte tarafı).`,
  sources: ["SOLAS II-2 Reg. 20 (vehicle spaces)", "Class ventilation requirements"],
  chapters: [
    {
      heading: "1. Ventilasyon",
      sections: [
        {
          subheading: "1.1 CO ve egzoz",
          paragraphs: [
            `Araç elleçleme sırasında ventilasyon tam kapasite çalışır; CO seviyeleri izlenir. Kapalı güvertede yetersiz ventilasyon ölümcül CO birikimi yapar.`,
          ],
          bullets: [`Tam kapasite ventilasyon`, `CO izleme`, `Yakıt buharı kontrolü`],
        },
      ],
    },
    {
      heading: "2. Güvenlik ve Kontrol",
      sections: [
        {
          subheading: "2.1 CO riski",
          paragraphs: [`Çalışan motorlar hızla CO biriktirir; ventilasyon olmadan personel girişi tehlikelidir.`],
          callouts: [
            { type: "warning", title: "CO birikimi", text: `Yetersiz ventilasyonda CO ölümcüldür; elleçleme boyunca ventilasyon tam çalışmalıdır.` },
          ],
        },
        {
          subheading: "2.2 Kontrol listesi",
          bullets: [`Ventilasyon tam kapasite mi?`, `CO izleniyor mu?`, `Fanlar çalışıyor mu?`, `Kayıt tutuldu mu?`],
        },
      ],
    },
  ],
};

export default content;
