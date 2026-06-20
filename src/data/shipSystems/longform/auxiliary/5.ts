import type { ShipSystemLongForm } from "../types";

const content: ShipSystemLongForm = {
  title: "Tatlı Su Üretim Sistemleri",
  sectionId: "auxiliary",
  topicIndex: 5,
  estimatedPages: 23,
  intro: `Tatlı su üreteci (fresh water generator — FWG / evaporator), deniz suyundan içme, sıhhi ve teknik tatlı su üreten yardımcı tesistir. İki ana teknoloji vardır: ana makine ceket suyu ısısıyla çalışan vakum (flash/plate) evaporatör ve membran esaslı ters ozmoz (reverse osmosis — RO). Bu bölüm; vakum evaporasyon prensibini ve neden düşük sıcaklıkta kaynatıldığını, plate tipi FWG'yi, ters ozmozu, üretilen suyun tuzluluk (salinity) izleme ve sapma valfini, sahil/kirli su yakınında üretim yasağını ve mineralizasyon/hijyen ile bakım/arızayı ele alır.`,
  sources: [
    "Alfa Laval / Atlas FWG (evaporator) manuals",
    "WHO / IMO içme suyu kalite kılavuzları",
    "MARPOL — kıyıya yakın üretim sınırı",
    "Reverse osmosis sistem üretici el kitapları",
  ],
  chapters: [
    {
      heading: "1. Vakum Evaporatör",
      sections: [
        {
          subheading: "1.1 Neden vakumda kaynatılır?",
          paragraphs: [
            `Atmosfer basıncında su 100 °C'de kaynar; ancak ana makine ceket suyu yalnızca ~70-90 °C'dir. FWG, içinde vakum (ejektör ile) oluşturarak kaynama noktasını ~40-60 °C'ye düşürür; böylece düşük dereceli atık ısı ile deniz suyu buharlaştırılır. Buhar yoğuşturulup tatlı su elde edilir, tuz arkada kalır.`,
          ],
          bullets: [
            `Vakum → düşük kaynama sıcaklığı`,
            `Ceket suyu atık ısısı yeterli olur`,
            `Tuz/mineral buharlaşmaz, geride kalır`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Atık ısı geri kazanımı",
              text: `FWG, ceket suyu soğutmasının bir kısmını üstlenir; hem tatlı su üretir hem de soğutma yükünü hafifletir.`,
            },
          ],
        },
        {
          subheading: "1.2 Plate tipi FWG",
          paragraphs: [
            `Modern FWG'ler plakalı (plate) ısı eşanjörü kullanır: bir plaka paketi deniz suyunu ceket suyuyla ısıtıp buharlaştırır (evaporator), diğeri buharı deniz suyuyla yoğuşturur (condenser). Kompakt, verimli ve kolay temizlenir.`,
          ],
        },
      ],
    },
    {
      heading: "2. Ters Ozmoz (RO)",
      sections: [
        {
          subheading: "2.1 Membran prensibi",
          paragraphs: [
            `Ters ozmoz, deniz suyunu yüksek basınçla (50-70 bar) yarı geçirgen membrandan geçirir; su geçer, tuz iyonları tutulur. Isı kaynağı gerektirmez, elektrikle çalışır ve düşük sıcaklıkta yüksek kapasite verir. Ön filtreleme (kum/kartuş) ve membran kimyası kritik bakım konularıdır.`,
          ],
          table: {
            headers: ["Özellik", "Vakum evaporatör", "Ters ozmoz (RO)"],
            rows: [
              ["Enerji", "Atık ısı (ceket suyu)", "Elektrik (HP pompa)"],
              ["Su kalitesi", "Çok düşük tuz (damıtık)", "Düşük tuz (membrana bağlı)"],
              ["Bakım", "Kireç/temizlik", "Membran/ön filtre"],
              ["Limana yakın", "Üretim yasağı", "Üretim yasağı"],
            ],
          },
        },
      ],
    },
    {
      heading: "3. Su Kalitesi ve Üretim Sınırları",
      sections: [
        {
          subheading: "3.1 Salinometre ve sapma valfi",
          paragraphs: [
            `Üretilen suyun tuzluluğu salinometre ile sürekli ölçülür; tuz belirli eşiği (tipik ~10 ppm) aşarsa solenoid sapma valfi (dump valve) suyu tanka almayıp denize/atığa yönlendirir. Böylece tuzlu/kötü su tatlı su tankına karışmaz.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Salinometre devre dışı bırakılamaz",
              text: `Salinometre/dump valf arızalıyken üretilen su tanka alınmaz; aksi halde tüm tatlı su tuzlanabilir ve kazan/sistem zarar görür.`,
            },
          ],
        },
        {
          subheading: "3.2 Limana/kıyıya yakın üretim yasağı",
          paragraphs: [
            `Liman, haliç ve kıyıya yakın kirli/sığ sularda FWG çalıştırmak yasaktır; bu sular bakteriyel ve kimyasal kirlilik (sintine, atık) içerir. Üretim açık denizde, temiz suda yapılır. İçme suyu ayrıca UV/klorlama ve gerekirse remineralizasyondan geçer.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "Hijyen ve mineralizasyon",
              text: `Damıtık su mineralsizdir; içme için sertleştirme/mineralizasyon ve dezenfeksiyon (UV/klor) gerekir. İçme suyu hatları MLC ve sağlık kuralları gereği temiz tutulur.`,
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
            `Evaporatörde periyodik kireç sökme (acid cleaning), plaka temizliği, ejektör performansı ve vakum sızdırmazlığı kontrol edilir. RO'da ön filtre değişimi, membran yıkama (CIP) ve HP pompa bakımı yapılır.`,
          ],
        },
        {
          subheading: "4.2 Arıza tablosu",
          paragraphs: [`Yaygın sorunlar:`],
          table: {
            headers: ["Belirti", "Neden", "Müdahale"],
            rows: [
              ["Üretim düşük (evaporatör)", "Vakum zayıf/kireç", "Ejektör + asit temizliği"],
              ["Yüksek tuzluluk (dump)", "Sızıntı/aşırı kaynama", "Yük azalt, sızdırmazlık kontrol"],
              ["RO debisi düştü", "Membran kirli/ön filtre", "CIP yıkama, filtre değişimi"],
              ["RO tuz geçişi yüksek", "Membran yıpranması", "Membran değişimi"],
            ],
          },
        },
      ],
    },
  ],
};

export default content;
