import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Notice to Mariners ve harita düzeltmeleri",
  shipType: "tanker",
  dept: "guverte",
  opIndex: 29,
  estimatedPages: 14,
  intro: `Güncel olmayan harita, seyir güvenliğinin en temel zafiyetlerinden biridir ve PSC detention sebebidir. Haftalık Notice to Mariners (NtM) ile hem kâğıt hem ECDIS haritaları güncel tutulur. Bu bölüm harita düzeltme disiplinini ele alır.`,
  sources: ["SOLAS V/27 (charts and publications up to date)"],
  chapters: [
    {
      heading: "1. Düzeltme Süreci",
      sections: [
        {
          subheading: "1.1 Kâğıt ve ECDIS",
          paragraphs: [
            `Kâğıt haritalarda düzeltmeler standart yöntemle (violet ink) işlenir; ECDIS'te ENC update uygulanır. T&P (temporary & preliminary) notices da takip edilir.`,
          ],
          bullets: [
            `Haftalık NtM uygulama`,
            `ENC update + chart correction log`,
            `T&P notices takibi`,
          ],
        },
      ],
    },
    {
      heading: "2. Denetim",
      sections: [
        {
          subheading: "2.1 Güncellik kanıtı",
          paragraphs: [
            `Chart correction log, harita güncelliğinin kanıtıdır; PSC bu kaydı ve son uygulanan NtM numarasını sorabilir.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "SOLAS V/27",
              text: `Haritalar ve yayınlar güncel tutulmak zorundadır; eksiklik detention sebebidir.`,
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
            `Son NtM uygulandı mı?`,
            `ENC update yapıldı mı?`,
            `T&P notices işlendi mi?`,
            `Chart correction log güncel mi?`,
          ],
        },
      ],
    },
  ],
};

export default content;
