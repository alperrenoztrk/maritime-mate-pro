import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Shear force / bending moment (SF/BM) hesabı ve limit kontrolü",
  shipType: "konteyner",
  dept: "guverte",
  opIndex: 16,
  estimatedPages: 16,
  intro: `Konteyner gemisinin gövde mukavemeti, her yükleme/balast adımında shear force, bending moment ve torsion limitlerine uyumu gerektirir. Aşırı sagging/hogging ve torsion uzun vadede çatlaklara yol açar. Bu bölüm SF/BM kontrolünü ele alır.`,
  sources: ["Loading manual", "Class hull strength limits"],
  chapters: [
    {
      heading: "1. Mukavemet Yönetimi",
      sections: [
        {
          subheading: "1.1 Sagging/hogging ve torsion",
          paragraphs: [
            `Yük dağılımı sagging/hogging dengesini belirler; konteyner gemilerinde açık güverte yapısı nedeniyle torsion da kritiktir. Loading computer her adımda %100 limitin altını doğrular.`,
          ],
          bullets: [`SF/BM %100 altında`, `Torsion kontrolü`, `%85 üzeri revizyon`],
        },
      ],
    },
    {
      heading: "2. Kontrol Listesi",
      sections: [
        {
          subheading: "2.1 Son kontrol",
          bullets: [`SF/BM limit altında mı?`, `Torsion kontrol edildi mi?`, `Ara adımlar doğrulandı mı?`, `Çıktı saklandı mı?`],
          paragraphs: [`MOL Comfort vakası, mukavemet limitlerinin ihmalinin gemi kaybına kadar gidebileceğini göstermiştir.`],
        },
      ],
    },
  ],
};

export default content;
