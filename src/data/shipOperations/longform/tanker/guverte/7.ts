import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Boşaltma operasyonu (discharge rate, stripping)",
  shipType: "tanker",
  dept: "guverte",
  opIndex: 7,
  estimatedPages: 18,
  intro: `Boşaltma; cargo pompalarıyla ana tahliye ve stripping (eductor/stripper pompası) ile dip temizliğinden oluşur. Pompa priming, line-up, terminal rate limiti, kavitasyon önleme ve ROB (remaining on board) ölçümü bu operasyonun belkemiğidir. Bu bölüm güvenli ve eksiksiz boşaltmayı ele alır.`,
  sources: ["ISGOTT 6th edition", "MARPOL Annex I", "Pump maker manuals"],
  chapters: [
    {
      heading: "1. Boşaltma Hazırlığı",
      sections: [
        {
          subheading: "1.1 Line-up ve priming",
          paragraphs: [
            `Boşaltmadan önce pompa-hat-valf hattı (line-up) doğrulanır; yanlış valf konumu kontaminasyon veya basınç şoku yaratır. Pompa priming ile hava boşaltılır, kavitasyon önlenir.`,
          ],
          bullets: [
            `Valf line-up çapraz kontrol`,
            `Pompa priming, hava tahliyesi`,
            `IGS pozitif basınç korunur`,
          ],
        },
      ],
    },
    {
      heading: "2. Boşaltma ve Stripping",
      sections: [
        {
          subheading: "2.1 Rate ve kavitasyon",
          paragraphs: [
            `Discharge rate terminal kabul limitini aşmaz. Tank seviyesi düştükçe pompa emiş şartları zorlaşır; kavitasyon (vakum kaynaklı buhar kabarcığı) pompayı tahrip eder. Bu nedenle son aşamada rate düşürülür ve stripping devreye alınır.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Kavitasyon",
              text: `Düşük seviyede yüksek rate kavitasyon yapar; pompa bearing/impeller hasarı pahalıdır. Stripping'e zamanında geçilir.`,
            },
          ],
        },
        {
          subheading: "2.2 Stripping ve ROB",
          paragraphs: [
            `Eductor veya stripper pompası ile tank dipleri ve hatlar son kez süpürülür. Boşaltma sonunda her tankta kalan miktar (ROB) ölçülür ve raporlanır; yüksek ROB ticari kayıp ve cargo claim sebebidir.`,
          ],
        },
      ],
    },
    {
      heading: "3. Kayıt ve Kontrol Listesi",
      sections: [
        {
          subheading: "3.1 Son kontrol",
          bullets: [
            `Line-up doğrulandı, priming yapıldı mı?`,
            `Discharge rate terminal limitinde mi?`,
            `Stripping tamamlandı, ROB ölçüldü mü?`,
            `Discharge log + ROB report düzenlendi mi?`,
          ],
        },
      ],
    },
  ],
};

export default content;
