import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Planned Maintenance System (PMS) — güverte ekipmanları takibi",
  shipType: "konteyner",
  dept: "guverte",
  opIndex: 15,
  estimatedPages: 14,
  intro: `Güverte ekipmanları (LSA, FFA, mooring, lashing, vinçler) PMS kapsamında planlı bakıma tabidir; overdue yönetimi ve kayıt disiplini ISM ve klas denetimlerinin temelidir. Bu bölüm güverte PMS takibini ele alır.`,
  sources: ["ISM Code Element 10", "Class PMS approval"],
  chapters: [
    {
      heading: "1. PMS Disiplini",
      sections: [
        {
          subheading: "1.1 Overdue ve kritik ekipman",
          paragraphs: [
            `Aylık overdue raporu çıkarılır; LSA/FFA gibi kritik güvenlik ekipmanlarının bakımı önceliklidir. İş kayıtları eksiksiz tutulur.`,
          ],
          bullets: [`Aylık overdue raporu`, `LSA/FFA önceliği`, `Eksiksiz iş kaydı`],
        },
      ],
    },
    {
      heading: "2. Kontrol Listesi",
      sections: [
        {
          subheading: "2.1 Son kontrol",
          bullets: [`Overdue raporu çıkarıldı mı?`, `Kritik overdue var mı?`, `Kayıtlar eksiksiz mi?`, `Klas survey'e hazır mı?`],
          paragraphs: [`Kritik güvenlik ekipmanı overdue'su hem ISM NC hem can güvenliği riskidir.`],
        },
      ],
    },
  ],
};

export default content;
