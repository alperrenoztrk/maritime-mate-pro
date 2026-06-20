import type { ShipSystemLongForm } from "../types";

const content: ShipSystemLongForm = {
  title: "Sprinkler ve Su Sisleme Sistemi (Water Mist)",
  sectionId: "fire-safety",
  topicIndex: 3,
  estimatedPages: 23,
  intro: `Otomatik sprinkler ve su sisleme (water mist) sistemleri, yangını su ile söndüren/kontrol eden sabit sistemlerdir; özellikle yolcu gemisi yaşam mahalleri, koridorlar ve makine dairesi için kullanılır. Sprinkler ısıyla açılan başlıklarla bölgesel söndürme yapar; water mist çok ince su zerrecikleriyle buharlaşma soğutması ve oksijen seyreltmesi sağlar (CO₂'e alternatif). Bu bölüm; sprinkler sistem mimarisini (wet/dry pipe), başlık (head) çalışmasını, basınçlı su tankı ve pompayı, water mist prensibini ve makine dairesi uygulamasını, alarm ve bölge izlemeyi ve bakım/arızayı ele alır.`,
  sources: [
    "SOLAS Ch. II-2 — automatic sprinkler systems",
    "FSS Code Ch. 7 & 8 — sprinkler & water mist",
    "IMO MSC.1/Circ. — water mist equivalency",
    "Klas kuralları — sprinkler systems",
  ],
  chapters: [
    {
      heading: "1. Sprinkler Sistemi",
      sections: [
        {
          subheading: "1.1 Çalışma prensibi",
          paragraphs: [
            `Sprinkler sistemi sürekli basınçlı su ile doludur (wet pipe). Her başlıkta ısıyla kırılan cam ampul veya eriyen bağ (fusible link) vardır; yalnızca yangının olduğu bölgedeki başlık açılır, su püskürtür ve basınç düşüşü pompayı/alarmı tetikler. Böylece su yalnızca gereken yere uygulanır.`,
          ],
          bullets: [
            `Isıyla açılan başlık (sadece yangın bölgesi)`,
            `Basınç düşüşü pompa + alarmı tetikler`,
            `Wet pipe: hat sürekli su dolu`,
          ],
        },
        {
          subheading: "1.2 Basınçlı tank ve pompa",
          paragraphs: [
            `Sistem, basınçlı su tankı (pressure tank, hava yastıklı) ile ilk suyu hemen sağlar; ardından otomatik sprinkler pompası devreye girerek sürekli besler. Tank tatlı su ile başlar; pompa deniz suyu emerek devamlılık sağlar. Bölgeler (section) ayrı izlenir.`,
          ],
        },
      ],
    },
    {
      heading: "2. Water Mist (Su Sisleme)",
      sections: [
        {
          subheading: "2.1 İnce zerre ile söndürme",
          paragraphs: [
            `Water mist, suyu yüksek basınçla çok ince zerrelere (mikron) böler; büyük yüzey alanı hızlı buharlaşma ve güçlü soğutma sağlar, oluşan buhar oksijeni yerel olarak seyreltir. Az su kullanır (su hasarı düşük), iletken olmayan ortam yaratır ve CO₂'e insan-güvenli bir alternatif olabilir.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Neden water mist?",
              text: `Çok ince zerre, aynı söndürme etkisini çok daha az su ile sağlar; makine dairesinde CO₂'in ölümcül boğma riski olmadan kullanılabilir.`,
            },
          ],
        },
        {
          subheading: "2.2 Makine dairesi local application",
          paragraphs: [
            `Makine dairesinde water mist hem total flooding hem de yüksek riskli ekipman (brülör, separatör, ana makine) için local application (bölgesel) olarak uygulanır; yağ sızıntısı yangınlarını hızla kontrol eder.`,
          ],
        },
      ],
    },
    {
      heading: "3. Alarm ve Bölge İzleme",
      sections: [
        {
          subheading: "3.1 Bölge tanımı",
          paragraphs: [
            `Sprinkler bölgeleri (sections) köprü/yangın kontrol panelinde ayrı izlenir; hangi bölgenin tetiklendiği anında görülür. Su akış (flow switch) ve basınç sensörleri yangın yerini belirlemeye yardımcı olur.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "Sürekli izleme",
              text: `Sprinkler sistemi sürekli izlenmeli; bir başlık açıldığında veya basınç düştüğünde köprüde otomatik alarm vermelidir.`,
            },
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
            `Bakım; pompa otomatik start testi, basınçlı tank hava yastığı/seviye, bölge valf ve flow switch testi, başlık görsel kontrolü (boya/hasar) ve water mist nozul tıkanıklık kontrolünü kapsar. Başlıklar boyanmamalı ve engellenmemelidir.`,
          ],
          bullets: [
            `Pompa basınç-düşüşü ile otomatik start testi`,
            `Başlıklar boyalı/kapalı olmamalı`,
            `Water mist nozulları temiz (filtre)`,
          ],
        },
        {
          subheading: "4.2 Arıza tablosu",
          paragraphs: [`Yaygın sorunlar:`],
          table: {
            headers: ["Belirti", "Neden", "Müdahale"],
            rows: [
              ["Pompa otomatik kalkmıyor", "Basınç switch/pano", "Start devresi testi"],
              ["Basınç tankı düşük", "Hava yastığı/sızıntı", "Tank basınçlama, kaçak kontrol"],
              ["Bölge alarm vermiyor", "Flow switch arızası", "Switch test/değişim"],
              ["Water mist zayıf debi", "Nozul/filtre tıkalı", "Filtre/nozul temizliği"],
            ],
          },
        },
      ],
    },
  ],
};

export default content;
