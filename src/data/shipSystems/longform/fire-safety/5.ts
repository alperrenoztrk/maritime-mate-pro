import type { ShipSystemLongForm } from "../types";

const content: ShipSystemLongForm = {
  title: "Yangın Dedektörleri ve Alarm Sistemi",
  sectionId: "fire-safety",
  topicIndex: 5,
  estimatedPages: 22,
  intro: `Yangın algılama ve alarm sistemi, yangını erken aşamada tespit edip köprü/yangın kontrol istasyonuna ve mürettebata bildiren, can ve mal güvenliğinin ilk savunma hattıdır. Duman, ısı ve alev dedektörleri, manuel ihbar butonları (manual call point) ve merkezi panel bir bütün oluşturur. Bu bölüm; dedektör tiplerini ve çalışma prensiplerini, adreslenebilir vs konvansiyonel sistemleri, makine dairesi ve kargo için özel algılamayı (sample extraction smoke detection), alarm yönetimi ve genel alarm ilişkisini, SOLAS gereksinimlerini ve bakım/arızayı ele alır.`,
  sources: [
    "SOLAS Ch. II-2 — fire detection & alarm",
    "FSS Code Ch. 9 — fixed detection systems",
    "IMO MSC.1/Circ. — false alarm reduction",
    "Klas kuralları — fire detection",
  ],
  chapters: [
    {
      heading: "1. Dedektör Tipleri",
      sections: [
        {
          subheading: "1.1 Duman, ısı, alev",
          paragraphs: [
            `Duman dedektörleri (iyonizasyon/optik) erken aşamada partikülü algılar; ısı dedektörleri sabit sıcaklık veya hızlı sıcaklık artışı (rate-of-rise) ile çalışır; alev dedektörleri (UV/IR) açık alevin ışınımını görür. Mahalin tipine göre en uygun dedektör seçilir.`,
          ],
          table: {
            headers: ["Tip", "Algılar", "Uygun mahal"],
            rows: [
              ["Optik/iyonizasyon duman", "Duman partikülü", "Kamara, koridor"],
              ["Isı (fixed/RoR)", "Sıcaklık/artış", "Mutfak, sıcak mahal"],
              ["Alev (UV/IR)", "Alev ışınımı", "Makine dairesi, pompa dairesi"],
              ["Sample/aspirating", "Çekilen hava dumanı", "Kargo ambarı"],
            ],
          },
        },
        {
          subheading: "1.2 Doğru dedektör seçimi",
          paragraphs: [
            `Mutfak gibi normalde duman/buhar olan yerlerde ısı dedektörü, kamara/koridorda duman dedektörü, makine dairesinde alev+duman+ısı kombinasyonu kullanılır. Yanlış tip, ya yanlış alarm ya da geç algılama yaratır.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Yanlış alarm dengesi",
              text: `Aşırı hassas dedektör çok sayıda yanlış alarm üretir ve güveni azaltır; doğru tip ve doğru yer seçimi hem erken algılama hem düşük yanlış alarm sağlar.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. Sistem Mimarisi",
      sections: [
        {
          subheading: "2.1 Adreslenebilir vs konvansiyonel",
          paragraphs: [
            `Konvansiyonel sistemde dedektörler bölge (zone) bazında izlenir; panel hangi bölgede yangın olduğunu söyler. Adreslenebilir (addressable) sistemde her dedektörün benzersiz adresi vardır; panel tam dedektörü ve durumunu (yangın/arıza/kirlilik) gösterir, bakımı kolaylaştırır.`,
          ],
        },
        {
          subheading: "2.2 Kargo için sample extraction",
          paragraphs: [
            `Kargo ambarlarında, her ambardan sürekli hava örneği çekilip kontrol istasyonundaki dedektörlere getiren sample extraction smoke detection kullanılır; aynı sistem CO₂ ile söndürme hattıyla birleşik olabilir. Boru hatları tıkanmamalı ve doğru ambara işaretli olmalıdır.`,
          ],
        },
      ],
    },
    {
      heading: "3. Alarm Yönetimi",
      sections: [
        {
          subheading: "3.1 Panel ve genel alarm",
          paragraphs: [
            `Yangın algılandığında panel sesli/görsel uyarı verir, bölge/dedektör gösterir. Mürettebatı uyaran genel alarm (general alarm) ayrı çalıştırılabilir veya entegre olabilir. Köprü sürekli denetimli olmalı ve alarmlar kayıt altına alınmalıdır.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "Köprüde gösterim",
              text: `SOLAS, yangın algılama sisteminin köprüde veya sürekli denetimli yangın kontrol istasyonunda görsel/sesli gösterimini ister; algılama gizli kalmamalıdır.`,
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
            `Bakım; dedektör fonksiyon testi (test gazı/ısı kaynağı), kirlilik temizliği, manual call point testi, panel batarya/yedek güç ve sample hat akış kontrolünü kapsar. Test edilen dedektör kayda geçer, bakım sonrası sistem aktif edilir.`,
          ],
          bullets: [
            `Dedektör fonksiyon testi (rotasyonla)`,
            `Boyalı/örtülü dedektör yasak`,
            `Yedek güç (batarya) testi`,
          ],
        },
        {
          subheading: "4.2 Arıza tablosu",
          paragraphs: [`Yaygın sorunlar:`],
          table: {
            headers: ["Belirti", "Neden", "Müdahale"],
            rows: [
              ["Sık yanlış alarm", "Kirli dedektör/yanlış tip", "Temizlik, tip/yer gözden geçir"],
              ["Bölge 'fault' veriyor", "Kablo/dedektör arızası", "Hat ve dedektör kontrolü"],
              ["Sample hat tıkalı", "Toz/kirlilik", "Hat üfleme/temizlik"],
              ["Panel besleme yok", "Güç/batarya", "Besleme ve batarya kontrolü"],
            ],
          },
        },
      ],
    },
  ],
};

export default content;
