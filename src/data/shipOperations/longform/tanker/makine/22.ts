import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "PMS kayıtları ve raporlama",
  shipType: "tanker",
  dept: "makine",
  opIndex: 22,
  estimatedPages: 14,
  intro: `Planned Maintenance System (PMS), klas onaylı bakım rejiminin kanıtıdır; overdue işler ve kritik ekipman bakımları izlenir. ISM Element 10 kapsamında bakım kayıtları denetlenir. Bu bölüm PMS kayıt disiplinini ele alır.`,
  sources: ["Class PMS approval", "ISM Code Element 10"],
  chapters: [
    {
      heading: "1. PMS Disiplini",
      sections: [
        {
          subheading: "1.1 Overdue yönetimi",
          paragraphs: [
            `Aylık overdue raporu çıkarılır; kritik ekipman overdue'ları derhal kapatılır veya gerekçelendirilir. Bakım kayıtları (saat, parça, ölçüm) eksiksiz tutulur.`,
          ],
          bullets: [
            `Aylık overdue raporu`,
            `Kritik ekipman önceliği`,
            `Eksiksiz iş kaydı`,
          ],
        },
      ],
    },
    {
      heading: "2. Denetim",
      sections: [
        {
          subheading: "2.1 ISM ve klas",
          paragraphs: [
            `Kritik ekipman overdue'ları ISM uygunsuzluğu (NC) yaratır; klas survey PMS kayıtlarını esas alır.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Critical overdue",
              text: `Kritik ekipman overdue'su NC ve emniyet riski demektir; öncelikle kapatılır.`,
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
            `Overdue raporu çıkarıldı mı?`,
            `Kritik overdue var mı?`,
            `İş kayıtları eksiksiz mi?`,
            `PMS raporu dosyalandı mı?`,
          ],
        },
      ],
    },
  ],
};

export default content;
