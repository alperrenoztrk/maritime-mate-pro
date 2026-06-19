import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Kimyasal/fertilizer yük güvenlik önlemleri",
  shipType: "dokme",
  dept: "guverte",
  opIndex: 25,
  estimatedPages: 16,
  intro: `Bazı dökme yükler (amonyum nitrat bazlı gübre, sülfür, DRI) IMSBC Code Group B kapsamında kimyasal tehlike taşır; self-heating, off-gassing ve yangın riski yönetilmelidir. Bu bölüm Group B güvenlik önlemlerini ele alır.`,
  sources: ["IMSBC Code (Group B)", "Cargo schedule (gemiye özel)"],
  chapters: [
    {
      heading: "1. Tehlikeler",
      sections: [
        {
          subheading: "1.1 Self-heating ve gaz",
          paragraphs: [
            `Group B yüklerde sıcaklık izleme, hold ventilation (cargo schedule'a göre on/off), gas detection ve ateş kaynağı kontrolü uygulanır. Amonyum nitrat tipi yükler yangın/patlama açısından özel önlem ister.`,
          ],
          bullets: [`Yüzey sıcaklığı izleme`, `Ventilation (schedule'a göre)`, `Gas detection (CO vb.)`, `Ateş kaynağı kontrolü`],
        },
      ],
    },
    {
      heading: "2. Güvenlik",
      sections: [
        {
          subheading: "2.1 Cargo schedule",
          paragraphs: [
            `Her yükün IMSBC schedule'ı bağlayıcıdır; ventilasyon ve izleme talimatları harfiyen uygulanır.`,
          ],
          callouts: [
            { type: "warning", title: "Self-heating", text: `Yanlış ventilasyon self-heating'i hızlandırabilir; cargo schedule talimatına uyulur.` },
          ],
        },
        {
          subheading: "2.2 Kontrol listesi",
          bullets: [`Cargo schedule uygulanıyor mu?`, `Sıcaklık izleniyor mu?`, `Ventilasyon doğru mu?`, `Kayıt tutuldu mu?`],
        },
      ],
    },
  ],
};

export default content;
