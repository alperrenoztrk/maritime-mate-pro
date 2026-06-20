import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Yük planı hazırlama ve trim/stabilite hesabı",
  shipType: "dokme",
  dept: "guverte",
  opIndex: 2,
  estimatedPages: 20,
  intro: `Dökme yük planı; IMSBC Code'a göre yük dağılımını, yükleme sırasını (loading sequence) ve her aşamada SF/BM ile GM kontrolünü içerir. Hatalı sıra, özellikle alternate hold yüklemede, gemi mukavemetini aşabilir. Bu bölüm bulk yük planını ele alır.`,
  sources: ["IMSBC Code", "BLU Code", "Loading manual (Class onaylı)"],
  chapters: [
    {
      heading: "1. Yük Dağılımı",
      sections: [
        {
          subheading: "1.1 IMSBC ve loading sequence",
          paragraphs: [
            `Yük grup (A/B/C), stowage factor ve density'ye göre dağıtılır; loading sequence loading manual onaylı sınırlar içinde planlanır. Alternate hold yüklemede shear force kritik noktaya ulaşabilir.`,
          ],
          bullets: [`IMSBC grup/SF`, `Onaylı loading sequence`, `Alternate hold sınırları`],
        },
      ],
    },
    {
      heading: "2. SF/BM ve GM",
      sections: [
        {
          subheading: "2.1 Adım adım kontrol",
          paragraphs: [
            `Her yükleme adımı loadicator'da SF/BM ve GM açısından doğrulanır; %85 üzeri revizyon işaretidir. Çıktılar saklanır.`,
          ],
          callouts: [
            { type: "warning", title: "Alternate hold riski", text: `Onaysız alternate hold yüklemesi shear force aşımı ve yapısal hasara yol açar.` },
          ],
        },
        {
          subheading: "2.2 Kontrol listesi",
          bullets: [`Loading sequence onaylı mı?`, `SF/BM/GM limit içinde mi?`, `Ara adımlar kontrol edildi mi?`, `Çıktı saklandı mı?`],
        },
      ],
    },
  ],
};

export default content;
