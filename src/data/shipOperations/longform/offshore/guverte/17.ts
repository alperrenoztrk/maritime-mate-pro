import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "AHTS anchor handling ve tow-tension operasyonu",
  shipType: "offshore",
  dept: "guverte",
  opIndex: 17,
  estimatedPages: 22,
  intro: `Anchor Handling Tug Supply (AHTS) operasyonunda gemi, anchor veya tow wire üzerindeki büyük yatay kuvveti karşılarken mevkisini, başını, stabilitesini ve güverte çalışma alanını kontrol altında tutmalıdır. Tow wire yatay bileşeni DP'nin kullanılabilir thrust marjını tüketebilir; güvertede snap-back ve line-of-fire ölümcül tehlikedir. Bu bölüm anchor handling'in DP ve güverte yönlerini ele alır.`,
  sources: [
    "IMCA M103",
    "Vessel anchor handling manual",
    "Rig move procedure",
    "Approved stability booklet",
  ],
  chapters: [
    {
      heading: "1. Planlama ve Kuvvet Hesabı",
      sections: [
        {
          subheading: "1.1 Yatay kuvvetin DP'ye etkisi",
          bullets: [
            `Rig move/anchor pattern, bollard pull, line tension, water depth, catenary ve seabed engelleri`,
            `Tow/anchor kuvvetini DP capability hesabına dahil et`,
            `Thrust ve güç marjını WCF sonrası için de kontrol et`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Marjı tüketen tension",
              text: `Tow wire yatay bileşeni DP'nin kullanılabilir thrust marjını tüketebilir; hesaba katılmazsa station-keeping bozulur.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. Güverte Güvenliği ve Kontrol",
      sections: [
        {
          subheading: "2.1 Ekipman testi ve komut düzeni",
          bullets: [
            `Shark jaw, towing pin, winch, load cell, stern roller ve acil bırakma sistemlerini test et`,
            `DPO, winch operator, deck foreman ve tesis arasında standart komut/teyit düzeni kur`,
            `High tension altında line-of-fire alanını boş tut`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Snap-back ve bight",
              text: `Güvertede snap-back, bight ve line-of-fire alanları ölümcül tehlikedir; wire yönü ve tension değişimi sürekli izlenir.`,
            },
          ],
        },
        {
          subheading: "2.2 Acil bırakma",
          paragraphs: [
            `Aşırı tension, stabilite limiti, power/thruster bozulması veya komut kaybında emergency release/abort planı uygulanır.`,
          ],
        },
      ],
    },
    {
      heading: "3. Kontrol Listesi",
      sections: [
        {
          subheading: "3.1 Anchor handling son kontrol",
          bullets: [
            `Tow/anchor kuvveti DP capability'ye dahil edildi mi?`,
            `Acil bırakma sistemleri test edildi mi?`,
            `Line-of-fire alanı boş ve komut düzeni net mi?`,
            `Stability calculation ve winch/tension log tutuluyor mu?`,
          ],
        },
      ],
    },
  ],
};

export default content;
