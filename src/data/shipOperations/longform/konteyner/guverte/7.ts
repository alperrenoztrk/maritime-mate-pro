import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Yükleme/boşaltma öncesi stability booklet uyumlu GM hesabı ve SF/BM limitleri",
  shipType: "konteyner",
  dept: "guverte",
  opIndex: 7,
  estimatedPages: 18,
  intro: `Konteyner gemilerinde GM ve SF/BM (shear force / bending moment) ile birlikte torsion yönetimi kritiktir; aşırı stiff gemi parametric rolling, aşırı tender gemi liste riski yaratır. Stability booklet ve loading computer her aşamada referanstır. Bu bölüm GM/SF/BM kontrolünü ele alır.`,
  sources: ["IS Code 2008", "Stability booklet (gemiye özel)", "Loading manual"],
  chapters: [
    {
      heading: "1. GM Yönetimi",
      sections: [
        {
          subheading: "1.1 Optimum aralık",
          paragraphs: [
            `GM, IS Code minimumunun üzerinde ama parametric rolling'i tetiklemeyecek optimum aralıkta tutulur. Çok yüksek GM kısa periyotlu sert yalpa ile lashing'i zorlar.`,
          ],
          table: {
            caption: "GM etkisi",
            headers: ["Durum", "Etki"],
            rows: [
              ["Çok yüksek GM (stiff)", "Sert yalpa, parametric rolling, lashing zorlanması"],
              ["Çok düşük GM (tender)", "Uzun yalpa, liste riski"],
            ],
          },
        },
      ],
    },
    {
      heading: "2. SF/BM/Torsion",
      sections: [
        {
          subheading: "2.1 Limit kontrolü",
          paragraphs: [
            `Her yükleme adımında SF/BM ve torsion %100 limitin altında tutulur; %85 üzeri alarm bandıdır ve sıra revize edilir.`,
          ],
          callouts: [
            { type: "regulation", title: "IS Code", text: `Hiçbir ara aşamada intact stability kriterleri ihlal edilemez; çıktılar saklanır.` },
          ],
        },
        {
          subheading: "2.2 Kontrol listesi",
          bullets: [`GM optimum aralıkta mı?`, `SF/BM/torsion limit altında mı?`, `Ara aşamalar kontrol edildi mi?`, `Çıktı saklandı mı?`],
        },
      ],
    },
  ],
};

export default content;
