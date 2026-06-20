import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "ISM Safety Management System (SMS) iç denetimi ve kayıtları",
  shipType: "konteyner",
  dept: "guverte",
  opIndex: 13,
  estimatedPages: 16,
  intro: `ISM Code, gemi ve şirket için belgelenmiş bir Safety Management System (SMS) zorunlu kılar; iç denetimler, uygunsuzluk (NC) yönetimi ve düzeltici faaliyetler sistemin canlı kalmasını sağlar. Bu bölüm SMS iç denetimini ele alır.`,
  sources: ["ISM Code", "Company SMS manual"],
  chapters: [
    {
      heading: "1. İç Denetim",
      sections: [
        {
          subheading: "1.1 NC ve düzeltici faaliyet",
          paragraphs: [
            `Planlı iç denetimlerde uygunsuzluklar tespit edilir; kök neden analizi ve düzeltici/önleyici faaliyet (CAPA) ile kapatılır. Kayıtlar izlenebilir olmalıdır.`,
          ],
          bullets: [`Planlı iç denetim`, `NC kök neden analizi`, `CAPA takibi`, `Master review`],
        },
      ],
    },
    {
      heading: "2. Sürekli İyileştirme",
      sections: [
        {
          subheading: "2.1 Raporlama kültürü",
          paragraphs: [
            `Near-miss ve hazard raporlama teşvik edilir; veriler sistemin iyileştirilmesinde kullanılır.`,
          ],
          callouts: [
            { type: "tip", title: "Near-miss", text: `Near-miss raporları kazaların önlenmesinde en değerli erken uyarıdır.` },
          ],
        },
        {
          subheading: "2.2 Kontrol listesi",
          bullets: [`İç denetim yapıldı mı?`, `NC'ler kapatıldı mı?`, `CAPA izleniyor mu?`, `Kayıtlar izlenebilir mi?`],
        },
      ],
    },
  ],
};

export default content;
