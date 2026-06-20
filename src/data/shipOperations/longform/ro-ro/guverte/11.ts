import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Tehlikeli araç (DG taşıyan) yerleştirme ve beyan",
  shipType: "ro-ro",
  dept: "guverte",
  opIndex: 11,
  estimatedPages: 16,
  intro: `Tehlikeli yük taşıyan araçlar (DG vehicles), IMDG Code'a göre beyan, segregation ve yerleştirme kurallarına tabidir; yakıt taşıyan tankerler ve patlayıcı yükler özel önlem ister. Bu bölüm DG araç yönetimini ele alır.`,
  sources: ["IMDG Code", "SOLAS VII", "IMO MSC.1/Circ (Ro-Ro DG)"],
  chapters: [
    {
      heading: "1. Yerleştirme ve Beyan",
      sections: [
        {
          subheading: "1.1 Segregation ve erişim",
          paragraphs: [
            `DG araçlar beyan edilir, segregation table'a uyularak yerleştirilir; havalandırma, yangın erişimi ve EmS hazırlığı sağlanır. Araç motorları stowage sonrası kapatılır.`,
          ],
          bullets: [`DG beyanı + manifest`, `Segregation`, `Ventilasyon/yangın erişimi`, `EmS`],
        },
      ],
    },
    {
      heading: "2. Güvenlik ve Kontrol",
      sections: [
        {
          subheading: "2.1 Risk",
          paragraphs: [`Kapalı araç güvertesinde DG yangını hızla yayılır; segregation ve erişim ihmal edilmez.`],
          callouts: [
            { type: "warning", title: "DG yangını", text: `Araç güvertesinde DG kaynaklı yangın kontrol edilmesi en zor senaryolardandır.` },
          ],
        },
        {
          subheading: "2.2 Kontrol listesi",
          bullets: [`DG beyan edildi mi?`, `Segregation sağlandı mı?`, `Ventilasyon/erişim uygun mu?`, `EmS hazır mı?`],
        },
      ],
    },
  ],
};

export default content;
