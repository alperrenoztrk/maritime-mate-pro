import type { ShipSystemLongForm } from "../types";

const content: ShipSystemLongForm = {
  title: "Seyyar Yangın Söndürücüler",
  sectionId: "fire-safety",
  topicIndex: 6,
  estimatedPages: 21,
  intro: `Seyyar (taşınabilir) yangın söndürücüler, yangının ilk dakikalarında küçük yangınlara hızlı müdahale için her gemide belirli tip, sayı ve yerleşimde bulundurulan birinci müdahale ekipmanıdır. Doğru söndürücüyü doğru yangın sınıfında kullanmak hayati önemdedir. Bu bölüm; yangın sınıflarını (A/B/C/D/F), söndürücü tiplerini (su, köpük, kuru kimyevi toz, CO₂), yangın sınıfı-söndürücü eşleşmesini, yerleşim ve sayı gereksinimlerini (SOLAS/FSS), kullanım tekniğini (PASS) ve bakım/muayeneyi mühendislik derinliğinde ele alır.`,
  sources: [
    "SOLAS Ch. II-2 — portable extinguishers",
    "FSS Code Ch. 4 — portable fire extinguishers",
    "IMO MSC.1/Circ.1275 — portable extinguishers",
    "ISO 7165 / EN 3 — extinguisher standards",
  ],
  chapters: [
    {
      heading: "1. Yangın Sınıfları",
      sections: [
        {
          subheading: "1.1 Sınıf A-F",
          paragraphs: [
            `Yangınlar yanan maddeye göre sınıflandırılır: A (katı: ahşap/kağıt), B (yanıcı sıvı: yakıt/yağ), C (gaz), D (yanıcı metal), F/K (mutfak yağı). Söndürücü, yangın sınıfına uygun seçilmelidir; yanlış seçim yangını büyütebilir veya elektrik çarpması/patlama yaratabilir.`,
          ],
          table: {
            headers: ["Sınıf", "Yanan madde", "Örnek"],
            rows: [
              ["A", "Katı yanıcı", "Ahşap, kağıt, tekstil"],
              ["B", "Yanıcı sıvı", "Yakıt, yağ, boya"],
              ["C", "Gaz", "LPG, doğal gaz"],
              ["D", "Yanıcı metal", "Magnezyum, alüminyum tozu"],
              ["F (K)", "Pişirme yağı", "Mutfak fritöz yağı"],
            ],
          },
        },
      ],
    },
    {
      heading: "2. Söndürücü Tipleri ve Eşleşme",
      sections: [
        {
          subheading: "2.1 Tip-sınıf uyumu",
          paragraphs: [
            `Su (A için iyi, B/elektrikte tehlikeli), köpük (A/B), kuru kimyevi toz (A/B/C, çok yönlü ama kalıntı bırakır), CO₂ (B ve elektrik, kalıntısız ama kapalı alanda risk), ıslak kimyasal (F sınıfı mutfak). Elektrikli ekipman yangınında CO₂ veya kuru toz tercih edilir.`,
          ],
          table: {
            headers: ["Söndürücü", "Uygun sınıf", "Dikkat"],
            rows: [
              ["Su", "A", "B ve elektrikte KULLANMA"],
              ["Köpük", "A, B", "Elektrikte dikkat"],
              ["Kuru toz", "A, B, C", "Görüş/kalıntı"],
              ["CO₂", "B, elektrik", "Kapalı alanda boğma riski"],
              ["Islak kimyasal", "F (mutfak)", "Yağ yangınına özel"],
            ],
          },
          callouts: [
            {
              type: "warning",
              title: "Elektrik yangınında su yok",
              text: `Enerjili elektrikli ekipmana su/köpük sıkmak çarpılma ve hasara yol açar; CO₂ veya kuru kimyevi toz kullanılır, mümkünse önce enerji kesilir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. Yerleşim ve Kullanım",
      sections: [
        {
          subheading: "3.1 Sayı ve yerleşim",
          paragraphs: [
            `Söndürücüler; her mahalde yangın riskine uygun tip ve sayıda, görünür ve kolay erişilir konumda, çıkışlara yakın yerleştirilir. Makine dairesi, mutfak ve kamara bölgeleri için ayrı gereksinimler vardır. Yerleri yangın planında (fire control plan) işaretlidir.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "Yedek şarj",
              text: `Söndürücülerin belirli oranı için yedek dolum (spare charge) veya yedek söndürücü bulundurulması istenir; kullanılan birim derhal değiştirilir/yeniden doldurulur.`,
            },
          ],
        },
        {
          subheading: "3.2 PASS tekniği",
          paragraphs: [
            `Kullanımda PASS yöntemi uygulanır: Pull (pimi çek), Aim (alevin tabanına yönelt), Squeeze (kolu sık), Sweep (süpürerek uygula). Operatör daima çıkışa sırtı dönük olmamalı, kaçış yolu açık tutulmalıdır.`,
          ],
          bullets: [
            `Pull → pimi çek`,
            `Aim → alev tabanına yönelt`,
            `Squeeze → kolu sık`,
            `Sweep → süpür`,
          ],
        },
      ],
    },
    {
      heading: "4. Bakım ve Muayene",
      sections: [
        {
          subheading: "4.1 Periyodik muayene",
          paragraphs: [
            `Bakım; basınç göstergesi (manometre) kontrolü, mühür/pim bütünlüğü, tartım (CO₂), hortum/nozul ve gövde korozyon kontrolü ile periyodik basınç testi (hydrostatic test) ve yeniden dolumu kapsar. Her birim etiketli ve kayıtlıdır.`,
          ],
          bullets: [
            `Aylık görsel: basınç, mühür, hasar`,
            `Yıllık detaylı muayene`,
            `CO₂ tartımı, periyodik hidrostatik test`,
          ],
        },
        {
          subheading: "4.2 Arıza tablosu",
          paragraphs: [`Yaygın sorunlar:`],
          table: {
            headers: ["Belirti", "Neden", "Müdahale"],
            rows: [
              ["Manometre kırmızı/düşük", "Basınç kaybı", "Yeniden dolum/servis"],
              ["Mühür/pim eksik", "Kullanılmış/kurcalanmış", "Kontrol + yeniden dolum"],
              ["CO₂ ağırlığı düşük", "Gaz kaçağı", "Yeniden dolum"],
              ["Gövde korozyonu", "Nem/yaşlanma", "Hidrostatik test/değişim"],
            ],
          },
        },
      ],
    },
  ],
};

export default content;
