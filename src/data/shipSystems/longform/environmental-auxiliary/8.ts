import type { ShipSystemLongForm } from "../types";

const content: ShipSystemLongForm = {
  title: "Buhar ve Kondens Sistemi",
  sectionId: "environmental-auxiliary",
  topicIndex: 8,
  estimatedPages: 22,
  intro: `Buhar ve kondens sistemi, kazanda üretilen buharı yakıt/kargo ısıtma, sefer ısıtması, sıhhi su ve servis ihtiyaçlarına dağıtan ve kullanılan buharı yoğuşturarak (kondens) kazana geri kazandıran kapalı devredir. İyi yönetilen bir kondens sistemi su ve enerji kaybını en aza indirir. Bu bölüm; buhar dağıtım ve kondens dönüş devresini, buhar tuzaklarını (steam trap), kondens geri kazanımı ve cascade/hotwell tankını, yakıt/kargo ısıtma uygulamalarını, su kimyası ve kontaminasyon izlemeyi ve bakım/arızayı mühendislik derinliğinde ele alır.`,
  sources: [
    "Klas kuralları — steam & feed systems",
    "Pounder's Marine Diesel Engines / Reeds Steam",
    "Spirax Sarco steam engineering references",
    "Kazan/feed water su kimyası rehberleri",
  ],
  chapters: [
    {
      heading: "1. Buhar ve Kondens Devresi",
      sections: [
        {
          subheading: "1.1 Dağıtım ve dönüş",
          paragraphs: [
            `Kazandan çıkan buhar, dağıtım hattıyla tüketicilere (HFO ısıtıcı, tank ısıtma serpantini, calorifier, yakıt seti) gider. Buhar ısısını verince yoğuşur (kondens); kondens hattıyla cascade/hotwell tankına döner ve besleme pompasıyla kazana geri basılır. Kapalı devre su kaybını minimize eder.`,
          ],
          bullets: [
            `Buhar → tüketici → kondens → cascade tank → kazan`,
            `Kapalı devre = düşük su/enerji kaybı`,
            `Make-up su yalnızca kayıpları telafi eder`,
          ],
        },
        {
          subheading: "1.2 Steam trap (buhar tuzağı)",
          paragraphs: [
            `Buhar tuzağı, oluşan kondensi ve havayı geçirirken buharı tutar; böylece ısı tüketicide kalır ve hat su darbesinden (water hammer) korunur. Arızalı (açık kalan) tuzak buhar kaçırır (enerji kaybı), kapalı kalan tuzak ısıtmayı durdurur.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Steam trap testi",
              text: `Tuzağın açık (buhar kaçırıyor) mı yoksa tıkalı (kondens biriktiriyor) mı olduğu sıcaklık/sesle test edilir; arızalı tuzak ya enerji ya da ısıtma kaybı yaratır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. Uygulamalar ve Kontaminasyon",
      sections: [
        {
          subheading: "2.1 Yakıt ve kargo ısıtma",
          paragraphs: [
            `HFO depolama/settling/service tankları ve ısıtıcıları, viskoziteyi düşürmek için buharla ısıtılır; tankerlerde ağır kargo (asfalt, ham petrol) ısıtma serpantinleriyle pompalanabilir kılınır. Aşırı ısıtma yakıt/kargo bozulması, yetersiz ısıtma pompalama sorunu yaratır.`,
          ],
        },
        {
          subheading: "2.2 Kondens kontaminasyonu",
          paragraphs: [
            `Isıtma serpantininde delik olursa yakıt/kargo kondense sızar ve kazana yağ taşır (oil contamination); bu kazanda köpürme, carryover ve tehlike yaratır. Kondens gözlem tankında (observation tank) yağ izi izlenir; kirli kondens kazana alınmaz, dump edilir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Kazana yağ kaçışı",
              text: `Kondens hattına yağ karışması kazan suyunu bozar ve tehlikeli köpürme yaratır; observation tank'ta yağ görülürse kondens dump edilir ve sızan serpantin bulunur.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. Bakım ve Arıza",
      sections: [
        {
          subheading: "3.1 Bakım",
          paragraphs: [
            `Bakım; steam trap test/temizlik, kondens gözlem tankı yağ izleme, besleme pompası ve hat sızdırmazlığı, izolasyon (insulation) ve su kimyası kontrolünü kapsar. Kondens dönüş oranı (recovery) izlenir; düşüş sızıntı işaretidir.`,
          ],
          bullets: [
            `Steam trap fonksiyon testi`,
            `Kondens gözlem tankı yağ kontrolü`,
            `Kondens dönüş oranı takibi`,
          ],
        },
        {
          subheading: "3.2 Arıza tablosu",
          paragraphs: [`Yaygın sorunlar:`],
          table: {
            headers: ["Belirti", "Neden", "Müdahale"],
            rows: [
              ["Isıtma yetersiz", "Steam trap tıkalı/hat", "Tuzak temizlik/değişim"],
              ["Buhar kaçağı/enerji kaybı", "Trap açık kalmış", "Tuzak değişimi"],
              ["Kondens'te yağ izi", "Serpantin deliği", "Sızan serpantin bul, kondens dump"],
              ["Su hammer (darbe)", "Kondens birikimi", "Drenaj/trap kontrolü"],
            ],
          },
        },
      ],
    },
  ],
};

export default content;
