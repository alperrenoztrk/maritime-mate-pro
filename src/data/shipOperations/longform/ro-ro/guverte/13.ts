import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Bakım planı (PMS) ve güverte ekipman bakımı",
  shipType: "ro-ro",
  dept: "guverte",
  opIndex: 13,
  estimatedPages: 14,
  intro: `Güverte ekipmanları (rampa, lashing, LSA/FFA, mooring) PMS kapsamında planlı bakıma tabidir; overdue yönetimi ve kayıt disiplini ISM/klas denetimlerinin temelidir. Bu bölüm güverte PMS'ini ele alır.`,
  sources: ["ISM Code Element 10", "Class PMS approval"],
  chapters: [
    {
      heading: "1. Disiplin",
      sections: [
        {
          subheading: "1.1 Overdue/kritik ekipman",
          paragraphs: [`Aylık overdue raporu çıkarılır; rampa/LSA/FFA gibi kritik ekipman önceliklenir. İş kayıtları eksiksiz tutulur.`],
          bullets: [`Aylık overdue raporu`, `Rampa/LSA/FFA önceliği`, `Eksiksiz kayıt`],
        },
      ],
    },
    {
      heading: "2. Kontrol Listesi",
      sections: [
        {
          subheading: "2.1 Son kontrol",
          bullets: [`Overdue raporu çıkarıldı mı?`, `Kritik overdue var mı?`, `Kayıtlar eksiksiz mi?`, `Survey'e hazır mı?`],
        },
      ],
    },
  ],
};

export default content;
