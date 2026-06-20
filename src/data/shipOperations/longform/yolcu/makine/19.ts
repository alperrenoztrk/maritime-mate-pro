import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "PMS kayıtları ve raporlama",
  shipType: "yolcu",
  dept: "makine",
  opIndex: 19,
  estimatedPages: 14,
  intro: `Planned Maintenance System (PMS); maker aralıklarına uygun bakım, kayıt ve overdue yönetimi ile yürütülür. ISM ve klas denetimlerinin temelidir. Bu bölüm PMS disiplinini ele alır.`,
  sources: ["ISM Code Element 10", "Class PMS approval"],
  chapters: [
    {
      heading: "1. Disiplin",
      sections: [
        {
          subheading: "1.1 Overdue/kayıt",
          paragraphs: [`Aylık overdue raporu çıkarılır; kritik ekipman önceliklenir; iş kayıtları eksiksiz tutulur.`],
          bullets: [`Aylık overdue raporu`, `Kritik ekipman önceliği`, `Eksiksiz kayıt`],
        },
      ],
    },
    {
      heading: "2. Kontrol Listesi",
      sections: [
        {
          subheading: "2.1 Son kontrol",
          bullets: [`Overdue raporu çıkarıldı mı?`, `Kritik overdue var mı?`, `Kayıtlar eksiksiz mi?`, `Rapor dosyalandı mı?`],
        },
      ],
    },
  ],
};

export default content;
