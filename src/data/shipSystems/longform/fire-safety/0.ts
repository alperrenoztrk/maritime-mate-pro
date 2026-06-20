import type { ShipSystemLongForm } from "../types";

const content: ShipSystemLongForm = {
  title: "Yangın Devre Pompası ve Hattı (Fire Main)",
  sectionId: "fire-safety",
  topicIndex: 0,
  estimatedPages: 24,
  intro: `Yangın devre hattı (fire main), gemide her noktaya basınçlı deniz suyu ulaştıran birincil yangın söndürme altyapısıdır; yangın pompaları, ana hat, yangın muslukları (hydrant), hortum ve nozullardan oluşur. SOLAS, pompa sayısı, kapasite, basınç, jet menzili ve acil yangın pompası (emergency fire pump) konularında ayrıntılı gereksinim koyar. Bu bölüm; fire main mimarisini, pompa kapasite ve basınç hesabını, isolation valf ve uluslararası kıyı bağlantısını (international shore connection), acil yangın pompası ve bağımsızlığını, hidrant/hortum/nozul donanımını ve bakım/arızayı mühendislik derinliğinde ele alır.`,
  sources: [
    "SOLAS Ch. II-2 Reg. 10 — fire-fighting",
    "FSS Code — fire pumps & fire main",
    "IMO Res. — international shore connection",
    "Klas kuralları — fire main system",
  ],
  chapters: [
    {
      heading: "1. Fire Main Mimarisi",
      sections: [
        {
          subheading: "1.1 Hat ve isolation valf",
          paragraphs: [
            `Fire main, makine dairesindeki yangın pompalarından beslenir ve güverte boyunca yangın muslukları (hydrant) ile dağıtılır. Hat üzerinde isolation (ayırma) valfleri bulunur; hasarlı bir bölüm izole edilirken hattın geri kalanı basınçlı kalır. Hat sürekli basınçlı tutulur veya hızlı devreye girecek şekilde hazırdır.`,
          ],
          bullets: [
            `Yangın pompaları → ana hat → hydrant'lar`,
            `Isolation valfleri hasarlı bölümü ayırır`,
            `Her nokta için en az bir jet ulaşmalı`,
          ],
        },
        {
          subheading: "1.2 International shore connection",
          paragraphs: [
            `Uluslararası kıyı bağlantısı, gemi yangın hattının limanda/başka bir gemiden su almasını sağlayan standart flanştır. Boyutları uluslararası standarttır; her gemide bulunur ve yeri bilinir. Gemi pompaları çökerse karadan/başka gemiden besleme sağlar.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "Standart flanş",
              text: `International shore connection ölçüleri SOLAS'ta sabittir; böylece dünyanın her limanında uyum sağlar. Conta, cıvata ve somunlarıyla hazır bulundurulur.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. Pompa Kapasitesi ve Basınç",
      sections: [
        {
          subheading: "2.1 Kapasite ve jet gereksinimi",
          paragraphs: [
            `Yangın pompaları, en uzak/yüksek hydrant'ta dahi yeterli basınç ve jet menzili sağlayacak kapasitede olmalıdır. SOLAS, eş zamanlı iki jetin belirli basınçta (gemi tipine göre) çalışmasını ister. Pompa kapasitesi, gemi büyüklüğü ve bilge/balast pompa kapasitesiyle ilişkilendirilir.`,
          ],
          table: {
            headers: ["Parametre", "Gereksinim (tipik)"],
            rows: [
              ["Pompa sayısı", "≥ 2 bağımsız + acil"],
              ["Hydrant basıncı", "Gemi tipine göre min. bar"],
              ["Eş zamanlı jet", "≥ 2 jet yeterli menzille"],
              ["Jet menzili", "Min. 12 m"],
            ],
          },
        },
      ],
    },
    {
      heading: "3. Acil Yangın Pompası",
      sections: [
        {
          subheading: "3.1 Bağımsızlık",
          paragraphs: [
            `Ana makine dairesinde yangın çıkıp pompalar kaybedilirse, makine dairesi dışında (ayrı bölmede), bağımsız güç (kendi dizel/acil jeneratör) ile çalışan acil yangın pompası devreye girer. Kendi deniz suyu emişi ve primingi olmalı, makine dairesinden geçmeden çalışabilmelidir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Neden ayrı bölme?",
              text: `Acil pompa, ana pompaları yok eden makine dairesi yangınında bile çalışmalıdır; bu yüzden farklı bir bölmede, bağımsız güç ve emişle bulunur.`,
            },
          ],
        },
      ],
    },
    {
      heading: "4. Donanım, Bakım ve Arıza",
      sections: [
        {
          subheading: "4.1 Hidrant, hortum, nozul",
          paragraphs: [
            `Her hydrant'ta hortum ve çift maksatlı (jet/sprey) nozul bulunur. Hortumlar düzenli basınç testinden geçer; nozul jet/sprey/kapama fonksiyonu kontrol edilir. Donanım kolay erişilir ve işaretli olmalıdır.`,
          ],
          bullets: [
            `Hortum basınç testi periyodik`,
            `Nozul jet/sprey/kapama çalışmalı`,
            `Hydrant valfleri serbest, donmaya karşı drenajlı`,
          ],
        },
        {
          subheading: "4.2 Arıza tablosu",
          paragraphs: [`Yaygın sorunlar:`],
          table: {
            headers: ["Belirti", "Neden", "Müdahale"],
            rows: [
              ["Düşük basınç/jet zayıf", "Pompa/priming, hat kaçağı", "Pompa + isolation valf kontrol"],
              ["Hydrant açılmıyor/sızdırıyor", "Valf korozyonu/conta", "Valf bakımı, conta değişimi"],
              ["Acil pompa çalışmıyor", "Yakıt/priming/güç", "Bağımsız güç ve emiş kontrolü"],
              ["Hortum yırtık", "Yaşlanma/test eksik", "Hortum değişimi + test programı"],
            ],
          },
        },
      ],
    },
  ],
};

export default content;
