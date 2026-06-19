import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Bay planı (stowage plan) inceleme ve Chief Officer onayı",
  shipType: "konteyner",
  dept: "guverte",
  opIndex: 2,
  estimatedPages: 18,
  intro: `Bay planı (stowage plan), konteynerlerin bay-row-tier düzeninde yerleşimini gösterir; ağırlık dağılımı, reefer/IMDG/OOG pozisyonları ve liman boşaltma sırası (discharge sequence) burada yönetilir. Chief Officer planı stabilite/mukavemet ve emniyet açısından onaylar. Bu bölüm bay planı incelemesini ele alır.`,
  sources: ["SOLAS VI/2 (cargo information)", "CSS Code", "Vessel stowage software"],
  chapters: [
    {
      heading: "1. Plan İncelemesi",
      sections: [
        {
          subheading: "1.1 Ağırlık ve özel konteynerler",
          paragraphs: [
            `Ağır konteynerlerin alt tier'lara, hafiflerin üste yerleştirildiği doğrulanır; VGM (Verified Gross Mass) ile beyan edilen ağırlıklar plana yansır. Reefer plug pozisyonları, IMDG segregation ve OOG konumları kontrol edilir.`,
          ],
          bullets: [`VGM uyumu`, `Ağır alt / hafif üst`, `Reefer plug pozisyonları`, `IMDG segregation / OOG`],
        },
      ],
    },
    {
      heading: "2. Onay ve Stabilite",
      sections: [
        {
          subheading: "2.1 Yazılım kontrolü",
          paragraphs: [
            `Plan stowage yazılımına yüklenir; GM, SF/BM, torsion ve liste değerleri kontrol edilir. Limit aşımı varsa plan revize edilir ve Chief Officer onayı sonrası terminale iletilir.`,
          ],
          callouts: [
            { type: "warning", title: "Yanlış VGM", text: `Hatalı VGM, gerçek dışı stabilite hesabı ve container kaybı riski yaratır (SOLAS VI/2 zorunlu).` },
          ],
        },
        {
          subheading: "2.2 Kontrol listesi",
          bullets: [`VGM plana yansıdı mı?`, `Stabilite/mukavemet limitleri içinde mi?`, `Özel konteyner pozisyonları doğru mu?`, `Chief Officer onayı verildi mi?`],
        },
      ],
    },
  ],
};

export default content;
