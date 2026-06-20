import type { ShipSystemLongForm } from "../types";

const content: ShipSystemLongForm = {
  title: "Crude Oil Washing (COW) Sistemi",
  sectionId: "cargo-systems",
  topicIndex: 1,
  estimatedPages: 24,
  intro: `Crude Oil Washing (COW), ham petrol tankerlerinde tankları suyla değil, basınçlı ham petrolün kendisiyle yıkayarak tank dibindeki tortu (clingage/sludge) birikimini azaltan, hem kargo verimini artıran hem de deniz kirliliğini (slop) düşüren MARPOL gereği bir sistemdir. Bu bölüm; COW prensibini ve neden ham petrolle yıkandığını, tank yıkama makinelerini (programmable fixed machines), inert atmosfer zorunluluğunu (≤%8 O₂), yıkama programı ve aşamalarını (top/bottom wash), oksijen izleme ve emniyet bariyerlerini ve bakım/arızayı mühendislik derinliğinde ele alır.`,
  sources: [
    "MARPOL Annex I Reg. 33-35 — COW requirements",
    "IMO COW Operations and Equipment Manual",
    "ISGOTT 6th edition — tank cleaning & COW",
    "Klas kuralları — tank washing machines",
  ],
  chapters: [
    {
      heading: "1. COW Prensibi",
      sections: [
        {
          subheading: "1.1 Neden ham petrolle yıkanır?",
          paragraphs: [
            `Ham petrol kendi tortusunu çözen bir çözücüdür; tank duvarına yapışan ağır kalıntı (clingage), basınçlı ham petrol jetleriyle çözülüp kargo ile birlikte boşaltılır. Bu, su ile yıkamaya göre çok daha az atık (slop) üretir ve daha fazla kargonun terminale gitmesini (outturn artışı) sağlar.`,
          ],
          bullets: [
            `Ham petrol = doğal çözücü, tortuyu çözer`,
            `Daha az slop → daha az kirlilik`,
            `Daha yüksek kargo outturn`,
          ],
        },
        {
          subheading: "1.2 Yıkama makineleri",
          paragraphs: [
            `Tanklara sabit, programlanabilir yıkama makineleri (fixed tank cleaning machines) monte edilir; dönen jetler farklı açılarda tank yüzeyini tarar. Yıkama, kargo pompası basıncıyla beslenir ve yıkanan petrol stripping ile boşaltılır.`,
          ],
        },
      ],
    },
    {
      heading: "2. Emniyet: Inert Atmosfer",
      sections: [
        {
          subheading: "2.1 Oksijen koşulu",
          paragraphs: [
            `COW yalnızca tank atmosferi inert (≤%8 O₂) iken yapılabilir; aksi halde ham petrol jetinin yarattığı statik elektrik ve hidrokarbon buharı patlamaya yol açabilir. IGS sürekli çalışmalı, O₂ izlenmeli ve sınır aşılırsa yıkama durdurulmalıdır.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "%8 O₂ şartı",
              text: `Yıkama öncesi ve süresince tank O₂ ≤ %8 olmalı; oksijen yükselirse COW derhal durdurulur. Bu, statik kıvılcım kaynaklı patlamayı önleyen temel kuraldır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. Yıkama Programı",
      sections: [
        {
          subheading: "3.1 Top ve bottom wash",
          paragraphs: [
            `Yıkama aşamalı yapılır: boşaltmanın başında üst kısımlar açıkken top wash, seviye düştükçe ve tank dibi açılırken bottom wash uygulanır. Makineler tüm yüzeyleri (gölge bölgeler dahil) örtecek şekilde programlanır; yıkama sonrası dip stripping ile temizlenir.`,
          ],
          table: {
            headers: ["Aşama", "Ne zaman", "Hedef"],
            rows: [
              ["Top wash", "Boşaltma başında", "Üst yapı/üst duvarlar"],
              ["Bottom wash", "Seviye düşünce", "Tank dibi/tortu"],
              ["Stripping", "Yıkama sonrası", "Dip kalıntısının alınması"],
            ],
          },
        },
        {
          subheading: "3.2 Drenaj ve dryness",
          paragraphs: [
            `MARPOL, yıkama sonrası tankın yeterince kuru (dry) olmasını ister; trim ile dip drenajı sağlanır ve stripping ile son sıvı alınır. Bu, slop miktarını ve sonraki balast suyu kirliliğini azaltır.`,
          ],
        },
      ],
    },
    {
      heading: "4. Bakım ve Arıza",
      sections: [
        {
          subheading: "4.1 Bakım",
          paragraphs: [
            `Bakım; yıkama makinesi dişli/nozul kontrolü, hat basınç testi, O₂ analizör kalibrasyonu ve drenaj hattı kontrolünü kapsar. Makinelerin tüm yüzeyi taradığı periyodik olarak doğrulanır.`,
          ],
          bullets: [
            `Yıkama makinesi nozul ve dönüş kontrolü`,
            `O₂ analizör kalibrasyonu (kritik)`,
            `Hat ve drenaj sızdırmazlığı`,
          ],
        },
        {
          subheading: "4.2 Arıza tablosu",
          paragraphs: [`Yaygın sorunlar:`],
          table: {
            headers: ["Belirti", "Neden", "Müdahale"],
            rows: [
              ["Makine dönmüyor/zayıf jet", "Dişli/nozul/basınç", "Makine bakımı, basınç kontrol"],
              ["O₂ yükseliyor", "IGS yetersiz/hava girişi", "COW durdur, IGS düzelt"],
              ["Tank kuru kalmıyor", "Trim/stripping yetersiz", "Trim + stripping optimizasyonu"],
              ["Aşırı slop", "Yetersiz yıkama/drenaj", "Program ve drenaj gözden geçir"],
            ],
          },
        },
      ],
    },
  ],
};

export default content;
