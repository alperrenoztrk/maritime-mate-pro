import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Tanker güvenlik kontrol listesi (pre-transfer)",
  shipType: "tanker",
  dept: "guverte",
  opIndex: 15,
  estimatedPages: 16,
  intro: `Ship/Shore Safety Checklist (SSSCL), tanker transferinin temel güvenlik bariyeridir; gemi ve terminal, her maddeyi karşılıklı doğrulayıp imzalar. Bazı maddeler periyodik olarak yeniden teyit edilir (repetitive items). Bu bölüm checklist'in doğru kullanımını ele alır.`,
  sources: ["ISGOTT 6th edition — Ship/Shore Safety Checklist"],
  chapters: [
    {
      heading: "1. Checklist Mantığı",
      sections: [
        {
          subheading: "1.1 Karşılıklı doğrulama",
          paragraphs: [
            `SSSCL, "ben doldurdum" değil "birlikte doğruladık" mantığıyla çalışır. Her madde fiziksel olarak kontrol edilir; A (anlaşma), P (kontrol edildi), R (tekrarlanan) kodlarıyla işaretlenir.`,
          ],
          bullets: [
            `Her madde fiziksel doğrulama`,
            `Repetitive item'lar süreyle yeniden teyit`,
            `Karşılıklı imza`,
          ],
        },
      ],
    },
    {
      heading: "2. Sorun Durumunda",
      sections: [
        {
          subheading: "2.1 Transferi durdurma",
          paragraphs: [
            `Bir madde sağlanamıyorsa transfere başlanmaz veya başlamış transfer durdurulur. Eksik/yanlış doldurulmuş checklist hem güvenlik riski hem PSC detention sebebidir.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "ISGOTT",
              text: `Checklist tamamlanmadan transfer başlatılamaz; repetitive maddeler belirlenen aralıklarla yeniden teyit edilir.`,
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
            `Tüm maddeler karşılıklı doğrulandı mı?`,
            `Repetitive item programı belirlendi mi?`,
            `İmzalar tam mı?`,
            `Sorunlu madde varsa transfer durduruldu mu?`,
          ],
        },
      ],
    },
  ],
};

export default content;
