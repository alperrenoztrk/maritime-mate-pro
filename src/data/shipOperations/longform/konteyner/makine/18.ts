import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "PMS kayıtları, job order ve raporlama (maker's manual uyumlu)",
  shipType: "konteyner",
  dept: "makine",
  opIndex: 18,
  estimatedPages: 14,
  intro: `Planned Maintenance System (PMS); maker's manual aralıklarına uygun job order, kayıt ve raporlama ile yürütülür. Overdue yönetimi ISM ve klas denetimlerinin temelidir. Bu bölüm PMS kayıt disiplinini ele alır.`,
  sources: ["ISM Code Element 10", "Class PMS approval", "Maker manuals"],
  chapters: [
    {
      heading: "1. PMS Disiplini",
      sections: [
        {
          subheading: "1.1 Job order ve overdue",
          paragraphs: [
            `İşler maker aralığına göre planlanır; iş kayıtları (saat, parça, ölçüm) eksiksiz tutulur. Aylık overdue raporu çıkarılır ve kritik overdue önceliklenir.`,
          ],
          bullets: [`Maker aralığına uyum`, `Eksiksiz iş kaydı`, `Aylık overdue raporu`],
        },
      ],
    },
    {
      heading: "2. Kontrol Listesi",
      sections: [
        {
          subheading: "2.1 Son kontrol",
          bullets: [`İşler maker aralığında mı?`, `Kayıtlar eksiksiz mi?`, `Kritik overdue var mı?`, `Rapor dosyalandı mı?`],
        },
      ],
    },
  ],
};

export default content;
